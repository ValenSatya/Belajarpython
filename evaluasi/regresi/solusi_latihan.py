"""
KUNCI JAWABAN & SOLUSI LATIHAN EVALUASI REGRESI
"""

import numpy as np

waktu_asli   = np.array([25.0, 30.0, 45.0, 50.0, 60.0, 75.0, 90.0])
waktu_predik = np.array([28.0, 27.0, 42.0, 55.0, 58.0, 80.0, 85.0])

# TUGAS 1: MAE
def hitung_mae(y_true, y_pred):
    return np.mean(np.abs(y_true - y_pred))

# TUGAS 2: RMSE
def hitung_rmse(y_true, y_pred):
    return np.sqrt(np.mean((y_true - y_pred) ** 2))

# TUGAS 3: R-Squared (R2)
def hitung_r2(y_true, y_pred):
    ss_res = np.sum((y_true - y_pred) ** 2)
    ss_tot = np.sum((y_true - np.mean(y_true)) ** 2)
    return 1.0 - (ss_res / ss_tot)

mae = hitung_mae(waktu_asli, waktu_predik)
rmse = hitung_rmse(waktu_asli, waktu_predik)
r2 = hitung_r2(waktu_asli, waktu_predik)

print("=== HASIL EVALUASI MANUAL REGRESI ===")
print(f"MAE  : {mae:.4f} menit")
print(f"RMSE : {rmse:.4f} menit")
print(f"R2   : {r2:.4f} ({r2*100:.2f}%)")
