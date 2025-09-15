import type { ResumeData } from "@/lib/resume-types"

interface ModernProfessionalProps {
  data: ResumeData
  customization?: {
    primaryColor?: string
    fontSize?: number
  }
}

export function ModernProfessional({ data, customization }: ModernProfessionalProps) {
  const primaryColor = customization?.primaryColor || "#8b5cf6"
  const fontSize = customization?.fontSize || 14

  return (
    <div className="bg-white text-gray-900 max-w-[8.5in] mx-auto shadow-lg" style={{ fontSize: `${fontSize}px` }}>
      {/* Header Section */}
      <div className="text-white p-8" style={{ backgroundColor: primaryColor }}>
        <div className="flex items-center gap-6">
          {data.personalInfo.profilePicture && (
            <img
              src={data.personalInfo.profilePicture || "/placeholder.svg"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm opacity-90">
              {data.personalInfo.email && <div>📧 {data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div>📱 {data.personalInfo.phone}</div>}
              {data.personalInfo.location && <div>📍 {data.personalInfo.location}</div>}
              {data.personalInfo.linkedin && <div>💼 {data.personalInfo.linkedin}</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {data.summary && (
          <section className="mb-8">
            <h2
              className="text-xl font-bold mb-3 pb-2 border-b-2"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-xl font-bold mb-4 pb-2 border-b-2"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Work Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{exp.description}</p>
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-xl font-bold mb-4 pb-2 border-b-2"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-xl font-bold mb-4 pb-2 border-b-2"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
