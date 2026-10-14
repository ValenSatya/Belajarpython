"""
KUNCI JAWABAN & SOLUSI LATIHAN BAB 3: THRESHOLD TUNING
"""

import os
import sys
curr_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(curr_dir, "../.."))
sys.path.append(root_dir)

import numpy as np
from evaluasi.klasifikasi.metrics import precision_score, recall_score

probabilitas = np.array([0.15, 0.25, 0.45, 0.48, 0.52, 0.65, 0.72, 0.85, 0.90, 0.95])
y_asli       = np.array([0,    0,    1,    1,    0,    1,    1,    1,    1,    1])

thresholds = [0.40, 0.50, 0.70]
labels     = ["Sensitif/Waspada (0.40)", "Standar (0.50)", "Selektif/Ketat (0.70)"]

print("=== ANALISIS PERUBAHAN AMBANG BATAS (THRESHOLD TUNING) ===")
for th, label in zip(thresholds, labels):
    y_tebak = (probabilitas >= th).astype(int)
    p = precision_score(y_asli, y_tebak, pos_label=1)
    r = recall_score(y_asli, y_tebak, pos_label=1)
    print(f"\nAmbang Batas: {label}")
    print(f"  Tebakan Positif : {np.sum(y_tebak)} sampel")
    print(f"  Precision       : {p*100:.1f}%")
    print(f"  Recall          : {r*100:.1f}%")

print("\nKESIMPULAN PENTING DI LKS:")
print("- Pada kasus kritis medis, kita menurunkan threshold ke 0.40 agar Recall mencapai 100% (tidak ada pasien yang terlewat).")
print("- Pada kasus deteksi Spam, kita menaikkan threshold ke 0.70 agar Precision tinggi (mencegah email penting terbuang).")
