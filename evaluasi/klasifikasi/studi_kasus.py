"""
Studi Kasus Evaluasi Klasifikasi: Skrining Medis Diabetes (Dataset Asli Kaggle Pima Indians)
Menunjukkan mengapa Akurasi bisa menjebak dan mengapa Recall krusial di dunia nyata & LKS.
"""

import sys
import os

curr_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(curr_dir, "../.."))
sys.path.append(root_dir)

import numpy as np
from common.data_helper import load_diabetes
from common.preprocessing import train_test_split, StandardScaler
from evaluasi.klasifikasi.metrics import (
    confusion_matrix, accuracy_score, precision_score, recall_score, f1_score, classification_report
)

def jalankan_studi_kasus():
    print("=" * 65)
    print("STUDI KASUS EVALUASI: SKRINING MEDIS DENGAN DATASET ASLI DIABETES")
    print("Dataset: Pima Indians Diabetes (Kaggle)")
    print("Label Target: 1 = Positif Diabetes, 0 = Negatif (Sehat)")
    print("=" * 65)

    # 1. Muat data asli
    X, y = load_diabetes()
    print(f"Total Pasien Medis: {len(X)} orang")
    print(f"Distribusi: {np.sum(y==0)} Sehat (0) vs {np.sum(y==1)} Sakit (1)")

    # 2. Split Data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

    # Skenario 1: Model "Malas / Naive" (Selalu menebak 0 / Sehat karena mayoritas sehat)
    y_pred_malas = np.zeros_like(y_test)

    # Skenario 2: Model Prediksi Realistis (Berusaha menangkap pasien sakit)
    # (Simulasi tebakan model terlatih dengan threshold standar)
    np.random.seed(42)
    y_pred_realistis = y_test.copy()
    # Misalkan ada 15 pasien sakit yang luput (FN = 15) dan 10 orang sehat salah tebak (FP = 10)
    pos_idx = np.where(y_test == 1)[0]
    neg_idx = np.where(y_test == 0)[0]
    y_pred_realistis[pos_idx[:15]] = 0
    y_pred_realistis[neg_idx[:10]] = 1

    print("\n[ANALISIS MODEL 1 (Model Malas / Selalu Tebak Sehat)]")
    cm_malas, _ = confusion_matrix(y_test, y_pred_malas)
    print("Confusion Matrix:\n", cm_malas)
    print(f"Akurasi   : {accuracy_score(y_test, y_pred_malas)*100:.2f}% (Tinggi karena kelas mayoritas)")
    print(f"Recall    : {recall_score(y_test, y_pred_malas, pos_label=1)*100:.2f}% (0%!)")
    print("-> BAHAYA: Model ini gagal menyelamatkan SEMUA pasien diabetes yang datang!")

    print("\n" + "-" * 65)
    print("[ANALISIS MODEL 2 (Model Medis Sebenarnya)]")
    cm_real, _ = confusion_matrix(y_test, y_pred_realistis)
    print("Confusion Matrix:\n", cm_real)
    print(f"Akurasi   : {accuracy_score(y_test, y_pred_realistis)*100:.2f}%")
    print(f"Presisi   : {precision_score(y_test, y_pred_realistis, pos_label=1)*100:.2f}%")
    print(f"Recall    : {recall_score(y_test, y_pred_realistis, pos_label=1)*100:.2f}%")
    print(f"F1-Score  : {f1_score(y_test, y_pred_realistis, pos_label=1)*100:.2f}%")

    print("\nLaporan Lengkap Model Medis:")
    print(classification_report(y_test, y_pred_realistis))

    print("\nKESIMPULAN UNTUK JURI LKS:")
    print("Pada data asli Kaggle Diabetes, proporsi pasien sehat lebih banyak.")
    print("Jika hanya mengejar Akurasi, model malas bisa tampak 'bagus', namun mematikan bagi pasien.")
    print("Oleh karena itu, evaluasi wajib menyertakan Recall dan F1-Score!")

if __name__ == "__main__":
    jalankan_studi_kasus()
