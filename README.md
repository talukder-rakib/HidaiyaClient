 # 🕌 হিদায়াহ (Hidaya) – A Full-Stack Islamic Platform for Bengali Muslims

**হিদায়াহ (Hidaya)** is a comprehensive Islamic platform tailored for Bengali-speaking Muslims. 
It offers core Islamic resources like the Qur’an, Hadith, prayer schedules, Qibla direction, and a smart Zakat donation system. 
Built using modern full-stack technologies, Hidaya delivers both functionality and a seamless Bangla-native user experience.

---

# ✨ Features

# 📖 Islamic Essentials

 **Al-Qur’an Access** – Full Surah and Ayah view with Bangla translations  
 **Hadith Collection** – Authentic and categorized Hadiths  
 **Prayer Times** – Real-time data fetched from Aladhan API & Supabase  
 **Qibla Direction** – Accurate compass-based direction with device orientation  

# 💰 Zakat Management

 **Zakat Calculator** – Shariah-compliant, dynamic, and Bangla-labeled  
 **Donation Portal** – Secure payment integration with full history  
 **Zakat Requests** – Real-time requests, admin-reviewed, recipient-tracked  

# 🔐 User Roles & Access Control

* Role-based access:  
  * 💰 **Zakat Giver(Donor)**  
  * 🧕 **Zakat Receiver**  

---

# 🔗 Project Links

| Module      | Repository Link                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------ |
| 🔮 Frontend | [Hidaya Client (React)](https://github.com/talukder-rakib/HidaiyaClient/tree/main)               |
| 🔧 Backend  | [Hidaya Backend (Node.js + Express)](https://github.com/talukder-rakib/HidaiyaBackend/tree/main) |

---

# ⚙️ Tech Stack

| Layer          | Technology                               |
| -------------- | ---------------------------------------- |
| Frontend       | React + Vite + TypeScript + Tailwind CSS |
| Backend        | Node.js + Express.js + MongoDB Atlas     |
| Authentication |                                          |
| APIs           | AlQuran API, Aladhan API                 |
| Dev Tools      | ESLint, Prettier, dotenv, GitHub Actions |

---

# 🚀 Getting Started

# 1. Clone & Install

```bash
# Frontend
git clone https://github.com/talukder-rakib/HidaiyaClient.git
cd HidaiyaClient
npm install

# Backend
git clone https://github.com/talukder-rakib/HidaiyaBackend.git
cd HidaiyaBackend
npm install
```

# 2. Environment Setup

Create a `.env` file in both `frontend` and `backend` with:

# 🔐 `.env` example:

```env
# Firebase
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

# MongoDB
MONGODB_URI=your_mongodb_atlas_uri

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
```

# 3. Start Development

```bash
# Run Backend
cd HidaiyaBackend
npm run dev

# Run Frontend (in separate terminal)
cd HidaiyaClient
npm run dev
```

Visit your app: [http://localhost:5173]

---

# 🛡️ Security & Best Practices

* ✅ `.env` and `firebaseServiceKey.json` are `.gitignore`d  
* ✅ API routes secured via Firebase middleware  
* ✅ Role-based restrictions for admin functions  
* ✅ GitHub secret detection enabled  

---

# 🛣️ Roadmap
  
* ✅ Quran + Hadith in Bangla  
* ✅ Qibla Compass & Real-Time Prayer Times  
* ✅ Zakat Calculator & Donation Requests  
* 🔜 Admin Dashboard & Analytics  
* 🔜 Offline PWA Mode  
* 🔜 PDF Zakat Receipts  
* 🔜 Mobile App (via WebView)  

---

# 🙌 Credits

* [AlQuran Cloud API](https://alquran.cloud)  
* [Aladhan API](https://aladhan.com/prayer-times-api)  
* [Firebase](https://firebase.google.com)  
* [Supabase](https://supabase.io)  
* [MongoDB Atlas](https://www.mongodb.com/atlas)  
* [Tailwind CSS](https://tailwindcss.com)  

---

# 🤝 Contributing

```bash
git checkout -b feature/your-feature-name
git commit -m "Add: your feature"
git push origin feature/your-feature-name
```

Then submit a Pull Request. Your contributions are highly appreciated 💖

---

# 📜 License

Licensed under the **MIT License**

---

> **Built with ❤️ by [Talukder Rakib](https://github.com/talukder-rakib) for the Bengali Muslim Ummah**
