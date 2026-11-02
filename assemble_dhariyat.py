# -*- coding: utf-8 -*-
"""
Assemble all parts of Surah Adh-Dhariyat into dhariyat_scholarly_verified.json
"""

import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

from dhariyat_part1 import clusters_part1
from dhariyat_part2 import clusters_part2
from dhariyat_part3 import clusters_part3
from dhariyat_part4 import clusters_part4

all_clusters = clusters_part1 + clusters_part2 + clusters_part3 + clusters_part4

out_path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\dhariyat_scholarly_verified.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

print(f"Successfully assembled {len(all_clusters)} clusters into {out_path}")
