# Bab 4: Pohon Keputusan (Decision Tree)

Decision Tree (Pohon Keputusan) adalah algoritma *Supervised Learning* yang sangat disukai juri LKS karena **mudah diinterpretasikan (*white-box model*)**. Kita bisa melihat persis alasan mengapa model mengambil suatu keputusan!

---

## ❓ Tingkat 1: Analogi Sederhana

### Analogi 1: "Permainan Tebak 20 Pertanyaan"
Pernahkah kamu bermain tebak hewan dengan temanmu?
* Kamu bertanya: *"Apakah hewan ini hidup di air?"* $\rightarrow$ Teman menjawab: *"Tidak"*.
* Pertanyaan berikutnya: *"Apakah hewan ini berkaki empat?"* $\rightarrow$ Teman menjawab: *"Ya"*.
* Pertanyaan berikutnya: *"Apakah hewan ini mengeong?"* $\rightarrow$ Teman menjawab: *"Ya"*.
* Kesimpulanmu: **"Kucing!"**

Setiap pertanyaan adalah sebuah **Cabang (Branch / Split)**, dan kesimpulan akhir di ujung pohon adalah **Daun (Leaf Node)**.

---

### Analogi 2: "Mengukur Kebersihan Kantong Permen (Gini Impurity)"
Bagaimana komputer memilih pertanyaan terbaik untuk membelah data? Komputer menggunakan ukuran **Gini Impurity (Tingkat Pengotoran / Ketidakmurnian)**:
* **Kantong Sangat Bersih / Murni (Gini = 0.0):**
  Di dalam kantong ada 10 permen dan **semuanya rasa Stroberi (100% merah)**. Tidak ada kebingungan sama sekali!
* **Kantong Sangat Kotor / Campur Aduk (Gini = 0.5):**
  Di dalam kantong ada 5 permen Stroberi (merah) dan 5 permen Anggur (ungu). Jika kamu mengambil permen dengan mata tertutup, peluang tebakanmu benar cuma 50%. Ini kondisi paling bingung/kotor.

Tujuan Decision Tree adalah mencari **pertanyaan pemotong yang membuat kantong kiri dan kanan semurni mungkin (Gini mendekati 0)**!

---

## 📐 Tingkat 2: Matematika di Balik Decision Tree (CART)

### 1. Rumus Gini Impurity
Untuk sebuah kumpulan data dengan kelas target $c$:
$$\text{Gini} = 1 - \sum_{i=1}^{C} p_i^2$$
*di mana $p_i$ adalah proporsi (persentase) kelas ke-$i$ di dalam kumpulan data tersebut.*

**Contoh Hitung:**
Ada 10 data: 7 Lulus, 3 Gagal.
* $p_{\text{Lulus}} = 7/10 = 0.7$
* $p_{\text{Gagal}} = 3/10 = 0.3$
* $\text{Gini} = 1 - (0.7^2 + 0.3^2) = 1 - (0.49 + 0.09) = 1 - 0.58 = 0.42$.

### 2. Gini Split (Kualitas Pemotongan)
Jika data dipotong menjadi dua kubu: Kiri ($N_{kiri}$) dan Kanan ($N_{kanan}$):
$$\text{Gini}_{\text{split}} = \frac{N_{kiri}}{N} \text{Gini}_{kiri} + \frac{N_{kanan}}{N} \text{Gini}_{kanan}$$
Algoritma akan menguji setiap fitur dan setiap kemungkinan batas angka, lalu memilih pemotongan yang menghasilkan $\text{Gini}_{\text{split}}$ **terkecil**!

### 3. Kapan Pohon Berhenti Tumbuh? (Stopping Criteria)
Jika dibiarkan tumbuh terus tanpa henti, pohon akan menghafal seluruh data hingga 100% (*Overfitting parah*). Kita harus membatasi:
1. **`max_depth`**: Kedalaman maksimum cabang (misal cukup sampai kedalaman 3 atau 4).
2. **`min_samples_split`**: Jumlah data minimal di sebuah cabang agar boleh dipotong lagi (misal minimal 2 atau 5 data).
3. **Murni 100%**: Gini sudah mencapai 0.0.

---

## 🌲 Kelebihan Utama di LKS:
Model ini tidak butuh normalisasi/standarisasi data (`StandardScaler` tidak wajib)! Karena pohon hanya membandingkan apakah nilai $X_i \le \text{threshold}$, besaran skala tidak mempengaruhi hasil pemotongan.
