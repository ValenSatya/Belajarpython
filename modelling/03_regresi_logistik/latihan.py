"""
TANTANGAN LATIHAN BAB 3: THRESHOLD TUNING (PRECISION VS RECALL)
"""

import numpy as np

# Peluang prediksi dari model AI untuk 10 pasien
# (Hasil pemanggilan model.predict_proba)
probabilitas = np.array([0.15, 0.25, 0.45, 0.48, 0.52, 0.65, 0.72, 0.85, 0.90, 0.95])
# Label sebenarnya: 1 = Sakit Kritis, 0 = Sehat
y_asli       = np.array([0,    0,    1,    1,    0,    1,    1,    1,    1,    1])

# ==============================================================================
# TANTANGAN:
# 1. Hitung Precision dan Recall jika ambang batas (threshold) = 0.50 (Standar)
# 2. Hitung Precision dan Recall jika ambang batas diturunkan ke threshold = 0.40 (Lebih Waspada)
# 3. Hitung Precision dan Recall jika ambang batas dinaikkan ke threshold = 0.70 (Sangat Selektif)
#
# Amati apa yang terjadi pada nilai Recall saat threshold diturunkan!
# ==============================================================================

# TODO: Tulis kodemu di bawah ini:
