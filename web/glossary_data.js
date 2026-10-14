// GLOSSARIUM MACHINE LEARNING — LKS AI (Penjelasan Sederhana & Ramah Pemula)
// Berisi istilah-istilah teknis yang sering membingungkan saat pertama kali belajar AI.

const GLOSSARY_DATA = {
    "non-parametrik": {
        term: "Non-Parametrik",
        category: "Karakteristik Model",
        desc: "Model yang tidak mengasumsikan bentuk distribusi data tertentu (bebas bentuk). Bentuk pemodelannya sangat fleksibel dan langsung mengikuti persebaran data asli di lapangan tanpa dipaksa menjadi garis lurus."
    },
    "parametrik": {
        term: "Parametrik",
        category: "Karakteristik Model",
        desc: "Model yang sejak awal mengasumsikan rumus matematika tertentu untuk data (misalnya menganggap hubungan data pasti berbentuk garis lurus pada regresi linear)."
    },
    "hiperspace": {
        term: "Hiperspace (Ruang Multi-Dimensi)",
        category: "Geometri Data",
        desc: "Ruang koordinat dengan lebih dari 3 dimensi sumbu. Dalam machine learning, setiap satu kolom fitur dianggap sebagai satu sumbu dimensi tersendiri."
    },
    "hyperspace": {
        term: "Hyperspace (Ruang Multi-Dimensi)",
        category: "Geometri Data",
        desc: "Ruang koordinat dengan lebih dari 3 dimensi sumbu. Dalam machine learning, setiap satu kolom fitur dianggap sebagai satu sumbu dimensi tersendiri."
    },
    "curse of dimensionality": {
        term: "Curse of Dimensionality (Kutukan Dimensi)",
        category: "Masalah Data",
        desc: "Fenomena ketika kolom fitur terlalu banyak sehingga ruang data menjadi teramat luas dan kosong (sparse). Akibatnya, semua titik data saling berjauhan dan jarak antar-titik kehilangan daya bedanya."
    },
    "kutukan dimensi": {
        term: "Kutukan Dimensi",
        category: "Masalah Data",
        desc: "Fenomena ketika kolom fitur terlalu banyak sehingga ruang data menjadi teramat luas dan kosong (sparse). Akibatnya, semua titik data saling berjauhan dan jarak antar-titik kehilangan daya bedanya."
    },
    "lazy learner": {
        term: "Lazy Learner (Pembelajar Malas)",
        category: "Paradigma Algoritma",
        desc: "Algoritma yang tidak menghitung rumus rumit saat fase latihan (hanya menyimpan data mentah ke memori), namun baru bekerja keras menghitung saat diminta memprediksi data baru (seperti KNN)."
    },
    "eager learner": {
        term: "Eager Learner (Pembelajar Cepat)",
        category: "Paradigma Algoritma",
        desc: "Algoritma yang belajar keras di awal untuk menghasilkan rumus tetap atau pohon keputusan, sehingga saat memprediksi data baru bisa menjawab dengan instan (seperti Regresi dan Decision Tree)."
    },
    "euclidean distance": {
        term: "Euclidean Distance",
        category: "Metrik Jarak",
        desc: "Jarak garis lurus terpendek antara dua titik pada ruang geometri, dihitung menggunakan rumus Pythagoras (akar dari jumlah kuadrat selisih koordinat)."
    },
    "jarak euclidean": {
        term: "Jarak Euclidean",
        category: "Metrik Jarak",
        desc: "Jarak garis lurus terpendek antara dua titik pada ruang geometri, dihitung menggunakan rumus Pythagoras (akar dari jumlah kuadrat selisih koordinat)."
    },
    "manhattan distance": {
        term: "Manhattan Distance",
        category: "Metrik Jarak",
        desc: "Jarak tempuh dengan menyusuri garis tegak lurus (horizontal & vertikal), seperti mobil taksi yang menyusuri jalur blok-blok jalan kota."
    },
    "jarak manhattan": {
        term: "Jarak Manhattan",
        category: "Metrik Jarak",
        desc: "Jarak tempuh dengan menyusuri garis tegak lurus (horizontal & vertikal), seperti mobil taksi yang menyusuri jalur blok-blok jalan kota."
    },
    "majority voting": {
        term: "Majority Voting (Pemungutan Suara)",
        category: "Mekanisme Keputusan",
        desc: "Penentuan tebakan akhir berdasarkan label kelas yang paling banyak muncul di antara para tetangga terdekat (persis seperti sistem pemilu suara terbanyak)."
    },
    "voting mayoritas": {
        term: "Voting Mayoritas",
        category: "Mekanisme Keputusan",
        desc: "Penentuan tebakan akhir berdasarkan label kelas yang paling banyak muncul di antara para tetangga terdekat (persis seperti sistem pemilu suara terbanyak)."
    },
    "feature scaling": {
        term: "Feature Scaling (Penskalaan Fitur)",
        category: "Pra-pemrosesan Data",
        desc: "Proses menyamakan rentang skala angka antar-kolom (misal diubah ke skala 0-1) agar fitur berangka besar (seperti gaji jutaan) tidak mendominasi atau menenggelamkan fitur berangka kecil (seperti usia)."
    },
    "penskalaan fitur": {
        term: "Penskalaan Fitur",
        category: "Pra-pemrosesan Data",
        desc: "Proses menyamakan rentang skala angka antar-kolom (misal diubah ke skala 0-1) agar fitur berangka besar (seperti gaji jutaan) tidak mendominasi atau menenggelamkan fitur berangka kecil (seperti usia)."
    },
    "normalisasi": {
        term: "Normalisasi (Min-Max Scaling)",
        category: "Pra-pemrosesan Data",
        desc: "Mengubah skala angka data menjadi rentang pasti antara 0 sampai 1 berdasarkan nilai minimum dan maksimum dari kolom tersebut."
    },
    "standardisasi": {
        term: "Standardisasi (Z-Score)",
        category: "Pra-pemrosesan Data",
        desc: "Menggeser sebaran data agar berpusat pada nilai rata-rata 0 dengan simpangan baku (standar deviasi) bernilai 1."
    },
    "z-score": {
        term: "Z-Score",
        category: "Statistika",
        desc: "Angka yang menunjukkan seberapa jauh suatu nilai berada di atas atau di bawah nilai rata-rata kelompoknya dalam satuan standar deviasi."
    },
    "overfitting": {
        term: "Overfitting (Terlalu Menghafal)",
        category: "Kinerja Model",
        desc: "Kondisi saat model terlalu menghafal data latihan sampai detail noise/kebetulan terkecil. Akurasinya tampak 100% pada data latihan, tetapi gagal total saat menguji data baru."
    },
    "overfit": {
        term: "Overfit",
        category: "Kinerja Model",
        desc: "Kondisi saat model terlalu menghafal data latihan sampai detail noise/kebetulan terkecil. Akurasinya tampak 100% pada data latihan, tetapi gagal total saat menguji data baru."
    },
    "underfitting": {
        term: "Underfitting (Kurang Belajar)",
        category: "Kinerja Model",
        desc: "Kondisi saat model terlalu sederhana sehingga tidak mampu menangkap pola penting pada data, mengakibatkan akurasi yang buruk baik di data latih maupun data uji."
    },
    "underfit": {
        term: "Underfit",
        category: "Kinerja Model",
        desc: "Kondisi saat model terlalu sederhana sehingga tidak mampu menangkap pola penting pada data, mengakibatkan akurasi yang buruk baik di data latih maupun data uji."
    },
    "gradient descent": {
        term: "Gradient Descent",
        category: "Optimasi",
        desc: "Cara model memperbaiki diri secara otomatis: menuruni lereng grafik kesalahan (error) langkah demi langkah hingga mencapai titik kesalahan paling rendah."
    },
    "learning rate": {
        term: "Learning Rate (Laju Belajar)",
        category: "Hiperparameter",
        desc: "Ukuran panjang langkah perbaikan bobot pada tiap iterasi. Jika terlalu besar model bisa meleset (overshoot), jika terlalu kecil proses belajar menjadi sangat lama."
    },
    "laju pembelajaran": {
        term: "Laju Pembelajaran (Learning Rate)",
        category: "Hiperparameter",
        desc: "Ukuran panjang langkah perbaikan bobot pada tiap iterasi. Jika terlalu besar model bisa meleset (overshoot), jika terlalu kecil proses belajar menjadi sangat lama."
    },
    "cost function": {
        term: "Cost Function (Fungsi Biaya)",
        category: "Optimasi",
        desc: "Rumus matematika yang mengukur seberapa banyak total kesalahan antara tebakan model dengan kenyataan data aslinya di seluruh baris data."
    },
    "fungsi biaya": {
        term: "Fungsi Biaya (Cost Function)",
        category: "Optimasi",
        desc: "Rumus matematika yang mengukur seberapa banyak total kesalahan antara tebakan model dengan kenyataan data aslinya di seluruh baris data."
    },
    "loss function": {
        term: "Loss Function (Fungsi Kerugian)",
        category: "Optimasi",
        desc: "Ukuran kesalahan tebakan model untuk satu baris sampel data tunggal."
    },
    "residual": {
        term: "Residual (Selisih Galat)",
        category: "Regresi",
        desc: "Jarak selisih vertikal antara nilai target sebenarnya di dunia nyata dengan nilai hasil ramalan garis model."
    },
    "ordinary least squares": {
        term: "Ordinary Least Squares (OLS)",
        category: "Regresi Linear",
        desc: "Metode aljabar untuk mencari garis lurus paling pas dengan cara meminimalkan jumlah kuadrat dari seluruh jarak residual titik-titik data ke garis."
    },
    "ols": {
        term: "OLS (Ordinary Least Squares)",
        category: "Regresi Linear",
        desc: "Metode aljabar untuk mencari garis lurus paling pas dengan cara meminimalkan jumlah kuadrat dari seluruh jarak residual titik-titik data ke garis."
    },
    "sigmoid": {
        term: "Fungsi Sigmoid",
        category: "Fungsi Aktivasi",
        desc: "Fungsi berbentuk kurva 'S' halus yang mengubah angka bebas apapun (dari negatif tak hingga sampai positif tak hingga) menjadi angka peluang bernilai 0 sampai 1."
    },
    "log-loss": {
        term: "Log-Loss (Binary Cross-Entropy)",
        category: "Fungsi Biaya Klasifikasi",
        desc: "Rumus penalti kesalahan probabilitas yang memberi hukuman skor luar biasa besar jika model merasa sangat yakin pada tebakan yang ternyata salah."
    },
    "binary cross-entropy": {
        term: "Binary Cross-Entropy",
        category: "Fungsi Biaya Klasifikasi",
        desc: "Rumus penalti kesalahan probabilitas yang memberi hukuman skor luar biasa besar jika model merasa sangat yakin pada tebakan yang ternyata salah."
    },
    "decision boundary": {
        term: "Decision Boundary (Batas Keputusan)",
        category: "Geometri Model",
        desc: "Garis batas atau bidang pemisah di ruang data yang memisahkan satu kelompok kelas dengan kelompok kelas lainnya."
    },
    "batas keputusan": {
        term: "Batas Keputusan (Decision Boundary)",
        category: "Geometri Model",
        desc: "Garis batas atau bidang pemisah di ruang data yang memisahkan satu kelompok kelas dengan kelompok kelas lainnya."
    },
    "gini impurity": {
        term: "Gini Impurity (Ketidakmurnian)",
        category: "Decision Tree",
        desc: "Tingkat campur aduknya data dalam satu kelompok. Nilainya bernilai 0 jika anggotanya sudah 100% murni satu kelas yang sama."
    },
    "entropy": {
        term: "Entropi (Tingkat Ketidakpastian)",
        category: "Teori Informasi",
        desc: "Ukuran kekacauan informasi. Semakin acak dan tidak pasti data, semakin tinggi nilai entropinya."
    },
    "entropi": {
        term: "Entropi (Tingkat Ketidakpastian)",
        category: "Teori Informasi",
        desc: "Ukuran kekacauan informasi. Semakin acak dan tidak pasti data, semakin tinggi nilai entropinya."
    },
    "information gain": {
        term: "Information Gain (Perolehan Informasi)",
        category: "Decision Tree",
        desc: "Banyaknya ketidakpastian yang berhasil berkurang setelah dataset dipotong berdasarkan suatu pertanyaan kondisi fitur."
    },
    "root node": {
        term: "Root Node (Simpul Akar)",
        category: "Decision Tree",
        desc: "Simpul paling atas pada pohon keputusan yang memuat 100% seluruh dataset awal sebelum dilakukan pembagian cabang pertama."
    },
    "simpul akar": {
        term: "Simpul Akar (Root Node)",
        category: "Decision Tree",
        desc: "Simpul paling atas pada pohon keputusan yang memuat 100% seluruh dataset awal sebelum dilakukan pembagian cabang pertama."
    },
    "leaf node": {
        term: "Leaf Node (Simpul Daun)",
        category: "Decision Tree",
        desc: "Ujung cabang pohon yang tidak lagi memiliki anak, tempat disimpannya keputusan tebakan kelas final."
    },
    "simpul daun": {
        term: "Simpul Daun (Leaf Node)",
        category: "Decision Tree",
        desc: "Ujung cabang pohon yang tidak lagi memiliki anak, tempat disimpannya keputusan tebakan kelas final."
    },
    "prior probability": {
        term: "Prior Probability (Peluang Awal)",
        category: "Teorema Bayes",
        desc: "Peluang umum suatu kejadian terjadi di populasi nyata sebelum kita melihat bukti atau gejala pendukung baru apapun."
    },
    "probabilitas prior": {
        term: "Probabilitas Prior (Peluang Awal)",
        category: "Teorema Bayes",
        desc: "Peluang umum suatu kejadian terjadi di populasi nyata sebelum kita melihat bukti atau gejala pendukung baru apapun."
    },
    "likelihood": {
        term: "Likelihood (Kemungkinan Bukti)",
        category: "Teorema Bayes",
        desc: "Seberapa besar kemungkinan gejala atau fitur tertentu muncul jika kondisi yang dicurigai benar-benar terjadi."
    },
    "posterior": {
        term: "Posterior (Peluang Akhir)",
        category: "Teorema Bayes",
        desc: "Peluang akhir yang sudah diperbarui setelah menggabungkan peluang awal (prior) dengan bukti baru yang ditemukan (likelihood)."
    },
    "probabilitas posterior": {
        term: "Probabilitas Posterior",
        category: "Teorema Bayes",
        desc: "Peluang akhir yang sudah diperbarui setelah menggabungkan peluang awal (prior) dengan bukti baru yang ditemukan (likelihood)."
    },
    "k-means": {
        term: "K-Means",
        category: "Unsupervised Learning",
        desc: "Algoritma untuk mengelompokkan data tanpa label ke dalam K kelompok klaster berdasarkan titik pusat terdekat (centroid)."
    },
    "centroid": {
        term: "Centroid (Titik Pusat)",
        category: "Clustering",
        desc: "Titik tengah koordinat rata-rata dari seluruh anggota data yang berada dalam satu kelompok klaster."
    },
    "titik pusat": {
        term: "Titik Pusat (Centroid)",
        category: "Clustering",
        desc: "Titik tengah koordinat rata-rata dari seluruh anggota data yang berada dalam satu kelompok klaster."
    },
    "wcss": {
        term: "WCSS (Within-Cluster Sum of Squares)",
        category: "Clustering",
        desc: "Total kuadrat jarak semua titik data ke titik pusat klasternya. Sering disebut juga sebagai nilai Inertia."
    },
    "inertia": {
        term: "Inertia (Kerapatan Klaster)",
        category: "Clustering",
        desc: "Ukuran seberapa rapat titik-titik data berkumpul di sekitar pusat klasternya. Semakin kecil angkanya, semakin rapat dan rapi kelompok tersebut."
    },
    "elbow method": {
        term: "Elbow Method (Metode Siku)",
        category: "Clustering",
        desc: "Grafik berbentuk siku tangan untuk menentukan jumlah klaster K paling ideal dengan melihat titik tekukan grafik penurunan inertia."
    },
    "hierarchical clustering": {
        term: "Hierarchical Clustering",
        category: "Clustering",
        desc: "Metode klastering berjenjang yang menyusun hubungan antar data membentuk silsilah pohon keluarga (dendrogram)."
    },
    "klastering hierarki": {
        term: "Klastering Hierarki",
        category: "Clustering",
        desc: "Metode klastering berjenjang yang menyusun hubungan antar data membentuk silsilah pohon keluarga (dendrogram)."
    },
    "agglomerative": {
        term: "Agglomerative (Bottom-Up)",
        category: "Clustering",
        desc: "Pendekatan klastering dari bawah: setiap titik awalnya dianggap sebagai kelompok sendiri, lalu digabung bertahap dua per dua hingga menyatu."
    },
    "complete linkage": {
        term: "Complete Linkage",
        category: "Hierarchical Clustering",
        desc: "Aturan jarak antar dua klaster yang diukur berdasarkan jarak antara dua anggota yang paling berjauhan di antara kedua klaster tersebut."
    },
    "dendrogram": {
        term: "Dendrogram (Bagan Silsilah Pohon)",
        category: "Visualisasi Klastering",
        desc: "Diagram berbentuk cabang-cabang pohon yang merekam seluruh sejarah penggabungan klaster dari bawah hingga puncak beserta jarak pertemuannya."
    },
    "confusion matrix": {
        term: "Confusion Matrix",
        category: "Evaluasi Klasifikasi",
        desc: "Tabel perbandingan antara tebakan model dengan data aslinya untuk membedah di mana model tepat dan di bagian mana tebakan model keliru."
    },
    "true positive": {
        term: "True Positive (TP / Benar Positif)",
        category: "Evaluasi Klasifikasi",
        desc: "Kondisi di mana data aslinya Positif, dan tebakan model tepat Positif (misal: orang sakit terdeteksi sakit)."
    },
    "true negative": {
        term: "True Negative (TN / Benar Negatif)",
        category: "Evaluasi Klasifikasi",
        desc: "Kondisi di mana data aslinya Negatif, dan tebakan model tepat Negatif (misal: orang sehat terdeteksi sehat)."
    },
    "false positive": {
        term: "False Positive (FP / Alarm Palsu)",
        category: "Evaluasi Klasifikasi",
        desc: "Kondisi di mana data aslinya Negatif, tetapi model keliru menebak Positif (misal: orang sehat divonis sakit)."
    },
    "false negative": {
        term: "False Negative (FN / Luput Deteksi)",
        category: "Evaluasi Klasifikasi",
        desc: "Kondisi di mana data aslinya Positif, tetapi model keliru menebak Negatif (misal: orang sakit divonis sehat dan luput pengobatan)."
    },
    "precision": {
        term: "Precision (Presisi)",
        category: "Metrik Evaluasi",
        desc: "Dari seluruh data yang ditebak Positif oleh model, berapa persen yang benar-benar terbukti Positif di dunia nyata?"
    },
    "presisi": {
        term: "Presisi (Precision)",
        category: "Metrik Evaluasi",
        desc: "Dari seluruh data yang ditebak Positif oleh model, berapa persen yang benar-benar terbukti Positif di dunia nyata?"
    },
    "recall": {
        term: "Recall (Sensitivitas)",
        category: "Metrik Evaluasi",
        desc: "Dari seluruh data yang aslinya memang Positif di lapangan, berapa persen yang berhasil ditemukan oleh model tanpa terlewat?"
    },
    "sensitivitas": {
        term: "Sensitivitas (Recall)",
        category: "Metrik Evaluasi",
        desc: "Dari seluruh data yang aslinya memang Positif di lapangan, berapa persen yang berhasil ditemukan oleh model tanpa terlewat?"
    },
    "f1-score": {
        term: "F1-Score",
        category: "Metrik Evaluasi",
        desc: "Nilai rata-rata harmonik antara Presisi dan Recall. Sangat adil digunakan jika data memiliki proporsi kelas yang tidak seimbang."
    },
    "r2 score": {
        term: "R² Score (Koefisien Determinasi)",
        category: "Metrik Regresi",
        desc: "Skor persentase (0 sampai 1) yang mengukur seberapa mampu garis regresi menerangkan variasi perubahan pada data aslinya."
    },
    "koefisien determinasi": {
        term: "Koefisien Determinasi (R²)",
        category: "Metrik Regresi",
        desc: "Skor persentase (0 sampai 1) yang mengukur seberapa mampu garis regresi menerangkan variasi perubahan pada data aslinya."
    },
    "mae": {
        term: "MAE (Mean Absolute Error)",
        category: "Metrik Regresi",
        desc: "Rata-rata jarak selisih mutlak antara tebakan model dengan data aslinya (bersifat ramah dan tidak terlalu dipengaruhi data pencilan)."
    },
    "mse": {
        term: "MSE (Mean Squared Error)",
        category: "Metrik Regresi",
        desc: "Rata-rata kuadrat selisih kesalahan. Karena dikuadratkan, nilai ini memberikan penalti yang berlipat ganda pada kesalahan tebakan yang besar."
    },
    "rmse": {
        term: "RMSE (Root Mean Squared Error)",
        category: "Metrik Regresi",
        desc: "Akar kuadrat dari nilai MSE, bertujuan agar satuan angka kesalahannya kembali sama persis dengan satuan asli data target."
    },
    "silhouette score": {
        term: "Silhouette Score (Skor Siluet)",
        category: "Validasi Klastering",
        desc: "Skor validasi klastering (-1 sampai +1) yang menilai seberapa padat suatu klaster dan seberapa jauh jaraknya dari klaster tetangga."
    },
    "ground truth": {
        term: "Ground Truth (Label Asli)",
        category: "Konsep Dasar",
        desc: "Kenyataan sebenarnya atau label data asli di lapangan yang menjadi patokan kunci jawaban mutlak saat menguji kinerja model."
    },
    "hyperparameter": {
        term: "Hyperparameter",
        category: "Konfigurasi Model",
        desc: "Setelan parameter yang harus ditentukan secara manual oleh data scientist sebelum proses pelatihan dimulai (seperti nilai K pada KNN)."
    },
    "hiperparameter": {
        term: "Hiperparameter",
        category: "Konfigurasi Model",
        desc: "Setelan parameter yang harus ditentukan secara manual oleh data scientist sebelum proses pelatihan dimulai (seperti nilai K pada KNN)."
    },
    "parameter": {
        term: "Parameter Model",
        category: "Konfigurasi Model",
        desc: "Nilai variabel internal yang dipelajari dan disesuaikan sendiri oleh komputer secara otomatis dari data (seperti bobot w dan bias b)."
    },
    "epoch": {
        term: "Epoch",
        category: "Siklus Pelatihan",
        desc: "Satu siklus putaran penuh saat model telah selesai membaca dan mempelajari seluruh baris data latih dari awal sampai akhir."
    },
    "vektorisasi": {
        term: "Vektorisasi NumPy",
        category: "Komputasi Efisien",
        desc: "Teknik komputasi matematika pada seluruh larik/matriks sekaligus di level memori C, jauh lebih cepat daripada looping 'for' di Python."
    },
    "broadcasting": {
        term: "Broadcasting NumPy",
        category: "Operasi Matriks",
        desc: "Kemampuan otomatis NumPy menyesuaikan ukuran matriks yang berbeda saat dijumlahkan atau dikalikan tanpa perlu menduplikasi data."
    },
    "bias": {
        term: "Bias Model",
        category: "Parameter / Galat",
        desc: "Konstanta geser pada rumus garis ($y = wx + b$), atau asumsi kaku model yang membuat model buta terhadap variasi data (underfitting)."
    },
    "bobot": {
        term: "Bobot (Weight / w)",
        category: "Parameter Model",
        desc: "Nilai pengali matematis yang menentukan seberapa besar pengaruh suatu fitur terhadap keputusan akhir model."
    },
    "outlier": {
        term: "Outlier (Pencilan)",
        category: "Kualitas Data",
        desc: "Titik data yang nilainya ekstrem dan jauh menyimpang dari kumpulan mayoritas data lainnya (misal akibat salah ukur)."
    },
    "imbalanced data": {
        term: "Imbalanced Data (Data Timpang)",
        category: "Kualitas Data",
        desc: "Kondisi di mana perbandingan jumlah data antar-kelas sangat timpang (misal 99% data sehat vs 1% data sakit)."
    },
    "supervised learning": {
        term: "Supervised Learning (Pembelajaran Terbimbing)",
        category: "Paradigma AI",
        desc: "Pembelajaran mesin di mana data latih sudah dilengkapi dengan jawaban atau label kelas yang benar sebagai bahan acuan belajar."
    },
    "unsupervised learning": {
        term: "Unsupervised Learning (Pembelajaran Mandiri)",
        category: "Paradigma AI",
        desc: "Pembelajaran mesin tanpa kunci jawaban label, di mana model mencari sendiri kelompok atau pola tersembunyi dari data."
    }
};
