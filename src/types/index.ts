/* ------------------------------------------------------------------ */
/*  Centralized type definitions for the entire frontend              */
/* ------------------------------------------------------------------ */

// ── Auth ──────────────────────────────────────────────────────────────
export interface User {
  id: string;
  username: string;
  role: "customer" | "support_agent" | "operations" | "admin";
  account_id: string;
  account_name: string;
  is_customer: boolean;
  is_internal: boolean;
}

export interface MockToken {
  token: string;
  username: string;
}

// ── Chat ──────────────────────────────────────────────────────────────
export interface ToolStep {
  step_type: "tool_call" | "tool_result" | "response";
  tool_name: string;
  tool_input: Record<string, unknown>;
  tool_output: string;
  requires_confirmation: boolean;
  confirmation_id: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  tool_steps: ToolStep[];
  requires_confirmation: boolean;
  confirmation_id: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages: Message[];
}

export interface ConversationListItem {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  message_count: number;
}

export interface ChatResponse {
  conversation_id: string;
  message: Message;
  requires_confirmation: boolean;
  confirmation_id: string | null;
}

// ── Dashboard ─────────────────────────────────────────────────────────
export interface RecurringIssue {
  issue: string;
  count: number;
}

export interface MultiCustomerIssue {
  issue: string;
  affected_accounts: number;
}

export interface Ticket {
  ticket_id: string;
  account_id: string;
  created_at: string;
  status: string;
  subject: string;
  description: string;
  channel: string;
  assigned_to: string;
  last_customer_message_at: string;
  historical_resolution: string | null;
}

export interface DashboardData {
  high_severity_tickets: Ticket[];
  recurring_issues: RecurringIssue[];
  multi_customer_issues: MultiCustomerIssue[];
  sla_at_risk: Ticket[];
  summary: {
    total_tickets: number;
    open_tickets: number;
    high_severity_count: number;
  };
}

// ── API Wrapper ───────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: number;
    message: string;
    details: unknown;
  };
}

// ── Theme ─────────────────────────────────────────────────────────────
export type Theme = "light" | "dark";

// ── Health ────────────────────────────────────────────────────────────
export interface HealthData {
  status: string;
  vector_store_loaded: boolean;
  vector_count: number;
  data_sheets: string[];
}
