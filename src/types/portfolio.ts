/**
 * TypeScript type definitions for AI Portfolio Chatbot
 * Ensures type safety across configuration files and components
 */

// =============================================================================
// PROGRESSIVE DISCLOSURE TYPES
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

// =============================================================================
// ASSISTANT CONFIGURATION TYPES
// =============================================================================

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

export interface ActionButtons {
  [key: string]: ActionButton;
}

export interface AssistantConfig {
  ASSISTANT_INSTRUCTIONS: string;
  PROGRESSIVE_CONTENT: ProgressiveContent;
  CONTACT_INFO: ContactInfo;
  ACTION_BUTTONS: ActionButtons;
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

export interface Experience {
  current_role: WorkExperience;
  previous_roles?: WorkExperience[];
}

export interface ProjectResults {
  metrics: string[];
  impact: string;
  learnings: string[];
}

export interface ProjectLinks {
  live_site?: string;
  case_study?: string;
  github?: string;
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
  results: ProjectResults;
  links: ProjectLinks;
}

export interface SideProject {
  name: string;
  description: string;
  technologies: string[];
  motivation: string;
  outcome: string;
  link?: string;
}

export interface Projects {
  featured: Project[];
  side_projects?: SideProject[];
}

export interface TechnicalSkill {
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  years_experience: string;
  context: string;
}

export interface SkillCategory {
  category: string;
  items: TechnicalSkill[];
}

export interface DomainExpertise {
  area: string;
  description: string;
  techniques: string[];
}

export interface SoftSkill {
  skill: string;
  evidence: string;
}

export interface TechnicalSkills {
  programming_languages: TechnicalSkill[];
  frameworks_tools: SkillCategory[];
  design_tools?: TechnicalSkill[];
  methodologies: string[];
}

export interface Skills {
  technical: TechnicalSkills;
  domain_expertise: DomainExpertise[];
  soft_skills: SoftSkill[];
}

export interface Education {
  degree: string;
  school: string;
  graduation_year: string;
  location: string;
  relevant_coursework: string[];
  achievements: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  status: string;
}

export interface EducationInfo {
  formal: Education[];
  certifications: Certification[];
  continuous_learning: string[];
}

export interface CareerTransition {
  from: string;
  to: string;
  reason: string;
  outcome: string;
}

export interface CareerStory {
  origin: string;
  key_transitions: CareerTransition[];
  current_focus: string;
  future_goals: string;
}

export interface WorkingStyle {
  collaboration_approach: string;
  problem_solving_process: string;
  communication_style: string;
  ideal_work_environment: string;
}

export interface PersonalInterests {
  professional_interests: string[];
  hobbies: string[];
  fun_facts: string[];
}

export interface PortfolioKnowledge {
  personal: PersonalInfo;
  experience: Experience;
  projects: Projects;
  skills: Skills;
  education: EducationInfo;
  career_story: CareerStory;
  working_style: WorkingStyle;
  personal_interests: PersonalInterests;
}

// =============================================================================
// CONVERSATION GUIDANCE TYPES
// =============================================================================

export interface CommunicationStyle {
  tone: string;
  voice: string;
  avoid: string;
}

export interface FrequentlyAsked {
  [question: string]: string;
}

export interface ConversationGuidance {
  communication_style: CommunicationStyle;
  key_messages: string[];
  frequently_asked: FrequentlyAsked;
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

export interface ActionButtonProps {
  action: ChatAction;
  onClick: (action: ChatAction) => void;
  disabled?: boolean;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type ProgressiveLevel = keyof ProgressiveContent;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

export interface SetupConfig {
  personal: Partial<PersonalInfo>;
  experience: Partial<Experience>;
  projects: Partial<Project>[];
  skills: Partial<Skills>;
  contact: Partial<ContactInfo>;
}

// =============================================================================
// ENVIRONMENT TYPES
// =============================================================================

export interface EnvironmentConfig {
  OPENAI_API_KEY: string;
  NEXT_PUBLIC_APP_URL?: string;
  NEXT_PUBLIC_GA_ID?: string;
  NODE_ENV: 'development' | 'production' | 'test';
  RATE_LIMIT_MAX_REQUESTS?: string;
  RATE_LIMIT_WINDOW_MS?: string;
}

// =============================================================================
// ERROR TYPES
// =============================================================================

export interface APIError {
  error: string;
  status?: number;
  details?: string;
}

export class PortfolioError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'PortfolioError';
  }
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
// DEPLOYMENT TYPES
// =============================================================================

export interface DeploymentConfig {
  platform: 'vercel' | 'netlify' | 'aws' | 'custom';
  domain?: string;
  environment_variables: EnvironmentConfig;
  build_command: string;
  output_directory: string;
}

// =============================================================================
// THEME TYPES
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
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

// =============================================================================
// ALL TYPES ARE ALREADY EXPORTED ABOVE WITH THEIR INTERFACE/TYPE DECLARATIONS
// =============================================================================

// No need for re-export statements since all interfaces and types
// are already exported when declared using 'export interface' or 'export type'
