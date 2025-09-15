# 📄 Resume Builder Website  

A powerful and modern **Resume Builder web application** that helps users create professional resumes effortlessly.  
Users can choose templates, customize designs, view resume scores, and download their resumes as PDF.  

---

## ✨ Features  

- 🎨 **Template Selection** – Choose from multiple professional resume templates.  
- 🖌️ **Customization Options** – Change **theme color, font family, font size (pt), and layout styles**.  
- 👤 **Profile Picture Support** – Upload, crop, and update profile picture.  
- 📊 **Resume Scoring System** – Section-wise score for:  
  - Profile Header  
  - Professional Summary  
  - Work Experience  
  - Education  
  - Skills  
  - Projects  
  - Certifications  
  - Achievements  
- ⚡ **Real-time Live Preview** – See instant changes while editing.  
- 🔀 **Drag-and-Drop Layout** – Reorder resume sections easily.  
- 💾 **Save Drafts** – Continue editing later.  
- 📥 **Export as PDF** – Download fully formatted resumes.  
- 🤖 *(Optional)* AI-powered suggestions for **content improvement & ATS optimization**.  

---

## 🛠️ Tech Stack  

- **Frontend:** React.js / Next.js  
- **Styling:** Tailwind CSS + shadcn/ui  
- **Backend:** Node.js / Express.js (or Laravel, if PHP used)  
- **Database:** Supabase / PostgreSQL / MySQL  
- **PDF Export:** jsPDF / React-to-PDF / Puppeteer  
- **Deployment:** Vercel / Netlify / AWS  

---

## project is live at:
https://resume-builder-scalex.vercel.app/

---

## 📂 Project Structure  

```bash
├── public/             # Static assets (logos, images, resume templates)
├── src/                # Source code
│   ├── components/     # Reusable UI components (forms, editors, preview, etc.)
│   ├── pages/          # Application pages (Home, Builder, Templates, etc.)
│   ├── styles/         # Tailwind / global styles
│   ├── utils/          # Helpers (resume scoring, PDF export, etc.)
│   └── App.js          # Main entry (if React)
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
