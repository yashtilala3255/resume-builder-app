"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ZoomIn, ZoomOut, FileText, Save } from "lucide-react"
import { useState } from "react"
import { ModernProfessional } from "@/components/resume-templates/modern-professional"
import { ClassicExecutive } from "@/components/resume-templates/classic-executive"
import type { ResumeData, CustomizationOptions } from "@/lib/resume-types"
import { generateResumePDF } from "@/lib/pdf-generator"

interface ResumePreviewProps {
  resumeData: ResumeData
  selectedTemplate: string
  customization: CustomizationOptions
}

export function ResumePreview({ resumeData, selectedTemplate, customization }: ResumePreviewProps) {
  const [zoom, setZoom] = useState(100)
  const [isExporting, setIsExporting] = useState(false)

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      const resumeElement = document.querySelector(".resume-preview-content") as HTMLElement
      if (!resumeElement) {
        throw new Error("Resume preview not found")
      }

      await generateResumePDF(resumeElement, `${resumeData.personalInfo.fullName || "Resume"}.pdf`)
    } catch (error) {
      console.error("Export failed:", error)
      alert("Failed to export PDF. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const handleSaveDraft = () => {
    // Save to localStorage for demo
    localStorage.setItem(
      "resumeDraft",
      JSON.stringify({
        resumeData,
        selectedTemplate,
        customization,
        savedAt: new Date().toISOString(),
      }),
    )
    alert("Draft saved successfully!")
  }

  const renderTemplate = () => {
    const templateProps = {
      data: resumeData,
      customization: {
        primaryColor: customization.theme.primaryColor,
        fontSize: customization.typography.fontSize,
      },
    }

    switch (selectedTemplate) {
      case "modern-1":
        return <ModernProfessional {...templateProps} />
      case "classic-1":
        return <ClassicExecutive {...templateProps} />
      default:
        return <ModernProfessional {...templateProps} />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Preview Your Resume</h2>
          <p className="text-muted-foreground">See how your resume will look when printed or exported</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 10))}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[60px] text-center">{zoom}%</span>
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(150, zoom + 10))}>
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleExportPDF} disabled={isExporting} className="bg-accent hover:bg-accent/90">
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? "Generating PDF..." : "Export PDF"}
          </Button>
        </div>
      </div>

      {/* Resume Preview */}
      <Card className="p-6 bg-gray-100">
        <div
          className="resume-preview-content mx-auto bg-white shadow-lg transition-transform duration-200"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
            width: "8.5in",
            minHeight: "11in",
          }}
        >
          {selectedTemplate ? (
            renderTemplate()
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Template Selected</h3>
                <p className="text-muted-foreground">Please select a template to preview your resume</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Export Options */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <h4 className="font-medium text-foreground mb-2">PDF Export</h4>
            <p className="text-sm text-muted-foreground mb-3">High-quality PDF perfect for applications</p>
            <Button onClick={handleExportPDF} disabled={isExporting} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? "Generating..." : "Download PDF"}
            </Button>
          </div>

          <div className="p-4 border border-border rounded-lg opacity-50">
            <h4 className="font-medium text-foreground mb-2">Word Document</h4>
            <p className="text-sm text-muted-foreground mb-3">Editable .docx format</p>
            <Button variant="outline" className="w-full bg-transparent" disabled>
              <Download className="w-4 h-4 mr-2" />
              Coming Soon
            </Button>
          </div>

          <div className="p-4 border border-border rounded-lg opacity-50">
            <h4 className="font-medium text-foreground mb-2">Plain Text</h4>
            <p className="text-sm text-muted-foreground mb-3">ATS-friendly text version</p>
            <Button variant="outline" className="w-full bg-transparent" disabled>
              <Download className="w-4 h-4 mr-2" />
              Coming Soon
            </Button>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Export Tips</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
            <p>PDF format is recommended for most job applications as it preserves formatting</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
            <p>Save drafts regularly to avoid losing your progress</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
            <p>Review your resume at different zoom levels to ensure readability</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
            <p>Check the ATS compatibility score before submitting to online applications</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
