// =============================================================================
// SAMPLE PORTFOLIO KNOWLEDGE - Example with Real Data
// =============================================================================
// This shows how to fill out the portfolio-knowledge.ts file with actual information

export const SAMPLE_PORTFOLIO_KNOWLEDGE = {
  
  personal: {
    name: "Bethany Robertson",
    title: "Senior UX Designer", 
    location: "San Francisco, CA",
    email: "bethany@example.com",
    linkedin: "linkedin.com/in/bethany-robertson",
    github: "github.com/bethanyrobertson", 
    portfolio: "bethanydesign.com",
    
    elevator_pitch: `
    I'm a product designer with 6+ years of experience creating user-centered 
    digital experiences for fintech and healthcare companies. I specialize in design 
    systems and have led cross-functional teams to deliver award-winning mobile and web applications.
    `,
    
    values: [
      "User-centered design",
      "Continuous learning", 
      "Collaborative leadership"
    ],
    
    passions: [
      "Accessibility in design",
      "Mentoring junior designers",
      "Sustainable technology solutions"
    ]
  },

  experience: {
    current_role: {
      title: "Senior UX Designer",
      company: "TechFlow Inc", 
      duration: "Jan 2022 - Present",
      location: "San Francisco, CA (Remote)",
      
      description: `
      Leading design for TechFlow's core financial platform used by 200K+ users daily. 
      I work with a cross-functional team of 12 engineers, 2 product managers, and 
      3 other designers to ship features that directly impact user satisfaction and business growth.
      `,
      
      key_achievements: [
        "Increased user engagement by 35% through redesign of core dashboard features",
        "Led migration to new design system, reducing design-to-dev handoff by 50%",
        "Mentored 4 junior designers, 2 of whom were promoted within 12 months"
      ],
      
      technologies: [
        "Figma", "Adobe Creative Suite", "Miro", "React", "TypeScript"
      ]
    },
    
    previous_roles: [
      {
        title: "Product Designer",
        company: "HealthTech Solutions",
        duration: "Jun 2019 - Dec 2021",
        location: "Palo Alto, CA",
        
        description: `
        Designed patient-facing mobile app and provider dashboard for telehealth platform
        `,
        
        key_achievements: [
          "Improved patient onboarding completion rate by 45%",
          "Designed HIPAA-compliant interface used by 50+ healthcare providers"
        ],
        
        technologies: [
          "Sketch", "InVision", "UserTesting", "HTML/CSS"
        ]
      }
    ]
  },

  projects: {
    featured: [
      {
        name: "FinTech Dashboard Redesign",
        type: "Web Platform",
        company: "TechFlow Inc",
        duration: "6 months",
        team_size: "8 people (2 designers, 4 developers, 1 PM, 1 researcher)",
        
        overview: `
        Complete redesign of the main user dashboard to improve usability and reduce 
        cognitive load for financial advisors managing multiple client portfolios.
        `,
        
        challenge: `
        Users were struggling with information overload - the original dashboard showed 
        too much data without clear hierarchy. Support tickets increased 40% over 6 months, 
        and user satisfaction scores dropped to 2.1/5. Financial advisors were spending 
        3x longer than expected to complete basic tasks.
        `,
        
        solution: `
        I led a user research initiative with 25 financial advisors, conducted card sorting 
        exercises, and created personas based on different use cases. We implemented a 
        progressive disclosure approach, reorganized information architecture, and 
        introduced smart defaults to reduce decision fatigue.
        `,
        
        your_role: `
        I owned the end-to-end design process: user research, wireframing, prototyping, 
        and design system updates. I collaborated closely with engineering on technical 
        feasibility and led design reviews with stakeholders. I also created the testing 
        plan and analyzed usability test results.
        `,
        
        technologies: [
          "Figma", "Miro", "UserTesting", "Hotjar", "React", "TypeScript"
        ],
        
        results: {
          metrics: [
            "40% reduction in support tickets",
            "User satisfaction improved from 2.1 to 4.3/5",
            "Task completion time reduced by 60%"
          ],
          
          impact: `
          The redesign directly contributed to a 25% increase in user retention and 
          $2M in additional revenue from improved user experience. The design patterns 
          we created became the foundation for our design system, now used across 
          8 product teams.
          `,
          
          learnings: [
            "Progressive disclosure is crucial for complex financial data",
            "Involving users early prevents costly redesigns later",
            "Design systems scale impact beyond individual projects"
          ]
        },
        
        links: {
          live_site: "https://techflow.com/dashboard",
          case_study: "https://bethanydesign.com/case-study/fintech-dashboard", 
          github: ""
        }
      },
      
      {
        name: "Healthcare Mobile App",
        type: "Mobile App",
        company: "HealthTech Solutions",
        duration: "4 months",
        team_size: "6 people (1 designer, 3 developers, 1 PM, 1 researcher)",
        overview: "Patient-facing mobile app for telehealth consultations and health tracking",
        challenge: "Patients over 65 had difficulty navigating existing telehealth solutions",
        solution: "Designed simplified interface with large touch targets and clear visual hierarchy", 
        your_role: "Solo designer responsible for all mobile design work and user testing",
        technologies: ["Sketch", "Principle", "InVision", "React Native"],
        results: {
          metrics: ["4.8/5 App Store rating", "85% user retention after 3 months"],
          impact: "Enabled 10,000+ patients to access healthcare during COVID-19",
          learnings: ["Accessibility benefits all users, not just those with disabilities"]
        },
        links: {
          live_site: "https://apps.apple.com/healthtech-app",
          case_study: "https://bethanydesign.com/case-study/healthcare-mobile"
        }
      }
    ],
    
    side_projects: [
      {
        name: "Design System Starter Kit",
        description: "Open-source Figma template for building design systems from scratch",
        technologies: ["Figma", "GitHub", "Documentation"],
        motivation: "Wanted to help other designers avoid common design system pitfalls",
        outcome: "1,200+ downloads, featured in Figma Community",
        link: "https://github.com/bethanyrobertson/design-system-starter"
      }
    ]
  },

  skills: {
    technical: {
      programming_languages: [
        {
          name: "HTML/CSS",
          proficiency: "Advanced",
          years_experience: "5 years",
          context: "Prototyping and collaborating with developers"
        },
        {
          name: "JavaScript",
          proficiency: "Intermediate", 
          years_experience: "2 years",
          context: "Creating interactive prototypes"
        }
      ],
      
      frameworks_tools: [
        {
          category: "Design Tools",
          items: [
            {
              name: "Figma",
              proficiency: "Expert",
              context: "Primary design tool for all projects"
            },
            {
              name: "Adobe Creative Suite", 
              proficiency: "Advanced",
              context: "Illustration and brand work"
            }
          ]
        }
      ],
      
      design_tools: [
        {
          name: "Figma",
          proficiency: "Expert",
          years_experience: "4 years",
          specialization: "Component libraries and design systems"
        }
      ],
      
      methodologies: [
        "Design Thinking",
        "Agile/Scrum", 
        "User-Centered Design"
      ]
    },
    
    domain_expertise: [
      {
        area: "User Research",
        description: "Planning and conducting user interviews, usability tests, and surveys",
        techniques: ["User interviews", "Usability testing", "Card sorting"]
      },
      {
        area: "Design Systems", 
        description: "Building scalable design systems and component libraries",
        techniques: ["Component design", "Design tokens", "Documentation"]
      }
    ],
    
    soft_skills: [
      {
        skill: "Cross-functional Collaboration",
        evidence: "Led design reviews with 15+ stakeholders across engineering, product, and business teams"
      },
      {
        skill: "Mentoring & Teaching",
        evidence: "Mentored 4 junior designers and conducted 20+ design workshops for non-designers"
      }
    ]
  },

  education: {
    formal: [
      {
        degree: "Bachelor of Arts in Psychology",
        school: "UC Berkeley",
        graduation_year: "2017",
        location: "Berkeley, CA",
        relevant_coursework: [
          "Cognitive Psychology",
          "Statistics"
        ],
        achievements: [
          "Magna Cum Laude"
        ]
      }
    ],
    
    certifications: [
      {
        name: "Google UX Design Certificate",
        issuer: "Google/Coursera", 
        date: "2019",
        status: "Active"
      }
    ],
    
    continuous_learning: [
      "Attended UX Week 2023 conference",
      "Currently reading 'Design Systems' by Alla Kholmatova",
      "Learning advanced Figma auto-layout techniques"
    ]
  },

  career_story: {
    origin: `
    I discovered UX design during my psychology studies when I realized how much 
    human behavior influences technology adoption. After graduation, I taught myself 
    design tools and landed my first role at a healthcare startup.
    `,
    
    key_transitions: [
      {
        from: "Psychology student",
        to: "UX Designer", 
        reason: "Wanted to apply psychology principles to improve technology",
        outcome: "Gained deep understanding of user behavior and research methods"
      }
    ],
    
    current_focus: `
    I'm focused on building design systems that scale across large organizations 
    while maintaining accessibility and usability standards.
    `,
    
    future_goals: `
    I want to lead design at a company that's making healthcare or financial services 
    more accessible to underserved communities.
    `
  },

  working_style: {
    collaboration_approach: `
    I believe in involving stakeholders in the design process through workshops and 
    regular feedback sessions. I work best in environments where designers and 
    developers collaborate closely throughout the project lifecycle.
    `,
    
    problem_solving_process: `
    I always start with understanding the user problem through research, then explore 
    multiple solutions before converging on the best approach. I validate designs 
    through testing before implementation.
    `,
    
    communication_style: `
    I tailor my communication to the audience - detailed design rationale for 
    stakeholders, technical specifications for developers, and user-focused 
    stories for product managers.
    `,
    
    ideal_work_environment: `
    I thrive in collaborative, user-focused environments where design has a seat 
    at the table for strategic decisions. I prefer companies that invest in design 
    systems and user research.
    `
  },

  personal_interests: {
    professional_interests: [
      "Accessibility in design",
      "Design systems at scale"
    ],
    
    hobbies: [
      "Rock climbing",
      "Photography"
    ],
    
    fun_facts: [
      "I've climbed El Capitan in Yosemite",
      "I volunteer teaching design to high school students"
    ]
  }
};

// =============================================================================
// CONVERSATION GUIDANCE
// =============================================================================
export const SAMPLE_CONVERSATION_GUIDANCE = {
  communication_style: {
    tone: "Professional but approachable and enthusiastic about design",
    voice: "Clear and thoughtful, with specific examples to illustrate points",
    avoid: "Being too modest about achievements or overly technical jargon"
  },
  
  key_messages: [
    "I'm passionate about creating inclusive design solutions that work for everyone",
    "I believe in data-driven design decisions backed by user research", 
    "I love mentoring other designers and building collaborative teams"
  ],
  
  frequently_asked: {
    "Tell me about yourself": "Reference the elevator pitch and expand with current role context",
    "What's your biggest achievement?": "Focus on the FinTech dashboard project with specific metrics",
    "What are you looking for?": "Design leadership role at a mission-driven company focused on accessibility",
    "What's your weakness?": "I sometimes spend too much time perfecting designs, but I've learned to set clear timelines and get feedback early"
  }
};
