import json
import re

surahs = [
    ('adiyat_clusters.json', 'Al-Adiyat', 4),
    ('qariah_clusters.json', 'Al-Qariah', 4),
    ('takathur_clusters.json', 'At-Takathur', 4),
    ('asr_clusters.json', 'Al-Asr', 2),
    ('humazah_clusters.json', 'Al-Humazah', 4)
]

all_errors = []
total_clusters = 0

for filename, name, expected_count in surahs:
    with open(filename, 'r', encoding='utf-8') as f:
        clusters = json.load(f)
    
    total_clusters += len(clusters)
    print(f"{name}: {len(clusters)} clusters (expected {expected_count})")
    if len(clusters) != expected_count:
        all_errors.append(f"{name}: Count mismatch {len(clusters)} != {expected_count}")
        
    for i, cl in enumerate(clusters):
        cid = cl.get('id', f'cluster_{i}')
        if not cl.get('category'): all_errors.append(f"{cid}: Missing category")
        if not cl.get('rhyme'): all_errors.append(f"{cid}: Missing rhyme")
        if not cl.get('rule'): all_errors.append(f"{cid}: Missing rule")
        if not cl.get('dabit'): all_errors.append(f"{cid}: Missing dabit")
        if not cl.get('alBurhan'): all_errors.append(f"{cid}: Missing alBurhan")
        if not cl.get('tadabbur') or len(cl['tadabbur']) < 2: all_errors.append(f"{cid}: Missing tadabbur")
        if not cl.get('scale') or len(cl['scale']) < 2: all_errors.append(f"{cid}: Missing scale")
        
        quiz = cl.get('quiz', {})
        if not quiz.get('question') or len(quiz.get('options', [])) != 4 or len(set(quiz.get('options', []))) != 4:
            all_errors.append(f"{cid}: Quiz invalid or duplicate options")
            
        verses = cl.get('verses', [])
        if len(verses) < 2:
            all_errors.append(f"{cid}: Less than 2 verses")
            
        for j, v in enumerate(verses):
            for req in ['surah', 'surahKey', 'ayah', 'quarter', 'page', 'pos', 'tokens', 'text', 'html']:
                if not v.get(req): all_errors.append(f"{cid} v{j}: Missing {req}")
                
            plain_text = re.sub(r'[«»]', '', v.get('text', ''))
            total_words = len(plain_text.split())
            tokens_text = ' '.join(v.get('tokens', []))
            token_words = len(tokens_text.split())
            if total_words > 0:
                ratio = (token_words / total_words) * 100
                if ratio >= 70.0:
                    all_errors.append(f"{cid} v{j} ({v.get('surah')} {v.get('ayah')}): Highlight ratio {ratio:.1f}% >= 70%")

if all_errors:
    print(f"\nFOUND {len(all_errors)} ERRORS:")
    for e in all_errors:
        print("  -", e)
    exit(1)
else:
    print(f"\nALL {total_clusters} CLUSTERS IN SURAHS 100-104 VALIDATED 100% PERFECTLY! Zero errors.")
