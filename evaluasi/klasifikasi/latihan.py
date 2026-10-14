"""
TANTANGAN LATIHAN: EVALUASI KLASIFIKASI
Kerjakan latihan ini untuk menguji pemahamanmu tentang metrik evaluasi.
"""

import numpy as np

# DATA UJIAN:
# y_asli: Label sebenarnya (1 = Spam, 0 = Bukan Spam / Ham)
# y_tebak: Tebakan model AI buatanmu
y_asli  = np.array([1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
y_tebak = np.array([1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0])

# ==============================================================================
# TUGAS 1:
# Hitung secara manual (dengan kode NumPy murni tanpa library):
# 1. True Positive (TP)
# 2. False Positive (FP)
# 3. True Negative (TN)
# 4. False Negative (FN)
#
# TUGAS 2:
# Hitung nilai Akurasi, Presisi, dan Recall dari data di atas.
#
# TUGAS 3:
# Hitung metrik baru bernama "Specificity" (Tingkat Negatif Sebenarnya):
# Rumus: TN / (TN + FP)
#
# Tulis kodemu di bawah ini:
# ==============================================================================

# TODO: Tulis kodemu di sini!
# hint: gunakan kondisi boolean numpy seperti: (y_asli == 1) & (y_tebak == 1)
