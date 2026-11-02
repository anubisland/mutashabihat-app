import json, re, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('muzzammil_clusters.json', 'r', encoding='utf-8') as f:
    clusters = json.load(f)

errors = []
total_clusters = len(clusters)
total_verses = 0

print(f"Validating Surah Al-Muzzammil: {total_clusters} clusters...")

for c_idx, c in enumerate(clusters):
    cid = c.get('id', f'idx_{c_idx}')
    verses = c.get('verses', [])
    if len(verses) < 2:
        errors.append(f"[{cid}] Less than 2 verses: {len(verses)}")
    total_verses += len(verses)

    # Check quiz
    quiz = c.get('quiz')
    if not quiz:
        errors.append(f"[{cid}] Missing quiz")
    else:
        opts = quiz.get('options', [])
        if len(opts) != 4:
            errors.append(f"[{cid}] Quiz must have exactly 4 options, found {len(opts)}")
        c_idx_opt = quiz.get('correctIndex')
        if c_idx_opt is None or not (0 <= c_idx_opt < 4):
            errors.append(f"[{cid}] Invalid correctIndex {c_idx_opt}")
        elif opts[c_idx_opt] != quiz.get('correctOption'):
            errors.append(f"[{cid}] correctIndex {c_idx_opt} ('{opts[c_idx_opt]}') != correctOption ('{quiz.get('correctOption')}')")

    # Check scale
    scale = c.get('scale', [])
    if not scale or not isinstance(scale, list):
        errors.append(f"[{cid}] Missing or invalid scale list")
    else:
        for s_idx, s in enumerate(scale):
            if not s.get('word'):
                errors.append(f"[{cid}] scale[{s_idx}] missing word")
            if not s.get('note') or s.get('note') == 'undefined':
                errors.append(f"[{cid}] scale[{s_idx}] missing or undefined note")

    # Check verses
    for v_idx, v in enumerate(verses):
        html = v.get('html', '')
        if not html:
            errors.append(f"[{cid}] Verse {v_idx} missing html")
            continue
        
        # Check diff-token
        diff_tokens = re.findall(r'<span class="diff-token[^"]*">(.*?)</span>', html)
        if not diff_tokens:
            errors.append(f"[{cid}] Verse {v_idx} (ayah {v.get('ayah')}) has no diff-token highlights")
        
        # Check highlight ratio
        clean_text = re.sub(r'<[^>]+>', '', html).strip()
        highlighted_text = " ".join(diff_tokens).strip()
        clean_words = len(clean_text.split())
        hl_words = len(highlighted_text.split())
        ratio = hl_words / max(clean_words, 1)
        if ratio >= 0.70:
            errors.append(f"[{cid}] Verse {v_idx} (ayah {v.get('ayah')}) highlight ratio {ratio:.1%} >= 70% ({hl_words}/{clean_words} words)")

if errors:
    print(f"❌ Found {len(errors)} errors:")
    for err in errors:
        print("  -", err)
    sys.exit(1)
else:
    print(f"✅ PASSED: All {total_clusters} clusters and {total_verses} verses in Surah Al-Muzzammil are valid with surgical highlights (< 70%), 100% 4-option quizzes, and complete scale notes!")
