"""
KUNCI JAWABAN & SOLUSI LATIHAN BAB 6: ELBOW METHOD K-MEANS
"""

import os
import sys
curr_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(curr_dir)

import numpy as np
from contoh_program import KMeansManual

np.random.seed(42)
c1 = np.random.normal(loc=[2.0, 2.0], scale=0.5, size=(40, 2))
c2 = np.random.normal(loc=[8.0, 2.0], scale=0.5, size=(40, 2))
c3 = np.random.normal(loc=[5.0, 8.0], scale=0.5, size=(40, 2))
X = np.vstack([c1, c2, c3])

k_range = range(1, 7)
inertias = []

print("=== PERHITUNGAN ELBOW METHOD (K = 1 s/d 6) ===")
print(f"{'K':>4} | {'Inertia (WCSS)':>16} | {'Penurunan':>12}")
print("-" * 38)

prev_inertia = None
for k in k_range:
    km = KMeansManual(k=k, random_state=42)
    km.fit(X)
    inertias.append(km.inertia_)
    
    penurunan = (prev_inertia - km.inertia_) if prev_inertia is not None else 0.0
    penurunan_str = f"-{penurunan:10.2f}" if prev_inertia is not None else "-"
    print(f"{k:4d} | {km.inertia_:16.2f} | {penurunan_str:>12}")
    prev_inertia = km.inertia_

print("\nKESIMPULAN METODE SIKU (ELBOW METHOD):")
print("- Dari K=1 ke K=2 terjadi penurunan raksasa.")
print("- Dari K=2 ke K=3 juga terjadi penurunan tajam.")
print("- Namun dari K=3 ke K=4, K=5, penurunan mulai sangat kecil/mendatar.")
print("-> Titik 'siku' (Elbow) yang paling optimal adalah K = 3!")
