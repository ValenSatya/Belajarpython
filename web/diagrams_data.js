// DIAGRAMS DATA — Ilustrasi Visual Vektor SVG untuk Pembelajaran LKS AI
// Menggunakan gaya monokromatik modern, tajam, presisi, dan sepenuhnya responsif offline.

const COURSE_DIAGRAMS = {
    // ----------------------------------------------------
    // BAB 1: PENGENALAN & PIPELINE PEMODELAN
    // ----------------------------------------------------
    "ml_paradigm": {
        title: "Perbandingan Paradigma: Pemrograman Tradisional vs Machine Learning",
        category: "FONDASI KONSEPTUAL",
        caption: "Pada pemrograman tradisional manusia menyusun aturan if-else manual. Pada Machine Learning, algoritma mengekstrak pola matematis mandiri dari data dan kunci jawaban (ground truth).",
        svg: `<svg viewBox="0 0 760 270" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="270" rx="12" fill="#18181b"/>
            
            <!-- SECTION 1: TRADITIONAL PROGRAMMING -->
            <g transform="translate(30, 20)">
                <rect width="700" height="105" rx="8" fill="#141416" stroke="#27272a" stroke-width="1.5"/>
                <text x="20" y="24" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10.5" font-weight="bold">1. PARADIGMA PEMROGRAMAN TRADISIONAL (RULE-BASED)</text>
                
                <!-- Box 1: Data -->
                <rect x="25" y="40" width="130" height="48" rx="6" fill="#1f1f23" stroke="#333338"/>
                <text x="90" y="62" fill="#f4f4f5" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Data Masukan</text>
                <text x="90" y="77" fill="#71717a" font-family="DM Mono, monospace" font-size="9" text-anchor="middle">(Informasi Mentah)</text>

                <text x="175" y="68" fill="#52525b" font-family="DM Mono, monospace" font-size="16" font-weight="bold">+</text>

                <!-- Box 2: Rules -->
                <rect x="200" y="40" width="160" height="48" rx="6" fill="#1f1f23" stroke="#333338"/>
                <text x="280" y="62" fill="#f4f4f5" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Aturan Logika</text>
                <text x="280" y="77" fill="#71717a" font-family="DM Mono, monospace" font-size="9" text-anchor="middle">(Kode If-Else Manual)</text>

                <text x="385" y="68" fill="#71717a" font-family="DM Mono, monospace" font-size="18">→</text>

                <!-- Box 3: Processor -->
                <rect x="415" y="40" width="120" height="48" rx="6" fill="#27272a" stroke="#3f3f46"/>
                <text x="475" y="62" fill="#d4d4d8" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Komputer</text>
                <text x="475" y="77" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="9" text-anchor="middle">(Eksekusi Kaku)</text>

                <text x="560" y="68" fill="#71717a" font-family="DM Mono, monospace" font-size="18">→</text>

                <!-- Box 4: Output -->
                <rect x="585" y="40" width="95" height="48" rx="6" fill="#1f1f23" stroke="#333338"/>
                <text x="632" y="68" fill="#f4f4f5" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Jawaban</text>
            </g>

            <!-- SECTION 2: MACHINE LEARNING -->
            <g transform="translate(30, 140)">
                <rect width="700" height="105" rx="8" fill="#141416" stroke="#3f3f46" stroke-width="1.5"/>
                <text x="20" y="24" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10.5" font-weight="bold">2. PARADIGMA MACHINE LEARNING (DATA-DRIVEN LEARNING)</text>
                
                <!-- Box 1: Data -->
                <rect x="25" y="40" width="130" height="48" rx="6" fill="#222226" stroke="#3f3f46"/>
                <text x="90" y="62" fill="#f4f4f5" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Data Masukan (X)</text>
                <text x="90" y="77" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="9" text-anchor="middle">(Fitur Numerik)</text>

                <text x="175" y="68" fill="#52525b" font-family="DM Mono, monospace" font-size="16" font-weight="bold">+</text>

                <!-- Box 2: Ground Truth -->
                <rect x="200" y="40" width="160" height="48" rx="6" fill="#222226" stroke="#3f3f46"/>
                <text x="280" y="62" fill="#f4f4f5" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Jawaban Benar (y)</text>
                <text x="280" y="77" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="9" text-anchor="middle">(Label Ground Truth)</text>

                <text x="385" y="68" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="18">→</text>

                <!-- Box 3: Learning Algorithm -->
                <rect x="415" y="40" width="120" height="48" rx="6" fill="#27272a" stroke="#52525b"/>
                <text x="475" y="62" fill="#f4f4f5" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Algoritma AI</text>
                <text x="475" y="77" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="9" text-anchor="middle">(Pelatihan .fit())</text>

                <text x="560" y="68" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="18">→</text>

                <!-- Box 4: Trained Model -->
                <rect x="585" y="40" width="95" height="48" rx="6" fill="#222226" stroke="#52525b"/>
                <text x="632" y="62" fill="#f4f4f5" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">MODEL</text>
                <text x="632" y="77" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="8.5" text-anchor="middle">Aturan Mandiri</text>
            </g>
        </svg>`
    },

    "ml_pipeline": {
        title: "Alur Lengkap Siklus Pemodelan Machine Learning (End-to-End Pipeline)",
        category: "ALUR KERJA KOMPETISI LKS",
        caption: "Enam tahapan kritis pemodelan standar nasional: Data mentah dipartisi terlebih dahulu untuk mencegah kebocoran data (Data Leakage), normalisasi hanya belajar dari data latih, dilatih secara matematis, lalu diuji kebenarannya.",
        svg: `<svg viewBox="0 0 760 270" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="270" rx="12" fill="#18181b"/>
            
            <!-- Phase 1: Data Mentah -->
            <g transform="translate(20, 45)">
                <rect width="105" height="175" rx="8" fill="#141416" stroke="#27272a" stroke-width="1.5"/>
                <text x="52" y="25" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10" font-weight="bold" text-anchor="middle">1. DATASET</text>
                <rect x="15" y="42" width="75" height="45" rx="4" fill="#1f1f23" stroke="#333338"/>
                <text x="52" y="62" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="9" text-anchor="middle">Tabel CSV</text>
                <text x="52" y="76" fill="#71717a" font-family="DM Mono, monospace" font-size="8" text-anchor="middle">(X, y)</text>
                <text x="52" y="115" fill="#a1a1aa" font-family="Plus Jakarta Sans, sans-serif" font-size="9" text-anchor="middle">Eksplorasi</text>
                <text x="52" y="130" fill="#71717a" font-family="DM Mono, monospace" font-size="8.5" text-anchor="middle">X.shape</text>
                <text x="52" y="155" fill="#71717a" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" text-anchor="middle">Imbalanced Check</text>
            </g>

            <text x="133" y="135" fill="#52525b" font-family="DM Mono, monospace" font-size="16">→</text>

            <!-- Phase 2: Train-Test Split (Data Leakage Barrier) -->
            <g transform="translate(145, 45)">
                <rect width="115" height="175" rx="8" fill="#141416" stroke="#3f3f46" stroke-width="1.5"/>
                <text x="57" y="25" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10" font-weight="bold" text-anchor="middle">2. SPLITTING</text>
                
                <rect x="12" y="42" width="90" height="42" rx="4" fill="#222226" stroke="#3f3f46"/>
                <text x="57" y="60" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="9" font-weight="bold" text-anchor="middle">Train Set (80%)</text>
                <text x="57" y="74" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="8" text-anchor="middle">X_train, y_train</text>

                <line x1="12" y1="94" x2="102" y2="94" stroke="#52525b" stroke-dasharray="3 3"/>
                <text x="57" y="106" fill="#71717a" font-family="DM Mono, monospace" font-size="7.5" text-anchor="middle">ISOLASI KETAT</text>

                <rect x="12" y="115" width="90" height="42" rx="4" fill="#18181b" stroke="#333338"/>
                <text x="57" y="133" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="9" font-weight="bold" text-anchor="middle">Test Set (20%)</text>
                <text x="57" y="147" fill="#71717a" font-family="DM Mono, monospace" font-size="8" text-anchor="middle">X_test, y_test</text>
            </g>

            <text x="268" y="135" fill="#52525b" font-family="DM Mono, monospace" font-size="16">→</text>

            <!-- Phase 3: Preprocessing & Scaling -->
            <g transform="translate(280, 45)">
                <rect width="115" height="175" rx="8" fill="#141416" stroke="#27272a" stroke-width="1.5"/>
                <text x="57" y="25" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10" font-weight="bold" text-anchor="middle">3. SCALING</text>
                
                <rect x="12" y="42" width="90" height="45" rx="4" fill="#1f1f23" stroke="#333338"/>
                <text x="57" y="60" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="8.5" font-weight="bold" text-anchor="middle">scaler.fit(X_tr)</text>
                <text x="57" y="74" fill="#71717a" font-family="DM Mono, monospace" font-size="8" text-anchor="middle">Hitung μ &amp; σ</text>

                <text x="57" y="103" fill="#71717a" font-family="DM Mono, monospace" font-size="9" text-anchor="middle">Transform:</text>
                <text x="57" y="122" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="8" text-anchor="middle">X_train_scaled</text>
                <text x="57" y="140" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="8" text-anchor="middle">X_test_scaled</text>
            </g>

            <text x="403" y="135" fill="#52525b" font-family="DM Mono, monospace" font-size="16">→</text>

            <!-- Phase 4: Training (.fit) -->
            <g transform="translate(415, 45)">
                <rect width="110" height="175" rx="8" fill="#141416" stroke="#3f3f46" stroke-width="1.5"/>
                <text x="55" y="25" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10" font-weight="bold" text-anchor="middle">4. TRAINING</text>
                
                <rect x="10" y="42" width="90" height="45" rx="4" fill="#222226" stroke="#52525b"/>
                <text x="55" y="60" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="9" font-weight="bold" text-anchor="middle">model.fit()</text>
                <text x="55" y="74" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="8" text-anchor="middle">Pure NumPy</text>

                <text x="55" y="112" fill="#d4d4d8" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" text-anchor="middle">Optimasi Bobot:</text>
                <text x="55" y="128" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="9" text-anchor="middle">w, b, Centroid</text>
                <text x="55" y="150" fill="#71717a" font-family="Plus Jakarta Sans, sans-serif" font-size="8" text-anchor="middle">Tuning Hyperparam</text>
            </g>

            <text x="533" y="135" fill="#52525b" font-family="DM Mono, monospace" font-size="16">→</text>

            <!-- Phase 5 & 6: Predict & Evaluate -->
            <g transform="translate(545, 45)">
                <rect width="195" height="175" rx="8" fill="#141416" stroke="#3f3f46" stroke-width="1.5"/>
                <text x="97" y="25" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10" font-weight="bold" text-anchor="middle">5. INFERENSI &amp; 6. EVALUASI</text>
                
                <!-- Predict Box -->
                <rect x="15" y="42" width="165" height="42" rx="4" fill="#1f1f23" stroke="#333338"/>
                <text x="97" y="60" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="9" font-weight="bold" text-anchor="middle">y_pred = model.predict(X_test)</text>
                <text x="97" y="74" fill="#71717a" font-family="DM Mono, monospace" font-size="8" text-anchor="middle">Hanya uji pada data baru</text>

                <!-- Compare -->
                <line x1="97" y1="87" x2="97" y2="105" stroke="#52525b" stroke-width="1.5"/>

                <!-- Evaluate Box -->
                <rect x="15" y="108" width="165" height="52" rx="4" fill="#222226" stroke="#3f3f46"/>
                <text x="97" y="125" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="9" font-weight="bold" text-anchor="middle">Bandingkan: y_pred vs y_test</text>
                <text x="97" y="140" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="8" text-anchor="middle">F1-Score | Confusion Matrix</text>
                <text x="97" y="152" fill="#71717a" font-family="DM Mono, monospace" font-size="8" text-anchor="middle">RMSE | R² Score | Silhouette</text>
            </g>
        </svg>`
    },

    // ----------------------------------------------------
    // BAB 2: KNN
    // ----------------------------------------------------
    "knn_geometry": {
        title: "Visualisasi Ruang Fitur KNN & Pemilihan Radius K Tetangga",
        category: "GEOMETRI RUANG FITUR",
        caption: "Titik query baru '?' diprediksi berdasarkan suara terbanyak (majority voting) dari tetangga terdekat dalam radius K. Memilih K ganjil mencegah terjadinya hasil seri.",
        svg: `<svg viewBox="0 0 760 320" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="320" rx="12" fill="#18181b"/>
            <!-- Grid Lines -->
            <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#222226" stroke-width="1"/>
                </pattern>
            </defs>
            <rect width="760" height="320" rx="12" fill="url(#grid)" />
            
            <!-- Axes -->
            <line x1="70" y1="280" x2="710" y2="280" stroke="#3f3f46" stroke-width="1.5" />
            <line x1="70" y1="280" x2="70" y2="40" stroke="#3f3f46" stroke-width="1.5" />
            <text x="700" y="300" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="11" text-anchor="end">Fitur X₁ (Panjang Kelopak)</text>
            <text x="85" y="55" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="11">Fitur X₂ (Lebar Kelopak)</text>

            <!-- Query Point Center -->
            <!-- Concentric Circles: K=1, K=3, K=5 -->
            <circle cx="390" cy="160" r="135" fill="#27272a" fill-opacity="0.25" stroke="#52525b" stroke-width="1.5" stroke-dasharray="6 4" />
            <circle cx="390" cy="160" r="85" fill="#27272a" fill-opacity="0.4" stroke="#71717a" stroke-width="1.5" stroke-dasharray="5 3" />
            <circle cx="390" cy="160" r="45" fill="#27272a" fill-opacity="0.6" stroke="#a1a1aa" stroke-width="1.5" stroke-dasharray="3 3" />

            <!-- Labels for K radii -->
            <text x="390" y="105" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="10" text-anchor="middle" font-weight="bold">Radius K=1</text>
            <text x="390" y="65" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">Radius K=3</text>
            <text x="390" y="20" fill="#71717a" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">Radius K=5</text>

            <!-- Data Points: Kelas A (Lingkaran Abu-Abu Lembut) -->
            <circle cx="370" cy="140" r="7" fill="#d4d4d8" stroke="#18181b" stroke-width="2" />
            <circle cx="330" cy="190" r="7" fill="#d4d4d8" stroke="#18181b" stroke-width="2" />
            <circle cx="280" cy="130" r="7" fill="#d4d4d8" stroke="#18181b" stroke-width="2" />
            <circle cx="240" cy="170" r="7" fill="#d4d4d8" stroke="#18181b" stroke-width="2" />
            <circle cx="300" cy="220" r="7" fill="#d4d4d8" stroke="#18181b" stroke-width="2" />
            <circle cx="210" cy="110" r="7" fill="#d4d4d8" stroke="#18181b" stroke-width="2" />

            <!-- Data Points: Kelas B (Kotak Zinc Gelap) -->
            <rect x="425" y="130" width="13" height="13" rx="2" fill="#71717a" stroke="#18181b" stroke-width="2" />
            <rect x="440" y="180" width="13" height="13" rx="2" fill="#71717a" stroke="#18181b" stroke-width="2" />
            <rect x="400" y="225" width="13" height="13" rx="2" fill="#71717a" stroke="#18181b" stroke-width="2" />
            <rect x="490" y="140" width="13" height="13" rx="2" fill="#71717a" stroke="#18181b" stroke-width="2" />
            <rect x="520" y="200" width="13" height="13" rx="2" fill="#71717a" stroke="#18181b" stroke-width="2" />
            <rect x="460" y="240" width="13" height="13" rx="2" fill="#71717a" stroke="#18181b" stroke-width="2" />

            <!-- Query Target Point '?' -->
            <circle cx="390" cy="160" r="11" fill="#f4f4f5" stroke="#18181b" stroke-width="2" />
            <text x="390" y="164" fill="#141416" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" text-anchor="middle">?</text>

            <!-- Legend & Decision Card -->
            <rect x="535" y="35" width="195" height="115" rx="8" fill="#141416" stroke="#27272a" stroke-width="1.5"/>
            <text x="550" y="55" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10" font-weight="bold">LEGENDA &amp; VOTING</text>
            <circle cx="555" cy="73" r="5" fill="#d4d4d8" />
            <text x="568" y="76" fill="#d4d4d8" font-family="Plus Jakarta Sans, sans-serif" font-size="10">Kelas 0 (Iris-Setosa)</text>
            <rect x="550" y="85" width="10" height="10" rx="1.5" fill="#71717a" />
            <text x="568" y="93" fill="#d4d4d8" font-family="Plus Jakarta Sans, sans-serif" font-size="10">Kelas 1 (Versicolor)</text>
            
            <line x1="545" y1="105" x2="720" y2="105" stroke="#27272a" stroke-width="1" />
            <text x="550" y="122" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="9.5">K=1 → Kelas 0 (1 vs 0)</text>
            <text x="550" y="137" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="9.5" font-weight="bold">K=3 → Kelas 1 (2 vs 1)</text>
        </svg>`
    },

    "distance_metrics": {
        title: "Perbandingan Geometris: Jarak Euclidean vs Jarak Manhattan",
        category: "FORMULASI MATEMATIKA",
        caption: "Jarak Euclidean menghitung lintasan garis lurus terpendek (hipotenusa Pythagoras), sedangkan Jarak Manhattan menghitung lintasan orthogonal berundak menyusuri sumbu.",
        svg: `<svg viewBox="0 0 760 280" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="280" rx="12" fill="#18181b"/>
            <defs>
                <pattern id="grid_dist" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#222226" stroke-width="1"/>
                </pattern>
            </defs>
            <rect x="80" y="40" width="360" height="200" fill="url(#grid_dist)" stroke="#27272a" rx="6" />

            <!-- Point A & Point B -->
            <!-- A: (140, 200), B: (380, 80) -->
            <!-- Delta X = 240, Delta Y = 120 -->

            <!-- Manhattan Path (Step-wise) -->
            <path d="M 140 200 L 380 200 L 380 80" fill="none" stroke="#71717a" stroke-width="2.5" stroke-dasharray="5 4" />
            <text x="260" y="218" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">|Δx| = |x₂ - x₁|</text>
            <text x="395" y="145" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10">|Δy| = |y₂ - y₁|</text>

            <!-- Euclidean Path (Direct Hypotenuse) -->
            <line x1="140" y1="200" x2="380" y2="80" stroke="#f4f4f5" stroke-width="3" />
            <text x="240" y="130" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="11" font-weight="bold" transform="rotate(-26.5 240 130)">d = √(Δx² + Δy²)</text>

            <!-- Nodes -->
            <circle cx="140" cy="200" r="7" fill="#f4f4f5" stroke="#18181b" stroke-width="2"/>
            <text x="125" y="225" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="11" font-weight="bold">Titik A (x₁, y₁)</text>

            <circle cx="380" cy="80" r="7" fill="#f4f4f5" stroke="#18181b" stroke-width="2"/>
            <text x="395" y="75" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="11" font-weight="bold">Titik B (x₂, y₂)</text>

            <!-- Comparison Box Right Side -->
            <rect x="475" y="45" width="250" height="190" rx="8" fill="#141416" stroke="#27272a" stroke-width="1.5"/>
            <text x="495" y="72" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="11" font-weight="bold">PERBANDINGAN FORMULA</text>
            
            <text x="495" y="100" fill="#e4e4e7" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="bold">1. Euclidean Distance (L₂ Norm):</text>
            <text x="495" y="118" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10.5">d_E = √(240² + 120²) ≈ 268.3</text>
            <text x="495" y="134" fill="#71717a" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5">Sensitif terhadap outlier/skala besar.</text>

            <line x1="495" y1="147" x2="705" y2="147" stroke="#27272a" stroke-width="1" />

            <text x="495" y="167" fill="#e4e4e7" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="bold">2. Manhattan Distance (L₁ Norm):</text>
            <text x="495" y="185" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10.5">d_M = |240| + |120| = 360.0</text>
            <text x="495" y="201" fill="#71717a" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5">Lebih tahan outlier &amp; dimensi banyak.</text>
        </svg>`
    },

    // ----------------------------------------------------
    // BAB 3: DECISION TREE
    // ----------------------------------------------------
    "decision_tree_partition": {
        title: "Topologi Pohon Keputusan CART & Partisi Ruang Fitur Ortogonal",
        category: "ARSITEKTUR MODEL",
        caption: "Setiap kondisi simpul internal memotong ruang koordinat fitur secara tegak lurus (orthogonal split) menjadi bidang hiper-persegi.",
        svg: `<svg viewBox="0 0 760 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="300" rx="12" fill="#18181b"/>
            
            <!-- Left Side: Tree Topology -->
            <text x="180" y="32" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="11" font-weight="bold" text-anchor="middle">STRUKTUR POHON KEPUTUSAN</text>

            <!-- Root Node -->
            <rect x="110" y="45" width="140" height="36" rx="6" fill="#222226" stroke="#3f3f46" stroke-width="1.5" />
            <text x="180" y="67" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10.5" text-anchor="middle" font-weight="bold">X₁ ≤ 2.5 (Akar)</text>

            <!-- Branches from Root -->
            <path d="M 140 81 L 90 120" stroke="#52525b" stroke-width="1.5" />
            <text x="100" y="98" fill="#71717a" font-family="DM Mono, monospace" font-size="9">True</text>

            <path d="M 220 81 L 270 120" stroke="#52525b" stroke-width="1.5" />
            <text x="250" y="98" fill="#71717a" font-family="DM Mono, monospace" font-size="9">False</text>

            <!-- Left Child: Leaf Node -->
            <rect x="35" y="120" width="110" height="34" rx="6" fill="#141416" stroke="#27272a" stroke-width="1.5" />
            <text x="90" y="141" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">Daun 1: Kelas 0</text>

            <!-- Right Child: Internal Node 2 -->
            <rect x="200" y="120" width="140" height="34" rx="6" fill="#222226" stroke="#3f3f46" stroke-width="1.5" />
            <text x="270" y="141" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10" text-anchor="middle" font-weight="bold">X₂ ≤ 1.75</text>

            <!-- Branches from Internal 2 -->
            <path d="M 235 154 L 195 195" stroke="#52525b" stroke-width="1.5" />
            <text x="200" y="172" fill="#71717a" font-family="DM Mono, monospace" font-size="9">True</text>

            <path d="M 305 154 L 345 195" stroke="#52525b" stroke-width="1.5" />
            <text x="335" y="172" fill="#71717a" font-family="DM Mono, monospace" font-size="9">False</text>

            <!-- Leaf 2 & Leaf 3 -->
            <rect x="140" y="195" width="110" height="34" rx="6" fill="#141416" stroke="#27272a" stroke-width="1.5" />
            <text x="195" y="216" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">Daun 2: Kelas 1</text>

            <rect x="290" y="195" width="110" height="34" rx="6" fill="#141416" stroke="#27272a" stroke-width="1.5" />
            <text x="345" y="216" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">Daun 3: Kelas 2</text>

            <!-- Divider Line -->
            <line x1="420" y1="30" x2="420" y2="270" stroke="#27272a" stroke-width="1.5" stroke-dasharray="4 4" />

            <!-- Right Side: Feature Space Partition -->
            <text x="580" y="32" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="11" font-weight="bold" text-anchor="middle">PARTISI RUANG 2D ORTOGONAL</text>

            <!-- 2D Box -->
            <rect x="460" y="55" width="240" height="190" fill="#141416" stroke="#3f3f46" stroke-width="1.5" rx="4" />
            
            <!-- Split 1: X1 = 2.5 (Vertical Line at x = 460 + 80 = 540) -->
            <line x1="540" y1="55" x2="540" y2="245" stroke="#f4f4f5" stroke-width="2" />
            <text x="540" y="263" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="9.5" text-anchor="middle">X₁ = 2.5</text>

            <!-- Left Region: Daun 1 -->
            <text x="500" y="150" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10" text-anchor="middle" font-weight="bold">Daun 1</text>
            <text x="500" y="168" fill="#71717a" font-family="Plus Jakarta Sans, sans-serif" font-size="9" text-anchor="middle">(Kelas 0)</text>

            <!-- Split 2: X2 = 1.75 (Horizontal Line in right area from x=540 to 700 at y=150) -->
            <line x1="540" y1="150" x2="700" y2="150" stroke="#d4d4d8" stroke-width="2" stroke-dasharray="4 3" />
            <text x="710" y="154" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="9.5">X₂=1.75</text>

            <!-- Region: Daun 2 & Daun 3 -->
            <text x="620" y="200" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10" text-anchor="middle" font-weight="bold">Daun 2</text>
            <text x="620" y="216" fill="#71717a" font-family="Plus Jakarta Sans, sans-serif" font-size="9" text-anchor="middle">(Kelas 1)</text>

            <text x="620" y="95" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10" text-anchor="middle" font-weight="bold">Daun 3</text>
            <text x="620" y="111" fill="#71717a" font-family="Plus Jakarta Sans, sans-serif" font-size="9" text-anchor="middle">(Kelas 2)</text>
        </svg>`
    },

    // ----------------------------------------------------
    // BAB 4: NAIVE BAYES
    // ----------------------------------------------------
    "naive_bayes_gaussian": {
        title: "Kurva Distribusi Lonceng Gaussian & Ambang Batas Posterior",
        category: "PROBABILITAS & STATISTIKA",
        caption: "Setiap kelas memiliki kurva kepadatan probabilitas normal N(μ, σ²). Titik perpotongan kurva menjadi ambang batas penentu klasifikasi sampel data.",
        svg: `<svg viewBox="0 0 760 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="260" rx="12" fill="#18181b"/>
            <!-- Axis -->
            <line x1="60" y1="210" x2="700" y2="210" stroke="#3f3f46" stroke-width="1.5" />
            <text x="690" y="230" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10" text-anchor="end">Nilai Fitur X</text>
            <line x1="60" y1="210" x2="60" y2="40" stroke="#3f3f46" stroke-width="1.5" />
            <text x="75" y="55" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10">P(x | C)</text>

            <!-- Gaussian Bell 1: Kelas 0 (mu=240, sigma=50) -->
            <path d="M 100 210 Q 180 205 200 170 Q 240 60 260 60 Q 280 60 320 170 Q 340 205 420 210" fill="none" stroke="#d4d4d8" stroke-width="2.5" />
            <line x1="260" y1="60" x2="260" y2="210" stroke="#71717a" stroke-width="1" stroke-dasharray="4 3" />
            <text x="260" y="228" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">μ₀ (Rata-rata C₀)</text>
            <text x="260" y="50" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10.5" font-weight="bold" text-anchor="middle">Kelas 0: N(μ₀, σ₀²)</text>

            <!-- Gaussian Bell 2: Kelas 1 (mu=480, sigma=60) -->
            <path d="M 320 210 Q 400 205 430 160 Q 480 80 500 80 Q 520 80 570 160 Q 600 205 680 210" fill="none" stroke="#a1a1aa" stroke-width="2.5" />
            <line x1="500" y1="80" x2="500" y2="210" stroke="#71717a" stroke-width="1" stroke-dasharray="4 3" />
            <text x="500" y="228" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">μ₁ (Rata-rata C₁)</text>
            <text x="500" y="70" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10.5" font-weight="bold" text-anchor="middle">Kelas 1: N(μ₁, σ₁²)</text>

            <!-- Intersection Decision Boundary -->
            <line x1="375" y1="35" x2="375" y2="210" stroke="#f4f4f5" stroke-width="2" stroke-dasharray="6 4" />
            <rect x="315" y="25" width="120" height="24" rx="4" fill="#141416" stroke="#3f3f46" stroke-width="1" />
            <text x="375" y="41" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="9" text-anchor="middle" font-weight="bold">Ambang Batas</text>
        </svg>`
    },

    // ----------------------------------------------------
    // BAB 5: REGRESI LINEAR
    // ----------------------------------------------------
    "linear_regression_residuals": {
        title: "Garis Regresi OLS & Kuadrat Jarak Residual Galat (y - ŷ)",
        category: "MODEL REGRESI NUMERIK",
        caption: "Metode OLS menarik garis linier ŷ = wx + b dengan meminimalkan total kuadrat panjang garis vertikal putus-putus (residual) dari setiap titik sampel.",
        svg: `<svg viewBox="0 0 760 280" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="280" rx="12" fill="#18181b"/>
            <!-- Grid Background -->
            <line x1="70" y1="240" x2="710" y2="240" stroke="#3f3f46" stroke-width="1.5" />
            <line x1="70" y1="240" x2="70" y2="40" stroke="#3f3f46" stroke-width="1.5" />
            <text x="700" y="260" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10" text-anchor="end">Variabel Bebas X (Biaya Iklan)</text>
            <text x="85" y="55" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10">Target Y (Hasil Penjualan)</text>

            <!-- Best Fit Line: from (120, 210) to (650, 60) -->
            <line x1="100" y1="216" x2="660" y2="57" stroke="#f4f4f5" stroke-width="2.5" />
            <text x="560" y="70" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="11" font-weight="bold">ŷ = wx + b</text>

            <!-- Data points and vertical residual lines -->
            <!-- P1: x=180, actual y=150, line y=193. Residual = -43 -->
            <line x1="180" y1="150" x2="180" y2="193" stroke="#71717a" stroke-width="1.5" stroke-dasharray="3 3" />
            <circle cx="180" cy="150" r="6" fill="#d4d4d8" stroke="#18181b" stroke-width="1.5" />

            <!-- P2: x=270, actual y=210, line y=167. Residual = +43 -->
            <line x1="270" y1="210" x2="270" y2="167" stroke="#71717a" stroke-width="1.5" stroke-dasharray="3 3" />
            <circle cx="270" cy="210" r="6" fill="#d4d4d8" stroke="#18181b" stroke-width="1.5" />

            <!-- P3: x=380, actual y=105, line y=136. Residual = -31 -->
            <line x1="380" y1="105" x2="380" y2="136" stroke="#71717a" stroke-width="1.5" stroke-dasharray="3 3" />
            <circle cx="380" cy="105" r="6" fill="#d4d4d8" stroke="#18181b" stroke-width="1.5" />

            <!-- P4: x=460, actual y=155, line y=113. Residual = +42 -->
            <line x1="460" y1="155" x2="460" y2="113" stroke="#71717a" stroke-width="1.5" stroke-dasharray="3 3" />
            <circle cx="460" cy="155" r="6" fill="#d4d4d8" stroke="#18181b" stroke-width="1.5" />

            <!-- P5: x=560, actual y=65, line y=85. Residual = -20 -->
            <line x1="560" y1="65" x2="560" y2="85" stroke="#71717a" stroke-width="1.5" stroke-dasharray="3 3" />
            <circle cx="560" cy="65" r="6" fill="#d4d4d8" stroke="#18181b" stroke-width="1.5" />

            <!-- Highlight Callout on P3 -->
            <rect x="395" y="105" width="130" height="40" rx="6" fill="#141416" stroke="#3f3f46" stroke-width="1" />
            <text x="405" y="122" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="9" font-weight="bold">Residual eᵢ = yᵢ - ŷᵢ</text>
            <text x="405" y="137" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="8.5">Minimalkan: Σ (eᵢ)²</text>
        </svg>`
    },

    // ----------------------------------------------------
    // BAB 6: REGRESI LOGISTIK
    // ----------------------------------------------------
    "logistic_regression_sigmoid": {
        title: "Kurva Sigmoid S & Ambang Batas Probabilitas Klasifikasi",
        category: "KLASIFIKASI PROBABILITAS",
        caption: "Fungsi Sigmoid mengompresi sembarang kombinasi linier z = w^T x + b menjadi rentang probabilitas [0, 1]. Ambang batas 0.5 menjadi garis pemisah prediksi kelas.",
        svg: `<svg viewBox="0 0 760 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="260" rx="12" fill="#18181b"/>
            <!-- Axes -->
            <line x1="80" y1="210" x2="680" y2="210" stroke="#3f3f46" stroke-width="1.5" />
            <text x="670" y="230" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10" text-anchor="end">Logit z = wᵀx + b</text>
            
            <line x1="380" y1="210" x2="380" y2="35" stroke="#3f3f46" stroke-width="1.5" />
            <text x="390" y="45" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10">P(y=1 | x)</text>

            <!-- Probability Horizontal Lines: 0, 0.5, 1.0 -->
            <line x1="80" y1="50" x2="680" y2="50" stroke="#27272a" stroke-width="1" stroke-dasharray="3 3" />
            <text x="65" y="54" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10">1.0</text>

            <line x1="80" y1="130" x2="680" y2="130" stroke="#52525b" stroke-width="1.5" stroke-dasharray="5 4" />
            <text x="65" y="134" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10" font-weight="bold">0.5</text>
            <text x="675" y="125" fill="#71717a" font-family="DM Mono, monospace" font-size="9" text-anchor="end">Ambang Batas Keputusan</text>

            <!-- Sigmoid Curve S -->
            <!-- Points: (-6 -> 0.002, -4 -> 0.018, -2 -> 0.119, 0 -> 0.5, 2 -> 0.88, 4 -> 0.98, 6 -> 0.998) -->
            <path d="M 120 208 C 220 208, 300 200, 380 130 C 460 60, 540 52, 640 52" fill="none" stroke="#f4f4f5" stroke-width="3" />

            <!-- Point at (0, 0.5) -->
            <circle cx="380" cy="130" r="6" fill="#f4f4f5" stroke="#18181b" stroke-width="2"/>
            <text x="380" y="228" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">z = 0</text>

            <!-- Region Callouts -->
            <rect x="150" y="145" width="160" height="42" rx="6" fill="#141416" stroke="#27272a" stroke-width="1" />
            <text x="230" y="163" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="9.5" text-anchor="middle" font-weight="bold">z &lt; 0 → P &lt; 0.5</text>
            <text x="230" y="178" fill="#71717a" font-family="Plus Jakarta Sans, sans-serif" font-size="9" text-anchor="middle">Prediksi: Kelas 0 (Negatif)</text>

            <rect x="450" y="70" width="160" height="42" rx="6" fill="#141416" stroke="#27272a" stroke-width="1" />
            <text x="530" y="88" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="9.5" text-anchor="middle" font-weight="bold">z &gt; 0 → P &gt; 0.5</text>
            <text x="530" y="103" fill="#71717a" font-family="Plus Jakarta Sans, sans-serif" font-size="9" text-anchor="middle">Prediksi: Kelas 1 (Positif)</text>
        </svg>`
    },

    // ----------------------------------------------------
    // BAB 7: EVALUASI KLASIFIKASI
    // ----------------------------------------------------
    "confusion_matrix_grid": {
        title: "Peta Kuadran Confusion Matrix: Tipe I Error vs Tipe II Error",
        category: "METRIK EVALUASI",
        caption: "Tabel perbandingan antara tebakan model dengan data riil. FP disebut False Alarm (Type I Error), sedangkan FN disebut Missed Detection (Type II Error).",
        svg: `<svg viewBox="0 0 760 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="300" rx="12" fill="#18181b"/>
            
            <!-- Headers -->
            <text x="430" y="32" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="11" font-weight="bold" text-anchor="middle">KELAS HASIL PREDIKSI MODEL</text>
            <text x="320" y="55" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10.5" text-anchor="middle">Prediksi Positif (1)</text>
            <text x="540" y="55" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10.5" text-anchor="middle">Prediksi Negatif (0)</text>

            <!-- Actual Row Labels -->
            <text x="60" y="125" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10.5" font-weight="bold">Aktual Positif (1)</text>
            <text x="60" y="215" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10.5" font-weight="bold">Aktual Negatif (0)</text>

            <!-- Top-Left: True Positive (TP) -->
            <rect x="220" y="70" width="200" height="85" rx="8" fill="#1c1c20" stroke="#3f3f46" stroke-width="1.5" />
            <text x="240" y="95" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="12" font-weight="bold">True Positive (TP)</text>
            <text x="240" y="115" fill="#d4d4d8" font-family="Plus Jakarta Sans, sans-serif" font-size="10">Benar deteksi kondisi positif.</text>
            <text x="240" y="133" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="9.5">Contoh: Pasien sakit divonis sakit</text>

            <!-- Top-Right: False Negative (FN) -->
            <rect x="440" y="70" width="200" height="85" rx="8" fill="#141416" stroke="#71717a" stroke-width="1.5" />
            <text x="460" y="95" fill="#e4e4e7" font-family="DM Mono, monospace" font-size="12" font-weight="bold">False Negative (FN)</text>
            <text x="460" y="115" fill="#d4d4d8" font-family="Plus Jakarta Sans, sans-serif" font-size="10">Type II Error (Luput Deteksi)</text>
            <text x="460" y="133" fill="#71717a" font-family="DM Mono, monospace" font-size="9.5">Bahaya: Sakit divonis sehat</text>

            <!-- Bottom-Left: False Positive (FP) -->
            <rect x="220" y="165" width="200" height="85" rx="8" fill="#141416" stroke="#71717a" stroke-width="1.5" />
            <text x="240" y="190" fill="#e4e4e7" font-family="DM Mono, monospace" font-size="12" font-weight="bold">False Positive (FP)</text>
            <text x="240" y="210" fill="#d4d4d8" font-family="Plus Jakarta Sans, sans-serif" font-size="10">Type I Error (Alarm Palsu)</text>
            <text x="240" y="228" fill="#71717a" font-family="DM Mono, monospace" font-size="9.5">Kasus: Sehat divonis sakit</text>

            <!-- Bottom-Right: True Negative (TN) -->
            <rect x="440" y="165" width="200" height="85" rx="8" fill="#1c1c20" stroke="#3f3f46" stroke-width="1.5" />
            <text x="460" y="190" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="12" font-weight="bold">True Negative (TN)</text>
            <text x="460" y="210" fill="#d4d4d8" font-family="Plus Jakarta Sans, sans-serif" font-size="10">Benar tolak kondisi negatif.</text>
            <text x="460" y="228" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="9.5">Contoh: Sehat divonis sehat</text>

            <!-- Precision & Recall Arrows -->
            <text x="320" y="275" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">Precision = TP / (TP + FP) ↓</text>
            <text x="690" y="115" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10" text-anchor="middle" transform="rotate(90 690 115)">Recall = TP / (TP + FN) →</text>
        </svg>`
    },

    // ----------------------------------------------------
    // BAB 9: K-MEANS
    // ----------------------------------------------------
    "kmeans_iterations": {
        title: "Tahapan Siklus Iterasi Algoritma Lloyd K-Means",
        category: "CLUSTERING UNSUPERVISED",
        caption: "Dari inisialisasi centroid acak, penetapan anggota berdasarkan jarak Euclidean terdekat, hingga centroid berpindah ke rata-rata baru sampai konvergen.",
        svg: `<svg viewBox="0 0 760 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="260" rx="12" fill="#18181b"/>
            
            <!-- Panel 1: Inisialisasi Centroid -->
            <g transform="translate(30, 25)">
                <rect width="155" height="190" rx="8" fill="#141416" stroke="#27272a" stroke-width="1.5"/>
                <text x="77" y="24" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10" font-weight="bold" text-anchor="middle">1. INISIALISASI</text>
                <!-- Unassigned dots -->
                <circle cx="40" cy="70" r="4" fill="#71717a"/>
                <circle cx="55" cy="85" r="4" fill="#71717a"/>
                <circle cx="35" cy="100" r="4" fill="#71717a"/>
                <circle cx="110" cy="130" r="4" fill="#71717a"/>
                <circle cx="125" cy="150" r="4" fill="#71717a"/>
                <circle cx="100" cy="160" r="4" fill="#71717a"/>
                <!-- Centroids C1, C2 (Stars/Crosses) -->
                <polygon points="50,45 53,52 61,53 55,58 57,66 50,62 43,66 45,58 39,53 47,52" fill="#f4f4f5"/>
                <polygon points="120,95 123,102 131,103 125,108 127,116 120,112 113,116 115,108 109,103 117,102" fill="#d4d4d8"/>
                <text x="77" y="180" fill="#a1a1aa" font-family="Plus Jakarta Sans, sans-serif" font-size="9" text-anchor="middle">Pilih K titik centroid</text>
            </g>

            <!-- Arrow 1 -->
            <text x="200" y="125" fill="#52525b" font-family="DM Mono, monospace" font-size="14">→</text>

            <!-- Panel 2: Assignment -->
            <g transform="translate(215, 25)">
                <rect width="155" height="190" rx="8" fill="#141416" stroke="#27272a" stroke-width="1.5"/>
                <text x="77" y="24" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10" font-weight="bold" text-anchor="middle">2. PENETAPAN</text>
                <!-- Group 1 dots (White) -->
                <circle cx="40" cy="70" r="4" fill="#f4f4f5"/>
                <circle cx="55" cy="85" r="4" fill="#f4f4f5"/>
                <circle cx="35" cy="100" r="4" fill="#f4f4f5"/>
                <!-- Group 2 dots (Zinc) -->
                <circle cx="110" cy="130" r="4" fill="#a1a1aa"/>
                <circle cx="125" cy="150" r="4" fill="#a1a1aa"/>
                <circle cx="100" cy="160" r="4" fill="#a1a1aa"/>
                <!-- Centroids with distance links -->
                <line x1="50" y1="55" x2="40" y2="70" stroke="#52525b" stroke-dasharray="2 2"/>
                <line x1="120" y1="105" x2="110" y2="130" stroke="#52525b" stroke-dasharray="2 2"/>
                <polygon points="50,45 53,52 61,53 55,58 57,66 50,62 43,66 45,58 39,53 47,52" fill="#f4f4f5"/>
                <polygon points="120,95 123,102 131,103 125,108 127,116 120,112 113,116 115,108 109,103 117,102" fill="#d4d4d8"/>
                <text x="77" y="180" fill="#a1a1aa" font-family="Plus Jakarta Sans, sans-serif" font-size="9" text-anchor="middle">Gabung ke centroid terdekat</text>
            </g>

            <!-- Arrow 2 -->
            <text x="385" y="125" fill="#52525b" font-family="DM Mono, monospace" font-size="14">→</text>

            <!-- Panel 3: Update Centroid -->
            <g transform="translate(400, 25)">
                <rect width="155" height="190" rx="8" fill="#141416" stroke="#27272a" stroke-width="1.5"/>
                <text x="77" y="24" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10" font-weight="bold" text-anchor="middle">3. PEMBARUAN</text>
                <!-- Centroid shifts to center of mass -->
                <circle cx="40" cy="70" r="4" fill="#f4f4f5"/>
                <circle cx="55" cy="85" r="4" fill="#f4f4f5"/>
                <circle cx="35" cy="100" r="4" fill="#f4f4f5"/>
                <polygon points="43,75 46,82 54,83 48,88 50,96 43,92 36,96 38,88 32,83 40,82" fill="#f4f4f5"/>
                <text x="43" y="105" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="8">μ_baru</text>

                <circle cx="110" cy="130" r="4" fill="#a1a1aa"/>
                <circle cx="125" cy="150" r="4" fill="#a1a1aa"/>
                <circle cx="100" cy="160" r="4" fill="#a1a1aa"/>
                <polygon points="112,137 115,144 123,145 117,150 119,158 112,154 105,158 107,150 101,145 109,144" fill="#d4d4d8"/>
                <text x="77" y="180" fill="#a1a1aa" font-family="Plus Jakarta Sans, sans-serif" font-size="9" text-anchor="middle">Hitung titik rata-rata baru</text>
            </g>

            <!-- Arrow 3 -->
            <text x="570" y="125" fill="#52525b" font-family="DM Mono, monospace" font-size="14">→</text>

            <!-- Panel 4: Convergence -->
            <g transform="translate(585, 25)">
                <rect width="145" height="190" rx="8" fill="#141416" stroke="#3f3f46" stroke-width="1.5"/>
                <text x="72" y="24" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10" font-weight="bold" text-anchor="middle">4. KONVERGEN</text>
                <circle cx="43" cy="85" r="40" fill="none" stroke="#27272a" stroke-dasharray="3 3"/>
                <circle cx="112" cy="147" r="40" fill="none" stroke="#27272a" stroke-dasharray="3 3"/>
                <text x="72" y="105" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="10" font-weight="bold" text-anchor="middle">Stabil</text>
                <text x="72" y="180" fill="#a1a1aa" font-family="Plus Jakarta Sans, sans-serif" font-size="9" text-anchor="middle">Centroid berhenti bergeser</text>
            </g>
        </svg>`
    },

    // ----------------------------------------------------
    // BAB 10: DENDROGRAM HIERARCHICAL
    // ----------------------------------------------------
    "dendrogram_hierarchy": {
        title: "Pohon Silsilah Dendrogram & Ambang Batas Jarak Pemotongan",
        category: "HIERARCHICAL CLUSTERING",
        caption: "Penggabungan pasangan klaster terdekat dicatat sebagai garis horizontal setinggi nilai jarak pertemuannya. Memotong secara horizontal menentukan jumlah K klaster akhir.",
        svg: `<svg viewBox="0 0 760 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <rect width="760" height="260" rx="12" fill="#18181b"/>
            <!-- Vertical Distance Axis -->
            <line x1="80" y1="210" x2="80" y2="40" stroke="#3f3f46" stroke-width="1.5" />
            <text x="50" y="125" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="10" transform="rotate(-90 50 125)" text-anchor="middle">Jarak Antar Klaster (d)</text>
            <text x="70" y="50" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="9" text-anchor="end">4.0</text>
            <text x="70" y="100" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="9" text-anchor="end">2.5</text>
            <text x="70" y="150" fill="#a1a1aa" font-family="DM Mono, monospace" font-size="9" text-anchor="end">1.2</text>

            <!-- Bottom Data Points: S1, S2, S3, S4, S5 -->
            <line x1="80" y1="210" x2="680" y2="210" stroke="#3f3f46" stroke-width="1.5" />
            <text x="160" y="228" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">Sampel 1</text>
            <text x="240" y="228" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">Sampel 2</text>
            <text x="360" y="228" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">Sampel 3</text>
            <text x="460" y="228" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">Sampel 4</text>
            <text x="560" y="228" fill="#d4d4d8" font-family="DM Mono, monospace" font-size="10" text-anchor="middle">Sampel 5</text>

            <!-- Dendrogram Tree Lines -->
            <!-- Merger 1: S1 and S2 at d=1.2 (y=150) -->
            <path d="M 160 210 L 160 150 L 240 150 L 240 210" fill="none" stroke="#d4d4d8" stroke-width="2"/>

            <!-- Merger 2: S4 and S5 at d=1.0 (y=160) -->
            <path d="M 460 210 L 460 160 L 560 160 L 560 210" fill="none" stroke="#a1a1aa" stroke-width="2"/>

            <!-- Merger 3: (S4,S5) and S3 at d=2.2 (y=110) -->
            <path d="M 360 210 L 360 110 L 510 110 L 510 160" fill="none" stroke="#a1a1aa" stroke-width="2"/>

            <!-- Merger 4: (S1,S2) and (S3,S4,S5) at d=3.8 (y=60) -->
            <path d="M 200 150 L 200 60 L 435 60 L 435 110" fill="none" stroke="#f4f4f5" stroke-width="2.5"/>

            <!-- Horizontal Cut Threshold at d = 2.0 (y=125) -->
            <line x1="90" y1="125" x2="680" y2="125" stroke="#71717a" stroke-width="2" stroke-dasharray="6 4"/>
            <rect x="580" y="110" width="115" height="26" rx="4" fill="#141416" stroke="#3f3f46" stroke-width="1"/>
            <text x="637" y="127" fill="#f4f4f5" font-family="DM Mono, monospace" font-size="9" text-anchor="middle" font-weight="bold">Cut-off Line: K=2</text>
        </svg>`
    }
};
