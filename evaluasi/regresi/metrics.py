"""
Modul Metrik Evaluasi Regresi Mandiri (Pure NumPy)
Menghitung MAE, MSE, RMSE, dan R-Squared (R2).
"""

import numpy as np

def mean_absolute_error(y_true, y_pred):
    """Menghitung Mean Absolute Error (MAE): mean(|y - y_hat|)"""
    y_true = np.array(y_true, dtype=float)
    y_pred = np.array(y_pred, dtype=float)
    return float(np.mean(np.abs(y_true - y_pred)))


def mean_squared_error(y_true, y_pred):
    """Menghitung Mean Squared Error (MSE): mean((y - y_hat)^2)"""
    y_true = np.array(y_true, dtype=float)
    y_pred = np.array(y_pred, dtype=float)
    return float(np.mean((y_true - y_pred) ** 2))


def root_mean_squared_error(y_true, y_pred):
    """Menghitung Root Mean Squared Error (RMSE): sqrt(MSE)"""
    return float(np.sqrt(mean_squared_error(y_true, y_pred)))


def r2_score(y_true, y_pred):
    """
    Menghitung Koefisien Determinasi R-Squared:
    1 - (SS_res / SS_tot)
    """
    y_true = np.array(y_true, dtype=float)
    y_pred = np.array(y_pred, dtype=float)

    ss_res = np.sum((y_true - y_pred) ** 2)
    ss_tot = np.sum((y_true - np.mean(y_true)) ** 2)

    if ss_tot == 0.0:
        return 1.0 if ss_res == 0.0 else 0.0

    return float(1.0 - (ss_res / ss_tot))


def regression_report(y_true, y_pred):
    """Mencetak ringkasan seluruh metrik evaluasi regresi"""
    mae = mean_absolute_error(y_true, y_pred)
    mse = mean_squared_error(y_true, y_pred)
    rmse = root_mean_squared_error(y_true, y_pred)
    r2 = r2_score(y_true, y_pred)

    report = (
        f"{'='*35}\n"
        f"     LAPORAN EVALUASI REGRESI     \n"
        f"{'='*35}\n"
        f"MAE      : {mae:12.4f}\n"
        f"MSE      : {mse:12.4f}\n"
        f"RMSE     : {rmse:12.4f}\n"
        f"R-Square : {r2:12.4f} ({r2*100:.2f}%)\n"
        f"{'='*35}"
    )
    return report


if __name__ == "__main__":
    print("=== PENGUJIAN METRIK REGRESI MANDIRI ===")
    
    y_asli  = [100.0, 150.0, 200.0, 250.0, 300.0]
    y_tebak = [105.0, 142.0, 208.0, 245.0, 310.0]

    print(regression_report(y_asli, y_tebak))
