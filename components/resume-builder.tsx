"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Settings, Sparkles, Palette } from "lucide-react"
import { TemplateSelection } from "@/components/template-selection"
import { ResumeEditor } from "@/components/resume-editor"
import { CustomizationPanel } from "@/components/customization-panel"
import { ResumePreview } from "@/components/resume-preview"
import { AIAssistant } from "@/components/ai-assistant"
import { useResumeData } from "@/hooks/use-resume-data"
import { generateResumePDF } from "@/lib/pdf-generator"

export function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState<"templates" | "editor" | "customize" | "preview" | "ai">("templates")
  const {
    resumeData,
    updateResumeData,
    selectedTemplate,
    setSelectedTemplate,
    customization,
    updateCustomization,
    calculateSectionScores,
  } = useResumeData()

  const sectionScores = calculateSectionScores()

  const handleExportPDF = async () => {
    if (!selectedTemplate) {
      alert("Please select a template first")
      return
    }

    if (currentStep !== "preview") {
      setCurrentStep("preview")
      // Wait for preview to render
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    try {
      const resumeElement = document.querySelector(".resume-preview-content") as HTMLElement
      if (!resumeElement) {
        throw new Error("Resume preview not found. Please go to Preview tab first.")
      }

      await generateResumePDF(resumeElement, `${resumeData.personalInfo.fullName || "Resume"}.pdf`)
    } catch (error) {
      console.error("Export failed:", error)
      alert("Failed to export PDF. Please try the Export button in the Preview tab.")
    }
  }

  const handleSectionFocus = (section: string) => {
    setCurrentStep("editor")
    // In a real app, this would scroll to or highlight the specific section
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-accent rounded-lg">
                <FileText className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Resume Builder</h1>
                <p className="text-sm text-muted-foreground">Create professional resumes effortlessly</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentStep("preview")}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={handleExportPDF}>
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <nav className="space-y-2">
                <Button
                  variant={currentStep === "templates" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setCurrentStep("templates")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Templates
                </Button>
                <Button
                  variant={currentStep === "editor" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setCurrentStep("editor")}
                  disabled={!selectedTemplate}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Editor
                </Button>
                <Button
                  variant={currentStep === "customize" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setCurrentStep("customize")}
                  disabled={!selectedTemplate}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Customize
                </Button>
                <Button
                  variant={currentStep === "preview" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setCurrentStep("preview")}
                  disabled={!selectedTemplate}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </nav>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">AI Assistant</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Get AI-powered suggestions to improve your resume</p>
                <Button
                  variant={currentStep === "ai" ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                  onClick={() => setCurrentStep("ai")}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Open AI Assistant
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentStep === "templates" && (
              <TemplateSelection selectedTemplate={selectedTemplate} onTemplateSelect={setSelectedTemplate} />
            )}
            {currentStep === "editor" && (
              <ResumeEditor resumeData={resumeData} onUpdateData={updateResumeData} sectionScores={sectionScores} />
            )}
            {currentStep === "customize" && (
              <CustomizationPanel customization={customization} onUpdate={updateCustomization} />
            )}
            {currentStep === "preview" && (
              <ResumePreview
                resumeData={resumeData}
                selectedTemplate={selectedTemplate}
                customization={customization}
              />
            )}
            {currentStep === "ai" && (
              <AIAssistant
                resumeData={resumeData}
                onUpdateData={updateResumeData}
                onSectionFocus={handleSectionFocus}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
