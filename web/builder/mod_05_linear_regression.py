"""
MODUL 5: REGRESI LINIER (LINEAR REGRESSION) (LKS AI)
"""

MODULE_DATA = {
    "id": "mod-5",
    "title": "Bab 5: Regresi Linier (Linear Regression)",
    "icon": "05",
    "lessons": [
        {
            "id": "5-1",
            "title": "5.1 Konsep Garis Regresi, Hipotesis, & Residual",
            "readingTime": "11 menit",
            "content": r"""
### 1. Masalah Regresi: Pemodelan Nilai Riil Kontinu

#### Analogi Sederhana: Menaksir Harga Berdasarkan Pola
Bayangkan Anda ingin menaksir harga rumah seken di suatu kawasan. Anda mengamati bahwa rumah seluas $60\,\text{m}^2$ dijual seharga 300 juta, dan rumah $100\,\text{m}^2$ seharga 500 juta. Jika ada rumah seluas $80\,\text{m}^2$, berapa harga yang wajar? Secara intuitif, pikiran Anda langsung menarik pola garis lurus di antara titik-titik tersebut dan memperkirakan nilainya sekitar 400 juta.

Berbeda dengan tugas **Klasifikasi** yang memprediksi label diskret (seperti *Spam* vs *Bukan Spam*, atau *Kanker Jinak* vs *Ganas*), tugas **Regresi** bertujuan memodelkan hubungan matematis untuk memprediksi angka riil kontinu ($y \in \mathbb{R}$):
- Memprediksi angka penjualan barang berdasarkan anggaran belanja iklan di berbagai media.
- Memprediksi konsumsi bahan bakar kendaraan berdasarkan bobot mesin dan aerodinamika.
- Memprediksi suhu udara besok berdasarkan tekanan atmosfer dan kelembaban hari ini.

---

### 2. Fungsi Hipotesis Linier (Linear Hypothesis)

#### Analogi Tali Karet Elastis OLS
Bayangkan sekelompok paku tertancap di atas papan kayu datar (titik-titik data). Kita membentangkan sebatang penggaris kayu lurus di tengah-tengah kumpulan paku tersebut, lalu mengikat setiap paku ke penggaris menggunakan tali karet elastis secara tegak lurus vertikal. 

Penggaris kayu tersebut akan otomatis berotasi dan bergeser sampai total tarikan regangan tali karet elastis mencapai titik keseimbangan minimum terendah. Batang penggaris lurus dalam posisi seimbang itulah yang disebut **Garis Regresi Linier**, dan panjang tarikan tali karet elastis pada tiap paku adalah **Residual (Galat)**!

Pada satu fitur input univariat ($x$), garis pemodelan dinyatakan dalam persamaan aljabar:

$$\hat{y} = w \cdot x + b$$

Pada data multivariat dengan $m$ fitur masukan ($\mathbf{x} = [x_1, x_2, \dots, x_m]^T$):

$$\hat{y} = w_1 x_1 + w_2 x_2 + \dots + w_m x_m + b = \mathbf{x}^T \mathbf{w} + b$$

Dalam notasi matriks untuk seluruh $N$ baris data sekaligus:

$$\hat{\mathbf{y}} = X \mathbf{w} + b$$

#### Bedah Simbol Rumus Hipotesis:
1. **$\hat{y}$ (y-hat):** Nilai kontinu hasil estimasi prediksi model. Tanda topi (*hat*) melambangkan taksiran buatan model, bukan fakta mutlak di alam nyata.
2. **$\mathbf{x} = [x_1, x_2, \dots, x_m]^T$:** Vektor fitur masukan (misalnya: $[x_1 = \text{luas bangunan}, x_2 = \text{jumlah kamar}, x_3 = \text{usia bangunan}]$).
3. **$\mathbf{w} = [w_1, w_2, \dots, w_m]^T$:** Vektor bobot koefisien kemiringan (*weights / slopes*). Menunjukkan sensitivitas target: jika nilai fitur $x_j$ naik $1$ satuan, seberapa besar nilai prediksi $\hat{y}$ akan bertambah ($w_j > 0$) atau berkurang ($w_j < 0$).
4. **$b$ (Bias / Intercept):** Titik potong garis pada sumbu vertikal ketika seluruh fitur bernilai nol ($\mathbf{x} = \mathbf{0}$). Misal harga dasar kavling tanah kosong sebelum dibangun bangunan apa pun.
5. **$X$:** Matriks data fitur berukuran $(N \times m)$, di mana baris mewakili sampel dan kolom mewakili variabel fitur.

---

### 3. Konsep Residual (Galat / Error)

Untuk setiap baris observasi ke-$i$, selalu terdapat selisih antara nilai target aktual ($y_i$) dengan nilai estimasi garis model ($\hat{y}_i$). Selisih vertikal ini disebut **Residual**:

$$e_i = y_i - \hat{y}_i = y_i - (\mathbf{x}_i^T \mathbf{w} + b)$$

#### Tiga Skenario Nilai Residual:
1. **$e_i = 0$:** Garis model melintas tepat menembus titik data aktual (prediksi sempurna tanpa cela).
2. **$e_i > 0$:** Nilai aktual berada di atas garis model (*under-estimation*, model menaksir terlalu rendah).
3. **$e_i < 0$:** Nilai aktual berada di bawah garis model (*over-estimation*, model menaksir terlalu tinggi).

Tujuan utama algoritma Regresi Linier adalah menemukan kombinasi parameter optimal $\mathbf{w}^*$ dan $b^*$ yang meminimalkan total akumulasi residual di seluruh dataset pelatihan.
            """
        },
        {
            "id": "5-2",
            "title": "5.2 Cost Function MSE & Penurunan Matematis Gradient Descent",
            "readingTime": "15 menit",
            "content": r"""
### 1. Fungsi Biaya MSE (Mean Squared Error Cost Function)

Mengapa kita tidak menjumlahkan residual biasa $\sum e_i$? Karena residual positif ($+5$) dan residual negatif ($-5$) akan saling meniadakan ($+5 + (-5) = 0$). Komputer akan mengira garis model sudah sempurna, padahal kedua tebakan tersebut meleset jauh!

Untuk mengatasinya, kita mengkuadratkan setiap selisih galat. Metode ini dikenal sebagai **Ordinary Least Squares (OLS)** dengan fungsi biaya matematis:

$$J(\mathbf{w}, b) = \frac{1}{2N} \sum_{i=1}^N (\hat{y}_i - y_i)^2 = \frac{1}{2N} \sum_{i=1}^N (\mathbf{x}_i^T \mathbf{w} + b - y_i)^2$$

#### Bedah Simbol Rumus MSE:
- **$J(\mathbf{w}, b)$:** Nilai kerugian total (*Cost/Loss*). Semakin mendekati nol, semakin presisi garis model.
- **$N$:** Total banyaknya sampel data latihan.
- **$(\hat{y}_i - y_i)^2$:** Kuadrat selisih galat. Kuadrat memberikan dua keunggulan:
  1. Menjamin seluruh nilai bernilai non-negatif ($\ge 0$).
  2. Memberikan hukuman (*penalty*) yang jauh lebih berat bagi tebakan yang melenceng jauh (kesalahan selisih $10$ dihukum $100$, bukan sekadar $10$).
- **Faktor $\frac{1}{2}$:** Konstanta pengali penyederhana matematika agar saat diturunkan dengan kalkulus ($2 \times \frac{1}{2} = 1$), angka $2$ dari turunan kuadrat saling membatalkan secara rapi.

---

### 2. Algoritma Optimasi: Gradient Descent

#### Analogi: Menuruni Lembah Gunung Berkabut Tebal
Bayangkan Anda berada di puncak lereng gunung di malam gelap dengan kabut yang sangat pekat, sehingga Anda tidak dapat melihat dasar lembah. Tugas Anda adalah menemukan titik terendah (dasar lembah di mana fungsi biaya $J$ paling minimum):

1. **Merasakan Kemiringan Lereng:** Anda menggunakan telapak kaki untuk merasakan ke arah mana tanah menurun paling curam. Arah penurunan tercuram ini adalah **Negatif Gradien ($-\nabla J$)**.
2. **Melangkah Turun:** Anda mengambil satu langkah menuruni lereng ke arah tersebut.
3. **Ukuran Langkah Kaki (Learning Rate $\alpha$):**
   - Jika langkah Anda teramat kecil ($\alpha = 0.000001$), Anda butuh jutaan langkah dan berjam-jam untuk sampai ke dasar.
   - Jika langkah Anda berupa lompatan raksasa yang membabi buta ($\alpha = 5.0$), Anda akan melompati dasar lembah dan menabrak tebing seberang, bahkan terlempar semakin tinggi ke atas tebing (*divergence / exploding gradient*)!

---

### 3. Penurunan Turunan Parsial (Calculus Derivation)

Untuk mencari arah lereng penyesuaian bobot $\mathbf{w}$ dan bias $b$, kita menerapkan aturan rantai kalkulus (*Chain Rule*):

Misalkan $u_i = \hat{y}_i - y_i = (\mathbf{x}_i^T \mathbf{w} + b - y_i)$, maka $J = \frac{1}{2N} \sum u_i^2$.

#### A. Turunan Parsial terhadap Bobot $\mathbf{w}$:
$$\frac{\partial J}{\partial \mathbf{w}} = \frac{1}{2N} \sum_{i=1}^N 2 u_i \cdot \frac{\partial u_i}{\partial \mathbf{w}} = \frac{1}{N} \sum_{i=1}^N (\hat{y}_i - y_i) \cdot \mathbf{x}_i = \frac{1}{N} X^T (\hat{\mathbf{y}} - \mathbf{y})$$

#### B. Turunan Parsial terhadap Bias $b$:
$$\frac{\partial J}{\partial b} = \frac{1}{2N} \sum_{i=1}^N 2 u_i \cdot \frac{\partial u_i}{\partial b} = \frac{1}{N} \sum_{i=1}^N (\hat{y}_i - y_i)$$

#### Aturan Pembaruan Parameter (Gradient Descent Update Rule):
$$\mathbf{w} := \mathbf{w} - \alpha \frac{\partial J}{\partial \mathbf{w}}, \quad b := b - \alpha \frac{\partial J}{\partial b}$$

Simbol $:=$ berarti nilai lama di memori digantikan oleh nilai baru pada setiap putaran epoch. Tanda minus menjamin model selalu bergerak berlawanan arah dengan tanjakan lereng (menuruni bukit biaya).

---

### 4. Simulasi Hitung Manual 1 Epoch dengan Angka Nyata

Misalkan kita memiliki 2 sampel data sederhana univariat:
- Sampel 1: $x_1 = 1, \quad y_1 = 2$
- Sampel 2: $x_2 = 2, \quad y_2 = 4$
*(Target matematis sejati yang dicari adalah $y = 2x$, yaitu $w = 2.0$ dan $b = 0.0$)*.

Kita mulai pelatihan dari titik nol:
$$w_0 = 0.0, \quad b_0 = 0.0, \quad \text{Learning Rate } \alpha = 0.1, \quad N = 2$$

#### Langkah 1: Hitung Prediksi Awal ($\hat{y} = w \cdot x + b$)
- $\hat{y}_1 = (0.0)(1) + 0.0 = 0.0$
- $\hat{y}_2 = (0.0)(2) + 0.0 = 0.0$

#### Langkah 2: Hitung Selisih Galat ($e_i = \hat{y}_i - y_i$)
- $e_1 = 0.0 - 2 = -2.0$
- $e_2 = 0.0 - 4 = -4.0$

#### Langkah 3: Hitung Gradien Turunan Parsial
- **Gradien Bobot ($dw$):**
  $$\frac{\partial J}{\partial w} = \frac{1}{2} \left[ (-2.0)(1) + (-4.0)(2) \right] = \frac{1}{2} [-2.0 - 8.0] = \frac{-10.0}{2} = \mathbf{-5.0}$$
- **Gradien Bias ($db$):**
  $$\frac{\partial J}{\partial b} = \frac{1}{2} \left[ (-2.0) + (-4.0) \right] = \frac{-6.0}{2} = \mathbf{-3.0}$$

#### Langkah 4: Perbarui Nilai Bobot dan Bias
- $$w_{\text{baru}} = 0.0 - (0.1 \times (-5.0)) = 0.0 + 0.5 = \mathbf{+0.5}$$
- $$b_{\text{baru}} = 0.0 - (0.1 \times (-3.0)) = 0.0 + 0.3 = \mathbf{+0.3}$$

Hanya dalam 1 iterasi saja, nilai bobot $w$ langsung bergerak naik dari $0.0$ menuju angka target positif $2.0$!
            """
        },
        {
            "id": "5-3",
            "title": "5.3 Praktikum Koding: Class LinearRegressionGD Manual",
            "readingTime": "11 menit",
            "content": r"""
Berikut adalah implementasi lengkap algoritma Regresi Linier berbasis optimasi Gradient Descent matriks murni NumPy tanpa pustaka eksternal.

Perhatikan kotak **Bedah Sintaks & Alur Perhitungan Matematis** di bawah untuk memahami perkalian titik dot product matriks `np.dot` dan pembaruan gradien.
            """,
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
            "content": r"""
### 1. Karakteristik Dataset Advertising Benchmark

Dataset Advertising memodelkan hubungan antara alokasi anggaran belanja iklan di tiga saluran media terhadap angka penjualan produk (*Sales* dalam ribuan unit):
1. **TV Budget** (dalam ribuan dollar)
2. **Radio Budget**
3. **Newspaper Budget**

Dataset terdiri dari 200 sampel riil. Kita menguji seberapa akurat kombinasi anggaran iklan ini dapat memprediksi performa penjualan ritel.

---

### 2. Eksekusi Script & Evaluasi Metrik $R^2$

Jalankan script di bawah ini untuk melihat pelatihan model Regresi Linier Gradient Descent manual yang mencapai performa koefisien determinasi **$R^2 = 86.03\%$**.
            """,
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
}
