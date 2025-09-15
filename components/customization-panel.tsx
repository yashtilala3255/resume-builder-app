"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Type, Layout, Scaling as Spacing } from "lucide-react"
import type { CustomizationOptions } from "@/lib/resume-types"

interface CustomizationPanelProps {
  customization: CustomizationOptions
  onUpdate: (updates: Partial<CustomizationOptions>) => void
}

const colorPresets = [
  { name: "Professional Blue", primary: "#1f2937", accent: "#3b82f6" },
  { name: "Modern Purple", primary: "#1f2937", accent: "#8b5cf6" },
  { name: "Corporate Navy", primary: "#1e293b", accent: "#0f172a" },
  { name: "Creative Teal", primary: "#0f766e", accent: "#14b8a6" },
  { name: "Executive Black", primary: "#000000", accent: "#374151" },
  { name: "Elegant Green", primary: "#166534", accent: "#22c55e" },
  { name: "Warm Orange", primary: "#ea580c", accent: "#f97316" },
  { name: "Classic Red", primary: "#dc2626", accent: "#ef4444" },
]

const fontOptions = [
  { name: "Geist Sans", value: "font-sans", description: "Modern and clean" },
  { name: "Inter", value: "font-inter", description: "Professional and readable" },
  { name: "Roboto", value: "font-roboto", description: "Friendly and approachable" },
  { name: "Open Sans", value: "font-open-sans", description: "Versatile and clear" },
  { name: "Lato", value: "font-lato", description: "Elegant and refined" },
  { name: "Source Sans Pro", value: "font-source-sans", description: "Technical and precise" },
]

export function CustomizationPanel({ customization, onUpdate }: CustomizationPanelProps) {
  const [selectedColorPreset, setSelectedColorPreset] = useState<string>("")

  const updateTheme = (updates: Partial<CustomizationOptions["theme"]>) => {
    onUpdate({
      theme: { ...customization.theme, ...updates },
    })
  }

  const updateTypography = (updates: Partial<CustomizationOptions["typography"]>) => {
    onUpdate({
      typography: { ...customization.typography, ...updates },
    })
  }

  const updateLayout = (updates: Partial<CustomizationOptions["layout"]>) => {
    onUpdate({
      layout: { ...customization.layout, ...updates },
    })
  }

  const applyColorPreset = (preset: (typeof colorPresets)[0]) => {
    updateTheme({
      primaryColor: preset.primary,
      accentColor: preset.accent,
    })
    setSelectedColorPreset(preset.name)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Customize Your Resume</h2>
        <p className="text-muted-foreground">Personalize the appearance and layout of your resume</p>
      </div>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="spacing" className="flex items-center gap-2">
            <Spacing className="w-4 h-4" />
            Spacing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Color Scheme</h3>

            {/* Color Presets */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Quick Color Presets</Label>
              <div className="grid grid-cols-2 gap-3">
                {colorPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant={selectedColorPreset === preset.name ? "default" : "outline"}
                    className="h-auto p-3 flex items-center gap-3 justify-start"
                    onClick={() => applyColorPreset(preset)}
                  >
                    <div className="flex gap-1">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: preset.accent }}
                      />
                    </div>
                    <span className="text-sm">{preset.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Primary Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customization.theme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                    className="w-12 h-10 rounded border border-border cursor-pointer"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={customization.theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded text-sm font-mono"
                      placeholder="#1f2937"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Used for headings and main elements</p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Accent Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customization.theme.accentColor}
                    onChange={(e) => updateTheme({ accentColor: e.target.value })}
                    className="w-12 h-10 rounded border border-border cursor-pointer"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={customization.theme.accentColor}
                      onChange={(e) => updateTheme({ accentColor: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded text-sm font-mono"
                      placeholder="#8b5cf6"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Used for highlights and skill tags</p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Background Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customization.theme.backgroundColor}
                    onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                    className="w-12 h-10 rounded border border-border cursor-pointer"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={customization.theme.backgroundColor}
                      onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded text-sm font-mono"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Main background color</p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Text Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customization.theme.textColor}
                    onChange={(e) => updateTheme({ textColor: e.target.value })}
                    className="w-12 h-10 rounded border border-border cursor-pointer"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={customization.theme.textColor}
                      onChange={(e) => updateTheme({ textColor: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded text-sm font-mono"
                      placeholder="#1f2937"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Main text color</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Typography Settings</h3>

            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Font Family</Label>
                <Select
                  value={customization.typography.fontFamily}
                  onValueChange={(value) => updateTypography({ fontFamily: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <div>
                          <div className="font-medium">{font.name}</div>
                          <div className="text-xs text-muted-foreground">{font.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Font Size: {customization.typography.fontSize}pt
                </Label>
                <Slider
                  value={[customization.typography.fontSize]}
                  onValueChange={([value]) => updateTypography({ fontSize: value })}
                  min={10}
                  max={16}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>10pt</span>
                  <span>16pt</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Line Height: {customization.typography.lineHeight}
                </Label>
                <Slider
                  value={[customization.typography.lineHeight]}
                  onValueChange={([value]) => updateTypography({ lineHeight: value })}
                  min={1.2}
                  max={2.0}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1.2</span>
                  <span>2.0</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Layout Options</h3>

            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Column Layout</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={customization.layout.columns === 1 ? "default" : "outline"}
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => updateLayout({ columns: 1 })}
                  >
                    <div className="w-8 h-6 bg-current opacity-20 rounded mb-1"></div>
                    <span className="text-xs">Single Column</span>
                  </Button>
                  <Button
                    variant={customization.layout.columns === 2 ? "default" : "outline"}
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => updateLayout({ columns: 2 })}
                  >
                    <div className="flex gap-1 mb-1">
                      <div className="w-3 h-6 bg-current opacity-20 rounded"></div>
                      <div className="w-3 h-6 bg-current opacity-20 rounded"></div>
                    </div>
                    <span className="text-xs">Two Column</span>
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Spacing Style</Label>
                <Select
                  value={customization.layout.spacing}
                  onValueChange={(value: "compact" | "normal" | "spacious") => updateLayout({ spacing: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">
                      <div>
                        <div className="font-medium">Compact</div>
                        <div className="text-xs text-muted-foreground">Minimal spacing, more content</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="normal">
                      <div>
                        <div className="font-medium">Normal</div>
                        <div className="text-xs text-muted-foreground">Balanced spacing</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="spacious">
                      <div>
                        <div className="font-medium">Spacious</div>
                        <div className="text-xs text-muted-foreground">Generous spacing, easier to read</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Page Margins: {customization.layout.margins}mm</Label>
                <Slider
                  value={[customization.layout.margins]}
                  onValueChange={([value]) => updateLayout({ margins: value })}
                  min={10}
                  max={30}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>10mm</span>
                  <span>30mm</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="spacing" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Advanced Spacing</h3>

            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">Section Spacing</Label>
                <p className="text-xs text-muted-foreground mb-3">Adjust spacing between resume sections</p>
                <Slider value={[20]} onValueChange={() => {}} min={10} max={40} step={5} className="w-full" />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Item Spacing</Label>
                <p className="text-xs text-muted-foreground mb-3">Spacing between individual items within sections</p>
                <Slider value={[15]} onValueChange={() => {}} min={5} max={25} step={5} className="w-full" />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Header Spacing</Label>
                <p className="text-xs text-muted-foreground mb-3">Space around the header section</p>
                <Slider value={[25]} onValueChange={() => {}} min={15} max={50} step={5} className="w-full" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reset Button */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground">Reset Customization</h4>
            <p className="text-sm text-muted-foreground">Restore all settings to default values</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              onUpdate({
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
              })
              setSelectedColorPreset("")
            }}
          >
            Reset All
          </Button>
        </div>
      </Card>
    </div>
  )
}
