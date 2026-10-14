"""
Implementasi Regresi Linier Mandiri (Pure Python + NumPy)
Menggunakan algoritma optimasi Gradient Descent.
"""

import numpy as np

class LinearRegressionManual:
    def __init__(self, learning_rate=0.01, epochs=1000):
        """
        - learning_rate (alpha): besar langkah saat menuruni lereng error
        - epochs: berapa kali model melihat seluruh data latih
        """
        self.learning_rate = learning_rate
        self.epochs = epochs
        self.weights = None
        self.bias = None
        self.cost_history = []

    def fit(self, X, y):
        """Proses belajar mencari weights dan bias terbaik"""
        X = np.array(X, dtype=float)
        y = np.array(y, dtype=float).reshape(-1, 1)
        
        n_samples, n_features = X.shape

        # 1. Inisialisasi bobot dan bias dengan nol
        self.weights = np.zeros((n_features, 1))
        self.bias = 0.0
        self.cost_history = []

        # 2. Perulangan Gradient Descent
        for epoch in range(self.epochs):
            # A. Prediksi (Forward Pass)
            y_pred = np.dot(X, self.weights) + self.bias

            # B. Hitung Selisih Kesalahan
            error = y_pred - y

            # C. Hitung Biaya (MSE)
            cost = float(np.mean(error ** 2))
            self.cost_history.append(cost)

            # D. Hitung Turunan / Gradient (Backward Pass)
            dw = (2.0 / n_samples) * np.dot(X.T, error)
            db = (2.0 / n_samples) * np.sum(error)

            # E. Perbarui Parameter
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db

        return self

    def predict(self, X):
        """Memprediksi nilai angka target baru"""
        X = np.array(X, dtype=float)
        y_pred = np.dot(X, self.weights) + self.bias
        return y_pred.flatten()


# ==============================================================================
# PENGUJIAN MANDIRI
# ==============================================================================
if __name__ == "__main__":
    print("=== PENGUJIAN MODEL REGRESI LINIER MANDIRI ===")
    
    # Data Latih Sederhana: y = 3 * x + 5
    X_train = np.array([[1.0], [2.0], [3.0], [4.0], [5.0]])
    y_train = np.array([8.0, 11.0, 14.0, 17.0, 20.0])

    model = LinearRegressionManual(learning_rate=0.05, epochs=1000)
    model.fit(X_train, y_train)

    print("Hasil Pembelajaran Parameter:")
    print(f"Target Sebenarnya : w = 3.0, b = 5.0")
    print(f"Hasil Model AI    : w = {model.weights[0][0]:.4f}, b = {model.bias:.4f}")
    print(f"Loss Awal: {model.cost_history[0]:.4f} -> Loss Akhir: {model.cost_history[-1]:.6f}")

    # Uji coba prediksi
    X_uji = np.array([[6.0], [10.0]])
    pred = model.predict(X_uji)
    print("\nPrediksi nilai baru:")
    print(f"x = 6.0  -> Prediksi: {pred[0]:.2f} (Harusnya 23.0)")
    print(f"x = 10.0 -> Prediksi: {pred[1]:.2f} (Harusnya 35.0)")
