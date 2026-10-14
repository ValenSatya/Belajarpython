"""
KUNCI JAWABAN & SOLUSI LATIHAN BAB 1: KNN
"""

import os
import sys
curr_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(curr_dir)

import numpy as np
from contoh_program import KNNManual

np.random.seed(42)
X_train = np.random.uniform(10, 50, size=(80, 2))
y_train = (X_train[:, 0] + X_train[:, 1] > 60).astype(int)

X_test = np.random.uniform(10, 50, size=(20, 2))
y_test = (X_test[:, 0] + X_test[:, 1] > 60).astype(int)

k_candidates = [1, 3, 5, 7, 9]
best_k = None
best_acc = -1.0

print("=== PENCARIAN K TERBAIK DENGAN JARAK MANHATTAN ===")
for k in k_candidates:
    model = KNNManual(k=k, metric='manhattan')
    model.fit(X_train, y_train)
    acc = model.score(X_test, y_test)
    print(f"K = {k:2d} | Akurasi Test: {acc*100:.2f}%")
    
    if acc > best_acc:
        best_acc = acc
        best_k = k

print(f"\n[HASIL OPTIMAL] K terbaik adalah {best_k} dengan akurasi {best_acc*100:.2f}%")
