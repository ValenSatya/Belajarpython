# Teori Evaluasi Model Klasifikasi: Dari Analogi Pemula Hingga Rumus

Dalam peran **Modeling & Evaluasi**, tugasmu bukan sekadar melatih model hingga selesai, tetapi **membuktikan seberapa pintar modelmu** kepada juri LKS.

Banyak pemula mengira metrik evaluasi itu cuma **Akurasi (Accuracy)**. Padahal di dunia nyata dan di LKS, mengandalkan akurasi saja bisa menjadi jebakan mematikan!

---

## 🔔 Tingkat 1: Analogi Sederhana — "Alarm Kebakaran Gedung"

Bayangkan kamu memasang alat sensor **Alarm Kebakaran** di sebuah gedung:

1. **True Positive (TP) — "Hebat!":** Ada api menyala betulan $\rightarrow$ Alarm berbunyi kencang. (Tebakan Positif Benar)
2. **True Negative (TN) — "Aman!":** Gedung adem ayem tidak ada api $\rightarrow$ Alarm diam tenang. (Tebakan Negatif Benar)
3. **False Positive (FP) — "Alarm Palsu!":** Tidak ada api (cuma ada tukang sate lewat membawa asap) $\rightarrow$ Alarm tiba-tiba berbunyi membuat seisi gedung panik keluar. (Salah Tebak Positif)
4. **False Negative (FN) — "PETAKA BESAR!":** Gedung terbakar hebat $\rightarrow$ Alarm malah tidur dan tidak berbunyi sama sekali! Korban berjatuhan. (Salah Tebak Negatif)

### Jebakan Akurasi (The Accuracy Paradox)
Bayangkan dalam setahun, gedung itu aman selama 364 hari, dan hanya 1 hari terjadi kebakaran.
Jika ada alarm "bodoh" yang **selalu mati sepanjang tahun (tidak pernah bunyi)**:
* Alarm itu benar di 364 hari (TN = 364).
* Alarm itu salah di 1 hari kebakaran (FN = 1).
* **Akurasi alarm bodoh itu:** $\frac{364}{365} = 99.72\%$! 
* Akurasinya nyaris 100%, tetapi alarm itu **SANGAT BERBAHAYA** karena membiarkan gedung terbakar (FN tinggi).

Itulah mengapa kita butuh metrik lain: **Precision, Recall, dan F1-Score**.

---

## 📊 Tingkat 2: Tabel Confusion Matrix & Rumus Matematika

Tabel Confusion Matrix merangkum 4 kemungkinan hasil tebakan:

| | **Fakta: Positif (1)** | **Fakta: Negatif (0)** |
| :--- | :---: | :---: |
| **Model Tebak: Positif (1)** | **TP** (True Positive) | **FP** (False Positive) |
| **Model Tebak: Negatif (0)** | **FN** (False Negative) | **TN** (True Negative) |

### 1. Accuracy (Akurasi)
Seberapa sering model menebak dengan benar secara keseluruhan.
$$\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}$$
*Kapan dipakai?* Hanya jika jumlah data kelas positif dan negatif seimbang (50% : 50%).

### 2. Precision (Presisi)
Dari semua yang ditebak POSITIF oleh model, berapa yang BENAR-BENAR positif?
$$\text{Precision} = \frac{TP}{TP + FP}$$
*Kapan sangat penting?* Saat **False Positive (FP)** sangat mahal/merugikan.
*Contoh:* Filter Email SPAM. Jangan sampai email penting dari juri LKS malah masuk folder Spam (FP).

### 3. Recall (Sensitivitas)
Dari semua data yang ASLINYA POSITIF, berapa persen yang BERHASIL DITANGKAP oleh model?
$$\text{Recall} = \frac{TP}{TP + FN}$$
*Kapan sangat penting?* Saat **False Negative (FN)** berakibat fatal.
*Contoh:* Deteksi Penyakit / Kanker atau Alarm Kebakaran. Lebih baik mencurigai orang sehat untuk diperiksa ulang (FP), daripada membiarkan pasien kanker stadium awal pulang tanpa diobati (FN).

### 4. F1-Score (Rata-rata Harmonik)
Keseimbangan (*trade-off*) antara Precision dan Recall.
$$\text{F1-Score} = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$$
F1-Score menggunakan rata-rata harmonik (bukan rata-rata aritmatika biasa). Jika salah satu dari Precision atau Recall bernilai 0, maka F1-Score langsung anjlok ke 0.

---

## 🚀 Tingkat 3: Evaluasi Multi-Kelas (Macro vs Weighted)

Jika kelas target lebih dari dua (misal: Daun Sehat, Kutu Putih, Jamur Daun):
1. **Hitung Precision & Recall untuk setiap kelas secara One-vs-Rest (OvR).**
2. **Macro Average**: Rata-rata murni dari metrik tiap kelas (memberi bobot setara pada kelas langka maupun kelas mayoritas).
3. **Weighted Average**: Rata-rata berbobot berdasarkan jumlah sampel asli (*support*) tiap kelas.

---

## 💡 Tips Emas Saat Lomba LKS:
1. Saat presentasi ke juri, **jangan cuma tunjukkan akurasi**.
2. Katakan: *"Model kami memiliki akurasi 94%, namun karena data target tidak seimbang, kami mengoptimalkan metrik Recall hingga mencapai 98% untuk meminimalkan risiko False Negative."*
3. Jawaban ini langsung menunjukkan kamu paham machine learning tingkat profesional!
