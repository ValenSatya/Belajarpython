"""
KUNCI JAWABAN & SOLUSI LATIHAN BAB 4: MAX_DEPTH DECISION TREE
"""

import os
import sys
curr_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(curr_dir)

import numpy as np
from contoh_program import DecisionTreeManual

np.random.seed(42)
X_train = np.random.uniform(-3, 3, size=(80, 2))
y_train = ((X_train[:, 0]**2 + X_train[:, 1]**2) > 2.0).astype(int)

X_test = np.random.uniform(-3, 3, size=(30, 2))
y_test = ((X_test[:, 0]**2 + X_test[:, 1]**2) > 2.0).astype(int)

depths = [1, 4, 15]
labels = ["Pohon Dangkal (max_depth=1)", "Pohon Sedang (max_depth=4)", "Pohon Dalam (max_depth=15)"]

print("=== PERBANDINGAN PENGARUH KEDALAMAN POHON (MAX DEPTH) ===")
for d, label in zip(depths, labels):
    tree = DecisionTreeManual(max_depth=d)
    tree.fit(X_train, y_train)
    
    train_acc = np.mean(tree.predict(X_train) == y_train)
    test_acc  = np.mean(tree.predict(X_test) == y_test)
    
    print(f"\n{label}:")
    print(f"  Akurasi Data Latih (Train) : {train_acc*100:5.1f}%")
    print(f"  Akurasi Data Uji (Test)    : {test_acc*100:5.1f}%")

print("\nKESIMPULAN PENTING DI LKS:")
print("- max_depth=1 terlalu bodoh (underfitting) karena hanya bisa bertanya 1 kali.")
print("- max_depth=15 menghafal noise data latih hingga 100%, tapi performanya di data uji bisa jeblok (overfitting).")
print("- Selalu tentukan max_depth yang seimbang (biasanya 3 - 6) untuk model yang kuat!")
