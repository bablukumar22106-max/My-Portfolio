# Bablu Kumar - Personal Developer Portfolio

A modern, responsive, performance-optimized personal portfolio engineered for **Bablu Kumar**, B.Tech Computer Science and Engineering student at **Government Engineering College, Sheikhpura (Bihar Engineering University)**.

---

## 🚀 Live Demo & Key Highlights

- **Target Roles:** Software Development Engineer (SDE) Intern, Frontend Developer, Full-Stack Developer, AI/ML Intern.
- **Academic Foundation:** B.Tech CSE (4th Year / 7th Sem, 2023–2027), CGPA: 7.39 / 10.0.
- **Experience Featured:** CodTech Solution (AI Intern), Edulogy (Python Programming Intern), InternPe (Web Development Intern).
- **Projects Featured:**
  1. **UrbanFade – Salon Website:** Commercial web application for Bablu Hairstyle in Jehanabad, Bihar with direct WhatsApp appointment booking.
  2. **Weathercast App:** Live meteorological tracking app utilizing asynchronous Weather API integration.
  3. **Personal Developer Portfolio:** Modular, accessible data-driven portfolio architecture.
- **Certifications:** Python for ML, Cisco Networking Academy (6 certifications), IIT Bombay Spoken Tutorial (6 certifications).

---

## 🛠️ Technology Stack

- **Markup:** Semantic HTML5 (WCAG 2.1 AA accessible)
- **Styling:** CSS3 (Custom design system, CSS variables, Flexbox, CSS Grid, media queries, reduced-motion support)
- **Logic:** Vanilla JavaScript (ES6+, IntersectionObserver, DOM manipulation, asynchronous JSON loader, localStorage theme state)
- **Data Engine:** Structured JSON (`data/profile.json`)
- **Dependencies:** Zero external heavy libraries or bloated CDN fonts — instant load time!

---

## 📁 Directory Structure

```
portfolio/
├── index.html              # Main semantic HTML5 markup
├── style.css               # Complete responsive CSS design system (Dark & Light mode)
├── script.js               # Client JavaScript (theme, mobile drawer, scroll spy, contact, modal)
├── fill-form.html          # Interactive onboarding form utility
├── PROFILE_FORM.md         # Text-based questionnaire file
├── README.md               # Documentation & deployment guide
├── .gitignore              # Git ignore rules
├── data/
│   └── profile.json        # Single source of truth for portfolio profile data
└── assets/
    ├── images/             # Profile photos and project screenshots
    └── resume/             # Place your PDF resume here (e.g. resume.pdf)
```

---

## 💻 How to Run Locally

You can run the portfolio in any of the following ways:

### Method 1: Direct File Opening
Double-click `index.html` in Windows Explorer or open it with your favorite browser (Google Chrome, Microsoft Edge, Brave, Firefox).

### Method 2: Python Local Server (Recommended)
Open PowerShell or Command Prompt inside `d:\portfolio` and run:
```powershell
python -m http.server 3000
```
Then visit: `http://localhost:3000`

### Method 3: VS Code Live Server
1. Open the `portfolio` folder in VS Code.
2. Install the **Live Server** extension if not installed.
3. Click **"Go Live"** in the bottom status bar.

---

## 🔄 How to Update Your Details Later

All your personal details, education, skills, projects, and contact info are neatly decoupled in:
📁 `data/profile.json`

To update your CGPA, add a new project, or change your bio, simply edit `data/profile.json` and save. The website is pre-configured to reflect your data!

---

## 📄 How to Add Your Resume

1. Place your resume PDF in the `assets/resume/` directory (e.g., `assets/resume/resume.pdf`).
2. Open `data/profile.json` and update the `preferences.resumeFile` line:
   ```json
   "preferences": {
     "theme": "dark-toggle",
     "accentColor": "indigo-cyan",
     "resumeFile": "assets/resume/resume.pdf"
   }
   ```
3. That's it! The "Download Resume" button will automatically offer direct download of your PDF.

---

## 📸 How to Add a Profile Photo

1. Place your picture inside `assets/images/profile.jpg`.
2. Update `data/profile.json`:
   ```json
   "photoPath": "assets/images/profile.jpg",
   "showPhoto": true
   ```

---

## 🌐 Free Deployment Instructions

### 1. GitHub Pages (Free & Easy)
1. Push this repository to your GitHub account: `https://github.com/bablukumar22106-max/portfolio`
2. Go to **Settings** → **Pages** on your GitHub repository.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
4. Within 1–2 minutes, your website will be live at:
   `https://bablukumar22106-max.github.io/portfolio/`

### 2. Vercel (Free 1-Click Deploy)
1. Sign in to [Vercel](https://vercel.com) using your GitHub account.
2. Click **"Add New Project"** and import `portfolio`.
3. Click **Deploy**. Your portfolio will be live with a free custom SSL domain!

### 3. Netlify (Free Drag & Drop)
1. Visit [Netlify](https://app.netlify.com/drop).
2. Drag and drop the `portfolio` folder directly into the browser.
3. Instant live link in seconds!

---

## 🛡️ Privacy & Security Best Practices
- Private personal details (phone number, home address) are protected and not displayed publicly.
- Safe mail client integration: the contact form opens the user's default email client or copies the message cleanly, without exposing backend credentials or secret API keys.
