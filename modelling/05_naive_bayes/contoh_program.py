"""
Implementasi Gaussian Naive Bayes Mandiri (Pure Python + NumPy)
Menggunakan Log-Likelihood untuk kestabilan numerik.
"""

import numpy as np

class GaussianNaiveBayesManual:
    def __init__(self, var_smoothing=1e-9):
        """
        - var_smoothing: nilai epsilon kecil yang ditambahkan ke variansi
          untuk mencegah pembagian dengan nol saat fitur memiliki variansi 0.
        """
        self.var_smoothing = var_smoothing
        self.classes = None
        self.mean = {}
        self.var = {}
        self.priors = {}

    def fit(self, X, y):
        """Menghitung mean, variansi, dan prior untuk setiap kelas"""
        X = np.array(X, dtype=float)
        y = np.array(y)
        n_samples, n_features = X.shape

        self.classes = np.unique(y)

        for c in self.classes:
            X_c = X[y == c]
            # 1. Prior P(Y = c)
            self.priors[c] = float(len(X_c) / n_samples)
            # 2. Rata-rata mu_c
            self.mean[c] = np.mean(X_c, axis=0)
            # 3. Variansi sigma_c^2 (+ smoothing)
            self.var[c] = np.var(X_c, axis=0) + self.var_smoothing

        return self

    def _calculate_log_likelihood(self, class_val, x):
        """
        Menghitung log(P(x | Y = c)) menggunakan formula distribusi normal Gauss:
        log P(x) = -0.5 * log(2*pi*var) - 0.5 * ((x - mean)^2 / var)
        """
        mean = self.mean[class_val]
        var = self.var[class_val]

        log_constant = -0.5 * np.log(2.0 * np.pi * var)
        log_exp = -0.5 * ((x - mean) ** 2) / var

        # Jumlahkan log peluang dari seluruh fitur (karena asumsi independen)
        return np.sum(log_constant + log_exp)

    def _predict_single(self, x):
        """Menghitung Posterior untuk semua kelas dan mengambil nilai tertinggi"""
        posteriors = []

        for c in self.classes:
            # log(Posterior) = log(Prior) + sum(log(Likelihood))
            log_prior = np.log(self.priors[c])
            log_likelihood = self._calculate_log_likelihood(c, x)
            posterior = log_prior + log_likelihood
            posteriors.append((posterior, c))

        # Pilih kelas dengan log-posterior terbesar (argmax)
        posteriors.sort(key=lambda item: item[0], reverse=True)
        return posteriors[0][1]

    def predict(self, X):
        """Memprediksi label seluruh data di X"""
        X = np.array(X, dtype=float)
        return np.array([self._predict_single(x) for x in X])

    def score(self, X, y):
        """Menghitung akurasi model"""
        y_pred = self.predict(X)
        return float(np.mean(y_pred == y))


# ==============================================================================
# PENGUJIAN MANDIRI
# ==============================================================================
if __name__ == "__main__":
    print("=== PENGUJIAN MODEL GAUSSIAN NAIVE BAYES MANDIRI ===")
    
    # Fitur: [Suhu Badan (°C), Detak Jantung (bpm)]
    # Label: 0 = Sehat, 1 = Demam Infeksi
    X_train = np.array([
        [36.5, 70],
        [36.8, 75],
        [36.6, 72],
        [38.5, 110],
        [39.0, 115],
        [38.2, 105]
    ])
    y_train = np.array([0, 0, 0, 1, 1, 1])

    gnb = GaussianNaiveBayesManual()
    gnb.fit(X_train, y_train)

    print("Kelas Terdeteksi:", gnb.classes)
    for c in gnb.classes:
        print(f"Kelas {c}: Prior = {gnb.priors[c]:.2f}, Rata-rata = {gnb.mean[c]}")

    # Uji Pasien Baru
    pasien_baru = np.array([
        [36.7, 74], # Harusnya Sehat (0)
        [38.8, 112] # Harusnya Sakit (1)
    ])

    hasil = gnb.predict(pasien_baru)
    print("\nHasil Prediksi Pasien Baru:")
    print("Pasien 1 (Suhu 36.7, Detak 74)  ->", "SEHAT" if hasil[0] == 0 else "SAKIT")
    print("Pasien 2 (Suhu 38.8, Detak 112) ->", "SEHAT" if hasil[1] == 0 else "SAKIT")
