# Bab 7: Hierarchical Clustering (Agglomerative)

Hierarchical Clustering (Pengelompokan Berjenjang) adalah algoritma *Unsupervised Learning* yang membangun pohon klaster (*dendrogram*) secara berurutan. Berbeda dengan K-Means, algoritma ini **tidak memerlukan inisialisasi titik acak (*centroid*)**, sehingga hasilnya selalu deterministik dan stabil.

---

## 1. Konsep & Alur Kerja (Bottom-Up / Agglomerative)

Pendekatan paling umum adalah **Agglomerative Hierarchical Clustering** (pendekatan dari bawah ke atas):

1. **Inisialisasi Awal**: Setiap titik data dianggap sebagai **1 klaster individual tersendiri**. Jika terdapat $N$ data, maka pada tahap awal terdapat $N$ klaster.
2. **Matriks Kedekatan (*Proximity Matrix*)**: Menghitung matriks jarak antar seluruh pasangan klaster menggunakan jarak Euclidean:
   $$d(p, q) = \sqrt{\sum_{j=1}^{m} (p_j - q_j)^2}$$
3. **Penggabungan Terdekat (*Merge Step*)**: Cari dua klaster yang memiliki jarak terkecil, lalu gabungkan (*merge*) menjadi satu klaster baru. Jumlah klaster kini berkurang menjadi $N - 1$.
4. **Pembaruan Jarak**: Perbarui matriks kedekatan untuk klaster gabungan yang baru terhadap seluruh klaster yang tersisa.
5. **Iterasi**: Ulangi langkah 3 dan 4 secara terus-menerus hingga seluruh titik data melebur menjadi **satu klaster raksasa**.

---

## 2. Kriteria Keterkaitan (*Linkage Criteria*)

Bagaimana mengukur jarak antara Klaster $A$ dan Klaster $B$ jika masing-masing klaster memiliki banyak anggota?

### A. Single Linkage (Jarak Minimum)
Jarak diambil dari **dua anggota terdekat** antar kedua klaster:
$$D_{\text{single}}(A, B) = \min \{ d(x, y) : x \in A, y \in B \}$$
*Karakteristik:* Cenderung menghasilkan klaster memanjang (*chaining effect*), rentan terhadap noise/outlier.

### B. Complete Linkage (Jarak Maksimum)
Jarak diambil dari **dua anggota terjauh** antar kedua klaster:
$$D_{\text{complete}}(A, B) = \max \{ d(x, y) : x \in A, y \in B \}$$
*Karakteristik:* Menghasilkan klaster yang kompak, padat, dan bulat (paling umum digunakan di LKS dan industri).

### C. Average Linkage (Jarak Rata-rata)
Rata-rata jarak dari seluruh kombinasi pasangan titik antar kedua klaster:
$$D_{\text{average}}(A, B) = \frac{1}{|A| \cdot |B|} \sum_{x \in A} \sum_{y \in B} d(x, y)$$

---

## 3. Representasi Dendrogram & Penentuan Jumlah Klaster

Hasil dari Hierarchical Clustering divisualisasikan dalam bentuk **Dendrogram** (diagram pohon silsilah):
* Sumbu horizontal merepresentasikan indeks sampel data.
* Sumbu vertikal merepresentasikan **jarak Euclidean** saat dua klaster digabungkan.
* **Cara Memotong (*Cut-off*)**: Kita menentukan jumlah klaster $K$ dengan menarik **garis potong horizontal**. Jumlah garis vertikal yang terpotong oleh garis horizontal tersebut menunjukkan jumlah klaster akhir yang terbentuk.
