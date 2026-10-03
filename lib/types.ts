export type Role =
  | 'visitor'
  | 'participant'
  | 'parent'
  | 'judge'
  | 'staff'
  | 'content_manager'
  | 'admin'
  | 'super_admin';

export type Permission =
  | 'view_public'
  | 'register_event'
  | 'take_test'
  | 'submit_competition'
  | 'view_dashboard'
  | 'checkin_attendees'
  | 'grade_submissions'
  | 'review_appeals'
  | 'manage_events'
  | 'manage_competitions'
  | 'manage_forms'
  | 'view_analytics'
  | 'view_audit_logs'
  | 'manage_users'
  | 'manage_system';

export interface EventSpeaker {
  name: string;
  title: string;
  institution: string;
  avatarIcon: string;
}

export interface EventSession {
  time: string;
  title: string;
  speaker: string;
  hall: string;
  day: number;
}

export interface EventItem {
  id: string;
  title: string;
  titleAr: string;
  tagline: string;
  dateRange: string;
  location: string;
  totalDays: number;
  totalCapacity: number;
  registeredCount: number;
  description: string;
  speakers: EventSpeaker[];
  sessions: EventSession[];
  tierPrices: {
    vip: number;
    general: number;
    academic: number;
    youth: number;
  };
}

export interface TicketPass {
  id: string;
  eventId: string;
  eventTitle: string;
  attendeeName: string;
  email: string;
  phone: string;
  tier: 'VIP' | 'General' | 'Academic' | 'Youth';
  selectedDays: number[];
  basePrice: number;
  discountAmount: number;
  finalPrice: number;
  token: string;
  qrCodeSvg: string;
  checkedIn: boolean;
  checkedInAt?: string;
  createdAt: string;
}

export interface CompetitionQuestion {
  id: string;
  category: 'Tajweed' | 'Bukhari' | 'Fiqh' | 'Seerah';
  question: string;
  questionAr?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export interface CompetitionItem {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  level: string;
  type: 'proctored_test' | 'audio_recitation' | 'scholarly_essay';
  durationMinutes?: number;
  prizePool: string;
  maxParticipants: number;
  enrolledCount: number;
  description: string;
}

export interface TestTelemetry {
  tabSwitches: number;
  fullscreenExits: number;
  warnings: string[];
  startTime: number;
  endTime?: number;
}

export interface TestResult {
  competitionId: string;
  participantName: string;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  rawScore: number;
  telemetryPenalty: number;
  finalScore: number;
  passed: boolean;
  submittedAt: string;
}

export interface RubricCriteria {
  id: string;
  name: string;
  nameAr?: string;
  maxPoints: number;
  description: string;
}

export interface SubmissionToGrade {
  id: string;
  competitionId: string;
  competitionTitle: string;
  participantName: string;
  type: 'audio' | 'essay';
  audioTitle?: string;
  audioDuration?: string;
  essayTitle?: string;
  essayContent?: string;
  rubricScores: Record<string, number>;
  totalScore?: number;
  feedback?: string;
  judgeName?: string;
  status: 'pending' | 'graded' | 'appealed';
  appealRebuttal?: string;
}

export interface CertificateItem {
  id: string;
  holderName: string;
  competitionOrEventTitle: string;
  rankOrHonor: string;
  issueDate: string;
  verificationHash: string;
  authorizedSignatory: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorRole: Role;
  actorName: string;
  action: string;
  details: string;
}

export interface DynamicFormField {
  id: string;
  type:
    | 'text'
    | 'textarea'
    | 'email'
    | 'phone'
    | 'number'
    | 'date'
    | 'dropdown'
    | 'radio'
    | 'checkboxes'
    | 'file'
    | 'gender'
    | 'signature';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  conditionalOnField?: string;
  conditionalValue?: string;
}

export interface FormSchema {
  id: string;
  title: string;
  version: number;
  fields: DynamicFormField[];
}
