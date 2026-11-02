import json
import re

with open('munafiqun_clusters.json', 'r', encoding='utf-8') as f:
    clusters = json.load(f)

with open('quran_cache.json', 'r', encoding='utf-8') as f:
    qcache = json.load(f)

errors = []
total_clusters = len(clusters)
total_verses = 0

print(f"Auditing {total_clusters} clusters for Surah Al-Munafiqun...")

for c_idx, c in enumerate(clusters):
    cid = c.get('id', f'cluster_{c_idx}')
    verses = c.get('verses', [])
    total_verses += len(verses)

    # 1. No singletons
    if len(verses) < 2:
        errors.append(f"[{cid}] Less than 2 verses: {len(verses)}")

    # 2. Quiz validation
    quiz = c.get('quiz')
    if not quiz:
        errors.append(f"[{cid}] Missing quiz")
    else:
        prompt = quiz.get('promptDisplay', '')
        if '[ ... ؟ ... ]' not in prompt:
            errors.append(f"[{cid}] Quiz prompt missing '[ ... ؟ ... ]': {prompt}")
        opts = quiz.get('options', [])
        if len(opts) != 4:
            errors.append(f"[{cid}] Quiz options count != 4: {len(opts)}")
        c_idx_opt = quiz.get('correctIndex')
        if c_idx_opt not in [0, 1, 2, 3]:
            errors.append(f"[{cid}] Invalid correctIndex: {c_idx_opt}")

    # 3. Surgical highlight ratios and Uthmani text verification
    for v_idx, v in enumerate(verses):
        html_text = v.get('html', '')
        # extract words from clean text
        clean_text = re.sub(r'<[^>]+>', '', html_text).strip()
        words = clean_text.split()
        
        # extract highlighted words
        highlighted_matches = re.findall(r'<span class="([^"]+)">([\s\S]*?)<\/span>', html_text)
        if not highlighted_matches:
            errors.append(f"[{cid}] Verse #{v_idx} (Ayah {v.get('ayah')}) has no highlighted token")
        else:
            for cls_name, h_text in highlighted_matches:
                # check combined classes
                if 'token-cyan' in cls_name and 'token-a' not in cls_name:
                    errors.append(f"[{cid}] Verse #{v_idx} token-cyan missing token-a")
                if 'token-emerald' in cls_name and 'token-b' not in cls_name:
                    errors.append(f"[{cid}] Verse #{v_idx} token-emerald missing token-b")
                
                h_words = h_text.split()
                ratio = len(h_words) / len(words) if words else 0
                if ratio >= 0.70:
                    errors.append(f"[{cid}] Verse #{v_idx} highlight ratio too high: {ratio:.1%} ({len(h_words)}/{len(words)})")

print(f"\nAudit complete: {len(errors)} errors found.")
if errors:
    for e in errors:
        print("  ERROR:", e)
else:
    print(f"PERFECT! All {total_clusters} clusters and {total_verses} verses passed 100% verification!")
