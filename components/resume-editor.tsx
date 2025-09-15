"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  Trash2,
  GripVertical,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
  Trophy,
  Upload,
  X,
  BarChart3,
} from "lucide-react"
import { ResumeScoring } from "@/components/resume-scoring"
import type { ResumeData, WorkExperience, Education, Project, Certification } from "@/lib/resume-types"

interface ResumeEditorProps {
  resumeData: ResumeData
  onUpdateData: (updates: Partial<ResumeData>) => void
  sectionScores: any[]
}

export function ResumeEditor({ resumeData, onUpdateData, sectionScores }: ResumeEditorProps) {
  const [activeSection, setActiveSection] = useState("personal")

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "summary", label: "Summary", icon: FileText },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "certifications", label: "Certifications", icon: Trophy },
    { id: "awards", label: "Awards", icon: Trophy },
    { id: "scoring", label: "Resume Score", icon: BarChart3 },
  ]

  const handleSectionClick = (section: string) => {
    setActiveSection(section)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Edit Your Resume</h2>
        <p className="text-muted-foreground">Fill in your information and track your progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Resume Sections</h3>
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon
                const sectionScore = sectionScores.find((s) => s.section === section.id)
                const scorePercentage = sectionScore
                  ? Math.round((sectionScore.score / sectionScore.maxScore) * 100)
                  : 0

                return (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    className="w-full justify-start text-sm relative"
                    onClick={() => setActiveSection(section.id)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="flex-1 text-left">{section.label}</span>
                    {section.id !== "scoring" && sectionScore && (
                      <div
                        className={`w-2 h-2 rounded-full ml-2 ${
                          scorePercentage >= 80
                            ? "bg-green-500"
                            : scorePercentage >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                    )}
                  </Button>
                )
              })}
            </nav>
          </Card>
        </div>

        {/* Editor Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            {activeSection === "personal" && (
              <PersonalInfoEditor
                data={resumeData.personalInfo}
                onUpdate={(personalInfo) => onUpdateData({ personalInfo })}
              />
            )}
            {activeSection === "summary" && (
              <SummaryEditor data={resumeData.summary} onUpdate={(summary) => onUpdateData({ summary })} />
            )}
            {activeSection === "experience" && (
              <ExperienceEditor data={resumeData.experience} onUpdate={(experience) => onUpdateData({ experience })} />
            )}
            {activeSection === "education" && (
              <EducationEditor data={resumeData.education} onUpdate={(education) => onUpdateData({ education })} />
            )}
            {activeSection === "skills" && (
              <SkillsEditor data={resumeData.skills} onUpdate={(skills) => onUpdateData({ skills })} />
            )}
            {activeSection === "projects" && (
              <ProjectsEditor data={resumeData.projects} onUpdate={(projects) => onUpdateData({ projects })} />
            )}
            {activeSection === "certifications" && (
              <CertificationsEditor
                data={resumeData.certifications}
                onUpdate={(certifications) => onUpdateData({ certifications })}
              />
            )}
            {activeSection === "awards" && (
              <AwardsEditor data={resumeData.awards} onUpdate={(awards) => onUpdateData({ awards })} />
            )}
            {activeSection === "scoring" && (
              <ResumeScoring
                resumeData={resumeData}
                sectionScores={sectionScores}
                onSectionClick={handleSectionClick}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

function PersonalInfoEditor({
  data,
  onUpdate,
}: { data: ResumeData["personalInfo"]; onUpdate: (data: ResumeData["personalInfo"]) => void }) {
  const [profilePicture, setProfilePicture] = useState<string>(data.profilePicture || "")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfilePicture(result)
        onUpdate({ ...data, profilePicture: result })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
        <p className="text-sm text-muted-foreground mb-6">Add your contact details and professional information</p>
      </div>

      {/* Profile Picture */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          {profilePicture ? (
            <img src={profilePicture || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1">
          <Label htmlFor="profile-picture" className="text-sm font-medium">
            Profile Picture
          </Label>
          <div className="flex items-center gap-2 mt-1">
            <Button variant="outline" size="sm" asChild>
              <label htmlFor="profile-picture" className="cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </label>
            </Button>
            {profilePicture && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setProfilePicture("")
                  onUpdate({ ...data, profilePicture: "" })
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <input id="profile-picture" type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => onUpdate({ ...data, fullName: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onUpdate({ ...data, email: e.target.value })}
            placeholder="john.doe@email.com"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => onUpdate({ ...data, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => onUpdate({ ...data, location: e.target.value })}
            placeholder="New York, NY"
          />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={data.website || ""}
            onChange={(e) => onUpdate({ ...data, website: e.target.value })}
            placeholder="https://johndoe.com"
          />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={data.linkedin || ""}
            onChange={(e) => onUpdate({ ...data, linkedin: e.target.value })}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
      </div>
    </div>
  )
}

function SummaryEditor({ data, onUpdate }: { data: string; onUpdate: (data: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Professional Summary</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Write a compelling summary that highlights your key qualifications
        </p>
      </div>

      <div>
        <Label htmlFor="summary">Summary *</Label>
        <Textarea
          id="summary"
          value={data}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder="Experienced software engineer with 5+ years of expertise in full-stack development..."
          className="min-h-[120px] mt-2"
        />
        <p className="text-xs text-muted-foreground mt-2">
          {data.length}/500 characters • Aim for 2-3 sentences that showcase your value proposition
        </p>
      </div>
    </div>
  )
}

function ExperienceEditor({ data, onUpdate }: { data: WorkExperience[]; onUpdate: (data: WorkExperience[]) => void }) {
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [],
    }
    onUpdate([...data, newExp])
  }

  const updateExperience = (id: string, updates: Partial<WorkExperience>) => {
    onUpdate(data.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)))
  }

  const removeExperience = (id: string) => {
    onUpdate(data.filter((exp) => exp.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Work Experience</h3>
          <p className="text-sm text-muted-foreground">Add your professional work history</p>
        </div>
        <Button onClick={addExperience} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        {data.map((exp, index) => (
          <Card key={exp.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                <span className="text-sm font-medium">Experience {index + 1}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => removeExperience(exp.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Job Title *</Label>
                <Input
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <Label>Company *</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  placeholder="Tech Company Inc."
                />
              </div>
              <div>
                <Label>Start Date *</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <div className="space-y-2">
                  <Input
                    type="month"
                    value={exp.endDate || ""}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    disabled={exp.current}
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={exp.current}
                      onCheckedChange={(checked) =>
                        updateExperience(exp.id, { current: checked, endDate: checked ? "" : exp.endDate })
                      }
                    />
                    <Label className="text-sm">Currently working here</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <Label>Job Description</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                placeholder="Describe your role and responsibilities..."
                className="mt-2"
              />
            </div>

            <div>
              <Label>Key Achievements</Label>
              <AchievementsList
                achievements={exp.achievements}
                onUpdate={(achievements) => updateExperience(exp.id, { achievements })}
              />
            </div>
          </Card>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No work experience added yet</p>
          <Button onClick={addExperience} variant="outline" className="mt-4 bg-transparent">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Job
          </Button>
        </div>
      )}
    </div>
  )
}

function AchievementsList({
  achievements,
  onUpdate,
}: { achievements: string[]; onUpdate: (achievements: string[]) => void }) {
  const [newAchievement, setNewAchievement] = useState("")

  const addAchievement = () => {
    if (newAchievement.trim()) {
      onUpdate([...achievements, newAchievement.trim()])
      setNewAchievement("")
    }
  }

  const removeAchievement = (index: number) => {
    onUpdate(achievements.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-2">
        <Input
          value={newAchievement}
          onChange={(e) => setNewAchievement(e.target.value)}
          placeholder="Add an achievement..."
          onKeyPress={(e) => e.key === "Enter" && addAchievement()}
        />
        <Button onClick={addAchievement} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
            <span className="flex-1 text-sm">{achievement}</span>
            <Button variant="ghost" size="sm" onClick={() => removeAchievement(index)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

function EducationEditor({ data, onUpdate }: { data: Education[]; onUpdate: (data: Education[]) => void }) {
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }
    onUpdate([...data, newEdu])
  }

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onUpdate(data.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu)))
  }

  const removeEducation = (id: string) => {
    onUpdate(data.filter((edu) => edu.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Education</h3>
          <p className="text-sm text-muted-foreground">Add your educational background</p>
        </div>
        <Button onClick={addEducation} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((edu, index) => (
          <Card key={edu.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Education {index + 1}</span>
              <Button variant="outline" size="sm" onClick={() => removeEducation(edu.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Institution *</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  placeholder="University of Technology"
                />
              </div>
              <div>
                <Label>Degree *</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div>
                <Label>Field of Study *</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                  placeholder="Computer Science"
                />
              </div>
              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  value={edu.gpa || ""}
                  onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                  placeholder="3.8/4.0"
                />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SkillsEditor({ data, onUpdate }: { data: string[]; onUpdate: (data: string[]) => void }) {
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onUpdate([...data, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    onUpdate(data.filter((s) => s !== skill))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Skills</h3>
        <p className="text-sm text-muted-foreground">Add your technical and soft skills</p>
      </div>

      <div className="flex gap-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill..."
          onKeyPress={(e) => e.key === "Enter" && addSkill()}
        />
        <Button onClick={addSkill}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {data.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-sm">
            {skill}
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-auto p-0 hover:bg-transparent"
              onClick={() => removeSkill(skill)}
            >
              <X className="w-3 h-3" />
            </Button>
          </Badge>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No skills added yet</p>
        </div>
      )}
    </div>
  )
}

function ProjectsEditor({ data, onUpdate }: { data: Project[]; onUpdate: (data: Project[]) => void }) {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      url: "",
      startDate: "",
      endDate: "",
    }
    onUpdate([...data, newProject])
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    onUpdate(data.map((project) => (project.id === id ? { ...project, ...updates } : project)))
  }

  const removeProject = (id: string) => {
    onUpdate(data.filter((project) => project.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Projects</h3>
          <p className="text-sm text-muted-foreground">Showcase your notable projects</p>
        </div>
        <Button onClick={addProject} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((project, index) => (
          <Card key={project.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Project {index + 1}</span>
              <Button variant="outline" size="sm" onClick={() => removeProject(project.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Project Name *</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(project.id, { name: e.target.value })}
                    placeholder="E-commerce Platform"
                  />
                </div>
                <div>
                  <Label>Project URL</Label>
                  <Input
                    value={project.url || ""}
                    onChange={(e) => updateProject(project.id, { url: e.target.value })}
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              <div>
                <Label>Description *</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  placeholder="Describe what the project does and your role..."
                />
              </div>

              <div>
                <Label>Technologies Used</Label>
                <SkillsInput
                  skills={project.technologies}
                  onUpdate={(technologies) => updateProject(project.id, { technologies })}
                  placeholder="React, Node.js, MongoDB..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={project.startDate}
                    onChange={(e) => updateProject(project.id, { startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={project.endDate}
                    onChange={(e) => updateProject(project.id, { endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CertificationsEditor({
  data,
  onUpdate,
}: { data: Certification[]; onUpdate: (data: Certification[]) => void }) {
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      url: "",
    }
    onUpdate([...data, newCert])
  }

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    onUpdate(data.map((cert) => (cert.id === id ? { ...cert, ...updates } : cert)))
  }

  const removeCertification = (id: string) => {
    onUpdate(data.filter((cert) => cert.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Certifications</h3>
          <p className="text-sm text-muted-foreground">Add your professional certifications</p>
        </div>
        <Button onClick={addCertification} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((cert, index) => (
          <Card key={cert.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Certification {index + 1}</span>
              <Button variant="outline" size="sm" onClick={() => removeCertification(cert.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Certification Name *</Label>
                <Input
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>
              <div>
                <Label>Issuing Organization *</Label>
                <Input
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                  placeholder="Amazon Web Services"
                />
              </div>
              <div>
                <Label>Date Obtained *</Label>
                <Input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                />
              </div>
              <div>
                <Label>Credential URL</Label>
                <Input
                  value={cert.url || ""}
                  onChange={(e) => updateCertification(cert.id, { url: e.target.value })}
                  placeholder="https://credly.com/badges/..."
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AwardsEditor({ data, onUpdate }: { data: any[]; onUpdate: (data: any[]) => void }) {
  const addAward = () => {
    const newAward: any = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      description: "",
    }
    onUpdate([...data, newAward])
  }

  const updateAward = (id: string, updates: Partial<any>) => {
    onUpdate(data.map((award) => (award.id === id ? { ...award, ...updates } : award)))
  }

  const removeAward = (id: string) => {
    onUpdate(data.filter((award) => award.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Awards & Achievements</h3>
          <p className="text-sm text-muted-foreground">Highlight your notable awards and achievements</p>
        </div>
        <Button onClick={addAward} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Award
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((award, index) => (
          <Card key={award.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Award {index + 1}</span>
              <Button variant="outline" size="sm" onClick={() => removeAward(award.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Award Name *</Label>
                  <Input
                    value={award.name}
                    onChange={(e) => updateAward(award.id, { name: e.target.value })}
                    placeholder="Employee of the Year"
                  />
                </div>
                <div>
                  <Label>Issuing Organization *</Label>
                  <Input
                    value={award.issuer}
                    onChange={(e) => updateAward(award.id, { issuer: e.target.value })}
                    placeholder="Tech Company Inc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Date Received *</Label>
                  <Input
                    type="month"
                    value={award.date}
                    onChange={(e) => updateAward(award.id, { date: e.target.value })}
                  />
                </div>
                <div></div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={award.description || ""}
                  onChange={(e) => updateAward(award.id, { description: e.target.value })}
                  placeholder="Brief description of the award and why you received it..."
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SkillsInput({
  skills,
  onUpdate,
  placeholder,
}: { skills: string[]; onUpdate: (skills: string[]) => void; placeholder: string }) {
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onUpdate([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    onUpdate(skills.filter((s) => s !== skill))
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder={placeholder}
          onKeyPress={(e) => e.key === "Enter" && addSkill()}
        />
        <Button onClick={addSkill} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-sm">
            {skill}
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-auto p-0 hover:bg-transparent"
              onClick={() => removeSkill(skill)}
            >
              <X className="w-3 h-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
