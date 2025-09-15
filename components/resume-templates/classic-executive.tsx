import type { ResumeData } from "@/lib/resume-types"

interface ClassicExecutiveProps {
  data: ResumeData
  customization?: {
    primaryColor?: string
    fontSize?: number
  }
}

export function ClassicExecutive({ data, customization }: ClassicExecutiveProps) {
  const primaryColor = customization?.primaryColor || "#1f2937"
  const fontSize = customization?.fontSize || 14

  return (
    <div className="bg-white text-gray-900 max-w-[8.5in] mx-auto shadow-lg" style={{ fontSize: `${fontSize}px` }}>
      <div className="p-8">
        {/* Header */}
        <header className="text-center mb-8 pb-6 border-b-2 border-gray-300">
          <h1 className="text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex justify-center items-center gap-6 text-sm text-gray-600">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>•</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>•</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          </div>
          {data.personalInfo.linkedin && (
            <div className="mt-2 text-sm text-gray-600">LinkedIn: {data.personalInfo.linkedin}</div>
          )}
        </header>

        {/* Professional Summary */}
        {data.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: primaryColor }}>
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: primaryColor }}>
              Professional Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <span className="text-sm text-gray-500 font-medium">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-700 mb-2">{exp.company}</p>
                  <p className="text-gray-700 mb-3 leading-relaxed">{exp.description}</p>
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: primaryColor }}>
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.field}</p>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wide" style={{ color: primaryColor }}>
                Core Competencies
              </h2>
              <div className="grid grid-cols-1 gap-1">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-gray-700">
                    • {skill}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
