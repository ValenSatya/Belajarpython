"""
Implementasi Regresi Logistik Mandiri (Pure Python + NumPy)
Mendukung prediksi probabilitas dan label biner.
"""

import numpy as np

class LogisticRegressionManual:
    def __init__(self, learning_rate=0.1, epochs=1000, threshold=0.5):
        """
        - learning_rate: laju pembelajaran gradient descent
        - epochs: jumlah perulangan training
        - threshold: ambang batas peluang untuk memisahkan kelas 0 dan 1
        """
        self.learning_rate = learning_rate
        self.epochs = epochs
        self.threshold = threshold
        self.weights = None
        self.bias = None
        self.cost_history = []

    def _sigmoid(self, z):
        """Fungsi aktivasi Sigmoid: 1 / (1 + e^-z) dengan proteksi overflow"""
        # Batasi rentang z antara -250 dan 250 agar exp tidak overflow
        z = np.clip(z, -250.0, 250.0)
        return 1.0 / (1.0 + np.exp(-z))

    def fit(self, X, y):
        """Proses optimasi parameter w dan b menggunakan Log Loss"""
        X = np.array(X, dtype=float)
        y = np.array(y, dtype=float).reshape(-1, 1)

        n_samples, n_features = X.shape

        self.weights = np.zeros((n_features, 1))
        self.bias = 0.0
        self.cost_history = []

        for epoch in range(self.epochs):
            # 1. Forward Pass: Linear Combination -> Sigmoid
            linear_output = np.dot(X, self.weights) + self.bias
            y_pred_proba = self._sigmoid(linear_output)

            # 2. Hitung Binary Cross Entropy Loss
            eps = 1e-15
            proba_clipped = np.clip(y_pred_proba, eps, 1.0 - eps)
            loss = -np.mean(y * np.log(proba_clipped) + (1.0 - y) * np.log(1.0 - proba_clipped))
            self.cost_history.append(float(loss))

            # 3. Hitung Gradient
            error = y_pred_proba - y
            dw = (1.0 / n_samples) * np.dot(X.T, error)
            db = (1.0 / n_samples) * np.sum(error)

            # 4. Update Parameter
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db

        return self

    def predict_proba(self, X):
        """Mengembalikan nilai peluang kejadian (0.0 sampai 1.0)"""
        X = np.array(X, dtype=float)
        linear_output = np.dot(X, self.weights) + self.bias
        return self._sigmoid(linear_output).flatten()

    def predict(self, X):
        """Mengembalikan label prediksi biner (0 atau 1) sesuai ambang batas threshold"""
        probabilities = self.predict_proba(X)
        return (probabilities >= self.threshold).astype(int)

    def score(self, X, y):
        """Menghitung akurasi prediksi model"""
        y_pred = self.predict(X)
        return float(np.mean(y_pred == y))


# ==============================================================================
# PENGUJIAN MANDIRI
# ==============================================================================
if __name__ == "__main__":
    print("=== PENGUJIAN MODEL REGRESI LOGISTIK MANDIRI ===")
    
    # Data Jam Belajar vs Status Kelulusan (0 = Gagal, 1 = Lulus)
    X_train = np.array([[1.0], [2.0], [2.5], [4.0], [5.0], [6.0]])
    y_train = np.array([0, 0, 0, 1, 1, 1])

    model = LogisticRegressionManual(learning_rate=0.5, epochs=1000)
    model.fit(X_train, y_train)

    print(f"Loss Awal: {model.cost_history[0]:.4f} -> Loss Akhir: {model.cost_history[-1]:.4f}")

    # Uji Coba Prediksi Siswa yang belajar 1.5 jam vs 4.5 jam
    X_uji = np.array([[1.5], [3.2], [4.5]])
    peluang = model.predict_proba(X_uji)
    keputusan = model.predict(X_uji)

    print("\nHasil Uji Siswa Baru:")
    for jam, p, k in zip(X_uji.flatten(), peluang, keputusan):
        status = "LULUS" if k == 1 else "GAGAL"
        print(f"Belajar {jam:.1f} jam -> Peluang Lulus: {p*100:5.1f}% -> Status: {status}")
