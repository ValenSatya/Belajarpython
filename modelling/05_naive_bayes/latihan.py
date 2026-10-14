"""
TANTANGAN LATIHAN BAB 5: PENANGANAN VARIANSI NOL (ZERO VARIANCE & SMOOTHING)
"""

import numpy as np

# Dataset Kasus Khusus: Fitur ke-0 konstan (semua bernilai 5.0 pada kelas 0)
X_train = np.array([
    [5.0, 10.0],
    [5.0, 12.0],
    [5.0, 11.0],  # Fitur 0 pada Kelas 0 selalu 5.0 -> np.var = 0.0!
    [8.0, 20.0],
    [9.0, 22.0],
    [8.5, 21.0]
])
y_train = np.array([0, 0, 0, 1, 1, 1])

# ==============================================================================
# TANTANGAN:
# 1. Hitung variansi fitur ke-0 untuk kelas 0 menggunakan np.var(X_train[:3, 0]).
# 2. Amati rumus pembagian log_likelihood: jika var = 0, apa yang terjadi pada
#    operasi (x - mean)^2 / var?
# 3. Uji coba class GaussianNaiveBayesManual dengan var_smoothing=1e-9 pada dataset ini.
#    Pastikan model tidak error dan dapat melakukan prediksi dengan sukses!
# ==============================================================================

# TODO: Tulis kodemu di bawah ini:
