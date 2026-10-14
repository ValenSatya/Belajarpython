# Modul Pembelajaran LKS AI: Modeling & Evaluasi (From Scratch)

Selamat datang di modul persiapan **Lomba Kompetensi Siswa (LKS) SMK bidang Artificial Intelligence**.
Modul ini dikhususkan bagi kamu yang memegang peran **Modelling & Evaluasi** dengan aturan kompetisi: **100% Murni Tanpa Scikit-Learn (Pure Python + NumPy)**.

---

## 🎯 Filosofi Belajar: "Dari Analogi Nyata ke Matematika & Kode"

Setiap bab dalam modul ini dirancang dengan 5 tingkat pemahaman berjenjang:
1. **Tingkat 1 (Analogi Sehari-hari)**: Penjelasan konsep bagi yang benar-benar pemula tanpa istilah menakutkan.
2. **Tingkat 2 (Alur Logika & Rumus Matematika)**: Memahami mengapa dan bagaimana rumus bekerja langkah demi langkah.
3. **Tingkat 3 (Implementasi Kode OOP Mandiri)**: Membangun class mandiri dengan method standar `.fit()` dan `.predict()`.
4. **Tingkat 4 (Studi Kasus Nyata)**: Latihan pemecahan masalah dengan alur kerja lomba LKS.
5. **Tingkat 5 (Tantangan Advance)**: Optimasi, penanganan data ekstrem, dan trik efisiensi saat lomba.

---

## 📂 Struktur Direktori Modul

```text
c:\Modul\
│
├── README.md                           # Panduan umum & peta jalan belajar
│
├── common/                             # Utilitas Dasar (Pengganti Scikit-Learn)
│   ├── preprocessing.py               # train_test_split, StandardScaler, MinMaxScaler, LabelEncoder
│   └── data_helper.py                 # Generator dataset sintetis mandiri (100% offline-ready)
│
├── evaluasi/                           # Modul Evaluasi Model
│   ├── klasifikasi/                   # Confusion Matrix, Akurasi, Presisi, Recall, F1-Score
│   │   ├── teori.md
│   │   ├── metrics.py
│   │   ├── studi_kasus.py
│   │   ├── latihan.py
│   │   └── solusi_latihan.py
│   └── regresi/                       # MAE, MSE, RMSE, R-Squared (R2)
│       ├── teori.md
│       ├── metrics.py
│       ├── studi_kasus.py
│       ├── latihan.py
│       └── solusi_latihan.py
│
└── modelling/                          # Algoritma Machine Learning dari Nol
    ├── 01_knn/                         # K-Nearest Neighbors (Supervised - Klasifikasi)
    ├── 02_regresi_linear/              # Linear Regression (Supervised - Regresi)
    ├── 03_regresi_logistik/            # Logistic Regression (Supervised - Klasifikasi)
    ├── 04_decision_tree/               # Decision Tree CART (Supervised - Klasifikasi)
    ├── 05_naive_bayes/                 # Gaussian Naive Bayes (Supervised - Probabilistik)
    └── 06_k_means/                     # K-Means Clustering (Unsupervised)
```

---

## 🧭 Peta Jalan Belajar yang Direkomendasikan

Agar belajarmu terstruktur dan tidak membingungkan, ikuti urutan berikut:

1. **Hari 1: Kuasai Pondasi (`common/`)**
   * Pelajari cara membagi data (`train_test_split`) dan menstandarisasi angka (`StandardScaler`) manual.
2. **Hari 2: Kuasai Evaluasi Klasifikasi & Regresi (`evaluasi/`)**
   * Pahami betul mengapa Akurasi bisa menipu (kenapa butuh Precision, Recall, dan F1).
3. **Hari 3: Model Klasifikasi Pertama — KNN (`modelling/01_knn/`)**
   * Algoritma paling mudah karena hanya menghitung jarak.
4. **Hari 4: Model Prediksi Angka — Regresi Linier (`modelling/02_regresi_linear/`)**
   * Memahami konsep penting *Gradient Descent* (turunan kurva error).
5. **Hari 5: Model Klasifikasi Berbasis Probabilitas — Regresi Logistik (`modelling/03_regresi_logistik/`)**
   * Memahami fungsi *Sigmoid* untuk mengubah angka jadi probabilitas.
6. **Hari 6: Pohon Keputusan — Decision Tree (`modelling/04_decision_tree/`)**
   * Memahami *Gini Impurity* dan struktur percabangan data.
7. **Hari 7: Klasifikasi Bayes & Unsupervised K-Means (`modelling/05_naive_bayes/` & `modelling/06_k_means/`)**
   * Melengkapi seluruh persenjataan algoritma LKS AI.

---

## ⚡ Cara Menjalankan File Kode

Buka Command Prompt atau PowerShell di folder modul ini, lalu jalankan menggunakan perintah `py`:

```powershell
# Contoh menjalankan preprocessing
py common/preprocessing.py

# Contoh menjalankan contoh model KNN
py modelling/01_knn/contoh_program.py
```

Semoga sukses dalam persiapan dan meraih juara di LKS AI!
