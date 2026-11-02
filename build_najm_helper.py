# -*- coding: utf-8 -*-
"""
Helper module for building Surah An-Najm mutashabihat dataset.
"""

import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

quran = json.load(open(r'C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\quran_cache.json', encoding='utf-8'))

surah_map = {}
for s_id, s_data in quran.items():
    name = s_data['name']
    clean_name = name.replace('سُورَةُ ', '').replace('سورة ', '').strip()
    surah_map[int(s_id)] = {
        'name': s_data['name'],
        'clean_name': clean_name,
        'ayahs': {a['numberInSurah']: a for a in s_data['ayahs']}
    }

def get_raw_verse_text(s_num, a_num):
    return surah_map[s_num]['ayahs'][a_num]['text']

def make_verse(s_num, a_num, textHtml, keyPhrase, tokens, contextNote):
    s = surah_map[s_num]
    a = s['ayahs'][a_num]
    hq = a['hizbQuarter']
    hizb = (hq - 1) // 4 + 1
    quarter = (hq - 1) % 4 + 1
    quarter_str = f"الحزب {hizb} • الربع {quarter}"
    
    # Calculate ratio to ensure it is strictly < 70%
    spans = re.findall(r'<span[^>]*>(.*?)</span>', textHtml)
    span_text = ''.join(spans)
    plain_text = re.sub(r'<[^>]+>', '', textHtml)
    ratio = len(span_text) / len(plain_text) if len(plain_text) > 0 else 0
    if ratio >= 0.70:
        raise ValueError(f"Diff ratio too high: {ratio*100:.1f}% >= 70% for Surah {s_num}:{a_num} ('{span_text}')")
    if len(spans) == 0:
        raise ValueError(f"No diff-token spans found for Surah {s_num}:{a_num}")

    return {
        'surah': s['clean_name'],
        'surahName': f"سورة {s['clean_name']}",
        'ayah': a_num,
        'page': a['page'],
        'juz': a['juz'],
        'quarter': quarter_str,
        'pos': f"الآية {a_num}",
        'textHtml': textHtml,
        'html': textHtml,
        'keyPhrase': keyPhrase,
        'tokens': tokens,
        'contextNote': contextNote
    }

if __name__ == '__main__':
    print("build_najm_helper initialized successfully.")
