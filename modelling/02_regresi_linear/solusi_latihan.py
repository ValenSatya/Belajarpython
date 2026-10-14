"""
KUNCI JAWABAN & SOLUSI LATIHAN BAB 2: INVESTIGASI LEARNING RATE
"""

import os
import sys
curr_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(curr_dir)

import numpy as np
from contoh_program import LinearRegressionManual

np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X.flatten() + np.random.randn(100) * 0.1

rates = [0.0001, 0.05, 1.8]
labels = ["Model Lambat (0.0001)", "Model Ideal (0.05)", "Model Liar (1.8)"]

print("=== PERBANDINGAN PENGARUH LEARNING RATE (100 EPOCHS) ===")
for lr, label in zip(rates, labels):
    model = LinearRegressionManual(learning_rate=lr, epochs=100)
    model.fit(X, y)
    loss_awal = model.cost_history[0]
    loss_akhir = model.cost_history[-1]
    print(f"\n{label}:")
    print(f"  Loss Awal : {loss_awal:.4f}")
    print(f"  Loss Akhir: {loss_akhir:.4f}")
    print(f"  Bobot (w) : {model.weights[0][0]:.4f} (Ideal = 3.0)")
    print(f"  Bias (b)  : {model.bias:.4f} (Ideal = 4.0)")

print("\nKESIMPULAN PENTING DI LKS:")
print("- Jika LR terlalu kecil: Model butuh ribuan epoch dan berisiko underfitting.")
print("- Jika LR pas: Model turun stabil ke titik minimum.")
print("- Jika LR terlalu besar: Nilai bobot melompat-lompat liar dan loss bisa melonjak tak terhingga (NaN/Inf)!")
