"""
MODUL 3: DECISION TREE (CART) (LKS AI)
"""

MODULE_DATA = {
    "id": "mod-3",
    "title": "Bab 3: Decision Tree (Pohon Keputusan)",
    "icon": "03",
    "lessons": [
        {
            "id": "3-1",
            "title": "3.1 Struktur Pohon: Root, Internal Node, dan Leaf",
            "readingTime": "9 menit",
            "content": r"""
### 1. Filosofi Pohon Keputusan (CART)

#### Analogi Sederhana: Permainan Tebak-Tebakan "20 Pertanyaan"
Pernahkah Anda memainkan permainan tebak-tebakan di mana Anda hanya diizinkan mengajukan pertanyaan dengan jawaban **Ya** atau **Tidak**? 

Misalkan seorang dokter ingin mendiagnosis apakah seorang pasien berisiko diabetes:
- **Pertanyaan 1:** "Apakah kadar gula darah puasa $\le 120$ mg/dL?"
  - *Jika Ya (True):* Lanjut ke Pertanyaan 2: "Apakah indeks massa tubuh (BMI) $\le 25$?" $\implies$ Jika Ya, vonis: **Sehat / Normal**.
  - *Jika Tidak (False):* Lanjut ke Pertanyaan 3: "Apakah usia pasien $\ge 45$ tahun?" $\implies$ Jika Ya, vonis: **Diabetes**.

Algoritma **Decision Tree (CART — Classification and Regression Trees)** bekerja persis seperti logika dokter ahli tersebut: menyusun serangkaian aturan kondisi jika-maka (*if-then-else*) paling pintar dan berurutan dari atas ke bawah.

Berbeda dengan model Machine Learning lain yang bersifat *black-box* (kotak hitam yang sulit diintip logikanya), Decision Tree adalah model **white-box** dengan interpretabilitas tertinggi: setiap tebakan komputer dapat dilacak langkah demi langkah layaknya membaca bagan alur (*flowchart*).

---

### 2. Anatomi Topologi Pohon

Struktur pohon keputusan tersusun atas tiga komponen hierarkis:
1. **Root Node (Simpul Akar):** Simpul paling puncak dari pohon yang memuat seluruh dataset awal ($100\%$ data). Pada simpul ini dilakukan pengujian kondisi logika pertama yang paling membedakan kelas (*most discriminative*).
2. **Internal / Decision Node (Simpul Percabangan):** Simpul penguji perantara yang memuat kondisi uji terhadap suatu fitur tertentu (misal: $\text{Kadar Gula} \le 120$). Simpul ini memiliki satu cabang masuk dan dua cabang keluar (Kiri: True, Kanan: False).
3. **Leaf Node / Terminal Node (Simpul Daun):** Simpul akhir di ujung cabang yang tidak lagi memiliki anak. Simpul daun memuat **keputusan tebakan kelas final** (berdasarkan suara mayoritas data yang jatuh ke daun tersebut).

---

### 3. Sifat Pembelahan Ruang Fitur Secara Ortogonal

Secara geometris, Decision Tree membelah ruang fitur dengan garis-garis yang **selalu tegak lurus terhadap sumbu fitur** (*axis-aligned orthogonal splits*).

Karakteristik ini memiliki dua implikasi penting:
- **Kelebihan Luar Biasa:** Algoritma ini bersifat kebal terhadap penskalaan fitur (*scale-invariant*). Normalisasi atau standardisasi (seperti Min-Max atau Z-Score) **tidak akan mengubah hasil keputusan pohon sama sekali**, karena urutan relatif urut-urutan nilai data tidak pernah berubah.
- **Kelemahan:** Jika batas pemisah kelas yang sebenarnya berbentuk garis miring atau kurva diagonal, pohon membutuhkan kedalaman yang sangat dalam (berbentuk seperti tangga berundak-undak) untuk mengaproksimasi garis miring tersebut.
            """
        },
        {
            "id": "3-2",
            "title": "3.2 Formulasi Matematika Gini Impurity & Entropy",
            "readingTime": "11 menit",
            "content": r"""
### 1. Konsep Ketidakmurnian Simpul (Impurity)

#### Analogi Sederhana: Mengambil Permen di Dalam Toples
Bayangkan Anda memiliki beberapa toples berisi permen:
- **Toples A (Murni Sempurna / Pure):** Berisi 100% permen rasa cokelat. Jika Anda menutup mata dan mengambil satu permen acak, Anda 100% yakin mendapatkan cokelat. Tingkat kebingungan atau kekotorannya adalah **0.0**.
- **Toples B (Campur Aduk / Sangat Kotor):** Berisi 50% permen cokelat dan 50% permen stroberi. Anda berada pada tingkat ketidakpastian tertinggi (peluang salah tebak 50:50). Tingkat kekotorannya bernilai maksimum **0.5**.

Komputer membutuhkan rumus matematika untuk mengukur seberapa "kotor" atau seberapa "campur aduk" label kelas di dalam suatu simpul. Metrik inilah yang disebut **Gini Impurity**.

Tujuan utama algoritma pohon adalah: **Membuat simpul-simpul anak yang sekering dan semurni mungkin ($I_G \to 0.0$)**.

---

### 2. Formulasi Matematika Gini Impurity

Algoritma CART standar menggunakan metrik **Gini Impurity**:

$$I_G(S) = 1 - \sum_{i=1}^C p_i^2$$

#### Bedah Simbol Rumus:
- $S$: Kumpulan data yang sedang berada di simpul saat ini.
- $C$: Jumlah total kelas unik (misal 2 kelas: Sakit vs Sehat).
- $p_i$: Proporsi persentase sampel kelas ke-$i$ di simpul tersebut:
  $$p_i = \frac{N_i}{|S|}$$
- $p_i^2$: Nilai kuadrat proporsi. Jika satu kelas mendominasi total ($p = 1.0$), maka $p^2 = 1.0$, sehingga $I_G = 1 - 1 = 0.0$ (**Simpul Murni**).
- $1 - \sum p_i^2$: Menghitung peluang bahwa sampel yang diambil acak akan salah dilabeli jika diberi label acak sesuai distribusi kelas di simpul tersebut.

#### Karakteristik Nilai Gini:
- **Nilai Minimum ($I_G = 0.0$):** Tercapai saat simpul murni $100\%$ satu kelas ($p_A = 1.0, p_B = 0$):
  $$I_G = 1 - (1.0^2 + 0.0^2) = 1 - 1 = \mathbf{0.0}$$
- **Nilai Maksimum untuk Kasus Biner ($I_G = 0.5$):** Tercapai saat data terbelah seimbang 50%:50% ($p_A = 0.5, p_B = 0.5$):
  $$I_G = 1 - (0.5^2 + 0.5^2) = 1 - (0.25 + 0.25) = 1 - 0.5 = \mathbf{0.5}$$

---

### 3. Simulasi Perhitungan Manual Gini dengan Tiga Contoh Kasus

Misalkan kita mengamati simpul yang memuat dua kelas hewan [Kucing vs Anjing]:

| Kasus Simpul | Komposisi Data | Perhitungan Proporsi ($p_i$) | Perhitungan Gini Impurity ($I_G$) | Status Kemurnian |
|---|---|---|---|---|
| **Simpul A** | 10 Kucing, 0 Anjing | $p_K = \frac{10}{10} = 1.0, \quad p_A = 0$ | $1 - (1.0^2 + 0^2) = \mathbf{0.00}$ | **Murni Sempurna (Pure)** |
| **Simpul B** | 8 Kucing, 2 Anjing | $p_K = \frac{8}{10} = 0.8, \quad p_A = 0.2$ | $1 - (0.8^2 + 0.2^2) = 1 - (0.64 + 0.04) = \mathbf{0.32}$ | Cukup Murni |
| **Simpul C** | 5 Kucing, 5 Anjing | $p_K = \frac{5}{10} = 0.5, \quad p_A = 0.5$ | $1 - (0.5^2 + 0.5^2) = 1 - (0.25 + 0.25) = \mathbf{0.50}$ | **Sangat Campur Aduk (Impure)** |

---

### 4. Gini Impurity vs Information Entropy

Selain Gini, alternatif metrik ketidakpastian lainnya adalah **Entropy** (digunakan pada algoritma ID3 dan C4.5):

$$H(S) = -\sum_{i=1}^C p_i \log_2(p_i)$$

**Mengapa Algoritma CART Lebih Memilih Gini Impurity?**
Gini Impurity hanya membutuhkan operasi perkalian kuadrat ($p_i^2$) dan pengurangan dasar yang sangat ramah komputasi prosesor, sedangkan Entropy memerlukan fungsi logaritma berbasis 2 ($\log_2$). Pada dataset kompetisi besar dengan ribuan fitur dan kandidat split, **Gini Impurity dieksekusi berkali-kali lipat lebih cepat** dengan bentuk pohon keputusan yang nyaris identik.
            """
        },
        {
            "id": "3-3",
            "title": "3.3 Perhitungan Gini Split & Information Gain",
            "readingTime": "12 menit",
            "content": r"""
### 1. Algoritma Greedy Pembelahan Fitur (Best Split)

#### Analogi Sederhana: Memotong Kumpulan Buah dengan Penggaris
Bayangkan Anda memiliki campuran buah apel dan jeruk di atas meja. Anda memegang sebilah penggaris lurus dan ingin memotong meja tersebut menjadi dua bagian (kiri dan kanan). 

Komputer akan mencoba meletakkan penggaris di berbagai posisi nilai (*threshold*):
- Penggaris di posisi 1: Kiri ada 3 apel 2 jeruk, Kanan ada 1 apel 4 jeruk (Masih campur aduk).
- Penggaris di posisi 2: Kiri ada 4 apel 0 jeruk (**Murni!**), Kanan ada 0 apel 6 jeruk (**Murni!**).
Komputer langsung memilih Posisi 2 karena memisahkan buah dengan sempurna!

Cara kerja algoritma CART disebut **Greedy (Tamak)**: pada setiap simpul, komputer menguji seluruh kemungkinan garis potong pada seluruh fitur, lalu memilih pemotongan yang menghasilkan **Weighted Gini terendah** (penurunan kotor paling besar).

---

### 2. Formulasi Matematika Weighted Gini & Gain

#### A. Weighted Gini Gabungan (Gini Split)
$$I_{G,\text{split}}(S, j, t) = \frac{|S_L|}{|S|} I_G(S_L) + \frac{|S_R|}{|S|} I_G(S_R)$$

#### Bedah Simbol:
- $S_L$: Cabang Kiri (Sampel dengan fitur $x_j \le t$).
- $S_R$: Cabang Kanan (Sampel dengan fitur $x_j > t$).
- $|S_L| / |S|$: Bobot proporsi jumlah anggota cabang kiri terhadap total anggota simpul induk.
- $I_G(S_L)$: Tingkat kotornya cabang kiri.

#### B. Gini Gain (Penurunan Ketidakmurnian)
$$\Delta I_G = I_G(S_{\text{parent}}) - I_{G,\text{split}}(S, j, t)$$

Semakin besar nilai $\Delta I_G$, semakin hebat dan efektif pembelahan tersebut dalam memurnikan data.

---

### 3. Simulasi Hitung Manual Pembelahan Data dengan Angka Nyata

Misalkan kita memiliki 6 sampel data siswa dengan fitur $[x: \text{Jam Belajar}]$ dan target $[y \in \{0: \text{Gagal}, 1: \text{Lulus}\}]$:

| Siswa | Jam Belajar ($x$) | Hasil Ujian ($y$) |
|---|---|---|
| 1 | 1.0 | 0 (Gagal) |
| 2 | 2.0 | 0 (Gagal) |
| 3 | 3.0 | 1 (Lulus) |
| 4 | 4.0 | 0 (Gagal) |
| 5 | 5.0 | 1 (Lulus) |
| 6 | 6.0 | 1 (Lulus) |

#### Langkah 1: Hitung Gini Simpul Awal (Parent Node)
Total sampel $|S| = 6$: 3 Gagal ($y=0$), 3 Lulus ($y=1$).
- $p_0 = \frac{3}{6} = 0.5, \quad p_1 = \frac{3}{6} = 0.5$
- $$I_G(S_{\text{parent}}) = 1 - (0.5^2 + 0.5^2) = \mathbf{0.500}$$

#### Langkah 2: Evaluasi Kandidat Garis Potong Threshold $T_1 = 2.5$ jam
- **Cabang Kiri ($x \le 2.5$):** Siswa 1, 2 $\implies$ Data: $[0, 0]$ (2 Gagal, 0 Lulus).
  $$I_G(S_L) = 1 - (1.0^2 + 0^2) = \mathbf{0.000} \quad (\text{Murni Sempurna!})$$
- **Cabang Kanan ($x > 2.5$):** Siswa 3, 4, 5, 6 $\implies$ Data: $[1, 0, 1, 1]$ (1 Gagal, 3 Lulus).
  $$p_0 = \frac{1}{4} = 0.25, \quad p_1 = \frac{3}{4} = 0.75$$
  $$I_G(S_R) = 1 - (0.25^2 + 0.75^2) = 1 - (0.0625 + 0.5625) = 1 - 0.625 = \mathbf{0.375}$$
- **Weighted Gini untuk $T_1 = 2.5$:**
  $$I_{G,\text{split}} = \frac{2}{6}(0.000) + \frac{4}{6}(0.375) = 0 + \frac{1.5}{6} = \mathbf{0.250}$$
- **Gini Gain:** $\Delta I_G = 0.500 - 0.250 = \mathbf{0.250}$

Pemisahan ini berhasil menurunkan ketidakmurnian dari 0.500 menjadi 0.250!
            """
        },
        {
            "id": "3-4",
            "title": "3.4 Hyperparameter Pruning & Kontrol Overfitting",
            "readingTime": "9 menit",
            "content": r"""
### 1. Bahaya Overfitting pada Decision Tree

#### Analogi Sederhana: Pohon Rimbun yang Menghafal Setiap Helai Daun
Jika sebuah pohon dibiarkan tumbuh bebas tanpa batas (*unconstrained tree*), pohon akan terus membuat ranting baru untuk setiap satu data aneh atau pencilan (*outlier*). 

Pohon yang terlalu rimbun semacam ini akan memiliki **akurasi data latih sempurna 100%**, namun saat diuji dengan data baru di lapangan, performanya akan anjlok drastis (**Overfitting**). Model tidak lagi mempelajari pola umum, melainkan menghafal kebisingan (*noise*).

---

### 2. Tiga Hyperparameter Kunci untuk Pemangkasan (Pruning)

Untuk menjaga pohon tetap kokoh, sederhana, dan mampu menggeneralisasi data baru, kita menerapkan teknik **Pre-Pruning** (menghentikan pertumbuhan sebelum pohon menjadi terlalu liar):

#### 1. `max_depth` (Batas Kedalaman Pohon)
Membatasi berapa tingkat tingkatan cabang yang boleh dibuat dari simpul akar hingga ke daun.
- Nilai ideal: $3$ sampai $5$.
- Terlalu kecil ($1$) $\implies$ Model terlalu bodoh / dangkal (**Underfitting**).
- Terlalu besar ($> 15$) $\implies$ Model terlalu menghafal (**Overfitting**).

#### 2. `min_samples_split` (Minimal Anggota untuk Boleh Membelah)
Syarat jumlah minimal data yang harus ada di dalam simpul agar diizinkan membuat cabang baru.
- Misal disetel $= 10$. Jika suatu simpul hanya memiliki 6 sampel, simpul tersebut dilarang membelah lagi dan otomatis dinobatkan sebagai simpul daun (*leaf*).

#### 3. `min_impurity_decrease` (Minimal Penurunan Gini)
Simpul hanya diizinkan membelah jika nilai perbaikan kemurniannya ($\Delta I_G$) bernilai signifikan, menghindari percabangan rumit yang hanya memperbaiki kemurnian sangat sedikit.

> TIPS JUARA LKS AI:
> Selalu batasi `max_depth` pada rentang $3$ s/d $5$ saat presentasi di hadapan juri LKS. Pohon dengan kedalaman 3-5 dapat divisualisasikan dengan sangat indah dan mudah dijelaskan logika bisnisnya kepada juri!
            """
        },
        {
            "id": "3-5",
            "title": "3.5 Praktikum Koding: Class DecisionTree Manual",
            "readingTime": "11 menit",
            "content": r"""
Berikut adalah implementasi lengkap algoritma Decision Tree (CART) berbasis objek Node rekursif murni menggunakan Python dan NumPy tanpa bantuan scikit-learn.

Perhatikan kotak **Bedah Sintaks & Alur Perhitungan Matematis** di bawah kode untuk memahami bagaimana pencarian split terbaik, partisi boolean mask, dan rekursi pohon dikonstruksi secara teknis.
            """,
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
            "content": r"""
### 1. Karakteristik Dataset Banknote Authentication

Dataset ini bersumber dari citra uang kertas asli dan palsu yang diekstraksi menggunakan Continuous Wavelet Transform (CWT). Terdiri dari 1.372 sampel dengan 4 fitur kontinu:
1. **Variance** of Wavelet Transformed image
2. **Skewness** of Wavelet Transformed image
3. **Curtosis** of Wavelet Transformed image
4. **Entropy** of image

Target: $0$ = Uang Kertas Asli, $1$ = Uang Kertas Palsu.

---

### 2. Eksekusi Script & Visualisasi Pohon ASCII

Jalankan script di bawah ini untuk mengamati proses pelatihan model Decision Tree manual, visualisasi percabangan pohon dalam format teks ASCII yang elegan, serta evaluasi akurasinya yang mencapai **94.55%**.
            """,
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
}
