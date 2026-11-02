import json, re, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('taghabun_clusters.json', 'r', encoding='utf-8') as f:
    clusters = json.load(f)

with open('quran_cache.json', 'r', encoding='utf-8') as f:
    quran = json.load(f)

errors = []
total_clusters = len(clusters)
total_verses = 0

print(f"Validating Surah At-Taghabun: {total_clusters} clusters...")

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
            errors.append(f"[{cid}] correctOption does not match options[correctIndex]")
        
        prompt = quiz.get('promptDisplay', '')
        if '[ ... ؟ ... ]' not in prompt:
            errors.append(f"[{cid}] promptDisplay missing placeholder [ ... ؟ ... ]")

    # Check verses
    for v_idx, v in enumerate(verses):
        s_name = v.get('surah')
        ayah = v.get('ayah')
        txt = v.get('text', '')
        html = v.get('html', '')
        tokens = v.get('tokens', [])

        if not txt or not html:
            errors.append(f"[{cid} v{v_idx}] Empty text or html")

        # Check highlight ratio
        # Strip span tags to get highlight text
        spans = re.findall(r'<span[^>]*>(.*?)</span>', html)
        if not spans:
            errors.append(f"[{cid} v{v_idx}] No highlight span in html")
        else:
            highlighted_len = sum(len(s.split()) for s in spans)
            total_words = len(re.sub(r'<[^>]+>', '', html).split())
            ratio = highlighted_len / max(total_words, 1)
            if ratio >= 0.70:
                errors.append(f"[{cid} v{v_idx}] Highlight ratio {ratio:.2f} >= 70% in ayah {ayah} of {s_name}")

if errors:
    print(f"FAILED with {len(errors)} errors:")
    for e in errors:
        print("  -", e)
    sys.exit(1)
else:
    print(f"SUCCESS! All {total_clusters} clusters, {total_verses} verses, and quizzes passed 100%!")
