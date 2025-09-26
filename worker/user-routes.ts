import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ChatBoardEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import type { SignupPayload, LoginPayload, User, RegulatoryAlert, RegulatoryAlertStatus, Contract, ContractStatus, ContractAnalysis, ComplianceAudit, ComplianceAuditStatus, ComplianceCheck } from '@shared/types';
// Mock Data Generator for Regulatory Alerts
const generateMockAlerts = (count = 25): RegulatoryAlert[] => {
  const alerts: RegulatoryAlert[] = [];
  const jurisdictions = ['European Union', 'United States', 'United Kingdom', 'Canada', 'Australia'];
  const sources = ['Official Journal of the EU', 'Federal Register', 'UK Parliament', 'Canada Gazette', 'Australian Government Gazette'];
  const statuses: RegulatoryAlertStatus[] = ['Active', 'Pending', 'Archived'];
  const titles = [
    'New Data Privacy Framework Update',
    'Financial Services Regulation Amendment',
    'Environmental Protection Act Revision',
    'Consumer Rights Directive Update',
    'Cybersecurity Law Enforcement Act',
    'Pharmaceutical Patent Regulation Change',
    'International Trade Sanctions Update',
    'Labor Law and Employee Rights Amendment',
    'Digital Markets Act Implementation Guide',
    'AI Governance and Ethics Framework Proposal',
  ];
  for (let i = 0; i < count; i++) {
    const pubDate = new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000);
    alerts.push({
      id: crypto.randomUUID(),
      title: titles[Math.floor(Math.random() * titles.length)],
      jurisdiction: jurisdictions[Math.floor(Math.random() * jurisdictions.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      publicationDate: pubDate.toISOString(),
    });
  }
  return alerts;
};
// Mock Data for Contracts
const mockContracts: Contract[] = [
  { id: 'contract-1', fileName: 'MSA_Vendor_Q2.pdf', status: 'Completed', uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'contract-2', fileName: 'NDA_Project_Phoenix.docx', status: 'Completed', uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'contract-3', fileName: 'Employment_Agreement_JD.doc', status: 'Completed', uploadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
];
const generateMockAnalysis = (contractId: string): ContractAnalysis => ({
  contractId,
  summary: 'This Master Services Agreement outlines the terms for services provided by the vendor, including payment schedules, deliverables, and intellectual property rights. The agreement has a term of 24 months with an auto-renewal clause.',
  keyClauses: [
    { title: 'Term and Termination', content: 'The agreement is valid for 24 months and renews automatically unless a 90-day notice is provided.' },
    { title: 'Limitation of Liability', content: 'Liability is capped at the total fees paid in the preceding 12 months.' },
    { title: 'Confidentiality', content: 'Both parties agree to maintain confidentiality of proprietary information for a period of 5 years post-termination.' },
  ],
  risks: [
    { level: 'Medium', description: 'Auto-renewal clause may lead to an unwanted extension if not tracked properly.' },
    { level: 'Low', description: 'Standard limitation of liability clause, but should be reviewed against project value.' },
  ],
});
// Mock Data for Compliance Audits
const generateMockAudits = (): ComplianceAudit[] => {
  return [
    {
      id: crypto.randomUUID(),
      title: 'Q3 2024 GDPR Compliance Audit',
      framework: 'GDPR',
      status: 'Passed',
      completionDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 100,
      checks: [
        { id: crypto.randomUUID(), description: 'Data Processing Agreement review', status: 'Pass' },
        { id: crypto.randomUUID(), description: 'Consent mechanism verification', status: 'Pass' },
      ],
    },
    {
      id: crypto.randomUUID(),
      title: 'Annual SOC 2 Type II Audit',
      framework: 'SOC 2',
      status: 'In Progress',
      completionDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 65,
      checks: [
        { id: crypto.randomUUID(), description: 'Security policies and procedures review', status: 'Pass' },
        { id: crypto.randomUUID(), description: 'Access control systems audit', status: 'Pass' },
        { id: crypto.randomUUID(), description: 'Change management process evaluation', status: 'N/A' },
      ],
    },
    {
      id: crypto.randomUUID(),
      title: 'ISO 27001 Certification Prep',
      framework: 'ISO 27001',
      status: 'Failed',
      completionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 100,
      checks: [
        { id: crypto.randomUUID(), description: 'Risk assessment and treatment plan', status: 'Pass' },
        { id: crypto.randomUUID(), description: 'ISMS documentation review', status: 'Fail' },
      ],
    },
  ];
};
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'CF Workers Demo' }}));
  // REGULATORY WATCH
  app.get('/api/regulatory-watch', async (c) => {
    await new Promise(res => setTimeout(res, 500));
    const alerts = generateMockAlerts();
    return ok(c, alerts);
  });
  // CONTRACTS
  app.get('/api/contracts', async (c) => {
    await new Promise(res => setTimeout(res, 500));
    return ok(c, mockContracts);
  });
  app.get('/api/contracts/:id/analysis', async (c) => {
    const { id } = c.req.param();
    await new Promise(res => setTimeout(res, 750));
    const contract = mockContracts.find(c => c.id === id);
    if (!contract) {
      return notFound(c, 'Contract analysis not found');
    }
    const analysis = generateMockAnalysis(id);
    return ok(c, analysis);
  });
  app.post('/api/contracts/analyze', async (c) => {
    await new Promise(res => setTimeout(res, 2500));
    const newContract: Contract = {
      id: crypto.randomUUID(),
      fileName: `New_Contract_${Date.now()}.pdf`,
      status: 'Completed',
      uploadDate: new Date().toISOString(),
    };
    mockContracts.unshift(newContract);
    const analysis = generateMockAnalysis(newContract.id);
    return ok(c, { contract: newContract, analysis });
  });
  // COMPLIANCE (New in Phase 5)
  app.get('/api/compliance/audits', async (c) => {
    await new Promise(res => setTimeout(res, 600));
    const audits = generateMockAudits();
    return ok(c, audits);
  });
  // AUTH
  app.post('/api/auth/signup', async (c) => {
    const { name, email } = await c.req.json<SignupPayload>();
    if (!isStr(name) || !isStr(email)) return bad(c, 'Name and email are required');
    const { items: allUsers } = await UserEntity.list(c.env, null, 1000);
    if (allUsers.some(u => u.email === email)) {
      return bad(c, 'User with this email already exists');
    }
    const user = await UserEntity.create(c.env, { id: crypto.randomUUID(), name: name.trim(), email: email.trim() });
    return ok(c, {
      user,
      token: `mock-token-for-${user.id}`,
    });
  });
  app.post('/api/auth/login', async (c) => {
    const { email } = await c.req.json<LoginPayload>();
    if (!isStr(email)) return bad(c, 'Email is required');
    const { items: allUsers } = await UserEntity.list(c.env, null, 1000);
    const user = allUsers.find((u: User) => u.email === email);
    if (!user) {
      return notFound(c, 'User not found');
    }
    return ok(c, {
      user,
      token: `mock-token-for-${user.id}`,
    });
  });
  // USERS
  app.get('/api/users', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await UserEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.post('/api/users', async (c) => {
    const { name } = (await c.req.json()) as { name?: string };
    if (!name?.trim()) return bad(c, 'name required');
    return ok(c, await UserEntity.create(c.env, { id: crypto.randomUUID(), name: name.trim() }));
  });
  // CHATS
  app.get('/api/chats', async (c) => {
    await ChatBoardEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await ChatBoardEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.post('/api/chats', async (c) => {
    const { title } = (await c.req.json()) as { title?: string };
    if (!title?.trim()) return bad(c, 'title required');
    const created = await ChatBoardEntity.create(c.env, { id: crypto.randomUUID(), title: title.trim(), messages: [] });
    return ok(c, { id: created.id, title: created.title });
  });
  // MESSAGES
  app.get('/api/chats/:chatId/messages', async (c) => {
    const chat = new ChatBoardEntity(c.env, c.req.param('chatId'));
    if (!await chat.exists()) return notFound(c, 'chat not found');
    return ok(c, await chat.listMessages());
  });
  app.post('/api/chats/:chatId/messages', async (c) => {
    const chatId = c.req.param('chatId');
    const { userId, text } = (await c.req.json()) as { userId?: string; text?: string };
    if (!isStr(userId) || !text?.trim()) return bad(c, 'userId and text required');
    const chat = new ChatBoardEntity(c.env, chatId);
    if (!await chat.exists()) return notFound(c, 'chat not found');
    return ok(c, await chat.sendMessage(userId, text.trim()));
  });
  // DELETE: Users
  app.delete('/api/users/:id', async (c) => ok(c, { id: c.req.param('id'), deleted: await UserEntity.delete(c.env, c.req.param('id')) }));
  app.post('/api/users/deleteMany', async (c) => {
    const { ids } = (await c.req.json()) as { ids?: string[] };
    const list = ids?.filter(isStr) ?? [];
    if (list.length === 0) return bad(c, 'ids required');
    return ok(c, { deletedCount: await UserEntity.deleteMany(c.env, list), ids: list });
  });
  // DELETE: Chats
  app.delete('/api/chats/:id', async (c) => ok(c, { id: c.req.param('id'), deleted: await ChatBoardEntity.delete(c.env, c.req.param('id')) }));
  app.post('/api/chats/deleteMany', async (c) => {
    const { ids } = (await c.req.json()) as { ids?: string[] };
    const list = ids?.filter(isStr) ?? [];
    if (list.length === 0) return bad(c, 'ids required');
    return ok(c, { deletedCount: await ChatBoardEntity.deleteMany(c.env, list), ids: list });
  });
}