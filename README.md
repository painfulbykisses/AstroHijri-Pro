# 🌑 AstroHijri Pro

**Geometric Moon Sighting Calculator & Hijri Calendar Determination System.**

![AstroHijri Preview](screenshot.png)
*(Note: Replace this image with a screenshot of your website)*

## 📖 Project Overview

**AstroHijri Pro** is a web-based simulation tool designed to visualize the position of celestial bodies (Sun and Moon) to assist in predicting the start of the Hijri lunar month.

This project bridges **Modern Astronomy (Science)** with **Fiqh (Islamic Jurisprudence)**, providing an educational and intuitive interface to understand *Hilal* (crescent moon) visibility criteria.

Developed as an implementation of **Computational Physics** studies, this project focuses on visualizing ephemeris data such as *Altitude* and *Elongation* using high-precision geometric calculations.

## ✨ Key Features

* **🔭 Telescopic Visualization:** Simulates the Moon's position relative to the Horizon and the Sun at sunset (West Horizon).
* **📐 Geometric Calculations:** Real-time calculation of critical astronomical data:
    * **Altitude:** The angular height of the Moon's center above the horizon.
    * **Elongation:** The angular distance between the centers of the Sun and the Moon.
    * **Moon Age:** Time elapsed since the geocentric conjunction (*Ijtima'*).
* **📅 Intelligent Calendar Conversion:** Utilizes the `Islamic-Civil` algorithm to convert Gregorian dates to Hijri accurately.
* **🌍 Visibility Criteria:** Supports major international sighting criteria:
    * **Neo MABIMS** (Min: 3° Altitude, 6.4° Elongation).
    * **Odeh Criterion** (Optical aid visibility).
    * **Yallop Criterion**.
* **📍 Geo-Location:** Automatic location detection (simulation) and manual input for major Indonesian cities.

## 🛠️ Tech Stack

This project is built using a modern, lightweight stack without heavy frameworks to ensure high performance and accessibility:

* ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) **HTML5** - Semantic structure.
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS** - Modern & responsive styling (*Glassmorphism UI*).
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) **Vanilla JavaScript (ES6+)** - Calculation logic and DOM manipulation.
* **Font Awesome** - Interface iconography.

## 🚀 How to Run (Localhost)

Since this project uses pure HTML/JS, it is very easy to run:

### Option 1: Using Python (Recommended for Physics Students)
If you have Python installed:

1.  Clone this repository:
    ```bash
    git clone [https://github.com/painfulbykisses/AstroHijri-Pro.git](https://github.com/painfulbykisses/AstroHijri-Pro.git)
    ```
2.  Navigate to the directory:
    ```bash
    cd AstroHijri-Pro
    ```
3.  Run the simple HTTP server:
    ```bash
    python -m http.server
    ```
4.  Open your browser and visit: `http://localhost:8000`

### Option 2: Drag & Drop
Simply open the `index.html` file using any modern web browser (Chrome, Edge, Firefox).

## 📚 Scientific Background

The visualization in this application is based on standard *Hilal* observation parameters:

1.  **Altitude ($h$):** The geometric height of the Moon's center above the horizon at the time of sunset. The **Neo MABIMS** criteria require $h \ge 3^\circ$.
2.  **Elongation (ARCL):** The geocentric angular distance between the Sun and the Moon. The **Neo MABIMS** criteria require $Elongation \ge 6.4^\circ$.

The diagram utilizes the **Horizon Coordinate System** (Azimuth vs. Altitude) to simulate what an observer would see through a telescope or with the naked eye.

## 👨‍💻 Author

**Muhammad Dzikri Hikmatika Chairul Hadi** *Computational Physics Student at Brawijaya University*

Connect with me:
* [GitHub](https://github.com/painfulbykisses)
* [LinkedIn](https://www.linkedin.com/in/muhammaddzikri17/)
* [Instagram](https://www.instagram.com/dezikrie/)

---
*Made with ❤️ for the advancement of Science and the Ummah.*
