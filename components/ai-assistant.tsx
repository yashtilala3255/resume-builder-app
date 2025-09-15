"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sparkles,
  MessageSquare,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import type { ResumeData } from "@/lib/resume-types"

interface AIAssistantProps {
  resumeData: ResumeData
  onUpdateData: (updates: Partial<ResumeData>) => void
  onSectionFocus: (section: string) => void
}

interface AISuggestion {
  id: string
  type: "improvement" | "ats" | "content" | "keyword"
  section: string
  title: string
  description: string
  before?: string
  after?: string
  impact: "high" | "medium" | "low"
  applied: boolean
}

const mockSuggestions: AISuggestion[] = [
  {
    id: "1",
    type: "improvement",
    section: "summary",
    title: "Strengthen Your Professional Summary",
    description: "Add quantifiable achievements and specific skills to make your summary more impactful.",
    before: "Experienced software engineer with expertise in development.",
    after:
      "Results-driven software engineer with 5+ years of experience building scalable web applications, leading cross-functional teams of 8+ developers, and improving system performance by 40%.",
    impact: "high",
    applied: false,
  },
  {
    id: "2",
    type: "ats",
    section: "skills",
    title: "Add Industry Keywords",
    description: "Include more relevant technical keywords that ATS systems commonly scan for.",
    before: "JavaScript, React, Node.js",
    after: "JavaScript, React.js, Node.js, TypeScript, REST APIs, GraphQL, AWS, Docker, Kubernetes, Agile/Scrum",
    impact: "high",
    applied: false,
  },
  {
    id: "3",
    type: "content",
    section: "experience",
    title: "Quantify Your Achievements",
    description: "Add specific numbers and metrics to demonstrate your impact.",
    before: "Improved application performance and user experience.",
    after:
      "Optimized application performance by 35%, reducing load times from 3.2s to 2.1s, resulting in 25% increase in user engagement and $50K annual cost savings.",
    impact: "high",
    applied: false,
  },
  {
    id: "4",
    type: "keyword",
    section: "experience",
    title: "Industry-Specific Terms",
    description: "Use more specific technical terminology that recruiters search for.",
    before: "Worked on database optimization",
    after: "Implemented database indexing strategies and query optimization techniques using PostgreSQL",
    impact: "medium",
    applied: false,
  },
]

export function AIAssistant({ resumeData, onUpdateData, onSectionFocus }: AIAssistantProps) {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>(mockSuggestions)
  const [isGenerating, setIsGenerating] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI resume assistant. I can help you improve your resume content, optimize for ATS systems, and suggest better ways to showcase your experience. What would you like to work on?",
    },
  ])

  const applySuggestion = (suggestionId: string) => {
    const suggestion = suggestions.find((s) => s.id === suggestionId)
    if (!suggestion || !suggestion.after) return

    setSuggestions((prev) => prev.map((s) => (s.id === suggestionId ? { ...s, applied: true } : s)))

    // Apply the suggestion to resume data
    switch (suggestion.section) {
      case "summary":
        onUpdateData({ summary: suggestion.after })
        break
      case "skills":
        const newSkills = suggestion.after.split(", ")
        onUpdateData({ skills: [...new Set([...resumeData.skills, ...newSkills])] })
        break
      // Add more cases as needed
    }
  }

  const generateNewSuggestions = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    // In real app, this would call an AI service
  }

  const sendChatMessage = async () => {
    if (!chatMessage.trim()) return

    const userMessage = chatMessage
    setChatMessage("")
    setChatHistory((prev) => [...prev, { role: "user", content: userMessage }])

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you improve that section! Let me analyze your current content and provide specific suggestions.",
        "Great question! Based on your experience, I recommend focusing on quantifiable achievements and industry-specific keywords.",
        "That's a common concern. ATS systems look for specific formatting and keywords. Let me help you optimize for that.",
        "I can help you rewrite that to be more impactful. Would you like me to suggest some alternatives?",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setChatHistory((prev) => [...prev, { role: "assistant", content: randomResponse }])
    }, 1000)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <AlertCircle className="w-4 h-4" />
      case "medium":
        return <TrendingUp className="w-4 h-4" />
      case "low":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Lightbulb className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">AI Resume Assistant</h2>
        <p className="text-muted-foreground">
          Get personalized suggestions to improve your resume and increase your chances of getting hired
        </p>
      </div>

      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Suggestions
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            AI Chat
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Personalized Suggestions</h3>
            <Button onClick={generateNewSuggestions} disabled={isGenerating} variant="outline" size="sm">
              <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
              {isGenerating ? "Generating..." : "Refresh"}
            </Button>
          </div>

          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <Card key={suggestion.id} className={`p-4 ${suggestion.applied ? "opacity-60" : ""}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${getImpactColor(suggestion.impact)}`}>
                      {getImpactIcon(suggestion.impact)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{suggestion.title}</h4>
                      <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={suggestion.impact === "high" ? "destructive" : "secondary"}>
                      {suggestion.impact} impact
                    </Badge>
                    <Badge variant="outline">{suggestion.section}</Badge>
                  </div>
                </div>

                {suggestion.before && suggestion.after && (
                  <div className="space-y-3 mb-4">
                    <div className="p-3 bg-red-50 border border-red-200 rounded">
                      <p className="text-sm font-medium text-red-800 mb-1">Before:</p>
                      <p className="text-sm text-red-700">{suggestion.before}</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm font-medium text-green-800 mb-1">After:</p>
                      <p className="text-sm text-green-700">{suggestion.after}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => applySuggestion(suggestion.id)}
                      disabled={suggestion.applied}
                      className="bg-accent hover:bg-accent/90"
                    >
                      {suggestion.applied ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Applied
                        </>
                      ) : (
                        "Apply Suggestion"
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onSectionFocus(suggestion.section)}>
                      Edit Section
                    </Button>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          <Card className="p-4">
            <div className="h-96 overflow-y-auto space-y-4 mb-4">
              {chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Textarea
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask me anything about your resume..."
                className="min-h-[60px]"
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendChatMessage()}
              />
              <Button onClick={sendChatMessage} className="bg-accent hover:bg-accent/90">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-semibold text-foreground mb-3">ATS Optimization</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Keyword Density</span>
                  <Badge variant="default">Good</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Format Compatibility</span>
                  <Badge variant="default">Excellent</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Section Structure</span>
                  <Badge variant="secondary">Needs Work</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Contact Information</span>
                  <Badge variant="default">Complete</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold text-foreground mb-3">Content Quality</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Action Verbs Usage</span>
                  <Badge variant="default">Strong</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Quantified Results</span>
                  <Badge variant="secondary">Moderate</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Industry Keywords</span>
                  <Badge variant="default">Good</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Grammar & Spelling</span>
                  <Badge variant="default">Perfect</Badge>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-4">
            <h4 className="font-semibold text-foreground mb-3">Improvement Opportunities</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Add More Quantified Achievements</p>
                  <p className="text-sm text-muted-foreground">
                    Only 40% of your experience bullets include specific numbers or metrics
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Strengthen Technical Skills Section</p>
                  <p className="text-sm text-muted-foreground">
                    Consider adding more current technologies and frameworks
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Optimize for Remote Work Keywords</p>
                  <p className="text-sm text-muted-foreground">
                    Include terms like "remote collaboration" and "distributed teams"
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
