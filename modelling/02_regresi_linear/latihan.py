"""
TANTANGAN LATIHAN BAB 2: INVESTIGASI PENGARUH LEARNING RATE
"""

import numpy as np

# Dataset Latihan
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X.flatten() + np.random.randn(100) * 0.1

# ==============================================================================
# TANTANGAN:
# Latihlah 3 model Regresi Linier dengan 3 learning rate berbeda:
# 1. Model Lambat : learning_rate = 0.0001 (Underfitting / Terlalu lambat belajar)
# 2. Model Ideal   : learning_rate = 0.05   (Konvergen dengan baik)
# 3. Model Liar    : learning_rate = 1.8    (Overshooting / Meledak)
#
# Amati nilai loss terakhir dari masing-masing model untuk 100 epoch!
# ==============================================================================

# TODO: Tulis kodemu di bawah ini:
