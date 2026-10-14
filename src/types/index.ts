export type Language = 'hi' | 'en';

export interface Portal {
  id?: number;
  serialNumber: number;
  nameHi: string;
  nameEn: string;
  slug: string;
  officialUrl: string;
  categoryKey: string;
  department: string;
  level: 'bihar' | 'central' | 'both';
  summaryHi: string;
  descriptionHi: string;
  howItWorksHi: string;
  eligibilityNotes?: string;
  documentNotes?: string;
  verificationStatus: 'Verified' | 'Verification Required';
  lastVerifiedAt: string;
  isPopular?: boolean;
}

export interface Category {
  key: string;
  nameHi: string;
  nameEn: string;
  icon: string;
  descriptionHi: string;
}

export interface Scheme {
  id?: number;
  nameHi: string;
  nameEn: string;
  slug: string;
  categoryKey: string;
  department: string;
  governmentType: 'bihar' | 'central';
  summaryHi: string;
  benefitsHi: string;
  eligibilityHi: string;
  documentsHi: string;
  applyProcessHi: string;
  officialUrl: string;
  lastVerifiedAt: string;
  verificationStatus: 'Verified' | 'Verification Required';
}

export interface Notice {
  id?: number;
  titleHi: string;
  titleEn: string;
  contentHi: string;
  category: string;
  date: string;
  isUrgent?: boolean;
  linkUrl?: string;
}

export interface ContactMessage {
  id: number;
  referenceNumber: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  serviceCategory: string;
  requestDescription: string;
  smsUpdatesOptIn?: boolean;
  status: 'New' | 'In Progress' | 'Completed' | 'Archived';
  adminNotes?: string;
  createdAt: string;
}

export interface SmsNotification {
  id: number;
  recipientMobile: string;
  recipientName: string;
  referenceNumber?: string;
  serviceCategory?: string;
  smsType: 'Confirmation' | 'Status Update' | 'Scheme Reminder' | 'Application Alert' | 'Document Ready';
  messageText: string;
  deliveryStatus: string;
  gatewayReference?: string;
  createdAt: string;
}

export interface PortalReport {
  id: number;
  portalSerialNumber: number;
  portalName: string;
  issueType: string;
  userComment: string;
  userContact?: string;
  status: 'Pending' | 'Resolved';
  createdAt: string;
}

export interface AdminStats {
  totalPortals: number;
  totalInquiries: number;
  unreadInquiries: number;
  pendingIssueReports: number;
  activeNotices: number;
  totalSmsSent?: number;
  databaseStatus: string;
  owner: string;
}
