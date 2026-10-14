"""
Implementasi K-Means Clustering Mandiri (Pure Python + NumPy)
Mendukung kalkulasi Inertia (WCSS) dan prediksi klaster data baru.
"""

import numpy as np

class KMeansManual:
    def __init__(self, k=3, max_iter=300, tol=1e-4, random_state=42):
        """
        - k : jumlah klaster yang ingin dibentuk
        - max_iter : batas maksimum perulangan pergeseran centroid
        - tol : toleransi pergeseran minimum untuk menyatakan konvergensi
        - random_state : seed pengacakan titik awal
        """
        self.k = k
        self.max_iter = max_iter
        self.tol = tol
        self.random_state = random_state
        self.centroids_ = None
        self.labels_ = None
        self.inertia_ = None

    def fit(self, X):
        """Proses mencari posisi centroid optimal"""
        X = np.array(X, dtype=float)
        n_samples, n_features = X.shape

        if self.random_state is not None:
            np.random.seed(self.random_state)

        # 1. Inisialisasi: Pilih k titik acak dari data sebagai centroid awal
        random_indices = np.random.choice(n_samples, size=self.k, replace=False)
        self.centroids_ = X[random_indices].copy()

        for iteration in range(self.max_iter):
            # 2. Assignment Step: Hitung jarak setiap sampel ke seluruh centroid
            # distances shape: (n_samples, k)
            distances = np.zeros((n_samples, self.k))
            for k_idx in range(self.k):
                distances[:, k_idx] = np.sum((X - self.centroids_[k_idx]) ** 2, axis=1)

            # Ambil indeks centroid terdekat
            self.labels_ = np.argmin(distances, axis=1)

            # 3. Update Step: Hitung rata-rata posisi baru tiap klaster
            new_centroids = np.zeros_like(self.centroids_)
            for k_idx in range(self.k):
                members = X[self.labels_ == k_idx]
                if len(members) > 0:
                    new_centroids[k_idx] = np.mean(members, axis=0)
                else:
                    # Jika klaster kosong, pertahankan posisi lama
                    new_centroids[k_idx] = self.centroids_[k_idx]

            # 4. Cek Konvergensi (apakah pergeseran sangat kecil)
            shift = np.sum((new_centroids - self.centroids_) ** 2)
            self.centroids_ = new_centroids

            if shift < self.tol:
                break

        # 5. Hitung Nilai Akhir Inertia (WCSS)
        total_wcss = 0.0
        for k_idx in range(self.k):
            members = X[self.labels_ == k_idx]
            if len(members) > 0:
                total_wcss += np.sum((members - self.centroids_[k_idx]) ** 2)
        self.inertia_ = float(total_wcss)

        return self

    def predict(self, X):
        """Menentukan klaster terdekat untuk data baru"""
        X = np.array(X, dtype=float)
        n_samples = len(X)
        distances = np.zeros((n_samples, self.k))
        for k_idx in range(self.k):
            distances[:, k_idx] = np.sum((X - self.centroids_[k_idx]) ** 2, axis=1)
        return np.argmin(distances, axis=1)


# ==============================================================================
# PENGUJIAN MANDIRI
# ==============================================================================
if __name__ == "__main__":
    print("=== PENGUJIAN MODEL K-MEANS MANDIRI ===")
    
    # 6 Data Point: 3 data di sekitar (1,1) dan 3 data di sekitar (10,10)
    X_train = np.array([
        [1.0, 1.2],
        [1.5, 1.8],
        [0.8, 0.9],
        [10.0, 10.5],
        [9.5, 9.8],
        [10.2, 10.1]
    ])

    kmeans = KMeansManual(k=2, random_state=42)
    kmeans.fit(X_train)

    print("Hasil Label Tiap Data :", kmeans.labels_)
    print("Posisi Centroid Akhir :\n", np.round(kmeans.centroids_, 2))
    print(f"Nilai Inertia (WCSS)  : {kmeans.inertia_:.4f}")

    # Uji coba data baru
    X_baru = np.array([[1.2, 1.3], [9.8, 10.0]])
    klaster_baru = kmeans.predict(X_baru)
    print("\nPrediksi Klaster Titik Baru:")
    print(f"Titik [1.2, 1.3] masuk ke Klaster {klaster_baru[0]}")
    print(f"Titik [9.8, 10.0] masuk ke Klaster {klaster_baru[1]}")
