"""
Implementasi Agglomerative Hierarchical Clustering Mandiri (Pure Python + NumPy)
Mendukung Single, Complete, dan Average Linkage tanpa Scikit-Learn.
"""

import numpy as np

class AgglomerativeClusteringManual:
    def __init__(self, n_clusters=2, linkage='complete'):
        """
        - n_clusters : jumlah klaster akhir yang diinginkan
        - linkage    : 'single', 'complete', atau 'average'
        """
        self.n_clusters = n_clusters
        self.linkage = linkage
        self.labels_ = None
        self.merge_history_ = []

    def _cluster_distance(self, cluster_a_indices, cluster_b_indices, dist_matrix):
        """Menghitung jarak antar dua kelompok klaster berdasarkan linkage"""
        sub_matrix = dist_matrix[np.ix_(cluster_a_indices, cluster_b_indices)]
        if self.linkage == 'single':
            return np.min(sub_matrix)
        elif self.linkage == 'complete':
            return np.max(sub_matrix)
        elif self.linkage == 'average':
            return np.mean(sub_matrix)
        else:
            raise ValueError(f"Linkage {self.linkage} tidak dikenal!")

    def fit_predict(self, X):
        """Melakukan clustering hierarki bertahap hingga mencapai target n_clusters"""
        X = np.array(X, dtype=float)
        n_samples = len(X)

        if self.n_clusters >= n_samples:
            self.labels_ = np.arange(n_samples)
            return self.labels_

        # 1. Matriks Jarak Euclidean antar titik awal
        # pairwise_dist shape: (n_samples, n_samples)
        diff = X[:, np.newaxis, :] - X[np.newaxis, :, :]
        dist_matrix = np.sqrt(np.sum(diff ** 2, axis=-1))

        # Inisialisasi: Setiap sampel adalah 1 klaster tersendiri
        clusters = {i: [i] for i in range(n_samples)}
        self.merge_history_ = []

        # 2. Proses Penggabungan Bertahap (Merge Loop)
        while len(clusters) > self.n_clusters:
            cluster_keys = list(clusters.keys())
            n_current = len(cluster_keys)

            min_dist = float("inf")
            best_pair = None

            # Cari pasangan klaster dengan jarak terkecil
            for i in range(n_current):
                key_a = cluster_keys[i]
                for j in range(i + 1, n_current):
                    key_b = cluster_keys[j]
                    d = self._cluster_distance(clusters[key_a], clusters[key_b], dist_matrix)
                    if d < min_dist:
                        min_dist = d
                        best_pair = (key_a, key_b)

            c1, c2 = best_pair
            # Rekam riwayat penggabungan
            self.merge_history_.append({
                "merged": (c1, c2),
                "distance": min_dist,
                "remaining_clusters": len(clusters) - 1
            })

            # Gabungkan anggota c2 ke c1, lalu hapus c2
            clusters[c1].extend(clusters[c2])
            del clusters[c2]

        # 3. Bentuk array label akhir
        self.labels_ = np.zeros(n_samples, dtype=int)
        for label_idx, (c_id, members) in enumerate(clusters.items()):
            self.labels_[members] = label_idx

        return self.labels_

    def print_merge_history(self, limit=10):
        """Mencetak riwayat penggabungan klaster berjenjang"""
        print(f"\n--- RIWAYAT PENGGABUNGAN (LINKAGE: {self.linkage.upper()}) ---")
        print(f"{'Tahap':>6} | {'Klaster Digabung':>20} | {'Jarak Euclidean':>16} | {'Sisa Klaster':>14}")
        print("-" * 62)
        for idx, item in enumerate(self.merge_history_[:limit]):
            c1, c2 = item['merged']
            print(f"{idx+1:6d} | Klaster {c1:>3} + {c2:>3}   | {item['distance']:16.4f} | {item['remaining_clusters']:14d}")


# ==============================================================================
# PENGUJIAN MANDIRI
# ==============================================================================
if __name__ == "__main__":
    print("=== PENGUJIAN HIERARCHICAL CLUSTERING MANDIRI ===")
    
    # Data Titik 2D: 3 titik di grup A dan 3 titik di grup B
    X_sample = np.array([
        [1.0, 1.0], [1.5, 1.2], [1.1, 1.4],  # Kelompok 1
        [8.0, 8.0], [8.5, 8.2], [9.0, 8.8]   # Kelompok 2
    ])

    hc = AgglomerativeClusteringManual(n_clusters=2, linkage='complete')
    hasil_label = hc.fit_predict(X_sample)

    print("Data Input Shape     :", X_sample.shape)
    print("Label Klaster Akhir  :", hasil_label)
    hc.print_merge_history()
