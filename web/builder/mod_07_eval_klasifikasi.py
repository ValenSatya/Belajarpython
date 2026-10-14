"""
MODUL 7: EVALUASI MODEL KLASIFIKASI (LKS AI)
"""

MODULE_DATA = {
    "id": "mod-7",
    "title": "Bab 7: Evaluasi Model Klasifikasi",
    "icon": "07",
    "lessons": [
        {
            "id": "7-1",
            "title": "7.1 Anatomi Confusion Matrix: Type I vs Type II Error",
            "readingTime": "11 menit",
            "content": r"""
### 1. Mengapa Akurasi Saja Menyesatkan?

#### Analogi Sederhana: Dokter Malas yang Mengantuk
Bayangkan di sebuah klinik kesehatan terpencil, dari 1.000 pasien yang datang setiap bulan, rata-rata 990 orang hanya mengalami flu ringan biasa ($99\%$), sedangkan hanya 10 orang yang mengidap demam berdarah berbahaya ($1\%$).

Seorang dokter magang yang sangat malas dan mengantuk memutuskan untuk tidak memeriksa pasien sama sekali. Apapun keluhan pasien, ia langsung mencap stempel di resep: *"Flu Biasa (0)"*.
- Seberapa tinggi akurasi dokter magang tersebut? **$99\%$ tepat!**
- Namun, apa yang terjadi pada 10 pasien demam berdarah tersebut? Seluruhnya disuruh pulang tanpa obat dan akhirnya meninggal dunia!

Apakah dokter dengan "akurasi 99%" ini layak dipertahankan? Tentu saja tidak! Di dunia Machine Learning, ilusi ini disebut **Accuracy Paradox (Paradoks Akurasi)**. Ketika data kita tidak seimbang (*imbalanced dataset*), angka akurasi adalah metrik penipu.

Untuk melihat kebenaran performa model secara transparan, kita wajib membedah **Confusion Matrix**.

---

### 2. Anatomi Kuadran Confusion Matrix 2x2

#### Analogi Alarm Kebakaran Gedung Sekolah
Confusion Matrix membandingkan kenyataan sesungguhnya di alam nyata ($y$) dengan apa yang ditebak oleh model kecerdasan buatan ($\hat{y}$):

| Fakta Aktual \ Prediksi Model | Prediksi Negatif ($\hat{y} = 0$) | Prediksi Positif ($\hat{y} = 1$) |
|---|---|---|
| **Aktual Negatif ($y = 0$)** | **True Negative (TN)** | **False Positive (FP)** *(Type I Error)* |
| **Aktual Positif ($y = 1$)** | **False Negative (FN)** *(Type II Error)* | **True Positive (TP)** |

Mari kita pahami keempat kuadran ini melalui sistem sensor alarm kebakaran:
1. **True Positive (TP):** Ada api berkobar di laboratorium $\to$ Alarm berdering nyaring tepat waktu. Seluruh murid dan guru selamat dievakuasi (Tebakan Positif yang Benar).
2. **True Negative (TN):** Tidak ada api sama sekali $\to$ Alarm tetap tenang diam. Kegiatan belajar mengajar berjalan lancar dan kondusif (Tebakan Negatif yang Benar).
3. **False Positive (FP / Type I Error - Alarm Palsu):** Tidak ada api sama sekali, hanya roti panggang sedikit gosong di kantin $\to$ Alarm meraung-raung panik. Seluruh sekolah dievakuasi ke lapangan terbuka. Mengganggu dan membuang waktu, tetapi tidak ada korban jiwa (Tebakan Positif yang Salah).
4. **False Negative (FN / Type II Error - Luput Fatal):** Ada kobaran api sungguhan di lantai 3 $\to$ Sensor alarm rusak dan tetap diam seribu bahasa! Tidak ada bunyi peringatan, penghuni gedung terjebak di dalam api. **Dampaknya adalah bencana fatal dan kematian!**

---

### 3. Pedoman Etika Rekayasa LKS AI

> ATURAN UTAMA KOMPETISI LKS AI:
> Pada aplikasi berisiko tinggi seperti diagnosis medis, rem darurat mobil otonom, dan deteksi kecelakaan industri, **False Negative (FN) adalah dosa rekayasa paling mematikan**. Model wajib dirancang untuk menekan angka FN serendah mungkin, bahkan jika itu harus sedikit meningkatkan FP (lebih baik mengirim pasien sehat untuk cek ulang laboratorium daripada membiarkan pasien kanker stadium awal pulang tanpa pengobatan).
            """
        },
        {
            "id": "7-2",
            "title": "7.2 Metrik Evaluasi: Akurasi, Presisi, Recall, & F1-Score",
            "readingTime": "14 menit",
            "content": r"""
### 1. Formulasi Matematika Empat Metrik Klasifikasi

Untuk mengukur performa secara objektif, komunitas sains data merumuskan empat metrik standar:

#### A. Accuracy (Akurasi Total)
Mengukur berapa persen total tebakan yang tepat (baik positif maupun negatif) dari seluruh data yang ada:

$$\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}$$

- **Kelebihan:** Sangat mudah dipahami oleh orang awam.
- **Kelemahan:** Sangat berbahaya dan menyesatkan jika jumlah kelas positif dan negatif tidak seimbang.

---

#### B. Precision (Presisi / Ketepatan Janji)
Mengukur kualitas saat model berani mengeluarkan vonis positif: *"Dari seluruh sampel yang dituduh positif oleh model, berapa persen yang faktanya memang benar-benar positif?"*

$$\text{Precision} = \frac{TP}{TP + FP}$$

- **Fokus Utama:** Menekan seminimal mungkin angka **False Positive (FP / Alarm Palsu)**.
- **Contoh Kasus:** Sistem filter email spam. Kita tidak ingin email penting wawancara kerja salah dimasukkan ke kotak sampah spam!

---

#### C. Recall / Sensitivity (Daya Tangkap / Kelengkapan Jaring)
Mengukur kemampuan jaring model menangkap seluruh kasus positif yang beredar: *"Dari seluruh fakta kasus positif yang benar-benar ada di alam nyata, berapa persen yang berhasil dijaring oleh model?"*

$$\text{Recall} = \frac{TP}{TP + FN}$$

- **Fokus Utama:** Menekan seminimal mungkin angka **False Negative (FN / Kasus Lolos)**.
- **Contoh Kasus:** Alat deteksi virus penyakit menular di bandara. Jaring harus menangkap semua pembawa virus agar pandemi tidak menyebar ke seluruh negeri!

---

#### D. F1-Score (Rata-Rata Harmonik)
Mengukur keseimbangan kompromi antara Presisi dan Recall:

$$F_1 = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}} = \frac{2TP}{2TP + FP + FN}$$

---

### 2. Mengapa F1-Score Menggunakan Rata-Rata Harmonik?

Mengapa para ilmuwan matematika tidak memakai rata-rata aritmatika biasa $\frac{\text{Precision} + \text{Recall}}{2}$?

Mari kita buktikan bahayanya dengan simulasi matematika:
Misalkan sebuah model "licik" hanya berani menebak 1 sampel yang paling jelas sebagai positif ($TP = 1, FP = 0$), sementara model menolak menebak 99 sampel positif lainnya karena takut salah ($FN = 99$):
- $\text{Precision} = \frac{1}{1 + 0} = \mathbf{1.0} \quad (100\%)$
- $\text{Recall} = \frac{1}{1 + 99} = \mathbf{0.01} \quad (1\%)$

Jika kita menggunakan:
1. **Rata-Rata Aritmatika Biasa:**
   $$\text{Mean} = \frac{1.0 + 0.01}{2} = \mathbf{0.505} \quad (50.5\%)$$
   *(Angka 50.5% memberikan ilusi palsu bahwa model bekerja cukup lumayan, padahal model gagal menangkap 99% pasien sakit!)*
2. **Rata-Rata Harmonik ($F_1$):**
   $$F_1 = 2 \times \frac{1.0 \times 0.01}{1.0 + 0.01} = \frac{0.02}{1.01} \approx \mathbf{0.0198} \quad (1.98\%)$$
   *(F1-Score secara tegas menghukum ketimpangan ekstrem dan nilainya langsung jatuh mendekati nol!)*

Rata-rata harmonik menjamin nilai skor akhir hanya akan tinggi jika **baik Presisi MAUPUN Recall sama-sama tinggi dan seimbang**.

---

### 3. Matriks Pemilihan Metrik di Hadapan Penguji LKS

| Domain Masalah | Metrik Prioritas | Target Error yang Ditekan | Alasan Rekayasa AI |
|---|---|---|---|
| **Diagnosis Medis & Radiologi** | **Recall** | False Negative (FN) | Mencegah pasien kanker stadium awal terlewat tanpa penanganan. |
| **Pendeteksi Penipuan Kartu Kredit** | **Recall** | False Negative (FN) | Menjamin transaksi pencurian uang nasabah terdeteksi secepatnya. |
| **Filter Email Spam & Malware** | **Precision** | False Positive (FP) | Menjaga surat bisnis resmi tidak terlempar ke folder sampah. |
| **Rekomendasi Investasi Portofolio** | **Precision** | False Positive (FP) | Modal uang nasabah yang dipertaruhkan tidak boleh salah dialokasikan. |
| **Kasus Imbalanced Umum** | **F1-Score** | Keseimbangan Keduanya | Ukuran objektif performa umum model di hadapan juri kompetisi. |
            """
        },
        {
            "id": "7-3",
            "title": "7.3 Studi Kasus: Jebakan Akurasi pada Kasus Imbalanced",
            "readingTime": "10 menit",
            "content": r"""
### 1. Pembuktian Nyata 'Accuracy Paradox' pada Data Medis

Mari kita uji konsep ini pada dataset asli **Pima Indians Diabetes** dari Kaggle.
Dalam dataset pengujian berukuran 192 pasien:
- Pasien Sehat ($y = 0$): 123 orang ($64\%$)
- Pasien Sakit ($y = 1$): 69 orang ($36\%$)

Kita akan mengadu dua model:
1. **Model Malas (Dummy Classifier):** Model bodoh yang selalu menebak seluruh pasien "Sehat (0)". Model ini mendapat akurasi $64\%$, namun nilai Recall-nya adalah **$0.0\%$**!
2. **Model AI Sebenarnya (Trained Model):** Model yang dilatih mengenali pola biokimia tubuh dan berhasil menjaring sebagian besar pasien berisiko tinggi.

---

### 2. Eksekusi Script & Pembuktian Laporan Klasifikasi

Jalankan script di bawah ini untuk melihat perbandingan Confusion Matrix, Akurasi semu, dan nilai Recall yang membuktikan mengapa juri LKS mewajibkan pelaporan metrik F1-Score dan Recall.
            """,
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
}
