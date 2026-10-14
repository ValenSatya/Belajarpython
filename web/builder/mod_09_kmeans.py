"""
MODUL 9: K-MEANS CLUSTERING (LKS AI)
"""

MODULE_DATA = {
    "id": "mod-9",
    "title": "Bab 9: K-Means Clustering",
    "icon": "09",
    "lessons": [
        {
            "id": "9-1",
            "title": "9.1 Konsep Unsupervised Learning & Algoritma Lloyd",
            "readingTime": "12 menit",
            "content": r"""
### 1. Paradigma Unsupervised Learning (Pembelajaran Tanpa Guru)

#### Analogi Sederhana: Merapikan Laci Bumbu Tanpa Label
Bayangkan Anda pindah ke rumah baru dan menemukan laci dapur penuh dengan ratusan toples rempah tanpa label tulisan sama sekali. Tidak ada guru yang memberitahu Anda nama bumbu tersebut. 
Apa yang Anda lakukan? Anda mengamati warna, aroma, dan teksturnya:
- Toples dengan butiran putih asin dikelompokkan ke wadah garam.
- Toples dengan bubuk hitam beraroma tajam disatukan ke wadah lada.
- Toples dengan bubuk cokelat manis disatukan ke wadah kayu manis.

Inilah esensi **Unsupervised Learning (Pembelajaran Tanpa Supervisi)**: komputer diberikan data mentah fitur tanpa label target kunci jawaban sama sekali:

$$\mathcal{D} = \{\mathbf{x}_1, \mathbf{x}_2, \dots, \mathbf{x}_N\}, \quad \mathbf{x}_i \in \mathbb{R}^m$$

Tujuan dari **Clustering (Klasterisasi)** adalah mempartisi data ini ke dalam $K$ kelompok alami sedemikian rupa sehingga:
1. **Intra-Cluster Similarity Tinggi:** Data di dalam kelompok yang sama memiliki kemiripan ciri yang sangat erat.
2. **Inter-Cluster Similarity Rendah:** Data antar kelompok yang berbeda memiliki batas pemisah yang sangat tegas dan kontras.

---

### 2. Algoritma Lloyd (Iterasi 3 Langkah K-Means)

#### Analogi Pemilihan Kafe Kumpul Kelompok Belajar
Bayangkan ada 30 orang mahasiswa yang tinggal terpencar di berbagai penjuru kota. Mereka sepakat membagi diri ke dalam 3 kelompok belajar bersama ($K = 3$). Masing-masing kelompok harus menentukan 1 kafe kumpul agar tidak ada anggota yang merasa lokasi belajarnya kejauhan:

1. **Langkah 1: Inisialisasi Kafe Awal (Centroid Initialization)**
   Tiga kafe dipilih secara acak di peta kota sebagai titik awal kumpul:
   $$\mathbf{\mu}_1, \mathbf{\mu}_2, \dots, \mathbf{\mu}_K \in \mathbb{R}^m$$
2. **Langkah 2: Memilih Kafe Terdekat (Assignment Step)**
   Setiap mahasiswa membuka peta dan menghitung jarak dari rumahnya ke ketiga kafe tersebut. Mereka otomatis berangkat ke kafe yang jaraknya paling dekat:
   $$c_i = \operatorname{argmin}_{k \in \{1, \dots, K\}} \|\mathbf{x}_i - \mathbf{\mu}_k\|^2$$
3. **Langkah 3: Memindahkan Kafe ke Titik Tengah Anggota (Update Step)**
   Setelah berkumpul, anggota kelompok 1 menyadari: *"Mayoritas rumah kita ada di sisi timur, kafe ini terlalu ke barat. Mari kita pindahkan kafe kumpul ke titik tengah rata-rata koordinat rumah kita!"*. Pusat kafe diperbarui ke rata-rata koordinat seluruh anggotanya:
   $$\mathbf{\mu}_k = \frac{1}{|C_k|} \sum_{\mathbf{x} \in C_k} \mathbf{x}$$
4. **Langkah 4: Konvergensi (Berhenti)**
   Setelah kafe berpindah, beberapa mahasiswa yang tinggal di perbatasan mungkin berpindah ke kafe lain yang kini lebih dekat. Proses ini diulang sampai **tidak ada lagi mahasiswa yang berpindah kelompok** dan posisi kafe sudah stabil membeku!

#### Bedah Simbol Rumus:
- $\mathbf{x}_i$: Koordinat fitur sampel data ke-$i$.
- $\mathbf{\mu}_k$ (Centroid): Titik koordinat pusat gravitasi rata-rata dari klaster ke-$k$.
- $\|\mathbf{x}_i - \mathbf{\mu}_k\|^2$: Kuadrat jarak Euclidean antara titik data dan centroid.
- $\operatorname{argmin}_k$: Fungsi pencari indeks klaster $k$ yang menghasilkan jarak terkecil.
- $|C_k|$: Jumlah total sampel yang menjadi anggota kelompok $C_k$.
            """
        },
        {
            "id": "9-2",
            "title": "9.2 Formulasi Matematika WCSS (Inertia) & Elbow Method",
            "readingTime": "13 menit",
            "content": r"""
### 1. Fungsi Objektif: WCSS (Within-Cluster Sum of Squares)

#### Analogi Total Biaya Bahan Bakar Anggota
Melanjutkan analogi kelompok belajar di kafe: nilai **WCSS (Within-Cluster Sum of Squares)** atau **Inertia** dapat dibayangkan sebagai **total biaya bensin kendaraan yang dihabiskan oleh seluruh 30 mahasiswa untuk menempuh perjalanan dari rumah ke kafe kumpulnya masing-masing**.

Tujuan matematis algoritma K-Means adalah meminimalkan total pemborosan jarak ini:

$$\text{WCSS} = \sum_{k=1}^K \sum_{\mathbf{x} \in C_k} \|\mathbf{x} - \mathbf{\mu}_k\|^2$$

#### Bedah Simbol Rumus WCSS:
- $\sum_{k=1}^K$: Penjumlahan akumulasi di seluruh $K$ kelompok klaster.
- $\sum_{\mathbf{x} \in C_k}$: Penjumlahan kuadrat jarak dari setiap titik data $\mathbf{x}$ khusus di dalam kelompok $C_k$.
- Semakin kecil nilai WCSS, semakin padat dan kompak sebaran anggota di sekitar pusat centroid masing-masing.

---

### 2. Dilema Pemilihan Nilai K: Kapan Berhenti?

Mengapa kita tidak memilih nilai $K$ sebesar mungkin agar WCSS sekecil mungkin?
- **Jika $K = 1$:** Seluruh data se-kota disatukan ke dalam 1 kelompok raksasa. Anggota yang tinggal di pinggiran kota akan menghabiskan bensin sangat banyak $\implies$ WCSS bernilai paling tinggi.
- **Jika $K = N$:** Setiap orang belajar sendirian di rumah masing-masing ($30$ mahasiswa membentuk $30$ kelompok!). Jarak ke centroid adalah $0 \implies \text{WCSS} = 0$. Namun model ini **konyol dan tidak ada gunanya sama sekali**, karena tidak ada pengelompokan yang terbentuk.

Kita membutuhkan kompromi terbaik antara jumlah kelompok yang efisien dengan nilai WCSS yang rendah.

---

### 3. Elbow Method (Metode Tekukan Siku Lengan)

Untuk menemukan jumlah klaster optimal secara ilmiah tanpa tebak-tebakan, kita memplot grafik **Elbow Curve**:
1. Jalankan algoritma K-Means untuk serangkaian nilai $K$ berurutan (misalnya $K = 1, 2, 3, \dots, 8$).
2. Catat nilai WCSS untuk masing-masing pengujian $K$.
3. Plot diagram sumbu X ($K$) terhadap sumbu Y ($\text{WCSS}$).

#### Analogi Tekukan Siku Tangan:
Bayangkan bentuk lengan tangan Anda saat ditekuk:
- Dari pundak menuju siku ($K=1$ ke $K=2, 3$), lengan **menurun sangat curam**. Ini menunjukkan penambahan kelompok memberikan perbaikan kerapatan yang sangat masif!
- Mulai dari siku tangan menuju pergelangan ($K=5$ ke atas), lengan **melandai mendatar**. Ini menunjukkan penambahan klaster baru tidak lagi memberikan penghematan variansi yang signifikan.
- **Titik Siku (Elbow Point):** Titik sudut tekukan itulah nilai $K$ optimal terbaik yang dipilih!

> TIPS JUARA LKS AI:
> Sebutkan metrik **Silhouette Score** di hadapan juri LKS. Silhouette score mengukur rasio kerapatan internal klaster (*cohesion*) terhadap jarak pemisah ke klaster tetangga terdekat (*separation*) dengan rentang skala $[-1.0, +1.0]$. Skor mendekati $+1.0$ membuktikan bahwa klaster terpisah dengan sangat rapi dan tidak saling bertumpuk (*dense and well-separated*).
            """
        },
        {
            "id": "9-3",
            "title": "9.3 Praktikum Koding: Class KMeans Manual (Pure NumPy)",
            "readingTime": "11 menit",
            "content": r"""
Berikut adalah implementasi lengkap algoritma K-Means mandiri menggunakan kalkulasi jarak Euclidean matriks NumPy, pelacakan konvergensi centroid, dan perhitungan WCSS Inertia.

Perhatikan kotak **Bedah Sintaks & Alur Perhitungan Matematis** di bawah untuk memahami bagaimana tahap assignment dan update centroid diimplementasikan secara elegan.
            """,
            "codePath": "modelling/06_k_means/contoh_program.py",
            "syntaxBreakdown": [
                {
                    "syntax": "random_indices = np.random.choice(n_samples, self.k, replace=False); self.centroids_ = X[random_indices].copy()",
                    "explanation": "Tahap Inisialisasi: Memilih K indeks observasi unik dari dataset secara acak tanpa pengembalian (replace=False) untuk dijadikan posisi awal vektor centroid."
                },
                {
                    "syntax": "distances[:, k_idx] = np.sum((X - self.centroids_[k_idx]) ** 2, axis=1)",
                    "explanation": "Tahap Assignment: Menghitung kuadrat jarak Euclidean antara seluruh baris sampel data X dengan posisi centroid ke-k secara tervektorisasi."
                },
                {
                    "syntax": "labels = np.argmin(distances, axis=1)",
                    "explanation": "Menentukan kepemilikan klaster: np.argmin mencari indeks kolom centroid yang menghasilkan nilai jarak terpendek untuk masing-masing baris observasi."
                },
                {
                    "syntax": "new_centroids[k_idx] = np.mean(cluster_points, axis=0)",
                    "explanation": "Tahap Update: Memperbarui posisi koordinat centroid ke-k sebagai rata-rata aritmatika dari seluruh sampel data yang terdaftar di dalam klaster tersebut."
                },
                {
                    "syntax": "self.inertia_ = float(np.sum((X - self.centroids_[self.labels_]) ** 2))",
                    "explanation": "Kalkulasi WCSS (Inertia): Menghitung akumulasi kuadrat jarak Euclidean dari seluruh titik data ke centroid kelompoknya masing-masing sebagai tolok ukur kepadatan klaster."
                }
            ]
        },
        {
            "id": "9-4",
            "title": "9.4 Studi Kasus: Segmentasi Pelanggan Mall Customers (Kaggle)",
            "readingTime": "10 menit",
            "content": r"""
### 1. Karakteristik Dataset Mall Customer Segmentation

Dataset ini memuat data profil dan transaksi 200 pelanggan di sebuah pusat perbelanjaan:
- **Annual Income ($k$)**: Pendapatan tahunan pelanggan dalam ribuan dollar AS.
- **Spending Score (1-100)**: Skor perilaku belanja yang dinilai oleh algoritma mall berdasarkan frekuensi kunjungan dan volume struk belanja.

Tujuan: Mengelompokkan pelanggan ke dalam persona segmen pasar untuk strategi pemasaran tertarget (*targeted marketing*).

---

### 2. Eksekusi Script & Penemuan 5 Persona Pelanggan

Jalankan script di bawah ini untuk melihat bagaimana model K-Means buatanmu mengelompokkan pelanggan ke dalam 5 klaster yang sangat nyata:
1. **Klaster Hemat:** Pendapatan Tinggi, Skor Belanja Rendah.
2. **Klaster Sultan / Boros:** Pendapatan Tinggi, Skor Belanja Tinggi.
3. **Klaster Standar:** Pendapatan Menengah, Pengeluaran Menengah.
4. **Klaster Kurang Mampu tapi Boros:** Pendapatan Rendah, Pengeluaran Tinggi.
5. **Klaster Rasional:** Pendapatan Rendah, Pengeluaran Rendah.
            """,
            "codePath": "modelling/06_k_means/studi_kasus.py",
            "syntaxBreakdown": [
                {
                    "syntax": "X, customer_ids = load_mall_customers()",
                    "explanation": "Memuat data 200 nasabah belanja Mall Customers dari file datasets/mall_customers.csv."
                },
                {
                    "syntax": "model = KMeansManual(k=5, max_iter=300)",
                    "explanation": "Menginisialisasi model K-Means dengan konfigurasi 5 klaster pasar berdasarkan hasil analisis Elbow Method."
                },
                {
                    "syntax": "print(f'Final WCSS (Inertia): {model.inertia_:.2f}')",
                    "explanation": "Melaporkan nilai WCSS akhir model setelah mencapai kondisi konvergensi mutlak."
                }
            ]
        }
    ]
}
