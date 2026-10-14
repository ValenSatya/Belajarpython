# Bab 5: Gaussian Naive Bayes

Naive Bayes adalah algoritma *Supervised Learning* berbasis teori probabilitas (peluang) statistik.
Algoritma ini sangat cepat dilatih karena tidak membutuhkan iterasi *Gradient Descent* yang berulang-ulang!

---

## 🩺 Tingkat 1: Analogi Sederhana — "Dokter Mendiagnosis Gejala"

Bayangkan seorang dokter sedang memeriksa pasien yang datang dengan 3 gejala: **Demam Tinggi**, **Batuk**, dan **Hilang Penciuman**:
* Berapa peluang orang yang terkena **COVID** mengalami 3 gejala tersebut?
* Berapa peluang orang yang terkena **Flu Biasa** mengalami 3 gejala tersebut?
* Dokter membandingkan: mana penyakit yang probabilitasnya paling tinggi memunculkan kombinasi gejala tersebut?

### Mengapa Disebut "Naive" (Polos / Lugu)?
Algoritma ini mengasumsikan bahwa **setiap fitur saling bebas (independen)** satu sama lain, padahal di dunia nyata seringkali berhubungan (misal: orang batuk seringkali bersamaan dengan pilek).
Meskipun asumsi ini terkesan "lugu/polos", di dunia nyata performa Naive Bayes terbukti sangat tangguh dan luar biasa cepat!

---

## 📐 Tingkat 2: Matematika di Balik Gaussian Naive Bayes

### 1. Teorema Bayes Dasar
$$P(Y | X) = \frac{P(X | Y) \cdot P(Y)}{P(X)}$$
Karena penyebut $P(X)$ sama untuk semua kelas, kita cukup mencari kelas $Y$ yang memaksimalkan:
$$\hat{y} = \arg\max_c \left[ P(Y = c) \prod_{i=1}^{m} P(x_i | Y = c) \right]$$

### 2. Prior Probability: $P(Y = c)$
Peluang dasar kemunculan suatu kelas di data latih:
$$P(Y = c) = \frac{\text{Jumlah data kelas } c}{\text{Total seluruh data}}$$

### 3. Likelihood Gauss (Distribusi Normal): $P(x_i | Y = c)$
Untuk data berupa angka kontinu (bukan teks/kategori), kita mengasumsikan fitur berdistribusi lonceng Gauss.
Kita hanya perlu menghitung **Rata-rata ($\mu$)** dan **Variansi ($\sigma^2$)** fitur pada kelas $c$:
$$P(x_i | c) = \frac{1}{\sqrt{2\pi\sigma_c^2}} \exp\left( -\frac{(x_i - \mu_c)^2}{2\sigma_c^2} \right)$$

### 4. Trik Penjumlahan Logaritma (Log Trick)
Mengalikan angka-angka desimal kecil (misal $0.001 \times 0.004 \times 0.0002$) di komputer akan menyebabkan angka menjadi 0 (*arithmetic underflow*).
Solusinya: ubah perkalian menjadi **penjumlahan logaritma**:
$$\log P(Y|X) \propto \log P(Y) + \sum_{i=1}^{m} \log P(x_i | Y)$$
Operasi penjumlahan logaritma ini 100% stabil secara numerik di komputer!
