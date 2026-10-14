"""
MODUL 8: EVALUASI MODEL REGRESI (LKS AI)
"""

MODULE_DATA = {
    "id": "mod-8",
    "title": "Bab 8: Evaluasi Model Regresi",
    "icon": "08",
    "lessons": [
        {
            "id": "8-1",
            "title": "8.1 Metrik Galat Absolut & Kuadratik: MAE, MSE, dan RMSE",
            "readingTime": "12 menit",
            "content": r"""
### 1. Mengapa Kita Tidak Bisa Memakai Akurasi pada Kasus Regresi?

#### Analogi Sederhana: Menaksir Berat Badan Pasien
Bayangkan seorang dokter memperkirakan berat badan pasien. Berat timbangan sebenarnya adalah **$60.00\,\text{kg}$**, sedangkan dokter memperkirakan **$60.05\,\text{kg}$** (hanya meleset 50 gram).

Jika kita menggunakan metrik akurasi boolean klasifikasi biasa ($y == \hat{y}$):
Karena $60.00 \ne 60.05$, komputer akan memberi vonis **0% (Salah Mutlak)**! Hal ini tentu sangat tidak adil dan tidak masuk akal.

Pada kasus regresi, target adalah bilangan riil kontinu. Kesalahan prediksi bukanlah perkara hitam-putih "Benar atau Salah", melainkan tentang **seberapa dekat besaran jarak simpangan galat (residual)** yang dihasilkan oleh model terhadap target aktual.

---

### 2. Tiga Metrik Utama Regresi

#### Analogi Papan Sasaran Panahan
Bayangkan Anda sedang melatih seorang atlet panahan yang menembakkan anak panah ke papan sasaran lingkaran:
- Titik merah tengah sasaran adalah nilai target aktual ($y$).
- Di mana anak panah menancap di papan adalah hasil prediksi model ($\hat{y}$).
- Jarak dalam centimeter antara anak panah dengan titik pusat sasaran adalah **Residual ($e_i = y_i - \hat{y}_i$)**.

Mari kita bedah tiga cara mengukur kepiawaian atlet panahan tersebut:

---

#### A. Mean Absolute Error (MAE)
Anda mengambil pita pengukur, mengukur jarak setiap anak panah ke titik pusat tanpa mempedulikan apakah panah meleset ke arah kiri atau kanan (selalu bernilai positif / absolut $|e_i|$), lalu menghitung rata-ratanya:

$$\text{MAE} = \frac{1}{N} \sum_{i=1}^N |y_i - \hat{y}_i|$$

- **Keunggulan:** Satuannya sama persis dengan satuan target asli (misal: *"prediksi meleset rata-rata 2.5 kilogram"* atau *"meleset 3 juta rupiah"*). Sangat ramah dipahami oleh klien bisnis dan orang awam.
- **Sifat:** Bersifat linier seragam (*robust* terhadap pencilan).

---

#### B. Mean Squared Error (MSE)
Pelatih panahan menerapkan aturan disiplin berlipat ganda: *"Jika kamu meleset 1 cm, hukumannya push-up 1 kali ($1^2 = 1$). Namun jika kamu meleset 10 cm sampai ke luar papan sasaran, kamu mempermalukan tim, sehingga hukumannya push-up $10^2 = 100$ kali!"*:

$$\text{MSE} = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2$$

- **Sifat:** Mengkuadratkan selisih galat memberikan **hukuman penalti eksponensial yang luar biasa berat terhadap kesalahan prediksi yang melenceng jauh**.
- **Kelemahan:** Satuan ukurnya menjadi kuadrat (misalnya: $(\text{rupiah})^2$ atau $(\text{kg})^2$), sehingga membingungkan jika dibaca langsung oleh manusia.

---

#### C. Root Mean Squared Error (RMSE)
Setelah menghitung denda kuadrat MSE, kita menarik akar pangkat dua ($\sqrt{\cdot}$) untuk mengembalikan satuannya kembali ke satuan asli:

$$\text{RMSE} = \sqrt{\text{MSE}} = \sqrt{\frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2}$$

- **Keunggulan:** Memiliki satuan asli yang ramah manusia (seperti MAE), namun **tetap mempertahankan sensitivitas hukuman keras terhadap pencilan ekstrim** (seperti MSE). Inilah metrik paling populer dalam kompetisi sains data global!

---

### 3. Simulasi Hitung Manual MAE, MSE, dan RMSE

Misalkan kita menguji 3 prediksi konsumsi bahan bakar kendaraan (Liter):

| Sampel | Aktual ($y_i$) | Prediksi ($\hat{y}_i$) | Galat ($e_i$) | Absolut $|e_i|$ | Kuadrat $e_i^2$ |
|---|---|---|---|---|---|
| 1 | 10.0 | 9.0 | $-1.0$ | $1.0$ | $1.0$ |
| 2 | 20.0 | 22.0 | $+2.0$ | $2.0$ | $4.0$ |
| 3 | 30.0 | 35.0 | $+5.0$ | $5.0$ | $25.0$ |
| **Total** | | | | **8.0** | **30.0** |

Perhitungan ketiga metrik:
1. $$\text{MAE} = \frac{8.0}{3} \approx \mathbf{2.67} \text{ Liter}$$
2. $$\text{MSE} = \frac{30.0}{3} = \mathbf{10.0} \text{ Liter}^2$$
3. $$\text{RMSE} = \sqrt{10.0} \approx \mathbf{3.16} \text{ Liter}$$

Perhatikan bahwa nilai $\text{RMSE} (3.16) > \text{MAE} (2.67)$ karena RMSE dipengaruhi kuat oleh kesalahan besar ($+5.0$) pada sampel ke-3!
            """
        },
        {
            "id": "8-2",
            "title": "8.2 Koefisien Determinasi (R2 Score) & Interpretasi",
            "readingTime": "12 menit",
            "content": r"""
### 1. Filosofi Koefisien Determinasi ($R^2$)

Metrik MAE dan RMSE memiliki satu keterbatasan: nilainya terikat erat pada skala fisik data. Meleset $10$ gram pada takaran obat racik dosis tinggi adalah bencana maut, tetapi meleset $10$ gram pada muatan truk tronton pengangkut pasir sama sekali tidak berarti apa-apa.

Kita membutuhkan suatu metrik evaluasi tanpa satuan (*dimensionless metric*) yang mampu menjawab: **"Berapa persen keragaman atau variasi dari fenomena data yang berhasil dijelaskan oleh model kita?"**

Metrik universal tersebut adalah **$R^2$ Score (Koefisien Determinasi)**.

---

### 2. Formulasi Matematika & Bedah Simbol $R^2$

#### Analogi Guru Pemalas (Model Baseline)
Bayangkan seorang guru penguji yang sangat malas memeriksa lembar jawaban ujian siswanya. Tanpa membaca berkas ujian sama sekali, ia hanya menghitung nilai rata-rata seluruh kelas ($\bar{y} = 70$), lalu memvonis semua siswa mendapat nilai $70$!
Garis horizontal rata-rata ini adalah **Model Baseline Terburuk**, dan akumulasi kesalahannya disebut **$SS_{\text{tot}}$**.

Model AI Anda berusaha lebih pintar dengan mempelajari pola fitur. Akumulasi kesalahan model Anda disebut **$SS_{\text{res}}$**.

$$R^2 = 1 - \frac{SS_{\text{res}}}{SS_{\text{tot}}} = 1 - \frac{\sum_{i=1}^N (y_i - \hat{y}_i)^2}{\sum_{i=1}^N (y_i - \bar{y})^2}$$

#### Bedah Simbol Rumus $R^2$:
1. **$SS_{\text{res}}$ (Residual Sum of Squares):** Total akumulasi kuadrat galat model Anda. Seberapa banyak variasi data yang gagal diprediksi oleh model.
2. **$SS_{\text{tot}}$ (Total Sum of Squares):** Total akumulasi variasi alami data terhadap nilai rata-ratanya sendiri ($\bar{y} = \frac{1}{N}\sum y_i$).
3. **$\frac{SS_{\text{res}}}{SS_{\text{tot}}}$:** Proporsi kesalahan model Anda dibandingkan dengan kebodohan model garis rata-rata baseline.
4. **$1 - (\dots)$:** Sisa proporsi variasi yang berhasil dijinakkan dan dijelaskan oleh kecerdasan model.

---

### 3. Panduan Interpretasi Nilai $R^2$

- **$R^2 = 1.0$ ($100\%$ - Kesempurnaan Mutlak):** Seluruh residual $e_i = 0$. Garis model melewati seluruh titik data dengan sangat presisi.
- **$R^2 = 0.86$ ($86\%$ - Sangat Kuat):** Model berhasil menjelaskan $86\%$ variasi pola penjualan produk. Sisa $14\%$ variabilitas merupakan faktor eksternal tak terduga atau noise acak.
- **$R^2 = 0.0$ ($0\%$ - Tidak Berfaedah):** Model Anda tidak punya kecerdasan apapun, performanya persis sama dengan sekadar menebak angka rata-rata target.
- **$R^2 < 0.0$ (Nilai Negatif - Bencana Pemodelan):** Terjadi jika $SS_{\text{res}} > SS_{\text{tot}}$. Model Anda menghasilkan prediksi yang **jauh lebih rusak daripada sekadar menebak nilai rata-rata horizontal**. Ini sinyal merah terjadinya kerusakan algoritma, divergensi gradien, atau overfitting parah!

> RAHASIA PRESENTASI JUARA LKS AI:
> Selalu sajikan kombinasi berpasangan **RMSE dan $R^2$** kepada dewan juri kompetisi. RMSE memberikan gambaran besaran simpangan fisik yang nyata, sedangkan $R^2$ membuktikan kekuatan matematis model dalam menangkap tren data!
            """
        },
        {
            "id": "8-3",
            "title": "8.3 Studi Kasus: Evaluasi Regresi Penjualan",
            "readingTime": "9 menit",
            "content": r"""
### 1. Pengujian Metrik Regresi Lengkap pada Data Advertising

Mari kita terapkan modul evaluasi regresi buatan kita pada dataset riil Advertising Kaggle untuk memverifikasi akurasi prediksi angka penjualan produk.

Jalankan script di bawah ini untuk melihat perbandingan MAE, MSE, RMSE, serta pembuktian skor $R^2 = 86.03\%$.
            """,
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
}
