export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
  email?: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}
// Phase 1 Additions
export interface LoginPayload {
  email: string;
  password?: string; // Mock, not used for validation
}
export interface SignupPayload {
  name: string;
  email: string;
  password?: string; // Mock, not used for validation
}
export interface AuthResponse {
  user: User;
  token: string; // Mock token
}
// Phase 3 Additions
export type RegulatoryAlertStatus = 'Active' | 'Pending' | 'Archived';
export interface RegulatoryAlert {
  id: string;
  title: string;
  jurisdiction: string;
  status: RegulatoryAlertStatus;
  source: string;
  publicationDate: string; // ISO 8601 string
}
// Phase 4 Additions
export type ContractStatus = 'Completed' | 'In Progress' | 'Failed';
export interface Contract {
  id: string;
  fileName: string;
  status: ContractStatus;
  uploadDate: string; // ISO 8601 string
}
export interface ContractAnalysis {
  contractId: string;
  summary: string;
  keyClauses: { title: string; content: string }[];
  risks: { level: 'High' | 'Medium' | 'Low'; description: string }[];
}
// Phase 5 Additions
export type ComplianceAuditStatus = 'Passed' | 'Failed' | 'In Progress';
export interface ComplianceCheck {
  id: string;
  description: string;
  status: 'Pass' | 'Fail' | 'N/A';
  evidenceLink?: string;
}
export interface ComplianceAudit {
  id: string;
  title: string;
  framework: 'GDPR' | 'SOC 2' | 'ISO 27001';
  status: ComplianceAuditStatus;
  completionDate: string; // ISO 8601 string
  progress: number; // Percentage (0-100)
  checks: ComplianceCheck[];
}