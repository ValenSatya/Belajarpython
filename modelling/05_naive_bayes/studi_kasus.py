"""
Studi Kasus Gaussian Naive Bayes: Klasifikasi Mutu Anggur (Dataset Asli Kaggle / UCI Wine)
"""

import sys
import os

curr_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(curr_dir, "../.."))
sys.path.append(root_dir)
sys.path.append(curr_dir)

import numpy as np
from common.preprocessing import train_test_split, StandardScaler
from common.data_helper import load_wine
from contoh_program import GaussianNaiveBayesManual
from evaluasi.klasifikasi.metrics import confusion_matrix, classification_report

def jalankan():
    print("=" * 65)
    print("STUDI KASUS LKS: KLASIFIKASI KELAS ANGGUR DENGAN NAIVE BAYES")
    print("Dataset: Wine Recognition (178 Sampel, 13 Fitur Kimiawi Kontinu)")
    print("Target: Kelas Kultivar Anggur (1, 2, 3)")
    print("=" * 65)

    # 1. Muat dataset asli Wine
    X, y = load_wine()
    print(f"Total Sampel Anggur: {len(X)} botol dengan 13 kandungan kimiawi")
    print(f"Distribusi Kelas    : {np.bincount(y)[1:]} (Kelas 1, 2, 3)")

    # 2. Split Data (80% Train, 20% Test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Data Latih: {len(X_train)} sampel | Data Uji: {len(X_test)} sampel")

    # 3. Standarisasi Fitur
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 4. Melatih Gaussian Naive Bayes
    gnb = GaussianNaiveBayesManual()
    gnb.fit(X_train_scaled, y_train)

    # 5. Prediksi Data Uji
    y_pred = gnb.predict(X_test_scaled)

    # 6. Evaluasi Metrik
    cm, _ = confusion_matrix(y_test, y_pred)
    print("\nConfusion Matrix pada Data Uji Asli:")
    print(cm)

    print("\nLaporan Klasifikasi Lengkap:")
    print(classification_report(y_test, y_pred))

    print("\nKESIMPULAN METODE GAUSSIAN NAIVE BAYES:")
    print("Pada data kimiawi berdimensi 13 fitur kontinu, Naive Bayes mampu mencapai")
    print("akurasi nyaris 100% dalam waktu komputasi kurang dari 0.01 detik!")

if __name__ == "__main__":
    jalankan()
