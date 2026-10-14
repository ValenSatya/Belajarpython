"""
Implementasi Pohon Keputusan (Decision Tree) Klasifikasi Mandiri
Pure Python + NumPy menggunakan kriteria Gini Impurity (CART).
Dilengkapi fitur visualisasi struktur pohon di terminal.
"""

from collections import Counter
import numpy as np

class Node:
    """Representasi satu titik simpul (Node) pada Pohon Keputusan"""
    def __init__(self, feature=None, threshold=None, left=None, right=None, *, value=None):
        self.feature = feature        # Indeks fitur yang diuji (misal: kolom ke-0)
        self.threshold = threshold    # Nilai batas pemisah (misal: <= 2.5)
        self.left = left              # Cabang kiri jika kondisi terpenuhi (<= threshold)
        self.right = right            # Cabang kanan jika kondisi tidak terpenuhi (> threshold)
        self.value = value            # Nilai label kelas jika simpul ini adalah Daun (Leaf)

    def is_leaf(self):
        return self.value is not None


class DecisionTreeManual:
    def __init__(self, max_depth=5, min_samples_split=2):
        """
        - max_depth: batas maksimum kedalaman cabang pohon (mencegah overfitting)
        - min_samples_split: jumlah sampel minimum untuk membelah cabang
        """
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.root = None

    def _gini(self, y):
        """Menghitung tingkat kekotoran Gini Impurity: 1 - sum(p_i^2)"""
        n = len(y)
        if n == 0:
            return 0.0
        counts = np.bincount(y)
        probabilities = counts / n
        return float(1.0 - np.sum(probabilities ** 2))

    def _best_split(self, X, y):
        """Mencari pasangan fitur dan threshold terbaik dengan Gini terendah"""
        n_samples, n_features = X.shape
        best_gini = float("inf")
        best_feat = None
        best_thresh = None

        current_gini = self._gini(y)
        if current_gini == 0.0:
            return None, None # Sudah murni sempurna

        for feat_idx in range(n_features):
            values = X[:, feat_idx]
            thresholds = np.unique(values)

            for thresh in thresholds:
                left_mask = values <= thresh
                right_mask = ~left_mask

                if np.sum(left_mask) == 0 or np.sum(right_mask) == 0:
                    continue

                y_left, y_right = y[left_mask], y[right_mask]
                gini_left = self._gini(y_left)
                gini_right = self._gini(y_right)

                # Rata-rata berbobot Gini Impurity
                weighted_gini = (len(y_left) / n_samples) * gini_left + (len(y_right) / n_samples) * gini_right

                if weighted_gini < best_gini:
                    best_gini = weighted_gini
                    best_feat = feat_idx
                    best_thresh = thresh

        return best_feat, best_thresh

    def _build_tree(self, X, y, depth=0):
        """Membangun pohon secara rekursif hingga kriteria henti terpenuhi"""
        n_samples = len(y)
        n_labels = len(np.unique(y))

        # 1. Kriteria Berhenti: Daun (Leaf)
        if (depth >= self.max_depth or 
            n_labels == 1 or 
            n_samples < self.min_samples_split):
            most_common = Counter(y).most_common(1)[0][0]
            return Node(value=most_common)

        # 2. Cari pemisah terbaik
        feat, thresh = self._best_split(X, y)
        if feat is None:
            most_common = Counter(y).most_common(1)[0][0]
            return Node(value=most_common)

        # 3. Belah data menjadi Kiri dan Kanan
        left_mask = X[:, feat] <= thresh
        right_mask = ~left_mask

        left_child = self._build_tree(X[left_mask], y[left_mask], depth + 1)
        right_child = self._build_tree(X[right_mask], y[right_mask], depth + 1)

        return Node(feature=feat, threshold=thresh, left=left_child, right=right_child)

    def fit(self, X, y):
        """Melatih pohon keputusan dari data latih"""
        X = np.array(X, dtype=float)
        y = np.array(y, dtype=int)
        self.root = self._build_tree(X, y)
        return self

    def _predict_single(self, x, node):
        """Menelusuri cabang pohon untuk satu baris data"""
        if node.is_leaf():
            return node.value

        if x[node.feature] <= node.threshold:
            return self._predict_single(x, node.left)
        return self._predict_single(x, node.right)

    def predict(self, X):
        """Memprediksi label seluruh data di X"""
        X = np.array(X, dtype=float)
        return np.array([self._predict_single(x, self.root) for x in X])

    def print_tree(self, node=None, indent="  ", feature_names=None):
        """Mencetak struktur visual percabangan pohon di terminal"""
        if node is None:
            node = self.root

        if node.is_leaf():
            print(f"{indent}-> [HASIL DAUN]: Kelas {node.value}")
            return

        feat_name = f"Fitur {node.feature}" if feature_names is None else feature_names[node.feature]
        print(f"{indent}|-- JIKA [{feat_name} <= {node.threshold:.2f}]:")
        self.print_tree(node.left, indent + "    |", feature_names)
        print(f"{indent}|-- JIKA [{feat_name} > {node.threshold:.2f}]:")
        self.print_tree(node.right, indent + "    |", feature_names)


# ==============================================================================
# PENGUJIAN MANDIRI
# ==============================================================================
if __name__ == "__main__":
    print("=== PENGUJIAN MODEL DECISION TREE MANDIRI ===")
    
    # Fitur: [Umur, Penghasilan Juta/Bulan]
    # Label: 0 = Tolak Kredit, 1 = Setujui Kredit
    X_train = np.array([
        [22, 2.5],
        [25, 3.0],
        [40, 8.0],
        [45, 12.0],
        [19, 1.8],
        [35, 9.5]
    ])
    y_train = np.array([0, 0, 1, 1, 0, 1])

    tree = DecisionTreeManual(max_depth=3)
    tree.fit(X_train, y_train)

    print("\nVisualisasi Pohon Keputusan:")
    tree.print_tree(feature_names=["Umur", "Penghasilan"])

    # Tes data baru
    X_baru = np.array([[20, 2.0], [50, 10.0]])
    hasil = tree.predict(X_baru)
    print("\nPrediksi Data Baru:")
    print("Pemohon 1 (Umur 20, Gaji 2.0) ->", "DISETUJUI" if hasil[0]==1 else "DITOLAK")
    print("Pemohon 2 (Umur 50, Gaji 10.0) ->", "DISETUJUI" if hasil[1]==1 else "DITOLAK")
