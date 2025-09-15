"use client"

import { useState, useCallback, useEffect } from "react"
import type { ResumeData, SectionScore, CustomizationOptions } from "@/lib/resume-types"

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    profilePicture: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  awards: [],
}

const initialCustomization: CustomizationOptions = {
  theme: {
    primaryColor: "#1f2937",
    accentColor: "#8b5cf6",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
  },
  typography: {
    fontFamily: "font-sans",
    fontSize: 14,
    lineHeight: 1.5,
  },
  layout: {
    columns: 1,
    spacing: "normal",
    margins: 20,
  },
}

export function useResumeData() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [customization, setCustomization] = useState<CustomizationOptions>(initialCustomization)

  useEffect(() => {
    const savedDraft = localStorage.getItem("resumeDraft")
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft)
        if (parsed.resumeData) setResumeData(parsed.resumeData)
        if (parsed.selectedTemplate) setSelectedTemplate(parsed.selectedTemplate)
        if (parsed.customization) setCustomization(parsed.customization)
      } catch (error) {
        console.error("Failed to load saved draft:", error)
      }
    }
  }, [])

  const updateResumeData = useCallback((updates: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...updates }))
  }, [])

  const updateCustomization = useCallback((updates: Partial<CustomizationOptions>) => {
    setCustomization((prev) => ({ ...prev, ...updates }))
  }, [])

  const calculateSectionScores = useCallback((): SectionScore[] => {
    const scores: SectionScore[] = []

    // Personal Info Score
    const personalInfoFields = Object.values(resumeData.personalInfo).filter(Boolean).length
    scores.push({
      section: "personalInfo",
      score: personalInfoFields,
      maxScore: 7,
      suggestions: personalInfoFields < 4 ? ["Add more contact information"] : [],
    })

    // Summary Score
    const summaryScore = resumeData.summary.length > 50 ? 100 : (resumeData.summary.length / 50) * 100
    scores.push({
      section: "summary",
      score: Math.round(summaryScore),
      maxScore: 100,
      suggestions: summaryScore < 80 ? ["Write a more detailed professional summary"] : [],
    })

    // Experience Score
    scores.push({
      section: "experience",
      score: Math.min(resumeData.experience.length * 25, 100),
      maxScore: 100,
      suggestions: resumeData.experience.length < 2 ? ["Add more work experience"] : [],
    })

    // Skills Score
    scores.push({
      section: "skills",
      score: Math.min(resumeData.skills.length * 10, 100),
      maxScore: 100,
      suggestions: resumeData.skills.length < 5 ? ["Add more relevant skills"] : [],
    })

    // Education Score
    scores.push({
      section: "education",
      score: Math.min(resumeData.education.length * 50, 100),
      maxScore: 100,
      suggestions: resumeData.education.length === 0 ? ["Add your educational background"] : [],
    })

    // Projects Score
    scores.push({
      section: "projects",
      score: Math.min(resumeData.projects.length * 33, 100),
      maxScore: 100,
      suggestions: resumeData.projects.length < 2 ? ["Add relevant projects to showcase your skills"] : [],
    })

    return scores
  }, [resumeData])

  return {
    resumeData,
    updateResumeData,
    selectedTemplate,
    setSelectedTemplate,
    customization,
    updateCustomization,
    calculateSectionScores,
  }
}
