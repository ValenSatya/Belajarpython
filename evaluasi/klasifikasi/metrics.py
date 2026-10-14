"""
Modul Metrik Evaluasi Klasifikasi Mandiri (Pure NumPy)
Menghitung Confusion Matrix, Akurasi, Presisi, Recall, dan F1-Score
untuk kasus Biner maupun Multi-Kelas.
"""

import numpy as np

def confusion_matrix(y_true, y_pred, labels=None):
    """
    Menghitung matriks kontingensi (Confusion Matrix).
    Baris = Nilai Sebenarnya (True), Kolom = Tebakan Model (Pred)
    """
    y_true = np.array(y_true)
    y_pred = np.array(y_pred)

    if labels is None:
        labels = np.unique(np.concatenate([y_true, y_pred]))
    else:
        labels = np.array(labels)

    n_classes = len(labels)
    matrix = np.zeros((n_classes, n_classes), dtype=int)
    label_to_idx = {label: idx for idx, label in enumerate(labels)}

    for true_val, pred_val in zip(y_true, y_pred):
        if true_val in label_to_idx and pred_val in label_to_idx:
            row = label_to_idx[true_val]
            col = label_to_idx[pred_val]
            matrix[row, col] += 1

    return matrix, labels


def accuracy_score(y_true, y_pred):
    """Menghitung akurasi = jumlah tebakan benar / total sampel"""
    y_true = np.array(y_true)
    y_pred = np.array(y_pred)
    if len(y_true) == 0:
        return 0.0
    return np.mean(y_true == y_pred)


def precision_score(y_true, y_pred, pos_label=1):
    """
    Menghitung presisi untuk kelas pos_label:
    TP / (TP + FP)
    """
    y_true = np.array(y_true)
    y_pred = np.array(y_pred)

    tp = np.sum((y_true == pos_label) & (y_pred == pos_label))
    fp = np.sum((y_true != pos_label) & (y_pred == pos_label))

    denom = tp + fp
    return float(tp / denom) if denom > 0 else 0.0


def recall_score(y_true, y_pred, pos_label=1):
    """
    Menghitung recall untuk kelas pos_label:
    TP / (TP + FN)
    """
    y_true = np.array(y_true)
    y_pred = np.array(y_pred)

    tp = np.sum((y_true == pos_label) & (y_pred == pos_label))
    fn = np.sum((y_true == pos_label) & (y_pred != pos_label))

    denom = tp + fn
    return float(tp / denom) if denom > 0 else 0.0


def f1_score(y_true, y_pred, pos_label=1):
    """
    Menghitung F1-Score: 2 * (P * R) / (P + R)
    """
    p = precision_score(y_true, y_pred, pos_label=pos_label)
    r = recall_score(y_true, y_pred, pos_label=pos_label)

    denom = p + r
    return float(2 * (p * r) / denom) if denom > 0 else 0.0


def classification_report(y_true, y_pred):
    """
    Mencetak laporan evaluasi lengkap mirip sklearn.metrics.classification_report
    """
    y_true = np.array(y_true)
    y_pred = np.array(y_pred)
    classes = np.unique(np.concatenate([y_true, y_pred]))

    header = f"{'Class':>10} | {'Precision':>10} | {'Recall':>10} | {'F1-Score':>10} | {'Support':>10}"
    separator = "-" * len(header)
    lines = [header, separator]

    precisions = []
    recalls = []
    f1s = []
    supports = []

    for c in classes:
        p = precision_score(y_true, y_pred, pos_label=c)
        r = recall_score(y_true, y_pred, pos_label=c)
        f = f1_score(y_true, y_pred, pos_label=c)
        s = np.sum(y_true == c)

        precisions.append(p)
        recalls.append(r)
        f1s.append(f)
        supports.append(s)

        lines.append(f"{str(c):>10} | {p:10.4f} | {r:10.4f} | {f:10.4f} | {s:10d}")

    total_support = sum(supports)
    acc = accuracy_score(y_true, y_pred)
    macro_p = np.mean(precisions)
    macro_r = np.mean(recalls)
    macro_f = np.mean(f1s)

    lines.append(separator)
    lines.append(f"{'Accuracy':>10} | {'':>10} | {'':>10} | {acc:10.4f} | {total_support:10d}")
    lines.append(f"{'Macro Avg':>10} | {macro_p:10.4f} | {macro_r:10.4f} | {macro_f:10.4f} | {total_support:10d}")

    return "\n".join(lines)


if __name__ == "__main__":
    print("=== PENGUJIAN METRIK KLASIFIKASI MANDIRI ===")
    
    # Contoh kasus nyata: 1 = Sakit, 0 = Sehat
    y_asli    = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
    y_prediksi = [1, 1, 1, 0, 0, 0, 0, 0, 1, 0]

    cm, labels = confusion_matrix(y_asli, y_prediksi)
    print("Confusion Matrix:\n", cm)
    print("Labels order    :", labels)
    
    acc = accuracy_score(y_asli, y_prediksi)
    prec = precision_score(y_asli, y_prediksi, pos_label=1)
    rec = recall_score(y_asli, y_prediksi, pos_label=1)
    f1 = f1_score(y_asli, y_prediksi, pos_label=1)

    print(f"\nAkurasi   : {acc:.4f}")
    print(f"Presisi   : {prec:.4f}")
    print(f"Recall    : {rec:.4f}")
    print(f"F1-Score  : {f1:.4f}")

    print("\nLaporan Lengkap:\n")
    print(classification_report(y_asli, y_prediksi))
