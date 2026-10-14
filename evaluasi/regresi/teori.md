# Teori Evaluasi Model Regresi: Dari Analogi Pemula Hingga Rumus

Jika tugas modelmu adalah memprediksi **angka kontinu** (seperti harga rumah, suhu ruangan, atau estimasi gaji), kamu tidak bisa memakai Confusion Matrix atau Akurasi. Kita menggunakan metrik **Error (Selisih Kesalahan)** dan **Koefisien Determinasi ($R^2$)**.

---

## 🎯 Tingkat 1: Analogi Sederhana — "Latihan Menembak Sasaran"

Bayangkan kamu sedang memanah ke papan target di titik pusat bernilai 100:
* Tembakan panahmu jatuh di angka 95 $\rightarrow$ kamu meleset sejauh 5 poin.
* Tembakan kedua jatuh di angka 110 $\rightarrow$ kamu meleset sejauh 10 poin.

Dalam regresi, **Error** adalah seberapa jauh panah (prediksi model) meleset dari titik tengah sebenarnya (*ground truth*).
Semakin kecil nilai error, semakin sakti modelmu!

---

## 📐 Tingkat 2: Empat Metrik Wajib Regresi

Misalkan:
* $y_i$ = Nilai sebenarnya
* $\hat{y}_i$ = Nilai tebakan model
* $n$ = Jumlah total data

### 1. Mean Absolute Error (MAE)
Rata-rata dari **selisih mutlak** (tanpa memedulikan tanda plus atau minus):
$$\text{MAE} = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|$$
* **Kelebihan:** Sangat mudah dijelaskan ke juri. Jika memprediksi harga motor, "MAE = 500.000" artinya rata-rata tebakan model meleset Rp500.000 dari harga asli.
* **Sifat:** Kebal terhadap *outlier* (angka pencilan ekstrem).

### 2. Mean Squared Error (MSE)
Rata-rata dari **kuadrat selisih**:
$$\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$$
* **Sifat Khusus:** Karena error dikuadratkan, kesalahan yang besar akan dihukum **sangat berat**! Misalnya meleset 10 akan bernilai 100, meleset 20 akan bernilai 400.
* **Kelemahan:** Satuannya ikut terkuadratkan (misal: "rupiah kuadrat"), sehingga sulit dibayangkan secara intuitif.

### 3. Root Mean Squared Error (RMSE)
Akar kuadrat dari nilai MSE:
$$\text{RMSE} = \sqrt{\text{MSE}} = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2}$$
* **Kelebihan:** Mengembalikan satuan ke bentuk aslinya (kembali ke "rupiah"), namun tetap mempertahankan sifat memberi hukuman berat pada error yang besar.

### 4. R-Squared ($R^2$ / Koefisien Determinasi)
Mengukur seberapa persen variasi target yang berhasil dijelaskan oleh modelmu:
$$R^2 = 1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}$$
*di mana $\bar{y}$ adalah rata-rata nilai sebenarnya.*
* **Rentang Nilai:** Biasanya 0.0 sampai 1.0 (atau 0% sampai 100%).
* **Artinya:** Jika $R^2 = 0.85$, artinya 85% faktor naik-turunnya harga rumah berhasil ditangkap dengan benar oleh fitur-fitur modelmu. Sisanya 15% dipengaruhi faktor acak lain.
* **Catatan:** Jika $R^2$ bernilai negatif, artinya modelmu bekerja lebih buruk daripada orang yang cuma menebak angka rata-rata!

---

## 💡 Rangkuman Perbandingan: Kapan Pakai Apa?

| Metrik | Satuan Sama dgn Target? | Peka Terhadap Outlier? | Target Nilai Bagus |
| :--- | :---: | :---: | :---: |
| **MAE** | Ya | Tidak (Tahan Outlier) | Makin mendekati 0 |
| **MSE** | Tidak (Kuadrat) | Sangat Peka | Makin mendekati 0 |
| **RMSE** | Ya | Peka | Makin mendekati 0 |
| **$R^2$** | Tanpa satuan (Rasio) | Sedang | Makin mendekati 1.0 |
