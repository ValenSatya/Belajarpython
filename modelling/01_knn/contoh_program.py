"""
Implementasi K-Nearest Neighbors (KNN) Mandiri (Pure Python + NumPy)
Didesain modular dengan antarmuka .fit() dan .predict()
"""

from collections import Counter
import numpy as np

class KNNManual:
    def __init__(self, k=3, metric='euclidean'):
        """
        Inisialisasi model KNN.
        - k : jumlah tetangga terdekat (disarankan ganjil)
        - metric : 'euclidean' atau 'manhattan'
        """
        self.k = k
        self.metric = metric
        self.X_train = None
        self.y_train = None

    def fit(self, X, y):
        """Menyimpan data latih ke dalam memori model"""
        self.X_train = np.array(X, dtype=float)
        self.y_train = np.array(y)
        return self

    def predict(self, X):
        """Memprediksi label untuk seluruh sampel di X"""
        X = np.array(X, dtype=float)
        return np.array([self._predict_single(x) for x in X])

    def _predict_single(self, x):
        """Logika prediksi untuk 1 baris sampel data"""
        # 1. Hitung jarak titik x ke seluruh X_train
        if self.metric == 'euclidean':
            distances = np.sqrt(np.sum((self.X_train - x) ** 2, axis=1))
        elif self.metric == 'manhattan':
            distances = np.sum(np.abs(self.X_train - x), axis=1)
        else:
            raise ValueError(f"Metrik {self.metric} tidak didukung!")

        # 2. Ambil k indeks dengan jarak terpendek
        k_indices = np.argsort(distances)[:self.k]

        # 3. Ambil label dari k tetangga tersebut
        k_nearest_labels = self.y_train[k_indices]

        # 4. Voting suara terbanyak
        most_common = Counter(k_nearest_labels).most_common(1)
        return most_common[0][0]

    def score(self, X, y):
        """Menghitung akurasi prediksi model"""
        y_pred = self.predict(X)
        return float(np.mean(y_pred == y))


# ==============================================================================
# PENGUJIAN MODEL
# ==============================================================================
if __name__ == "__main__":
    print("=== PENGUJIAN MODEL KNN MANDIRI ===")
    
    # Data Latih: Tinggi Badan (cm) & Berat Badan (kg)
    # Target: 0 = Kurus, 1 = Gemuk
    X_train = np.array([
        [170, 50],
        [175, 55],
        [160, 45],
        [165, 80],
        [170, 85],
        [180, 95]
    ])
    y_train = np.array([0, 0, 0, 1, 1, 1])

    # Latih model
    model = KNNManual(k=3)
    model.fit(X_train, y_train)

    # Data Baru yang ingin ditebak
    X_baru = np.array([
        [168, 52], # Harusnya Kurus (0)
        [172, 88]  # Harusnya Gemuk (1)
    ])

    hasil = model.predict(X_baru)
    print("Data Baru:\n", X_baru)
    print("Hasil Prediksi (0=Kurus, 1=Gemuk):", hasil)
    print(f"Akurasi pada data latih: {model.score(X_train, y_train)*100:.1f}%")
