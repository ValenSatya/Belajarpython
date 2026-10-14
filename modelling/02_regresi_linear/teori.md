# Bab 2: Regresi Linier (Linear Regression) dengan Gradient Descent

Regresi Linier adalah algoritma *Supervised Learning* untuk memprediksi **angka kontinu** (seperti harga barang, suhu, atau omzet).

---

## 📏 Tingkat 1: Analogi Sederhana

### Analogi 1: "Menarik Garis Penggaris Paling Pas"
Bayangkan kamu punya kertas grafik berisi sebaran titik-titik korelasi antara "Jumlah Jam Belajar" dan "Nilai Ujian".
Tugasmu adalah meletakkan sebuah penggaris lurus di tengah-tengah titik tersebut, sedemikian rupa sehingga jarak antara penggaris dengan semua titik seminimal mungkin.

### Analogi 2: "Tersesat di Bukit Berkabut (Gradient Descent)"
Bagaimana komputer tahu posisi penggaris terbaik?
Bayangkan kamu sedang berada di atas bukit yang dipenuhi kabut tebal hingga matamu tidak bisa melihat ke mana arah dasar lembah.
* Yang bisa kamu rasakan dengan kakimu hanyalah **kemiringan tanah tempatmu berpijak**.
* Agar bisa turun ke tempat paling rendah (error paling kecil), kamu meraba arah yang menurun paling curam, lalu melangkah ke arah tersebut setapak demi setapak (*learning rate*).
* Ketika tanah sudah mulai mendatar (kemiringan mendekati 0), tandanya kamu sudah sampai di dasar lembah (*titik optimal*)!

---

## 📐 Tingkat 2: Penurunan Rumus Matematika

Persamaan prediksi garis lurus untuk banyak fitur ($x_1, x_2, \dots, x_m$):
$$\hat{y} = w_1 x_1 + w_2 x_2 + \dots + w_m x_m + b = X \cdot w + b$$
*di mana $w$ adalah bobot (*weight* / kemiringan) dan $b$ adalah bias (*geseran garis*).*

### 1. Fungsi Biaya / Pengukur Dosa (Mean Squared Error)
$$J(w, b) = \frac{1}{n} \sum_{i=1}^{n} (\hat{y}_i - y_i)^2$$

### 2. Menghitung Arah Turunan (Gradients)
Untuk mengetahui arah lereng, kita turunkan $J$ terhadap $w$ dan $b$ (kalkulus turunan rantai):
$$\frac{\partial J}{\partial w} = \frac{2}{n} X^T (\hat{y} - y)$$
$$\frac{\partial J}{\partial b} = \frac{2}{n} \sum (\hat{y} - y)$$

### 3. Memperbarui Bobot (Weight Update)
Geser parameter berlawanan arah dengan turunan sejauh $\alpha$ (*learning rate*):
$$w = w - \alpha \frac{\partial J}{\partial w}$$
$$b = b - \alpha \frac{\partial J}{\partial b}$$

---

## ⚡ Vektorisasi NumPy (Trik Cepat & Bersih di LKS):
Alih-alih membuat perulangan `for` untuk setiap data, kita pakai operasi matriks NumPy:
```python
# 1. Forward Pass (Prediksi)
y_pred = np.dot(X, w) + b

# 2. Hitung Error
error = y_pred - y

# 3. Hitung Gradient
dw = (2 / n_samples) * np.dot(X.T, error)
db = (2 / n_samples) * np.sum(error)

# 4. Update
w -= learning_rate * dw
b -= learning_rate * db
```
Hanya butuh 4 baris kode di dalam loop training!
