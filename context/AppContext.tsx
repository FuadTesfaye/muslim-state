'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  TicketPass,
  SubmissionToGrade,
  TestResult,
  CertificateItem,
  AuditLogItem,
  FormSchema
} from '@/lib/types';
import {
  SEED_TICKETS,
  SEED_SUBMISSIONS,
  SEED_CERTIFICATES,
  SEED_AUDIT_LOGS,
  INITIAL_FORM_SCHEMA
} from '@/lib/data';
import { ROLES } from '@/lib/rbac';
import { playSuccessChime, playWarningChime } from '@/lib/audio';

interface CheckinResult {
  status: 'valid' | 'duplicate' | 'invalid';
  ticket?: TicketPass;
  message: string;
}

interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  role: Role;
  setRole: (r: Role) => void;
  tickets: TicketPass[];
  registerTicket: (ticket: Omit<TicketPass, 'id' | 'token' | 'checkedIn' | 'createdAt'>) => TicketPass;
  checkInTicket: (token: string) => CheckinResult;
  submissions: SubmissionToGrade[];
  gradeSubmission: (id: string, scores: Record<string, number>, feedback: string) => void;
  appealSubmission: (id: string, rebuttal: string) => void;
  submitNewRecitationOrEssay: (sub: Omit<SubmissionToGrade, 'id' | 'status' | 'rubricScores'>) => void;
  testResults: TestResult[];
  saveTestResult: (result: TestResult) => void;
  certificates: CertificateItem[];
  auditLogs: AuditLogItem[];
  formSchemas: FormSchema[];
  saveFormSchema: (schema: FormSchema) => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>('super_admin');
  const [tickets, setTickets] = useState<TicketPass[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ilm_tickets');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return SEED_TICKETS;
  });

  const [submissions, setSubmissions] = useState<SubmissionToGrade[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ilm_submissions');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return SEED_SUBMISSIONS;
  });

  const [testResults, setTestResults] = useState<TestResult[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ilm_test_results');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return [];
  });

  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ilm_certificates');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return SEED_CERTIFICATES;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ilm_audit_logs');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return SEED_AUDIT_LOGS;
  });

  const [formSchemas, setFormSchemas] = useState<FormSchema[]>([INITIAL_FORM_SCHEMA]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist state updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ilm_tickets', JSON.stringify(tickets));
    } catch {}
  }, [tickets]);

  useEffect(() => {
    try {
      localStorage.setItem('ilm_submissions', JSON.stringify(submissions));
    } catch {}
  }, [submissions]);

  useEffect(() => {
    try {
      localStorage.setItem('ilm_test_results', JSON.stringify(testResults));
    } catch {}
  }, [testResults]);

  useEffect(() => {
    try {
      localStorage.setItem('ilm_audit_logs', JSON.stringify(auditLogs));
    } catch {}
  }, [auditLogs]);

  const addToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      actorRole: role,
      actorName: ROLES[role]?.name ?? 'User',
      action,
      details
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    addToast(`Switched active persona to ${ROLES[newRole]?.name}`, 'info');
    addAuditLog('ROLE_SWITCH', `Switched active persona to ${newRole}`);
  };

  const registerTicket = (
    data: Omit<TicketPass, 'id' | 'token' | 'checkedIn' | 'createdAt'>
  ): TicketPass => {
    const token = `ILM-PASS-${Math.floor(100 + Math.random() * 900)}`;
    const newTicket: TicketPass = {
      ...data,
      id: `tkt-${Date.now()}`,
      token,
      checkedIn: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTickets((prev) => [newTicket, ...prev]);
    addToast(`Ticket pass ${token} issued successfully!`, 'success');
    addAuditLog('TICKET_ISSUED', `Issued ${newTicket.tier} Pass for ${newTicket.attendeeName} (${token})`);
    return newTicket;
  };

  const checkInTicket = (inputToken: string): CheckinResult => {
    const cleanToken = inputToken.trim().toUpperCase();
    const ticketIndex = tickets.findIndex(
      (t) => t.token.toUpperCase() === cleanToken || t.id.toUpperCase() === cleanToken
    );

    if (ticketIndex === -1) {
      playWarningChime();
      addAuditLog('GATE_REJECTED', `Invalid or unknown barcode token scanned: ${cleanToken}`);
      return {
        status: 'invalid',
        message: `Token "${cleanToken}" not found in delegate registry.`
      };
    }

    const currentTicket = tickets[ticketIndex];
    if (currentTicket.checkedIn) {
      playWarningChime();
      addAuditLog(
        'GATE_DUPLICATE',
        `Duplicate entry attempt for ${currentTicket.attendeeName} (${currentTicket.token}) at ${currentTicket.checkedInAt}`
      );
      return {
        status: 'duplicate',
        ticket: currentTicket,
        message: `ALREADY CHECKED IN at ${currentTicket.checkedInAt}. Duplicate badge entry detected.`
      };
    }

    // Valid checkin
    playSuccessChime();
    const timeStr = new Date().toLocaleTimeString();
    const updated = [...tickets];
    updated[ticketIndex] = {
      ...currentTicket,
      checkedIn: true,
      checkedInAt: `${timeStr}`
    };
    setTickets(updated);

    addAuditLog(
      'GATE_ADMITTED',
      `Admitted ${currentTicket.attendeeName} (${currentTicket.tier} Pass) at ${timeStr}`
    );

    return {
      status: 'valid',
      ticket: updated[ticketIndex],
      message: `ADMITTED: ${currentTicket.attendeeName} (${currentTicket.tier} Pass)`
    };
  };

  const gradeSubmission = (
    id: string,
    scores: Record<string, number>,
    feedback: string
  ) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              rubricScores: scores,
              totalScore: total,
              feedback,
              status: 'graded',
              judgeName: ROLES[role]?.name
            }
          : sub
      )
    );
    addToast(`Submission evaluated: ${total}/100 points assigned.`, 'success');
    addAuditLog('GRADE_RECORDED', `Assigned ${total}/100 to submission ${id}`);
  };

  const appealSubmission = (id: string, rebuttal: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status: 'appealed',
              appealRebuttal: rebuttal
            }
          : sub
      )
    );
    addToast('Appeal rebuttal lodged with the adjudication panel.', 'info');
    addAuditLog('APPEAL_FILED', `Contestant lodged appeal for submission ${id}`);
  };

  const submitNewRecitationOrEssay = (
    sub: Omit<SubmissionToGrade, 'id' | 'status' | 'rubricScores'>
  ) => {
    const newSub: SubmissionToGrade = {
      ...sub,
      id: `sub-${Date.now()}`,
      status: 'pending',
      rubricScores: {}
    };
    setSubmissions((prev) => [newSub, ...prev]);
    addToast('Contestant entry successfully queued for judge adjudication!', 'success');
    addAuditLog('CONTEST_SUBMITTED', `New entry submitted for ${newSub.competitionTitle}`);
  };

  const saveTestResult = (result: TestResult) => {
    setTestResults((prev) => [result, ...prev]);
    addToast(`Exam completed! Score: ${result.finalScore.toFixed(1)} points.`, 'success');
    addAuditLog(
      'EXAM_SUBMITTED',
      `Participant completed test ${result.competitionId} with score ${result.finalScore}`
    );

    // If score >= 75%, issue accredited certificate automatically!
    if (result.finalScore >= 75) {
      const certId = `ILM-2026-EXM-${Math.floor(100 + Math.random() * 900)}`;
      const newCert: CertificateItem = {
        id: certId,
        holderName: result.participantName,
        competitionOrEventTitle: 'Hadith & Islamic Jurisprudence Proctored Tournament',
        rankOrHonor: `Distinction Honor Roll (${result.finalScore.toFixed(1)} Pts)`,
        issueDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        verificationHash: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
        authorizedSignatory: 'IlmFlow Academic Council'
      };
      setCertificates((prev) => [newCert, ...prev]);
      addToast(`Accredited Parchment Diploma conferred: ${certId}`, 'success');
    }
  };

  const saveFormSchema = (schema: FormSchema) => {
    setFormSchemas((prev) => {
      const exists = prev.find((s) => s.id === schema.id);
      if (exists) {
        return prev.map((s) => (s.id === schema.id ? schema : s));
      }
      return [...prev, schema];
    });
    addToast(`Form schema "${schema.title}" version v${schema.version} published!`, 'success');
    addAuditLog('FORM_SCHEMA_SAVED', `Updated form schema ${schema.id} to v${schema.version}`);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        tickets,
        registerTicket,
        checkInTicket,
        submissions,
        gradeSubmission,
        appealSubmission,
        submitNewRecitationOrEssay,
        testResults,
        saveTestResult,
        certificates,
        auditLogs,
        formSchemas,
        saveFormSchema,
        toasts,
        addToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
