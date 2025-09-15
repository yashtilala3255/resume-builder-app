export interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    website?: string
    linkedin?: string
    profilePicture?: string
  }
  summary: string
  experience: WorkExperience[]
  education: Education[]
  skills: string[]
  projects: Project[]
  certifications: Certification[]
  awards: Award[]
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url?: string
  startDate: string
  endDate: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url?: string
}

export interface Award {
  id: string
  name: string
  issuer: string
  date: string
  description?: string
}

export interface ResumeTemplate {
  id: string
  name: string
  description: string
  preview: string
  category: "modern" | "classic" | "creative" | "minimal"
}

export interface CustomizationOptions {
  theme: {
    primaryColor: string
    accentColor: string
    backgroundColor: string
    textColor: string
  }
  typography: {
    fontFamily: string
    fontSize: number
    lineHeight: number
  }
  layout: {
    columns: 1 | 2
    spacing: "compact" | "normal" | "spacious"
    margins: number
  }
}

export interface SectionScore {
  section: keyof ResumeData
  score: number
  maxScore: number
  suggestions: string[]
}
