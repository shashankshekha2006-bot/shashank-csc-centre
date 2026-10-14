import { pgTable, serial, integer, text, timestamp, boolean } from 'drizzle-orm/pg-core';

// Users table linked with Firebase Auth UID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  role: text('role').notNull().default('admin'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Portal categories
export const portalCategories = pgTable('portal_categories', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  nameHi: text('name_hi').notNull(),
  nameEn: text('name_en').notNull(),
  icon: text('icon').notNull(),
  descriptionHi: text('description_hi'),
});

// 150 Government Portals from bihar_gov_portals.pdf
export const governmentPortals = pgTable('government_portals', {
  id: serial('id').primaryKey(),
  serialNumber: integer('serial_number').notNull(),
  nameHi: text('name_hi').notNull(),
  nameEn: text('name_en').notNull(),
  slug: text('slug').notNull().unique(),
  officialUrl: text('official_url').notNull(),
  categoryKey: text('category_key').notNull(),
  department: text('department').notNull(),
  level: text('level').notNull().default('bihar'), // 'bihar' | 'central' | 'both'
  summaryHi: text('summary_hi').notNull(),
  descriptionHi: text('description_hi').notNull(),
  howItWorksHi: text('how_it_works_hi').notNull(),
  eligibilityNotes: text('eligibility_notes'),
  documentNotes: text('document_notes'),
  verificationStatus: text('verification_status').notNull().default('Verified'), // 'Verified' | 'Verification Required'
  lastVerifiedAt: text('last_verified_at').notNull().default('2026-10-14'),
  isPopular: boolean('is_popular').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Government Schemes
export const governmentSchemes = pgTable('government_schemes', {
  id: serial('id').primaryKey(),
  nameHi: text('name_hi').notNull(),
  nameEn: text('name_en').notNull(),
  slug: text('slug').notNull().unique(),
  categoryKey: text('category_key').notNull(),
  department: text('department').notNull(),
  governmentType: text('government_type').notNull().default('bihar'), // 'bihar' | 'central'
  summaryHi: text('summary_hi').notNull(),
  benefitsHi: text('benefits_hi').notNull(),
  eligibilityHi: text('eligibility_hi').notNull(),
  documentsHi: text('documents_hi').notNull(),
  applyProcessHi: text('apply_process_hi').notNull(),
  officialUrl: text('official_url').notNull(),
  lastVerifiedAt: text('last_verified_at').notNull().default('2026-10-14'),
  verificationStatus: text('verification_status').notNull().default('Verified'),
});

// Public Notices
export const notices = pgTable('notices', {
  id: serial('id').primaryKey(),
  titleHi: text('title_hi').notNull(),
  titleEn: text('title_en').notNull(),
  contentHi: text('content_hi').notNull(),
  category: text('category').notNull().default('अपडेट'),
  date: text('date').notNull(),
  isUrgent: boolean('is_urgent').default(false),
  linkUrl: text('link_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Citizen Contact & Service Assistance Requests
export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  referenceNumber: text('reference_number').notNull().unique(),
  fullName: text('full_name').notNull(),
  mobileNumber: text('mobile_number').notNull(),
  email: text('email').notNull(),
  serviceCategory: text('service_category').notNull(),
  requestDescription: text('request_description').notNull(),
  smsUpdatesOptIn: boolean('sms_updates_opt_in').default(true),
  status: text('status').notNull().default('New'), // 'New' | 'In Progress' | 'Completed' | 'Archived'
  adminNotes: text('admin_notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// SMS Notification Logs
export const smsNotifications = pgTable('sms_notifications', {
  id: serial('id').primaryKey(),
  recipientMobile: text('recipient_mobile').notNull(),
  recipientName: text('recipient_name').notNull(),
  referenceNumber: text('reference_number'),
  serviceCategory: text('service_category'),
  smsType: text('sms_type').notNull().default('Status Update'), // 'Status Update' | 'Scheme Reminder' | 'Application Alert' | 'Confirmation'
  messageText: text('message_text').notNull(),
  deliveryStatus: text('delivery_status').notNull().default('Delivered'), // 'Delivered' | 'Sent' | 'Failed'
  gatewayReference: text('gateway_reference'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Portal Link Issue Reports submitted by citizens
export const portalReports = pgTable('portal_reports', {
  id: serial('id').primaryKey(),
  portalSerialNumber: integer('portal_serial_number').notNull(),
  portalName: text('portal_name').notNull(),
  issueType: text('issue_type').notNull(), // 'Site Not Opening' | 'Wrong URL' | 'Procedure Changed' | 'Other'
  userComment: text('user_comment').notNull(),
  userContact: text('user_contact'),
  status: text('status').notNull().default('Pending'), // 'Pending' | 'Resolved'
  createdAt: timestamp('created_at').defaultNow(),
});

// General Site Settings / Owner Info
export const siteSettings = pgTable('site_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
