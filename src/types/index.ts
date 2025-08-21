/**
 * Comprehensive TypeScript type definitions for AI Portfolio Chatbot
 * This file likely doesn't exist in the current repo and would add significant value
 * for type safety across configuration files and components
 */

// =============================================================================
// CORE CONFIGURATION TYPES
// =============================================================================

export interface ProgressiveContentItem {
  title: string;
  description: string;
  buttonText: string;
  nextLevel: string | null;
}

export interface ProgressiveContent {
  [levelKey: string]: {
    [itemKey: string]: ProgressiveContentItem;
  };
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github?: string;
  portfolio?: string;
  resume: string;
}

export interface ActionButton {
  text: string;
  action: 'download_resume' | 'show_contact' | 'external_portfolio' | string;
}

// =============================================================================
// PORTFOLIO KNOWLEDGE TYPES
// =============================================================================

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github?: string;
  portfolio?: string;
  elevator_pitch: string;
  values: string[];
  passions?: string[];
}

export interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  key_achievements: string[];
  technologies: string[];
}

export interface Project {
  name: string;
  type: string;
  company: string;
  duration: string;
  team_size: string;
  overview: string;
  challenge: string;
  solution: string;
  your_role: string;
  technologies: string[];
  results: {
    metrics: string[];
    impact: string;
    learnings: string[];
  };
  links: {
    live_site?: string;
    case_study?: string;
    github?: string;
  };
}

export interface TechnicalSkill {
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  years_experience: string;
  context: string;
}

export interface DomainExpertise {
  area: string;
  description: string;
  techniques: string[];
}

// =============================================================================
// CHAT API TYPES
// =============================================================================

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface ProgressiveButton {
  text: string;
  level: string;
  description?: string;
}

export interface ChatAction {
  type: 'download' | 'contact' | 'external';
  text: string;
  url?: string;
}

export interface ChatResponse {
  message: string;
  buttons?: ProgressiveButton[];
  actions?: ChatAction[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ChatRequest {
  messages: ChatMessage[];
  context?: string;
  progressiveLevel?: string;
}

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

export interface ChatInterfaceProps {
  initialMessage?: string;
  theme?: 'light' | 'dark';
  primaryColor?: string;
  showAvatar?: boolean;
  enableVoiceInput?: boolean;
}

export interface MessageBubbleProps {
  message: ChatMessage;
  isUser: boolean;
  showAvatar?: boolean;
  avatarUrl?: string;
}

export interface ProgressiveButtonProps {
  button: ProgressiveButton;
  onClick: (level: string) => void;
  disabled?: boolean;
}

// =============================================================================
// ERROR & VALIDATION TYPES
// =============================================================================

export interface APIError {
  error: string;
  status?: number;
  details?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

export class PortfolioConfigError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'PortfolioConfigError';
  }
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type ProgressiveLevel = string;

export interface SetupConfig {
  personal: Partial<PersonalInfo>;
  experience: Partial<WorkExperience>;
  projects: Partial<Project>[];
  skills: {
    technical: TechnicalSkill[];
    domain_expertise: DomainExpertise[];
  };
  contact: Partial<ContactInfo>;
}

// =============================================================================
// ENVIRONMENT & DEPLOYMENT TYPES
// =============================================================================

export interface EnvironmentConfig {
  OPENAI_API_KEY: string;
  NEXT_PUBLIC_APP_URL?: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

// =============================================================================
// THEME CONFIGURATION TYPES
// =============================================================================

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
  };
  fonts: {
    body: string;
    heading: string;
    monospace: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// =============================================================================
// ANALYTICS TYPES
// =============================================================================

export interface AnalyticsEvent {
  event_name: string;
  event_data: {
    message_type?: 'user_question' | 'assistant_response';
    progressive_level?: string;
    button_clicked?: string;
    session_duration?: number;
    [key: string]: any;
  };
  timestamp: string;
}

// =============================================================================
// ALL TYPES ARE ALREADY EXPORTED ABOVE WITH THEIR INTERFACE/TYPE DECLARATIONS
// =============================================================================

// No need for re-export statements since all interfaces and types
// are already exported when declared using 'export interface' or 'export type'
