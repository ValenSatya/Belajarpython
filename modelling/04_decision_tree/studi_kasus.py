"""
Studi Kasus Decision Tree: Deteksi Keaslian Uang Kertas (Dataset Asli Kaggle / UCI Banknote)
"""

import sys
import os

curr_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(curr_dir, "../.."))
sys.path.append(root_dir)
sys.path.append(curr_dir)

import numpy as np
from common.preprocessing import train_test_split
from common.data_helper import load_banknote
from contoh_program import DecisionTreeManual
from evaluasi.klasifikasi.metrics import confusion_matrix, classification_report

def jalankan():
    print("=" * 65)
    print("STUDI KASUS LKS: DETEKSI UANG KERTAS PALSU DENGAN DECISION TREE")
    print("Dataset: Banknote Authentication (1.372 Uang Kertas, 4 Fitur Citra)")
    print("Target: 0 = Asli, 1 = Palsu")
    print("=" * 65)

    # 1. Muat dataset asli Banknote
    X, y = load_banknote()
    nama_fitur = ["Variance Wavelet", "Skewness Wavelet", "Curtosis Wavelet", "Entropy Citra"]
    print(f"Total Sampel Uang: {len(X)} lembar")
    print(f"Distribusi: {np.sum(y==0)} Asli (0) vs {np.sum(y==1)} Palsu (1)")

    # 2. Split Data (80% Train, 20% Test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Data Latih: {len(X_train)} lembar | Data Uji: {len(X_test)} lembar")

    # 3. Training Decision Tree
    tree = DecisionTreeManual(max_depth=4, min_samples_split=5)
    tree.fit(X_train, y_train)

    # 4. Tampilkan Struktur Pohon yang Dipelajari Model
    print("\n[STRUKTUR POHON KEPUTUSAN DETEKSI UANG PALSU]:")
    tree.print_tree(feature_names=nama_fitur)

    # 5. Prediksi Data Uji
    y_pred = tree.predict(X_test)

    # 6. Evaluasi Metrik
    cm, _ = confusion_matrix(y_test, y_pred)
    print("\nConfusion Matrix pada Data Uang Kertas Uji:")
    print(cm)

    print("\nLaporan Klasifikasi Lengkap:")
    print(classification_report(y_test, y_pred))

    # Simulasi 1 Lembar Uang dari Mesin Kasir
    uang_kasir = np.array([[-2.5, 1.8, 3.2, -0.5]])
    tebakan = tree.predict(uang_kasir)
    status = "PALSU (Waspada!)" if tebakan[0] == 1 else "ASLI"
    print(f"\nUji Uang di Mesin Kasir {uang_kasir.tolist()} -> Hasil: UANG {status}")

if __name__ == "__main__":
    jalankan()
