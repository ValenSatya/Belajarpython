"""
MODUL 10: HIERARCHICAL CLUSTERING (LKS AI)
"""

MODULE_DATA = {
    "id": "mod-10",
    "title": "Bab 10: Hierarchical Clustering (Agglomerative)",
    "icon": "10",
    "lessons": [
        {
            "id": "10-1",
            "title": "10.1 Konsep Bottom-Up (Agglomerative) & Visualisasi Dendrogram",
            "readingTime": "12 menit",
            "content": r"""
### 1. Filosofi Klasterisasi Hierarkis

#### Analogi Sederhana: Pohon Silsilah Keluarga (Family Tree)
Bayangkan Anda sedang menelusuri pohon silsilah keluarga besar Anda:
- Anda dan saudara kandung Anda adalah dua individu berbeda, namun kalian berdua menyatu pada satu cabang: **Orang Tua**.
- Orang tua Anda dan paman/bibi Anda menyatu pada cabang yang lebih tinggi: **Kakek-Nenek**.
- Jika Anda terus menarik garis silsilah ke generasi ribuan tahun yang lalu, seluruh manusia di muka bumi pada akhirnya akan bermuara dan menyatu pada satu nenek moyang bersama yang sama.

Berbeda dengan algoritma K-Means yang membagi data secara datar (*flat partition*) ke dalam sejumlah $K$ kelompok yang kaku, **Hierarchical Clustering** memodelkan derajat kekerabatan antar-data dalam bentuk struktur pohon bersarang bertingkat (*nested tree*).

Klasterisasi hierarkis dibedakan menjadi dua pendekatan arah pembentukan:
1. **Agglomerative Clustering (Bottom-Up - Dari Bawah ke Atas):**
   - **Kondisi Awal:** Setiap butir sampel data dianggap sebagai satu klaster independen mandiri ($N$ baris data $= N$ klaster terpisah).
   - **Iterasi Penggabungan:** Pada setiap langkah berurutan, dua klaster yang memiliki jarak paling dekat **digabungkan (*merged*)** menjadi satu klaster baru yang lebih besar.
   - **Kondisi Akhir:** Proses penggabungan berulang terus-menerus hingga seluruh data menyatu ke dalam satu klaster raksasa tunggal di puncak pohon.
2. **Divisive Clustering (Top-Down - Dari Atas ke Bawah):**
   - Dimulai dengan seluruh data di dalam satu kelompok raksasa, lalu dipecah bertahap menjadi kelompok-kelompok kecil.

---

### 2. Membaca Dendrogram & Analogi Garis Gunting

Struktur pohon hierarki divisualisasikan dalam bentuk diagram **Dendrogram**:
- Sumbu horizontal (bawah) menampilkan setiap sampel data individu.
- Sumbu vertikal (tinggi cabang) menampilkan **jarak matematis** saat dua kelompok data saling menyatu. Semakin tinggi garis jembatan penghubung dua cabang, semakin jauh perbedaan karakteristik antara kedua kelompok tersebut.

#### Analogi Garis Potong Gunting (Horizontal Cut Threshold):
Bagaimana cara kita menentukan jumlah klaster $K$ dari sebuah Dendrogram?
Bayangkan Anda memegang sebilah gunting, lalu menarik **garis potong horizontal lurus** pada ketinggian jarak tertentu:
- Banyaknya garis cabang tegak yang terpotong oleh gunting tersebut adalah **jumlah klaster ($K$)** yang akan Anda peroleh!
- Jika Anda memotong di garis yang sangat tinggi, Anda mendapat sedikit klaster besar ($K = 2$).
- Jika Anda memotong di garis yang lebih rendah, Anda membagi data ke dalam kelompok-kelompok yang lebih spesifik ($K = 5$).
- Keunggulan luar biasa ini memungkinkan Anda memilih jumlah klaster secara fleksibel setelah pohon selesai dibuat, tanpa perlu melatih ulang model dari awal seperti halnya K-Means!

---

### 3. Kelemahan Komputasi & Peringatan Skalabilitas

> PERINGATAN MEMORI & WAKTU KOMPETISI LKS:
> Hierarchical Clustering memiliki kompleksitas komputasi waktu $\mathcal{O}(N^3)$ (atau $\mathcal{O}(N^2)$ pada versi teroptimasi) dan kompleksitas memori $\mathcal{O}(N^2)$ karena wajib menyimpan seluruh matriks jarak pasangan ($N \times N$). Jangan pernah menggunakan algoritma ini jika data Anda memiliki lebih dari $10.000$ baris data, karena komputer akan kehabisan RAM atau mengalami proses pembekuan (*freeze*)!
            """
        },
        {
            "id": "10-2",
            "title": "10.2 Kriteria Linkage: Single, Complete, & Average",
            "readingTime": "14 menit",
            "content": r"""
### 1. Formulasi Matematika Kriteria Keterkaitan (Linkage)

Bagaimana cara komputer mengukur jarak antara dua buah kelompok klaster $A$ dan $B$ jika masing-masing kelompok memuat banyak anggota data?

Diberikan dua klaster $A = \{\mathbf{a}_1, \dots, \mathbf{a}_{|A|}\}$ dan $B = \{\mathbf{b}_1, \dots, \mathbf{b}_{|B|}\}$:

---

#### A. Single Linkage (Jarak Terpendek / Sahabat Terdekat)
Jarak antara klaster $A$ dan $B$ diukur dari jarak antara satu anggota $A$ yang paling dekat ke satu anggota $B$:

$$d_{\text{single}}(A, B) = \min_{\mathbf{a} \in A, \, \mathbf{b} \in B} \|\mathbf{a} - \mathbf{b}\|$$

- **Analogi:** Dua kelompok pertemanan dianggap bersahabat hanya karena ada *satu orang* di kelompok A yang berteman dengan *satu orang* di kelompok B.
- **Kelemahan Fatal:** Sangat rentan terhadap fenomena **Chaining Effect** (klaster merambat memanjang seperti rantai tipis karena dua kelompok besar dapat menyatu hanya karena ada sebutir debu data perantara di tengah-tengahnya).

---

#### B. Complete Linkage (Jarak Terjauh / Musuh Terjauh)
Jarak antara klaster $A$ dan $B$ diukur dari jarak antara dua anggota yang paling saling berjauhan di kedua kelompok:

$$d_{\text{complete}}(A, B) = \max_{\mathbf{a} \in A, \, \mathbf{b} \in B} \|\mathbf{a} - \mathbf{b}\|$$

- **Analogi:** Dua kelompok pertemanan baru boleh digabungkan jika *dua anggota yang paling tidak akrab sekalipun* masih memenuhi batas toleransi jarak yang dekat.
- **Keunggulan:** Menghasilkan klaster yang sangat padat, kompak (*compact clusters*), dan berdiameter seragam. **Merupakan kriteria linkage standar paling stabil dan disukai oleh juri LKS AI**.

---

#### C. Average Linkage (Jarak Rata-Rata Harmonis)
Rata-rata dari seluruh kombinasi jarak pasangan anggota antara kelompok $A$ dan $B$:

$$d_{\text{average}}(A, B) = \frac{1}{|A| \cdot |B|} \sum_{\mathbf{a} \in A} \sum_{\mathbf{b} \in B} \|\mathbf{a} - \mathbf{b}\|$$

---

### 2. Simulasi Hitung Manual Penggabungan Klaster dengan Angka Nyata

Misalkan kita memiliki 4 titik data 1 dimensi pada garis bilangan:
$$A = 2, \quad B = 5, \quad C = 9, \quad D = 15$$

Kita gunakan kriteria **Complete Linkage**.

#### Iterasi 0: Matriks Jarak Awal ($4 \times 4$)
| | A(2) | B(5) | C(9) | D(15) |
|---|---|---|---|---|
| **A(2)** | 0 | 3 | 7 | 13 |
| **B(5)** | 3 | 0 | 4 | 10 |
| **C(9)** | 7 | 4 | 0 | 6 |
| **D(15)**| 13 | 10 | 6 | 0 |

Jarak terpendek di seluruh matriks adalah **$d(A, B) = 3$**.
$\implies$ **Gabungkan klaster $A$ dan $B$ menjadi satu klaster baru: $(AB)$ pada ketinggian jarak $h = 3$**.

#### Iterasi 1: Perbarui Matriks Jarak dengan Complete Linkage
Hitung jarak dari $(AB)$ ke titik lainnya menggunakan aturan nilai maksimum ($\max$):
- $d((AB), C) = \max(d(A, C), d(B, C)) = \max(7, 4) = \mathbf{7}$
- $d((AB), D) = \max(d(A, D), d(B, D)) = \max(13, 10) = \mathbf{13}$
- $d(C, D) = |9 - 15| = \mathbf{6}$

Matriks Jarak Baru ($3 \times 3$):
| | (AB) | C | D |
|---|---|---|---|
| **(AB)** | 0 | 7 | 13 |
| **C** | 7 | 0 | **6** |
| **D** | 13 | **6** | 0 |

Jarak terpendek saat ini adalah **$d(C, D) = 6$**.
$\implies$ **Gabungkan klaster $C$ dan $D$ menjadi klaster baru: $(CD)$ pada ketinggian $h = 6$**.

#### Iterasi 2: Penggabungan Puncak
Hitung jarak antara $(AB)$ dan $(CD)$:
- $d((AB), (CD)) = \max(d(A, C), d(A, D), d(B, C), d(B, D)) = \max(7, 13, 4, 10) = \mathbf{13}$

$\implies$ **Gabungkan seluruh kelompok $((AB), (CD))$ menjadi satu pohon silsilah lengkap pada ketinggian puncak $h = 13$**.
            """
        },
        {
            "id": "10-3",
            "title": "10.3 Praktikum Koding: Class HierarchicalClustering Manual",
            "readingTime": "11 menit",
            "content": r"""
Berikut adalah implementasi lengkap algoritma Agglomerative Hierarchical Clustering mandiri menggunakan kalkulasi matriks jarak pasangan (*pairwise distance matrix*) dan slicing sub-matriks `np.ix_` murni NumPy.

Perhatikan kotak **Bedah Sintaks & Alur Perhitungan Matematis** di bawah untuk memahami proses penggabungan klaster iteratif dan pembaruan label.
            """,
            "codePath": "modelling/07_hierarchical_clustering/contoh_program.py",
            "syntaxBreakdown": [
                {
                    "syntax": "diff = X[:, np.newaxis, :] - X[np.newaxis, :, :]; dist_matrix = np.sqrt(np.sum(diff ** 2, axis=-1))",
                    "explanation": "Kalkulasi Matriks Jarak Pasangan (Pairwise Distance Matrix): Memanfaatkan trik penyiaran (broadcasting) dimensi np.newaxis untuk menghitung seluruh N x N kombinasi jarak Euclidean antar-titik secara instan tanpa perulangan for bertingkat."
                },
                {
                    "syntax": "np.fill_diagonal(dist_matrix, np.inf)",
                    "explanation": "Mengisi nilai diagonal matriks (jarak dari suatu titik ke dirinya sendiri yang bernilai 0) dengan nilai Infinity agar titik tidak memilih dirinya sendiri saat mencari jarak minimum."
                },
                {
                    "syntax": "sub_matrix = dist_matrix[np.ix_(cluster_a_indices, cluster_b_indices)]",
                    "explanation": "Menggunakan np.ix_ untuk mengekstraksi sub-matriks jarak khusus antara seluruh anggota klaster A terhadap seluruh anggota klaster B."
                },
                {
                    "syntax": "linkage_dist = np.max(sub_matrix) if self.linkage == 'complete' else np.min(sub_matrix)",
                    "explanation": "Menerapkan kriteria Complete Linkage (mengambil nilai jarak maksimum) atau Single Linkage (mengambil nilai jarak minimum) dari sub-matriks pasangan."
                },
                {
                    "syntax": "self.labels_[current_clusters[cluster_b]] = cluster_a",
                    "explanation": "Tahap Penggabungan: Memperbarui label seluruh anggota klaster B menjadi label klaster A, menyatukan kedua himpunan ke dalam satu identitas kelompok."
                }
            ]
        },
        {
            "id": "10-4",
            "title": "10.4 Studi Kasus: Klasterisasi Nasabah & Evaluasi Linkage",
            "readingTime": "10 menit",
            "content": r"""
### 1. Pengujian Kriteria Linkage pada Data Nyata

Pada sub-bab penutup ini, kita menguji model Hierarchical Clustering mandiri buatanmu pada subset data nasabah belanja Mall Customers untuk membandingkan stabilitas segmentasi antara **Complete Linkage** vs **Single Linkage**.

---

### 2. Eksekusi Script & Evaluasi Dendrogram

Jalankan script di bawah ini untuk melihat bagaimana penggabungan bottom-up berlangsung dari 20 sampel nasabah awal hingga membentuk klaster belanja yang solid.
            """,
            "codePath": "modelling/07_hierarchical_clustering/studi_kasus.py",
            "syntaxBreakdown": [
                {
                    "syntax": "model = HierarchicalClusteringManual(n_clusters=3, linkage='complete')",
                    "explanation": "Menginisialisasi model Agglomerative dengan target 3 klaster akhir dan kriteria Complete Linkage."
                },
                {
                    "syntax": "model.fit(X_sample)",
                    "explanation": "Menjalankan proses penggabungan beruntun dari N klaster mandiri menjadi 3 kelompok nasabah final."
                }
            ]
        }
    ]
}
