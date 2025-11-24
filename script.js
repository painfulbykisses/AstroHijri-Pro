// ==========================================
// 1. LOGIKA NAVIGASI TAB (Single Page App)
// ==========================================
function switchTab(tabId) {
    // Sembunyikan semua halaman
    document.getElementById('page-calculator').classList.add('hidden');
    document.getElementById('page-metode').classList.add('hidden');
    document.getElementById('page-tentang').classList.add('hidden');
    
    // Tampilkan halaman yang dipilih
    document.getElementById('page-' + tabId).classList.remove('hidden');

    // Reset style navigasi
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(el => {
        el.classList.remove('text-accent');
        el.classList.add('hover:text-accent');
        el.classList.remove('after:w-full'); 
        el.classList.add('after:w-0');
    });

    // Set style aktif
    const activeNav = document.getElementById('nav-' + tabId);
    activeNav.classList.add('text-accent', 'after:w-full');
    activeNav.classList.remove('after:w-0', 'hover:text-accent');
}

// ==========================================
// 2. DATA KOTA & AUTOCOMPLETE
// ==========================================
const cities = [
    { name: "Jakarta Pusat", coords: "-6.1751° S, 106.8650° E" },
    { name: "Bandung", coords: "-6.9175° S, 107.6191° E" },
    { name: "Surabaya", coords: "-7.2575° S, 112.7521° E" },
    { name: "Malang", coords: "-7.9666° S, 112.6326° E" },
    { name: "Yogyakarta", coords: "-7.7956° S, 110.3695° E" },
    { name: "Aceh (Banda Aceh)", coords: "5.5483° N, 95.3238° E" },
    { name: "Jayapura", coords: "-2.5489° S, 140.7180° E" },
    { name: "Medan", coords: "3.5952° N, 98.6722° E" },
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
            li.className = "px-4 py-3 cursor-pointer hover:bg-gray-700 hover:text-accent transition flex justify-between items-center group";
            li.innerHTML = `
                <span class="font-medium text-gray-200 group-hover:text-white">${city.name}</span>
                <span class="text-xs text-gray-500 font-mono">${city.coords}</span>
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

// Tutup dropdown jika klik di luar
document.addEventListener('click', function(e) {
    if (input && !input.contains(e.target) && list && !list.contains(e.target)) {
        list.classList.add('hidden');
    }
});

// ==========================================
// 3. LOGIKA UTAMA KALKULATOR & VISUALISASI
// ==========================================

// Set tanggal default ke hari ini
if(document.getElementById('dateInput')) {
    document.getElementById('dateInput').valueAsDate = new Date();
}

// Efek visual saat tombol "Deteksi Otomatis" diklik
function simulateGeo() {
    input.value = ""; 
    input.placeholder = "Mencari koordinat GPS...";
    input.parentElement.classList.add('animate-pulse');
    
    setTimeout(() => {
        // Ambil kota acak untuk demo
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        input.value = `${randomCity.name} (${randomCity.coords})`;
        input.parentElement.classList.remove('animate-pulse');
        input.focus(); 
    }, 1200);
}

function calculateData() {
    const btn = document.getElementById('calculateBtn');
    const btnContent = btn.querySelector('span');
    const initialState = document.getElementById('initial-state');
    const resultVisual = document.getElementById('result-visual');
    const resultData = document.getElementById('result-data');
    
    // 1. Ubah Tombol ke Loading State
    btn.disabled = true;
    btnContent.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Menghitung Ephemeris...';
    btn.classList.add('opacity-80', 'cursor-not-allowed');

    // 2. PROSES TANGGAL (REAL CALENDAR CONVERSION)
    const inputVal = document.getElementById('dateInput').value;
    const dateObj = new Date(inputVal);

    // Format Tanggal Masehi (Indonesia)
    const gregOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = dateObj.toLocaleDateString('id-ID', gregOptions);

    // Format Tanggal Hijriah (Menggunakan API Intl Browser)
    // 'id-ID-u-ca-islamic-civil' adalah standar umum hisab sipil
    const hijriFormatter = new Intl.DateTimeFormat('id-ID-u-ca-islamic-civil', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const hijriDateString = hijriFormatter.format(dateObj);

    // Simulasi Data Astronomis (Random dalam range yang masuk akal)
    const randomAlt = (Math.random() * (6 - 2) + 2).toFixed(2); // 2 s/d 6 derajat
    const randomElong = (Math.random() * (8 - 5) + 5).toFixed(2); // 5 s/d 8 derajat

    // 3. UPDATE UI DENGAN DATA BARU
    document.getElementById('res-greg-date').innerText = dateString;
    document.getElementById('res-hijri-date').innerText = `${hijriDateString} H`; // Menampilkan tanggal Hijriah asli
    document.getElementById('res-ijtima-date').innerText = dateObj.toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'});
    document.getElementById('res-alt').innerText = `+0${Math.floor(randomAlt)}° ${(randomAlt % 1 * 60).toFixed(0)}'`;
    document.getElementById('res-elong').innerText = `0${Math.floor(randomElong)}° ${(randomElong % 1 * 60).toFixed(0)}'`;

    // 4. TAMPILKAN HASIL SETELAH DELAY
    setTimeout(() => {
        // Sembunyikan animasi orbit awal
        initialState.style.opacity = '0';
        setTimeout(() => { initialState.style.display = 'none'; }, 500);

        // Masukkan HTML Diagram Visual
        // Perhatikan: top-[38%] digunakan agar visual tidak tertutup kartu
        resultVisual.innerHTML = `
            <div class="relative w-full h-full overflow-hidden font-mono select-none bg-gray-900">
                <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 100px 100px;"></div>
                <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 20px 20px;"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-orange-900/30 via-space/80 to-space"></div>
                
                <div class="absolute left-0 w-full h-0 top-[38%] z-10">
                    
                    <div class="absolute top-0 w-full h-[1px] bg-blue-400/50 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10"></div>
                    <div class="absolute top-2 right-4 text-[10px] text-blue-300 tracking-widest bg-space/50 px-2 rounded border border-blue-500/20">HORIZON / UFUK (0°)</div>
                    
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-0 pt-16">
                        <div class="w-32 h-32 rounded-full bg-orange-500 blur-[50px] opacity-40 absolute top-0"></div>
                        <div class="w-16 h-16 rounded-full bg-gradient-to-t from-orange-600 to-yellow-500 shadow-lg border border-orange-400/50 relative z-10"></div>
                        <div class="mt-2 text-[9px] text-orange-300 relative z-10">SUN (Ref)</div>
                    </div>

                    <div class="absolute bottom-4 left-[53%] z-20 group">
                        <div class="absolute top-4 -left-4 h-[90px] w-[1px] border-l border-dashed border-green-500/50 origin-top transform rotate-0 opacity-0 group-hover:opacity-100 transition"></div>
                        <div class="absolute top-4 left-2 w-[180px] h-[1px] bg-yellow-400/20 origin-left transform rotate-[115deg] opacity-0 group-hover:opacity-100 transition"></div>
                        
                        <div class="relative w-10 h-10 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] cursor-pointer hover:scale-110 transition-transform">
                            <div class="absolute inset-0 bg-gray-800 rounded-full border border-gray-600"></div>
                            <div class="absolute -inset-[1px] rounded-full border-l-[3px] border-b-[1px] border-t-0 border-r-0 border-white rotate-[-35deg]"></div>
                        </div>
                        
                        <div class="absolute -top-12 -left-8 bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/20 text-center">
                            <div class="text-[9px] text-white tracking-wider font-bold">MOON</div>
                            <div class="text-[8px] text-green-400">Alt +${Math.floor(randomAlt)}°</div>
                        </div>
                    </div>
                </div>

                <div class="absolute top-6 right-6 w-24 h-24 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-xl z-20">
                    <div class="absolute inset-0 flex items-center justify-center opacity-30">
                        <div class="w-full h-[1px] bg-green-500"></div>
                        <div class="h-full w-[1px] bg-green-500 absolute"></div>
                    </div>
                    <div class="w-10 h-10 rounded-full border-l-[5px] border-b-[1px] border-t-0 border-r-0 border-white rotate-[-35deg] filter drop-shadow(0 0 10px white)"></div>
                    <div class="absolute bottom-4 text-[8px] text-green-400 font-mono">ZOOM x50</div>
                </div>
            </div>
        `;
        
        // Tampilkan kontainer visual dan data
        resultVisual.classList.remove('opacity-0');
        resultData.classList.remove('opacity-0', 'translate-y-8');

        // Kembalikan tombol ke keadaan semula
        btn.disabled = false;
        btnContent.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Hitung Ulang';
        btn.classList.remove('from-accent', 'to-orange-500', 'opacity-80', 'cursor-not-allowed');
        btn.classList.add('bg-gray-800', 'border', 'border-gray-600', 'text-gray-300', 'hover:bg-gray-700');
    }, 2000); // Delay 2 detik
}