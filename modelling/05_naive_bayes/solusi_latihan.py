"""
KUNCI JAWABAN & SOLUSI LATIHAN BAB 5: ZERO VARIANCE SMOOTHING
"""

import os
import sys
curr_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(curr_dir)

import numpy as np
from contoh_program import GaussianNaiveBayesManual

X_train = np.array([
    [5.0, 10.0],
    [5.0, 12.0],
    [5.0, 11.0],
    [8.0, 20.0],
    [9.0, 22.0],
    [8.5, 21.0]
])
y_train = np.array([0, 0, 0, 1, 1, 1])

# 1. Variansi asli
var_asli = np.var(X_train[:3, 0])
print(f"Variansi Asli Fitur 0 Kelas 0 : {var_asli:.6f}")
print("-> Jika tanpa perlindungan, pembagian dengan 0 akan menghasilkan ZeroDivisionError / inf!")

# 2. Uji Model dengan Smoothing
gnb = GaussianNaiveBayesManual(var_smoothing=1e-9)
gnb.fit(X_train, y_train)

X_test = np.array([[5.0, 11.5], [8.2, 20.5]])
pred = gnb.predict(X_test)

print("\n=== HASIL DENGAN VAR_SMOOTHING ===")
print("Variansi Tersimpan di Model  :", gnb.var[0][0])
print(f"Prediksi Sampel 1 (Fitur 5.0) : Kelas {pred[0]} (Harusnya 0)")
print(f"Prediksi Sampel 2 (Fitur 8.2) : Kelas {pred[1]} (Harusnya 1)")
print("\n[SUKSES] var_smoothing menyelamatkan model dari crash pembagian nol!")
