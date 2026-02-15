// ==========================================
// 1. LOGIKA NAVIGASI TAB (Single Page App) & MOBILE MENU
// ==========================================
function switchTab(tabId) {
    // Hide all pages with animation reset
    document.querySelectorAll('section').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('animate__fadeIn');
    });

    // Show selected page
    const newPage = document.getElementById('page-' + tabId);
    newPage.classList.remove('hidden');
    // Trigger reflow to restart animation
    void newPage.offsetWidth;
    newPage.classList.add('animate__animated', 'animate__fadeIn');

    // Reset nav styles
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('text-accent', 'after:w-full');
        el.classList.add('hover:text-white', 'after:w-0');
    });

    // Set active nav style (Desktop)
    const activeNav = document.getElementById('nav-' + tabId);
    if (activeNav) {
        activeNav.classList.add('text-accent', 'after:w-full');
        activeNav.classList.remove('after:w-0', 'hover:text-white');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const isOpen = !menu.classList.contains('translate-x-full');

    if (isOpen) {
        menu.classList.add('translate-x-full');
    } else {
        menu.classList.remove('translate-x-full');
    }
}

// ==========================================
// 2. STAR FIELD GENERATOR
// ==========================================
function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random Position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Random Size
        const size = Math.random() * 2 + 1; // 1px to 3px

        // Random Animation Duration & Delay
        const duration = Math.random() * 3 + 2; // 2s to 5s
        const delay = Math.random() * 5;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.setProperty('--opacity', Math.random());
        star.style.animationDelay = `${delay}s`;

        container.appendChild(star);
    }
}

// Initialize stars on load
document.addEventListener('DOMContentLoaded', createStars);

// ==========================================
// 3. DATA KOTA & AUTOCOMPLETE (EXPANDED)
// ==========================================
const cities = [
    // --- HOLY SITES ---
    { name: "Mecca (Makkah)", coords: "21.3891° N, 39.8579° E" },
    { name: "Medina (Madinah)", coords: "24.5247° N, 39.5692° E" },
    { name: "Jerusalem (Al-Quds)", coords: "31.7683° N, 35.2137° E" },

    // --- INDONESIA (Major Cities) ---
    { name: "Jakarta Pusat", coords: "-6.1751° S, 106.8650° E" },
    { name: "Bandung", coords: "-6.9175° S, 107.6191° E" },
    { name: "Surabaya", coords: "-7.2575° S, 112.7521° E" },
    { name: "Semarang", coords: "-6.9667° S, 110.4167° E" },
    { name: "Yogyakarta", coords: "-7.7956° S, 110.3695° E" },
    { name: "Malang", coords: "-7.9666° S, 112.6326° E" },
    { name: "Medan", coords: "3.5952° N, 98.6722° E" },
    { name: "Aceh (Banda Aceh)", coords: "5.5483° N, 95.3238° E" },
    { name: "Palembang", coords: "-2.9761° S, 104.7754° E" },
    { name: "Makassar", coords: "-5.1477° S, 119.4327° E" },
    { name: "Denpasar", coords: "-8.6705° S, 115.2126° E" },
    { name: "Jayapura", coords: "-2.5489° S, 140.7180° E" },
    { name: "Samarinda", coords: "-0.5022° S, 117.1536° E" },
    { name: "Banjarmasin", coords: "-3.3194° S, 114.5908° E" },
    { name: "Pontianak", coords: "-0.0263° S, 109.3425° E" },
    { name: "Mataram", coords: "-8.5833° S, 116.1167° E" },
    { name: "Ambon", coords: "-3.6954° S, 128.1814° E" },

    // --- ASIA & MIDDLE EAST ---
    { name: "Riyadh (Saudi Arabia)", coords: "24.7136° N, 46.6753° E" },
    { name: "Dubai (UAE)", coords: "25.2048° N, 55.2708° E" },
    { name: "Istanbul (Turkey)", coords: "41.0082° N, 28.9784° E" },
    { name: "Tehran (Iran)", coords: "35.6892° N, 51.3890° E" },
    { name: "Baghdad (Iraq)", coords: "33.3152° N, 44.3661° E" },
    { name: "Kuala Lumpur (Malaysia)", coords: "3.1390° N, 101.6869° E" },
    { name: "Singapore", coords: "1.3521° N, 103.8198° E" },
    { name: "Brunei (Bandar Seri Begawan)", coords: "4.9031° N, 114.9398° E" },
    { name: "Tokyo (Japan)", coords: "35.6762° N, 139.6503° E" },
    { name: "Seoul (South Korea)", coords: "37.5665° N, 126.9780° E" },
    { name: "Beijing (China)", coords: "39.9042° N, 116.4074° E" },
    { name: "New Delhi (India)", coords: "28.6139° N, 77.2090° E" },
    { name: "Karachi (Pakistan)", coords: "24.8607° N, 67.0011° E" },

    // --- EUROPE ---
    { name: "London (UK)", coords: "51.5074° N, 0.1278° W" },
    { name: "Paris (France)", coords: "48.8566° N, 2.3522° E" },
    { name: "Berlin (Germany)", coords: "52.5200° N, 13.4050° E" },
    { name: "Moscow (Russia)", coords: "55.7558° N, 37.6173° E" },
    { name: "Madrid (Spain)", coords: "40.4168° N, 3.7038° W" },
    { name: "Rome (Italy)", coords: "41.9028° N, 12.4964° E" },

    // --- AFRICA ---
    { name: "Cairo (Egypt)", coords: "30.0444° N, 31.2357° E" },
    { name: "Casablanca (Morocco)", coords: "33.5731° N, 7.5898° W" },
    { name: "Lagos (Nigeria)", coords: "6.5244° N, 3.3792° E" },
    { name: "Cape Town (South Africa)", coords: "-33.9249° S, 18.4241° E" },

    // --- AMERICAS ---
    { name: "New York (USA)", coords: "40.7128° N, 74.0060° W" },
    { name: "Los Angeles (USA)", coords: "34.0522° N, 118.2437° W" },
    { name: "Toronto (Canada)", coords: "43.6510° N, 79.3470° W" },
    { name: "São Paulo (Brazil)", coords: "-23.5558° S, 46.6396° W" },
    { name: "Buenos Aires (Argentina)", coords: "-34.6037° S, 58.3816° W" },

    // --- OCEANIA ---
    { name: "Sydney (Australia)", coords: "-33.8688° S, 151.2093° E" },
    { name: "Melbourne (Australia)", coords: "-37.8136° S, 144.9631° E" },
    { name: "Auckland (New Zealand)", coords: "-36.8485° S, 174.7633° E" }
];

const input = document.getElementById('locationInput');
const list = document.getElementById('suggestionList');

function searchLocation() {
    const query = input.value.toLowerCase();
    list.innerHTML = '';

    if (query.length < 1) {
        list.classList.add('hidden');
        return;
    }

    const matches = cities.filter(city => city.name.toLowerCase().includes(query));

    if (matches.length > 0) {
        list.classList.remove('hidden');
        matches.forEach(city => {
            const li = document.createElement('li');
            li.className = "px-4 py-3 cursor-pointer hover:bg-gray-700 hover:text-accent transition flex justify-between items-center group border-b border-gray-700 last:border-0";
            li.innerHTML = `
                <span class="font-medium text-gray-200 group-hover:text-white capitalize"><i class="fa-solid fa-location-dot mr-2 text-gray-500 group-hover:text-accent"></i>${city.name}</span>
                <span class="text-xs text-gray-500 font-mono bg-gray-900 px-2 py-1 rounded group-hover:bg-gray-800">${city.coords}</span>
            `;
            li.onclick = () => selectCity(city);
            list.appendChild(li);
        });
    } else {
        list.classList.add('hidden');
    }
}

function selectCity(city) {
    input.value = `${city.name} (${city.coords})`;
    list.classList.add('hidden');
}

// Close dropdown on outside click
document.addEventListener('click', function (e) {
    if (input && !input.contains(e.target) && list && !list.contains(e.target)) {
        list.classList.add('hidden');
    }
});

// ==========================================
// 4. MAIN CALCULATOR LOGIC & ANIMATION
// ==========================================

// Set default date to today
if (document.getElementById('dateInput')) {
    document.getElementById('dateInput').valueAsDate = new Date();
}

function simulateGeo() {
    input.value = "";
    input.placeholder = "Mencari koordinat GPS...";
    input.parentElement.classList.add('animate-pulse');

    setTimeout(() => {
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        input.value = `${randomCity.name} (${randomCity.coords})`;
        input.parentElement.classList.remove('animate-pulse');
        input.focus();
    }, 1000);
}

function calculateData() {
    const btn = document.getElementById('calculateBtn');
    const btnContent = btn.querySelector('span');
    const initialState = document.getElementById('initial-state');
    const resultVisual = document.getElementById('result-visual');
    const resultData = document.getElementById('result-data');

    // Loading State
    btn.disabled = true;
    btnContent.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Menghitung Ephemeris...';
    btn.classList.add('opacity-80', 'cursor-not-allowed');

    // Data Processing Simulation
    const inputVal = document.getElementById('dateInput').value;
    const dateObj = new Date(inputVal);

    // Greg Date Format
    const gregOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = dateObj.toLocaleDateString('id-ID', gregOptions);

    // Hijri Date Format
    const hijriFormatter = new Intl.DateTimeFormat('id-ID-u-ca-islamic-civil', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const hijriDateString = hijriFormatter.format(dateObj);

    // Random Astronomical Data Simulation
    const randomAltDec = (Math.random() * (6 - 2) + 2); // 2 to 6 degrees
    const randomElongDec = (Math.random() * (8 - 5) + 5); // 5 to 8 degrees

    // Helper formatted string (deg min)
    const formatDeg = (decimal) => {
        const deg = Math.floor(decimal);
        const min = Math.floor((decimal % 1) * 60);
        return `+${deg.toString().padStart(2, '0')}° ${min.toString().padStart(2, '0')}'`;
    };

    // Delay for calculation effect
    setTimeout(() => {
        // UI Update with new data
        document.getElementById('res-greg-date').innerText = dateString;
        document.getElementById('res-hijri-date').innerText = `${hijriDateString} H`;
        const nextDay = new Date(dateObj); nextDay.setDate(dateObj.getDate() + 1);
        document.getElementById('res-ijtima-date').innerText = nextDay.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }); // Mock ijtima date
        document.getElementById('res-alt').innerHTML = formatDeg(randomAltDec);
        document.getElementById('res-elong').innerHTML = formatDeg(randomElongDec);

        // Hide Initial State
        initialState.style.opacity = '0';
        setTimeout(() => { initialState.style.display = 'none'; }, 500);

        // Visual Diagram HTML
        resultVisual.innerHTML = `
            <div class="relative w-full h-full overflow-hidden font-mono select-none bg-gray-900 group">
                <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 100px 100px;"></div>
                <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 20px 20px;"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-orange-900/30 via-space/80 to-space"></div>
                
                <div class="absolute left-0 w-full h-0 top-[38%] z-10 transition-transform duration-700 group-hover:scale-105 origin-bottom">
                    
                    <div class="absolute top-0 w-full h-[1px] bg-blue-400/50 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10"></div>
                    <div class="absolute top-2 right-4 text-[10px] text-blue-300 tracking-widest bg-space/50 px-2 rounded border border-blue-500/20">HORIZON / UFUK (0°)</div>
                    
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-0 pt-16">
                        <div class="w-40 h-40 rounded-full bg-orange-500 blur-[60px] opacity-30 absolute top-0 animate-pulse"></div>
                        <div class="w-20 h-20 rounded-full bg-gradient-to-t from-orange-600 to-yellow-500 shadow-lg border border-orange-400/50 relative z-10"></div>
                        <div class="mt-2 text-[9px] text-orange-300 relative z-10">SUN (Ref)</div>
                    </div>

                    <div class="absolute bottom-4 left-[53%] z-20 group/moon hover:z-30">
                        <div class="absolute top-4 -left-4 h-[100px] w-[1px] border-l border-dashed border-green-500/50 origin-top transform rotate-0 opacity-0 group-hover/moon:opacity-100 transition duration-500"></div>
                        <div class="absolute top-4 left-2 w-[200px] h-[1px] bg-yellow-400/20 origin-left transform rotate-[115deg] opacity-0 group-hover/moon:opacity-100 transition duration-500"></div>
                        
                        <div class="relative w-12 h-12 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] cursor-pointer hover:scale-110 transition-transform duration-300 animate-float">
                            <div class="absolute inset-0 bg-gray-800 rounded-full border border-gray-600"></div>
                            <div class="absolute -inset-[1px] rounded-full border-l-[3px] border-b-[1px] border-t-0 border-r-0 border-white rotate-[-35deg]"></div>
                        </div>
                        
                        <div class="absolute -top-14 -left-10 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg border border-white/20 text-center shadow-lg transform scale-0 group-hover/moon:scale-100 transition duration-300 origin-bottom">
                            <div class="text-[10px] text-white tracking-wider font-bold">MOON</div>
                            <div class="text-[9px] text-green-400">Alt ${formatDeg(randomAltDec)}</div>
                        </div>
                    </div>
                </div>

                <div class="absolute top-6 right-6 w-24 h-24 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-xl z-20 hover:scale-110 transition-transform cursor-zoom-in">
                    <div class="absolute inset-0 flex items-center justify-center opacity-30">
                        <div class="w-full h-[1px] bg-green-500"></div>
                        <div class="h-full w-[1px] bg-green-500 absolute"></div>
                    </div>
                    <div class="w-10 h-10 rounded-full border-l-[5px] border-b-[1px] border-t-0 border-r-0 border-white rotate-[-35deg] filter drop-shadow(0 0 10px white)"></div>
                    <div class="absolute bottom-4 text-[8px] text-green-400 font-mono">ZOOM x50</div>
                </div>
            </div>
        `;

        // Reveal Visual and Data
        resultVisual.classList.remove('opacity-0');
        resultData.classList.remove('opacity-0', 'translate-y-8');

        // Counter Animation for Numbers
        animateCounter();

        // Reset Button
        btn.disabled = false;
        btnContent.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Hitung Ulang';
        btn.classList.remove('from-accent', 'to-orange-500', 'opacity-80', 'cursor-not-allowed');
        btn.classList.add('bg-gray-800', 'border', 'border-gray-600', 'text-gray-300', 'hover:bg-gray-700');

    }, 1500); // 1.5s calculation delay
}

function animateCounter() {
    // Find elements with 'counter-value' class
    const counters = document.querySelectorAll('.counter-value');
    counters.forEach(counter => {
        counter.classList.remove('animate__animated', 'animate__fadeInUp');
        void counter.offsetWidth; // trigger reflow
        counter.classList.add('animate__animated', 'animate__fadeInUp');
        counter.style.setProperty('--animate-duration', '0.8s');
    });
}