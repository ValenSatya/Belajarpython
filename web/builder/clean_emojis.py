"""
Script pembersih emoji dari seluruh modul builder LKS AI
"""

import glob
import os
import re

icon_map = {
    "mod_01": "01",
    "mod_02": "02",
    "mod_03": "03",
    "mod_04": "04",
    "mod_05": "05",
    "mod_06": "06",
    "mod_07": "07",
    "mod_08": "08",
    "mod_09": "09",
    "mod_10": "10",
}

for filepath in glob.glob("c:/Modul/web/builder/mod_*.py"):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    basename = os.path.basename(filepath)
    mod_key = basename[:6]
    num = icon_map.get(mod_key, "01")

    # Ganti icon emoji dengan kode angka modul 01, 02, dst
    content = re.sub(r'"icon":\s*"[^"]+"', f'"icon": "{num}"', content)

    # Bersihkan karakter emoji
    content = re.sub(r'[\U00010000-\U0010ffff]', '', content)
    content = re.sub(r'[⚠️💡⚙️📍🌲🎲📈🧬📊📉🎯🌳🔍▶️◀️✔✕✓❌ℹ️•▶️▶]', '', content)

    # Bersihkan spasi ganda setelah emoji di callouts
    content = content.replace(">  JEBAKAN", "> JEBAKAN")
    content = content.replace(">  TIPS", "> TIPS")
    content = content.replace(">  BAHAYA", "> BAHAYA")
    content = content.replace(">  PERINGATAN", "> PERINGATAN")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Berhasil membersihkan seluruh emoji dari file modul builder!")
