"""
TANTANGAN LATIHAN BAB 1: KNN DENGAN JARAK MANHATTAN & PENCARIAN K TERBAIK
"""

import numpy as np

# Dataset Pengujian
np.random.seed(42)
X_train = np.random.uniform(10, 50, size=(80, 2))
y_train = (X_train[:, 0] + X_train[:, 1] > 60).astype(int)

X_test = np.random.uniform(10, 50, size=(20, 2))
y_test = (X_test[:, 0] + X_test[:, 1] > 60).astype(int)

# ==============================================================================
# TANTANGAN:
# 1. Gunakan class KNNManual dengan parameter metric='manhattan'.
# 2. Lakukan perulangan (looping) untuk mencari nilai K terbaik dari K = 1, 3, 5, 7, 9.
# 3. Cetak nilai K mana yang menghasilkan akurasi tertinggi pada X_test!
# ==============================================================================

# TODO: Tulis kodemu di bawah ini:
