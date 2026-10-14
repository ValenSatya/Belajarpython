"""
MODUL 4: GAUSSIAN NAIVE BAYES (LKS AI)
"""

MODULE_DATA = {
    "id": "mod-4",
    "title": "Bab 4: Gaussian Naive Bayes",
    "icon": "04",
    "lessons": [
        {
            "id": "4-1",
            "title": "4.1 Teorema Bayes & Asumsi Kemandirian Bersyarat (Naive)",
            "readingTime": "10 menit",
            "content": r"""
### 1. Fondasi Teorema Bayes

#### Analogi Sederhana: Dokter yang Memperkirakan Peluang Penyakit
Bayangkan seorang pasien datang ke klinik dokter dengan keluhan: bersin-bersin, hidung tersumbat, dan tenggorokan gatal. Dokter ingin menebak apakah pasien tersebut terkena **Flu Biasa** atau **Penyakit Paru-Paru Langka**:

1. **Peluang Awal (*Prior Probability*):** Dokter tahu bahwa kasus flu biasa sangat sering terjadi di masyarakat umum ($95\%$), sedangkan penyakit paru-paru langka amat sangat jarang ($0.1\%$).
2. **Kecocokan Gejala (*Likelihood*):** Dokter mengecek seberapa cocok gejala bersin dan hidung tersumbat dengan penyakit flu? Sangat cocok!
3. **Peluang Akhir (*Posterior Probability*):** Dokter menggabungkan peluang awal dengan bukti gejala baru: meskipun ada kemungkinan kecil penyakit paru-paru, kesimpulan paling masuk akal adalah pasien terkena Flu Biasa.

Inti filosofi **Teorema Bayes (Thomas Bayes, 1763)** adalah: **"Memperbarui tingkat keyakinan awal kita (*Prior*) setelah kita menemukan bukti atau fakta pendukung yang baru (*Likelihood*)."**

Secara matematis, rumusnya dituliskan sebagai:
$$P(y = c \mid \mathbf{x}) = \frac{P(\mathbf{x} \mid y = c) \cdot P(y = c)}{P(\mathbf{x})}$$

#### Bedah Simbol Empat Pilar Rumus Bayes:
1. **$P(y = c \mid \mathbf{x})$ (Posterior):** Peluang bahwa data tersebut adalah kelas $c$ **setelah** kita melihat nilai fitur $\mathbf{x}$ (Inilah yang ingin kita tebak).
2. **$P(y = c)$ (Prior):** Peluang awal kelas $c$ di alam nyata **sebelum** melihat data baru:
   $$P(y = c) = \frac{N_c}{N}$$
   *(Berapa persen data kelas $c$ di dalam seluruh dataset latihan?)*
3. **$P(\mathbf{x} \mid y = c)$ (Likelihood):** Seberapa besar kemungkinan ciri-ciri $\mathbf{x}$ muncul jika kondisi kelas $c$ benar-benar terjadi?
4. **$P(\mathbf{x})$ (Evidence):** Peluang total munculnya kombinasi fitur $\mathbf{x}$ di semua kelas. Karena nilai penyebut ini sama persis untuk semua kelas, nilainya bisa diabaikan saat mencari kelas dengan nilai terbesar ($\operatorname{argmax}$).

---

### 2. Mengapa Disebut 'Naive' (Naif / Polos)?

#### Analogi Asumsi "Polos"
Di dunia nyata, gejala penyakit seringkali saling berkaitan erat: orang yang demam tinggi biasanya juga merasa kedinginan dan menggigil. 

Namun, jika komputer harus menghitung hubungan saling keterkaitan antar seluruh fitur secara bersamaan, rumusnya akan menjadi sangat rumit dan membutuhkan jutaan baris data agar akurat (*Joint Density Estimation*).

Algoritma Naive Bayes mengambil asumsi penyederhanaan yang sangat berani (sehingga disebut **Naif / Polos**): **Setiap fitur dianggap berdiri sendiri secara mandiri (*conditionally independent*) tanpa saling mempengaruhi sama sekali jika kelasnya sudah diketahui**:

$$P(\mathbf{x} \mid y = c) = P(x_1 \mid y = c) \times P(x_2 \mid y = c) \times \dots \times P(x_m \mid y = c) = \prod_{j=1}^m P(x_j \mid y = c)$$

Walaupun asumsi "polos" ini hampir tidak pernah benar $100\%$ di dunia nyata, secara menakjubkan Naive Bayes terbukti sangat akurat, tangguh, dan luar biasa cepat pada tugas klasifikasi teks, penyaringan email spam, dan analisis data laboratorium.
            """
        },
        {
            "id": "4-2",
            "title": "4.2 Distribusi Gaussian & Trik Log-Likelihood",
            "readingTime": "12 menit",
            "content": r"""
### 1. Gaussian Probability Density Function (Fitur Kontinu)

Bagaimana cara menghitung probabilitas $P(x_j \mid y=c)$ jika data kita berbentuk angka kontinu riil (seperti kadar alkohol pada minuman anggur atau tekanan darah pasien)?

Pada **Gaussian Naive Bayes**, kita mengasumsikan bahwa sebaran data kontinu pada masing-masing kelas membentuk **Kurva Lonceng Normal Gauss**:

$$P(x_j \mid y = c) = \frac{1}{\sqrt{2\pi \sigma_{c,j}^2}} \exp\left( -\frac{(x_j - \mu_{c,j})^2}{2\sigma_{c,j}^2} \right)$$

#### Bedah Simbol Rumus Gaussian:
- $\mu_{c,j}$ (Mean): Nilai rata-rata fitur ke-$j$ khusus untuk data kelas $c$ (titik puncak kurva lonceng).
- $\sigma_{c,j}^2$ (Variance): Lebar sebaran data fitur ke-$j$ pada kelas $c$.
- $x_j - \mu_{c,j}$: Jarak selisih nilai sampel terhadap rata-rata kelasnya. Semakin dekat nilai $x_j$ ke titik tengah $\mu$, semakin tinggi nilai peluang kemunculannya!

Model hanya perlu mempelajari dan menyimpan dua angka saja untuk setiap kolom: nilai **rata-rata ($\mu$)** dan nilai **variansi ($\sigma^2$)**!

---

### 2. Masalah Fatal: Arithmetic Underflow

> JEBAKAN UJIAN LKS AI:
> Jika Anda mengimplementasikan rumus Naive Bayes dengan mengalikan probabilitas desimal secara langsung ($\prod P(x_j \mid y)$), kode Anda akan mengalami kegagalan fatal berupa **Arithmetic Underflow**.

#### Mengapa Arithmetic Underflow Terjadi?
Bayangkan jika dataset Anda memiliki 20 kolom fitur. Masing-masing kolom menghasilkan angka desimal kecil, misalnya $0.01$. Jika Anda mengalikan 20 angka desimal tersebut:
$$0.01 \times 0.01 \times \dots \times 0.01 = 0.01^{20} = 10^{-40}$$
Angka sekecil $10^{-40}$ berada di bawah batas ketelitian chip prosesor komputer ($< 10^{-308}$). Akibatnya, komputer secara sepihak membulatkannya menjadi **$0.0$ mutlak**! Seluruh kelas akan menghasilkan probabilitas 0, membuat model bingung dan tidak mampu menebak kelas apapun.

---

### 3. Solusi Elegan: Trik Log-Likelihood

Untuk mengatasi bencana tersebut, para ilmuwan matematika memanfaatkan sifat sakti logaritma: **logaritma dari perkalian adalah penjumlahan dari logaritma**:

$$\ln(a \times b) = \ln(a) + \ln(b)$$

Dengan membungkus rumus dengan fungsi logaritma natural ($\ln$):

$$\ln P(y = c \mid \mathbf{x}) \propto \ln P(y = c) + \sum_{j=1}^m \ln P(x_j \mid y = c)$$

Substitusi fungsi Gaussian ke dalam bentuk logaritma:

$$\ln P(x_j \mid y = c) = -\frac{1}{2} \ln(2\pi \sigma_{c,j}^2) - \frac{(x_j - \mu_{c,j})^2}{2\sigma_{c,j}^2}$$

#### Mengapa Trik Ini Menyelamatkan Model?
1. Operasi perkalian desimal yang rawan punah diubah menjadi **operasi penjumlahan aritmatika biasa yang kokoh dan stabil**.
2. Nilai skor tidak pernah menjadi 0 mutlak, memusnahkan bahaya *arithmetic underflow* selamanya.
3. Kelas yang dipilih adalah kelas yang menghasilkan skor log-posterior paling tinggi ($\operatorname{argmax}_c$).
            """
        },
        {
            "id": "4-3",
            "title": "4.3 Praktikum Koding: Class GaussianNB Manual (Pure NumPy)",
            "readingTime": "10 menit",
            "content": r"""
Berikut adalah implementasi lengkap algoritma Gaussian Naive Bayes mandiri menggunakan formulasi log-likelihood dan vektorisasi NumPy tanpa pustaka scikit-learn.

Perhatikan kotak **Bedah Sintaks & Alur Perhitungan Matematis** di bawah untuk memahami estimasi parameter mean-varians dan kalkulasi fungsi kepadatan Gaussian.
            """,
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
            "content": r"""
### 1. Karakteristik Dataset Wine Cultivars

Dataset Wine Cultivars terdiri dari 178 sampel minuman anggur dari 3 kultivar kebun anggur berbeda di Italia. Memiliki 13 fitur kimiawi kontinu berdimensi tinggi:
- Kadar Alkohol
- Asam Malat (*Malic Acid*)
- Kandungan Abu (*Ash*)
- Magnesium, Flavonoid, Fenol, dan Intensitas Warna

Target: 3 kultivar kebun anggur ($0, 1, 2$).

---

### 2. Eksekusi Script & Evaluasi Model

Jalankan script di bawah ini untuk melihat kehebatan Gaussian Naive Bayes buatan sendiri yang mampu mencapai akurasi **100% sempurna** pada data uji Wine berkat pemodelan kurva densitas yang presisi.
            """,
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
}
