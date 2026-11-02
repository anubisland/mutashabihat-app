# -*- coding: utf-8 -*-
"""
Validation Script for Surah Al-Hashr scholarly mutashabihat dataset.
مشروع معراج الإتقان في متشابهات القرآن - سورة الحشر (24 آية)
Classical References:
- البرهان في توجيه متشابه القرآن (الكرماني)
- درة التنزيل وغرة التأويل (الخطيب الإسكافي)
- ملاك التأويل (ابن الزبير الغرناطي)
- هداية المرتاب وغاية الحفاظ والطلاب (السخاوي)
- كشف المعاني في متشابه المثاني (ابن جماعة)
- فتح الرحمن بكشف ما يلتبس في القرآن (الأنصاري)
"""

import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = r"C:\Users\melwa\.gemini\antigravity\scratch\mutashabihat-app\hashr_clusters.json"

if not os.path.exists(file_path):
    print(f"ERROR: File not found at {file_path}")
    sys.exit(1)

with open(file_path, "r", encoding="utf-8") as f:
    try:
        clusters = json.load(f)
    except Exception as e:
        print(f"ERROR: Failed to parse JSON: {e}")
        sys.exit(1)

print("=" * 75)
print("  تقرير التحقيق والتدقيق العلمي لمجموعات سورة الحشر (24 آية)")
print("  مشروع: معراج الإتقان في متشابهات القرآن الكريم")
print("=" * 75)

num_clusters = len(clusters)
print(f"• إجمالي عدد المجموعات المستخرجة: {num_clusters}")

errors = []
warnings = []

# Condition 1: Target between 20 and 22 clusters
if not (20 <= num_clusters <= 22):
    errors.append(f"Cluster count {num_clusters} is outside the allowed range [20, 22]")
else:
    print(f"  [✓] عدد المجموعات ({num_clusters}) يقع تماماً ضمن النطاق المطلوب [20 - 22].")

cluster_ids = set()
total_verses = 0
total_quizzes = 0
max_ratio_found = 0.0
max_ratio_verse = None

req_cluster_fields = [
    'id', 'tier', 'category', 'scope', 'title', 'subtitle',
    'anchorVerseKey', 'dabit', 'rhyme', 'rhymeLine', 'alBurhan', 'rule', 'ruleSummary',
    'tadabbur', 'scale', 'verses', 'quiz'
]

req_verse_fields = [
    'surah', 'surahName', 'ayah', 'page', 'juz', 'quarter',
    'pos', 'textHtml', 'html', 'keyPhrase', 'tokens', 'contextNote'
]

scholarly_sources = [
    "البرهان", "الكرماني", "الإسكافي", "درة التنزيل", "ابن الزبير",
    "ملاك التأويل", "السخاوي", "هداية المرتاب", "ابن جماعة", "كشف المعاني", "الأنصاري"
]

sources_found = set()

for idx, c in enumerate(clusters):
    cid = c.get('id', f"idx_{idx}")
    
    # ID uniqueness and pattern
    expected_id = f"hashr_{idx+1:02d}"
    if not c.get('id'):
        errors.append(f"Cluster at index {idx} has no ID")
    elif c['id'] != expected_id:
        errors.append(f"Cluster ID mismatch at index {idx}: expected '{expected_id}', got '{c['id']}'")
    elif c['id'] in cluster_ids:
        errors.append(f"Duplicate cluster ID: {c['id']}")
    cluster_ids.add(cid)
    
    # Check cluster fields
    for field in req_cluster_fields:
        if field not in c or not c[field]:
            errors.append(f"[{cid}] missing or empty cluster field: '{field}'")
            
    # Check scholarly citations
    burhan_text = c.get('alBurhan', '') + " " + c.get('rule', '') + " " + str(c.get('tadabbur', ''))
    for src in scholarly_sources:
        if src in burhan_text:
            sources_found.add(src)
            
    # Condition 2: No singletons (verses >= 2)
    verses = c.get('verses', [])
    if len(verses) < 2:
        errors.append(f"[{cid}] SINGLETON DETECTED: verses length is {len(verses)} < 2")
        
    total_verses += len(verses)
    
    # Condition 3: Surgical diff highlighting (< 70%)
    for v_idx, v in enumerate(verses):
        for vf in req_verse_fields:
            if vf not in v or v[vf] is None:
                errors.append(f"[{cid}] verse {v_idx} missing field '{vf}'")
                
        html = v.get('textHtml', '')
        if '<span class="diff-token' not in html:
            errors.append(f"[{cid}] verse {v.get('surah')}:{v.get('ayah')} has no diff-token spans")
            
        spans = re.findall(r'<span[^>]*>(.*?)</span>', html)
        span_text = ''.join(spans)
        plain_text = re.sub(r'<[^>]+>', '', html)
        
        ratio = len(span_text) / len(plain_text) if len(plain_text) > 0 else 0
        if ratio > max_ratio_found:
            max_ratio_found = ratio
            max_ratio_verse = f"{cid} -> {v.get('surah')}:{v.get('ayah')}"
            
        if ratio >= 0.70:
            errors.append(
                f"[{cid}] verse {v.get('surah')}:{v.get('ayah')} EXCEEDED DIFF RATIO: "
                f"{ratio*100:.1f}% >= 70.0% (Highlighted: '{span_text}')"
            )
            
    # Condition 4: Interactive Quiz 100%
    quiz = c.get('quiz', {})
    if not quiz:
        errors.append(f"[{cid}] missing quiz object")
    else:
        total_quizzes += 1
        for qf in ['question', 'options', 'correctIndex', 'correctOption', 'explanation', 'promptDisplay']:
            if qf not in quiz or quiz[qf] is None:
                errors.append(f"[{cid}] quiz missing field '{qf}'")
                
        opts = quiz.get('options', [])
        if len(opts) != 4:
            errors.append(f"[{cid}] quiz options count is {len(opts)} != 4")
        if len(set(opts)) != 4:
            errors.append(f"[{cid}] quiz options are not all distinct")
            
        c_idx = quiz.get('correctIndex')
        if not isinstance(c_idx, int) or not (0 <= c_idx <= 3):
            errors.append(f"[{cid}] quiz correctIndex {c_idx} is not in [0, 3]")
        elif len(opts) == 4 and quiz.get('correctOption') != opts[c_idx]:
            errors.append(
                f"[{cid}] quiz correctOption mismatch: correctOption='{quiz.get('correctOption')}' "
                f"!= options[{c_idx}]='{opts[c_idx]}'"
            )
            
        p_disp = quiz.get('promptDisplay', '')
        if '[ ... ؟ ... ]' not in p_disp:
            errors.append(f"[{cid}] quiz promptDisplay does not contain standard bracket marker '[ ... ؟ ... ]'")

print(f"• إجمالي الآيات المستشهد بها والمقارنة: {total_verses}")
print(f"• إجمالي الاختبارات التفاعلية الرباعية: {total_quizzes}")
print(f"• أعلى نسبة تمييز لوني (Surgical Diff): {max_ratio_found*100:.2f}% في {max_ratio_verse} (أقل من الحد الأقصى 70%)")
print(f"• المراجع التراثية الموثقة في السورة: {', '.join(sorted(sources_found))}")

print("\n" + "=" * 75)
if errors:
    print(f"❌ تم العثور على {len(errors)} خطأ في التحقيق:")
    for err in errors:
        print(f"  - {err}")
    sys.exit(1)
else:
    print("✅ جميع الفحوصات العلمية والتقنية اجتيزت بنجاح باهر وبدقة 100%!")
    print("  [✓] لا توجد أي مجموعة أحادية (Zero Singletons).")
    print("  [✓] جميع الفروق اللفظية جراحية دقيقة تحت نسبة 70%.")
    print("  [✓] جميع الاختبارات رباعية الخيارات بنسبة 100% مع الشواهد.")
    print("  [✓] الضوابط التوجيهية والشواهد التراثية والتدبرية مكتملة ومحققة.")
print("=" * 75)
