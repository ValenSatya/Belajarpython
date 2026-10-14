"""
Studi Kasus Regresi Logistik: Skrining Pasien Diabetes Menggunakan Dataset Asli Kaggle
"""

import sys
import os

curr_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(curr_dir, "../.."))
sys.path.append(root_dir)
sys.path.append(curr_dir)

import numpy as np
from common.preprocessing import train_test_split, StandardScaler
from common.data_helper import load_diabetes
from contoh_program import LogisticRegressionManual
from evaluasi.klasifikasi.metrics import confusion_matrix, classification_report

def jalankan():
    print("=" * 65)
    print("STUDI KASUS LKS: SKRINING MEDIS DIABETES DENGAN DATASET ASLI KAGGLE")
    print("Dataset: Pima Indians Diabetes (768 Pasien, 8 Fitur Medis)")
    print("Target: 1 = Positif Diabetes, 0 = Negatif")
    print("=" * 65)

    # 1. Muat dataset asli Kaggle Diabetes
    X, y = load_diabetes()
    print(f"Total Pasien Medis: {len(X)} orang")
    print(f"Distribusi Kelas  : {np.sum(y==0)} Sehat (0) vs {np.sum(y==1)} Positif Diabetes (1)")

    # 2. Split Data (80% Train, 20% Test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Data Latih: {len(X_train)} pasien | Data Uji: {len(X_test)} pasien")

    # 3. Standarisasi Fitur (Wajib untuk Regresi Logistik)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 4. Training Model Regresi Logistik
    model = LogisticRegressionManual(learning_rate=0.1, epochs=1000, threshold=0.5)
    model.fit(X_train_scaled, y_train)

    # 5. Prediksi Data Uji
    y_pred = model.predict(X_test_scaled)

    # 6. Evaluasi Hasil
    cm, _ = confusion_matrix(y_test, y_pred)
    print("\nConfusion Matrix pada Data Pasien Uji:")
    print(cm)

    print("\nLaporan Performa Model:")
    print(classification_report(y_test, y_pred))

    # Simulasi Pasien Baru
    pasien_baru = np.array([
        [2, 145, 80, 28, 120, 32.5, 0.45, 45],  # Indikasi glukosa tinggi
        [1, 90,  68, 15, 40,  21.0, 0.18, 22]   # Indikasi sehat
    ])
    pasien_scaled = scaler.transform(pasien_baru)
    peluang = model.predict_proba(pasien_scaled)
    status = model.predict(pasien_scaled)

    print("\nSimulasi Skrining 2 Pasien Baru:")
    for idx, (p, s) in enumerate(zip(peluang, status)):
        vonis = "POSITIF DIABETES (PERLU TINDAKAN)" if s == 1 else "NEGATIF (SEHAT)"
        print(f"Pasien #{idx+1}: Peluang Diabetes = {p*100:5.1f}% -> Status: {vonis}")

if __name__ == "__main__":
    jalankan()
