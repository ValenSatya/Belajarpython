"""
Modul Data Helper Mandiri
Menyediakan pembaca dataset asli Kaggle (Iris, Advertising, Diabetes, Banknote, Wine, Mall Customers)
serta generator sintetis cadangan. 100% tanpa Scikit-Learn!
"""

import os
import csv
import numpy as np

# Lokasi direktori dataset lokal
DATASET_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../datasets"))

# ==============================================================================
# LOADER DATASET ASLI DARI KAGGLE
# ==============================================================================

def load_iris(path=None):
    """
    Dataset Bunga Iris (Kaggle Classic)
    - 150 sampel, 4 fitur: [sepal_length, sepal_width, petal_length, petal_width]
    - Target: 'setosa', 'versicolor', 'virginica'
    - Cocok untuk: K-Nearest Neighbors (KNN)
    """
    if path is None:
        path = os.path.join(DATASET_DIR, "iris.csv")
    
    X, y = [], []
    with open(path, mode="r", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader)
        for row in reader:
            if row and len(row) >= 5:
                X.append([float(val) for val in row[:4]])
                y.append(row[4])
    return np.array(X), np.array(y)


def load_advertising(path=None):
    """
    Dataset Pengeluaran Iklan & Penjualan (Kaggle Advertising)
    - 200 sampel, 3 fitur: [TV, Radio, Newspaper] (dalam ribuan dollar)
    - Target: Sales (Penjualan dalam ribuan unit)
    - Cocok untuk: Regresi Linier (Linear Regression)
    """
    if path is None:
        path = os.path.join(DATASET_DIR, "advertising.csv")
    
    X, y = [], []
    with open(path, mode="r", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader)
        for row in reader:
            if row and len(row) >= 5:
                # Kolom 0 adalah index ID, ambil kolom 1 s/d 3 sebagai X, kolom 4 sebagai y
                X.append([float(row[1]), float(row[2]), float(row[3])])
                y.append(float(row[4]))
    return np.array(X), np.array(y)


def load_diabetes(path=None):
    """
    Dataset Skrining Diabetes Pasien Pima Indians (Kaggle Diabetes)
    - 768 pasien, 8 fitur medis: [Kehamilan, Glukosa, Tekanan Darah, Ketebalan Kulit, Insulin, BMI, Riwayat, Umur]
    - Target: 1 (Positif Diabetes), 0 (Negatif Sehat)
    - Cocok untuk: Regresi Logistik & Evaluasi Recall/Precision
    """
    if path is None:
        path = os.path.join(DATASET_DIR, "diabetes.csv")
    
    X, y = [], []
    with open(path, mode="r", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader)
        for row in reader:
            if row and len(row) >= 9:
                X.append([float(val) for val in row[:8]])
                y.append(int(float(row[8])))
    return np.array(X), np.array(y)


def load_banknote(path=None):
    """
    Dataset Otentikasi Uang Kertas (Kaggle / UCI Banknote Authentication)
    - 1.372 sampel uang, 4 fitur ekstraksi gambar: [variance, skewness, curtosis, entropy]
    - Target: 0 (Uang Asli), 1 (Uang Palsu)
    - Cocok untuk: Decision Tree (Pohon Keputusan)
    """
    if path is None:
        path = os.path.join(DATASET_DIR, "banknote.csv")
    
    X, y = [], []
    with open(path, mode="r", encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            if row and len(row) >= 5:
                X.append([float(val) for val in row[:4]])
                y.append(int(float(row[4])))
    return np.array(X), np.array(y)


def load_wine(path=None):
    """
    Dataset Kualitas Anggur (Kaggle / UCI Wine)
    - 178 sampel, 13 fitur kimiawi kontinu berdistribusi lonceng Gauss
    - Target: Kelas Anggur (1, 2, 3)
    - Cocok untuk: Gaussian Naive Bayes
    """
    if path is None:
        path = os.path.join(DATASET_DIR, "wine.csv")
    
    X, y = [], []
    with open(path, mode="r", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader)
        for row in reader:
            if row and len(row) >= 14:
                # Kolom 0 adalah Label Kelas Wine, kolom 1 s/d 13 adalah fitur
                y.append(int(float(row[0])))
                X.append([float(val) for val in row[1:14]])
    return np.array(X), np.array(y)


def load_mall_customers(path=None):
    """
    Dataset Segmentasi Pelanggan Mall (Kaggle Mall Customer Segmentation)
    - 200 pelanggan mall
    - Fitur utama: [Annual Income (k$), Spending Score (1-100)]
    - Target: Tidak ada label (Unsupervised)
    - Cocok untuk: K-Means Clustering
    """
    if path is None:
        path = os.path.join(DATASET_DIR, "mall_customers.csv")
    
    X = []
    with open(path, mode="r", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader)
        for row in reader:
            if row and len(row) >= 5:
                # Kolom 3: Pendapatan Tahunan ($k), Kolom 4: Skor Pengeluaran Belanja (1-100)
                X.append([float(row[3]), float(row[4])])
    return np.array(X)


# ==============================================================================
# GENERATOR DATA SINTETIS (CADANGAN OFFLINE)
# ==============================================================================

def make_regression_data(n_samples=100, n_features=1, noise=0.1, random_state=42):
    if random_state is not None:
        np.random.seed(random_state)
    X = np.random.uniform(-3.0, 3.0, size=(n_samples, n_features))
    true_weights = np.random.uniform(1.5, 4.5, size=(n_features, 1))
    true_bias = 2.5
    y = np.dot(X, true_weights) + true_bias
    noise_vector = np.random.normal(0, noise, size=y.shape)
    y = y + noise_vector
    return X, y.flatten()


def make_classification_data(n_samples=150, n_features=2, n_classes=2, noise=0.1, random_state=42):
    if random_state is not None:
        np.random.seed(random_state)
    samples_per_class = n_samples // n_classes
    X_list, y_list = [], []
    for c in range(n_classes):
        angle = 2 * np.pi * c / n_classes
        center = np.zeros(n_features)
        center[0] = 2.0 * np.cos(angle)
        if n_features > 1:
            center[1] = 2.0 * np.sin(angle)
        points = np.random.normal(loc=center, scale=0.6 + noise, size=(samples_per_class, n_features))
        labels = np.full(samples_per_class, c)
        X_list.append(points)
        y_list.append(labels)
    X = np.vstack(X_list)
    y = np.concatenate(y_list)
    shuffle_idx = np.random.permutation(len(X))
    return X[shuffle_idx], y[shuffle_idx]


def make_blobs_data(n_samples=150, centers=3, n_features=2, cluster_std=0.5, random_state=42):
    return make_classification_data(
        n_samples=n_samples, n_features=n_features, n_classes=centers, noise=cluster_std, random_state=random_state
    )


# ==============================================================================
# PENGUJIAN MANDIRI
# ==============================================================================
if __name__ == "__main__":
    print("=== PENGUJIAN LOADER DATASET ASLI KAGGLE ===")
    
    X_iris, y_iris = load_iris()
    print(f"1. Iris Dataset        : {X_iris.shape}, Target: {np.unique(y_iris)}")

    X_adv, y_adv = load_advertising()
    print(f"2. Advertising Dataset : {X_adv.shape}, Target Rentang: [{y_adv.min()} - {y_adv.max()}]")

    X_diab, y_diab = load_diabetes()
    print(f"3. Diabetes Dataset    : {X_diab.shape}, Distribusi: {np.bincount(y_diab)}")

    X_bank, y_bank = load_banknote()
    print(f"4. Banknote Dataset    : {X_bank.shape}, Distribusi: {np.bincount(y_bank)}")

    X_wine, y_wine = load_wine()
    print(f"5. Wine Dataset        : {X_wine.shape}, Kelas: {np.unique(y_wine)}")

    X_mall = load_mall_customers()
    print(f"6. Mall Customers      : {X_mall.shape} (Unsupervised)")

    print("\n[SUKSES] Semua dataset asli Kaggle berhasil dimuat dengan sempurna!")
