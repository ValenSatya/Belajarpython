# Bab 6: K-Means Clustering (Unsupervised Learning)

K-Means adalah algoritma *Unsupervised Learning* paling populer.
Berbeda dengan 5 bab sebelumnya, di K-Means **kita tidak memiliki label target $y$** (tanpa kunci jawaban). Komputer bertugas mengelompokkan data yang mirip secara otomatis!

---

## 🏘️ Tingkat 1: Analogi Sederhana — "Membangun 3 Pos Ronda Paling Adil"

Bayangkan di sebuah kompleks perumahan baru, ketua RT ingin membangun **3 Pos Ronda**:
1. **Langkah 1 (Tancap Titik Awal):** Ketua RT menancapkan bendera di 3 lokasi acak sebagai calon pos ronda (*Inisialisasi Centroid*).
2. **Langkah 2 (Pilih Pos Terdekat):** Setiap warga kompleks diminta untuk melapor ke pos ronda yang jarak jalannya paling dekat dari rumah mereka (*Assignment Step*).
3. **Langkah 3 (Geser ke Titik Tengah):** Setelah warga terbagi menjadi 3 kelompok, ketua RT memindahkan bendera pos ronda tepat ke titik tengah rata-rata rumah warga di kelompok tersebut (*Update Centroid*).
4. **Langkah 4 (Ulangi):** Karena posisi pos bergeser, ada beberapa warga yang pos terdekatnya berubah. Warga mendaftar ulang, pos digeser lagi, hingga posisi pos **benar-benar diam dan tidak berubah lagi (*Konvergen*)**.

---

## 📐 Tingkat 2: Algoritma Matematis K-Means

Misalkan kita ingin membagi $N$ data menjadi $K$ klaster:

### 1. Assignment (Pemberian Klaster)
Tiap titik data $x_i$ dimasukkan ke klaster $k$ yang jarak Euclideannya paling dekat:
$$c^{(i)} = \arg\min_k ||x_i - \mu_k||^2$$

### 2. Update Centroid (Perhitungan Titik Tengah Baru)
Hitung ulang posisi centroid $\mu_k$ sebagai nilai rata-rata dari seluruh anggota yang ada di dalam klaster tersebut:
$$\mu_k = \frac{1}{|S_k|} \sum_{x \in S_k} x$$

### 3. Evaluasi Kualitas Klaster: Inertia (WCSS)
Within-Cluster Sum of Squares (WCSS) mengukur seberapa rapat dan padat titik-titik di dalam klasternya:
$$\text{Inertia} = \sum_{k=1}^{K} \sum_{x \in S_k} ||x - \mu_k||^2$$
*Semakin kecil nilai Inertia, semakin padat dan rapi pengelompokannya.*

---

## 📉 Bagaimana Menentukan Nilai K Terbaik? (Metode Siku / Elbow Method)
Jika kamu bingung harus membagi menjadi berapa klaster (apakah $K=2, 3$, atau $5$?):
1. Latih model K-Means untuk berbagai nilai $K = 1, 2, 3, 4, 5, \dots$
2. Catat nilai **Inertia** untuk setiap $K$.
3. Perhatikan di mana terjadi **penurunan drastis yang kemudian mulai melandai** (membentuk sudut siku tangan). Titik siku tersebut adalah jumlah klaster paling optimal!
