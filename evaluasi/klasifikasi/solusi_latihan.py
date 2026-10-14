"""
KUNCI JAWABAN & SOLUSI LATIHAN EVALUASI KLASIFIKASI
"""

import numpy as np

y_asli  = np.array([1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
y_tebak = np.array([1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0])

# TUGAS 1: Menghitung Komponen Dasar
tp = int(np.sum((y_asli == 1) & (y_tebak == 1)))
fp = int(np.sum((y_asli == 0) & (y_tebak == 1)))
tn = int(np.sum((y_asli == 0) & (y_tebak == 0)))
fn = int(np.sum((y_asli == 1) & (y_tebak == 0)))

print("=== HASIL PERHITUNGAN DASAR ===")
print(f"True Positive (TP)  : {tp}")
print(f"False Positive (FP) : {fp}")
print(f"True Negative (TN)  : {tn}")
print(f"False Negative (FN) : {fn}")

# TUGAS 2: Menghitung Metrik Utama
akurasi  = (tp + tn) / (tp + tn + fp + fn)
presisi  = tp / (tp + fp) if (tp + fp) > 0 else 0.0
recall   = tp / (tp + fn) if (tp + fn) > 0 else 0.0
f1_score = 2 * (presisi * recall) / (presisi + recall) if (presisi + recall) > 0 else 0.0

print("\n=== METRIK UTAMA ===")
print(f"Akurasi   : {akurasi:.4f} ({akurasi*100:.1f}%)")
print(f"Presisi   : {presisi:.4f} ({presisi*100:.1f}%)")
print(f"Recall    : {recall:.4f} ({recall*100:.1f}%)")
print(f"F1-Score  : {f1_score:.4f}")

# TUGAS 3: Menghitung Specificity
specificity = tn / (tn + fp) if (tn + fp) > 0 else 0.0
print("\n=== METRIK TAMBAHAN ===")
print(f"Specificity : {specificity:.4f} ({specificity*100:.1f}%)")
