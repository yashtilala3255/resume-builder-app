"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
  Trophy,
  Lightbulb,
} from "lucide-react"
import type { SectionScore, ResumeData } from "@/lib/resume-types"

interface ResumeScoringProps {
  resumeData: ResumeData
  sectionScores: SectionScore[]
  onSectionClick: (section: string) => void
}

const sectionIcons = {
  personalInfo: User,
  summary: FileText,
  experience: Briefcase,
  education: GraduationCap,
  skills: Code,
  projects: FolderOpen,
  certifications: Trophy,
  awards: Trophy,
}

const sectionLabels = {
  personalInfo: "Personal Info",
  summary: "Professional Summary",
  experience: "Work Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  awards: "Awards",
}

export function ResumeScoring({ resumeData, sectionScores, onSectionClick }: ResumeScoringProps) {
  const overallScore = Math.round(
    sectionScores.reduce((acc, section) => acc + (section.score / section.maxScore) * 100, 0) / sectionScores.length,
  )

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreIcon = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return CheckCircle
    if (percentage >= 60) return AlertCircle
    return XCircle
  }

  const getScoreBadgeVariant = (score: number, maxScore: number): "default" | "secondary" | "destructive" => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return "default"
    if (percentage >= 60) return "secondary"
    return "destructive"
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Resume Strength Analysis</h3>
        <p className="text-sm text-muted-foreground">Track your progress and get suggestions to improve your resume</p>
      </div>

      {/* Overall Score */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Overall Resume Score</h4>
              <p className="text-sm text-muted-foreground">Based on completeness and quality</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-foreground">{overallScore}%</div>
            <Badge variant={overallScore >= 80 ? "default" : overallScore >= 60 ? "secondary" : "destructive"}>
              {overallScore >= 80 ? "Excellent" : overallScore >= 60 ? "Good" : "Needs Work"}
            </Badge>
          </div>
        </div>
        <Progress value={overallScore} className="h-3" />
      </Card>

      {/* Section Scores */}
      <Card className="p-6">
        <h4 className="font-semibold text-foreground mb-4">Section Analysis</h4>
        <div className="space-y-4">
          {sectionScores.map((section) => {
            const Icon = sectionIcons[section.section as keyof typeof sectionIcons]
            const ScoreIcon = getScoreIcon(section.score, section.maxScore)
            const percentage = Math.round((section.score / section.maxScore) * 100)

            return (
              <div key={section.section} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h5 className="font-medium text-foreground">
                        {sectionLabels[section.section as keyof typeof sectionLabels]}
                      </h5>
                      <div className="flex items-center gap-2 mt-1">
                        <ScoreIcon className={`w-4 h-4 ${getScoreColor(section.score, section.maxScore)}`} />
                        <span className="text-sm text-muted-foreground">
                          {section.score}/{section.maxScore} completed
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-foreground">{percentage}%</div>
                    <Badge variant={getScoreBadgeVariant(section.score, section.maxScore)} className="text-xs">
                      {percentage >= 80 ? "Complete" : percentage >= 60 ? "Good" : "Incomplete"}
                    </Badge>
                  </div>
                </div>

                <Progress value={percentage} className="h-2" />

                {section.suggestions.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-1">Suggestions:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {section.suggestions.map((suggestion, index) => (
                            <li key={index}>• {suggestion}</li>
                          ))}
                        </ul>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 h-7 text-xs bg-transparent"
                          onClick={() => onSectionClick(section.section)}
                        >
                          Improve Section
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* ATS Optimization Score */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-foreground">ATS Compatibility</h4>
            <p className="text-sm text-muted-foreground">How well your resume works with applicant tracking systems</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">85%</div>
            <Badge variant="default">ATS Friendly</Badge>
          </div>
        </div>
        <Progress value={85} className="h-2 mb-3" />
        <div className="text-sm text-muted-foreground">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Standard fonts and formatting</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Clear section headings</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <span>Consider adding more industry keywords</span>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="p-6">
        <h4 className="font-semibold text-foreground mb-4">Resume Statistics</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{resumeData.experience.length}</div>
            <div className="text-sm text-muted-foreground">Work Experiences</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{resumeData.skills.length}</div>
            <div className="text-sm text-muted-foreground">Skills Listed</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{resumeData.projects.length}</div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{resumeData.certifications.length}</div>
            <div className="text-sm text-muted-foreground">Certifications</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
