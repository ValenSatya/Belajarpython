"""
MODUL 1: FONDASI MACHINE LEARNING, ALUR PEMODELAN, & PRAPEMROSESAN DATA (LKS AI)
"""

MODULE_DATA = {
    "id": "mod-1",
    "title": "Bab 1: Fondasi Machine Learning & Prapemrosesan Data",
    "icon": "01",
    "lessons": [
        {
            "id": "1-1",
            "title": "1.1 Pengenalan Machine Learning & Paradigma Belajar",
            "readingTime": "10 menit",
            "content": r"""
### 1. Apa itu Machine Learning? Filosofi & Definisi Formal

Secara sederhana, **Machine Learning (ML)** adalah cabang dari kecerdasan buatan (*Artificial Intelligence*) yang memberikan komputer kemampuan untuk belajar dari data dan pengalaman masa lalu tanpa perlu diprogram aturan logikanya secara eksplisit satu per satu.

Dalam pemrograman konvensional, seorang insinyur perangkat lunak harus menulis ribuan baris aturan kondisi jika-maka (`if-else`) secara manual:
$$\text{Data} + \text{Aturan Manual (Rules)} \xrightarrow{\text{Program Tradisional}} \text{Jawaban (Output)}$$

Pendekatan manual ini mustahil digunakan pada masalah dunia nyata yang kompleks, seperti membedakan wajah seseorang, mendiagnosis penyakit dari citra medis, atau memprediksi fluktuasi harga pasar. Pada masalah-masalah tersebut, pola datanya terlalu rumit untuk dirumuskan ke dalam kode `if-else`.

Machine Learning membalik paradigma tersebut secara fundamental:
$$\text{Data} + \text{Jawaban Asli (Ground Truth)} \xrightarrow{\text{Algoritma ML}} \text{Model (Aturan Matematis Mandiri)}$$

Komputer diberikan ratusan hingga jutaan contoh data beserta hasil sebenarnya, lalu algoritma matematika akan **mengekstrak pola dan fungsi aproksimasi secara otomatis**.

---

### 2. Definisi Formal: Konsep Tugas (T), Performa (P), & Pengalaman (E)

Secara akademis dan standar kompetisi rekayasa AI internasional, definisi formal Machine Learning dirumuskan oleh Prof. Tom Mitchell (1997):

> "Sebuah program komputer dikatakan belajar dari **Pengalaman** $E$ berkenaan dengan suatu **Tugas** $T$ dan ukuran **Performa** $P$, jika performanya pada tugas $T$, sebagaimana diukur oleh $P$, meningkat seiring dengan bertambahnya pengalaman $E$."

Secara matematis, relasi ini dapat dituliskan sebagai:
$$P(T) \uparrow \quad \text{seiring bertambahnya pengalaman} \quad E$$

Sebagai contoh dalam konteks LKS AI (Studi Kasus Deteksi Penyakit Diabetes):
- **Tugas ($T$):** Memprediksi apakah seorang pasien menderita diabetes ($1$) atau sehat ($0$) berdasarkan rekam medis.
- **Pengalaman ($E$):** Dataset historis ribuan pasien berisi kadar glukosa, insulin, BMI, dan usia beserta diagnosis aslinya.
- **Ukuran Performa ($P$):** Skor F1-Score atau akurasi klasifikasi pada data uji pasien baru.

---

### 3. Taksonomi Paradigma Pembelajaran Mesin

Dalam silabus pemodelan LKS AI, Machine Learning dikelompokkan ke dalam dua paradigma utama:

#### 1. Pembelajaran Terbimbing (Supervised Learning)
Dataset pelatihan dilengkapi dengan kunci jawaban atau label target yang benar (**Ground Truth**):
$$\mathcal{D} = \{(\mathbf{x}_i, y_i)\}_{i=1}^N$$
Tujuan model adalah mempelajari fungsi pemetaan matematis $f: \mathcal{X} \to \mathcal{Y}$ sehingga $\hat{y} = f(\mathbf{x})$ sedekat mungkin dengan $y$ sebenarnya.

Supervised Learning terbagi menjadi dua sub-kategori:
- **Klasifikasi:** Nilai target $y$ bersifat diskrit / kategori kualitatif.
  - *Contoh:* Memprediksi jenis bunga Iris (Setosa / Versicolor / Virginica), deteksi keaslian uang kertas (Asli / Palsu), status diabetes.
  - *Algoritma:* K-Nearest Neighbors (KNN), Decision Tree, Gaussian Naive Bayes, Regresi Logistik.
- **Regresi:** Nilai target $y$ bersifat kontinu / numerik riil ($\mathbb{R}$).
  - *Contoh:* Memprediksi angka penjualan berdasarkan anggaran iklan TV/Radio, memprediksi harga properti, estimasi suhu.
  - *Algoritma:* Regresi Linier (Ordinary Least Squares & Gradient Descent).

#### 2. Pembelajaran Mandiri (Unsupervised Learning)
Dataset pelatihan **tidak memiliki label target sama sekali** ($y$ tidak tersedia):
$$\mathcal{D} = \{\mathbf{x}_i\}_{i=1}^N$$
Model dibiarkan bekerja secara mandiri mencari struktur laten, pola keteraturan, kedekatan spasial, atau pengelompokan alami yang tersembunyi di balik data.

- **Klastering (Clustering):** Mengelompokkan observasi yang memiliki karakteristik mirip ke dalam satu kelompok (*cluster*).
  - *Contoh:* Segmentasi profil perilaku belanja pelanggan mal (*Mall Customers*), pengelompokan dokumen berita.
  - *Algoritma:* K-Means Clustering (Lloyd's Algorithm), Hierarchical Agglomerative Clustering (Dendrogram).

---

### 4. Representasi Data Matematis: Skalar, Vektor, & Matriks

Seluruh operasi komputasi di Machine Learning pada dasarnya adalah komputasi aljabar linier pada larik numerik NumPy:

1. **Vektor Sampel Tunggal ($\mathbf{x}_i$):**
   Satu baris data nasabah atau bunga direpresentasikan sebagai vektor kolom di ruang hiperspace berdimensi $m$:
   $$\mathbf{x}_i = \begin{bmatrix} x_{i1} \\ x_{i2} \\ \vdots \\ x_{im} \end{bmatrix} \in \mathbb{R}^m$$

2. **Matriks Fitur Keseluruhan ($\mathbf{X}$):**
   Kumpulan seluruh $N$ observasi disusun menjadi matriks dua dimensi berukuran $N \times m$:
   $$\mathbf{X} = \begin{bmatrix} x_{11} & x_{12} & \cdots & x_{1m} \\ x_{21} & x_{22} & \cdots & x_{2m} \\ \vdots & \vdots & \ddots & \vdots \\ x_{N1} & x_{N2} & \cdots & x_{Nm} \end{bmatrix} \in \mathbb{R}^{N \times m}$$

3. **Vektor Target ($\mathbf{y}$):**
   Nilai label kebenaran disimpan dalam vektor 1D berukuran $N$:
   $$\mathbf{y} = [y_1, y_2, \dots, y_N]^T \in \mathbb{R}^N$$

---

### 5. Konsep Parameter vs Hiperparameter (Pembedaan Krusial)

> PERINGATAN UJIAN LKS:
> Juri kompetisi LKS AI sangat sering menguji pemahaman peserta mengenai perbedaan mendasar antara **Parameter** dan **Hiperparameter**. Jangan sampai tertukar!

| Aspek | Parameter Model | Hiperparameter Model |
|---|---|---|
| **Definisi** | Nilai internal yang dihitung & diperbarui sendiri oleh algoritma dari data | Nilai setelan arsitektur yang wajib ditentukan manual oleh manusia |
| **Kapan Ditentukan?** | Dipelajari secara otomatis selama fase training (`.fit()`) | Ditentukan sebelum fase pelatihan dimulai |
| **Contoh Nyata** | Bobot $w$ dan bias $b$ pada Regresi Linier, Centroid $\mu$ pada K-Means | Nilai tetangga $K$ pada KNN, Laju Belajar $\alpha$, Max Depth pada Decision Tree |
| **Metode Penentuan** | Optimasi analitis OLS atau algoritma Gradient Descent | Teknik tuning coba-coba terencana, Grid Search, atau Elbow Method |
            """
        },
        {
            "id": "1-2",
            "title": "1.2 Alur Lengkap Pemodelan Machine Learning (ML Pipeline)",
            "readingTime": "11 menit",
            "content": r"""
### 1. Filosofi Alur Kerja Pemodelan (The Machine Learning Lifecycle)

Membangun solusi AI di ajang LKS bukanlah sekadar menulis satu baris pemanggilan algoritma. Pemodelan Machine Learning adalah sebuah **rantai proses saintifik yang berurutan (pipeline)**. Jika salah satu mata rantai di bagian awal cacat (misal terjadi kebocoran data saat normalisasi), maka seluruh hasil prediksi di ujung akhir akan runtuh dan tidak valid.

Secara umum, siklus pemodelan standar kompetisi LKS AI terbagi menjadi 6 tahapan inti yang saling terhubung erat.

---

### 2. Bedah 6 Tahapan Inti Pipeline Pemodelan

#### Tahap 1: Problem Understanding & Data Ingestion
- Membaca dan membedah berkas data mentah (CSV/Excel) ke dalam matriks NumPy.
- Memeriksa bentuk struktur data (`X.shape`), jumlah observasi $N$, dan dimensi fitur $m$.
- Menentukan sifat masalah secara presisi: Apakah ini kasus **Supervised Classification** (prediksi kelas biner/multi-kelas), **Supervised Regression** (estimasi nilai angka kontinu), atau **Unsupervised Clustering** (segmentasi tanpa label)?

#### Tahap 2: Pemisahan Data Latih & Data Uji (Train-Test Split)
- **Kaidah Emas LKS AI:** Pemisahan dataset menjadi Data Latih ($X_{\text{train}}, y_{\text{train}}$) dan Data Uji ($X_{\text{test}}, y_{\text{test}}$) **wajib dieksekusi sebelum melakukan transformasi atau penskalaan apapun**.
- Data uji diisolasi dan "disimpan di dalam brankas", tidak boleh dilihat atau dipelajari sedikitpun oleh model sebelum tahap evaluasi akhir.

#### Tahap 3: Prapemrosesan & Penskalaan Fitur (Feature Scaling)
- Menyamakan skala angka antar-kolom agar fitur berangka besar (seperti pendapatan jutaan) tidak mendominasi fitur berangka kecil (seperti usia).
- Menggunakan **Standardisasi Z-Score** atau **Normalisasi Min-Max**.
- **Wajib Bebas Data Leakage:** Nilai rata-rata ($\mu$) dan standar deviasi ($\sigma$) hanya dihitung dari data latih (`scaler.fit(X_train)`), kemudian formula yang sama diterapkan ke data latih dan data uji (`scaler.transform`).

#### Tahap 4: Pelatihan Model (Model Training / `.fit()`)
- Menginisialisasi kelas algoritma yang sesuai (misal `KNNManual`, `LinearRegressionGD`, atau `DecisionTreeManual`).
- Menjalankan proses optimasi matematika: algoritma membaca data latih untuk menghitung dan memperbarui nilai parameter internalnya ($w, b, \mu$).

#### Tahap 5: Inferensi & Prediksi Data Baru (`.predict()`)
- Memasukkan data uji baru $X_{\text{test}}$ (yang sudah diskalakan dengan parameter scaler data latih) ke fungsi prediksi model.
- Model mengeluarkan vektor tebakan akhir: $\mathbf{\hat{y}} = [\hat{y}_1, \hat{y}_2, \dots, \hat{y}_{N_{\text{test}}}]^T$.

#### Tahap 6: Evaluasi Kinerja Objektif (Model Evaluation)
- Membandingkan vektor tebakan model $\mathbf{\hat{y}}$ terhadap kenyataan sebenarnya $\mathbf{y}_{\text{test}}$.
- Menghitung metrik penilaian ilmiah:
  - Kasus Klasifikasi: Confusion Matrix, Presisi, Recall, dan F1-Score.
  - Kasus Regresi: Mean Absolute Error (MAE), Mean Squared Error (MSE), dan $R^2$ Score.
  - Kasus Klastering: Inertia (WCSS) dan Silhouette Score.

---

### 3. Masalah Utama Pemodelan: Trade-Off Bias vs Variansi

Dalam dunia pemodelan, performa model selalu berhadapan dengan dua jenis kesalahan (*errors*):

1. **Bias (Kekakuan Model / Underfitting):**
   - Terjadi ketika model terlalu sederhana (misalnya memaksakan garis lurus regresi pada data yang hubungannya melengkung rumit).
   - Gejala: Akurasi buruk pada data latih dan juga buruk pada data uji.
   - Solusi: Tingkatkan kapasitas model, tambah fitur pendukung baru, atau kurangi batasan model.

2. **Variansi (Kerapuhan Generalisasi / Overfitting):**
   - Terjadi ketika model terlalu rumit dan menghafal detail bising (*noise*) pada data latih.
   - Gejala: Akurasi data latih sangat tinggi ($99\% - 100\%$), namun akurasi anjlok saat diuji dengan data baru ($60\%$).
   - Solusi: Lakukan penyederhanaan model (misal *pruning* pada Decision Tree, naikkan nilai $K$ pada KNN), lakukan seleksi fitur, atau kumpulkan lebih banyak data latih.

> TIPS JUARA LKS AI:
> Selalu bandingkan performa model pada **Data Latih** vs **Data Uji**. Jika nilai evaluasi pada data latih dan data uji seimbang dan sama-sama tinggi, model Anda berada pada kondisi optimal (**Good Fit** / Generalisasi Kuat).
            """
        },
        {
            "id": "1-3",
            "title": "1.3 Pembagian Dataset & Bahaya Fatal Data Leakage",
            "readingTime": "10 menit",
            "content": r"""
### 1. Filosofi Pembagian Dataset: Generalisasi vs Memorization

#### Analogi Sederhana: Belajar Kisi-Kisi vs Soal Ujian Asli
Bayangkan Anda sedang melatih seorang siswa untuk mengikuti lomba olimpiade sains. Jika Anda memberikan lembar soal ujian asli saat latihan di kelas, siswa tersebut bisa dengan mudah mendapatkan nilai sempurna 100 karena dia hanya **menghafal** soal tersebut (*memorization*). Namun ketika hari lomba tiba dan soalnya sedikit dimodifikasi, siswa tersebut akan panik dan nilainya anjlok!

Dalam Machine Learning, konsepnya persis sama:
- **Data Latih (Training Set):** Buku panduan dan contoh soal untuk bahan belajar model (`.fit()`).
- **Data Uji (Test Set):** Lembar ujian sesungguhnya yang disegel rapat dan hanya dibuka saat evaluasi akhir (`.predict()`).
- **Tujuan Akhir:** Model mampu **menggeneralisasi** pola, yaitu tetap cerdas dan akurat saat menjawab data baru yang belum pernah dilihat sebelumnya (*unseen data*).

---

### 2. Bahaya Fatal: Data Leakage (Kebocoran Data)

> JEBAKAN UJIAN LKS AI:
> Kesalahan paling fatal yang sering menyebabkan peserta LKS AI tereliminasi atau mendapat pengurangan nilai drastis dari dewan juri adalah **Data Leakage (Kebocoran Informasi)** pada tahap prapemrosesan data.

#### Apa itu Data Leakage? (Analogi Mencuri Dengar Kunci Jawaban)
Data Leakage terjadi ketika informasi statistik dari data uji (*test set*) secara tidak sengaja merembes atau digunakan dalam proses pelatihan model. Ini persis seperti seorang siswa yang mencuri dengar rata-rata nilai dan kisi-kisi soal ujian sebelum ujian resmi dimulai. Nilai evaluasinya tampak tinggi, tetapi itu adalah performa palsu (*optimistic bias*).

**Skenario Pelanggaran yang Kerap Dilakukan Pemula:**
1. Menggabungkan seluruh data mentah (misal 1.000 baris).
2. Menghitung rata-rata ($\mu$) dan standar deviasi ($\sigma$) dari **seluruh 1.000 baris** sekaligus untuk melakukan scaling.
3. Baru kemudian membagi data menjadi *train set* dan *test set*.

**Mengapa ini adalah Pelanggaran Ilmiah?**
Ketika Anda menghitung $\mu$ dari 1.000 baris, nilai rata-rata tersebut telah dipengaruhi oleh data uji. Model Anda kini telah "mencuri dengar" distribusi data uji sebelum ujian dimulai. Hasil metrik evaluasi pada *test set* menjadi bias optimistik palsu.

**Prosedur Baku Standar LKS AI:**
1. Lakukan **Split Data terlebih dahulu** menjadi $X_{\text{train}}, X_{\text{test}}, y_{\text{train}}, y_{\text{test}}$.
2. Hitung statistik transformasi (seperti $\mu$, $\sigma$, $x_{\min}$, $x_{\max}$) **hanya dan secara eksklusif** dari $X_{\text{train}}$ (`scaler.fit(X_train)`).
3. Terapkan transformasi tersebut ke $X_{\text{train}}$ dan $X_{\text{test}}$ (`scaler.transform(X_train)` dan `scaler.transform(X_test)`).

---

### 3. Formulasi Matematika & Simulasi Sampling Acak

Pembagian dataset secara acak tanpa pengembalian (*uniform random sampling without replacement*) dilakukan dengan memetakan indeks observasi $\{0, 1, 2, \dots, N-1\}$ ke dalam permutasi acak:

$$\pi = \text{Permutasi}(\{0, 1, \dots, N-1\})$$

#### Bedah Simbol Rumus:
- $N$: Total seluruh baris data yang kita miliki.
- $r_{\text{test}}$: Rasio data uji (umumnya $0.20$ untuk 20% data uji, atau $0.30$ untuk 30%).
- $N_{\text{test}} = \text{round}(N \times r_{\text{test}})$: Jumlah pasti baris data yang dialokasikan untuk ujian.
- $N_{\text{train}} = N - N_{\text{test}}$: Sisa baris data yang dialokasikan untuk bahan latihan.
- $I_{\text{train}} \cap I_{\text{test}} = \emptyset$: Simbol irisan kosong, artinya tidak boleh ada satu pun data latihan yang merangkap menjadi data uji!

Indeks data latihan dan data uji dipartisi secara ortogonal:

$$I_{\text{test}} = \{\pi_0, \pi_1, \dots, \pi_{N_{\text{test}}-1}\}, \quad I_{\text{train}} = \{\pi_{N_{\text{test}}}, \dots, \pi_{N-1}\}$$

#### Simulasi Hitung Manual Pembagian 10 Data:
Misalkan kita memiliki 10 sampel data dengan rasio uji $20\%$ ($r_{\text{test}} = 0.20$):
- $N = 10$ sampel.
- $N_{\text{test}} = \text{round}(10 \times 0.20) = 2$ sampel.
- $N_{\text{train}} = 10 - 2 = 8$ sampel.

| Indeks Awal | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|---|
| Permutasi Acak ($\pi$) | 7 | 2 | 9 | 0 | 4 | 1 | 8 | 3 | 6 | 5 |
| Alokasi Partisi | Test | Test | Train | Train | Train | Train | Train | Train | Train | Train |

Hasil partisi:
- Indeks Test: $[7, 2]$
- Indeks Train: $[9, 0, 4, 1, 8, 3, 6, 5]$

---

### 4. Random Split vs Stratified Split

Pada kasus klasifikasi dengan distribusi kelas tidak seimbang (*imbalanced dataset*, misal kasus deteksi kanker di mana hanya 5% sampel positif), *Simple Random Split* berisiko menghasilkan *test set* yang **sama sekali tidak memuat kelas positif**.

Pada kondisi tersebut, metode **Stratified Sampling** wajib diterapkan: proses partisi dilakukan terpisah di dalam masing-masing kelas target sehingga proporsi kelas pada $y_{\text{train}}$ dan $y_{\text{test}}$ identik dengan proporsi populasi awal.

> TIPS JUARA LKS AI:
> Selalu kunci nilai acak menggunakan parameter `random_state` (misal `np.random.seed(42)`). Ini menjamin eksperimen Anda bersifat *reproducible* (dapat direplikasi secara persis oleh juri saat pengujian modul).
            """,
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
            "content": r"""
### 1. Masalah Disparitas Magnitudo: Mengapa Perlu Normalisasi?

#### Analogi Sederhana: Membandingkan Gaji Jutaan Rupiah vs Usia Puluhan Tahun
Bayangkan Anda menganalisis kelayakan kredit nasabah bank berdasarkan dua kolom data:
- **Usia Nasabah:** Berkisar antara $18$ sampai $70$ tahun (skala puluhan).
- **Pendapatan Tahunan:** Berkisar antara Rp $30.000.000$ sampai Rp $500.000.000$ (skala ratusan juta).

Jika kedua data ini dihitung langsung oleh rumus jarak matematika (seperti pada KNN atau K-Means), selisih gaji Rp 1.000.000 akan mengalahkan selisih usia 5 tahun dengan kekuatan **1.000.000 banding 5**! Komputer akan mengira bahwa usia nasabah sama sekali tidak berguna, padahal itu murni akibat perbedaan satuan ukur (Rupiah vs Tahun).

**Tujuan Normalisasi:** Menyamakan level permainan (*level playing field*) dengan mengubah seluruh angka menjadi skor persentase murni antara $0.0$ ($0\%$) sampai $1.0$ ($100\%$).

---

### 2. Formulasi Matematika Min-Max Scaling

Normalisasi Min-Max memetakan nilai fitur asli $x$ secara linier ke dalam rentang tertutup $[0.0, 1.0]$:

$$x_{\text{norm}} = \frac{x - x_{\min}}{x_{\max} - x_{\min}}$$

#### Bedah Simbol Rumus:
- $x$: Nilai angka asli yang ingin diubah skalanya.
- $x_{\min}$: Nilai paling kecil yang ada di kolom tersebut pada data latih (akan menjadi $0.0$).
- $x_{\max}$: Nilai paling besar yang ada di kolom tersebut pada data latih (akan menjadi $1.0$).
- $x_{\max} - x_{\min}$: Jangkauan (*range*) total dari nilai terendah ke tertinggi.
- $x - x_{\min}$: Seberapa jauh nilai kita dari garis dasar paling bawah.

Jika kita ingin memetakan ke rentang kustom sembarang $[a, b]$ (misalnya $[-1, 1]$):

$$x' = a + \frac{x - x_{\min}}{x_{\max} - x_{\min}} \times (b - a)$$

---

### 3. Simulasi Perhitungan Manual Langkah Demi Langkah

Misalkan kita memiliki data 3 orang pelamar kerja dengan dua fitur: [Usia (tahun), Nilai Tes (skala 0-100)]:

| Sampel | Usia ($x_1$) | Nilai Tes ($x_2$) |
|---|---|---|
| Pelamar A | 20 | 85 |
| Pelamar B | 30 | 95 |
| Pelamar C | 40 | 75 |

#### Langkah 1: Tentukan Nilai Ekstrem Tiap Fitur (Data Latih)
- Fitur Usia ($x_1$): $x_{1,\min} = 20, \quad x_{1,\max} = 40 \implies \Delta x_1 = 40 - 20 = 20$
- Fitur Nilai Tes ($x_2$): $x_{2,\min} = 75, \quad x_{2,\max} = 95 \implies \Delta x_2 = 95 - 75 = 20$

#### Langkah 2: Hitung Normalisasi Tiap Elemen
- **Pelamar A:**
  $$x_{1,\text{norm}} = \frac{20 - 20}{20} = 0.000$$
  $$x_{2,\text{norm}} = \frac{85 - 75}{20} = \frac{10}{20} = 0.500$$
- **Pelamar B:**
  $$x_{1,\text{norm}} = \frac{30 - 20}{20} = 0.500$$
  $$x_{2,\text{norm}} = \frac{95 - 75}{20} = \frac{20}{20} = 1.000$$
- **Pelamar C:**
  $$x_{1,\text{norm}} = \frac{40 - 20}{20} = 1.000$$
  $$x_{2,\text{norm}} = \frac{75 - 75}{20} = 0.000$$

Hasil Matriks Ternormalisasi:
$$\begin{bmatrix} 0.0 & 0.5 \\ 0.5 & 1.0 \\ 1.0 & 0.0 \end{bmatrix}$$

Kedua fitur kini memiliki bobot pengaruh yang setara dan adil bagi algoritma.

---

### 4. Kelemahan Kritis: Kerentanan terhadap Pencilan (Outlier)

> BAHAYA OUTLIER PADA MIN-MAX:
> Normalisasi Min-Max sangat rentan terhadap data pencilan (*extreme outliers*). 

Bayangkan jika tiba-tiba masuk seorang pelamar kehormatan berusia 80 tahun ($x_1 = 80$):
- Nilai $x_{1,\max}$ langsung melonjak drastis dari 40 menjadi 80.
- Penyebut pembagi membengkak menjadi $80 - 20 = 60$.
- Pelamar B (usia 30) yang tadinya bernilai normalisasi seimbang $0.5$, kini jatuh tertekan ke $\frac{30 - 20}{60} = 0.166$.

Akibatnya, mayoritas data normal akan tergencet ke sudut sempit mendekati 0, sehingga model kehilangan kemampuan untuk membedakan variasi data pelamar biasa.
            """,
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
            "content": r"""
### 1. Filosofi Distribusi Normal Baku (Standard Normal Distribution)

#### Analogi Sederhana: Menilai Nilai Rapor Relatif Terhadap Kelas
Jika Anda mendapat nilai 85 pada ujian matematika yang sangat rumit di mana rata-rata kelas hanya 50, nilai 85 Anda adalah pencapaian yang luar biasa tinggi! Sebaliknya, jika rata-rata kelas adalah 95, nilai 85 justru berada di bawah rata-rata.

Standardisasi Z-Score tidak melihat angka mentah secara kaku, melainkan mengukur: **"Seberapa jauh posisi suatu data menyimpang dari nilai rata-rata kelompoknya, dihitung dalam satuan simpangan baku (standar deviasi)?"**

Secara matematis, data diubah menjadi distribusi normal baku:
$$X \sim \mathcal{N}(\mu, \sigma^2) \xrightarrow{\text{Z-Score}} Z \sim \mathcal{N}(0, 1)$$

- **Pusat Nilai Digeser Tepat ke 0 ($\mu = 0$):** Data yang nilainya sama dengan rata-rata akan bernilai 0.
- **Skala Sebaran Dibuat Seragam 1 ($\sigma = 1$):** Angka positif berarti di atas rata-rata, angka negatif berarti di bawah rata-rata.
- **Tahan Terhadap Outlier:** Karena tidak dikunci pada batas [0, 1], data pencilan tidak akan menekan atau merusak posisi data normal lainnya.

---

### 2. Formulasi Matematika Lengkap

Diberikan sebuah kolom fitur yang terdiri dari $N$ observasi: $\mathbf{x} = [x_1, x_2, \dots, x_N]^T$.

#### Langkah 1: Nilai Rata-rata Aritmatika (Sample Mean)
$$\mu = \frac{1}{N} \sum_{i=1}^N x_i$$
*(Menghitung titik keseimbangan tengah data)*

#### Langkah 2: Variansi dan Standar Deviasi (Standard Deviation)
$$\sigma = \sqrt{\frac{1}{N} \sum_{i=1}^N (x_i - \mu)^2}$$
*(Mengukur seberapa lebar data menyebar dari titik tengahnya)*

#### Langkah 3: Transformasi Skor Standar (Z-Score)
$$z_i = \frac{x_i - \mu}{\sigma}$$

#### Bedah Simbol Rumus:
- $x_i$: Nilai data asli ke-$i$.
- $x_i - \mu$: Selisih jarak data ke rata-rata (disebut *Mean Centering*).
- $\sigma$: Nilai standar deviasi sebagai pembagi pembuat skala satuan.
- $z_i = 0$: Nilai tepat sama dengan rata-rata.
- $z_i = +1.5$: Nilai $1.5$ simpangan baku di atas rata-rata.
- $z_i = -2.0$: Nilai $2$ simpangan baku di bawah rata-rata.

---

### 3. Simulasi Perhitungan Manual dengan Angka Nyata

Misalkan kita memiliki satu kolom fitur: Kadar Hemoglobin dari 4 pasien $[12, 14, 16, 18]$ g/dL:

| Pasien | $x_i$ | $(x_i - \mu)$ | $(x_i - \mu)^2$ | $z_i = (x_i - \mu) / \sigma$ |
|---|---|---|---|---|
| 1 | 12 | $12 - 15 = -3$ | $(-3)^2 = 9$ | $-3 / 2.236 = \mathbf{-1.3416}$ |
| 2 | 14 | $14 - 15 = -1$ | $(-1)^2 = 1$ | $-1 / 2.236 = \mathbf{-0.4472}$ |
| 3 | 16 | $16 - 15 = +1$ | $(+1)^2 = 1$ | $+1 / 2.236 = \mathbf{+0.4472}$ |
| 4 | 18 | $18 - 15 = +3$ | $(+3)^2 = 9$ | $+3 / 2.236 = \mathbf{+1.3416}$ |
| **Total** | **60** | **0** | **20** | **Rata-rata Z = 0** |

#### Perhitungan Statistik:
1. Rata-rata: $\mu = \frac{12 + 14 + 16 + 18}{4} = \frac{60}{4} = 15$
2. Variansi: $\sigma^2 = \frac{20}{4} = 5.0$
3. Standar Deviasi: $\sigma = \sqrt{5.0} \approx 2.236$

Perhatikan bagaimana nilai $z_i$ simetris terhadap titik 0.

---

### 4. Tabel Perbandingan Kritis: Kapan Memilih Min-Max vs Z-Score?

| Kriteria | Min-Max Normalization | Z-Score Standardization |
|---|---|---|
| **Rentang Output** | Kaku, dibatasi $[0.0, 1.0]$ | Tak terbatas, berpusat di $0$ (umumnya $[-3, +3]$) |
| **Pusat Data** | Tidak berpusat di 0 | Berpusat tepat di $\mu = 0$ (*Zero-centered*) |
| **Ketahanan Outlier** | **Sangat Rendah** (Outlier menekan data normal) | **Tinggi** (Pencilan tidak merusak skala titik lainnya) |
| **Cocok untuk** | Neural Network (Sigmoid), Image Pixel ($[0, 255]$) | Regresi Linier, Regresi Logistik, KNN, PCA, SVM |
| **Asumsi Distribusi** | Tidak berasumsi pada bentuk distribusi data | Ideal jika fitur mendekati distribusi normal (lonceng) |

> TIPS JUARA LKS AI:
> Pada hampir seluruh algoritma Machine Learning yang memanfaatkan turunan fungsi (*Gradient Descent*) atau perhitungan jarak (*Euclidean Distance*), **Z-Score Standardization adalah pilihan default terbaik** karena memastikan gradien turun secara konvergen dan stabil di semua sumbu fitur.

> TIPS JUARA LKS AI:
> Pada hampir seluruh algoritma Machine Learning yang memanfaatkan turunan fungsi (*Gradient Descent*) atau perhitungan jarak (*Euclidean Distance*), **Z-Score Standardization adalah pilihan default terbaik** karena memastikan gradien turun secara konvergen dan stabil di semua sumbu fitur.
            """,
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
}
