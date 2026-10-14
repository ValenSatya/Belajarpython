"""
Studi Kasus Hierarchical Clustering: Segmentasi Data Pelanggan Mall
Dilengkapi Evaluasi Silhouette Score Mandiri.
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
from contoh_program import AgglomerativeClusteringManual
from evaluasi.clustering.metrics import silhouette_score, clustering_report

def jalankan():
    print("=" * 65)
    print("STUDI KASUS LKS: HIERARCHICAL CLUSTERING DATASET MALL CUSTOMERS")
    print("Metode: Agglomerative Complete Linkage (Bottom-Up)")
    print("=" * 65)

    # 1. Muat dataset pelanggan mall (ambil 60 sampel pertama untuk demonstrasi berjenjang)
    X_full = load_mall_customers()
    X = X_full[:60]
    print(f"Sampel Terpilih: {len(X)} pelanggan mall")

    # 2. Standarisasi Fitur
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # 3. Latih Hierarchical Clustering untuk K = 3 klaster
    hc = AgglomerativeClusteringManual(n_clusters=3, linkage='complete')
    labels = hc.fit_predict(X_scaled)

    # 4. Tampilkan 8 Tahap Penggabungan Pertama (Logika Dendrogram)
    hc.print_merge_history(limit=8)

    # 5. Evaluasi Kualitas Klaster dengan Silhouette Score
    print("\n" + clustering_report(X_scaled, labels))

    # 6. Analisis Karakteristik Tiap Klaster
    print("--- PROFIL KELOMPOK PELANGGAN (SKALA ASLI) ---")
    for k in range(3):
        members = X[labels == k]
        mean_inc = np.mean(members[:, 0])
        mean_spd = np.mean(members[:, 1])
        print(f"Klaster {k} ({len(members):2d} orang): Gaji ${mean_inc:.1f}k | Skor Belanja: {mean_spd:.1f}")

    print("\nCATATAN TEKNIS LKS:")
    print("- Hierarchical clustering tidak memiliki risiko terjebak di local minima acak (hasil 100% konsisten).")
    print("- Nilai Silhouette Score di atas mengonfirmasi derajat separasi dan kohesi antar klaster.")

if __name__ == "__main__":
    jalankan()
