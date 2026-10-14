"""
MODUL 6: REGRESI LOGISTIK (LOGISTIC REGRESSION) (LKS AI)
"""

MODULE_DATA = {
    "id": "mod-6",
    "title": "Bab 6: Regresi Logistik (Logistic Regression)",
    "icon": "06",
    "lessons": [
        {
            "id": "6-1",
            "title": "6.1 Batasan Fatal Regresi Linier untuk Kasus Klasifikasi",
            "readingTime": "10 menit",
            "content": r"""
### 1. Mengapa Kita Tidak Boleh Memakai Regresi Linier untuk Klasifikasi?

#### Analogi Saklar Dimmer Lampu vs Saklar Biasa
Bayangkan saklar lampu di dinding rumah Anda. Saklar biasa hanya memiliki dua posisi: MATI ($0$) atau HIDUP ($1$). Ketika kita ingin memprediksi kemungkinan suatu peristiwa (misalnya: *"Apakah pasien ini menderita diabetes atau sehat?"*), jawaban kaku Ya/Tidak seringkali kurang memuaskan. Dokter ingin mengetahui **derajat keyakinan probabilitas**: apakah peluang sakitnya $15\%$ (hampir pasti sehat), $51\%$ (sedikit ragu-ragu di ambang batas), atau $99\%$ (sangat gawat darurat)?

Kita membutuhkan kurva pengatur seperti saklar putar *dimmer* lampu yang cahayanya bisa diatur halus mulai dari padam total ($0.0$) hingga benderang terang ($1.0$).

Banyak pemula tergoda berpikir: *"Mengapa kita tidak memakai rumus Regresi Linier biasa $\hat{y} = w \cdot x + b$, lalu kita buat aturan: jika hasil tebakan $\ge 0.5$ tebak kelas 1, jika $< 0.5$ tebak kelas 0?"*

Pendekatan tersebut memiliki dua kelemahan matematis yang sangat fatal:

---

#### Kelemahan 1: Rentang Prediksi Tanpa Batas (Melanggar Aksioma Probabilitas)
Fungsi garis lurus regresi linier membentang bebas tanpa batas dari minus tak hingga hingga positif tak hingga ($-\infty < \hat{y} < +\infty$):
- Untuk pasien dengan kadar gula darah sangat tinggi, regresi linier bisa menghasilkan angka $\hat{y} = 2.8$.
- Untuk pasien dengan kadar gula darah sangat rendah, regresi linier bisa memprediksi $\hat{y} = -0.6$.

Menurut aksioma dasar teori probabilitas Kolmogorov, suatu nilai peluang wajib terkurung rapat di dalam rentang tertutup $[0.0, 1.0]$. Angka tebakan seperti $-0.6$ atau $2.8$ tidak memiliki arti matematis sama sekali sebagai ukuran keyakinan (*nonsense probability*).

---

#### Kelemahan 2: Sensitivitas Ekstrem terhadap Pencilan (Outlier)
Bayangkan ada satu orang pasien yang kadar gula darahnya luar biasa tinggi ($400\,\text{mg/dL}$), dan dokter sudah $100\%$ yakin orang tersebut positif diabetes ($y=1$).

Jika kita menggunakan regresi linier, titik ekstrem di ujung kanan atas ini akan menarik garis lurus miring ke atas secara drastis (*leverage effect*). Akibatnya, titik perpotongan garis dengan ambang batas $0.5$ akan bergeser jauh sekali ke kanan. Dampak fatalnya: banyak pasien positif diabetes lainnya yang memiliki gula darah sedang (misal $180\,\text{mg/dL}$) tiba-tiba jatuh di bawah ambang batas $0.5$ dan salah divonis sehat!

Oleh karena itu, kita membutuhkan kurva matematis khusus yang mampu **menjepit garis bilangan riil tak hingga menjadi kurva berbentuk S mulus** yang dijamin tidak akan pernah melampaui batas $0.0$ dan $1.0$.
            """
        },
        {
            "id": "6-2",
            "title": "6.2 Fungsi Sigmoid & Penurunan Loss Function Log-Loss",
            "readingTime": "14 menit",
            "content": r"""
### 1. Fungsi Aktivasi Sigmoid (Logistic Function)

Regresi Logistik menyelesaikan dilema klasifikasi dengan melewatkan kombinasi linier $z = \mathbf{x}^T \mathbf{w} + b$ ke dalam corong pelengkung kurva yang disebut **Fungsi Aktivasi Sigmoid**:

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

#### Bedah Simbol Rumus Sigmoid:
1. **$z = \mathbf{x}^T \mathbf{w} + b$ (Logits):** Nilai kombinasi linier fitur dan bobot. Angka riil bebas yang bisa bernilai negatif besar, nol, atau positif besar.
2. **$e$:** Bilangan konstan Euler ($\approx 2.71828$).
3. **$e^{-z}$:** Komponen peluruh eksponensial:
   - Jika nilai $z$ sangat positif ($z \to +\infty$): Nilai $e^{-z} \to 0$, sehingga $\sigma(z) \to \frac{1}{1 + 0} = \mathbf{1.0}$.
   - Jika nilai $z = 0$: Nilai $e^{0} = 1$, sehingga $\sigma(z) = \frac{1}{1 + 1} = \mathbf{0.5}$ (Garis Batas Keputusan / *Decision Boundary*).
   - Jika nilai $z$ sangat negatif ($z \to -\infty$): Nilai $e^{-z} \to +\infty$, sehingga $\sigma(z) \to \frac{1}{1 + \infty} = \mathbf{0.0}$.
4. **$\sigma(z)$ (Sigma):** Nilai probabilitas kontinu dalam rentang terbuka $(0.0, 1.0)$. Nilai ini secara sah melambangkan keyakinan peluang bahwa sampel tersebut merupakan anggota kelas positif:

$$\hat{y} = P(y = 1 \mid \mathbf{x}) = \sigma(\mathbf{x}^T \mathbf{w} + b)$$

---

### 2. Mengapa MSE Gagal Total pada Regresi Logistik?

Jika kita memaksakan fungsi non-linier Sigmoid $\sigma(z)$ ke dalam fungsi biaya Mean Squared Error (MSE):

$$J_{\text{MSE}}(\mathbf{w}) = \frac{1}{N} \sum_{i=1}^N (\sigma(\mathbf{x}_i^T \mathbf{w} + b) - y_i)^2$$

Fungsi biaya yang tercipta akan memiliki permukaan bergelombang dengan banyak sekali lembah jebakan (*local minima*) dan daerah mendatar (*plateau*). Kondisi ini disebut **Non-Convex (Tidak Cembung)**. Algoritma Gradient Descent akan dengan mudah terjebak di lembah semu lokal dan gagal menemukan kombinasi bobot terbaik di dasar lembah global.

---

### 3. Solusi Elegan: Binary Cross-Entropy Loss (Log-Loss)

#### Analogi Denda Sumpah Palsu di Pengadilan
Bayangkan seorang saksi di pengadilan yang bersumpah di hadapan hakim:
- Jika terdakwa terbukti **BERSALAH ($y = 1$)**, dan saksi dengan jujur menyatakan: *"Saya yakin 99% dia bersalah"* ($\hat{y} = 0.99$), hakim memberinya apresiasi penuh (denda kerugian $\approx 0$).
- Namun, jika saksi dengan angkuh bersumpah: *"Saya berani bertaruh 99.9% dia TIDAK BERSALAH"* ($\hat{y} = 0.001$), padahal jelas-jelas terdakwa bersalah, hakim akan menjatuhkan **denda hukuman sumpah palsu yang amat sangat berat mendekati tak terhingga**!

Fungsi kerugian **Binary Cross-Entropy (Log-Loss)** dirancang khusus untuk memberikan penalti hukuman eksponensial bagi tebakan yang terlalu percaya diri padahal salah fatal:

$$J(\mathbf{w}, b) = -\frac{1}{N} \sum_{i=1}^N \left[ y_i \ln(\hat{y}_i) + (1 - y_i) \ln(1 - \hat{y}_i) \right]$$

#### Bedah Simbol Rumus Log-Loss:
- **$y_i \in \{0, 1\}$:** Label kelas biner fakta sebenarnya di lapangan.
- **$\hat{y}_i = \sigma(z_i)$:** Taksiran peluang probabilitas model bahwa sampel tergolong kelas 1.
- **Suku Pertama $y_i \ln(\hat{y}_i)$:**
  Jika fakta $y_i = 1$, maka $(1 - y_i) = 0$, sehingga suku kedua mati. Nilai kerugian menjadi $-\ln(\hat{y}_i)$. Jika model menebak $\hat{y}_i = 1.0 \implies -\ln(1.0) = 0$. Jika model salah menebak $\hat{y}_i \to 0 \implies -\ln(0) \to +\infty$.
- **Suku Kedua $(1 - y_i) \ln(1 - \hat{y}_i)$:**
  Jika fakta $y_i = 0$, maka $y_i = 0$, sehingga suku pertama mati. Nilai kerugian menjadi $-\ln(1 - \hat{y}_i)$. Jika model menebak $\hat{y}_i = 0.0 \implies -\ln(1.0) = 0$. Jika model salah menebak $\hat{y}_i \to 1 \implies -\ln(0) \to +\infty$.
- **Tanda Minus di Depan $-\frac{1}{N}$:** Karena logaritma natural dari pecahan desimal ($0 < p < 1$) selalu menghasilkan angka negatif (misal $\ln(0.5) = -0.693$), tanda minus membalik nilai tersebut menjadi angka kerugian positif yang mudah diminimalkan ke arah nol.

Fungsi Log-Loss ini terbukti secara matematis bersifat **Convex (Cembung Murni berbentuk mangkuk)**, sehingga memiliki tepat satu titik terendah mutlak (*global minimum*) yang dijamin dapat dicapai oleh Gradient Descent!

---

### 4. Keajaiban Kalkulus: Turunan Parsial Gradien

Meskipun fungsi Log-Loss dan Sigmoid terlihat rumit, saat kita menurunkan turunan parsialnya menggunakan aturan rantai (*Chain Rule*):
$$\frac{\partial \sigma(z)}{\partial z} = \sigma(z)(1 - \sigma(z))$$

Turunan parsial fungsi biaya terhadap parameter menghasilkan bentuk yang luar biasa anggun dan identik dengan Regresi Linier:

$$\frac{\partial J}{\partial \mathbf{w}} = \frac{1}{N} X^T (\hat{\mathbf{y}} - \mathbf{y})$$
$$\frac{\partial J}{\partial b} = \frac{1}{N} \sum_{i=1}^N (\hat{y}_i - y_i)$$

*(Perbedaan mendasarnya: pada Regresi Linier $\hat{\mathbf{y}} = X\mathbf{w}+b$, sedangkan pada Regresi Logistik $\hat{\mathbf{y}} = \sigma(X\mathbf{w}+b)$)*.
            """
        },
        {
            "id": "6-3",
            "title": "6.3 Praktikum Koding: Class LogisticRegression Manual",
            "readingTime": "11 menit",
            "content": r"""
Berikut adalah implementasi lengkap algoritma Regresi Logistik mandiri berbasis fungsi Sigmoid, penstabil numerik clipping, dan optimasi gradien murni NumPy.

Perhatikan kotak **Bedah Sintaks & Alur Perhitungan Matematis** di bawah untuk memahami pencegahan overflow nilai eksponensial.
            """,
            "codePath": "modelling/03_regresi_logistik/contoh_program.py",
            "syntaxBreakdown": [
                {
                    "syntax": "z = np.clip(z, -250.0, 250.0); return 1.0 / (1.0 + np.exp(-z))",
                    "explanation": "Pertahanan numerik krusial: Jika z < -709, np.exp(-z) akan menghasilkan floating point overflow (Infinity). Fungsi np.clip mengunci rentang z pada interval [-250, 250], menjamin kestabilan komputasi kurva Sigmoid tanpa merusak presisi probabilitas."
                },
                {
                    "syntax": "linear_model = np.dot(X, self.weights) + self.bias",
                    "explanation": "Menghitung nilai kombinasi linier z = Xw + b untuk seluruh sampel observasi menggunakan perkalian dot product matriks berdimensi (N, m) x (m,)."
                },
                {
                    "syntax": "y_pred_prob = self._sigmoid(linear_model)",
                    "explanation": "Mentransformasikan nilai linier ke dalam probabilitas kontinu interval (0, 1) melalui fungsi aktivasi Sigmoid."
                },
                {
                    "syntax": "dw = (1.0 / n_samples) * np.dot(X.T, (y_pred_prob - y))",
                    "explanation": "Menghitung gradien turunan parsial bobot Binary Cross-Entropy: perkalian transpos matriks fitur X.T dengan vektor selisih probabilitas galat (p - y)."
                },
                {
                    "syntax": "return (y_prob >= threshold).astype(int)",
                    "explanation": "Mengonversi probabilitas kontinu menjadi keputusan biner kelas 0 atau 1 berdasarkan ambang batas keputusan yang ditentukan (default 0.5)."
                }
            ]
        },
        {
            "id": "6-4",
            "title": "6.4 Studi Kasus: Deteksi Diabetes Pasien (Kaggle)",
            "readingTime": "10 menit",
            "content": r"""
### 1. Karakteristik Dataset Pima Indians Diabetes

Dataset ini mencakup rekam medis 768 wanita keturunan suku Pima untuk mendeteksi apakah pasien terdiagnosis mengidap penyakit Diabetes Mellitus:
- Fitur klinis: Jumlah Kehamilan, Kadar Glukosa, Tekanan Darah Diastolik, Ketebalan Kulit Trisep, Insulin Serum, Indeks Massa Tubuh (BMI), Riwayat Silsilah Diabetes (*Pedigree*), dan Usia.
- Target: $0$ = Sehat, $1$ = Positif Diabetes.

---

### 2. Eksperimen Threshold Tuning untuk Kepentingan Medis

Pada bidang medis, kehilangan pasien diabetes (*False Negative*) jauh lebih berbahaya daripada salah memperingatkan pasien sehat (*False Positive*). 

Jalankan script di bawah ini untuk melihat bagaimana menurunkan ambang batas keputusan dari $0.5$ menjadi $0.35$ dapat meningkatkan daya tangkap pasien sakit (**Recall melonjak drastis**) secara signifikan demi keselamatan pasien.
            """,
            "codePath": "modelling/03_regresi_logistik/studi_kasus.py",
            "syntaxBreakdown": [
                {
                    "syntax": "X, y, feature_names = load_diabetes()",
                    "explanation": "Memuat dataset benchmark klinis Pima Indians Diabetes (768 pasien, 8 fitur medis) dari file datasets/diabetes.csv."
                },
                {
                    "syntax": "model = LogisticRegressionManual(learning_rate=0.1, n_epochs=1500)",
                    "explanation": "Menginisialisasi model Regresi Logistik dengan 1.500 epoch pelatihan gradient descent."
                },
                {
                    "syntax": "y_pred_custom = model.predict(X_test, threshold=0.35)",
                    "explanation": "Melakukan penyesuaian ambang batas (threshold tuning) ke 0.35 guna memaksimalkan sensitivitas deteksi terhadap pasien positif sakit."
                }
            ]
        }
    ]
}
