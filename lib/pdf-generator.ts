// PDF generation utilities for resume export
// In a real application, this would use libraries like jsPDF, Puppeteer, or a server-side PDF service

import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export interface PDFExportOptions {
  format: "A4" | "Letter"
  orientation: "portrait" | "landscape"
  margins: {
    top: number
    right: number
    bottom: number
    left: number
  }
  quality: "draft" | "standard" | "high"
}

export const defaultPDFOptions: PDFExportOptions = {
  format: "A4",
  orientation: "portrait",
  margins: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
  quality: "high",
}

function convertOklchToRgb(element: HTMLElement): void {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, null)

  const elements: Element[] = []
  let node
  while ((node = walker.nextNode())) {
    elements.push(node as Element)
  }

  elements.forEach((el) => {
    const htmlEl = el as HTMLElement
    const computedStyle = window.getComputedStyle(htmlEl)

    // Convert background colors
    const bgColor = computedStyle.backgroundColor
    if (bgColor && bgColor.includes("oklch")) {
      htmlEl.style.backgroundColor = convertOklchValue(bgColor)
    }

    // Convert text colors
    const textColor = computedStyle.color
    if (textColor && textColor.includes("oklch")) {
      htmlEl.style.color = convertOklchValue(textColor)
    }

    // Convert border colors
    const borderColor = computedStyle.borderColor
    if (borderColor && borderColor.includes("oklch")) {
      htmlEl.style.borderColor = convertOklchValue(borderColor)
    }
  })
}

function convertOklchValue(oklchColor: string): string {
  // Simple fallback colors for common oklch values
  const oklchToRgbMap: { [key: string]: string } = {
    "oklch(0.98 0.013 106.42)": "#fefefe", // near white
    "oklch(0.02 0.013 106.42)": "#020202", // near black
    "oklch(0.64 0.15 259.87)": "#4f46e5", // indigo-600
    "oklch(0.7 0.14 259.87)": "#6366f1", // indigo-500
    "oklch(0.76 0.12 259.87)": "#818cf8", // indigo-400
    "oklch(0.95 0.02 106.42)": "#f8fafc", // slate-50
    "oklch(0.9 0.02 106.42)": "#f1f5f9", // slate-100
    "oklch(0.85 0.02 106.42)": "#e2e8f0", // slate-200
    "oklch(0.7 0.02 106.42)": "#94a3b8", // slate-400
    "oklch(0.5 0.02 106.42)": "#64748b", // slate-500
    "oklch(0.4 0.02 106.42)": "#475569", // slate-600
  }

  // Try to find exact match first
  if (oklchToRgbMap[oklchColor]) {
    return oklchToRgbMap[oklchColor]
  }

  // Extract oklch values and convert to approximate RGB
  const match = oklchColor.match(/oklch$$([\d.]+)\s+([\d.]+)\s+([\d.]+)$$/)
  if (match) {
    const l = Number.parseFloat(match[1])
    const c = Number.parseFloat(match[2])
    const h = Number.parseFloat(match[3])

    // Simple approximation: convert lightness to grayscale if chroma is low
    if (c < 0.05) {
      const gray = Math.round(l * 255)
      return `rgb(${gray}, ${gray}, ${gray})`
    }

    // For colored values, use a basic hue-based approximation
    const hueToRgb = (h: number, l: number) => {
      if (h < 60) return `rgb(${Math.round(l * 255)}, ${Math.round(l * 200)}, ${Math.round(l * 150)})`
      if (h < 120) return `rgb(${Math.round(l * 150)}, ${Math.round(l * 255)}, ${Math.round(l * 150)})`
      if (h < 180) return `rgb(${Math.round(l * 150)}, ${Math.round(l * 255)}, ${Math.round(l * 255)})`
      if (h < 240) return `rgb(${Math.round(l * 150)}, ${Math.round(l * 150)}, ${Math.round(l * 255)})`
      if (h < 300) return `rgb(${Math.round(l * 255)}, ${Math.round(l * 150)}, ${Math.round(l * 255)})`
      return `rgb(${Math.round(l * 255)}, ${Math.round(l * 150)}, ${Math.round(l * 150)})`
    }

    return hueToRgb(h, l)
  }

  // Fallback to white if we can't parse
  return "#ffffff"
}

export async function generateResumePDF(
  resumeElement: HTMLElement,
  filename: string,
  options: PDFExportOptions = defaultPDFOptions,
): Promise<void> {
  try {
    console.log("[v0] Starting PDF generation with options:", options)

    const clonedElement = resumeElement.cloneNode(true) as HTMLElement
    document.body.appendChild(clonedElement)
    clonedElement.style.position = "absolute"
    clonedElement.style.left = "-9999px"
    clonedElement.style.top = "0"

    // Convert oklch colors to RGB
    convertOklchToRgb(clonedElement)

    console.log("[v0] Converted oklch colors, capturing canvas...")

    // Capture the cloned element as canvas
    const canvas = await html2canvas(clonedElement, {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: clonedElement.scrollWidth,
      height: clonedElement.scrollHeight,
      logging: false, // Disable html2canvas logging
    })

    document.body.removeChild(clonedElement)

    console.log("[v0] Canvas captured, creating PDF...")

    // Create PDF document
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: options.orientation,
      unit: "mm",
      format: options.format.toLowerCase() as "a4" | "letter",
    })

    // Calculate dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pdfWidth - (options.margins.left + options.margins.right)
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Add image to PDF
    pdf.addImage(
      imgData,
      "PNG",
      options.margins.left,
      options.margins.top,
      imgWidth,
      Math.min(imgHeight, pdfHeight - (options.margins.top + options.margins.bottom)),
    )

    // If content is longer than one page, add additional pages
    if (imgHeight > pdfHeight - (options.margins.top + options.margins.bottom)) {
      let remainingHeight = imgHeight - (pdfHeight - (options.margins.top + options.margins.bottom))
      let currentY = -(pdfHeight - (options.margins.top + options.margins.bottom))

      while (remainingHeight > 0) {
        pdf.addPage()
        const pageHeight = Math.min(remainingHeight, pdfHeight - (options.margins.top + options.margins.bottom))

        pdf.addImage(
          imgData,
          "PNG",
          options.margins.left,
          options.margins.top,
          imgWidth,
          imgHeight,
          undefined,
          "FAST",
          0,
          currentY,
        )

        remainingHeight -= pageHeight
        currentY -= pdfHeight
      }
    }

    console.log("[v0] PDF generated successfully, downloading...")
    // Download the PDF
    pdf.save(filename)
    console.log("[v0] PDF download initiated")
  } catch (error) {
    console.error("[v0] PDF generation failed:", error)
    throw new Error("Failed to generate PDF. Please try again.")
  }
}

export function validateResumeData(resumeData: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // Check required fields
  if (!resumeData.personalInfo?.fullName) {
    errors.push("Full name is required")
  }

  if (!resumeData.personalInfo?.email) {
    errors.push("Email address is required")
  }

  if (!resumeData.personalInfo?.phone) {
    errors.push("Phone number is required")
  }

  if (!resumeData.summary || resumeData.summary.length < 50) {
    errors.push("Professional summary should be at least 50 characters")
  }

  if (!resumeData.experience || resumeData.experience.length === 0) {
    errors.push("At least one work experience is recommended")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function optimizeForATS(resumeData: any): { score: number; suggestions: string[] } {
  const suggestions: string[] = []
  let score = 100

  // Check for ATS-friendly formatting
  if (!resumeData.personalInfo?.fullName) {
    score -= 10
    suggestions.push("Add your full name")
  }

  if (!resumeData.personalInfo?.email || !resumeData.personalInfo?.phone) {
    score -= 15
    suggestions.push("Include complete contact information")
  }

  if (!resumeData.skills || resumeData.skills.length < 5) {
    score -= 20
    suggestions.push("Add more relevant skills (aim for 5-10)")
  }

  if (!resumeData.experience || resumeData.experience.length === 0) {
    score -= 25
    suggestions.push("Add work experience with specific achievements")
  }

  // Check for keywords and industry terms
  const hasIndustryKeywords =
    resumeData.summary?.toLowerCase().includes("experience") ||
    resumeData.summary?.toLowerCase().includes("skilled") ||
    resumeData.summary?.toLowerCase().includes("professional")

  if (!hasIndustryKeywords) {
    score -= 10
    suggestions.push("Include more industry-specific keywords in your summary")
  }

  return {
    score: Math.max(0, score),
    suggestions,
  }
}
