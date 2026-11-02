import json
import re

with open('insan_clusters.json', 'r', encoding='utf-8') as f:
    clusters = json.load(f)

errors = []
total_verses = 0

for c_idx, c in enumerate(clusters):
    cid = c.get('id', f'c_{c_idx}')
    
    # Check verses length
    verses = c.get('verses', [])
    if len(verses) < 2:
        errors.append(f"{cid}: Singleton cluster ({len(verses)} verses)")
    total_verses += len(verses)
    
    # Check tadabbur
    tadabbur = c.get('tadabbur', [])
    if not isinstance(tadabbur, list) or len(tadabbur) == 0:
        errors.append(f"{cid}: Missing or empty tadabbur array")
        
    # Check scale
    scale = c.get('scale', [])
    if not isinstance(scale, list) or len(scale) < 2:
        errors.append(f"{cid}: Missing or incomplete scale array ({len(scale)})")
    else:
        for s in scale:
            if not s.get('word') or not s.get('note'):
                errors.append(f"{cid}: Scale item missing word or note: {s}")
                
    # Check quiz
    quiz = c.get('quiz', {})
    if not quiz.get('question') or len(quiz.get('options', [])) != 4 or quiz.get('correct') not in [0, 1, 2, 3]:
        errors.append(f"{cid}: Invalid quiz structure")
    if len(set(quiz.get('options', []))) != 4:
        errors.append(f"{cid}: Duplicate quiz options")
        
    # Check highlight ratio
    for v_idx, v in enumerate(verses):
        text = v.get('text', '')
        m = re.findall(r'«([^»]+)»', text)
        if not m:
            errors.append(f"{cid} verse {v_idx}: No highlight markers «...» found in text")
            continue
        
        # Word count calculation
        full_words = len(re.sub(r'[«»]', '', text).split())
        hl_words = sum(len(h.split()) for h in m)
        ratio = (hl_words / full_words) * 100 if full_words > 0 else 0
        if ratio >= 70:
            errors.append(f"{cid} verse {v_idx} ({v.get('surah')} {v.get('verseNum')}): Highlight ratio too high {ratio:.1f}% ({hl_words}/{full_words} words)")

if errors:
    print(f"❌ Found {len(errors)} errors:")
    for e in errors:
        print("  -", e)
    exit(1)
else:
    print(f"✅ All {len(clusters)} clusters ({total_verses} verses compared) passed 100% of validation rules!")
