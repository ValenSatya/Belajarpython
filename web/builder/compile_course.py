"""
Compiler Script: Menggabungkan seluruh modul builder ke dalam content_data.js
"""

import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

from mod_01_preprocessing import MODULE_DATA as mod_1
from mod_02_knn import MODULE_DATA as mod_2
from mod_03_decision_tree import MODULE_DATA as mod_3
from mod_04_naive_bayes import MODULE_DATA as mod_4
from mod_05_linear_regression import MODULE_DATA as mod_5
from mod_06_logistic_regression import MODULE_DATA as mod_6
from mod_07_eval_klasifikasi import MODULE_DATA as mod_7
from mod_08_eval_regresi import MODULE_DATA as mod_8
from mod_09_kmeans import MODULE_DATA as mod_9
from mod_10_hierarchical import MODULE_DATA as mod_10

all_modules = [
    mod_1, mod_2, mod_3, mod_4, mod_5,
    mod_6, mod_7, mod_8, mod_9, mod_10
]

output_file = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "content_data.js"))

with open(output_file, "w", encoding="utf-8") as f:
    f.write("/**\n")
    f.write(" * DATA KURIKULUM LENGKAP LKS AI ACADEMY (STANDAR NASIONAL LKS AI)\n")
    f.write(" * 10 Modul Pembelajaran Berjenjang (Bab -> Sub-Bab), Teori Formal, Formulasi KaTeX,\n")
    f.write(" * Simulasi Hitung Manual dengan Angka Riil, Tips Juri LKS, dan Bedah Sintaks NumPy.\n")
    f.write(" */\n\n")
    f.write("const COURSE_MODULES = ")
    json.dump(all_modules, f, indent=2, ensure_ascii=False)
    f.write(";\n")

print(f"Successfully compiled {len(all_modules)} modules into {output_file}!")
