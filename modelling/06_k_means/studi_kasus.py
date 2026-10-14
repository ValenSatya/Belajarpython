"""
Studi Kasus K-Means: Segmentasi Pelanggan Menggunakan Dataset Asli Kaggle Mall Customers
"""

import sys
import os

curr_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(curr_dir, "../.."))
sys.path.append(root_dir)
sys.path.append(curr_dir)

import numpy as np
from common.preprocessing import StandardScaler
from common.data_helper import load_mall_customers
from contoh_program import KMeansManual

def jalankan():
    print("=" * 65)
    print("STUDI KASUS LKS: SEGMENTASI DATASET ASLI KAGGLE MALL CUSTOMERS")
    print("Fitur: [Annual Income ($k), Spending Score (1-100)]")
    print("Metode: K-Means Clustering Unsupervised (Tanpa Label)")
    print("=" * 65)

    # 1. Muat dataset asli Mall Customers
    X = load_mall_customers()
    print(f"Total Pelanggan Dimuat: {len(X)} orang")

    # 2. Standarisasi Fitur
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # 3. Latih Model K-Means dengan K = 5 (Standar Emas Segmentasi Mall di Kaggle)
    # 5 Segmen Alami:
    # 1. Gaji Rendah, Belanja Rendah (Hemat / Sensitif Harga)
    # 2. Gaji Rendah, Belanja Tinggi (Careless / Boros)
    # 3. Gaji Sedang, Belanja Sedang (Standard / Mayoritas)
    # 4. Gaji Tinggi, Belanja Rendah (Kikir / Target Penawaran Khusus)
    # 5. Gaji Tinggi, Belanja Tinggi (Sultan / VIP / Target Utama)
    kmeans = KMeansManual(k=5, max_iter=300, random_state=42)
    kmeans.fit(X_scaled)

    print(f"Model berhasil konvergen!")
    print(f"Total Inertia (WCSS): {kmeans.inertia_:.4f}")

    # 4. Analisis Profil Setiap Klaster (Konversi kembali ke skala asli untuk dibaca manusia)
    print("\n--- ANALISIS 5 SEGMEN PELANGGAN MALL (DATA ASLI) ---")
    for k_idx in range(5):
        anggota = X[kmeans.labels_ == k_idx]
        rerata = np.mean(anggota, axis=0)
        jumlah = len(anggota)
        print(f"\nKlaster {k_idx} ({jumlah} Pelanggan):")
        print(f"  Rata-rata Pendapatan Tahunan : ${rerata[0]:.1f}k")
        print(f"  Rata-rata Skor Belanja (1-100): {rerata[1]:.1f}")

    print("\nREKOMENDASI STRATEGI BISNIS UNTUK JURI LKS:")
    print("1. Klaster Pendapatan Tinggi & Skor Belanja Tinggi:")
    print("   -> Tawarkan program loyalitas VIP, personal shopper, dan peluncuran produk edisi terbatas.")
    print("2. Klaster Pendapatan Rendah & Skor Belanja Rendah:")
    print("   -> Berikan kupon diskon musiman, produk bundle hemat, dan gratis ongkir.")

if __name__ == "__main__":
    jalankan()
