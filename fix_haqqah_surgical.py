import json, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('haqqah_clusters.json', 'r', encoding='utf-8') as f:
    clusters = json.load(f)

for c in clusters:
    cid = c['id']

    if cid == 'haqqah_01':
        c['verses'] = [
            {
                "surah": "الحاقة",
                "ayah": "1 - 3",
                "quarter": "الحزب 57 • الربع 1",
                "page": 566,
                "pos": "بداية السورة",
                "tokens": ["ٱلْحَآقَّةُ"],
                "html": "<span class=\"diff-token token-cyan token-a\">ٱلْحَآقَّةُ</span> ﴿١﴾ مَا ٱلْحَآقَّةُ ﴿٢﴾ وَمَآ أَدْرَىٰكَ مَا ٱلْحَآقَّةُ ﴿٣﴾"
            },
            {
                "surah": "القارعة",
                "ayah": "1 - 3",
                "quarter": "الحزب 60 • الربع 7",
                "page": 600,
                "pos": "بداية السورة",
                "tokens": ["ٱلْقَارِعَةُ"],
                "html": "<span class=\"diff-token token-emerald token-b\">ٱلْقَارِعَةُ</span> ﴿١﴾ مَا ٱلْقَارِعَةُ ﴿٢﴾ وَمَآ أَدْرَىٰكَ مَا ٱلْقَارِعَةُ ﴿٣﴾"
            }
        ]

    elif cid == 'haqqah_05':
        c['verses'] = [
            {
                "surah": "الحاقة",
                "ayah": "21 - 22",
                "quarter": "الحزب 57 • الربع 1",
                "page": 567,
                "pos": "وسط الصفحة",
                "tokens": ["رَّاضِيَةٍۢ", "عَالِيَةٍۢ"],
                "html": "فَهُوَ فِى عِيشَةٍۢ <span class=\"diff-token token-cyan token-a\">رَّاضِيَةٍۢ</span> ﴿٢١﴾ فِى جَنَّةٍ <span class=\"diff-token token-cyan token-a\">عَالِيَةٍۢ</span> ﴿٢٢﴾"
            },
            {
                "surah": "القارعة",
                "ayah": "6 - 7",
                "quarter": "الحزب 60 • الربع 7",
                "page": 600,
                "pos": "منتصف السورة",
                "tokens": ["رَّاضِيَةٍۢ"],
                "html": "فَأَمَّا مَن ثَقُلَتْ مَوَٰزِينُهُۥ ﴿٦﴾ فَهُوَ فِى عِيشَةٍۢ <span class=\"diff-token token-cyan token-a\">رَّاضِيَةٍۢ</span> ﴿٧﴾"
            },
            {
                "surah": "الغاشية",
                "ayah": "8 - 10",
                "quarter": "الحزب 59 • الربع 8",
                "page": 592,
                "pos": "منتصف السورة",
                "tokens": ["عَالِيَةٍۢ"],
                "html": "وُجُوهٌۭ يَوْمَئِذٍۢ نَّاعِمَةٌۭ ﴿٨﴾ لِّسَعْيِهَا رَاضِيَةٌۭ ﴿٩﴾ فِى جَنَّةٍ <span class=\"diff-token token-emerald token-b\">عَالِيَةٍۢ</span> ﴿١٠﴾"
            }
        ]

    elif cid == 'haqqah_09':
        c['verses'] = [
            {
                "surah": "الحاقة",
                "ayah": "38 - 40",
                "quarter": "الحزب 57 • الربع 2",
                "page": 568,
                "pos": "منتصف الصفحة",
                "tokens": ["رَسُولٍۢ كَرِيمٍۢ"],
                "html": "فَلَآ أُقْسِمُ بِمَا تُبْصِرُونَ ﴿٣٨﴾ وَمَا لَا تُبْصِرُونَ ﴿٣٩﴾ إِنَّهُۥ لَقَوْلُ <span class=\"diff-token token-cyan token-a\">رَسُولٍۢ كَرِيمٍۢ</span> ﴿٤٠﴾"
            },
            {
                "surah": "الحاقة",
                "ayah": 41,
                "quarter": "الحزب 57 • الربع 2",
                "page": 568,
                "pos": "وسط الصفحة",
                "tokens": ["وَمَا هُوَ بِقَوْلِ شَاعِرٍۢ"],
                "html": "<span class=\"diff-token token-cyan token-a\">وَمَا هُوَ بِقَوْلِ شَاعِرٍۢ</span> ۚ قَلِيلًۭا مَّا تُؤْمِنُونَ"
            },
            {
                "surah": "الحاقة",
                "ayah": 42,
                "quarter": "الحزب 57 • الربع 2",
                "page": 568,
                "pos": "وسط الصفحة",
                "tokens": ["وَلَا بِقَوْلِ كَاهِنٍۢ"],
                "html": "<span class=\"diff-token token-cyan token-a\">وَلَا بِقَوْلِ كَاهِنٍۢ</span> ۚ قَلِيلًۭا مَّا تَذَكَّرُونَ"
            },
            {
                "surah": "التكوير",
                "ayah": "19 - 21",
                "quarter": "الحزب 59 • الربع 4",
                "page": 586,
                "pos": "منتصف السورة",
                "tokens": ["رَسُولٍۢ كَرِيمٍۢ"],
                "html": "إِنَّهُۥ لَقَوْلُ <span class=\"diff-token token-emerald token-b\">رَسُولٍۢ كَرِيمٍۢ</span> ﴿١٩﴾ ذِى قُوَّةٍ عِندَ ذِى ٱلْعَرْشِ مَكِينٍۢ ﴿٢٠﴾ مُّطَاعٍۢ ثَمَّ أَمِينٍۢ ﴿٢١﴾"
            }
        ]

    elif cid == 'haqqah_10':
        c['verses'] = [
            {
                "surah": "الحاقة",
                "ayah": "42 - 43",
                "quarter": "الحزب 57 • الربع 2",
                "page": 568,
                "pos": "أسفل الصفحة",
                "tokens": ["تَنزِيلٌۭ مِّن رَّبِّ ٱلْعَـٰلَمِينَ"],
                "html": "وَلَا بِقَوْلِ كَاهِنٍۢ ۚ قَلِيلًۭا مَّا تَذَكَّرُونَ ﴿٤٢﴾ <span class=\"diff-token token-cyan token-a\">تَنزِيلٌۭ مِّن رَّبِّ ٱلْعَـٰلَمِينَ</span> ﴿٤٣﴾"
            },
            {
                "surah": "الواقعة",
                "ayah": "79 - 80",
                "quarter": "الحزب 54 • الربع 3",
                "page": 537,
                "pos": "أسفل الصفحة",
                "tokens": ["تَنزِيلٌۭ مِّن رَّبِّ ٱلْعَـٰلَمِينَ"],
                "html": "لَّا يَمَسُّهُۥٓ إِلَّا ٱلْمُطَهَّرُونَ ﴿٧٩﴾ <span class=\"diff-token token-cyan token-a\">تَنزِيلٌۭ مِّن رَّبِّ ٱلْعَـٰلَمِينَ</span> ﴿٨٠﴾"
            }
        ]

    elif cid == 'haqqah_11':
        c['verses'] = [
            {
                "surah": "الحاقة",
                "ayah": "51 - 52",
                "quarter": "الحزب 57 • الربع 2",
                "page": 568,
                "pos": "خاتمة السورة",
                "tokens": ["وَإِنَّهُۥ لَحَقُّ ٱلْيَقِينِ"],
                "html": "<span class=\"diff-token token-cyan token-a\">وَإِنَّهُۥ لَحَقُّ ٱلْيَقِينِ</span> ﴿٥١﴾ فَسَبِّحْ بِٱسْمِ رَبِّكَ ٱلْعَظِيمِ ﴿٥٢﴾"
            },
            {
                "surah": "الواقعة",
                "ayah": "95 - 96",
                "quarter": "الحزب 54 • الربع 4",
                "page": 537,
                "pos": "خاتمة السورة",
                "tokens": ["إِنَّ هَـٰذَا لَهُوَ حَقُّ ٱلْيَقِينِ"],
                "html": "<span class=\"diff-token token-emerald token-b\">إِنَّ هَـٰذَا لَهُوَ حَقُّ ٱلْيَقِينِ</span> ﴿٩٥﴾ فَسَبِّحْ بِٱسْمِ رَبِّكَ ٱلْعَظِيمِ ﴿٩٦﴾"
            }
        ]

with open('haqqah_clusters.json', 'w', encoding='utf-8') as f:
    json.dump(clusters, f, ensure_ascii=False, indent=2)

print("✅ haqqah_clusters.json updated successfully!")
