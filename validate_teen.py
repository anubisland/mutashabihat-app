import json
import re

with open('teen_clusters.json', 'r', encoding='utf-8') as f:
    clusters = json.load(f)

print(f"Total clusters in At-Tin: {len(clusters)}")

errors = []
for i, cl in enumerate(clusters):
    cid = cl.get('id', f'cluster_{i}')
    if not cl.get('category'):
        errors.append(f"{cid}: Missing category")
    if not cl.get('rhyme'):
        errors.append(f"{cid}: Missing rhyme")
    if not cl.get('rule'):
        errors.append(f"{cid}: Missing rule")
    if not cl.get('dabit'):
        errors.append(f"{cid}: Missing dabit")
    if not cl.get('alBurhan'):
        errors.append(f"{cid}: Missing alBurhan")
    if not cl.get('tadabbur') or len(cl['tadabbur']) < 2:
        errors.append(f"{cid}: Tadabbur missing or less than 2 items")
    if not cl.get('scale') or len(cl['scale']) < 2:
        errors.append(f"{cid}: Scale missing or less than 2 items")
    
    quiz = cl.get('quiz', {})
    if not quiz.get('question') or len(quiz.get('options', [])) != 4 or len(set(quiz.get('options', []))) != 4:
        errors.append(f"{cid}: Quiz invalid or duplicate options")
        
    verses = cl.get('verses', [])
    if len(verses) < 2:
        errors.append(f"{cid}: Less than 2 verses")
        
    for j, v in enumerate(verses):
        for req in ['surah', 'surahKey', 'ayah', 'quarter', 'page', 'pos', 'tokens', 'text', 'html']:
            if not v.get(req):
                errors.append(f"{cid} verse {j}: Missing {req}")
        
        # Check highlight ratio
        plain_text = re.sub(r'[«»]', '', v.get('text', ''))
        total_words = len(plain_text.split())
        tokens_text = ' '.join(v.get('tokens', []))
        token_words = len(tokens_text.split())
        if total_words > 0:
            ratio = (token_words / total_words) * 100
            if ratio >= 70.0:
                errors.append(f"{cid} verse {j} ({v.get('surah')} {v.get('ayah')}): Highlight ratio {ratio:.1f}% >= 70%")

if errors:
    print(f"Found {len(errors)} errors:")
    for e in errors:
        print("  -", e)
    exit(1)
else:
    print("ALL 6 CLUSTERS IN AT-TIN VALIDATED 100% PERFECTLY! Zero errors.")
