"""
Studi Kasus KNN: Klasifikasi Spesies Bunga Menggunakan Dataset Asli Iris (Kaggle)
"""

import sys
import os

curr_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(curr_dir, "../.."))
sys.path.append(root_dir)
sys.path.append(curr_dir)

import numpy as np
from common.preprocessing import train_test_split, StandardScaler, LabelEncoder
from common.data_helper import load_iris
from contoh_program import KNNManual
from evaluasi.klasifikasi.metrics import confusion_matrix, classification_report

def jalankan():
    print("=" * 65)
    print("STUDI KASUS LKS: KLASIFIKASI DATASET ASLI KAGGLE IRIS DENGAN KNN")
    print("=" * 65)

    # 1. Muat dataset asli Kaggle Iris
    X, y_raw = load_iris()
    nama_fitur = ["Sepal Length", "Sepal Width", "Petal Length", "Petal Width"]
    print(f"Dataset Asli Dimuat : {len(X)} sampel bunga, 4 fitur")
    print(f"Spesies Asli        : {np.unique(y_raw).tolist()}")

    # 2. Encode label teks ('setosa', dll) menjadi angka integer (0, 1, 2)
    le = LabelEncoder()
    y = le.fit_transform(y_raw)

    # 3. Split Data (80% Train, 20% Test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Data Latih: {len(X_train)} sampel | Data Uji: {len(X_test)} sampel")

    # 4. Standarisasi Fitur
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 5. Training KNN Manual
    knn = KNNManual(k=5, metric='euclidean')
    knn.fit(X_train_scaled, y_train)

    # 6. Prediksi Data Uji
    y_pred = knn.predict(X_test_scaled)

    # 7. Evaluasi Hasil
    cm, _ = confusion_matrix(y_test, y_pred)
    print("\nConfusion Matrix pada Data Uji Asli:")
    print(cm)

    print("\nLaporan Klasifikasi Lengkap:")
    print(classification_report(y_test, y_pred))

    # Simulasi data bunga baru
    bunga_baru = np.array([[5.8, 2.7, 4.1, 1.0], [6.5, 3.0, 5.5, 1.8]])
    bunga_scaled = scaler.transform(bunga_baru)
    hasil_pred = knn.predict(bunga_scaled)
    hasil_nama = le.inverse_transform(hasil_pred)

    print("\nSimulasi Prediksi Bunga Baru:")
    for b, pred_nama in zip(bunga_baru, hasil_nama):
        print(f"Fitur {b.tolist()} -> Terdeteksi Spesies: {pred_nama}")

if __name__ == "__main__":
    jalankan()
