"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Check } from "lucide-react"
import type { ResumeTemplate } from "@/lib/resume-types"

const templates: ResumeTemplate[] = [
  {
    id: "modern-1",
    name: "Modern Professional",
    description: "Clean design with accent colors and modern typography",
    preview: "/modern-professional-resume.png",
    category: "modern",
  },
  {
    id: "classic-1",
    name: "Classic Executive",
    description: "Traditional layout perfect for corporate roles",
    preview: "/classic-executive-resume.png",
    category: "classic",
  },
  {
    id: "creative-1",
    name: "Creative Designer",
    description: "Bold design for creative professionals",
    preview: "/creative-designer-resume-template.jpg",
    category: "creative",
  },
  {
    id: "minimal-1",
    name: "Minimal Clean",
    description: "Simple and elegant with focus on content",
    preview: "/minimal-clean-resume-template.jpg",
    category: "minimal",
  },
  {
    id: "modern-2",
    name: "Tech Professional",
    description: "Modern layout optimized for tech roles",
    preview: "/tech-professional-resume-template.jpg",
    category: "modern",
  },
  {
    id: "classic-2",
    name: "Academic Scholar",
    description: "Traditional format for academic positions",
    preview: "/academic-scholar-resume-template.jpg",
    category: "classic",
  },
]

interface TemplateSelectionProps {
  selectedTemplate: string
  onTemplateSelect: (templateId: string) => void
}

export function TemplateSelection({ selectedTemplate, onTemplateSelect }: TemplateSelectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "modern", label: "Modern" },
    { id: "classic", label: "Classic" },
    { id: "creative", label: "Creative" },
    { id: "minimal", label: "Minimal" },
  ]

  const filteredTemplates =
    selectedCategory === "all" ? templates : templates.filter((template) => template.category === selectedCategory)

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Choose a Template</h2>
        <p className="text-muted-foreground">Select a professional template to get started with your resume</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="text-sm"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={`group relative overflow-hidden transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id ? "ring-2 ring-accent" : ""
            }`}
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <img
                src={template.preview || "/placeholder.svg"}
                alt={`${template.name} template preview`}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => setPreviewTemplate(template.id)}>
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  onClick={() => onTemplateSelect(template.id)}
                  className="bg-accent hover:bg-accent/90"
                >
                  {selectedTemplate === template.id ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Selected
                    </>
                  ) : (
                    "Select"
                  )}
                </Button>
              </div>

              {/* Selected indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-accent text-accent-foreground rounded-full p-1">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">{template.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {template.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{template.description}</p>

              <Button
                variant={selectedTemplate === template.id ? "default" : "outline"}
                size="sm"
                className="w-full"
                onClick={() => onTemplateSelect(template.id)}
              >
                {selectedTemplate === template.id ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Selected
                  </>
                ) : (
                  "Select Template"
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={templates.find((t) => t.id === previewTemplate)!}
          onClose={() => setPreviewTemplate(null)}
          onSelect={() => {
            onTemplateSelect(previewTemplate)
            setPreviewTemplate(null)
          }}
          isSelected={selectedTemplate === previewTemplate}
        />
      )}
    </div>
  )
}

interface TemplatePreviewModalProps {
  template: ResumeTemplate
  onClose: () => void
  onSelect: () => void
  isSelected: boolean
}

function TemplatePreviewModal({ template, onClose, onSelect, isSelected }: TemplatePreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">{template.name}</h3>
            <p className="text-sm text-muted-foreground">{template.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={onSelect} className="bg-accent hover:bg-accent/90">
              {isSelected ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Selected
                </>
              ) : (
                "Select Template"
              )}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        <div className="p-4 overflow-auto max-h-[calc(90vh-100px)]">
          <div className="flex justify-center">
            <img
              src={template.preview || "/placeholder.svg"}
              alt={`${template.name} template preview`}
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
