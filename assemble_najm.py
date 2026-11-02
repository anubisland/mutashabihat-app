# -*- coding: utf-8 -*-
"""
Assembler Script for Surah An-Najm scholarly mutashabihat dataset.
Combines Parts 1-4 into najm_scholarly_verified.json.
"""

import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
sys.path.append(r'C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app')

from najm_part1 import clusters_part1
from najm_part2 import clusters_part2
from najm_part3 import clusters_part3
from najm_part4 import clusters_part4

all_clusters = clusters_part1 + clusters_part2 + clusters_part3 + clusters_part4

print(f"Total assembled clusters: {len(all_clusters)}")

out_path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\najm_scholarly_verified.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_clusters, f, ensure_ascii=False, indent=2)

print(f"Successfully saved to {out_path}")
