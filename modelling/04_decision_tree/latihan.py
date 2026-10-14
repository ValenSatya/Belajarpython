"""
TANTANGAN LATIHAN BAB 4: MENGATASI OVERFITTING DENGAN MAX_DEPTH (PRUNING DASAR)
"""

import numpy as np

# Dataset Latihan dengan Sedikit Noise
np.random.seed(42)
X_train = np.random.uniform(-3, 3, size=(80, 2))
y_train = ((X_train[:, 0]**2 + X_train[:, 1]**2) > 2.0).astype(int)

X_test = np.random.uniform(-3, 3, size=(30, 2))
y_test = ((X_test[:, 0]**2 + X_test[:, 1]**2) > 2.0).astype(int)

# ==============================================================================
# TANTANGAN:
# Latihlah 3 model Decision Tree dengan batasan kedalaman berbeda:
# 1. Pohon Dangkal (Decision Stump) : max_depth = 1 (Underfitting)
# 2. Pohon Sedang                   : max_depth = 4 (Ideal)
# 3. Pohon Dalam                    : max_depth = 15 (Potensi Overfitting)
#
# Bandingkan Akurasi Data Latih vs Akurasi Data Uji untuk ketiga model!
# ==============================================================================

# TODO: Tulis kodemu di bawah ini:
