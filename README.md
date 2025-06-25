 🕌 হিদায়াহ (Hidaya) – A Full-Stack Islamic Platform for Bengali Muslims

হিদায়াহ (Hidaya) is a comprehensive Islamic platform tailored for Bengali-speaking Muslims. 
It offers core Islamic resources like the Qur’an, Hadith, prayer schedules, Qibla direction, and a smart Zakat donation system. 
Built using modern full-stack technologies, Hidaya delivers both functionality and a seamless Bangla-native user experience.



 ✨ Features

 📖 Islamic Essentials
- Al-Qur’an Access – Explore Surahs and verses with Bangla translations
- Hadith Collection – Authentic and categorized hadiths
- Prayer Times – Fetched in real-time via Supabase
- Qibla Direction – Accurate compass-based guidance

💰 Zakat Management
- Zakat Calculator – Shariah-compliant, Bangla-labeled calculator
- Donation Portal – Donate securely and track history
- Zakat Requests – Real-time request handling system with admin moderation

 🔐 User Roles
- Firebase-based authentication
- Role-based access:
  - `Admin`
  - `Zakat Giver`
  - `Zakat Receiver`



⚙️ Tech Stack

| Layer         | Technology                                |
|---------------|--------------------------------------------|
| Frontend      | React + Vite + TypeScript + Tailwind CSS  |
| Backend       | Node.js + Express.js + MongoDB Atlas       |
| Auth          | Firebase Authentication                    |
| APIs          | Supabase, AlQuran API, Aladhan API         |
| Utilities     | ESLint, Prettier, GitHub Actions, dotenv   |

---



 🚀 Getting Started

 1. Clone & Install

git clone https://github.com/talukder-rakib/hidaya.git

cd hidaya

npm install

2. Environment Setup
Create a .env file in the root with:

env

# Firebase
FIREBASE_PROJECT_ID=your_project_id

FIREBASE_CLIENT_EMAIL=your_service_account_email

FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n..."

# MongoDB
MONGODB_URI=your project uri

# Supabase
SUPABASE_URL=https://your-project.supabase.co

SUPABASE_ANON_KEY=your_supabase_anon_key

3. Run Backend
cd backend

npm install

npm run dev

5. Run Frontend
cd ..

npm run dev

Visit: http://localhost:5173

🔐 Security & Best Practices
✅ .env and firebaseServiceKey.json are .gitignored

✅ API requests protected with Firebase token middleware

✅ Admin-only operations locked by role

✅ GitHub secret detection enabled

📌 Roadmap
 Firebase authentication

 Bangla-localized Quran & Hadith access

 Dynamic prayer time & Qibla direction

 Zakat calculator + request system

 Admin dashboard with analytics

 Offline PWA mode

 PDF generation for Zakat receipts

 Mobile app (WebView wrapper)

🙌 Credits
AlQuran Cloud API

Aladhan API (Prayer Times)

Firebase

Supabase

MongoDB Atlas

Tailwind CSS

🤝 Contributing
We welcome contributions!

git checkout -b feature/your-feature-name

git commit -m "Add: your feature"

git push origin feature/your-feature-name

Then create a Pull Request. Your efforts are appreciated 💖

📜 License
This project is licensed under the MIT License.

Built with ❤️ for the Bengali Muslim Ummah by Talukder Rakib
