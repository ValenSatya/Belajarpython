/**
 * DATA KURIKULUM LENGKAP LKS AI ACADEMY (STANDAR NASIONAL LKS AI)
 * 10 Modul Pembelajaran Berjenjang (Bab -> Sub-Bab), Teori Formal, Formulasi KaTeX,
 * Simulasi Hitung Manual dengan Angka Riil, Tips Juri LKS, dan Bedah Sintaks NumPy.
 */

const COURSE_MODULES = [
  {
    "id": "mod-1",
    "title": "Bab 1: Fondasi Machine Learning & Prapemrosesan Data",
    "icon": "01",
    "lessons": [
      {
        "id": "1-1",
        "title": "1.1 Pengenalan Machine Learning & Paradigma Belajar",
        "readingTime": "10 menit",
        "content": "\n### 1. Apa itu Machine Learning? Filosofi & Definisi Formal\n\nSecara sederhana, **Machine Learning (ML)** adalah cabang dari kecerdasan buatan (*Artificial Intelligence*) yang memberikan komputer kemampuan untuk belajar dari data dan pengalaman masa lalu tanpa perlu diprogram aturan logikanya secara eksplisit satu per satu.\n\nDalam pemrograman konvensional, seorang insinyur perangkat lunak harus menulis ribuan baris aturan kondisi jika-maka (`if-else`) secara manual:\n$$\\text{Data} + \\text{Aturan Manual (Rules)} \\xrightarrow{\\text{Program Tradisional}} \\text{Jawaban (Output)}$$\n\nPendekatan manual ini mustahil digunakan pada masalah dunia nyata yang kompleks, seperti membedakan wajah seseorang, mendiagnosis penyakit dari citra medis, atau memprediksi fluktuasi harga pasar. Pada masalah-masalah tersebut, pola datanya terlalu rumit untuk dirumuskan ke dalam kode `if-else`.\n\nMachine Learning membalik paradigma tersebut secara fundamental:\n$$\\text{Data} + \\text{Jawaban Asli (Ground Truth)} \\xrightarrow{\\text{Algoritma ML}} \\text{Model (Aturan Matematis Mandiri)}$$\n\nKomputer diberikan ratusan hingga jutaan contoh data beserta hasil sebenarnya, lalu algoritma matematika akan **mengekstrak pola dan fungsi aproksimasi secara otomatis**.\n\n---\n\n### 2. Definisi Formal: Konsep Tugas (T), Performa (P), & Pengalaman (E)\n\nSecara akademis dan standar kompetisi rekayasa AI internasional, definisi formal Machine Learning dirumuskan oleh Prof. Tom Mitchell (1997):\n\n> \"Sebuah program komputer dikatakan belajar dari **Pengalaman** $E$ berkenaan dengan suatu **Tugas** $T$ dan ukuran **Performa** $P$, jika performanya pada tugas $T$, sebagaimana diukur oleh $P$, meningkat seiring dengan bertambahnya pengalaman $E$.\"\n\nSecara matematis, relasi ini dapat dituliskan sebagai:\n$$P(T) \\uparrow \\quad \\text{seiring bertambahnya pengalaman} \\quad E$$\n\nSebagai contoh dalam konteks LKS AI (Studi Kasus Deteksi Penyakit Diabetes):\n- **Tugas ($T$):** Memprediksi apakah seorang pasien menderita diabetes ($1$) atau sehat ($0$) berdasarkan rekam medis.\n- **Pengalaman ($E$):** Dataset historis ribuan pasien berisi kadar glukosa, insulin, BMI, dan usia beserta diagnosis aslinya.\n- **Ukuran Performa ($P$):** Skor F1-Score atau akurasi klasifikasi pada data uji pasien baru.\n\n---\n\n### 3. Taksonomi Paradigma Pembelajaran Mesin\n\nDalam silabus pemodelan LKS AI, Machine Learning dikelompokkan ke dalam dua paradigma utama:\n\n#### 1. Pembelajaran Terbimbing (Supervised Learning)\nDataset pelatihan dilengkapi dengan kunci jawaban atau label target yang benar (**Ground Truth**):\n$$\\mathcal{D} = \\{(\\mathbf{x}_i, y_i)\\}_{i=1}^N$$\nTujuan model adalah mempelajari fungsi pemetaan matematis $f: \\mathcal{X} \\to \\mathcal{Y}$ sehingga $\\hat{y} = f(\\mathbf{x})$ sedekat mungkin dengan $y$ sebenarnya.\n\nSupervised Learning terbagi menjadi dua sub-kategori:\n- **Klasifikasi:** Nilai target $y$ bersifat diskrit / kategori kualitatif.\n  - *Contoh:* Memprediksi jenis bunga Iris (Setosa / Versicolor / Virginica), deteksi keaslian uang kertas (Asli / Palsu), status diabetes.\n  - *Algoritma:* K-Nearest Neighbors (KNN), Decision Tree, Gaussian Naive Bayes, Regresi Logistik.\n- **Regresi:** Nilai target $y$ bersifat kontinu / numerik riil ($\\mathbb{R}$).\n  - *Contoh:* Memprediksi angka penjualan berdasarkan anggaran iklan TV/Radio, memprediksi harga properti, estimasi suhu.\n  - *Algoritma:* Regresi Linier (Ordinary Least Squares & Gradient Descent).\n\n#### 2. Pembelajaran Mandiri (Unsupervised Learning)\nDataset pelatihan **tidak memiliki label target sama sekali** ($y$ tidak tersedia):\n$$\\mathcal{D} = \\{\\mathbf{x}_i\\}_{i=1}^N$$\nModel dibiarkan bekerja secara mandiri mencari struktur laten, pola keteraturan, kedekatan spasial, atau pengelompokan alami yang tersembunyi di balik data.\n\n- **Klastering (Clustering):** Mengelompokkan observasi yang memiliki karakteristik mirip ke dalam satu kelompok (*cluster*).\n  - *Contoh:* Segmentasi profil perilaku belanja pelanggan mal (*Mall Customers*), pengelompokan dokumen berita.\n  - *Algoritma:* K-Means Clustering (Lloyd's Algorithm), Hierarchical Agglomerative Clustering (Dendrogram).\n\n---\n\n### 4. Representasi Data Matematis: Skalar, Vektor, & Matriks\n\nSeluruh operasi komputasi di Machine Learning pada dasarnya adalah komputasi aljabar linier pada larik numerik NumPy:\n\n1. **Vektor Sampel Tunggal ($\\mathbf{x}_i$):**\n   Satu baris data nasabah atau bunga direpresentasikan sebagai vektor kolom di ruang hiperspace berdimensi $m$:\n   $$\\mathbf{x}_i = \\begin{bmatrix} x_{i1} \\\\ x_{i2} \\\\ \\vdots \\\\ x_{im} \\end{bmatrix} \\in \\mathbb{R}^m$$\n\n2. **Matriks Fitur Keseluruhan ($\\mathbf{X}$):**\n   Kumpulan seluruh $N$ observasi disusun menjadi matriks dua dimensi berukuran $N \\times m$:\n   $$\\mathbf{X} = \\begin{bmatrix} x_{11} & x_{12} & \\cdots & x_{1m} \\\\ x_{21} & x_{22} & \\cdots & x_{2m} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ x_{N1} & x_{N2} & \\cdots & x_{Nm} \\end{bmatrix} \\in \\mathbb{R}^{N \\times m}$$\n\n3. **Vektor Target ($\\mathbf{y}$):**\n   Nilai label kebenaran disimpan dalam vektor 1D berukuran $N$:\n   $$\\mathbf{y} = [y_1, y_2, \\dots, y_N]^T \\in \\mathbb{R}^N$$\n\n---\n\n### 5. Konsep Parameter vs Hiperparameter (Pembedaan Krusial)\n\n> PERINGATAN UJIAN LKS:\n> Juri kompetisi LKS AI sangat sering menguji pemahaman peserta mengenai perbedaan mendasar antara **Parameter** dan **Hiperparameter**. Jangan sampai tertukar!\n\n| Aspek | Parameter Model | Hiperparameter Model |\n|---|---|---|\n| **Definisi** | Nilai internal yang dihitung & diperbarui sendiri oleh algoritma dari data | Nilai setelan arsitektur yang wajib ditentukan manual oleh manusia |\n| **Kapan Ditentukan?** | Dipelajari secara otomatis selama fase training (`.fit()`) | Ditentukan sebelum fase pelatihan dimulai |\n| **Contoh Nyata** | Bobot $w$ dan bias $b$ pada Regresi Linier, Centroid $\\mu$ pada K-Means | Nilai tetangga $K$ pada KNN, Laju Belajar $\\alpha$, Max Depth pada Decision Tree |\n| **Metode Penentuan** | Optimasi analitis OLS atau algoritma Gradient Descent | Teknik tuning coba-coba terencana, Grid Search, atau Elbow Method |\n            "
      },
      {
        "id": "1-2",
        "title": "1.2 Alur Lengkap Pemodelan Machine Learning (ML Pipeline)",
        "readingTime": "11 menit",
        "content": "\n### 1. Filosofi Alur Kerja Pemodelan (The Machine Learning Lifecycle)\n\nMembangun solusi AI di ajang LKS bukanlah sekadar menulis satu baris pemanggilan algoritma. Pemodelan Machine Learning adalah sebuah **rantai proses saintifik yang berurutan (pipeline)**. Jika salah satu mata rantai di bagian awal cacat (misal terjadi kebocoran data saat normalisasi), maka seluruh hasil prediksi di ujung akhir akan runtuh dan tidak valid.\n\nSecara umum, siklus pemodelan standar kompetisi LKS AI terbagi menjadi 6 tahapan inti yang saling terhubung erat.\n\n---\n\n### 2. Bedah 6 Tahapan Inti Pipeline Pemodelan\n\n#### Tahap 1: Problem Understanding & Data Ingestion\n- Membaca dan membedah berkas data mentah (CSV/Excel) ke dalam matriks NumPy.\n- Memeriksa bentuk struktur data (`X.shape`), jumlah observasi $N$, dan dimensi fitur $m$.\n- Menentukan sifat masalah secara presisi: Apakah ini kasus **Supervised Classification** (prediksi kelas biner/multi-kelas), **Supervised Regression** (estimasi nilai angka kontinu), atau **Unsupervised Clustering** (segmentasi tanpa label)?\n\n#### Tahap 2: Pemisahan Data Latih & Data Uji (Train-Test Split)\n- **Kaidah Emas LKS AI:** Pemisahan dataset menjadi Data Latih ($X_{\\text{train}}, y_{\\text{train}}$) dan Data Uji ($X_{\\text{test}}, y_{\\text{test}}$) **wajib dieksekusi sebelum melakukan transformasi atau penskalaan apapun**.\n- Data uji diisolasi dan \"disimpan di dalam brankas\", tidak boleh dilihat atau dipelajari sedikitpun oleh model sebelum tahap evaluasi akhir.\n\n#### Tahap 3: Prapemrosesan & Penskalaan Fitur (Feature Scaling)\n- Menyamakan skala angka antar-kolom agar fitur berangka besar (seperti pendapatan jutaan) tidak mendominasi fitur berangka kecil (seperti usia).\n- Menggunakan **Standardisasi Z-Score** atau **Normalisasi Min-Max**.\n- **Wajib Bebas Data Leakage:** Nilai rata-rata ($\\mu$) dan standar deviasi ($\\sigma$) hanya dihitung dari data latih (`scaler.fit(X_train)`), kemudian formula yang sama diterapkan ke data latih dan data uji (`scaler.transform`).\n\n#### Tahap 4: Pelatihan Model (Model Training / `.fit()`)\n- Menginisialisasi kelas algoritma yang sesuai (misal `KNNManual`, `LinearRegressionGD`, atau `DecisionTreeManual`).\n- Menjalankan proses optimasi matematika: algoritma membaca data latih untuk menghitung dan memperbarui nilai parameter internalnya ($w, b, \\mu$).\n\n#### Tahap 5: Inferensi & Prediksi Data Baru (`.predict()`)\n- Memasukkan data uji baru $X_{\\text{test}}$ (yang sudah diskalakan dengan parameter scaler data latih) ke fungsi prediksi model.\n- Model mengeluarkan vektor tebakan akhir: $\\mathbf{\\hat{y}} = [\\hat{y}_1, \\hat{y}_2, \\dots, \\hat{y}_{N_{\\text{test}}}]^T$.\n\n#### Tahap 6: Evaluasi Kinerja Objektif (Model Evaluation)\n- Membandingkan vektor tebakan model $\\mathbf{\\hat{y}}$ terhadap kenyataan sebenarnya $\\mathbf{y}_{\\text{test}}$.\n- Menghitung metrik penilaian ilmiah:\n  - Kasus Klasifikasi: Confusion Matrix, Presisi, Recall, dan F1-Score.\n  - Kasus Regresi: Mean Absolute Error (MAE), Mean Squared Error (MSE), dan $R^2$ Score.\n  - Kasus Klastering: Inertia (WCSS) dan Silhouette Score.\n\n---\n\n### 3. Masalah Utama Pemodelan: Trade-Off Bias vs Variansi\n\nDalam dunia pemodelan, performa model selalu berhadapan dengan dua jenis kesalahan (*errors*):\n\n1. **Bias (Kekakuan Model / Underfitting):**\n   - Terjadi ketika model terlalu sederhana (misalnya memaksakan garis lurus regresi pada data yang hubungannya melengkung rumit).\n   - Gejala: Akurasi buruk pada data latih dan juga buruk pada data uji.\n   - Solusi: Tingkatkan kapasitas model, tambah fitur pendukung baru, atau kurangi batasan model.\n\n2. **Variansi (Kerapuhan Generalisasi / Overfitting):**\n   - Terjadi ketika model terlalu rumit dan menghafal detail bising (*noise*) pada data latih.\n   - Gejala: Akurasi data latih sangat tinggi ($99\\% - 100\\%$), namun akurasi anjlok saat diuji dengan data baru ($60\\%$).\n   - Solusi: Lakukan penyederhanaan model (misal *pruning* pada Decision Tree, naikkan nilai $K$ pada KNN), lakukan seleksi fitur, atau kumpulkan lebih banyak data latih.\n\n> TIPS JUARA LKS AI:\n> Selalu bandingkan performa model pada **Data Latih** vs **Data Uji**. Jika nilai evaluasi pada data latih dan data uji seimbang dan sama-sama tinggi, model Anda berada pada kondisi optimal (**Good Fit** / Generalisasi Kuat).\n            "
      },
      {
        "id": "1-3",
        "title": "1.3 Pembagian Dataset & Bahaya Fatal Data Leakage",
        "readingTime": "10 menit",
        "content": "\n### 1. Filosofi Pembagian Dataset: Generalisasi vs Memorization\n\n#### Analogi Sederhana: Belajar Kisi-Kisi vs Soal Ujian Asli\nBayangkan Anda sedang melatih seorang siswa untuk mengikuti lomba olimpiade sains. Jika Anda memberikan lembar soal ujian asli saat latihan di kelas, siswa tersebut bisa dengan mudah mendapatkan nilai sempurna 100 karena dia hanya **menghafal** soal tersebut (*memorization*). Namun ketika hari lomba tiba dan soalnya sedikit dimodifikasi, siswa tersebut akan panik dan nilainya anjlok!\n\nDalam Machine Learning, konsepnya persis sama:\n- **Data Latih (Training Set):** Buku panduan dan contoh soal untuk bahan belajar model (`.fit()`).\n- **Data Uji (Test Set):** Lembar ujian sesungguhnya yang disegel rapat dan hanya dibuka saat evaluasi akhir (`.predict()`).\n- **Tujuan Akhir:** Model mampu **menggeneralisasi** pola, yaitu tetap cerdas dan akurat saat menjawab data baru yang belum pernah dilihat sebelumnya (*unseen data*).\n\n---\n\n### 2. Bahaya Fatal: Data Leakage (Kebocoran Data)\n\n> JEBAKAN UJIAN LKS AI:\n> Kesalahan paling fatal yang sering menyebabkan peserta LKS AI tereliminasi atau mendapat pengurangan nilai drastis dari dewan juri adalah **Data Leakage (Kebocoran Informasi)** pada tahap prapemrosesan data.\n\n#### Apa itu Data Leakage? (Analogi Mencuri Dengar Kunci Jawaban)\nData Leakage terjadi ketika informasi statistik dari data uji (*test set*) secara tidak sengaja merembes atau digunakan dalam proses pelatihan model. Ini persis seperti seorang siswa yang mencuri dengar rata-rata nilai dan kisi-kisi soal ujian sebelum ujian resmi dimulai. Nilai evaluasinya tampak tinggi, tetapi itu adalah performa palsu (*optimistic bias*).\n\n**Skenario Pelanggaran yang Kerap Dilakukan Pemula:**\n1. Menggabungkan seluruh data mentah (misal 1.000 baris).\n2. Menghitung rata-rata ($\\mu$) dan standar deviasi ($\\sigma$) dari **seluruh 1.000 baris** sekaligus untuk melakukan scaling.\n3. Baru kemudian membagi data menjadi *train set* dan *test set*.\n\n**Mengapa ini adalah Pelanggaran Ilmiah?**\nKetika Anda menghitung $\\mu$ dari 1.000 baris, nilai rata-rata tersebut telah dipengaruhi oleh data uji. Model Anda kini telah \"mencuri dengar\" distribusi data uji sebelum ujian dimulai. Hasil metrik evaluasi pada *test set* menjadi bias optimistik palsu.\n\n**Prosedur Baku Standar LKS AI:**\n1. Lakukan **Split Data terlebih dahulu** menjadi $X_{\\text{train}}, X_{\\text{test}}, y_{\\text{train}}, y_{\\text{test}}$.\n2. Hitung statistik transformasi (seperti $\\mu$, $\\sigma$, $x_{\\min}$, $x_{\\max}$) **hanya dan secara eksklusif** dari $X_{\\text{train}}$ (`scaler.fit(X_train)`).\n3. Terapkan transformasi tersebut ke $X_{\\text{train}}$ dan $X_{\\text{test}}$ (`scaler.transform(X_train)` dan `scaler.transform(X_test)`).\n\n---\n\n### 3. Formulasi Matematika & Simulasi Sampling Acak\n\nPembagian dataset secara acak tanpa pengembalian (*uniform random sampling without replacement*) dilakukan dengan memetakan indeks observasi $\\{0, 1, 2, \\dots, N-1\\}$ ke dalam permutasi acak:\n\n$$\\pi = \\text{Permutasi}(\\{0, 1, \\dots, N-1\\})$$\n\n#### Bedah Simbol Rumus:\n- $N$: Total seluruh baris data yang kita miliki.\n- $r_{\\text{test}}$: Rasio data uji (umumnya $0.20$ untuk 20% data uji, atau $0.30$ untuk 30%).\n- $N_{\\text{test}} = \\text{round}(N \\times r_{\\text{test}})$: Jumlah pasti baris data yang dialokasikan untuk ujian.\n- $N_{\\text{train}} = N - N_{\\text{test}}$: Sisa baris data yang dialokasikan untuk bahan latihan.\n- $I_{\\text{train}} \\cap I_{\\text{test}} = \\emptyset$: Simbol irisan kosong, artinya tidak boleh ada satu pun data latihan yang merangkap menjadi data uji!\n\nIndeks data latihan dan data uji dipartisi secara ortogonal:\n\n$$I_{\\text{test}} = \\{\\pi_0, \\pi_1, \\dots, \\pi_{N_{\\text{test}}-1}\\}, \\quad I_{\\text{train}} = \\{\\pi_{N_{\\text{test}}}, \\dots, \\pi_{N-1}\\}$$\n\n#### Simulasi Hitung Manual Pembagian 10 Data:\nMisalkan kita memiliki 10 sampel data dengan rasio uji $20\\%$ ($r_{\\text{test}} = 0.20$):\n- $N = 10$ sampel.\n- $N_{\\text{test}} = \\text{round}(10 \\times 0.20) = 2$ sampel.\n- $N_{\\text{train}} = 10 - 2 = 8$ sampel.\n\n| Indeks Awal | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |\n|---|---|---|---|---|---|---|---|---|---|---|\n| Permutasi Acak ($\\pi$) | 7 | 2 | 9 | 0 | 4 | 1 | 8 | 3 | 6 | 5 |\n| Alokasi Partisi | Test | Test | Train | Train | Train | Train | Train | Train | Train | Train |\n\nHasil partisi:\n- Indeks Test: $[7, 2]$\n- Indeks Train: $[9, 0, 4, 1, 8, 3, 6, 5]$\n\n---\n\n### 4. Random Split vs Stratified Split\n\nPada kasus klasifikasi dengan distribusi kelas tidak seimbang (*imbalanced dataset*, misal kasus deteksi kanker di mana hanya 5% sampel positif), *Simple Random Split* berisiko menghasilkan *test set* yang **sama sekali tidak memuat kelas positif**.\n\nPada kondisi tersebut, metode **Stratified Sampling** wajib diterapkan: proses partisi dilakukan terpisah di dalam masing-masing kelas target sehingga proporsi kelas pada $y_{\\text{train}}$ dan $y_{\\text{test}}$ identik dengan proporsi populasi awal.\n\n> TIPS JUARA LKS AI:\n> Selalu kunci nilai acak menggunakan parameter `random_state` (misal `np.random.seed(42)`). Ini menjamin eksperimen Anda bersifat *reproducible* (dapat direplikasi secara persis oleh juri saat pengujian modul).\n            ",
        "codePath": "common/preprocessing.py",
        "syntaxBreakdown": [
          {
            "syntax": "np.random.seed(random_state)",
            "explanation": "Mengunci generator angka acak pseudo (PRNG) NumPy. Dengan seed tetap (misal 42), urutan pengacakan baris akan selalu konsisten setiap kali kode dijalankan ulang, memastikan hasil evaluasi dapat diverifikasi oleh juri LKS."
          },
          {
            "syntax": "indices = np.random.permutation(n_samples)",
            "explanation": "Menghasilkan array permutasi acak berisi bilangan bulat unik dari 0 hingga n_samples - 1 tanpa pengembalian (without replacement), menjamin setiap observasi hanya terpilih satu kali."
          },
          {
            "syntax": "test_size = int(n_samples * test_size)",
            "explanation": "Menghitung jumlah observasi absolut yang dialokasikan untuk partisi pengujian berdasarkan proporsi desimal yang diberikan (misal 150 sampel * 0.2 = 30 sampel uji)."
          },
          {
            "syntax": "test_indices = indices[:test_size]; train_indices = indices[test_size:]",
            "explanation": "Memecah array indeks permutasi menjadi dua segmen saling lepas: porsi awal untuk testing dan sisa porsi berikutnya untuk training."
          },
          {
            "syntax": "return X[train_indices], X[test_indices], y[train_indices], y[test_indices]",
            "explanation": "Memanfaatkan teknik NumPy Fancy Indexing untuk menyaring matriks fitur X dan vektor target y secara simultan, menghasilkan 4 partisi data yang selaras sempurna."
          }
        ]
      },
      {
        "id": "1-4",
        "title": "1.4 Normalisasi Min-Max: Formulasi & Analisis Outlier",
        "readingTime": "9 menit",
        "content": "\n### 1. Masalah Disparitas Magnitudo: Mengapa Perlu Normalisasi?\n\n#### Analogi Sederhana: Membandingkan Gaji Jutaan Rupiah vs Usia Puluhan Tahun\nBayangkan Anda menganalisis kelayakan kredit nasabah bank berdasarkan dua kolom data:\n- **Usia Nasabah:** Berkisar antara $18$ sampai $70$ tahun (skala puluhan).\n- **Pendapatan Tahunan:** Berkisar antara Rp $30.000.000$ sampai Rp $500.000.000$ (skala ratusan juta).\n\nJika kedua data ini dihitung langsung oleh rumus jarak matematika (seperti pada KNN atau K-Means), selisih gaji Rp 1.000.000 akan mengalahkan selisih usia 5 tahun dengan kekuatan **1.000.000 banding 5**! Komputer akan mengira bahwa usia nasabah sama sekali tidak berguna, padahal itu murni akibat perbedaan satuan ukur (Rupiah vs Tahun).\n\n**Tujuan Normalisasi:** Menyamakan level permainan (*level playing field*) dengan mengubah seluruh angka menjadi skor persentase murni antara $0.0$ ($0\\%$) sampai $1.0$ ($100\\%$).\n\n---\n\n### 2. Formulasi Matematika Min-Max Scaling\n\nNormalisasi Min-Max memetakan nilai fitur asli $x$ secara linier ke dalam rentang tertutup $[0.0, 1.0]$:\n\n$$x_{\\text{norm}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}$$\n\n#### Bedah Simbol Rumus:\n- $x$: Nilai angka asli yang ingin diubah skalanya.\n- $x_{\\min}$: Nilai paling kecil yang ada di kolom tersebut pada data latih (akan menjadi $0.0$).\n- $x_{\\max}$: Nilai paling besar yang ada di kolom tersebut pada data latih (akan menjadi $1.0$).\n- $x_{\\max} - x_{\\min}$: Jangkauan (*range*) total dari nilai terendah ke tertinggi.\n- $x - x_{\\min}$: Seberapa jauh nilai kita dari garis dasar paling bawah.\n\nJika kita ingin memetakan ke rentang kustom sembarang $[a, b]$ (misalnya $[-1, 1]$):\n\n$$x' = a + \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}} \\times (b - a)$$\n\n---\n\n### 3. Simulasi Perhitungan Manual Langkah Demi Langkah\n\nMisalkan kita memiliki data 3 orang pelamar kerja dengan dua fitur: [Usia (tahun), Nilai Tes (skala 0-100)]:\n\n| Sampel | Usia ($x_1$) | Nilai Tes ($x_2$) |\n|---|---|---|\n| Pelamar A | 20 | 85 |\n| Pelamar B | 30 | 95 |\n| Pelamar C | 40 | 75 |\n\n#### Langkah 1: Tentukan Nilai Ekstrem Tiap Fitur (Data Latih)\n- Fitur Usia ($x_1$): $x_{1,\\min} = 20, \\quad x_{1,\\max} = 40 \\implies \\Delta x_1 = 40 - 20 = 20$\n- Fitur Nilai Tes ($x_2$): $x_{2,\\min} = 75, \\quad x_{2,\\max} = 95 \\implies \\Delta x_2 = 95 - 75 = 20$\n\n#### Langkah 2: Hitung Normalisasi Tiap Elemen\n- **Pelamar A:**\n  $$x_{1,\\text{norm}} = \\frac{20 - 20}{20} = 0.000$$\n  $$x_{2,\\text{norm}} = \\frac{85 - 75}{20} = \\frac{10}{20} = 0.500$$\n- **Pelamar B:**\n  $$x_{1,\\text{norm}} = \\frac{30 - 20}{20} = 0.500$$\n  $$x_{2,\\text{norm}} = \\frac{95 - 75}{20} = \\frac{20}{20} = 1.000$$\n- **Pelamar C:**\n  $$x_{1,\\text{norm}} = \\frac{40 - 20}{20} = 1.000$$\n  $$x_{2,\\text{norm}} = \\frac{75 - 75}{20} = 0.000$$\n\nHasil Matriks Ternormalisasi:\n$$\\begin{bmatrix} 0.0 & 0.5 \\\\ 0.5 & 1.0 \\\\ 1.0 & 0.0 \\end{bmatrix}$$\n\nKedua fitur kini memiliki bobot pengaruh yang setara dan adil bagi algoritma.\n\n---\n\n### 4. Kelemahan Kritis: Kerentanan terhadap Pencilan (Outlier)\n\n> BAHAYA OUTLIER PADA MIN-MAX:\n> Normalisasi Min-Max sangat rentan terhadap data pencilan (*extreme outliers*). \n\nBayangkan jika tiba-tiba masuk seorang pelamar kehormatan berusia 80 tahun ($x_1 = 80$):\n- Nilai $x_{1,\\max}$ langsung melonjak drastis dari 40 menjadi 80.\n- Penyebut pembagi membengkak menjadi $80 - 20 = 60$.\n- Pelamar B (usia 30) yang tadinya bernilai normalisasi seimbang $0.5$, kini jatuh tertekan ke $\\frac{30 - 20}{60} = 0.166$.\n\nAkibatnya, mayoritas data normal akan tergencet ke sudut sempit mendekati 0, sehingga model kehilangan kemampuan untuk membedakan variasi data pelamar biasa.\n            ",
        "codePath": "common/preprocessing.py",
        "syntaxBreakdown": [
          {
            "syntax": "self.min_ = np.min(X, axis=0)",
            "explanation": "Mencari nilai minimum absolut pada masing-masing kolom fitur sepanjang sumbu vertikal (axis=0), menghasilkan vektor baris berisi nilai batas bawah."
          },
          {
            "syntax": "self.max_ = np.max(X, axis=0)",
            "explanation": "Mencari nilai maksimum absolut pada masing-masing kolom fitur, menghasilkan vektor batas atas untuk penyebut penskalaan."
          },
          {
            "syntax": "denominator = self.max_ - self.min_; denominator[denominator == 0.0] = 1e-8",
            "explanation": "Menghitung selisih jangkauan (range). Jika suatu fitur bernilai konstan (max == min), penyebut bernilai 0. Kondisi ini diamankan dengan mengganti 0 menjadi angka infinitesimal 1e-8 untuk mencegah ZeroDivisionError."
          },
          {
            "syntax": "return (X - self.min_) / denominator",
            "explanation": "Melakukan penyiaran (broadcasting) matriks NumPy: mengurangkan setiap baris data dengan vektor nilai minimum, lalu membaginya dengan rentang, menghasilkan matriks berskala tepat [0.0, 1.0]."
          }
        ]
      },
      {
        "id": "1-5",
        "title": "1.5 Standardisasi Z-Score: Mean Centering & Variansi Satuan",
        "readingTime": "11 menit",
        "content": "\n### 1. Filosofi Distribusi Normal Baku (Standard Normal Distribution)\n\n#### Analogi Sederhana: Menilai Nilai Rapor Relatif Terhadap Kelas\nJika Anda mendapat nilai 85 pada ujian matematika yang sangat rumit di mana rata-rata kelas hanya 50, nilai 85 Anda adalah pencapaian yang luar biasa tinggi! Sebaliknya, jika rata-rata kelas adalah 95, nilai 85 justru berada di bawah rata-rata.\n\nStandardisasi Z-Score tidak melihat angka mentah secara kaku, melainkan mengukur: **\"Seberapa jauh posisi suatu data menyimpang dari nilai rata-rata kelompoknya, dihitung dalam satuan simpangan baku (standar deviasi)?\"**\n\nSecara matematis, data diubah menjadi distribusi normal baku:\n$$X \\sim \\mathcal{N}(\\mu, \\sigma^2) \\xrightarrow{\\text{Z-Score}} Z \\sim \\mathcal{N}(0, 1)$$\n\n- **Pusat Nilai Digeser Tepat ke 0 ($\\mu = 0$):** Data yang nilainya sama dengan rata-rata akan bernilai 0.\n- **Skala Sebaran Dibuat Seragam 1 ($\\sigma = 1$):** Angka positif berarti di atas rata-rata, angka negatif berarti di bawah rata-rata.\n- **Tahan Terhadap Outlier:** Karena tidak dikunci pada batas [0, 1], data pencilan tidak akan menekan atau merusak posisi data normal lainnya.\n\n---\n\n### 2. Formulasi Matematika Lengkap\n\nDiberikan sebuah kolom fitur yang terdiri dari $N$ observasi: $\\mathbf{x} = [x_1, x_2, \\dots, x_N]^T$.\n\n#### Langkah 1: Nilai Rata-rata Aritmatika (Sample Mean)\n$$\\mu = \\frac{1}{N} \\sum_{i=1}^N x_i$$\n*(Menghitung titik keseimbangan tengah data)*\n\n#### Langkah 2: Variansi dan Standar Deviasi (Standard Deviation)\n$$\\sigma = \\sqrt{\\frac{1}{N} \\sum_{i=1}^N (x_i - \\mu)^2}$$\n*(Mengukur seberapa lebar data menyebar dari titik tengahnya)*\n\n#### Langkah 3: Transformasi Skor Standar (Z-Score)\n$$z_i = \\frac{x_i - \\mu}{\\sigma}$$\n\n#### Bedah Simbol Rumus:\n- $x_i$: Nilai data asli ke-$i$.\n- $x_i - \\mu$: Selisih jarak data ke rata-rata (disebut *Mean Centering*).\n- $\\sigma$: Nilai standar deviasi sebagai pembagi pembuat skala satuan.\n- $z_i = 0$: Nilai tepat sama dengan rata-rata.\n- $z_i = +1.5$: Nilai $1.5$ simpangan baku di atas rata-rata.\n- $z_i = -2.0$: Nilai $2$ simpangan baku di bawah rata-rata.\n\n---\n\n### 3. Simulasi Perhitungan Manual dengan Angka Nyata\n\nMisalkan kita memiliki satu kolom fitur: Kadar Hemoglobin dari 4 pasien $[12, 14, 16, 18]$ g/dL:\n\n| Pasien | $x_i$ | $(x_i - \\mu)$ | $(x_i - \\mu)^2$ | $z_i = (x_i - \\mu) / \\sigma$ |\n|---|---|---|---|---|\n| 1 | 12 | $12 - 15 = -3$ | $(-3)^2 = 9$ | $-3 / 2.236 = \\mathbf{-1.3416}$ |\n| 2 | 14 | $14 - 15 = -1$ | $(-1)^2 = 1$ | $-1 / 2.236 = \\mathbf{-0.4472}$ |\n| 3 | 16 | $16 - 15 = +1$ | $(+1)^2 = 1$ | $+1 / 2.236 = \\mathbf{+0.4472}$ |\n| 4 | 18 | $18 - 15 = +3$ | $(+3)^2 = 9$ | $+3 / 2.236 = \\mathbf{+1.3416}$ |\n| **Total** | **60** | **0** | **20** | **Rata-rata Z = 0** |\n\n#### Perhitungan Statistik:\n1. Rata-rata: $\\mu = \\frac{12 + 14 + 16 + 18}{4} = \\frac{60}{4} = 15$\n2. Variansi: $\\sigma^2 = \\frac{20}{4} = 5.0$\n3. Standar Deviasi: $\\sigma = \\sqrt{5.0} \\approx 2.236$\n\nPerhatikan bagaimana nilai $z_i$ simetris terhadap titik 0.\n\n---\n\n### 4. Tabel Perbandingan Kritis: Kapan Memilih Min-Max vs Z-Score?\n\n| Kriteria | Min-Max Normalization | Z-Score Standardization |\n|---|---|---|\n| **Rentang Output** | Kaku, dibatasi $[0.0, 1.0]$ | Tak terbatas, berpusat di $0$ (umumnya $[-3, +3]$) |\n| **Pusat Data** | Tidak berpusat di 0 | Berpusat tepat di $\\mu = 0$ (*Zero-centered*) |\n| **Ketahanan Outlier** | **Sangat Rendah** (Outlier menekan data normal) | **Tinggi** (Pencilan tidak merusak skala titik lainnya) |\n| **Cocok untuk** | Neural Network (Sigmoid), Image Pixel ($[0, 255]$) | Regresi Linier, Regresi Logistik, KNN, PCA, SVM |\n| **Asumsi Distribusi** | Tidak berasumsi pada bentuk distribusi data | Ideal jika fitur mendekati distribusi normal (lonceng) |\n\n> TIPS JUARA LKS AI:\n> Pada hampir seluruh algoritma Machine Learning yang memanfaatkan turunan fungsi (*Gradient Descent*) atau perhitungan jarak (*Euclidean Distance*), **Z-Score Standardization adalah pilihan default terbaik** karena memastikan gradien turun secara konvergen dan stabil di semua sumbu fitur.\n\n> TIPS JUARA LKS AI:\n> Pada hampir seluruh algoritma Machine Learning yang memanfaatkan turunan fungsi (*Gradient Descent*) atau perhitungan jarak (*Euclidean Distance*), **Z-Score Standardization adalah pilihan default terbaik** karena memastikan gradien turun secara konvergen dan stabil di semua sumbu fitur.\n            ",
        "codePath": "common/preprocessing.py",
        "syntaxBreakdown": [
          {
            "syntax": "self.mean_ = np.mean(X, axis=0)",
            "explanation": "Menghitung rata-rata aritmatika tiap kolom fitur secara terpisah sepanjang sumbu vertikal (axis=0). Menghasilkan array 1 dimensi berukuran (n_features,)."
          },
          {
            "syntax": "self.std_ = np.std(X, axis=0)",
            "explanation": "Menghitung simpangan baku (standar deviasi populasi) tiap kolom fitur, mengukur seberapa jauh sebaran titik data dari pusat rata-ratanya."
          },
          {
            "syntax": "self.std_[self.std_ == 0.0] = 1e-8",
            "explanation": "Pertahanan numerik krusial: Jika sebuah fitur bernilai konstan pada seluruh baris, variasinya adalah 0 sehingga std = 0. Tanpa baris ini, pembagian akan menghasilkan NaN / Inf. Nilai 0 digantikan dengan epsilon 1e-8."
          },
          {
            "syntax": "return (X - self.mean_) / self.std_",
            "explanation": "Menerapkan rumus Z-Score menggunakan penyiaran matriks NumPy, menghasilkan matriks data terstandarisasi dengan mean 0 dan standar deviasi 1."
          }
        ]
      }
    ]
  },
  {
    "id": "mod-2",
    "title": "Bab 2: K-Nearest Neighbors (KNN)",
    "icon": "02",
    "lessons": [
      {
        "id": "2-1",
        "title": "2.1 Konsep Dasar, Ruang Metrik, & Karakteristik Lazy Learner",
        "readingTime": "10 menit",
        "content": "\n### 1. Filosofi Kedekatan Spasial (Spatial Proximity)\n\n#### Analogi Sederhana: Memilih Warung Makan dari Rekomendasi Tetangga\nBayangkan Anda baru saja pindah ke rumah baru di kota yang asing. Saat lapar di malam hari, Anda bingung warung makan mana yang enak dan higienis. Cara paling alami dan masuk akal yang Anda lakukan adalah bertanya kepada 3 atau 5 orang tetangga terdekat di sekitar rumah Anda (*Nearest Neighbors*). \n\nJika 2 dari 3 tetangga Anda merekomendasikan \"Warung Nasi Goreng Pak Budi\" dan hanya 1 orang merekomendasikan warung lain, Anda akan dengan percaya diri memutuskan makan di Warung Pak Budi (*Majority Voting*).\n\nPrinsip dasar algoritma **K-Nearest Neighbors (KNN)** bekerja persis seperti peribahasa tersebut: **\"Karakteristik atau label suatu data ditentukan oleh siapa tetangga-tetangga terdekatnya.\"**\n\nDalam matematika Machine Learning:\n- **Rumah Baru Anda:** Titik data baru yang belum diketahui labelnya (**Query Point** $\\mathbf{p}$).\n- **Rumah Tetangga-Tetangga di Sekitar:** Kumpulan data latih yang sudah memiliki label pasti (**Training Data** $\\mathbf{q}$).\n- **Jarak Jalan Kaki:** Ukuran kedekatan matematis (**Jarak Euclidean**) pada ruang fitur koordinat $\\mathbb{R}^m$.\n- **Asumsi Kehalusan Spasial (*Smoothness Assumption*):** Data-data yang memiliki jenis kelas yang sama cenderung berkumpul dan hidup saling berdekatan.\n\n---\n\n### 2. Mengapa KNN Disebut 'Lazy Learner'?\n\n#### Analogi Tipe Siswa: \"Sistem Kebut Semalam (SKS)\"\nDalam dunia Machine Learning, algoritma terbagi menjadi dua sifat belajar:\n1. **Eager Learners (Siswa Rajin):** Algoritma seperti Regresi Linier, Decision Tree, atau Neural Network. Mereka belajar giat di awal saat fase training (`.fit()`), memeras rumus matematika rumit untuk melahirkan sebuah model tetap. Ketika ada soal ujian baru (`.predict()`), mereka menjawab dengan sekejap karena rumusnya sudah jadi.\n2. **Lazy Learners / Instance-Based Learners (Siswa Pemalas / KNN):** \n   - **Fase Pelatihan (`.fit()`):** Algoritma sama sekali tidak memproses rumus matematika apapun! KNN hanya menyalin dan menumpuk seluruh matriks data mentah $X_{\\text{train}}$ dan label $y_{\\text{train}}$ ke dalam memori RAM komputer. Waktu komputasi instan: $\\mathcal{O}(1)$.\n   - **Fase Prediksi (`.predict()`):** Seluruh beban kerja ditunda sampai saat prediksi tiba. Ketika ada 1 pasien atau bunga baru yang ingin ditebak, barulah komputer panik bekerja keras menghitung jarak ke **seluruh $N$ baris data latih satu per satu**, mengurutkannya, dan melakukan voting. Waktu komputasi berat: $\\mathcal{O}(N \\times m)$.\n\n---\n\n### 3. Masalah Fatal: Curse of Dimensionality (Kutukan Dimensi Tinggi)\n\n#### Analogi Sederhana: Mencari Jarum di Ruangan 1D vs Hutan Belantara 50D\nBayangkan sebuah koin terjatuh:\n- **Ruang 1 Dimensi (Garis Lurus 10 meter):** Anda bisa menemukan koin tersebut dalam beberapa detik karena lintasannya sangat sempit dan padat.\n- **Ruang 2 Dimensi (Lapangan Terbuka 10x10 meter):** Butuh waktu beberapa menit untuk menyisir area.\n- **Ruang 50 Dimensi (Hiperspace dengan 50 sumbu fitur):** Volume ruang membengkak secara eksponensial ($V \\propto s^m$). Ruang menjadi teramat luas, hampa, dan kosong (*sparse*).\n\n> JEBAKAN UJIAN LKS AI:\n> Menggunakan KNN pada data dengan jumlah fitur sangat banyak (misal $m > 50$) tanpa seleksi fitur akan menghasilkan penurunan akurasi drastis akibat fenomena **Curse of Dimensionality**.\n\nSecara matematis, di ruang dimensi yang sangat tinggi, selisih antara jarak ke data yang paling dekat ($d_{\\min}$) dan jarak ke data yang paling jauh ($d_{\\max}$) akan menyusut mendekati nol:\n\n$$\\lim_{m \\to \\infty} \\frac{d_{\\max} - d_{\\min}}{d_{\\min}} \\to 0$$\n\nAkibatnya, konsep \"tetangga terdekat\" kehilangan makna pembedanya karena hampir seluruh titik data memiliki jarak yang relatif seragam dan sama-sama jauh dari titik uji.\n\n> TIPS JUARA LKS AI:\n> Sebelum menerapkan KNN pada kompetisi LKS, selalu lakukan pemeriksaan jumlah kolom fitur (`X.shape[1]`). Jika fitur terlalu banyak, terapkan seleksi fitur berbasis korelasi atau reduksi dimensi (PCA).\n            "
      },
      {
        "id": "2-2",
        "title": "2.2 Formulasi Metrik Jarak & Simulasi Hitung Manual",
        "readingTime": "12 menit",
        "content": "\n### 1. Formulasi Matematika Metrik Jarak\n\nDiberikan dua titik dalam ruang koordinat $m$-dimensi: titik sampel baru yang ingin ditebak $\\mathbf{p} = (p_1, p_2, \\dots, p_m)$ dan titik data latih $\\mathbf{q} = (q_1, q_2, \\dots, q_m)$.\n\n#### A. Euclidean Distance ($L_2$ Norm)\nMengukur lintasan garis lurus terpendek antara dua titik (sama persis dengan rumus Pythagoras segitiga siku-siku $c = \\sqrt{a^2 + b^2}$ yang kita pelajari di bangku sekolah):\n\n$$d_{\\text{Euclidean}}(\\mathbf{p}, \\mathbf{q}) = \\sqrt{\\sum_{j=1}^m (p_j - q_j)^2} = \\|\\mathbf{p} - \\mathbf{q}\\|_2$$\n\n#### Bedah Simbol Rumus Euclidean:\n- $\\mathbf{p}$ dan $\\mathbf{q}$: Titik data yang sedang dihitung jaraknya.\n- $p_j - q_j$: Selisih nilai pada kolom fitur ke-$j$ (misal selisih usia atau selisih kadar gula).\n- $(p_j - q_j)^2$: Nilai selisih dikuadratkan agar hasilnya selalu bernilai positif dan memberi hukuman lebih besar pada selisih yang lebar.\n- $\\sum_{j=1}^m$: Menjumlahkan seluruh selisih kuadrat dari kolom ke-1 sampai kolom ke-$m$.\n- $\\sqrt{\\dots}$: Menarik akar kuadrat agar satuan angka jarak kembali sama dengan satuan asli datanya.\n\n#### B. Manhattan Distance ($L_1$ Norm / City Block)\nMengukur jarak lintasan orthogonal berundak:\n\n$$d_{\\text{Manhattan}}(\\mathbf{p}, \\mathbf{q}) = \\sum_{j=1}^m |p_j - q_j| = \\|\\mathbf{p} - \\mathbf{q}\\|_1$$\n\n*Analogi:* Seperti mobil taksi yang menyusuri jalur jalan kota berbentuk blok kotak-kotak (grid), tidak bisa terbang diagonal menembus gedung perkantoran, sehingga harus maju horizontal kemudian belok vertikal. Metrik ini lebih tahan (*robust*) terhadap data pencilan (*outlier*).\n\n#### C. Minkowski Distance ($L_p$ Norm)\nRumus induk yang menggeneralisasikan kedua jarak di atas:\n\n$$d_{\\text{Minkowski}}(\\mathbf{p}, \\mathbf{q}) = \\left( \\sum_{j=1}^m |p_j - q_j|^p \\right)^{1/p}$$\n- Jika parameter $p = 1 \\implies$ Menjadi Manhattan Distance.\n- Jika parameter $p = 2 \\implies$ Menjadi Euclidean Distance.\n\n---\n\n### 2. Simulasi Perhitungan Manual Lengkap dengan Angka Nyata\n\nMisalkan kita memiliki data medis sederhana berisi 4 orang pasien latih dengan 2 fitur: $[x_1: \\text{Umur (tahun)}, x_2: \\text{Kadar Gula (mg/dL)}]$ dan label kesehatan target [$y \\in \\{0: \\text{Normal}, 1: \\text{Diabetes}\\}$]:\n\n| Pasien | Umur ($x_1$) | Gula ($x_2$) | Label Target ($y$) |\n|---|---|---|---|\n| A | 25 | 90 | 0 (Normal) |\n| B | 35 | 110 | 0 (Normal) |\n| C | 45 | 180 | 1 (Diabetes) |\n| D | 55 | 200 | 1 (Diabetes) |\n\n**Titik Query Pasien Baru:** $\\mathbf{p} = [\\text{Umur} = 40, \\text{Gula} = 130]$. Nilai hyperparameter $K = 3$.\n\n#### Langkah 1: Hitung Jarak Euclidean ke Seluruh Pasien Latih\n1. **Ke Pasien A (25, 90):**\n   $$d(P, A) = \\sqrt{(40 - 25)^2 + (130 - 90)^2} = \\sqrt{15^2 + 40^2} = \\sqrt{225 + 1600} = \\sqrt{1825} \\approx \\mathbf{42.72}$$\n2. **Ke Pasien B (35, 110):**\n   $$d(P, B) = \\sqrt{(40 - 35)^2 + (130 - 110)^2} = \\sqrt{5^2 + 20^2} = \\sqrt{25 + 400} = \\sqrt{425} \\approx \\mathbf{20.62}$$\n3. **Ke Pasien C (45, 180):**\n   $$d(P, C) = \\sqrt{(40 - 45)^2 + (130 - 180)^2} = \\sqrt{(-5)^2 + (-50)^2} = \\sqrt{25 + 2500} = \\sqrt{2525} \\approx \\mathbf{50.25}$$\n4. **Ke Pasien D (55, 200):**\n   $$d(P, D) = \\sqrt{(40 - 55)^2 + (130 - 200)^2} = \\sqrt{(-15)^2 + (-70)^2} = \\sqrt{225 + 4900} = \\sqrt{5125} \\approx \\mathbf{71.59}$$\n\n#### Langkah 2: Urutkan Jarak dari Terkecil ke Terbesar\n| Ranking | Pasien | Jarak Euclidean | Label Asli ($y$) |\n|---|---|---|---|\n| **1 (Paling Dekat)** | **Pasien B** | **20.62** | **0 (Normal)** |\n| **2 (Kedua Dekat)** | **Pasien A** | **42.72** | **0 (Normal)** |\n| **3 (Ketiga Dekat)** | **Pasien C** | **50.25** | **1 (Diabetes)** |\n| 4 (Terjauh) | Pasien D | 71.59 | 1 (Diabetes) |\n\n#### Langkah 3: Ambil K = 3 Tetangga Terdekat & Lakukan Voting Suara\n- Tiga tetangga terdekat terpilih: **[Pasien B (0), Pasien A (0), Pasien C (1)]**\n- Hasil Voting Suara:\n  - Label $0$ (Normal): $2$ suara\n  - Label $1$ (Diabetes): $1$ suara\n- **Keputusan Prediksi Model:** Pasien baru diprediksi memiliki label **0 (Normal)** karena memenangkan pemungutan suara terbanyak (2 lawan 1).\n            "
      },
      {
        "id": "2-3",
        "title": "2.3 Pemilihan Hyperparameter K & Strategi Voting",
        "readingTime": "9 menit",
        "content": "\n### 1. Analisis Bias-Variance Tradeoff pada Nilai K\n\n#### Analogi Sederhana: Mudah Terhasut vs Terlalu Banyak Mendengarkan Suara\n- **Jika $K = 1$ (Terlalu Kecil):** Anda hanya bertanya pada **satu orang tetangga tunggal**. Jika kebetulan tetangga itu memiliki selera aneh atau datanya salah label (*noise*), Anda akan ikut tersesat! Model menjadi sangat labil, batas keputusan berliku-liku tajam, dan menghafal kebetulan data (**Overfitting / High Variance**).\n- **Jika $K = 100$ (Terlalu Besar):** Anda bertanya pada seluruh warga satu kecamatan. Pendapat warga mayoritas akan menenggelamkan informasi warga sekitar rumah Anda. Akibatnya model menjadi tumpul dan kaku, selalu memprediksi kelas mayoritas (**Underfitting / High Bias**).\n- **Titik Ideal:** Memilih $K$ seimbang (biasanya 3, 5, atau 7) yang mampu menyaring kebisingan tanpa kehilangan kepekaan lokal.\n\n---\n\n### 2. Tiga Kaidah Emas Pemilihan K untuk Kompetisi LKS AI\n\n1. **Wajib Memilih Angka Ganjil (*Odd Numbers*):**\n   Pada klasifikasi biner (2 kelas), nilai $K$ **harus selalu ganjil** ($K = 3, 5, 7, \\dots$). Jika Anda memilih nilai genap seperti $K = 4$, sangat mungkin terjadi hasil voting seri 2 lawan 2, yang menyebabkan model mengalami kebuntuan (*deadlock*).\n2. **Kaidah Pendekatan Akar Kuadrat (*Square Root Rule*):**\n   Gunakan rumus praktis awal:\n   $$K \\approx \\sqrt{N_{\\text{train}}}$$\n   Misal data latih ada $100$ baris, nilai awal $K \\approx \\sqrt{100} = 10 \\implies$ bulatkan ke angka ganjil terdekat yaitu **$K = 9$ atau $K = 11$**.\n3. **Hyperparameter Tuning via Validation Set:**\n   Uji nilai $K \\in [3, 5, 7, 9, 11, 15]$ pada data validasi dan pilih nilai $K$ yang menghasilkan skor F1 tertinggi.\n\n---\n\n### 3. Majority Voting vs Distance-Weighted Voting\n\nSecara default, setiap tetangga memiliki hak suara yang setara ($1$ suara), tidak peduli apakah tetangga itu berada tepat di sebelah rumah ($d = 0.5$) atau berada jauh di ujung jalan ($d = 49.5$).\n\nPada teknik lanjutan **Distance-Weighted Voting**, tetangga yang berada lebih dekat diberi bobot suara lebih besar dibanding tetangga yang jauh:\n\n$$w_i = \\frac{1}{d_i^2 + \\epsilon}$$\n\n#### Bedah Simbol:\n- $w_i$: Bobot nilai suara untuk tetangga ke-$i$.\n- $d_i$: Jarak dari titik baru ke tetangga ke-$i$. Semakin kecil jarak $d_i$, semakin raksasa bobot suaranya $w_i$.\n- $\\epsilon = 10^{-8}$: Nilai pengaman amat kecil (*epsilon*) agar pembagi tidak pernah bernilai 0 jika ada data latih yang posisinya persis berhimpitan ($d_i = 0$).\n            "
      },
      {
        "id": "2-4",
        "title": "2.4 Praktikum Koding: Class KNN Manual (Pure NumPy)",
        "readingTime": "10 menit",
        "content": "\nDi bawah ini adalah kode lengkap implementasi algoritma K-Nearest Neighbors mandiri menggunakan teknik vektorisasi matriks murni NumPy tanpa pustaka eksternal.\n\nPerhatikan kotak **Bedah Sintaks & Alur Perhitungan Matematis** di bawah kode untuk memahami bagaimana setiap rumus Euclidean, pengurutan jarak, dan voting suara diterjemahkan secara elegan ke dalam baris kode Python.\n            ",
        "codePath": "modelling/01_knn/contoh_program.py",
        "syntaxBreakdown": [
          {
            "syntax": "diff = self.X_train - x; squared_diff = diff ** 2",
            "explanation": "Pemanfaatan penyiaran matriks (broadcasting): Vektor titik baru x (1, m) dikurangkan ke seluruh baris matriks X_train (N, m), lalu setiap elemen dikuadratkan. Ini menghitung selisih kuadrat koordinat (p_j - q_j)^2 untuk seluruh sampel latih sekaligus tanpa looping!"
          },
          {
            "syntax": "distances = np.sqrt(np.sum(squared_diff, axis=1))",
            "explanation": "np.sum(..., axis=1) menjumlahkan selisih kuadrat secara horizontal (sepanjang kolom fitur), kemudian np.sqrt menarik akar kuadratnya. Tepat merefleksikan rumus Euclidean L2 norm. Menghasilkan array 1 dimensi berisi jarak dari titik x ke seluruh N sampel latih."
          },
          {
            "syntax": "k_indices = np.argsort(distances)[:self.k]",
            "explanation": "np.argsort mengurutkan array jarak dari terkecil ke terbesar dan mengembalikan indeks posisinya di memori. Slicing [:self.k] memotong array untuk mengambil K indeks observasi dengan jarak spasial terpendek."
          },
          {
            "syntax": "k_nearest_labels = self.y_train[k_indices]",
            "explanation": "Mengambil label kelas sebenarnya dari data latih yang berada pada K indeks terdekat tadi menggunakan teknik fancy indexing NumPy."
          },
          {
            "syntax": "most_common = Counter(k_nearest_labels).most_common(1)[0][0]",
            "explanation": "Melakukan voting mayoritas suara: Counter menghitung frekuensi kemunculan tiap label kelas, dan .most_common(1)[0][0] mengambil 1 kelas pemenang voting suara terbanyak sebagai hasil prediksi final."
          }
        ]
      },
      {
        "id": "2-5",
        "title": "2.5 Studi Kasus Data Asli: Bunga Iris (Kaggle)",
        "readingTime": "8 menit",
        "content": "\n### 1. Karakteristik Dataset Iris (Kaggle Benchmark)\n\nDataset bunga Iris terdiri dari 150 sampel observasi bunga dengan 4 fitur morfologi kontinu:\n- Sepal Length (Panjang Kelopak)\n- Sepal Width (Lebar Kelopak)\n- Petal Length (Panjang Mahkota)\n- Petal Width (Lebar Mahkota)\n\nTarget klasifikasi adalah 3 spesies bunga yang seimbang masing-masing 50 sampel:\n- Kelas 0: *Iris Setosa* (Dapat dipisahkan secara linier murni)\n- Kelas 1: *Iris Versicolor* (Saling bertumpukan sebagian dengan Virginica)\n- Kelas 2: *Iris Virginica*\n\n---\n\n### 2. Eksekusi Script & Evaluasi Model\n\nJalankan script nyata di bawah ini untuk melihat bagaimana `StandardScaler` dan model `KNNManual` buatanmu memproses data 150 bunga, membaginya dengan `train_test_split`, dan mengevaluasi hasil klasifikasinya menggunakan `confusion_matrix`.\n            ",
        "codePath": "modelling/01_knn/studi_kasus.py",
        "syntaxBreakdown": [
          {
            "syntax": "X, y, target_names = load_iris()",
            "explanation": "Memuat dataset benchmark asli Iris dari file lokal datasets/iris.csv melalui helper loader data_helper.py."
          },
          {
            "syntax": "scaler = StandardScaler(); X_train = scaler.fit_transform(X_train); X_test = scaler.transform(X_test)",
            "explanation": "Menerapkan standardisasi Z-Score secara disiplin anti data-leakage: menghitung statistik mean dan std HANYA dari data latih, lalu mentransformasikan data latih dan data uji secara konsisten."
          },
          {
            "syntax": "acc = accuracy_score(y_test, y_pred)",
            "explanation": "Menghitung rasio prediksi benar terhadap total sampel data uji, menghasilkan akurasi tinggi sebesar 96.67% pada model buatan sendiri."
          }
        ]
      }
    ]
  },
  {
    "id": "mod-3",
    "title": "Bab 3: Decision Tree (Pohon Keputusan)",
    "icon": "03",
    "lessons": [
      {
        "id": "3-1",
        "title": "3.1 Struktur Pohon: Root, Internal Node, dan Leaf",
        "readingTime": "9 menit",
        "content": "\n### 1. Filosofi Pohon Keputusan (CART)\n\n#### Analogi Sederhana: Permainan Tebak-Tebakan \"20 Pertanyaan\"\nPernahkah Anda memainkan permainan tebak-tebakan di mana Anda hanya diizinkan mengajukan pertanyaan dengan jawaban **Ya** atau **Tidak**? \n\nMisalkan seorang dokter ingin mendiagnosis apakah seorang pasien berisiko diabetes:\n- **Pertanyaan 1:** \"Apakah kadar gula darah puasa $\\le 120$ mg/dL?\"\n  - *Jika Ya (True):* Lanjut ke Pertanyaan 2: \"Apakah indeks massa tubuh (BMI) $\\le 25$?\" $\\implies$ Jika Ya, vonis: **Sehat / Normal**.\n  - *Jika Tidak (False):* Lanjut ke Pertanyaan 3: \"Apakah usia pasien $\\ge 45$ tahun?\" $\\implies$ Jika Ya, vonis: **Diabetes**.\n\nAlgoritma **Decision Tree (CART — Classification and Regression Trees)** bekerja persis seperti logika dokter ahli tersebut: menyusun serangkaian aturan kondisi jika-maka (*if-then-else*) paling pintar dan berurutan dari atas ke bawah.\n\nBerbeda dengan model Machine Learning lain yang bersifat *black-box* (kotak hitam yang sulit diintip logikanya), Decision Tree adalah model **white-box** dengan interpretabilitas tertinggi: setiap tebakan komputer dapat dilacak langkah demi langkah layaknya membaca bagan alur (*flowchart*).\n\n---\n\n### 2. Anatomi Topologi Pohon\n\nStruktur pohon keputusan tersusun atas tiga komponen hierarkis:\n1. **Root Node (Simpul Akar):** Simpul paling puncak dari pohon yang memuat seluruh dataset awal ($100\\%$ data). Pada simpul ini dilakukan pengujian kondisi logika pertama yang paling membedakan kelas (*most discriminative*).\n2. **Internal / Decision Node (Simpul Percabangan):** Simpul penguji perantara yang memuat kondisi uji terhadap suatu fitur tertentu (misal: $\\text{Kadar Gula} \\le 120$). Simpul ini memiliki satu cabang masuk dan dua cabang keluar (Kiri: True, Kanan: False).\n3. **Leaf Node / Terminal Node (Simpul Daun):** Simpul akhir di ujung cabang yang tidak lagi memiliki anak. Simpul daun memuat **keputusan tebakan kelas final** (berdasarkan suara mayoritas data yang jatuh ke daun tersebut).\n\n---\n\n### 3. Sifat Pembelahan Ruang Fitur Secara Ortogonal\n\nSecara geometris, Decision Tree membelah ruang fitur dengan garis-garis yang **selalu tegak lurus terhadap sumbu fitur** (*axis-aligned orthogonal splits*).\n\nKarakteristik ini memiliki dua implikasi penting:\n- **Kelebihan Luar Biasa:** Algoritma ini bersifat kebal terhadap penskalaan fitur (*scale-invariant*). Normalisasi atau standardisasi (seperti Min-Max atau Z-Score) **tidak akan mengubah hasil keputusan pohon sama sekali**, karena urutan relatif urut-urutan nilai data tidak pernah berubah.\n- **Kelemahan:** Jika batas pemisah kelas yang sebenarnya berbentuk garis miring atau kurva diagonal, pohon membutuhkan kedalaman yang sangat dalam (berbentuk seperti tangga berundak-undak) untuk mengaproksimasi garis miring tersebut.\n            "
      },
      {
        "id": "3-2",
        "title": "3.2 Formulasi Matematika Gini Impurity & Entropy",
        "readingTime": "11 menit",
        "content": "\n### 1. Konsep Ketidakmurnian Simpul (Impurity)\n\n#### Analogi Sederhana: Mengambil Permen di Dalam Toples\nBayangkan Anda memiliki beberapa toples berisi permen:\n- **Toples A (Murni Sempurna / Pure):** Berisi 100% permen rasa cokelat. Jika Anda menutup mata dan mengambil satu permen acak, Anda 100% yakin mendapatkan cokelat. Tingkat kebingungan atau kekotorannya adalah **0.0**.\n- **Toples B (Campur Aduk / Sangat Kotor):** Berisi 50% permen cokelat dan 50% permen stroberi. Anda berada pada tingkat ketidakpastian tertinggi (peluang salah tebak 50:50). Tingkat kekotorannya bernilai maksimum **0.5**.\n\nKomputer membutuhkan rumus matematika untuk mengukur seberapa \"kotor\" atau seberapa \"campur aduk\" label kelas di dalam suatu simpul. Metrik inilah yang disebut **Gini Impurity**.\n\nTujuan utama algoritma pohon adalah: **Membuat simpul-simpul anak yang sekering dan semurni mungkin ($I_G \\to 0.0$)**.\n\n---\n\n### 2. Formulasi Matematika Gini Impurity\n\nAlgoritma CART standar menggunakan metrik **Gini Impurity**:\n\n$$I_G(S) = 1 - \\sum_{i=1}^C p_i^2$$\n\n#### Bedah Simbol Rumus:\n- $S$: Kumpulan data yang sedang berada di simpul saat ini.\n- $C$: Jumlah total kelas unik (misal 2 kelas: Sakit vs Sehat).\n- $p_i$: Proporsi persentase sampel kelas ke-$i$ di simpul tersebut:\n  $$p_i = \\frac{N_i}{|S|}$$\n- $p_i^2$: Nilai kuadrat proporsi. Jika satu kelas mendominasi total ($p = 1.0$), maka $p^2 = 1.0$, sehingga $I_G = 1 - 1 = 0.0$ (**Simpul Murni**).\n- $1 - \\sum p_i^2$: Menghitung peluang bahwa sampel yang diambil acak akan salah dilabeli jika diberi label acak sesuai distribusi kelas di simpul tersebut.\n\n#### Karakteristik Nilai Gini:\n- **Nilai Minimum ($I_G = 0.0$):** Tercapai saat simpul murni $100\\%$ satu kelas ($p_A = 1.0, p_B = 0$):\n  $$I_G = 1 - (1.0^2 + 0.0^2) = 1 - 1 = \\mathbf{0.0}$$\n- **Nilai Maksimum untuk Kasus Biner ($I_G = 0.5$):** Tercapai saat data terbelah seimbang 50%:50% ($p_A = 0.5, p_B = 0.5$):\n  $$I_G = 1 - (0.5^2 + 0.5^2) = 1 - (0.25 + 0.25) = 1 - 0.5 = \\mathbf{0.5}$$\n\n---\n\n### 3. Simulasi Perhitungan Manual Gini dengan Tiga Contoh Kasus\n\nMisalkan kita mengamati simpul yang memuat dua kelas hewan [Kucing vs Anjing]:\n\n| Kasus Simpul | Komposisi Data | Perhitungan Proporsi ($p_i$) | Perhitungan Gini Impurity ($I_G$) | Status Kemurnian |\n|---|---|---|---|---|\n| **Simpul A** | 10 Kucing, 0 Anjing | $p_K = \\frac{10}{10} = 1.0, \\quad p_A = 0$ | $1 - (1.0^2 + 0^2) = \\mathbf{0.00}$ | **Murni Sempurna (Pure)** |\n| **Simpul B** | 8 Kucing, 2 Anjing | $p_K = \\frac{8}{10} = 0.8, \\quad p_A = 0.2$ | $1 - (0.8^2 + 0.2^2) = 1 - (0.64 + 0.04) = \\mathbf{0.32}$ | Cukup Murni |\n| **Simpul C** | 5 Kucing, 5 Anjing | $p_K = \\frac{5}{10} = 0.5, \\quad p_A = 0.5$ | $1 - (0.5^2 + 0.5^2) = 1 - (0.25 + 0.25) = \\mathbf{0.50}$ | **Sangat Campur Aduk (Impure)** |\n\n---\n\n### 4. Gini Impurity vs Information Entropy\n\nSelain Gini, alternatif metrik ketidakpastian lainnya adalah **Entropy** (digunakan pada algoritma ID3 dan C4.5):\n\n$$H(S) = -\\sum_{i=1}^C p_i \\log_2(p_i)$$\n\n**Mengapa Algoritma CART Lebih Memilih Gini Impurity?**\nGini Impurity hanya membutuhkan operasi perkalian kuadrat ($p_i^2$) dan pengurangan dasar yang sangat ramah komputasi prosesor, sedangkan Entropy memerlukan fungsi logaritma berbasis 2 ($\\log_2$). Pada dataset kompetisi besar dengan ribuan fitur dan kandidat split, **Gini Impurity dieksekusi berkali-kali lipat lebih cepat** dengan bentuk pohon keputusan yang nyaris identik.\n            "
      },
      {
        "id": "3-3",
        "title": "3.3 Perhitungan Gini Split & Information Gain",
        "readingTime": "12 menit",
        "content": "\n### 1. Algoritma Greedy Pembelahan Fitur (Best Split)\n\n#### Analogi Sederhana: Memotong Kumpulan Buah dengan Penggaris\nBayangkan Anda memiliki campuran buah apel dan jeruk di atas meja. Anda memegang sebilah penggaris lurus dan ingin memotong meja tersebut menjadi dua bagian (kiri dan kanan). \n\nKomputer akan mencoba meletakkan penggaris di berbagai posisi nilai (*threshold*):\n- Penggaris di posisi 1: Kiri ada 3 apel 2 jeruk, Kanan ada 1 apel 4 jeruk (Masih campur aduk).\n- Penggaris di posisi 2: Kiri ada 4 apel 0 jeruk (**Murni!**), Kanan ada 0 apel 6 jeruk (**Murni!**).\nKomputer langsung memilih Posisi 2 karena memisahkan buah dengan sempurna!\n\nCara kerja algoritma CART disebut **Greedy (Tamak)**: pada setiap simpul, komputer menguji seluruh kemungkinan garis potong pada seluruh fitur, lalu memilih pemotongan yang menghasilkan **Weighted Gini terendah** (penurunan kotor paling besar).\n\n---\n\n### 2. Formulasi Matematika Weighted Gini & Gain\n\n#### A. Weighted Gini Gabungan (Gini Split)\n$$I_{G,\\text{split}}(S, j, t) = \\frac{|S_L|}{|S|} I_G(S_L) + \\frac{|S_R|}{|S|} I_G(S_R)$$\n\n#### Bedah Simbol:\n- $S_L$: Cabang Kiri (Sampel dengan fitur $x_j \\le t$).\n- $S_R$: Cabang Kanan (Sampel dengan fitur $x_j > t$).\n- $|S_L| / |S|$: Bobot proporsi jumlah anggota cabang kiri terhadap total anggota simpul induk.\n- $I_G(S_L)$: Tingkat kotornya cabang kiri.\n\n#### B. Gini Gain (Penurunan Ketidakmurnian)\n$$\\Delta I_G = I_G(S_{\\text{parent}}) - I_{G,\\text{split}}(S, j, t)$$\n\nSemakin besar nilai $\\Delta I_G$, semakin hebat dan efektif pembelahan tersebut dalam memurnikan data.\n\n---\n\n### 3. Simulasi Hitung Manual Pembelahan Data dengan Angka Nyata\n\nMisalkan kita memiliki 6 sampel data siswa dengan fitur $[x: \\text{Jam Belajar}]$ dan target $[y \\in \\{0: \\text{Gagal}, 1: \\text{Lulus}\\}]$:\n\n| Siswa | Jam Belajar ($x$) | Hasil Ujian ($y$) |\n|---|---|---|\n| 1 | 1.0 | 0 (Gagal) |\n| 2 | 2.0 | 0 (Gagal) |\n| 3 | 3.0 | 1 (Lulus) |\n| 4 | 4.0 | 0 (Gagal) |\n| 5 | 5.0 | 1 (Lulus) |\n| 6 | 6.0 | 1 (Lulus) |\n\n#### Langkah 1: Hitung Gini Simpul Awal (Parent Node)\nTotal sampel $|S| = 6$: 3 Gagal ($y=0$), 3 Lulus ($y=1$).\n- $p_0 = \\frac{3}{6} = 0.5, \\quad p_1 = \\frac{3}{6} = 0.5$\n- $$I_G(S_{\\text{parent}}) = 1 - (0.5^2 + 0.5^2) = \\mathbf{0.500}$$\n\n#### Langkah 2: Evaluasi Kandidat Garis Potong Threshold $T_1 = 2.5$ jam\n- **Cabang Kiri ($x \\le 2.5$):** Siswa 1, 2 $\\implies$ Data: $[0, 0]$ (2 Gagal, 0 Lulus).\n  $$I_G(S_L) = 1 - (1.0^2 + 0^2) = \\mathbf{0.000} \\quad (\\text{Murni Sempurna!})$$\n- **Cabang Kanan ($x > 2.5$):** Siswa 3, 4, 5, 6 $\\implies$ Data: $[1, 0, 1, 1]$ (1 Gagal, 3 Lulus).\n  $$p_0 = \\frac{1}{4} = 0.25, \\quad p_1 = \\frac{3}{4} = 0.75$$\n  $$I_G(S_R) = 1 - (0.25^2 + 0.75^2) = 1 - (0.0625 + 0.5625) = 1 - 0.625 = \\mathbf{0.375}$$\n- **Weighted Gini untuk $T_1 = 2.5$:**\n  $$I_{G,\\text{split}} = \\frac{2}{6}(0.000) + \\frac{4}{6}(0.375) = 0 + \\frac{1.5}{6} = \\mathbf{0.250}$$\n- **Gini Gain:** $\\Delta I_G = 0.500 - 0.250 = \\mathbf{0.250}$\n\nPemisahan ini berhasil menurunkan ketidakmurnian dari 0.500 menjadi 0.250!\n            "
      },
      {
        "id": "3-4",
        "title": "3.4 Hyperparameter Pruning & Kontrol Overfitting",
        "readingTime": "9 menit",
        "content": "\n### 1. Bahaya Overfitting pada Decision Tree\n\n#### Analogi Sederhana: Pohon Rimbun yang Menghafal Setiap Helai Daun\nJika sebuah pohon dibiarkan tumbuh bebas tanpa batas (*unconstrained tree*), pohon akan terus membuat ranting baru untuk setiap satu data aneh atau pencilan (*outlier*). \n\nPohon yang terlalu rimbun semacam ini akan memiliki **akurasi data latih sempurna 100%**, namun saat diuji dengan data baru di lapangan, performanya akan anjlok drastis (**Overfitting**). Model tidak lagi mempelajari pola umum, melainkan menghafal kebisingan (*noise*).\n\n---\n\n### 2. Tiga Hyperparameter Kunci untuk Pemangkasan (Pruning)\n\nUntuk menjaga pohon tetap kokoh, sederhana, dan mampu menggeneralisasi data baru, kita menerapkan teknik **Pre-Pruning** (menghentikan pertumbuhan sebelum pohon menjadi terlalu liar):\n\n#### 1. `max_depth` (Batas Kedalaman Pohon)\nMembatasi berapa tingkat tingkatan cabang yang boleh dibuat dari simpul akar hingga ke daun.\n- Nilai ideal: $3$ sampai $5$.\n- Terlalu kecil ($1$) $\\implies$ Model terlalu bodoh / dangkal (**Underfitting**).\n- Terlalu besar ($> 15$) $\\implies$ Model terlalu menghafal (**Overfitting**).\n\n#### 2. `min_samples_split` (Minimal Anggota untuk Boleh Membelah)\nSyarat jumlah minimal data yang harus ada di dalam simpul agar diizinkan membuat cabang baru.\n- Misal disetel $= 10$. Jika suatu simpul hanya memiliki 6 sampel, simpul tersebut dilarang membelah lagi dan otomatis dinobatkan sebagai simpul daun (*leaf*).\n\n#### 3. `min_impurity_decrease` (Minimal Penurunan Gini)\nSimpul hanya diizinkan membelah jika nilai perbaikan kemurniannya ($\\Delta I_G$) bernilai signifikan, menghindari percabangan rumit yang hanya memperbaiki kemurnian sangat sedikit.\n\n> TIPS JUARA LKS AI:\n> Selalu batasi `max_depth` pada rentang $3$ s/d $5$ saat presentasi di hadapan juri LKS. Pohon dengan kedalaman 3-5 dapat divisualisasikan dengan sangat indah dan mudah dijelaskan logika bisnisnya kepada juri!\n            "
      },
      {
        "id": "3-5",
        "title": "3.5 Praktikum Koding: Class DecisionTree Manual",
        "readingTime": "11 menit",
        "content": "\nBerikut adalah implementasi lengkap algoritma Decision Tree (CART) berbasis objek Node rekursif murni menggunakan Python dan NumPy tanpa bantuan scikit-learn.\n\nPerhatikan kotak **Bedah Sintaks & Alur Perhitungan Matematis** di bawah kode untuk memahami bagaimana pencarian split terbaik, partisi boolean mask, dan rekursi pohon dikonstruksi secara teknis.\n            ",
        "codePath": "modelling/04_decision_tree/contoh_program.py",
        "syntaxBreakdown": [
          {
            "syntax": "counts = np.bincount(y); probabilities = counts / len(y)",
            "explanation": "np.bincount menghitung frekuensi kemunculan setiap kelas bilangan bulat di vektor label y. Kemudian dibagi total panjang sampel len(y) untuk menghasilkan vektor proporsi probabilitas p_i tiap kelas."
          },
          {
            "syntax": "return float(1.0 - np.sum(probabilities ** 2))",
            "explanation": "Menerapkan formula Gini Impurity: 1 - sum(p_i^2). Jika seluruh sampel memiliki label yang sama, p = [1.0] sehingga hasil fungsi bernilai 0.0 (simpul murni)."
          },
          {
            "syntax": "left_mask = values <= thresh; right_mask = ~left_mask",
            "explanation": "Membuat array penyeleksi boolean NumPy: elemen bernilai <= threshold masuk ke partisi kiri (left_mask), sedangkan sisanya (> threshold) masuk ke partisi kanan melalui operator negasi bitwise (~)."
          },
          {
            "syntax": "weighted_gini = (len(y_left)/n) * gini_left + (len(y_right)/n) * gini_right",
            "explanation": "Menghitung rata-rata tertimbang Gini Impurity dari kedua cabang anak, mencerminkan rumus Weighted Gini pembelahan."
          },
          {
            "syntax": "left_child = self._build_tree(X_left, y_left, depth + 1)",
            "explanation": "Panggilan rekursif untuk membangun sub-pohon di cabang kiri dengan menambah penanda kedalaman (depth + 1) hingga mencapai kondisi batas berhenti (stopping criteria)."
          }
        ]
      },
      {
        "id": "3-6",
        "title": "3.6 Studi Kasus: Autentikasi Uang Kertas Banknote (Kaggle)",
        "readingTime": "9 menit",
        "content": "\n### 1. Karakteristik Dataset Banknote Authentication\n\nDataset ini bersumber dari citra uang kertas asli dan palsu yang diekstraksi menggunakan Continuous Wavelet Transform (CWT). Terdiri dari 1.372 sampel dengan 4 fitur kontinu:\n1. **Variance** of Wavelet Transformed image\n2. **Skewness** of Wavelet Transformed image\n3. **Curtosis** of Wavelet Transformed image\n4. **Entropy** of image\n\nTarget: $0$ = Uang Kertas Asli, $1$ = Uang Kertas Palsu.\n\n---\n\n### 2. Eksekusi Script & Visualisasi Pohon ASCII\n\nJalankan script di bawah ini untuk mengamati proses pelatihan model Decision Tree manual, visualisasi percabangan pohon dalam format teks ASCII yang elegan, serta evaluasi akurasinya yang mencapai **94.55%**.\n            ",
        "codePath": "modelling/04_decision_tree/studi_kasus.py",
        "syntaxBreakdown": [
          {
            "syntax": "X, y, feature_names = load_banknote()",
            "explanation": "Memuat dataset 1.372 baris uang kertas dari file datasets/banknote.csv menggunakan helper loader data_helper.py."
          },
          {
            "syntax": "tree = DecisionTreeManual(max_depth=4, min_samples_split=5)",
            "explanation": "Menginisialisasi hyperparameter pre-pruning: membatasi kedalaman pohon maksimal 4 level dan syarat minimal 5 sampel untuk membelah simpul."
          },
          {
            "syntax": "tree.fit(X_train, y_train)",
            "explanation": "Membangun seluruh simpul pohon keputusan secara rekursif berbasis minimisasi Gini Impurity dari data latih."
          }
        ]
      }
    ]
  },
  {
    "id": "mod-4",
    "title": "Bab 4: Gaussian Naive Bayes",
    "icon": "04",
    "lessons": [
      {
        "id": "4-1",
        "title": "4.1 Teorema Bayes & Asumsi Kemandirian Bersyarat (Naive)",
        "readingTime": "10 menit",
        "content": "\n### 1. Fondasi Teorema Bayes\n\n#### Analogi Sederhana: Dokter yang Memperkirakan Peluang Penyakit\nBayangkan seorang pasien datang ke klinik dokter dengan keluhan: bersin-bersin, hidung tersumbat, dan tenggorokan gatal. Dokter ingin menebak apakah pasien tersebut terkena **Flu Biasa** atau **Penyakit Paru-Paru Langka**:\n\n1. **Peluang Awal (*Prior Probability*):** Dokter tahu bahwa kasus flu biasa sangat sering terjadi di masyarakat umum ($95\\%$), sedangkan penyakit paru-paru langka amat sangat jarang ($0.1\\%$).\n2. **Kecocokan Gejala (*Likelihood*):** Dokter mengecek seberapa cocok gejala bersin dan hidung tersumbat dengan penyakit flu? Sangat cocok!\n3. **Peluang Akhir (*Posterior Probability*):** Dokter menggabungkan peluang awal dengan bukti gejala baru: meskipun ada kemungkinan kecil penyakit paru-paru, kesimpulan paling masuk akal adalah pasien terkena Flu Biasa.\n\nInti filosofi **Teorema Bayes (Thomas Bayes, 1763)** adalah: **\"Memperbarui tingkat keyakinan awal kita (*Prior*) setelah kita menemukan bukti atau fakta pendukung yang baru (*Likelihood*).\"**\n\nSecara matematis, rumusnya dituliskan sebagai:\n$$P(y = c \\mid \\mathbf{x}) = \\frac{P(\\mathbf{x} \\mid y = c) \\cdot P(y = c)}{P(\\mathbf{x})}$$\n\n#### Bedah Simbol Empat Pilar Rumus Bayes:\n1. **$P(y = c \\mid \\mathbf{x})$ (Posterior):** Peluang bahwa data tersebut adalah kelas $c$ **setelah** kita melihat nilai fitur $\\mathbf{x}$ (Inilah yang ingin kita tebak).\n2. **$P(y = c)$ (Prior):** Peluang awal kelas $c$ di alam nyata **sebelum** melihat data baru:\n   $$P(y = c) = \\frac{N_c}{N}$$\n   *(Berapa persen data kelas $c$ di dalam seluruh dataset latihan?)*\n3. **$P(\\mathbf{x} \\mid y = c)$ (Likelihood):** Seberapa besar kemungkinan ciri-ciri $\\mathbf{x}$ muncul jika kondisi kelas $c$ benar-benar terjadi?\n4. **$P(\\mathbf{x})$ (Evidence):** Peluang total munculnya kombinasi fitur $\\mathbf{x}$ di semua kelas. Karena nilai penyebut ini sama persis untuk semua kelas, nilainya bisa diabaikan saat mencari kelas dengan nilai terbesar ($\\operatorname{argmax}$).\n\n---\n\n### 2. Mengapa Disebut 'Naive' (Naif / Polos)?\n\n#### Analogi Asumsi \"Polos\"\nDi dunia nyata, gejala penyakit seringkali saling berkaitan erat: orang yang demam tinggi biasanya juga merasa kedinginan dan menggigil. \n\nNamun, jika komputer harus menghitung hubungan saling keterkaitan antar seluruh fitur secara bersamaan, rumusnya akan menjadi sangat rumit dan membutuhkan jutaan baris data agar akurat (*Joint Density Estimation*).\n\nAlgoritma Naive Bayes mengambil asumsi penyederhanaan yang sangat berani (sehingga disebut **Naif / Polos**): **Setiap fitur dianggap berdiri sendiri secara mandiri (*conditionally independent*) tanpa saling mempengaruhi sama sekali jika kelasnya sudah diketahui**:\n\n$$P(\\mathbf{x} \\mid y = c) = P(x_1 \\mid y = c) \\times P(x_2 \\mid y = c) \\times \\dots \\times P(x_m \\mid y = c) = \\prod_{j=1}^m P(x_j \\mid y = c)$$\n\nWalaupun asumsi \"polos\" ini hampir tidak pernah benar $100\\%$ di dunia nyata, secara menakjubkan Naive Bayes terbukti sangat akurat, tangguh, dan luar biasa cepat pada tugas klasifikasi teks, penyaringan email spam, dan analisis data laboratorium.\n            "
      },
      {
        "id": "4-2",
        "title": "4.2 Distribusi Gaussian & Trik Log-Likelihood",
        "readingTime": "12 menit",
        "content": "\n### 1. Gaussian Probability Density Function (Fitur Kontinu)\n\nBagaimana cara menghitung probabilitas $P(x_j \\mid y=c)$ jika data kita berbentuk angka kontinu riil (seperti kadar alkohol pada minuman anggur atau tekanan darah pasien)?\n\nPada **Gaussian Naive Bayes**, kita mengasumsikan bahwa sebaran data kontinu pada masing-masing kelas membentuk **Kurva Lonceng Normal Gauss**:\n\n$$P(x_j \\mid y = c) = \\frac{1}{\\sqrt{2\\pi \\sigma_{c,j}^2}} \\exp\\left( -\\frac{(x_j - \\mu_{c,j})^2}{2\\sigma_{c,j}^2} \\right)$$\n\n#### Bedah Simbol Rumus Gaussian:\n- $\\mu_{c,j}$ (Mean): Nilai rata-rata fitur ke-$j$ khusus untuk data kelas $c$ (titik puncak kurva lonceng).\n- $\\sigma_{c,j}^2$ (Variance): Lebar sebaran data fitur ke-$j$ pada kelas $c$.\n- $x_j - \\mu_{c,j}$: Jarak selisih nilai sampel terhadap rata-rata kelasnya. Semakin dekat nilai $x_j$ ke titik tengah $\\mu$, semakin tinggi nilai peluang kemunculannya!\n\nModel hanya perlu mempelajari dan menyimpan dua angka saja untuk setiap kolom: nilai **rata-rata ($\\mu$)** dan nilai **variansi ($\\sigma^2$)**!\n\n---\n\n### 2. Masalah Fatal: Arithmetic Underflow\n\n> JEBAKAN UJIAN LKS AI:\n> Jika Anda mengimplementasikan rumus Naive Bayes dengan mengalikan probabilitas desimal secara langsung ($\\prod P(x_j \\mid y)$), kode Anda akan mengalami kegagalan fatal berupa **Arithmetic Underflow**.\n\n#### Mengapa Arithmetic Underflow Terjadi?\nBayangkan jika dataset Anda memiliki 20 kolom fitur. Masing-masing kolom menghasilkan angka desimal kecil, misalnya $0.01$. Jika Anda mengalikan 20 angka desimal tersebut:\n$$0.01 \\times 0.01 \\times \\dots \\times 0.01 = 0.01^{20} = 10^{-40}$$\nAngka sekecil $10^{-40}$ berada di bawah batas ketelitian chip prosesor komputer ($< 10^{-308}$). Akibatnya, komputer secara sepihak membulatkannya menjadi **$0.0$ mutlak**! Seluruh kelas akan menghasilkan probabilitas 0, membuat model bingung dan tidak mampu menebak kelas apapun.\n\n---\n\n### 3. Solusi Elegan: Trik Log-Likelihood\n\nUntuk mengatasi bencana tersebut, para ilmuwan matematika memanfaatkan sifat sakti logaritma: **logaritma dari perkalian adalah penjumlahan dari logaritma**:\n\n$$\\ln(a \\times b) = \\ln(a) + \\ln(b)$$\n\nDengan membungkus rumus dengan fungsi logaritma natural ($\\ln$):\n\n$$\\ln P(y = c \\mid \\mathbf{x}) \\propto \\ln P(y = c) + \\sum_{j=1}^m \\ln P(x_j \\mid y = c)$$\n\nSubstitusi fungsi Gaussian ke dalam bentuk logaritma:\n\n$$\\ln P(x_j \\mid y = c) = -\\frac{1}{2} \\ln(2\\pi \\sigma_{c,j}^2) - \\frac{(x_j - \\mu_{c,j})^2}{2\\sigma_{c,j}^2}$$\n\n#### Mengapa Trik Ini Menyelamatkan Model?\n1. Operasi perkalian desimal yang rawan punah diubah menjadi **operasi penjumlahan aritmatika biasa yang kokoh dan stabil**.\n2. Nilai skor tidak pernah menjadi 0 mutlak, memusnahkan bahaya *arithmetic underflow* selamanya.\n3. Kelas yang dipilih adalah kelas yang menghasilkan skor log-posterior paling tinggi ($\\operatorname{argmax}_c$).\n            "
      },
      {
        "id": "4-3",
        "title": "4.3 Praktikum Koding: Class GaussianNB Manual (Pure NumPy)",
        "readingTime": "10 menit",
        "content": "\nBerikut adalah implementasi lengkap algoritma Gaussian Naive Bayes mandiri menggunakan formulasi log-likelihood dan vektorisasi NumPy tanpa pustaka scikit-learn.\n\nPerhatikan kotak **Bedah Sintaks & Alur Perhitungan Matematis** di bawah untuk memahami estimasi parameter mean-varians dan kalkulasi fungsi kepadatan Gaussian.\n            ",
        "codePath": "modelling/05_naive_bayes/contoh_program.py",
        "syntaxBreakdown": [
          {
            "syntax": "self.priors[c] = float(len(X_c) / n_samples)",
            "explanation": "Menghitung Prior Probability P(y = c): rasio jumlah sampel yang tergolong kelas c (len(X_c)) terhadap total seluruh baris data latihan."
          },
          {
            "syntax": "self.means[c] = np.mean(X_c, axis=0)",
            "explanation": "Menghitung nilai rata-rata tiap fitur khusus untuk kelompok data kelas c sepanjang sumbu vertikal (axis=0), menghasilkan vektor parameter mu_c,j."
          },
          {
            "syntax": "self.vars[c] = np.var(X_c, axis=0) + self.var_smoothing",
            "explanation": "Menghitung variansi tiap fitur pada kelas c, ditambahkan konstanta var_smoothing (1e-9) untuk mencegah crash pembagian dengan nol jika variansi fitur bernilai 0 (laplace/variance stabilization)."
          },
          {
            "syntax": "log_prob = -0.5 * np.sum(np.log(2.0 * np.pi * var) + ((x - mean) ** 2) / var)",
            "explanation": "Implementasi rumus Log-Likelihood Gaussian secara vectorized: menghitung log densitas Gaussian untuk seluruh fitur sekaligus tanpa perulangan, lalu menjumlahkannya dengan np.sum."
          },
          {
            "syntax": "posterior = np.log(self.priors[c]) + log_likelihood",
            "explanation": "Menjumlahkan log-prior dengan log-likelihood kumulatif untuk menghasilkan skor log-posterior akhir bagi masing-masing kandidat kelas."
          }
        ]
      },
      {
        "id": "4-4",
        "title": "4.4 Studi Kasus: Klasifikasi Wine Cultivars (Kaggle)",
        "readingTime": "8 menit",
        "content": "\n### 1. Karakteristik Dataset Wine Cultivars\n\nDataset Wine Cultivars terdiri dari 178 sampel minuman anggur dari 3 kultivar kebun anggur berbeda di Italia. Memiliki 13 fitur kimiawi kontinu berdimensi tinggi:\n- Kadar Alkohol\n- Asam Malat (*Malic Acid*)\n- Kandungan Abu (*Ash*)\n- Magnesium, Flavonoid, Fenol, dan Intensitas Warna\n\nTarget: 3 kultivar kebun anggur ($0, 1, 2$).\n\n---\n\n### 2. Eksekusi Script & Evaluasi Model\n\nJalankan script di bawah ini untuk melihat kehebatan Gaussian Naive Bayes buatan sendiri yang mampu mencapai akurasi **100% sempurna** pada data uji Wine berkat pemodelan kurva densitas yang presisi.\n            ",
        "codePath": "modelling/05_naive_bayes/studi_kasus.py",
        "syntaxBreakdown": [
          {
            "syntax": "X, y, target_names = load_wine()",
            "explanation": "Memuat dataset benchmark Wine 178 baris dari datasets/wine.csv melalui helper loader data_helper.py."
          },
          {
            "syntax": "model = GaussianNBManual(); model.fit(X_train, y_train)",
            "explanation": "Melatih model Naive Bayes: menghitung vektor mean dan variansi tiap kultivar secara instan tanpa looping berulang."
          },
          {
            "syntax": "report = classification_report(y_test, y_pred)",
            "explanation": "Menghitung metrik presisi, recall, dan f1-score untuk masing-masing kultivar anggur pada data uji."
          }
        ]
      }
    ]
  },
  {
    "id": "mod-5",
    "title": "Bab 5: Regresi Linier (Linear Regression)",
    "icon": "05",
    "lessons": [
      {
        "id": "5-1",
        "title": "5.1 Konsep Garis Regresi, Hipotesis, & Residual",
        "readingTime": "11 menit",
        "content": "\n### 1. Masalah Regresi: Pemodelan Nilai Riil Kontinu\n\n#### Analogi Sederhana: Menaksir Harga Berdasarkan Pola\nBayangkan Anda ingin menaksir harga rumah seken di suatu kawasan. Anda mengamati bahwa rumah seluas $60\\,\\text{m}^2$ dijual seharga 300 juta, dan rumah $100\\,\\text{m}^2$ seharga 500 juta. Jika ada rumah seluas $80\\,\\text{m}^2$, berapa harga yang wajar? Secara intuitif, pikiran Anda langsung menarik pola garis lurus di antara titik-titik tersebut dan memperkirakan nilainya sekitar 400 juta.\n\nBerbeda dengan tugas **Klasifikasi** yang memprediksi label diskret (seperti *Spam* vs *Bukan Spam*, atau *Kanker Jinak* vs *Ganas*), tugas **Regresi** bertujuan memodelkan hubungan matematis untuk memprediksi angka riil kontinu ($y \\in \\mathbb{R}$):\n- Memprediksi angka penjualan barang berdasarkan anggaran belanja iklan di berbagai media.\n- Memprediksi konsumsi bahan bakar kendaraan berdasarkan bobot mesin dan aerodinamika.\n- Memprediksi suhu udara besok berdasarkan tekanan atmosfer dan kelembaban hari ini.\n\n---\n\n### 2. Fungsi Hipotesis Linier (Linear Hypothesis)\n\n#### Analogi Tali Karet Elastis OLS\nBayangkan sekelompok paku tertancap di atas papan kayu datar (titik-titik data). Kita membentangkan sebatang penggaris kayu lurus di tengah-tengah kumpulan paku tersebut, lalu mengikat setiap paku ke penggaris menggunakan tali karet elastis secara tegak lurus vertikal. \n\nPenggaris kayu tersebut akan otomatis berotasi dan bergeser sampai total tarikan regangan tali karet elastis mencapai titik keseimbangan minimum terendah. Batang penggaris lurus dalam posisi seimbang itulah yang disebut **Garis Regresi Linier**, dan panjang tarikan tali karet elastis pada tiap paku adalah **Residual (Galat)**!\n\nPada satu fitur input univariat ($x$), garis pemodelan dinyatakan dalam persamaan aljabar:\n\n$$\\hat{y} = w \\cdot x + b$$\n\nPada data multivariat dengan $m$ fitur masukan ($\\mathbf{x} = [x_1, x_2, \\dots, x_m]^T$):\n\n$$\\hat{y} = w_1 x_1 + w_2 x_2 + \\dots + w_m x_m + b = \\mathbf{x}^T \\mathbf{w} + b$$\n\nDalam notasi matriks untuk seluruh $N$ baris data sekaligus:\n\n$$\\hat{\\mathbf{y}} = X \\mathbf{w} + b$$\n\n#### Bedah Simbol Rumus Hipotesis:\n1. **$\\hat{y}$ (y-hat):** Nilai kontinu hasil estimasi prediksi model. Tanda topi (*hat*) melambangkan taksiran buatan model, bukan fakta mutlak di alam nyata.\n2. **$\\mathbf{x} = [x_1, x_2, \\dots, x_m]^T$:** Vektor fitur masukan (misalnya: $[x_1 = \\text{luas bangunan}, x_2 = \\text{jumlah kamar}, x_3 = \\text{usia bangunan}]$).\n3. **$\\mathbf{w} = [w_1, w_2, \\dots, w_m]^T$:** Vektor bobot koefisien kemiringan (*weights / slopes*). Menunjukkan sensitivitas target: jika nilai fitur $x_j$ naik $1$ satuan, seberapa besar nilai prediksi $\\hat{y}$ akan bertambah ($w_j > 0$) atau berkurang ($w_j < 0$).\n4. **$b$ (Bias / Intercept):** Titik potong garis pada sumbu vertikal ketika seluruh fitur bernilai nol ($\\mathbf{x} = \\mathbf{0}$). Misal harga dasar kavling tanah kosong sebelum dibangun bangunan apa pun.\n5. **$X$:** Matriks data fitur berukuran $(N \\times m)$, di mana baris mewakili sampel dan kolom mewakili variabel fitur.\n\n---\n\n### 3. Konsep Residual (Galat / Error)\n\nUntuk setiap baris observasi ke-$i$, selalu terdapat selisih antara nilai target aktual ($y_i$) dengan nilai estimasi garis model ($\\hat{y}_i$). Selisih vertikal ini disebut **Residual**:\n\n$$e_i = y_i - \\hat{y}_i = y_i - (\\mathbf{x}_i^T \\mathbf{w} + b)$$\n\n#### Tiga Skenario Nilai Residual:\n1. **$e_i = 0$:** Garis model melintas tepat menembus titik data aktual (prediksi sempurna tanpa cela).\n2. **$e_i > 0$:** Nilai aktual berada di atas garis model (*under-estimation*, model menaksir terlalu rendah).\n3. **$e_i < 0$:** Nilai aktual berada di bawah garis model (*over-estimation*, model menaksir terlalu tinggi).\n\nTujuan utama algoritma Regresi Linier adalah menemukan kombinasi parameter optimal $\\mathbf{w}^*$ dan $b^*$ yang meminimalkan total akumulasi residual di seluruh dataset pelatihan.\n            "
      },
      {
        "id": "5-2",
        "title": "5.2 Cost Function MSE & Penurunan Matematis Gradient Descent",
        "readingTime": "15 menit",
        "content": "\n### 1. Fungsi Biaya MSE (Mean Squared Error Cost Function)\n\nMengapa kita tidak menjumlahkan residual biasa $\\sum e_i$? Karena residual positif ($+5$) dan residual negatif ($-5$) akan saling meniadakan ($+5 + (-5) = 0$). Komputer akan mengira garis model sudah sempurna, padahal kedua tebakan tersebut meleset jauh!\n\nUntuk mengatasinya, kita mengkuadratkan setiap selisih galat. Metode ini dikenal sebagai **Ordinary Least Squares (OLS)** dengan fungsi biaya matematis:\n\n$$J(\\mathbf{w}, b) = \\frac{1}{2N} \\sum_{i=1}^N (\\hat{y}_i - y_i)^2 = \\frac{1}{2N} \\sum_{i=1}^N (\\mathbf{x}_i^T \\mathbf{w} + b - y_i)^2$$\n\n#### Bedah Simbol Rumus MSE:\n- **$J(\\mathbf{w}, b)$:** Nilai kerugian total (*Cost/Loss*). Semakin mendekati nol, semakin presisi garis model.\n- **$N$:** Total banyaknya sampel data latihan.\n- **$(\\hat{y}_i - y_i)^2$:** Kuadrat selisih galat. Kuadrat memberikan dua keunggulan:\n  1. Menjamin seluruh nilai bernilai non-negatif ($\\ge 0$).\n  2. Memberikan hukuman (*penalty*) yang jauh lebih berat bagi tebakan yang melenceng jauh (kesalahan selisih $10$ dihukum $100$, bukan sekadar $10$).\n- **Faktor $\\frac{1}{2}$:** Konstanta pengali penyederhana matematika agar saat diturunkan dengan kalkulus ($2 \\times \\frac{1}{2} = 1$), angka $2$ dari turunan kuadrat saling membatalkan secara rapi.\n\n---\n\n### 2. Algoritma Optimasi: Gradient Descent\n\n#### Analogi: Menuruni Lembah Gunung Berkabut Tebal\nBayangkan Anda berada di puncak lereng gunung di malam gelap dengan kabut yang sangat pekat, sehingga Anda tidak dapat melihat dasar lembah. Tugas Anda adalah menemukan titik terendah (dasar lembah di mana fungsi biaya $J$ paling minimum):\n\n1. **Merasakan Kemiringan Lereng:** Anda menggunakan telapak kaki untuk merasakan ke arah mana tanah menurun paling curam. Arah penurunan tercuram ini adalah **Negatif Gradien ($-\\nabla J$)**.\n2. **Melangkah Turun:** Anda mengambil satu langkah menuruni lereng ke arah tersebut.\n3. **Ukuran Langkah Kaki (Learning Rate $\\alpha$):**\n   - Jika langkah Anda teramat kecil ($\\alpha = 0.000001$), Anda butuh jutaan langkah dan berjam-jam untuk sampai ke dasar.\n   - Jika langkah Anda berupa lompatan raksasa yang membabi buta ($\\alpha = 5.0$), Anda akan melompati dasar lembah dan menabrak tebing seberang, bahkan terlempar semakin tinggi ke atas tebing (*divergence / exploding gradient*)!\n\n---\n\n### 3. Penurunan Turunan Parsial (Calculus Derivation)\n\nUntuk mencari arah lereng penyesuaian bobot $\\mathbf{w}$ dan bias $b$, kita menerapkan aturan rantai kalkulus (*Chain Rule*):\n\nMisalkan $u_i = \\hat{y}_i - y_i = (\\mathbf{x}_i^T \\mathbf{w} + b - y_i)$, maka $J = \\frac{1}{2N} \\sum u_i^2$.\n\n#### A. Turunan Parsial terhadap Bobot $\\mathbf{w}$:\n$$\\frac{\\partial J}{\\partial \\mathbf{w}} = \\frac{1}{2N} \\sum_{i=1}^N 2 u_i \\cdot \\frac{\\partial u_i}{\\partial \\mathbf{w}} = \\frac{1}{N} \\sum_{i=1}^N (\\hat{y}_i - y_i) \\cdot \\mathbf{x}_i = \\frac{1}{N} X^T (\\hat{\\mathbf{y}} - \\mathbf{y})$$\n\n#### B. Turunan Parsial terhadap Bias $b$:\n$$\\frac{\\partial J}{\\partial b} = \\frac{1}{2N} \\sum_{i=1}^N 2 u_i \\cdot \\frac{\\partial u_i}{\\partial b} = \\frac{1}{N} \\sum_{i=1}^N (\\hat{y}_i - y_i)$$\n\n#### Aturan Pembaruan Parameter (Gradient Descent Update Rule):\n$$\\mathbf{w} := \\mathbf{w} - \\alpha \\frac{\\partial J}{\\partial \\mathbf{w}}, \\quad b := b - \\alpha \\frac{\\partial J}{\\partial b}$$\n\nSimbol $:=$ berarti nilai lama di memori digantikan oleh nilai baru pada setiap putaran epoch. Tanda minus menjamin model selalu bergerak berlawanan arah dengan tanjakan lereng (menuruni bukit biaya).\n\n---\n\n### 4. Simulasi Hitung Manual 1 Epoch dengan Angka Nyata\n\nMisalkan kita memiliki 2 sampel data sederhana univariat:\n- Sampel 1: $x_1 = 1, \\quad y_1 = 2$\n- Sampel 2: $x_2 = 2, \\quad y_2 = 4$\n*(Target matematis sejati yang dicari adalah $y = 2x$, yaitu $w = 2.0$ dan $b = 0.0$)*.\n\nKita mulai pelatihan dari titik nol:\n$$w_0 = 0.0, \\quad b_0 = 0.0, \\quad \\text{Learning Rate } \\alpha = 0.1, \\quad N = 2$$\n\n#### Langkah 1: Hitung Prediksi Awal ($\\hat{y} = w \\cdot x + b$)\n- $\\hat{y}_1 = (0.0)(1) + 0.0 = 0.0$\n- $\\hat{y}_2 = (0.0)(2) + 0.0 = 0.0$\n\n#### Langkah 2: Hitung Selisih Galat ($e_i = \\hat{y}_i - y_i$)\n- $e_1 = 0.0 - 2 = -2.0$\n- $e_2 = 0.0 - 4 = -4.0$\n\n#### Langkah 3: Hitung Gradien Turunan Parsial\n- **Gradien Bobot ($dw$):**\n  $$\\frac{\\partial J}{\\partial w} = \\frac{1}{2} \\left[ (-2.0)(1) + (-4.0)(2) \\right] = \\frac{1}{2} [-2.0 - 8.0] = \\frac{-10.0}{2} = \\mathbf{-5.0}$$\n- **Gradien Bias ($db$):**\n  $$\\frac{\\partial J}{\\partial b} = \\frac{1}{2} \\left[ (-2.0) + (-4.0) \\right] = \\frac{-6.0}{2} = \\mathbf{-3.0}$$\n\n#### Langkah 4: Perbarui Nilai Bobot dan Bias\n- $$w_{\\text{baru}} = 0.0 - (0.1 \\times (-5.0)) = 0.0 + 0.5 = \\mathbf{+0.5}$$\n- $$b_{\\text{baru}} = 0.0 - (0.1 \\times (-3.0)) = 0.0 + 0.3 = \\mathbf{+0.3}$$\n\nHanya dalam 1 iterasi saja, nilai bobot $w$ langsung bergerak naik dari $0.0$ menuju angka target positif $2.0$!\n            "
      },
      {
        "id": "5-3",
        "title": "5.3 Praktikum Koding: Class LinearRegressionGD Manual",
        "readingTime": "11 menit",
        "content": "\nBerikut adalah implementasi lengkap algoritma Regresi Linier berbasis optimasi Gradient Descent matriks murni NumPy tanpa pustaka eksternal.\n\nPerhatikan kotak **Bedah Sintaks & Alur Perhitungan Matematis** di bawah untuk memahami perkalian titik dot product matriks `np.dot` dan pembaruan gradien.\n            ",
        "codePath": "modelling/02_regresi_linear/contoh_program.py",
        "syntaxBreakdown": [
          {
            "syntax": "y_pred = np.dot(X, self.weights) + self.bias",
            "explanation": "Operasi aljabar linier matriks: Menghitung perkalian dot product antara matriks fitur X berukuran (N, m) dengan vektor bobot weights berukuran (m,), lalu menambahkan skalar bias. Menghasilkan vektor prediksi kontinu berukuran (N,)."
          },
          {
            "syntax": "errors = y_pred - y",
            "explanation": "Menghitung vektor selisih galat (residual) antara hasil estimasi model dengan fakta target sesungguhnya untuk seluruh N sampel observasi."
          },
          {
            "syntax": "dw = (1.0 / n_samples) * np.dot(X.T, errors)",
            "explanation": "Kalkulasi gradien bobot turunan parsial: Melakukan perkalian dot product antara transpos matriks fitur X.T berukuran (m, N) dengan vektor residual berukuran (N,), kemudian dibagi total sampel n_samples."
          },
          {
            "syntax": "db = (1.0 / n_samples) * np.sum(errors)",
            "explanation": "Kalkulasi gradien bias: Menjumlahkan seluruh elemen residual sepanjang dataset, lalu dibagi total observasi."
          },
          {
            "syntax": "self.weights -= self.lr * dw; self.bias -= self.lr * db",
            "explanation": "Aturan pembaruan parameter Gradient Descent: Memperbarui nilai bobot dan bias ke arah yang berlawanan dengan vektor gradien sebanding dengan tingkat pembelajaran (learning rate)."
          }
        ]
      },
      {
        "id": "5-4",
        "title": "5.4 Studi Kasus: Prediksi Penjualan Sales Advertising (Kaggle)",
        "readingTime": "10 menit",
        "content": "\n### 1. Karakteristik Dataset Advertising Benchmark\n\nDataset Advertising memodelkan hubungan antara alokasi anggaran belanja iklan di tiga saluran media terhadap angka penjualan produk (*Sales* dalam ribuan unit):\n1. **TV Budget** (dalam ribuan dollar)\n2. **Radio Budget**\n3. **Newspaper Budget**\n\nDataset terdiri dari 200 sampel riil. Kita menguji seberapa akurat kombinasi anggaran iklan ini dapat memprediksi performa penjualan ritel.\n\n---\n\n### 2. Eksekusi Script & Evaluasi Metrik $R^2$\n\nJalankan script di bawah ini untuk melihat pelatihan model Regresi Linier Gradient Descent manual yang mencapai performa koefisien determinasi **$R^2 = 86.03\\%$**.\n            ",
        "codePath": "modelling/02_regresi_linear/studi_kasus.py",
        "syntaxBreakdown": [
          {
            "syntax": "X, y, feature_names = load_advertising()",
            "explanation": "Memuat dataset benchmark Advertising (200 sampel, 3 fitur belanja iklan) dari file lokal datasets/advertising.csv."
          },
          {
            "syntax": "model = LinearRegressionGD(learning_rate=0.05, n_epochs=1000)",
            "explanation": "Menginisialisasi model Regresi Linier dengan laju pembelajaran 0.05 dan 1.000 putaran epoch optimasi gradien."
          },
          {
            "syntax": "r2 = r2_score(y_test, y_pred)",
            "explanation": "Menghitung nilai koefisien determinasi R-Squared pada data uji, membuktikan model mampu menjelaskan 86.03% variabilitas penjualan."
          }
        ]
      }
    ]
  },
  {
    "id": "mod-6",
    "title": "Bab 6: Regresi Logistik (Logistic Regression)",
    "icon": "06",
    "lessons": [
      {
        "id": "6-1",
        "title": "6.1 Batasan Fatal Regresi Linier untuk Kasus Klasifikasi",
        "readingTime": "10 menit",
        "content": "\n### 1. Mengapa Kita Tidak Boleh Memakai Regresi Linier untuk Klasifikasi?\n\n#### Analogi Saklar Dimmer Lampu vs Saklar Biasa\nBayangkan saklar lampu di dinding rumah Anda. Saklar biasa hanya memiliki dua posisi: MATI ($0$) atau HIDUP ($1$). Ketika kita ingin memprediksi kemungkinan suatu peristiwa (misalnya: *\"Apakah pasien ini menderita diabetes atau sehat?\"*), jawaban kaku Ya/Tidak seringkali kurang memuaskan. Dokter ingin mengetahui **derajat keyakinan probabilitas**: apakah peluang sakitnya $15\\%$ (hampir pasti sehat), $51\\%$ (sedikit ragu-ragu di ambang batas), atau $99\\%$ (sangat gawat darurat)?\n\nKita membutuhkan kurva pengatur seperti saklar putar *dimmer* lampu yang cahayanya bisa diatur halus mulai dari padam total ($0.0$) hingga benderang terang ($1.0$).\n\nBanyak pemula tergoda berpikir: *\"Mengapa kita tidak memakai rumus Regresi Linier biasa $\\hat{y} = w \\cdot x + b$, lalu kita buat aturan: jika hasil tebakan $\\ge 0.5$ tebak kelas 1, jika $< 0.5$ tebak kelas 0?\"*\n\nPendekatan tersebut memiliki dua kelemahan matematis yang sangat fatal:\n\n---\n\n#### Kelemahan 1: Rentang Prediksi Tanpa Batas (Melanggar Aksioma Probabilitas)\nFungsi garis lurus regresi linier membentang bebas tanpa batas dari minus tak hingga hingga positif tak hingga ($-\\infty < \\hat{y} < +\\infty$):\n- Untuk pasien dengan kadar gula darah sangat tinggi, regresi linier bisa menghasilkan angka $\\hat{y} = 2.8$.\n- Untuk pasien dengan kadar gula darah sangat rendah, regresi linier bisa memprediksi $\\hat{y} = -0.6$.\n\nMenurut aksioma dasar teori probabilitas Kolmogorov, suatu nilai peluang wajib terkurung rapat di dalam rentang tertutup $[0.0, 1.0]$. Angka tebakan seperti $-0.6$ atau $2.8$ tidak memiliki arti matematis sama sekali sebagai ukuran keyakinan (*nonsense probability*).\n\n---\n\n#### Kelemahan 2: Sensitivitas Ekstrem terhadap Pencilan (Outlier)\nBayangkan ada satu orang pasien yang kadar gula darahnya luar biasa tinggi ($400\\,\\text{mg/dL}$), dan dokter sudah $100\\%$ yakin orang tersebut positif diabetes ($y=1$).\n\nJika kita menggunakan regresi linier, titik ekstrem di ujung kanan atas ini akan menarik garis lurus miring ke atas secara drastis (*leverage effect*). Akibatnya, titik perpotongan garis dengan ambang batas $0.5$ akan bergeser jauh sekali ke kanan. Dampak fatalnya: banyak pasien positif diabetes lainnya yang memiliki gula darah sedang (misal $180\\,\\text{mg/dL}$) tiba-tiba jatuh di bawah ambang batas $0.5$ dan salah divonis sehat!\n\nOleh karena itu, kita membutuhkan kurva matematis khusus yang mampu **menjepit garis bilangan riil tak hingga menjadi kurva berbentuk S mulus** yang dijamin tidak akan pernah melampaui batas $0.0$ dan $1.0$.\n            "
      },
      {
        "id": "6-2",
        "title": "6.2 Fungsi Sigmoid & Penurunan Loss Function Log-Loss",
        "readingTime": "14 menit",
        "content": "\n### 1. Fungsi Aktivasi Sigmoid (Logistic Function)\n\nRegresi Logistik menyelesaikan dilema klasifikasi dengan melewatkan kombinasi linier $z = \\mathbf{x}^T \\mathbf{w} + b$ ke dalam corong pelengkung kurva yang disebut **Fungsi Aktivasi Sigmoid**:\n\n$$\\sigma(z) = \\frac{1}{1 + e^{-z}}$$\n\n#### Bedah Simbol Rumus Sigmoid:\n1. **$z = \\mathbf{x}^T \\mathbf{w} + b$ (Logits):** Nilai kombinasi linier fitur dan bobot. Angka riil bebas yang bisa bernilai negatif besar, nol, atau positif besar.\n2. **$e$:** Bilangan konstan Euler ($\\approx 2.71828$).\n3. **$e^{-z}$:** Komponen peluruh eksponensial:\n   - Jika nilai $z$ sangat positif ($z \\to +\\infty$): Nilai $e^{-z} \\to 0$, sehingga $\\sigma(z) \\to \\frac{1}{1 + 0} = \\mathbf{1.0}$.\n   - Jika nilai $z = 0$: Nilai $e^{0} = 1$, sehingga $\\sigma(z) = \\frac{1}{1 + 1} = \\mathbf{0.5}$ (Garis Batas Keputusan / *Decision Boundary*).\n   - Jika nilai $z$ sangat negatif ($z \\to -\\infty$): Nilai $e^{-z} \\to +\\infty$, sehingga $\\sigma(z) \\to \\frac{1}{1 + \\infty} = \\mathbf{0.0}$.\n4. **$\\sigma(z)$ (Sigma):** Nilai probabilitas kontinu dalam rentang terbuka $(0.0, 1.0)$. Nilai ini secara sah melambangkan keyakinan peluang bahwa sampel tersebut merupakan anggota kelas positif:\n\n$$\\hat{y} = P(y = 1 \\mid \\mathbf{x}) = \\sigma(\\mathbf{x}^T \\mathbf{w} + b)$$\n\n---\n\n### 2. Mengapa MSE Gagal Total pada Regresi Logistik?\n\nJika kita memaksakan fungsi non-linier Sigmoid $\\sigma(z)$ ke dalam fungsi biaya Mean Squared Error (MSE):\n\n$$J_{\\text{MSE}}(\\mathbf{w}) = \\frac{1}{N} \\sum_{i=1}^N (\\sigma(\\mathbf{x}_i^T \\mathbf{w} + b) - y_i)^2$$\n\nFungsi biaya yang tercipta akan memiliki permukaan bergelombang dengan banyak sekali lembah jebakan (*local minima*) dan daerah mendatar (*plateau*). Kondisi ini disebut **Non-Convex (Tidak Cembung)**. Algoritma Gradient Descent akan dengan mudah terjebak di lembah semu lokal dan gagal menemukan kombinasi bobot terbaik di dasar lembah global.\n\n---\n\n### 3. Solusi Elegan: Binary Cross-Entropy Loss (Log-Loss)\n\n#### Analogi Denda Sumpah Palsu di Pengadilan\nBayangkan seorang saksi di pengadilan yang bersumpah di hadapan hakim:\n- Jika terdakwa terbukti **BERSALAH ($y = 1$)**, dan saksi dengan jujur menyatakan: *\"Saya yakin 99% dia bersalah\"* ($\\hat{y} = 0.99$), hakim memberinya apresiasi penuh (denda kerugian $\\approx 0$).\n- Namun, jika saksi dengan angkuh bersumpah: *\"Saya berani bertaruh 99.9% dia TIDAK BERSALAH\"* ($\\hat{y} = 0.001$), padahal jelas-jelas terdakwa bersalah, hakim akan menjatuhkan **denda hukuman sumpah palsu yang amat sangat berat mendekati tak terhingga**!\n\nFungsi kerugian **Binary Cross-Entropy (Log-Loss)** dirancang khusus untuk memberikan penalti hukuman eksponensial bagi tebakan yang terlalu percaya diri padahal salah fatal:\n\n$$J(\\mathbf{w}, b) = -\\frac{1}{N} \\sum_{i=1}^N \\left[ y_i \\ln(\\hat{y}_i) + (1 - y_i) \\ln(1 - \\hat{y}_i) \\right]$$\n\n#### Bedah Simbol Rumus Log-Loss:\n- **$y_i \\in \\{0, 1\\}$:** Label kelas biner fakta sebenarnya di lapangan.\n- **$\\hat{y}_i = \\sigma(z_i)$:** Taksiran peluang probabilitas model bahwa sampel tergolong kelas 1.\n- **Suku Pertama $y_i \\ln(\\hat{y}_i)$:**\n  Jika fakta $y_i = 1$, maka $(1 - y_i) = 0$, sehingga suku kedua mati. Nilai kerugian menjadi $-\\ln(\\hat{y}_i)$. Jika model menebak $\\hat{y}_i = 1.0 \\implies -\\ln(1.0) = 0$. Jika model salah menebak $\\hat{y}_i \\to 0 \\implies -\\ln(0) \\to +\\infty$.\n- **Suku Kedua $(1 - y_i) \\ln(1 - \\hat{y}_i)$:**\n  Jika fakta $y_i = 0$, maka $y_i = 0$, sehingga suku pertama mati. Nilai kerugian menjadi $-\\ln(1 - \\hat{y}_i)$. Jika model menebak $\\hat{y}_i = 0.0 \\implies -\\ln(1.0) = 0$. Jika model salah menebak $\\hat{y}_i \\to 1 \\implies -\\ln(0) \\to +\\infty$.\n- **Tanda Minus di Depan $-\\frac{1}{N}$:** Karena logaritma natural dari pecahan desimal ($0 < p < 1$) selalu menghasilkan angka negatif (misal $\\ln(0.5) = -0.693$), tanda minus membalik nilai tersebut menjadi angka kerugian positif yang mudah diminimalkan ke arah nol.\n\nFungsi Log-Loss ini terbukti secara matematis bersifat **Convex (Cembung Murni berbentuk mangkuk)**, sehingga memiliki tepat satu titik terendah mutlak (*global minimum*) yang dijamin dapat dicapai oleh Gradient Descent!\n\n---\n\n### 4. Keajaiban Kalkulus: Turunan Parsial Gradien\n\nMeskipun fungsi Log-Loss dan Sigmoid terlihat rumit, saat kita menurunkan turunan parsialnya menggunakan aturan rantai (*Chain Rule*):\n$$\\frac{\\partial \\sigma(z)}{\\partial z} = \\sigma(z)(1 - \\sigma(z))$$\n\nTurunan parsial fungsi biaya terhadap parameter menghasilkan bentuk yang luar biasa anggun dan identik dengan Regresi Linier:\n\n$$\\frac{\\partial J}{\\partial \\mathbf{w}} = \\frac{1}{N} X^T (\\hat{\\mathbf{y}} - \\mathbf{y})$$\n$$\\frac{\\partial J}{\\partial b} = \\frac{1}{N} \\sum_{i=1}^N (\\hat{y}_i - y_i)$$\n\n*(Perbedaan mendasarnya: pada Regresi Linier $\\hat{\\mathbf{y}} = X\\mathbf{w}+b$, sedangkan pada Regresi Logistik $\\hat{\\mathbf{y}} = \\sigma(X\\mathbf{w}+b)$)*.\n            "
      },
      {
        "id": "6-3",
        "title": "6.3 Praktikum Koding: Class LogisticRegression Manual",
        "readingTime": "11 menit",
        "content": "\nBerikut adalah implementasi lengkap algoritma Regresi Logistik mandiri berbasis fungsi Sigmoid, penstabil numerik clipping, dan optimasi gradien murni NumPy.\n\nPerhatikan kotak **Bedah Sintaks & Alur Perhitungan Matematis** di bawah untuk memahami pencegahan overflow nilai eksponensial.\n            ",
        "codePath": "modelling/03_regresi_logistik/contoh_program.py",
        "syntaxBreakdown": [
          {
            "syntax": "z = np.clip(z, -250.0, 250.0); return 1.0 / (1.0 + np.exp(-z))",
            "explanation": "Pertahanan numerik krusial: Jika z < -709, np.exp(-z) akan menghasilkan floating point overflow (Infinity). Fungsi np.clip mengunci rentang z pada interval [-250, 250], menjamin kestabilan komputasi kurva Sigmoid tanpa merusak presisi probabilitas."
          },
          {
            "syntax": "linear_model = np.dot(X, self.weights) + self.bias",
            "explanation": "Menghitung nilai kombinasi linier z = Xw + b untuk seluruh sampel observasi menggunakan perkalian dot product matriks berdimensi (N, m) x (m,)."
          },
          {
            "syntax": "y_pred_prob = self._sigmoid(linear_model)",
            "explanation": "Mentransformasikan nilai linier ke dalam probabilitas kontinu interval (0, 1) melalui fungsi aktivasi Sigmoid."
          },
          {
            "syntax": "dw = (1.0 / n_samples) * np.dot(X.T, (y_pred_prob - y))",
            "explanation": "Menghitung gradien turunan parsial bobot Binary Cross-Entropy: perkalian transpos matriks fitur X.T dengan vektor selisih probabilitas galat (p - y)."
          },
          {
            "syntax": "return (y_prob >= threshold).astype(int)",
            "explanation": "Mengonversi probabilitas kontinu menjadi keputusan biner kelas 0 atau 1 berdasarkan ambang batas keputusan yang ditentukan (default 0.5)."
          }
        ]
      },
      {
        "id": "6-4",
        "title": "6.4 Studi Kasus: Deteksi Diabetes Pasien (Kaggle)",
        "readingTime": "10 menit",
        "content": "\n### 1. Karakteristik Dataset Pima Indians Diabetes\n\nDataset ini mencakup rekam medis 768 wanita keturunan suku Pima untuk mendeteksi apakah pasien terdiagnosis mengidap penyakit Diabetes Mellitus:\n- Fitur klinis: Jumlah Kehamilan, Kadar Glukosa, Tekanan Darah Diastolik, Ketebalan Kulit Trisep, Insulin Serum, Indeks Massa Tubuh (BMI), Riwayat Silsilah Diabetes (*Pedigree*), dan Usia.\n- Target: $0$ = Sehat, $1$ = Positif Diabetes.\n\n---\n\n### 2. Eksperimen Threshold Tuning untuk Kepentingan Medis\n\nPada bidang medis, kehilangan pasien diabetes (*False Negative*) jauh lebih berbahaya daripada salah memperingatkan pasien sehat (*False Positive*). \n\nJalankan script di bawah ini untuk melihat bagaimana menurunkan ambang batas keputusan dari $0.5$ menjadi $0.35$ dapat meningkatkan daya tangkap pasien sakit (**Recall melonjak drastis**) secara signifikan demi keselamatan pasien.\n            ",
        "codePath": "modelling/03_regresi_logistik/studi_kasus.py",
        "syntaxBreakdown": [
          {
            "syntax": "X, y, feature_names = load_diabetes()",
            "explanation": "Memuat dataset benchmark klinis Pima Indians Diabetes (768 pasien, 8 fitur medis) dari file datasets/diabetes.csv."
          },
          {
            "syntax": "model = LogisticRegressionManual(learning_rate=0.1, n_epochs=1500)",
            "explanation": "Menginisialisasi model Regresi Logistik dengan 1.500 epoch pelatihan gradient descent."
          },
          {
            "syntax": "y_pred_custom = model.predict(X_test, threshold=0.35)",
            "explanation": "Melakukan penyesuaian ambang batas (threshold tuning) ke 0.35 guna memaksimalkan sensitivitas deteksi terhadap pasien positif sakit."
          }
        ]
      }
    ]
  },
  {
    "id": "mod-7",
    "title": "Bab 7: Evaluasi Model Klasifikasi",
    "icon": "07",
    "lessons": [
      {
        "id": "7-1",
        "title": "7.1 Anatomi Confusion Matrix: Type I vs Type II Error",
        "readingTime": "11 menit",
        "content": "\n### 1. Mengapa Akurasi Saja Menyesatkan?\n\n#### Analogi Sederhana: Dokter Malas yang Mengantuk\nBayangkan di sebuah klinik kesehatan terpencil, dari 1.000 pasien yang datang setiap bulan, rata-rata 990 orang hanya mengalami flu ringan biasa ($99\\%$), sedangkan hanya 10 orang yang mengidap demam berdarah berbahaya ($1\\%$).\n\nSeorang dokter magang yang sangat malas dan mengantuk memutuskan untuk tidak memeriksa pasien sama sekali. Apapun keluhan pasien, ia langsung mencap stempel di resep: *\"Flu Biasa (0)\"*.\n- Seberapa tinggi akurasi dokter magang tersebut? **$99\\%$ tepat!**\n- Namun, apa yang terjadi pada 10 pasien demam berdarah tersebut? Seluruhnya disuruh pulang tanpa obat dan akhirnya meninggal dunia!\n\nApakah dokter dengan \"akurasi 99%\" ini layak dipertahankan? Tentu saja tidak! Di dunia Machine Learning, ilusi ini disebut **Accuracy Paradox (Paradoks Akurasi)**. Ketika data kita tidak seimbang (*imbalanced dataset*), angka akurasi adalah metrik penipu.\n\nUntuk melihat kebenaran performa model secara transparan, kita wajib membedah **Confusion Matrix**.\n\n---\n\n### 2. Anatomi Kuadran Confusion Matrix 2x2\n\n#### Analogi Alarm Kebakaran Gedung Sekolah\nConfusion Matrix membandingkan kenyataan sesungguhnya di alam nyata ($y$) dengan apa yang ditebak oleh model kecerdasan buatan ($\\hat{y}$):\n\n| Fakta Aktual \\ Prediksi Model | Prediksi Negatif ($\\hat{y} = 0$) | Prediksi Positif ($\\hat{y} = 1$) |\n|---|---|---|\n| **Aktual Negatif ($y = 0$)** | **True Negative (TN)** | **False Positive (FP)** *(Type I Error)* |\n| **Aktual Positif ($y = 1$)** | **False Negative (FN)** *(Type II Error)* | **True Positive (TP)** |\n\nMari kita pahami keempat kuadran ini melalui sistem sensor alarm kebakaran:\n1. **True Positive (TP):** Ada api berkobar di laboratorium $\\to$ Alarm berdering nyaring tepat waktu. Seluruh murid dan guru selamat dievakuasi (Tebakan Positif yang Benar).\n2. **True Negative (TN):** Tidak ada api sama sekali $\\to$ Alarm tetap tenang diam. Kegiatan belajar mengajar berjalan lancar dan kondusif (Tebakan Negatif yang Benar).\n3. **False Positive (FP / Type I Error - Alarm Palsu):** Tidak ada api sama sekali, hanya roti panggang sedikit gosong di kantin $\\to$ Alarm meraung-raung panik. Seluruh sekolah dievakuasi ke lapangan terbuka. Mengganggu dan membuang waktu, tetapi tidak ada korban jiwa (Tebakan Positif yang Salah).\n4. **False Negative (FN / Type II Error - Luput Fatal):** Ada kobaran api sungguhan di lantai 3 $\\to$ Sensor alarm rusak dan tetap diam seribu bahasa! Tidak ada bunyi peringatan, penghuni gedung terjebak di dalam api. **Dampaknya adalah bencana fatal dan kematian!**\n\n---\n\n### 3. Pedoman Etika Rekayasa LKS AI\n\n> ATURAN UTAMA KOMPETISI LKS AI:\n> Pada aplikasi berisiko tinggi seperti diagnosis medis, rem darurat mobil otonom, dan deteksi kecelakaan industri, **False Negative (FN) adalah dosa rekayasa paling mematikan**. Model wajib dirancang untuk menekan angka FN serendah mungkin, bahkan jika itu harus sedikit meningkatkan FP (lebih baik mengirim pasien sehat untuk cek ulang laboratorium daripada membiarkan pasien kanker stadium awal pulang tanpa pengobatan).\n            "
      },
      {
        "id": "7-2",
        "title": "7.2 Metrik Evaluasi: Akurasi, Presisi, Recall, & F1-Score",
        "readingTime": "14 menit",
        "content": "\n### 1. Formulasi Matematika Empat Metrik Klasifikasi\n\nUntuk mengukur performa secara objektif, komunitas sains data merumuskan empat metrik standar:\n\n#### A. Accuracy (Akurasi Total)\nMengukur berapa persen total tebakan yang tepat (baik positif maupun negatif) dari seluruh data yang ada:\n\n$$\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN}$$\n\n- **Kelebihan:** Sangat mudah dipahami oleh orang awam.\n- **Kelemahan:** Sangat berbahaya dan menyesatkan jika jumlah kelas positif dan negatif tidak seimbang.\n\n---\n\n#### B. Precision (Presisi / Ketepatan Janji)\nMengukur kualitas saat model berani mengeluarkan vonis positif: *\"Dari seluruh sampel yang dituduh positif oleh model, berapa persen yang faktanya memang benar-benar positif?\"*\n\n$$\\text{Precision} = \\frac{TP}{TP + FP}$$\n\n- **Fokus Utama:** Menekan seminimal mungkin angka **False Positive (FP / Alarm Palsu)**.\n- **Contoh Kasus:** Sistem filter email spam. Kita tidak ingin email penting wawancara kerja salah dimasukkan ke kotak sampah spam!\n\n---\n\n#### C. Recall / Sensitivity (Daya Tangkap / Kelengkapan Jaring)\nMengukur kemampuan jaring model menangkap seluruh kasus positif yang beredar: *\"Dari seluruh fakta kasus positif yang benar-benar ada di alam nyata, berapa persen yang berhasil dijaring oleh model?\"*\n\n$$\\text{Recall} = \\frac{TP}{TP + FN}$$\n\n- **Fokus Utama:** Menekan seminimal mungkin angka **False Negative (FN / Kasus Lolos)**.\n- **Contoh Kasus:** Alat deteksi virus penyakit menular di bandara. Jaring harus menangkap semua pembawa virus agar pandemi tidak menyebar ke seluruh negeri!\n\n---\n\n#### D. F1-Score (Rata-Rata Harmonik)\nMengukur keseimbangan kompromi antara Presisi dan Recall:\n\n$$F_1 = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2TP}{2TP + FP + FN}$$\n\n---\n\n### 2. Mengapa F1-Score Menggunakan Rata-Rata Harmonik?\n\nMengapa para ilmuwan matematika tidak memakai rata-rata aritmatika biasa $\\frac{\\text{Precision} + \\text{Recall}}{2}$?\n\nMari kita buktikan bahayanya dengan simulasi matematika:\nMisalkan sebuah model \"licik\" hanya berani menebak 1 sampel yang paling jelas sebagai positif ($TP = 1, FP = 0$), sementara model menolak menebak 99 sampel positif lainnya karena takut salah ($FN = 99$):\n- $\\text{Precision} = \\frac{1}{1 + 0} = \\mathbf{1.0} \\quad (100\\%)$\n- $\\text{Recall} = \\frac{1}{1 + 99} = \\mathbf{0.01} \\quad (1\\%)$\n\nJika kita menggunakan:\n1. **Rata-Rata Aritmatika Biasa:**\n   $$\\text{Mean} = \\frac{1.0 + 0.01}{2} = \\mathbf{0.505} \\quad (50.5\\%)$$\n   *(Angka 50.5% memberikan ilusi palsu bahwa model bekerja cukup lumayan, padahal model gagal menangkap 99% pasien sakit!)*\n2. **Rata-Rata Harmonik ($F_1$):**\n   $$F_1 = 2 \\times \\frac{1.0 \\times 0.01}{1.0 + 0.01} = \\frac{0.02}{1.01} \\approx \\mathbf{0.0198} \\quad (1.98\\%)$$\n   *(F1-Score secara tegas menghukum ketimpangan ekstrem dan nilainya langsung jatuh mendekati nol!)*\n\nRata-rata harmonik menjamin nilai skor akhir hanya akan tinggi jika **baik Presisi MAUPUN Recall sama-sama tinggi dan seimbang**.\n\n---\n\n### 3. Matriks Pemilihan Metrik di Hadapan Penguji LKS\n\n| Domain Masalah | Metrik Prioritas | Target Error yang Ditekan | Alasan Rekayasa AI |\n|---|---|---|---|\n| **Diagnosis Medis & Radiologi** | **Recall** | False Negative (FN) | Mencegah pasien kanker stadium awal terlewat tanpa penanganan. |\n| **Pendeteksi Penipuan Kartu Kredit** | **Recall** | False Negative (FN) | Menjamin transaksi pencurian uang nasabah terdeteksi secepatnya. |\n| **Filter Email Spam & Malware** | **Precision** | False Positive (FP) | Menjaga surat bisnis resmi tidak terlempar ke folder sampah. |\n| **Rekomendasi Investasi Portofolio** | **Precision** | False Positive (FP) | Modal uang nasabah yang dipertaruhkan tidak boleh salah dialokasikan. |\n| **Kasus Imbalanced Umum** | **F1-Score** | Keseimbangan Keduanya | Ukuran objektif performa umum model di hadapan juri kompetisi. |\n            "
      },
      {
        "id": "7-3",
        "title": "7.3 Studi Kasus: Jebakan Akurasi pada Kasus Imbalanced",
        "readingTime": "10 menit",
        "content": "\n### 1. Pembuktian Nyata 'Accuracy Paradox' pada Data Medis\n\nMari kita uji konsep ini pada dataset asli **Pima Indians Diabetes** dari Kaggle.\nDalam dataset pengujian berukuran 192 pasien:\n- Pasien Sehat ($y = 0$): 123 orang ($64\\%$)\n- Pasien Sakit ($y = 1$): 69 orang ($36\\%$)\n\nKita akan mengadu dua model:\n1. **Model Malas (Dummy Classifier):** Model bodoh yang selalu menebak seluruh pasien \"Sehat (0)\". Model ini mendapat akurasi $64\\%$, namun nilai Recall-nya adalah **$0.0\\%$**!\n2. **Model AI Sebenarnya (Trained Model):** Model yang dilatih mengenali pola biokimia tubuh dan berhasil menjaring sebagian besar pasien berisiko tinggi.\n\n---\n\n### 2. Eksekusi Script & Pembuktian Laporan Klasifikasi\n\nJalankan script di bawah ini untuk melihat perbandingan Confusion Matrix, Akurasi semu, dan nilai Recall yang membuktikan mengapa juri LKS mewajibkan pelaporan metrik F1-Score dan Recall.\n            ",
        "codePath": "evaluasi/klasifikasi/studi_kasus.py",
        "syntaxBreakdown": [
          {
            "syntax": "tp = np.sum((y_true == 1) & (y_pred == 1))",
            "explanation": "Operasi logika boolean AND bitwise (&): Menemukan baris di mana label target sebenarnya bernilai 1 DAN model juga menebak 1. np.sum menghitung total jumlah kondisi True tersebut (True Positive)."
          },
          {
            "syntax": "fp = np.sum((y_true == 0) & (y_pred == 1))",
            "explanation": "Menemukan baris di mana fakta aslinya 0 (negatif) tetapi model salah menebak 1 (positif). Ini merepresentasikan False Positive (Alarm Palsu)."
          },
          {
            "syntax": "fn = np.sum((y_true == 1) & (y_pred == 0))",
            "explanation": "Menemukan baris di mana fakta aslinya 1 (positif) tetapi model salah menebak 0 (negatif). Ini merepresentasikan False Negative (Kasus Lolos Fatal)."
          },
          {
            "syntax": "f1 = 2 * (prec * rec) / (prec + rec) if (prec + rec) > 0 else 0.0",
            "explanation": "Menghitung rata-rata harmonik F1-Score lengkap dengan pemeriksaan pengkondisian untuk mencegah error pembagian dengan nol."
          }
        ]
      }
    ]
  },
  {
    "id": "mod-8",
    "title": "Bab 8: Evaluasi Model Regresi",
    "icon": "08",
    "lessons": [
      {
        "id": "8-1",
        "title": "8.1 Metrik Galat Absolut & Kuadratik: MAE, MSE, dan RMSE",
        "readingTime": "12 menit",
        "content": "\n### 1. Mengapa Kita Tidak Bisa Memakai Akurasi pada Kasus Regresi?\n\n#### Analogi Sederhana: Menaksir Berat Badan Pasien\nBayangkan seorang dokter memperkirakan berat badan pasien. Berat timbangan sebenarnya adalah **$60.00\\,\\text{kg}$**, sedangkan dokter memperkirakan **$60.05\\,\\text{kg}$** (hanya meleset 50 gram).\n\nJika kita menggunakan metrik akurasi boolean klasifikasi biasa ($y == \\hat{y}$):\nKarena $60.00 \\ne 60.05$, komputer akan memberi vonis **0% (Salah Mutlak)**! Hal ini tentu sangat tidak adil dan tidak masuk akal.\n\nPada kasus regresi, target adalah bilangan riil kontinu. Kesalahan prediksi bukanlah perkara hitam-putih \"Benar atau Salah\", melainkan tentang **seberapa dekat besaran jarak simpangan galat (residual)** yang dihasilkan oleh model terhadap target aktual.\n\n---\n\n### 2. Tiga Metrik Utama Regresi\n\n#### Analogi Papan Sasaran Panahan\nBayangkan Anda sedang melatih seorang atlet panahan yang menembakkan anak panah ke papan sasaran lingkaran:\n- Titik merah tengah sasaran adalah nilai target aktual ($y$).\n- Di mana anak panah menancap di papan adalah hasil prediksi model ($\\hat{y}$).\n- Jarak dalam centimeter antara anak panah dengan titik pusat sasaran adalah **Residual ($e_i = y_i - \\hat{y}_i$)**.\n\nMari kita bedah tiga cara mengukur kepiawaian atlet panahan tersebut:\n\n---\n\n#### A. Mean Absolute Error (MAE)\nAnda mengambil pita pengukur, mengukur jarak setiap anak panah ke titik pusat tanpa mempedulikan apakah panah meleset ke arah kiri atau kanan (selalu bernilai positif / absolut $|e_i|$), lalu menghitung rata-ratanya:\n\n$$\\text{MAE} = \\frac{1}{N} \\sum_{i=1}^N |y_i - \\hat{y}_i|$$\n\n- **Keunggulan:** Satuannya sama persis dengan satuan target asli (misal: *\"prediksi meleset rata-rata 2.5 kilogram\"* atau *\"meleset 3 juta rupiah\"*). Sangat ramah dipahami oleh klien bisnis dan orang awam.\n- **Sifat:** Bersifat linier seragam (*robust* terhadap pencilan).\n\n---\n\n#### B. Mean Squared Error (MSE)\nPelatih panahan menerapkan aturan disiplin berlipat ganda: *\"Jika kamu meleset 1 cm, hukumannya push-up 1 kali ($1^2 = 1$). Namun jika kamu meleset 10 cm sampai ke luar papan sasaran, kamu mempermalukan tim, sehingga hukumannya push-up $10^2 = 100$ kali!\"*:\n\n$$\\text{MSE} = \\frac{1}{N} \\sum_{i=1}^N (y_i - \\hat{y}_i)^2$$\n\n- **Sifat:** Mengkuadratkan selisih galat memberikan **hukuman penalti eksponensial yang luar biasa berat terhadap kesalahan prediksi yang melenceng jauh**.\n- **Kelemahan:** Satuan ukurnya menjadi kuadrat (misalnya: $(\\text{rupiah})^2$ atau $(\\text{kg})^2$), sehingga membingungkan jika dibaca langsung oleh manusia.\n\n---\n\n#### C. Root Mean Squared Error (RMSE)\nSetelah menghitung denda kuadrat MSE, kita menarik akar pangkat dua ($\\sqrt{\\cdot}$) untuk mengembalikan satuannya kembali ke satuan asli:\n\n$$\\text{RMSE} = \\sqrt{\\text{MSE}} = \\sqrt{\\frac{1}{N} \\sum_{i=1}^N (y_i - \\hat{y}_i)^2}$$\n\n- **Keunggulan:** Memiliki satuan asli yang ramah manusia (seperti MAE), namun **tetap mempertahankan sensitivitas hukuman keras terhadap pencilan ekstrim** (seperti MSE). Inilah metrik paling populer dalam kompetisi sains data global!\n\n---\n\n### 3. Simulasi Hitung Manual MAE, MSE, dan RMSE\n\nMisalkan kita menguji 3 prediksi konsumsi bahan bakar kendaraan (Liter):\n\n| Sampel | Aktual ($y_i$) | Prediksi ($\\hat{y}_i$) | Galat ($e_i$) | Absolut $|e_i|$ | Kuadrat $e_i^2$ |\n|---|---|---|---|---|---|\n| 1 | 10.0 | 9.0 | $-1.0$ | $1.0$ | $1.0$ |\n| 2 | 20.0 | 22.0 | $+2.0$ | $2.0$ | $4.0$ |\n| 3 | 30.0 | 35.0 | $+5.0$ | $5.0$ | $25.0$ |\n| **Total** | | | | **8.0** | **30.0** |\n\nPerhitungan ketiga metrik:\n1. $$\\text{MAE} = \\frac{8.0}{3} \\approx \\mathbf{2.67} \\text{ Liter}$$\n2. $$\\text{MSE} = \\frac{30.0}{3} = \\mathbf{10.0} \\text{ Liter}^2$$\n3. $$\\text{RMSE} = \\sqrt{10.0} \\approx \\mathbf{3.16} \\text{ Liter}$$\n\nPerhatikan bahwa nilai $\\text{RMSE} (3.16) > \\text{MAE} (2.67)$ karena RMSE dipengaruhi kuat oleh kesalahan besar ($+5.0$) pada sampel ke-3!\n            "
      },
      {
        "id": "8-2",
        "title": "8.2 Koefisien Determinasi (R2 Score) & Interpretasi",
        "readingTime": "12 menit",
        "content": "\n### 1. Filosofi Koefisien Determinasi ($R^2$)\n\nMetrik MAE dan RMSE memiliki satu keterbatasan: nilainya terikat erat pada skala fisik data. Meleset $10$ gram pada takaran obat racik dosis tinggi adalah bencana maut, tetapi meleset $10$ gram pada muatan truk tronton pengangkut pasir sama sekali tidak berarti apa-apa.\n\nKita membutuhkan suatu metrik evaluasi tanpa satuan (*dimensionless metric*) yang mampu menjawab: **\"Berapa persen keragaman atau variasi dari fenomena data yang berhasil dijelaskan oleh model kita?\"**\n\nMetrik universal tersebut adalah **$R^2$ Score (Koefisien Determinasi)**.\n\n---\n\n### 2. Formulasi Matematika & Bedah Simbol $R^2$\n\n#### Analogi Guru Pemalas (Model Baseline)\nBayangkan seorang guru penguji yang sangat malas memeriksa lembar jawaban ujian siswanya. Tanpa membaca berkas ujian sama sekali, ia hanya menghitung nilai rata-rata seluruh kelas ($\\bar{y} = 70$), lalu memvonis semua siswa mendapat nilai $70$!\nGaris horizontal rata-rata ini adalah **Model Baseline Terburuk**, dan akumulasi kesalahannya disebut **$SS_{\\text{tot}}$**.\n\nModel AI Anda berusaha lebih pintar dengan mempelajari pola fitur. Akumulasi kesalahan model Anda disebut **$SS_{\\text{res}}$**.\n\n$$R^2 = 1 - \\frac{SS_{\\text{res}}}{SS_{\\text{tot}}} = 1 - \\frac{\\sum_{i=1}^N (y_i - \\hat{y}_i)^2}{\\sum_{i=1}^N (y_i - \\bar{y})^2}$$\n\n#### Bedah Simbol Rumus $R^2$:\n1. **$SS_{\\text{res}}$ (Residual Sum of Squares):** Total akumulasi kuadrat galat model Anda. Seberapa banyak variasi data yang gagal diprediksi oleh model.\n2. **$SS_{\\text{tot}}$ (Total Sum of Squares):** Total akumulasi variasi alami data terhadap nilai rata-ratanya sendiri ($\\bar{y} = \\frac{1}{N}\\sum y_i$).\n3. **$\\frac{SS_{\\text{res}}}{SS_{\\text{tot}}}$:** Proporsi kesalahan model Anda dibandingkan dengan kebodohan model garis rata-rata baseline.\n4. **$1 - (\\dots)$:** Sisa proporsi variasi yang berhasil dijinakkan dan dijelaskan oleh kecerdasan model.\n\n---\n\n### 3. Panduan Interpretasi Nilai $R^2$\n\n- **$R^2 = 1.0$ ($100\\%$ - Kesempurnaan Mutlak):** Seluruh residual $e_i = 0$. Garis model melewati seluruh titik data dengan sangat presisi.\n- **$R^2 = 0.86$ ($86\\%$ - Sangat Kuat):** Model berhasil menjelaskan $86\\%$ variasi pola penjualan produk. Sisa $14\\%$ variabilitas merupakan faktor eksternal tak terduga atau noise acak.\n- **$R^2 = 0.0$ ($0\\%$ - Tidak Berfaedah):** Model Anda tidak punya kecerdasan apapun, performanya persis sama dengan sekadar menebak angka rata-rata target.\n- **$R^2 < 0.0$ (Nilai Negatif - Bencana Pemodelan):** Terjadi jika $SS_{\\text{res}} > SS_{\\text{tot}}$. Model Anda menghasilkan prediksi yang **jauh lebih rusak daripada sekadar menebak nilai rata-rata horizontal**. Ini sinyal merah terjadinya kerusakan algoritma, divergensi gradien, atau overfitting parah!\n\n> RAHASIA PRESENTASI JUARA LKS AI:\n> Selalu sajikan kombinasi berpasangan **RMSE dan $R^2$** kepada dewan juri kompetisi. RMSE memberikan gambaran besaran simpangan fisik yang nyata, sedangkan $R^2$ membuktikan kekuatan matematis model dalam menangkap tren data!\n            "
      },
      {
        "id": "8-3",
        "title": "8.3 Studi Kasus: Evaluasi Regresi Penjualan",
        "readingTime": "9 menit",
        "content": "\n### 1. Pengujian Metrik Regresi Lengkap pada Data Advertising\n\nMari kita terapkan modul evaluasi regresi buatan kita pada dataset riil Advertising Kaggle untuk memverifikasi akurasi prediksi angka penjualan produk.\n\nJalankan script di bawah ini untuk melihat perbandingan MAE, MSE, RMSE, serta pembuktian skor $R^2 = 86.03\\%$.\n            ",
        "codePath": "evaluasi/regresi/studi_kasus.py",
        "syntaxBreakdown": [
          {
            "syntax": "mae = np.mean(np.abs(y_true - y_pred))",
            "explanation": "Menghitung nilai Mean Absolute Error: menghitung selisih absolut antara nilai target sebenarnya dengan prediksi model, lalu mencari rata-ratanya."
          },
          {
            "syntax": "mse = np.mean((y_true - y_pred) ** 2)",
            "explanation": "Menghitung Mean Squared Error: mengkuadratkan setiap residual galat untuk memberikan penalti proporsional, lalu mencari rata-ratanya."
          },
          {
            "syntax": "rmse = np.sqrt(mse)",
            "explanation": "Menghitung Root Mean Squared Error: menarik akar kuadrat dari MSE guna mengembalikan satuan simpangan kembali ke satuan asli data."
          },
          {
            "syntax": "ss_res = np.sum((y_true - y_pred) ** 2); ss_tot = np.sum((y_true - y_mean) ** 2)",
            "explanation": "Menghitung jumlah kuadrat residual (SS_res) dan jumlah kuadrat total terhadap rata-rata (SS_tot) sebagai pilar utama rumus R-Squared."
          },
          {
            "syntax": "return 1.0 - (ss_res / ss_tot)",
            "explanation": "Kalkulasi koefisien determinasi R2 akhir: 1 dikurangi rasio kesalahan model terhadap kesalahan baseline."
          }
        ]
      }
    ]
  },
  {
    "id": "mod-9",
    "title": "Bab 9: K-Means Clustering",
    "icon": "09",
    "lessons": [
      {
        "id": "9-1",
        "title": "9.1 Konsep Unsupervised Learning & Algoritma Lloyd",
        "readingTime": "12 menit",
        "content": "\n### 1. Paradigma Unsupervised Learning (Pembelajaran Tanpa Guru)\n\n#### Analogi Sederhana: Merapikan Laci Bumbu Tanpa Label\nBayangkan Anda pindah ke rumah baru dan menemukan laci dapur penuh dengan ratusan toples rempah tanpa label tulisan sama sekali. Tidak ada guru yang memberitahu Anda nama bumbu tersebut. \nApa yang Anda lakukan? Anda mengamati warna, aroma, dan teksturnya:\n- Toples dengan butiran putih asin dikelompokkan ke wadah garam.\n- Toples dengan bubuk hitam beraroma tajam disatukan ke wadah lada.\n- Toples dengan bubuk cokelat manis disatukan ke wadah kayu manis.\n\nInilah esensi **Unsupervised Learning (Pembelajaran Tanpa Supervisi)**: komputer diberikan data mentah fitur tanpa label target kunci jawaban sama sekali:\n\n$$\\mathcal{D} = \\{\\mathbf{x}_1, \\mathbf{x}_2, \\dots, \\mathbf{x}_N\\}, \\quad \\mathbf{x}_i \\in \\mathbb{R}^m$$\n\nTujuan dari **Clustering (Klasterisasi)** adalah mempartisi data ini ke dalam $K$ kelompok alami sedemikian rupa sehingga:\n1. **Intra-Cluster Similarity Tinggi:** Data di dalam kelompok yang sama memiliki kemiripan ciri yang sangat erat.\n2. **Inter-Cluster Similarity Rendah:** Data antar kelompok yang berbeda memiliki batas pemisah yang sangat tegas dan kontras.\n\n---\n\n### 2. Algoritma Lloyd (Iterasi 3 Langkah K-Means)\n\n#### Analogi Pemilihan Kafe Kumpul Kelompok Belajar\nBayangkan ada 30 orang mahasiswa yang tinggal terpencar di berbagai penjuru kota. Mereka sepakat membagi diri ke dalam 3 kelompok belajar bersama ($K = 3$). Masing-masing kelompok harus menentukan 1 kafe kumpul agar tidak ada anggota yang merasa lokasi belajarnya kejauhan:\n\n1. **Langkah 1: Inisialisasi Kafe Awal (Centroid Initialization)**\n   Tiga kafe dipilih secara acak di peta kota sebagai titik awal kumpul:\n   $$\\mathbf{\\mu}_1, \\mathbf{\\mu}_2, \\dots, \\mathbf{\\mu}_K \\in \\mathbb{R}^m$$\n2. **Langkah 2: Memilih Kafe Terdekat (Assignment Step)**\n   Setiap mahasiswa membuka peta dan menghitung jarak dari rumahnya ke ketiga kafe tersebut. Mereka otomatis berangkat ke kafe yang jaraknya paling dekat:\n   $$c_i = \\operatorname{argmin}_{k \\in \\{1, \\dots, K\\}} \\|\\mathbf{x}_i - \\mathbf{\\mu}_k\\|^2$$\n3. **Langkah 3: Memindahkan Kafe ke Titik Tengah Anggota (Update Step)**\n   Setelah berkumpul, anggota kelompok 1 menyadari: *\"Mayoritas rumah kita ada di sisi timur, kafe ini terlalu ke barat. Mari kita pindahkan kafe kumpul ke titik tengah rata-rata koordinat rumah kita!\"*. Pusat kafe diperbarui ke rata-rata koordinat seluruh anggotanya:\n   $$\\mathbf{\\mu}_k = \\frac{1}{|C_k|} \\sum_{\\mathbf{x} \\in C_k} \\mathbf{x}$$\n4. **Langkah 4: Konvergensi (Berhenti)**\n   Setelah kafe berpindah, beberapa mahasiswa yang tinggal di perbatasan mungkin berpindah ke kafe lain yang kini lebih dekat. Proses ini diulang sampai **tidak ada lagi mahasiswa yang berpindah kelompok** dan posisi kafe sudah stabil membeku!\n\n#### Bedah Simbol Rumus:\n- $\\mathbf{x}_i$: Koordinat fitur sampel data ke-$i$.\n- $\\mathbf{\\mu}_k$ (Centroid): Titik koordinat pusat gravitasi rata-rata dari klaster ke-$k$.\n- $\\|\\mathbf{x}_i - \\mathbf{\\mu}_k\\|^2$: Kuadrat jarak Euclidean antara titik data dan centroid.\n- $\\operatorname{argmin}_k$: Fungsi pencari indeks klaster $k$ yang menghasilkan jarak terkecil.\n- $|C_k|$: Jumlah total sampel yang menjadi anggota kelompok $C_k$.\n            "
      },
      {
        "id": "9-2",
        "title": "9.2 Formulasi Matematika WCSS (Inertia) & Elbow Method",
        "readingTime": "13 menit",
        "content": "\n### 1. Fungsi Objektif: WCSS (Within-Cluster Sum of Squares)\n\n#### Analogi Total Biaya Bahan Bakar Anggota\nMelanjutkan analogi kelompok belajar di kafe: nilai **WCSS (Within-Cluster Sum of Squares)** atau **Inertia** dapat dibayangkan sebagai **total biaya bensin kendaraan yang dihabiskan oleh seluruh 30 mahasiswa untuk menempuh perjalanan dari rumah ke kafe kumpulnya masing-masing**.\n\nTujuan matematis algoritma K-Means adalah meminimalkan total pemborosan jarak ini:\n\n$$\\text{WCSS} = \\sum_{k=1}^K \\sum_{\\mathbf{x} \\in C_k} \\|\\mathbf{x} - \\mathbf{\\mu}_k\\|^2$$\n\n#### Bedah Simbol Rumus WCSS:\n- $\\sum_{k=1}^K$: Penjumlahan akumulasi di seluruh $K$ kelompok klaster.\n- $\\sum_{\\mathbf{x} \\in C_k}$: Penjumlahan kuadrat jarak dari setiap titik data $\\mathbf{x}$ khusus di dalam kelompok $C_k$.\n- Semakin kecil nilai WCSS, semakin padat dan kompak sebaran anggota di sekitar pusat centroid masing-masing.\n\n---\n\n### 2. Dilema Pemilihan Nilai K: Kapan Berhenti?\n\nMengapa kita tidak memilih nilai $K$ sebesar mungkin agar WCSS sekecil mungkin?\n- **Jika $K = 1$:** Seluruh data se-kota disatukan ke dalam 1 kelompok raksasa. Anggota yang tinggal di pinggiran kota akan menghabiskan bensin sangat banyak $\\implies$ WCSS bernilai paling tinggi.\n- **Jika $K = N$:** Setiap orang belajar sendirian di rumah masing-masing ($30$ mahasiswa membentuk $30$ kelompok!). Jarak ke centroid adalah $0 \\implies \\text{WCSS} = 0$. Namun model ini **konyol dan tidak ada gunanya sama sekali**, karena tidak ada pengelompokan yang terbentuk.\n\nKita membutuhkan kompromi terbaik antara jumlah kelompok yang efisien dengan nilai WCSS yang rendah.\n\n---\n\n### 3. Elbow Method (Metode Tekukan Siku Lengan)\n\nUntuk menemukan jumlah klaster optimal secara ilmiah tanpa tebak-tebakan, kita memplot grafik **Elbow Curve**:\n1. Jalankan algoritma K-Means untuk serangkaian nilai $K$ berurutan (misalnya $K = 1, 2, 3, \\dots, 8$).\n2. Catat nilai WCSS untuk masing-masing pengujian $K$.\n3. Plot diagram sumbu X ($K$) terhadap sumbu Y ($\\text{WCSS}$).\n\n#### Analogi Tekukan Siku Tangan:\nBayangkan bentuk lengan tangan Anda saat ditekuk:\n- Dari pundak menuju siku ($K=1$ ke $K=2, 3$), lengan **menurun sangat curam**. Ini menunjukkan penambahan kelompok memberikan perbaikan kerapatan yang sangat masif!\n- Mulai dari siku tangan menuju pergelangan ($K=5$ ke atas), lengan **melandai mendatar**. Ini menunjukkan penambahan klaster baru tidak lagi memberikan penghematan variansi yang signifikan.\n- **Titik Siku (Elbow Point):** Titik sudut tekukan itulah nilai $K$ optimal terbaik yang dipilih!\n\n> TIPS JUARA LKS AI:\n> Sebutkan metrik **Silhouette Score** di hadapan juri LKS. Silhouette score mengukur rasio kerapatan internal klaster (*cohesion*) terhadap jarak pemisah ke klaster tetangga terdekat (*separation*) dengan rentang skala $[-1.0, +1.0]$. Skor mendekati $+1.0$ membuktikan bahwa klaster terpisah dengan sangat rapi dan tidak saling bertumpuk (*dense and well-separated*).\n            "
      },
      {
        "id": "9-3",
        "title": "9.3 Praktikum Koding: Class KMeans Manual (Pure NumPy)",
        "readingTime": "11 menit",
        "content": "\nBerikut adalah implementasi lengkap algoritma K-Means mandiri menggunakan kalkulasi jarak Euclidean matriks NumPy, pelacakan konvergensi centroid, dan perhitungan WCSS Inertia.\n\nPerhatikan kotak **Bedah Sintaks & Alur Perhitungan Matematis** di bawah untuk memahami bagaimana tahap assignment dan update centroid diimplementasikan secara elegan.\n            ",
        "codePath": "modelling/06_k_means/contoh_program.py",
        "syntaxBreakdown": [
          {
            "syntax": "random_indices = np.random.choice(n_samples, self.k, replace=False); self.centroids_ = X[random_indices].copy()",
            "explanation": "Tahap Inisialisasi: Memilih K indeks observasi unik dari dataset secara acak tanpa pengembalian (replace=False) untuk dijadikan posisi awal vektor centroid."
          },
          {
            "syntax": "distances[:, k_idx] = np.sum((X - self.centroids_[k_idx]) ** 2, axis=1)",
            "explanation": "Tahap Assignment: Menghitung kuadrat jarak Euclidean antara seluruh baris sampel data X dengan posisi centroid ke-k secara tervektorisasi."
          },
          {
            "syntax": "labels = np.argmin(distances, axis=1)",
            "explanation": "Menentukan kepemilikan klaster: np.argmin mencari indeks kolom centroid yang menghasilkan nilai jarak terpendek untuk masing-masing baris observasi."
          },
          {
            "syntax": "new_centroids[k_idx] = np.mean(cluster_points, axis=0)",
            "explanation": "Tahap Update: Memperbarui posisi koordinat centroid ke-k sebagai rata-rata aritmatika dari seluruh sampel data yang terdaftar di dalam klaster tersebut."
          },
          {
            "syntax": "self.inertia_ = float(np.sum((X - self.centroids_[self.labels_]) ** 2))",
            "explanation": "Kalkulasi WCSS (Inertia): Menghitung akumulasi kuadrat jarak Euclidean dari seluruh titik data ke centroid kelompoknya masing-masing sebagai tolok ukur kepadatan klaster."
          }
        ]
      },
      {
        "id": "9-4",
        "title": "9.4 Studi Kasus: Segmentasi Pelanggan Mall Customers (Kaggle)",
        "readingTime": "10 menit",
        "content": "\n### 1. Karakteristik Dataset Mall Customer Segmentation\n\nDataset ini memuat data profil dan transaksi 200 pelanggan di sebuah pusat perbelanjaan:\n- **Annual Income ($k$)**: Pendapatan tahunan pelanggan dalam ribuan dollar AS.\n- **Spending Score (1-100)**: Skor perilaku belanja yang dinilai oleh algoritma mall berdasarkan frekuensi kunjungan dan volume struk belanja.\n\nTujuan: Mengelompokkan pelanggan ke dalam persona segmen pasar untuk strategi pemasaran tertarget (*targeted marketing*).\n\n---\n\n### 2. Eksekusi Script & Penemuan 5 Persona Pelanggan\n\nJalankan script di bawah ini untuk melihat bagaimana model K-Means buatanmu mengelompokkan pelanggan ke dalam 5 klaster yang sangat nyata:\n1. **Klaster Hemat:** Pendapatan Tinggi, Skor Belanja Rendah.\n2. **Klaster Sultan / Boros:** Pendapatan Tinggi, Skor Belanja Tinggi.\n3. **Klaster Standar:** Pendapatan Menengah, Pengeluaran Menengah.\n4. **Klaster Kurang Mampu tapi Boros:** Pendapatan Rendah, Pengeluaran Tinggi.\n5. **Klaster Rasional:** Pendapatan Rendah, Pengeluaran Rendah.\n            ",
        "codePath": "modelling/06_k_means/studi_kasus.py",
        "syntaxBreakdown": [
          {
            "syntax": "X, customer_ids = load_mall_customers()",
            "explanation": "Memuat data 200 nasabah belanja Mall Customers dari file datasets/mall_customers.csv."
          },
          {
            "syntax": "model = KMeansManual(k=5, max_iter=300)",
            "explanation": "Menginisialisasi model K-Means dengan konfigurasi 5 klaster pasar berdasarkan hasil analisis Elbow Method."
          },
          {
            "syntax": "print(f'Final WCSS (Inertia): {model.inertia_:.2f}')",
            "explanation": "Melaporkan nilai WCSS akhir model setelah mencapai kondisi konvergensi mutlak."
          }
        ]
      }
    ]
  },
  {
    "id": "mod-10",
    "title": "Bab 10: Hierarchical Clustering (Agglomerative)",
    "icon": "10",
    "lessons": [
      {
        "id": "10-1",
        "title": "10.1 Konsep Bottom-Up (Agglomerative) & Visualisasi Dendrogram",
        "readingTime": "12 menit",
        "content": "\n### 1. Filosofi Klasterisasi Hierarkis\n\n#### Analogi Sederhana: Pohon Silsilah Keluarga (Family Tree)\nBayangkan Anda sedang menelusuri pohon silsilah keluarga besar Anda:\n- Anda dan saudara kandung Anda adalah dua individu berbeda, namun kalian berdua menyatu pada satu cabang: **Orang Tua**.\n- Orang tua Anda dan paman/bibi Anda menyatu pada cabang yang lebih tinggi: **Kakek-Nenek**.\n- Jika Anda terus menarik garis silsilah ke generasi ribuan tahun yang lalu, seluruh manusia di muka bumi pada akhirnya akan bermuara dan menyatu pada satu nenek moyang bersama yang sama.\n\nBerbeda dengan algoritma K-Means yang membagi data secara datar (*flat partition*) ke dalam sejumlah $K$ kelompok yang kaku, **Hierarchical Clustering** memodelkan derajat kekerabatan antar-data dalam bentuk struktur pohon bersarang bertingkat (*nested tree*).\n\nKlasterisasi hierarkis dibedakan menjadi dua pendekatan arah pembentukan:\n1. **Agglomerative Clustering (Bottom-Up - Dari Bawah ke Atas):**\n   - **Kondisi Awal:** Setiap butir sampel data dianggap sebagai satu klaster independen mandiri ($N$ baris data $= N$ klaster terpisah).\n   - **Iterasi Penggabungan:** Pada setiap langkah berurutan, dua klaster yang memiliki jarak paling dekat **digabungkan (*merged*)** menjadi satu klaster baru yang lebih besar.\n   - **Kondisi Akhir:** Proses penggabungan berulang terus-menerus hingga seluruh data menyatu ke dalam satu klaster raksasa tunggal di puncak pohon.\n2. **Divisive Clustering (Top-Down - Dari Atas ke Bawah):**\n   - Dimulai dengan seluruh data di dalam satu kelompok raksasa, lalu dipecah bertahap menjadi kelompok-kelompok kecil.\n\n---\n\n### 2. Membaca Dendrogram & Analogi Garis Gunting\n\nStruktur pohon hierarki divisualisasikan dalam bentuk diagram **Dendrogram**:\n- Sumbu horizontal (bawah) menampilkan setiap sampel data individu.\n- Sumbu vertikal (tinggi cabang) menampilkan **jarak matematis** saat dua kelompok data saling menyatu. Semakin tinggi garis jembatan penghubung dua cabang, semakin jauh perbedaan karakteristik antara kedua kelompok tersebut.\n\n#### Analogi Garis Potong Gunting (Horizontal Cut Threshold):\nBagaimana cara kita menentukan jumlah klaster $K$ dari sebuah Dendrogram?\nBayangkan Anda memegang sebilah gunting, lalu menarik **garis potong horizontal lurus** pada ketinggian jarak tertentu:\n- Banyaknya garis cabang tegak yang terpotong oleh gunting tersebut adalah **jumlah klaster ($K$)** yang akan Anda peroleh!\n- Jika Anda memotong di garis yang sangat tinggi, Anda mendapat sedikit klaster besar ($K = 2$).\n- Jika Anda memotong di garis yang lebih rendah, Anda membagi data ke dalam kelompok-kelompok yang lebih spesifik ($K = 5$).\n- Keunggulan luar biasa ini memungkinkan Anda memilih jumlah klaster secara fleksibel setelah pohon selesai dibuat, tanpa perlu melatih ulang model dari awal seperti halnya K-Means!\n\n---\n\n### 3. Kelemahan Komputasi & Peringatan Skalabilitas\n\n> PERINGATAN MEMORI & WAKTU KOMPETISI LKS:\n> Hierarchical Clustering memiliki kompleksitas komputasi waktu $\\mathcal{O}(N^3)$ (atau $\\mathcal{O}(N^2)$ pada versi teroptimasi) dan kompleksitas memori $\\mathcal{O}(N^2)$ karena wajib menyimpan seluruh matriks jarak pasangan ($N \\times N$). Jangan pernah menggunakan algoritma ini jika data Anda memiliki lebih dari $10.000$ baris data, karena komputer akan kehabisan RAM atau mengalami proses pembekuan (*freeze*)!\n            "
      },
      {
        "id": "10-2",
        "title": "10.2 Kriteria Linkage: Single, Complete, & Average",
        "readingTime": "14 menit",
        "content": "\n### 1. Formulasi Matematika Kriteria Keterkaitan (Linkage)\n\nBagaimana cara komputer mengukur jarak antara dua buah kelompok klaster $A$ dan $B$ jika masing-masing kelompok memuat banyak anggota data?\n\nDiberikan dua klaster $A = \\{\\mathbf{a}_1, \\dots, \\mathbf{a}_{|A|}\\}$ dan $B = \\{\\mathbf{b}_1, \\dots, \\mathbf{b}_{|B|}\\}$:\n\n---\n\n#### A. Single Linkage (Jarak Terpendek / Sahabat Terdekat)\nJarak antara klaster $A$ dan $B$ diukur dari jarak antara satu anggota $A$ yang paling dekat ke satu anggota $B$:\n\n$$d_{\\text{single}}(A, B) = \\min_{\\mathbf{a} \\in A, \\, \\mathbf{b} \\in B} \\|\\mathbf{a} - \\mathbf{b}\\|$$\n\n- **Analogi:** Dua kelompok pertemanan dianggap bersahabat hanya karena ada *satu orang* di kelompok A yang berteman dengan *satu orang* di kelompok B.\n- **Kelemahan Fatal:** Sangat rentan terhadap fenomena **Chaining Effect** (klaster merambat memanjang seperti rantai tipis karena dua kelompok besar dapat menyatu hanya karena ada sebutir debu data perantara di tengah-tengahnya).\n\n---\n\n#### B. Complete Linkage (Jarak Terjauh / Musuh Terjauh)\nJarak antara klaster $A$ dan $B$ diukur dari jarak antara dua anggota yang paling saling berjauhan di kedua kelompok:\n\n$$d_{\\text{complete}}(A, B) = \\max_{\\mathbf{a} \\in A, \\, \\mathbf{b} \\in B} \\|\\mathbf{a} - \\mathbf{b}\\|$$\n\n- **Analogi:** Dua kelompok pertemanan baru boleh digabungkan jika *dua anggota yang paling tidak akrab sekalipun* masih memenuhi batas toleransi jarak yang dekat.\n- **Keunggulan:** Menghasilkan klaster yang sangat padat, kompak (*compact clusters*), dan berdiameter seragam. **Merupakan kriteria linkage standar paling stabil dan disukai oleh juri LKS AI**.\n\n---\n\n#### C. Average Linkage (Jarak Rata-Rata Harmonis)\nRata-rata dari seluruh kombinasi jarak pasangan anggota antara kelompok $A$ dan $B$:\n\n$$d_{\\text{average}}(A, B) = \\frac{1}{|A| \\cdot |B|} \\sum_{\\mathbf{a} \\in A} \\sum_{\\mathbf{b} \\in B} \\|\\mathbf{a} - \\mathbf{b}\\|$$\n\n---\n\n### 2. Simulasi Hitung Manual Penggabungan Klaster dengan Angka Nyata\n\nMisalkan kita memiliki 4 titik data 1 dimensi pada garis bilangan:\n$$A = 2, \\quad B = 5, \\quad C = 9, \\quad D = 15$$\n\nKita gunakan kriteria **Complete Linkage**.\n\n#### Iterasi 0: Matriks Jarak Awal ($4 \\times 4$)\n| | A(2) | B(5) | C(9) | D(15) |\n|---|---|---|---|---|\n| **A(2)** | 0 | 3 | 7 | 13 |\n| **B(5)** | 3 | 0 | 4 | 10 |\n| **C(9)** | 7 | 4 | 0 | 6 |\n| **D(15)**| 13 | 10 | 6 | 0 |\n\nJarak terpendek di seluruh matriks adalah **$d(A, B) = 3$**.\n$\\implies$ **Gabungkan klaster $A$ dan $B$ menjadi satu klaster baru: $(AB)$ pada ketinggian jarak $h = 3$**.\n\n#### Iterasi 1: Perbarui Matriks Jarak dengan Complete Linkage\nHitung jarak dari $(AB)$ ke titik lainnya menggunakan aturan nilai maksimum ($\\max$):\n- $d((AB), C) = \\max(d(A, C), d(B, C)) = \\max(7, 4) = \\mathbf{7}$\n- $d((AB), D) = \\max(d(A, D), d(B, D)) = \\max(13, 10) = \\mathbf{13}$\n- $d(C, D) = |9 - 15| = \\mathbf{6}$\n\nMatriks Jarak Baru ($3 \\times 3$):\n| | (AB) | C | D |\n|---|---|---|---|\n| **(AB)** | 0 | 7 | 13 |\n| **C** | 7 | 0 | **6** |\n| **D** | 13 | **6** | 0 |\n\nJarak terpendek saat ini adalah **$d(C, D) = 6$**.\n$\\implies$ **Gabungkan klaster $C$ dan $D$ menjadi klaster baru: $(CD)$ pada ketinggian $h = 6$**.\n\n#### Iterasi 2: Penggabungan Puncak\nHitung jarak antara $(AB)$ dan $(CD)$:\n- $d((AB), (CD)) = \\max(d(A, C), d(A, D), d(B, C), d(B, D)) = \\max(7, 13, 4, 10) = \\mathbf{13}$\n\n$\\implies$ **Gabungkan seluruh kelompok $((AB), (CD))$ menjadi satu pohon silsilah lengkap pada ketinggian puncak $h = 13$**.\n            "
      },
      {
        "id": "10-3",
        "title": "10.3 Praktikum Koding: Class HierarchicalClustering Manual",
        "readingTime": "11 menit",
        "content": "\nBerikut adalah implementasi lengkap algoritma Agglomerative Hierarchical Clustering mandiri menggunakan kalkulasi matriks jarak pasangan (*pairwise distance matrix*) dan slicing sub-matriks `np.ix_` murni NumPy.\n\nPerhatikan kotak **Bedah Sintaks & Alur Perhitungan Matematis** di bawah untuk memahami proses penggabungan klaster iteratif dan pembaruan label.\n            ",
        "codePath": "modelling/07_hierarchical_clustering/contoh_program.py",
        "syntaxBreakdown": [
          {
            "syntax": "diff = X[:, np.newaxis, :] - X[np.newaxis, :, :]; dist_matrix = np.sqrt(np.sum(diff ** 2, axis=-1))",
            "explanation": "Kalkulasi Matriks Jarak Pasangan (Pairwise Distance Matrix): Memanfaatkan trik penyiaran (broadcasting) dimensi np.newaxis untuk menghitung seluruh N x N kombinasi jarak Euclidean antar-titik secara instan tanpa perulangan for bertingkat."
          },
          {
            "syntax": "np.fill_diagonal(dist_matrix, np.inf)",
            "explanation": "Mengisi nilai diagonal matriks (jarak dari suatu titik ke dirinya sendiri yang bernilai 0) dengan nilai Infinity agar titik tidak memilih dirinya sendiri saat mencari jarak minimum."
          },
          {
            "syntax": "sub_matrix = dist_matrix[np.ix_(cluster_a_indices, cluster_b_indices)]",
            "explanation": "Menggunakan np.ix_ untuk mengekstraksi sub-matriks jarak khusus antara seluruh anggota klaster A terhadap seluruh anggota klaster B."
          },
          {
            "syntax": "linkage_dist = np.max(sub_matrix) if self.linkage == 'complete' else np.min(sub_matrix)",
            "explanation": "Menerapkan kriteria Complete Linkage (mengambil nilai jarak maksimum) atau Single Linkage (mengambil nilai jarak minimum) dari sub-matriks pasangan."
          },
          {
            "syntax": "self.labels_[current_clusters[cluster_b]] = cluster_a",
            "explanation": "Tahap Penggabungan: Memperbarui label seluruh anggota klaster B menjadi label klaster A, menyatukan kedua himpunan ke dalam satu identitas kelompok."
          }
        ]
      },
      {
        "id": "10-4",
        "title": "10.4 Studi Kasus: Klasterisasi Nasabah & Evaluasi Linkage",
        "readingTime": "10 menit",
        "content": "\n### 1. Pengujian Kriteria Linkage pada Data Nyata\n\nPada sub-bab penutup ini, kita menguji model Hierarchical Clustering mandiri buatanmu pada subset data nasabah belanja Mall Customers untuk membandingkan stabilitas segmentasi antara **Complete Linkage** vs **Single Linkage**.\n\n---\n\n### 2. Eksekusi Script & Evaluasi Dendrogram\n\nJalankan script di bawah ini untuk melihat bagaimana penggabungan bottom-up berlangsung dari 20 sampel nasabah awal hingga membentuk klaster belanja yang solid.\n            ",
        "codePath": "modelling/07_hierarchical_clustering/studi_kasus.py",
        "syntaxBreakdown": [
          {
            "syntax": "model = HierarchicalClusteringManual(n_clusters=3, linkage='complete')",
            "explanation": "Menginisialisasi model Agglomerative dengan target 3 klaster akhir dan kriteria Complete Linkage."
          },
          {
            "syntax": "model.fit(X_sample)",
            "explanation": "Menjalankan proses penggabungan beruntun dari N klaster mandiri menjadi 3 kelompok nasabah final."
          }
        ]
      }
    ]
  }
];
