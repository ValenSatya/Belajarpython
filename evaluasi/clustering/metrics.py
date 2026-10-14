"""
Modul Metrik Evaluasi Clustering Mandiri (Pure NumPy)
Menghitung Inertia (WCSS) dan Silhouette Score tanpa Scikit-Learn.
"""

import numpy as np

def calculate_inertia(X, labels, centroids):
    """
    Menghitung Within-Cluster Sum of Squares (WCSS / Inertia):
    Inertia = sum_{k=1}^K sum_{x in C_k} ||x - mu_k||^2
    """
    X = np.array(X, dtype=float)
    labels = np.array(labels, dtype=int)
    centroids = np.array(centroids, dtype=float)

    total_inertia = 0.0
    for k_idx in range(len(centroids)):
        cluster_points = X[labels == k_idx]
        if len(cluster_points) > 0:
            total_inertia += np.sum((cluster_points - centroids[k_idx]) ** 2)
    return float(total_inertia)


def silhouette_score(X, labels):
    """
    Menghitung Rata-rata Nilai Koefisien Silhouette:
    s(i) = (b(i) - a(i)) / max(a(i), b(i))

    di mana:
    - a(i): Rata-rata jarak titik i ke semua titik lain di dalam klaster yang sama (Intra-cluster compactness)
    - b(i): Rata-rata jarak titik i ke semua titik di klaster tetangga terdekat (Nearest-cluster separation)

    Rentang Nilai:
    - +1.0 : Klaster sangat terpisah dengan sempurna dan padat (Ideal)
    -  0.0 : Titik berada tepat di perbatasan antara dua klaster
    - -1.0 : Titik salah ditempatkan (lebih dekat ke klaster lain)
    """
    X = np.array(X, dtype=float)
    labels = np.array(labels, dtype=int)
    n_samples = len(X)
    unique_labels = np.unique(labels)
    n_clusters = len(unique_labels)

    if n_clusters <= 1 or n_clusters >= n_samples:
        raise ValueError("Silhouette Score membutuhkan minimal 2 klaster dan kurang dari jumlah sampel!")

    silhouette_vals = np.zeros(n_samples)

    for i in range(n_samples):
        current_point = X[i]
        current_cluster = labels[i]

        # 1. Hitung a(i): Jarak rata-rata ke anggota klaster yang sama
        same_cluster_points = X[(labels == current_cluster) & (np.arange(n_samples) != i)]
        if len(same_cluster_points) == 0:
            a_i = 0.0
        else:
            a_i = np.mean(np.sqrt(np.sum((same_cluster_points - current_point) ** 2, axis=1)))

        # 2. Hitung b(i): Jarak rata-rata minimum ke klaster lain terdekat
        min_b_i = float("inf")
        for other_cluster in unique_labels:
            if other_cluster == current_cluster:
                continue
            other_cluster_points = X[labels == other_cluster]
            if len(other_cluster_points) > 0:
                dist_to_other = np.mean(np.sqrt(np.sum((other_cluster_points - current_point) ** 2, axis=1)))
                if dist_to_other < min_b_i:
                    min_b_i = dist_to_other

        b_i = min_b_i

        # 3. Hitung s(i)
        denom = max(a_i, b_i)
        silhouette_vals[i] = (b_i - a_i) / denom if denom > 0 else 0.0

    return float(np.mean(silhouette_vals))


def clustering_report(X, labels, centroids=None):
    """Mencetak laporan ringkas evaluasi klastering"""
    n_clusters = len(np.unique(labels))
    sil_score = silhouette_score(X, labels)

    lines = [
        "=" * 45,
        "       LAPORAN EVALUASI CLUSTERING          ",
        "=" * 45,
        f"Jumlah Klaster (K)       : {n_clusters}",
        f"Jumlah Total Sampel      : {len(X)}",
        f"Silhouette Score Rata2   : {sil_score:+.4f}"
    ]

    if centroids is not None:
        inertia = calculate_inertia(X, labels, centroids)
        lines.append(f"Inertia (WCSS)           : {inertia:10.4f}")

    lines.append("=" * 45)
    return "\n".join(lines)


if __name__ == "__main__":
    print("=== PENGUJIAN METRIK CLUSTERING MANDIRI ===")
    
    # 2 Klaster yang terpisah jelas
    X_test = np.array([
        [1.0, 1.0], [1.2, 1.1], [0.9, 0.8],
        [10.0, 10.0], [10.2, 10.1], [9.8, 9.9]
    ])
    labels_test = np.array([0, 0, 0, 1, 1, 1])
    centroids_test = np.array([[1.033, 0.967], [10.0, 10.0]])

    print(clustering_report(X_test, labels_test, centroids_test))
