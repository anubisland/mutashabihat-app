import json
import re

surahs = [
    ("النصر", "nasr_clusters.json"),
    ("المسد", "masad_clusters.json"),
    ("الإخلاص", "ikhlas_clusters.json"),
    ("الفلق", "falaq_clusters.json"),
    ("الناس", "nas_clusters.json")
]

all_passed = True

for surah_name, filename in surahs:
    with open(filename, 'r', encoding='utf-8') as f:
        clusters = json.load(f)
    
    print(f"\n--- Checking {surah_name} ({filename}): {len(clusters)} clusters ---")
    
    for idx, c in enumerate(clusters, 1):
        cid = c.get('id', f'unknown_{idx}')
        # Required fields
        req_fields = ['id', 'category', 'title', 'subtitle', 'rhyme', 'rule', 'dabit', 'alBurhan', 'tadabbur', 'scale', 'quiz', 'verses']
        missing = [f for f in req_fields if f not in c or c[f] is None or c[f] == '']
        if missing:
            print(f"Cluster {cid}: Missing fields {missing}")
            all_passed = False
            
        # Check tadabbur
        tadabbur = c.get('tadabbur', [])
        if not isinstance(tadabbur, list) or len(tadabbur) < 2:
            print(f"Cluster {cid}: Tadabbur must have >= 2 items (found {len(tadabbur)})")
            all_passed = False
            
        # Check scale
        scale = c.get('scale', [])
        if not isinstance(scale, list) or len(scale) != 2:
            print(f"Cluster {cid}: Scale must have exactly 2 plates (found {len(scale)})")
            all_passed = False
        else:
            for i, p in enumerate(scale):
                if not p.get('word') or not p.get('note'):
                    print(f"Cluster {cid}: Scale plate {i+1} has missing word/note")
                    all_passed = False

        # Check quiz
        quiz = c.get('quiz', {})
        options = quiz.get('options', [])
        if len(options) != 4 or len(set(options)) != 4:
            print(f"Cluster {cid}: Quiz must have 4 distinct options (found {len(options)}, unique {len(set(options))})")
            all_passed = False
        if quiz.get('correct') not in [0, 1, 2, 3]:
            print(f"Cluster {cid}: Quiz correct index invalid ({quiz.get('correct')})")
            all_passed = False

        # Check verses
        verses = c.get('verses', [])
        if len(verses) < 2:
            print(f"Cluster {cid}: verses.length must be >= 2 (found {len(verses)})")
            all_passed = False
            
        v_req = ['surah', 'surahKey', 'ayah', 'quarter', 'page', 'pos', 'tokens', 'text', 'html']
        for v_idx, v in enumerate(verses, 1):
            v_missing = [f for f in v_req if f not in v or v[f] is None or v[f] == '']
            if v_missing:
                print(f"Cluster {cid} v{v_idx}: Missing verse fields {v_missing}")
                all_passed = False
            
            # Check highlight ratio
            html = v.get('html', '')
            text = v.get('text', '')
            # total words
            total_words = len(text.split())
            # highlighted words
            hl_matches = re.findall(r'<(?:span|mark) class=["\'][^"\']*(?:diff-token|hl-match)[^"\']*["\']>(.*?)</(?:span|mark)>', html)
            hl_words = sum(len(m.split()) for m in hl_matches)
            ratio = hl_words / max(1, total_words)
            if ratio >= 0.70:
                print(f"Cluster {cid} v{v_idx}: Highlight ratio too high {ratio:.1%} ({hl_words}/{total_words} words)")
                all_passed = False
            elif hl_words == 0:
                print(f"Cluster {cid} v{v_idx}: No highlight found in {html}!")
                all_passed = False

if all_passed:
    print("\n>>> ALL FINAL 5 SURAHS DATASETS (110-114) ARE 100% VALID! <<<")
else:
    print("\n>>> VALIDATION FAILED! <<<")
