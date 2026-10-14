"""
Modul Preprocessing Mandiri (Pengganti Scikit-Learn)
Dibuat murni menggunakan Python standar dan NumPy.
"""

import numpy as np

def train_test_split(X, y, test_size=0.2, random_state=None, shuffle=True):
    """
    Membagi dataset menjadi data latih (train) dan data uji (test).

    Analogi:
    Ibarat membagi 100 soal latihan: 80 soal untuk belajar (train),
    dan 20 soal disembunyikan untuk bahan ujian akhir (test).

    Parameter:
    - X : array-like, matriks fitur (jumlah_baris, jumlah_fitur)
    - y : array-like, vektor target (jumlah_baris,)
    - test_size : float (0.0 sampai 1.0), proporsi data uji (default: 0.2 atau 20%)
    - random_state : int, seed untuk pengacakan agar hasil konsisten
    - shuffle : bool, apakah data perlu diacak sebelum dipotong

    Mengembalikan:
    - X_train, X_test, y_train, y_test
    """
    X = np.array(X)
    y = np.array(y)
    n_samples = len(X)

    if len(y) != n_samples:
        raise ValueError("Jumlah baris X dan y harus sama!")

    indices = np.arange(n_samples)

    if shuffle:
        if random_state is not None:
            np.random.seed(random_state)
        indices = np.random.permutation(n_samples)

    split_point = int(n_samples * (1 - test_size))
    train_idx = indices[:split_point]
    test_idx = indices[split_point:]

    return X[train_idx], X[test_idx], y[train_idx], y[test_idx]


class StandardScaler:
    """
    Standarisasi Fitur (Z-Score Normalization)
    Rumus: z = (x - mean) / std

    Analogi:
    Mengubah nilai yang satuan/skalanya berbeda-beda (misal: Umur 20-60 tahun vs
    Gaji 3.000.000 - 20.000.000 rupiah) menjadi skala yang berpusat di rata-rata 0
    dengan simpangan baku 1. Sehingga model tidak bias terhadap angka yang besar.
    """
    def __init__(self):
        self.mean_ = None
        self.std_ = None

    def fit(self, X):
        X = np.array(X, dtype=float)
        self.mean_ = np.mean(X, axis=0)
        self.std_ = np.std(X, axis=0)
        # Cegah pembagian dengan nol jika ada fitur konstan (std = 0)
        self.std_[self.std_ == 0.0] = 1e-8
        return self

    def transform(self, X):
        X = np.array(X, dtype=float)
        if self.mean_ is None or self.std_ is None:
            raise RuntimeError("Model scaler belum di-fit!")
        return (X - self.mean_) / self.std_

    def fit_transform(self, X):
        return self.fit(X).transform(X)


class MinMaxScaler:
    """
    Normalisasi Min-Max
    Rumus: x_norm = (x - min) / (max - min)

    Analogi:
    Memampatkan semua nilai angka ke dalam rentang tepat antara 0.0 sampai 1.0.
    Ibarat mengonversi nilai ulangan skala 10-100 menjadi skala 0-1.
    """
    def __init__(self, feature_range=(0, 1)):
        self.min_ = None
        self.max_ = None
        self.feature_range = feature_range

    def fit(self, X):
        X = np.array(X, dtype=float)
        self.min_ = np.min(X, axis=0)
        self.max_ = np.max(X, axis=0)
        return self

    def transform(self, X):
        X = np.array(X, dtype=float)
        if self.min_ is None or self.max_ is None:
            raise RuntimeError("Model scaler belum di-fit!")
        
        range_diff = self.max_ - self.min_
        range_diff[range_diff == 0.0] = 1e-8 # Cegah pembagian nol
        
        norm_0_1 = (X - self.min_) / range_diff
        min_target, max_target = self.feature_range
        return norm_0_1 * (max_target - min_target) + min_target

    def fit_transform(self, X):
        return self.fit(X).transform(X)


class LabelEncoder:
    """
    Mengubah label kategori (teks) menjadi angka integer berurutan (0, 1, 2, ...).

    Analogi:
    Memberi nomor punggung:
    'Kucing' -> 0, 'Anjing' -> 1, 'Kelinci' -> 2
    """
    def __init__(self):
        self.classes_ = None
        self._mapping = {}
        self._inverse_mapping = {}

    def fit(self, y):
        unique_labels = sorted(list(set(y)))
        self.classes_ = np.array(unique_labels)
        self._mapping = {label: idx for idx, label in enumerate(unique_labels)}
        self._inverse_mapping = {idx: label for idx, label in enumerate(unique_labels)}
        return self

    def transform(self, y):
        if not self._mapping:
            raise RuntimeError("LabelEncoder belum di-fit!")
        return np.array([self._mapping[label] for label in y])

    def fit_transform(self, y):
        return self.fit(y).transform(y)

    def inverse_transform(self, y_encoded):
        return np.array([self._inverse_mapping[idx] for idx in y_encoded])


# ==============================================================================
# PENGUJIAN MANDIRI
# ==============================================================================
if __name__ == "__main__":
    print("=== PENGUJIAN PREPROCESSING MANDIRI ===")
    
    # 1. Uji train_test_split
    X_dummy = np.arange(20).reshape(10, 2)
    y_dummy = np.array([0, 1, 0, 1, 0, 1, 0, 1, 0, 1])
    X_tr, X_te, y_tr, y_te = train_test_split(X_dummy, y_dummy, test_size=0.3, random_state=42)
    print(f"X_train shape: {X_tr.shape}, X_test shape: {X_te.shape}")
    print("Sample X_test:\n", X_te)

    # 2. Uji StandardScaler
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_dummy)
    print("\nMean hasil StandardScaler (harus mendekati 0):", np.round(np.mean(X_scaled, axis=0), 4))
    print("Std hasil StandardScaler (harus mendekati 1):", np.round(np.std(X_scaled, axis=0), 4))

    # 3. Uji MinMaxScaler
    minmax = MinMaxScaler()
    X_norm = minmax.fit_transform(X_dummy)
    print("\nMin hasil MinMaxScaler:", np.min(X_norm, axis=0))
    print("Max hasil MinMaxScaler:", np.max(X_norm, axis=0))

    # 4. Uji LabelEncoder
    labels = ["apel", "jeruk", "apel", "mangga", "jeruk"]
    le = LabelEncoder()
    encoded = le.fit_transform(labels)
    decoded = le.inverse_transform(encoded)
    print(f"\nLabel Asli      : {labels}")
    print(f"Hasil Encode    : {encoded}")
    print(f"Hasil Decode    : {list(decoded)}")
    print("\n[OK] Semua fungsi preprocessing berhasil berjalan tanpa error!")
