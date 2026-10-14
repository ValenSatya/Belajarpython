# Bab 3: Regresi Logistik (Logistic Regression)

Meskipun namanya mengandung kata "Regresi", Regresi Logistik sebenarnya adalah algoritma **Klasifikasi**!
Algoritma ini digunakan untuk memprediksi probabilitas terjadinya suatu kejadian (contoh: Lulus vs Gagal, Spam vs Ham).

---

## 💡 Tingkat 1: Analogi Sederhana — "Saklar Pengatur Kecerahan Lampu"

Bayangkan kamu memiliki tombol putar pengatur kecerahan lampu:
* Jika kamu menggunakan Regresi Linier biasa, angkanya bisa tembus ke minus negatif (misal $-50$) atau melonjak ke angka tak terhingga ($+500$). Angka ini aneh jika dipakai untuk peluang! Masa ada kemungkinan lulus $-50\%$?
* Maka, kita pasang alat pengaman berupa **Kurva Sigmoid** ($\sigma$). Alat ini ibarat peredam:
  * Berapa pun angka minus yang masuk, hasilnya akan ditekan mendekati **0.0 (0%)**.
  * Berapa pun angka positif raksasa yang masuk, hasilnya akan ditahan maksimal di **1.0 (100%)**.

Setelah mendapatkan probabilitas (0% - 100%), kita pasang **Ambang Batas (Threshold)**, biasanya 0.5 (50%):
* Jika peluang $\ge 0.5$ $\rightarrow$ Tebak **LULUS (1)**
* Jika peluang $< 0.5$ $\rightarrow$ Tebak **GAGAL (0)**

---

## 📐 Tingkat 2: Matematika di Balik Regresi Logistik

### 1. Fungsi Aktivasi Sigmoid
$$\sigma(z) = \frac{1}{1 + e^{-z}}$$
di mana $z = X \cdot w + b$.

### 2. Fungsi Biaya: Binary Cross-Entropy (Log Loss)
Kita tidak bisa memakai MSE karena bentuk kurvanya bergelombang (banyak jebakan minimum lokal). Kita memakai Log Loss:
$$J(w, b) = -\frac{1}{n} \sum_{i=1}^{n} \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right]$$
* **Intuisi:** Jika label asli $y=1$ tapi model menebak peluang mendekati $0$, nilai $-\log(0)$ akan melonjak menuju tak terhingga (hukuman penalti raksasa!).

### 3. Gradient Descent (Turunan)
Hebatnya, setelah diturunkan menggunakan kalkulus aturan rantai, bentuk turunan Log Loss terhadap $w$ dan $b$ **persis sama** sederhananya dengan Regresi Linier:
$$\frac{\partial J}{\partial w} = \frac{1}{n} X^T (\hat{y} - y)$$
$$\frac{\partial J}{\partial b} = \frac{1}{n} \sum (\hat{y} - y)$$
*Perbedaannya hanyalah $\hat{y}$ di sini telah melewati fungsi Sigmoid: $\hat{y} = \sigma(X \cdot w + b)$.*

---

## ⚡ Trik NumPy Stabil (Mencegah `log(0)` / RuntimeWarning):
Saat menghitung log loss di Python, nilai probabilitas $\hat{y}$ yang bernilai tepat $0.0$ atau $1.0$ akan menyebabkan error `log(0) = -inf`.
Solusi profesional:
```python
# Kliping nilai agar selalu berada di antara [1e-15, 1 - 1e-15]
y_pred_clipped = np.clip(y_pred_proba, 1e-15, 1 - 1e-15)
```
Trik ini sering menjadi pembeda saat lomba LKS agar kodemu tidak memunculkan *warning* merah di depan juri!
