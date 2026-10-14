"""
MODUL 2: K-NEAREST NEIGHBORS (KNN) (LKS AI)
"""

MODULE_DATA = {
    "id": "mod-2",
    "title": "Bab 2: K-Nearest Neighbors (KNN)",
    "icon": "02",
    "lessons": [
        {
            "id": "2-1",
            "title": "2.1 Konsep Dasar, Ruang Metrik, & Karakteristik Lazy Learner",
            "readingTime": "10 menit",
            "content": r"""
### 1. Filosofi Kedekatan Spasial (Spatial Proximity)

#### Analogi Sederhana: Memilih Warung Makan dari Rekomendasi Tetangga
Bayangkan Anda baru saja pindah ke rumah baru di kota yang asing. Saat lapar di malam hari, Anda bingung warung makan mana yang enak dan higienis. Cara paling alami dan masuk akal yang Anda lakukan adalah bertanya kepada 3 atau 5 orang tetangga terdekat di sekitar rumah Anda (*Nearest Neighbors*). 

Jika 2 dari 3 tetangga Anda merekomendasikan "Warung Nasi Goreng Pak Budi" dan hanya 1 orang merekomendasikan warung lain, Anda akan dengan percaya diri memutuskan makan di Warung Pak Budi (*Majority Voting*).

Prinsip dasar algoritma **K-Nearest Neighbors (KNN)** bekerja persis seperti peribahasa tersebut: **"Karakteristik atau label suatu data ditentukan oleh siapa tetangga-tetangga terdekatnya."**

Dalam matematika Machine Learning:
- **Rumah Baru Anda:** Titik data baru yang belum diketahui labelnya (**Query Point** $\mathbf{p}$).
- **Rumah Tetangga-Tetangga di Sekitar:** Kumpulan data latih yang sudah memiliki label pasti (**Training Data** $\mathbf{q}$).
- **Jarak Jalan Kaki:** Ukuran kedekatan matematis (**Jarak Euclidean**) pada ruang fitur koordinat $\mathbb{R}^m$.
- **Asumsi Kehalusan Spasial (*Smoothness Assumption*):** Data-data yang memiliki jenis kelas yang sama cenderung berkumpul dan hidup saling berdekatan.

---

### 2. Mengapa KNN Disebut 'Lazy Learner'?

#### Analogi Tipe Siswa: "Sistem Kebut Semalam (SKS)"
Dalam dunia Machine Learning, algoritma terbagi menjadi dua sifat belajar:
1. **Eager Learners (Siswa Rajin):** Algoritma seperti Regresi Linier, Decision Tree, atau Neural Network. Mereka belajar giat di awal saat fase training (`.fit()`), memeras rumus matematika rumit untuk melahirkan sebuah model tetap. Ketika ada soal ujian baru (`.predict()`), mereka menjawab dengan sekejap karena rumusnya sudah jadi.
2. **Lazy Learners / Instance-Based Learners (Siswa Pemalas / KNN):** 
   - **Fase Pelatihan (`.fit()`):** Algoritma sama sekali tidak memproses rumus matematika apapun! KNN hanya menyalin dan menumpuk seluruh matriks data mentah $X_{\text{train}}$ dan label $y_{\text{train}}$ ke dalam memori RAM komputer. Waktu komputasi instan: $\mathcal{O}(1)$.
   - **Fase Prediksi (`.predict()`):** Seluruh beban kerja ditunda sampai saat prediksi tiba. Ketika ada 1 pasien atau bunga baru yang ingin ditebak, barulah komputer panik bekerja keras menghitung jarak ke **seluruh $N$ baris data latih satu per satu**, mengurutkannya, dan melakukan voting. Waktu komputasi berat: $\mathcal{O}(N \times m)$.

---

### 3. Masalah Fatal: Curse of Dimensionality (Kutukan Dimensi Tinggi)

#### Analogi Sederhana: Mencari Jarum di Ruangan 1D vs Hutan Belantara 50D
Bayangkan sebuah koin terjatuh:
- **Ruang 1 Dimensi (Garis Lurus 10 meter):** Anda bisa menemukan koin tersebut dalam beberapa detik karena lintasannya sangat sempit dan padat.
- **Ruang 2 Dimensi (Lapangan Terbuka 10x10 meter):** Butuh waktu beberapa menit untuk menyisir area.
- **Ruang 50 Dimensi (Hiperspace dengan 50 sumbu fitur):** Volume ruang membengkak secara eksponensial ($V \propto s^m$). Ruang menjadi teramat luas, hampa, dan kosong (*sparse*).

> JEBAKAN UJIAN LKS AI:
> Menggunakan KNN pada data dengan jumlah fitur sangat banyak (misal $m > 50$) tanpa seleksi fitur akan menghasilkan penurunan akurasi drastis akibat fenomena **Curse of Dimensionality**.

Secara matematis, di ruang dimensi yang sangat tinggi, selisih antara jarak ke data yang paling dekat ($d_{\min}$) dan jarak ke data yang paling jauh ($d_{\max}$) akan menyusut mendekati nol:

$$\lim_{m \to \infty} \frac{d_{\max} - d_{\min}}{d_{\min}} \to 0$$

Akibatnya, konsep "tetangga terdekat" kehilangan makna pembedanya karena hampir seluruh titik data memiliki jarak yang relatif seragam dan sama-sama jauh dari titik uji.

> TIPS JUARA LKS AI:
> Sebelum menerapkan KNN pada kompetisi LKS, selalu lakukan pemeriksaan jumlah kolom fitur (`X.shape[1]`). Jika fitur terlalu banyak, terapkan seleksi fitur berbasis korelasi atau reduksi dimensi (PCA).
            """
        },
        {
            "id": "2-2",
            "title": "2.2 Formulasi Metrik Jarak & Simulasi Hitung Manual",
            "readingTime": "12 menit",
            "content": r"""
### 1. Formulasi Matematika Metrik Jarak

Diberikan dua titik dalam ruang koordinat $m$-dimensi: titik sampel baru yang ingin ditebak $\mathbf{p} = (p_1, p_2, \dots, p_m)$ dan titik data latih $\mathbf{q} = (q_1, q_2, \dots, q_m)$.

#### A. Euclidean Distance ($L_2$ Norm)
Mengukur lintasan garis lurus terpendek antara dua titik (sama persis dengan rumus Pythagoras segitiga siku-siku $c = \sqrt{a^2 + b^2}$ yang kita pelajari di bangku sekolah):

$$d_{\text{Euclidean}}(\mathbf{p}, \mathbf{q}) = \sqrt{\sum_{j=1}^m (p_j - q_j)^2} = \|\mathbf{p} - \mathbf{q}\|_2$$

#### Bedah Simbol Rumus Euclidean:
- $\mathbf{p}$ dan $\mathbf{q}$: Titik data yang sedang dihitung jaraknya.
- $p_j - q_j$: Selisih nilai pada kolom fitur ke-$j$ (misal selisih usia atau selisih kadar gula).
- $(p_j - q_j)^2$: Nilai selisih dikuadratkan agar hasilnya selalu bernilai positif dan memberi hukuman lebih besar pada selisih yang lebar.
- $\sum_{j=1}^m$: Menjumlahkan seluruh selisih kuadrat dari kolom ke-1 sampai kolom ke-$m$.
- $\sqrt{\dots}$: Menarik akar kuadrat agar satuan angka jarak kembali sama dengan satuan asli datanya.

#### B. Manhattan Distance ($L_1$ Norm / City Block)
Mengukur jarak lintasan orthogonal berundak:

$$d_{\text{Manhattan}}(\mathbf{p}, \mathbf{q}) = \sum_{j=1}^m |p_j - q_j| = \|\mathbf{p} - \mathbf{q}\|_1$$

*Analogi:* Seperti mobil taksi yang menyusuri jalur jalan kota berbentuk blok kotak-kotak (grid), tidak bisa terbang diagonal menembus gedung perkantoran, sehingga harus maju horizontal kemudian belok vertikal. Metrik ini lebih tahan (*robust*) terhadap data pencilan (*outlier*).

#### C. Minkowski Distance ($L_p$ Norm)
Rumus induk yang menggeneralisasikan kedua jarak di atas:

$$d_{\text{Minkowski}}(\mathbf{p}, \mathbf{q}) = \left( \sum_{j=1}^m |p_j - q_j|^p \right)^{1/p}$$
- Jika parameter $p = 1 \implies$ Menjadi Manhattan Distance.
- Jika parameter $p = 2 \implies$ Menjadi Euclidean Distance.

---

### 2. Simulasi Perhitungan Manual Lengkap dengan Angka Nyata

Misalkan kita memiliki data medis sederhana berisi 4 orang pasien latih dengan 2 fitur: $[x_1: \text{Umur (tahun)}, x_2: \text{Kadar Gula (mg/dL)}]$ dan label kesehatan target [$y \in \{0: \text{Normal}, 1: \text{Diabetes}\}$]:

| Pasien | Umur ($x_1$) | Gula ($x_2$) | Label Target ($y$) |
|---|---|---|---|
| A | 25 | 90 | 0 (Normal) |
| B | 35 | 110 | 0 (Normal) |
| C | 45 | 180 | 1 (Diabetes) |
| D | 55 | 200 | 1 (Diabetes) |

**Titik Query Pasien Baru:** $\mathbf{p} = [\text{Umur} = 40, \text{Gula} = 130]$. Nilai hyperparameter $K = 3$.

#### Langkah 1: Hitung Jarak Euclidean ke Seluruh Pasien Latih
1. **Ke Pasien A (25, 90):**
   $$d(P, A) = \sqrt{(40 - 25)^2 + (130 - 90)^2} = \sqrt{15^2 + 40^2} = \sqrt{225 + 1600} = \sqrt{1825} \approx \mathbf{42.72}$$
2. **Ke Pasien B (35, 110):**
   $$d(P, B) = \sqrt{(40 - 35)^2 + (130 - 110)^2} = \sqrt{5^2 + 20^2} = \sqrt{25 + 400} = \sqrt{425} \approx \mathbf{20.62}$$
3. **Ke Pasien C (45, 180):**
   $$d(P, C) = \sqrt{(40 - 45)^2 + (130 - 180)^2} = \sqrt{(-5)^2 + (-50)^2} = \sqrt{25 + 2500} = \sqrt{2525} \approx \mathbf{50.25}$$
4. **Ke Pasien D (55, 200):**
   $$d(P, D) = \sqrt{(40 - 55)^2 + (130 - 200)^2} = \sqrt{(-15)^2 + (-70)^2} = \sqrt{225 + 4900} = \sqrt{5125} \approx \mathbf{71.59}$$

#### Langkah 2: Urutkan Jarak dari Terkecil ke Terbesar
| Ranking | Pasien | Jarak Euclidean | Label Asli ($y$) |
|---|---|---|---|
| **1 (Paling Dekat)** | **Pasien B** | **20.62** | **0 (Normal)** |
| **2 (Kedua Dekat)** | **Pasien A** | **42.72** | **0 (Normal)** |
| **3 (Ketiga Dekat)** | **Pasien C** | **50.25** | **1 (Diabetes)** |
| 4 (Terjauh) | Pasien D | 71.59 | 1 (Diabetes) |

#### Langkah 3: Ambil K = 3 Tetangga Terdekat & Lakukan Voting Suara
- Tiga tetangga terdekat terpilih: **[Pasien B (0), Pasien A (0), Pasien C (1)]**
- Hasil Voting Suara:
  - Label $0$ (Normal): $2$ suara
  - Label $1$ (Diabetes): $1$ suara
- **Keputusan Prediksi Model:** Pasien baru diprediksi memiliki label **0 (Normal)** karena memenangkan pemungutan suara terbanyak (2 lawan 1).
            """
        },
        {
            "id": "2-3",
            "title": "2.3 Pemilihan Hyperparameter K & Strategi Voting",
            "readingTime": "9 menit",
            "content": r"""
### 1. Analisis Bias-Variance Tradeoff pada Nilai K

#### Analogi Sederhana: Mudah Terhasut vs Terlalu Banyak Mendengarkan Suara
- **Jika $K = 1$ (Terlalu Kecil):** Anda hanya bertanya pada **satu orang tetangga tunggal**. Jika kebetulan tetangga itu memiliki selera aneh atau datanya salah label (*noise*), Anda akan ikut tersesat! Model menjadi sangat labil, batas keputusan berliku-liku tajam, dan menghafal kebetulan data (**Overfitting / High Variance**).
- **Jika $K = 100$ (Terlalu Besar):** Anda bertanya pada seluruh warga satu kecamatan. Pendapat warga mayoritas akan menenggelamkan informasi warga sekitar rumah Anda. Akibatnya model menjadi tumpul dan kaku, selalu memprediksi kelas mayoritas (**Underfitting / High Bias**).
- **Titik Ideal:** Memilih $K$ seimbang (biasanya 3, 5, atau 7) yang mampu menyaring kebisingan tanpa kehilangan kepekaan lokal.

---

### 2. Tiga Kaidah Emas Pemilihan K untuk Kompetisi LKS AI

1. **Wajib Memilih Angka Ganjil (*Odd Numbers*):**
   Pada klasifikasi biner (2 kelas), nilai $K$ **harus selalu ganjil** ($K = 3, 5, 7, \dots$). Jika Anda memilih nilai genap seperti $K = 4$, sangat mungkin terjadi hasil voting seri 2 lawan 2, yang menyebabkan model mengalami kebuntuan (*deadlock*).
2. **Kaidah Pendekatan Akar Kuadrat (*Square Root Rule*):**
   Gunakan rumus praktis awal:
   $$K \approx \sqrt{N_{\text{train}}}$$
   Misal data latih ada $100$ baris, nilai awal $K \approx \sqrt{100} = 10 \implies$ bulatkan ke angka ganjil terdekat yaitu **$K = 9$ atau $K = 11$**.
3. **Hyperparameter Tuning via Validation Set:**
   Uji nilai $K \in [3, 5, 7, 9, 11, 15]$ pada data validasi dan pilih nilai $K$ yang menghasilkan skor F1 tertinggi.

---

### 3. Majority Voting vs Distance-Weighted Voting

Secara default, setiap tetangga memiliki hak suara yang setara ($1$ suara), tidak peduli apakah tetangga itu berada tepat di sebelah rumah ($d = 0.5$) atau berada jauh di ujung jalan ($d = 49.5$).

Pada teknik lanjutan **Distance-Weighted Voting**, tetangga yang berada lebih dekat diberi bobot suara lebih besar dibanding tetangga yang jauh:

$$w_i = \frac{1}{d_i^2 + \epsilon}$$

#### Bedah Simbol:
- $w_i$: Bobot nilai suara untuk tetangga ke-$i$.
- $d_i$: Jarak dari titik baru ke tetangga ke-$i$. Semakin kecil jarak $d_i$, semakin raksasa bobot suaranya $w_i$.
- $\epsilon = 10^{-8}$: Nilai pengaman amat kecil (*epsilon*) agar pembagi tidak pernah bernilai 0 jika ada data latih yang posisinya persis berhimpitan ($d_i = 0$).
            """
        },
        {
            "id": "2-4",
            "title": "2.4 Praktikum Koding: Class KNN Manual (Pure NumPy)",
            "readingTime": "10 menit",
            "content": r"""
Di bawah ini adalah kode lengkap implementasi algoritma K-Nearest Neighbors mandiri menggunakan teknik vektorisasi matriks murni NumPy tanpa pustaka eksternal.

Perhatikan kotak **Bedah Sintaks & Alur Perhitungan Matematis** di bawah kode untuk memahami bagaimana setiap rumus Euclidean, pengurutan jarak, dan voting suara diterjemahkan secara elegan ke dalam baris kode Python.
            """,
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
            "content": r"""
### 1. Karakteristik Dataset Iris (Kaggle Benchmark)

Dataset bunga Iris terdiri dari 150 sampel observasi bunga dengan 4 fitur morfologi kontinu:
- Sepal Length (Panjang Kelopak)
- Sepal Width (Lebar Kelopak)
- Petal Length (Panjang Mahkota)
- Petal Width (Lebar Mahkota)

Target klasifikasi adalah 3 spesies bunga yang seimbang masing-masing 50 sampel:
- Kelas 0: *Iris Setosa* (Dapat dipisahkan secara linier murni)
- Kelas 1: *Iris Versicolor* (Saling bertumpukan sebagian dengan Virginica)
- Kelas 2: *Iris Virginica*

---

### 2. Eksekusi Script & Evaluasi Model

Jalankan script nyata di bawah ini untuk melihat bagaimana `StandardScaler` dan model `KNNManual` buatanmu memproses data 150 bunga, membaginya dengan `train_test_split`, dan mengevaluasi hasil klasifikasinya menggunakan `confusion_matrix`.
            """,
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
}
