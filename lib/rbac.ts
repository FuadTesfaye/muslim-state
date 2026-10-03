import { Role, Permission } from './types';

export interface RoleConfig {
  id: Role;
  name: string;
  nameAr: string;
  description: string;
  permissions: Permission[];
  badgeColor: string;
}

export const ROLES: Record<Role, RoleConfig> = {
  visitor: {
    id: 'visitor',
    name: 'Visitor',
    nameAr: 'زائر',
    description: 'Public explorer browsing summits, schedule, and leaderboard.',
    permissions: ['view_public'],
    badgeColor: 'var(--mute)'
  },
  participant: {
    id: 'participant',
    name: 'Participant',
    nameAr: 'مشارك',
    description: 'Enrolled contestant registered for events and competitions.',
    permissions: [
      'view_public',
      'register_event',
      'take_test',
      'submit_competition',
      'view_dashboard'
    ],
    badgeColor: 'var(--blue)'
  },
  parent: {
    id: 'parent',
    name: 'Parent / Guardian',
    nameAr: 'ولي الأمر',
    description: 'Authorizes youth participant consent and monitors certificates.',
    permissions: ['view_public', 'register_event', 'view_dashboard'],
    badgeColor: 'var(--ochre)'
  },
  judge: {
    id: 'judge',
    name: 'Judge / Grader',
    nameAr: 'حَكَم / مقيّم',
    description: 'Evaluates recitation waveforms, scholarly essays, and appeals.',
    permissions: ['view_public', 'grade_submissions', 'review_appeals'],
    badgeColor: '#10B981'
  },
  staff: {
    id: 'staff',
    name: 'Event Staff',
    nameAr: 'منظم الميدان',
    description: 'Operates arrival gate terminal with live scanner and audio chime.',
    permissions: ['view_public', 'checkin_attendees'],
    badgeColor: '#F59E0B'
  },
  content_manager: {
    id: 'content_manager',
    name: 'Content Manager',
    nameAr: 'مدير المحتوى',
    description: 'Manages summits, schedules, speakers, and dynamic forms.',
    permissions: [
      'view_public',
      'manage_events',
      'manage_competitions',
      'manage_forms'
    ],
    badgeColor: '#8B5CF6'
  },
  admin: {
    id: 'admin',
    name: 'Administrator',
    nameAr: 'مشرف الأمانة',
    description: 'Full secretariat backoffice access, audit trails, and grading.',
    permissions: [
      'view_public',
      'register_event',
      'take_test',
      'submit_competition',
      'view_dashboard',
      'checkin_attendees',
      'grade_submissions',
      'review_appeals',
      'manage_events',
      'manage_competitions',
      'manage_forms',
      'view_analytics',
      'view_audit_logs'
    ],
    badgeColor: '#EF4444'
  },
  super_admin: {
    id: 'super_admin',
    name: 'Super Admin',
    nameAr: 'المدير العام',
    description: 'Complete unrestricted governance over the entire IlmFlow OS.',
    permissions: [
      'view_public',
      'register_event',
      'take_test',
      'submit_competition',
      'view_dashboard',
      'checkin_attendees',
      'grade_submissions',
      'review_appeals',
      'manage_events',
      'manage_competitions',
      'manage_forms',
      'view_analytics',
      'view_audit_logs',
      'manage_users',
      'manage_system'
    ],
    badgeColor: 'var(--ochre)'
  }
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLES[role]?.permissions.includes(permission) ?? false;
}
