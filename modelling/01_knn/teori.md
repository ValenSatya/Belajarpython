# Bab 1: K-Nearest Neighbors (KNN)

KNN adalah algoritma *Supervised Learning* yang paling mudah dipahami dan paling cepat dibuat dari nol saat lomba LKS.

---

## ☕ Tingkat 1: Analogi Sederhana — "Tebak Makanan dari Teman Dekat"

Bayangkan kamu adalah siswa baru di sekolah. Saat jam istirahat, kamu bingung mau makan apa di kantin.
Lalu kamu melihat **3 teman yang duduk paling dekat dengan mejamu**:
* Teman A sedang makan **Bakso**.
* Teman B sedang makan **Bakso**.
* Teman C sedang makan **Nasi Goreng**.

Karena mayoritas (2 dari 3) tetangga terdekatmu makan Bakso, kamu memutuskan memesan **Bakso** juga!
Itulah logika dasar KNN: **"Sebuah data baru akan memiliki label yang sama dengan mayoritas tetangga terdekatnya."**

---

## 📐 Tingkat 2: Matematika di Balik KNN

KNN tidak memiliki proses "training" matematis yang rumit (*Lazy Learner*). Saat fungsi `.fit(X, y)` dipanggil, KNN **hanya menyimpan data**. Kerja sebenarnya terjadi saat fungsi `.predict(X_baru)` dipanggil!

### 1. Menghitung Jarak Antar Titik (Euclidean Distance)
Misalkan ada titik baru $A = (x_1, x_2)$ dan titik data lama $B = (y_1, y_2)$:
$$d(A, B) = \sqrt{\sum_{i=1}^{n} (x_i - y_i)^2}$$
Di Python (NumPy):
```python
jarak = np.sqrt(np.sum((X_train - x_baru) ** 2, axis=1))
```

### 2. Memilih Nilai $K$ (Jumlah Tetangga)
* **K = 1**: Sangat sensitif terhadap noise/pencilan (*overfitting*).
* **K terlalu besar**: Mengikutsertakan tetangga yang terlalu jauh (*underfitting*).
* **Tips LKS**: Gunakan bilangan **ganjil** (misal $K = 3, 5, 7$) untuk klasifikasi biner agar tidak terjadi voting seri (*tie*)!

### 3. Voting Mayoritas
Setelah jarak dihitung dan diurutkan dari yang terkecil, ambil label dari $K$ data terdekat, lalu pilih label yang paling sering muncul (*mode*).

---

## ⚠️ Perhatian Kritis: Wajib Normalisasi / Scaling!
Karena KNN berbasis jarak, fitur dengan angka besar akan mendominasi perhitungan:
* Misal Fitur 1: Umur (20 - 50 tahun) $\rightarrow$ selisih paling besar 30.
* Misal Fitur 2: Gaji (Rp3.000.000 - Rp20.000.000) $\rightarrow$ selisih jutaan!

Jarak Euclidean akan 99.9% hanya dipengaruhi oleh Gaji!
**Solusi:** Selalu gunakan `StandardScaler` atau `MinMaxScaler` sebelum melatih KNN!

---

## ⚡ Langkah Logika Mengetik KNN di LKS:
1. Simpan `X_train` dan `y_train`.
2. Untuk setiap baris data baru `x`:
   * Hitung selisih kuadrat ke semua `X_train`.
   * Jumlahkan barisnya dan tarik akar kuadrat $\rightarrow$ dapat array jarak.
   * Ambil $K$ indeks dengan jarak terkecil (`np.argsort(jarak)[:k]`).
   * Ambil label dari indeks tersebut dan lakukan voting mayoritas.
