"""
TANTANGAN LATIHAN BAB 6: IMPLEMENTASI ELBOW METHOD (ANALISIS SIKU)
"""

import numpy as np

# Dataset Tanpa Label (Secara alami memiliki 3 kelompok)
np.random.seed(42)
c1 = np.random.normal(loc=[2.0, 2.0], scale=0.5, size=(40, 2))
c2 = np.random.normal(loc=[8.0, 2.0], scale=0.5, size=(40, 2))
c3 = np.random.normal(loc=[5.0, 8.0], scale=0.5, size=(40, 2))
X = np.vstack([c1, c2, c3])

# ==============================================================================
# TANTANGAN:
# 1. Lakukan perulangan nilai K dari K = 1 sampai K = 6.
# 2. Pada setiap K, latih class KMeansManual dan catat nilai 'inertia_'-nya.
# 3. Cetak tabel perbandingan nilai Inertia dan hitung selisih penurunannya.
# 4. Berdasarkan penurunan Inertia, tentukan pada nilai K berapakah kurva siku terbentuk?
# ==============================================================================

# TODO: Tulis kodemu di bawah ini:
