"""
Studi Kasus Regresi Linier: Prediksi Penjualan dari Dataset Asli Kaggle Advertising
"""

import sys
import os

curr_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(curr_dir, "../.."))
sys.path.append(root_dir)
sys.path.append(curr_dir)

import numpy as np
from common.preprocessing import train_test_split, StandardScaler
from common.data_helper import load_advertising
from contoh_program import LinearRegressionManual
from evaluasi.regresi.metrics import regression_report

def jalankan():
    print("=" * 65)
    print("STUDI KASUS LKS: PREDIKSI PENJUALAN MENGGUNAKAN DATASET ASLI KAGGLE")
    print("Dataset: Advertising (Budget Iklan TV, Radio, Koran vs Sales)")
    print("=" * 65)

    # 1. Muat dataset asli Advertising
    X, y = load_advertising()
    fitur_names = ["TV ($k)", "Radio ($k)", "Koran ($k)"]
    print(f"Dataset Asli Dimuat : {len(X)} baris data pasar")

    # 2. Split Data (80% Train, 20% Test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Data Latih: {len(X_train)} sampel | Data Uji: {len(X_test)} sampel")

    # 3. Standarisasi Fitur
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 4. Training Model Regresi Linier
    model = LinearRegressionManual(learning_rate=0.05, epochs=1200)
    model.fit(X_train_scaled, y_train)

    # 5. Prediksi Data Uji
    y_pred = model.predict(X_test_scaled)

    # 6. Evaluasi Metrik
    print("\n" + regression_report(y_test, y_pred))

    print("\nBobot Pengaruh Setiap Media Iklan (Koefisien w):")
    for nama, w in zip(fitur_names, model.weights.flatten()):
        print(f"  {nama:<15} : {w:+.4f}")
    print(f"  Konstanta Bias (b) : {model.bias:+.4f}")

    print("\nContoh Perbandingan 5 Data Uji:")
    print(f"{'Target Asli (Sales)':>20} | {'Tebakan Model':>15} | {'Selisih':>10}")
    print("-" * 50)
    for asli, tebak in zip(y_test[:5], y_pred[:5]):
        print(f"{asli:20.2f} | {tebak:15.2f} | {abs(asli-tebak):10.2f}")

if __name__ == "__main__":
    jalankan()
