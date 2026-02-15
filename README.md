---
title: AstroHijri Pro
emoji: 🌑
colorFrom: yellow
colorTo: blue
sdk: static
---

# 🌑 AstroHijri Pro

> **High-Precision Geometric Hilal Calculator & Simulation**
> Combining Modern Astronomy with Islamic Science.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Coming_Soon-blue?style=for-the-badge&logo=rocket&logoColor=white)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5_·_Tailwind_·_JS-yellow?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**AstroHijri Pro** is a modern web application designed to visualize the position of celestial bodies (Sun and Moon) to assist in predicting the start of the Hijri lunar month. This project bridges **Modern Astronomy (Science)** with **Fiqh (Islamic Jurisprudence)**, providing an educational and intuitive interface to understand Hilal (crescent moon) visibility criteria.

---

## ✨ Key Features (v2.0 Enhanced)

- **🔭 Telescopic Visualization**: Real-time simulation of the Moon's position relative to the Horizon and Sun.
- **🌌 Dynamic Star Field**: Beautiful animated background with twinkling stars and deep space aesthetic.
- **📱 Responsive Mobile Design**: Fully optimized for mobile devices with a custom hamburger menu.
- **📐 High-Precision Algorithms**: Uses **VSOP87** theory for accurate planetary position calculation (precision up to 0.00001°).
- **🌍 Multi-Location Support**: Expanded database of major Indonesian cities with auto-detection simulation.
- **📅 Intelligent Calendar**: Accurate Gregorian to Hijri conversion using `Intl.DateTimeFormat` with `islamic-civil` calendar.
- **📊 Visibility Criteria Support**:
    - **Neo MABIMS** (Min: 3° Altitude, 6.4° Elongation)
    - **Odeh Criterion** (Optical aid visibility)
    - **Yallop Criterion** (RHM)

## 🖥️ Architecture

The application is a **Single Page Application (SPA)** built with Vanilla JS, ensuring lightweight performance and zero build-step complexity.

```
AstroHijri-Pro/
├── index.html         # Main structure (Semantic HTML5)
├── style.css          # Styling (Tailwind + Custom Animations)
├── script.js          # Logic (VSOP87 Sim, DOM Manipulation)
├── assets/            # Images & Icons
└── README.md          # Documentation
```

## 🚀 How to Run (Localhost)

Since this project uses pure HTML/JS, it is very easy to run:

### Option 1: Drag & Drop
Simply drag `index.html` into your web browser (Chrome, Edge, Firefox).

### Option 2: Using Python (Recommended)
If you have Python installed, you can run a local server:

```bash
# Navigate to the project folder
cd AstroHijri-Pro

# Run simple HTTP server
python -m http.server 8000
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic structure and SEO optimization.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Vanilla JavaScript (ES6+)**: Core logic without heavy frameworks.
- **Font Awesome**: Premium iconography.
- **Google Fonts (Outfit)**: Modern typeface optimizing readability.

## 📝 Author

**Muhammad Dzikri Hikmatika C.H.**
Computational Physics Student & Web Developer

> *"Science and technology can bridge reasoning and faith, providing accurate, aesthetic, and comprehensible visualizations of natural phenomena."*

---

&copy; 2025 AstroHijri Pro. Data perhitungan geometris untuk keperluan edukasi.
