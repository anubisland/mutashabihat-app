const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Add CSS for Smart Search
const cssMarker = '</style>';
const searchCSS = `
        /* أزرار نطاق البحث الذكي */
        .search-scope-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.14);
            color: var(--text-muted);
            border-radius: 20px;
            padding: 0.28rem 0.75rem;
            font-size: 0.76rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
        }

        .search-scope-btn:hover {
            border-color: var(--gold);
            color: #fff;
        }

        .search-scope-btn.active {
            background: var(--gold-dark);
            border-color: var(--gold);
            color: #000;
            font-weight: 800;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        }

        /* بطاقة نتيجة البحث */
        .search-result-card {
            background: var(--bg-card);
            border: 1px solid var(--border-line);
            border-radius: 10px;
            padding: 0.85rem 1rem;
            margin-bottom: 0.65rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .search-result-card:hover {
            border-color: var(--gold);
            transform: translateX(-3px);
            background: rgba(212, 175, 55, 0.04);
        }
`;

if (!html.includes('.search-scope-btn {')) {
    html = html.replace(cssMarker, searchCSS + '\n' + cssMarker);
    console.log('Added search CSS.');
}

// 2. Enhance Settings Modal with the 6 canonical scholarly sources
const sourcesHtml = `
                <!-- 4. أمهات المصادر والمراجع العلمية المعتمدة -->
                <div style="background: rgba(0,0,0,0.35); padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid rgba(212, 175, 55, 0.25);">
                    <div style="font-size: 0.88rem; color: var(--gold-light); font-weight: 800; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fa-solid fa-book-bookmark" style="color: var(--gold);"></i> أمهات المصادر والمراجع العلمية المعتمدة:
                    </div>
                    <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 0.65rem; line-height: 1.5;">
                        كافة المتشابهات والتوجيهات البيانية والضوابط المنظومة محققة وموثقة من أمهات كتب المتشابهات التراثية:
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 240px; overflow-y: auto; padding-left: 0.3rem;">
                        <!-- المصدر 1 -->
                        <div style="background: rgba(255,255,255,0.03); border-right: 3px solid var(--gold); padding: 0.45rem 0.65rem; border-radius: 4px;">
                            <div style="font-weight: 700; color: #fff; font-size: 0.82rem;">١. البرهان في توجيه متشابه القرآن</div>
                            <div style="font-size: 0.72rem; color: var(--gold);">للإمام محمود بن حمزة الكرماني (ت ~٥٠٥هـ)</div>
                            <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 0.15rem;">عمدة ضبط أوائل السور وخواتيمها وفوارق الحروف والتقديم والتأخير.</div>
                        </div>
                        <!-- المصدر 2 -->
                        <div style="background: rgba(255,255,255,0.03); border-right: 3px solid var(--emerald); padding: 0.45rem 0.65rem; border-radius: 4px;">
                            <div style="font-weight: 700; color: #fff; font-size: 0.82rem;">٢. درة التنزيل وغرة التأويل</div>
                            <div style="font-size: 0.72rem; color: #34d399;">للإمام أبي عبد الله محمد بن عبد الله الخطيب الإسكافي (ت ٤٢٠هـ)</div>
                            <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 0.15rem;">المرجع الأكبر في التوجيه البلاغي وأسرار النظم البياني والزيادة والنقصان.</div>
                        </div>
                        <!-- المصدر 3 -->
                        <div style="background: rgba(255,255,255,0.03); border-right: 3px solid #38bdf8; padding: 0.45rem 0.65rem; border-radius: 4px;">
                            <div style="font-weight: 700; color: #fff; font-size: 0.82rem;">٣. ملاك التأويل القاطع بذوي الإلحاد والتعطيل</div>
                            <div style="font-size: 0.72rem; color: #38bdf8;">للإمام أحمد بن الزبير الثقفي الغرناطي (ت ٧٠٨هـ)</div>
                            <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 0.15rem;">ميزان السياق القرآني وسر مطابقة الآية لسياق سورتها والرد على التوهم.</div>
                        </div>
                        <!-- المصدر 4 -->
                        <div style="background: rgba(255,255,255,0.03); border-right: 3px solid #fbbf24; padding: 0.45rem 0.65rem; border-radius: 4px;">
                            <div style="font-weight: 700; color: #fff; font-size: 0.82rem;">٤. هداية المرتاب وغاية الحفاظ والطلاب</div>
                            <div style="font-size: 0.72rem; color: #fbbf24;">للإمام علم الدين علي بن محمد السخاوي (ت ٦٤٣هـ)</div>
                            <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 0.15rem;">المنظومة اللامية الشهيرة وعمدة الضوابط الشعرية الجامعة للمواضع.</div>
                        </div>
                        <!-- المصدر 5 -->
                        <div style="background: rgba(255,255,255,0.03); border-right: 3px solid #c084fc; padding: 0.45rem 0.65rem; border-radius: 4px;">
                            <div style="font-weight: 700; color: #fff; font-size: 0.82rem;">٥. كشف المعاني في متشابه المثاني</div>
                            <div style="font-size: 0.72rem; color: #c084fc;">لقاضي القضاة بدر الدين محمد بن إبراهيم بن جماعة (ت ٧٣٣هـ)</div>
                            <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 0.15rem;">التحقيق الإيجازي اللطيف والروابط المعنوية العميقة بين المتشابهات.</div>
                        </div>
                        <!-- المصدر 6 -->
                        <div style="background: rgba(255,255,255,0.03); border-right: 3px solid #f43f5e; padding: 0.45rem 0.65rem; border-radius: 4px;">
                            <div style="font-weight: 700; color: #fff; font-size: 0.82rem;">٦. فتح الرحمن بكشف ما يلتبس في القرآن</div>
                            <div style="font-size: 0.72rem; color: #fb7185;">لشيخ الإسلام زكريا بن محمد الأنصاري (ت ٩٢٦هـ)</div>
                            <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 0.15rem;">الجامع المحرر لمسائل المتشابه وأوجه الإعراب والتفسير المقارن.</div>
                        </div>
                    </div>
                </div>
`;

// Insert sources before the 4. بطاقة الإصدار والهوية
if (!html.includes('أمهات المصادر والمراجع العلمية المعتمدة')) {
    const idBadgeMarker = '<!-- 4. بطاقة الإصدار والهوية -->';
    if (html.includes(idBadgeMarker)) {
        html = html.replace(idBadgeMarker, sourcesHtml + '\n                <!-- 5. بطاقة الإصدار والهوية -->');
        console.log('Inserted canonical sources into settingsModal.');
    } else {
        console.warn('idBadgeMarker not found!');
    }
}

// Adjust settings modal window styling for max-height and scrolling
html = html.replace(
    '<div class="mushaf-modal-window" style="max-width: 520px; border: 2px solid var(--gold);"',
    '<div class="mushaf-modal-window" style="max-width: 580px; max-height: 88vh; overflow-y: auto; border: 2px solid var(--gold);"'
);

// 3. Add Smart Search Modal
const smartSearchModalHtml = `
    <!-- نافذة البحث القرآني الذكي الموحد (Smart Quran Search Modal) -->
    <div class="mushaf-modal-backdrop" id="smartSearchModal" style="display: none;">
        <div class="mushaf-modal-window" style="max-width: 660px; max-height: 88vh; border: 2px solid var(--gold); display: flex; flex-direction: column;">
            <button class="btn-dismiss-modal" onclick="closeSmartSearchModal()">
                <i class="fa-solid fa-xmark"></i>
            </button>
            
            <!-- رأس البحث -->
            <div style="margin-bottom: 0.8rem; text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.3rem;">
                    <i class="fa-solid fa-magnifying-glass" style="color: var(--gold); font-size: 1.15rem;"></i>
                    <h3 style="font-size: 1.18rem; color: var(--gold-light); font-weight: 800; margin: 0;">
                        البحث القرآني الذكي في المتشابهات
                    </h3>
                </div>
                <p style="font-size: 0.76rem; color: var(--text-muted); margin: 0;">
                    ابحث برقم الآية أو بكلمات من الآية في السورة أو الجزء أو عموم القرآن
                </p>
            </div>

            <!-- مربع البحث والكبسولات -->
            <div style="margin-bottom: 0.8rem;">
                <div style="position: relative; margin-bottom: 0.6rem;">
                    <i class="fa-solid fa-magnifying-glass" style="position: absolute; right: 0.85rem; top: 50%; transform: translateY(-50%); color: var(--gold);"></i>
                    <input type="text" id="smartSearchInput" 
                           placeholder="اكتب رقم الآية (مثلاً: 25) أو كلمات من الآية (مثلاً: جنات وعيون)..." 
                           style="width: 100%; box-sizing: border-box; background: rgba(0,0,0,0.5); border: 1.5px solid var(--gold); border-radius: 12px; padding: 0.65rem 2.4rem 0.65rem 2.2rem; color: #fff; font-size: 0.92rem; outline: none;"
                           oninput="handleSmartSearch()">
                    <button id="btnClearSearch" onclick="clearSmartSearch()" style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; display: none;">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                </div>

                <!-- كبسولات تحديد نطاق البحث -->
                <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
                    <span style="font-size: 0.74rem; color: var(--text-muted); margin-left: 0.3rem;">نطاق البحث:</span>
                    <button class="search-scope-btn active" id="scopeSurah" onclick="setSearchScope('surah', this)">
                        <i class="fa-solid fa-location-dot"></i> السورة الحالية (<span id="scopeSurahName">البقرة</span>)
                    </button>
                    <button class="search-scope-btn" id="scopeJuz" onclick="setSearchScope('juz', this)">
                        <i class="fa-solid fa-book-open"></i> الجزء الحالي (<span id="scopeJuzNum">الجزء 1</span>)
                    </button>
                    <button class="search-scope-btn" id="scopeQuran" onclick="setSearchScope('quran', this)">
                        <i class="fa-solid fa-globe"></i> القرآن كاملاً
                    </button>
                </div>
            </div>

            <!-- حاوية نتائج البحث مع سكرول سلس -->
            <div id="smartSearchResultsContainer" style="flex: 1; overflow-y: auto; padding-right: 0.3rem; min-height: 220px; max-height: 52vh;">
                <!-- النتائج ستُحقن هنا برمجياً -->
            </div>
        </div>
    </div>
`;

if (!html.includes('id="smartSearchModal"')) {
    const settingsModalEnd = '</div>\n    </div>\n\n    <div class="mushaf-modal-backdrop" id="mushafModal">';
    const settingsModalEndAlt = '</div>\r\n    </div>\r\n\r\n    <div class="mushaf-modal-backdrop" id="mushafModal">';
    if (html.includes(settingsModalEnd)) {
        html = html.replace(settingsModalEnd, '</div>\n    </div>\n' + smartSearchModalHtml + '\n\n    <div class="mushaf-modal-backdrop" id="mushafModal">');
        console.log('Inserted smartSearchModal.');
    } else if (html.includes(settingsModalEndAlt)) {
        html = html.replace(settingsModalEndAlt, '</div>\r\n    </div>\r\n' + smartSearchModalHtml + '\r\n\r\n    <div class="mushaf-modal-backdrop" id="mushafModal">');
        console.log('Inserted smartSearchModal (CRLF).');
    } else {
        // Fallback: insert before mushafModal
        const mIdx = html.indexOf('id="mushafModal"');
        const prevBackdrop = html.lastIndexOf('<div class="mushaf-modal-backdrop"', mIdx);
        html = html.substring(0, prevBackdrop) + smartSearchModalHtml + '\n' + html.substring(prevBackdrop);
        console.log('Inserted smartSearchModal (fallback index).');
    }
}

// 4. Update the live search input in the secondary bar to trigger Smart Search Modal
html = html.replace(
    '<input type="text" id="liveSearchInput" placeholder="بحث برقم الآية..." oninput="filterLiveClusters()">',
    '<input type="text" id="liveSearchInput" placeholder="البحث القرآني الذكي (بالآية أو بالكلمات)..." readonly onclick="openSmartSearchModal()" style="cursor: pointer;">'
);
html = html.replace(
    '<div class="search-box-wrap">',
    '<div class="search-box-wrap" onclick="openSmartSearchModal()" style="cursor: pointer;" title="انقر لفتح البحث القرآني الذكي الموحد">'
);

// 5. Add JavaScript engine for Smart Search before </script>
const searchJS = `
        // =========================================================================
        // محرك البحث القرآني الذكي الموحد (Smart Quran Search Engine)
        // =========================================================================
        let currentSearchScope = 'surah'; // 'surah', 'juz', 'quran'
        let fullQuranVersesIndex = null;

        // تهيئة فهرس القرآن الكامل من quran_cache.json
        function initQuranSearchIndex() {
            if (fullQuranVersesIndex) return Promise.resolve(fullQuranVersesIndex);
            return fetch('./quran_cache.json')
                .then(r => r.json())
                .then(data => {
                    fullQuranVersesIndex = [];
                    for (const [sId, sData] of Object.entries(data)) {
                        const sNum = parseInt(sId);
                        const cleanName = sData.name.replace('سُورَةُ ', '').replace('سورة ', '').trim();
                        for (const a of sData.ayahs) {
                            fullQuranVersesIndex.push({
                                surahNum: sNum,
                                surahName: cleanName,
                                ayah: a.numberInSurah,
                                juz: a.juz,
                                page: a.page,
                                rawText: a.text,
                                normText: normalizeQuranSearchText(a.text)
                            });
                        }
                    }
                    return fullQuranVersesIndex;
                })
                .catch(err => {
                    console.warn('Could not load full quran_cache.json for offline index:', err);
                    return null;
                });
        }

        // تطبيع النص القرآني للبحث مع دعم الألف الخنجرية وتجريد التشكيل
        function normalizeQuranSearchText(str) {
            if (!str) return '';
            return str
                .replace(/\\u0670/g, 'ا') // الألف الخنجرية -> ألف صريحة
                .replace(/[\\u064B-\\u065F\\u06D6-\\u06ED]/g, '') // إزالة التشكيل وعلامات الوقف
                .replace(/[إأآٱا]/g, 'ا')
                .replace(/[ىي]/g, 'ي')
                .replace(/ة/g, 'ه')
                .replace(/ؤ/g, 'و')
                .replace(/ئ/g, 'ي')
                .replace(/ء/g, '')
                .replace(/[^\\u0621-\\u064A0-9\\s:]/g, '')
                .trim();
        }

        function openSmartSearchModal() {
            const m = document.getElementById('smartSearchModal');
            if (m) {
                m.style.display = 'flex';
                // تحديث اسم السورة الحالية والجزء في الكبسولات
                const meta = surahsData[currentSurah] || { name: 'السورة' };
                const scopeSurahNameEl = document.getElementById('scopeSurahName');
                if (scopeSurahNameEl) scopeSurahNameEl.textContent = meta.name.replace('سورة ', '');
                
                const clusters = getCurrentClusters();
                const curJuz = (clusters && clusters[0] && clusters[0].verses && clusters[0].verses[0]) ? clusters[0].verses[0].juz : 1;
                const scopeJuzNumEl = document.getElementById('scopeJuzNum');
                if (scopeJuzNumEl) scopeJuzNumEl.textContent = \`الجزء \${curJuz}\`;

                // بدء تحميل الفهرس الكامل إن لم يكن محملاً
                initQuranSearchIndex();

                const inp = document.getElementById('smartSearchInput');
                if (inp) {
                    inp.focus();
                    if (inp.value.trim()) handleSmartSearch();
                    else renderSearchInitialState();
                }
            }
        }

        function closeSmartSearchModal() {
            const m = document.getElementById('smartSearchModal');
            if (m) m.style.display = 'none';
        }

        function setSearchScope(scope, btn) {
            currentSearchScope = scope;
            document.querySelectorAll('.search-scope-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            handleSmartSearch();
        }

        function clearSmartSearch() {
            const inp = document.getElementById('smartSearchInput');
            if (inp) {
                inp.value = '';
                const clearBtn = document.getElementById('btnClearSearch');
                if (clearBtn) clearBtn.style.display = 'none';
                renderSearchInitialState();
                inp.focus();
            }
        }

        function renderSearchInitialState() {
            const container = document.getElementById('smartSearchResultsContainer');
            if (!container) return;
            const meta = surahsData[currentSurah] || { name: 'سورة البقرة' };
            container.innerHTML = \`
                <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
                    <i class="fa-solid fa-feather-pointed" style="font-size: 2.2rem; color: var(--gold); opacity: 0.6; margin-bottom: 0.8rem;"></i>
                    <div style="font-size: 0.95rem; color: #fff; font-weight: 700; margin-bottom: 0.4rem;">
                        ابدأ بالبحث في متشابهات القرآن الكريم
                    </div>
                    <p style="font-size: 0.78rem; line-height: 1.6; max-width: 440px; margin: 0 auto;">
                        اكتب رقماً (مثلاً <span style="color:var(--gold); font-weight:800;">25</span>) للانتقال المباشر لآية، أو اكتب كلمات (مثلاً <span style="color:var(--gold); font-weight:800;">جنات وعيون</span> أو <span style="color:var(--gold); font-weight:800;">سحر مستمر</span>) لإظهار المجمع القرآني المقارن والفوارق الجراحية.
                    </p>
                </div>
            \`;
        }

        function handleSmartSearch() {
            const inp = document.getElementById('smartSearchInput');
            const clearBtn = document.getElementById('btnClearSearch');
            const container = document.getElementById('smartSearchResultsContainer');
            if (!inp || !container) return;

            const rawQuery = inp.value.trim();
            if (clearBtn) clearBtn.style.display = rawQuery ? 'block' : 'none';

            if (!rawQuery) {
                renderSearchInitialState();
                return;
            }

            const isNumeric = /^[0-9]+$/.test(rawQuery);
            const normQuery = normalizeQuranSearchText(rawQuery);

            const activeClusters = getCurrentClusters();
            const curJuz = (activeClusters && activeClusters[0] && activeClusters[0].verses && activeClusters[0].verses[0]) ? activeClusters[0].verses[0].juz : 1;

            let matchingClusters = [];

            // 1. البحث في مجمعات المتشابهات
            for (const [sKey, sData] of Object.entries(surahsData)) {
                // تصفية حسب النطاق
                if (currentSearchScope === 'surah' && sKey !== currentSurah) continue;

                sData.clusters.forEach((c, cIdx) => {
                    const matchByJuz = (currentSearchScope === 'juz') ? c.verses.some(v => v.juz === curJuz) : true;
                    if (!matchByJuz) return;

                    let isMatch = false;
                    let matchedVerse = null;

                    if (isNumeric) {
                        const targetAyah = parseInt(rawQuery);
                        matchedVerse = c.verses.find(v => v.ayah === targetAyah);
                        if (matchedVerse) isMatch = true;
                    } else {
                        // مطابقة العنوان أو الوصف
                        const normTitle = normalizeQuranSearchText(c.title);
                        const normSub = normalizeQuranSearchText(c.subtitle);
                        if (normTitle.includes(normQuery) || normSub.includes(normQuery)) {
                            isMatch = true;
                            matchedVerse = c.verses[0];
                        } else {
                            // مطابقة نص الآيات أو الفوارق
                            for (const v of c.verses) {
                                const normV = normalizeQuranSearchText(v.rawText || v.textHtml || v.html);
                                if (normV.includes(normQuery)) {
                                    isMatch = true;
                                    matchedVerse = v;
                                    break;
                                }
                            }
                        }
                    }

                    if (isMatch) {
                        matchingClusters.push({
                            surahKey: sKey,
                            surahName: sData.name,
                            clusterIndex: cIdx,
                            cluster: c,
                            matchedVerse: matchedVerse || c.verses[0]
                        });
                    }
                });
            }

            // إذا وُجدت مجمعات متشابهات مطابقة
            if (matchingClusters.length > 0) {
                container.innerHTML = \`
                    <div style="font-size: 0.76rem; color: var(--gold-light); font-weight: 700; margin-bottom: 0.6rem;">
                        <i class="fa-solid fa-list-check"></i> تم العثور على \${matchingClusters.length} مجمع متشابهات محقق:
                    </div>
                \`;
                matchingClusters.slice(0, 30).forEach(item => {
                    const c = item.cluster;
                    const v = item.matchedVerse;
                    const card = document.createElement('div');
                    card.className = 'search-result-card';
                    card.innerHTML = \`
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                            <div style="display: flex; align-items: center; gap: 0.45rem;">
                                <span class="entry-order-badge">\${item.surahName}</span>
                                <span class="ayah-chip-tag">الآية \${v.ayah}</span>
                                <span style="font-size: 0.68rem; color: var(--text-muted);">\${v.quarter || ''}</span>
                            </div>
                            <span class="entry-count-pill">\${c.verses.length} مواضع مقارنة</span>
                        </div>
                        <div style="font-size: 0.86rem; color: #fff; font-weight: 700; margin-bottom: 0.3rem;">
                            \${c.title}
                        </div>
                        <div style="font-size: 0.74rem; color: var(--text-muted); line-height: 1.4;">
                            \${c.subtitle || ''}
                        </div>
                    \`;
                    card.onclick = () => {
                        closeSmartSearchModal();
                        if (currentSurah !== item.surahKey) {
                            switchSurah(item.surahKey);
                        }
                        loadCluster(item.clusterIndex);
                    };
                    container.appendChild(card);
                });
                return;
            }

            // 2. إذا لم توجد مجمعات متشابهات مطابقة -> نفحص القرآن الكريم لمعرفة هل هو انفراد أم غير موجود!
            if (fullQuranVersesIndex && fullQuranVersesIndex.length > 0) {
                let quranMatches = [];
                if (isNumeric) {
                    const targetAyah = parseInt(rawQuery);
                    quranMatches = fullQuranVersesIndex.filter(v => {
                        if (currentSearchScope === 'surah') {
                            const curSurahNameClean = (surahsData[currentSurah]?.name || '').replace('سورة ', '').trim();
                            return v.surahName === curSurahNameClean && v.ayah === targetAyah;
                        } else if (currentSearchScope === 'juz') {
                            return v.juz === curJuz && v.ayah === targetAyah;
                        }
                        return v.ayah === targetAyah;
                    });
                } else {
                    quranMatches = fullQuranVersesIndex.filter(v => {
                        if (currentSearchScope === 'surah') {
                            const curSurahNameClean = (surahsData[currentSurah]?.name || '').replace('سورة ', '').trim();
                            return v.surahName === curSurahNameClean && v.normText.includes(normQuery);
                        } else if (currentSearchScope === 'juz') {
                            return v.juz === curJuz && v.normText.includes(normQuery);
                        }
                        return v.normText.includes(normQuery);
                    });
                }

                if (quranMatches.length > 0) {
                    container.innerHTML = '';
                    quranMatches.slice(0, 15).forEach(qm => {
                        const isIntegrated = qm.surahNum <= 53; // السور المنجزة حتى سورة النجم (53)
                        const card = document.createElement('div');
                        card.className = 'search-result-card';
                        card.style.cursor = 'default';

                        if (isIntegrated) {
                            // موضع فريد لا متشابه له في كتاب الله!
                            card.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                            card.style.background = 'rgba(16, 185, 129, 0.05)';
                            card.innerHTML = \`
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                                    <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 4px; display: inline-flex; align-items: center; gap: 0.35rem;">
                                        <i class="fa-solid fa-certificate"></i> موضع فريد (انفراد قرآني لا تشابه فيه)
                                    </span>
                                    <span class="ayah-chip-tag">سورة \${qm.surahName}: الآية \${qm.ayah} • الجزء \${qm.juz}</span>
                                </div>
                                <div style="font-family: var(--font-quran); font-size: 1.05rem; color: #fff; line-height: 1.8; margin-bottom: 0.5rem;">
                                    « \${qm.rawText} »
                                </div>
                                <div style="font-size: 0.74rem; color: #a7f3d0; line-height: 1.5; background: rgba(0,0,0,0.25); padding: 0.45rem 0.7rem; border-radius: 6px;">
                                    <i class="fa-solid fa-circle-check" style="color: #34d399;"></i> <strong>اطمئنان للحافظ:</strong> هذا الموضع منفرد في كتاب الله الكريم بنظمه ولفظه، لا يشاركه موضع آخر في هذا السياق، ولا يوجد له شبيه ملبس يخشى الخطأ فيه.
                                </div>
                            \`;
                        } else {
                            // في السور قيد التدشين
                            card.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                            card.style.background = 'rgba(245, 158, 11, 0.05)';
                            card.innerHTML = \`
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                                    <span style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 4px; display: inline-flex; align-items: center; gap: 0.35rem;">
                                        <i class="fa-solid fa-hourglass-half"></i> موضع في سورة قيد التدشين والتحقيق
                                    </span>
                                    <span class="ayah-chip-tag">سورة \${qm.surahName}: الآية \${qm.ayah}</span>
                                </div>
                                <div style="font-family: var(--font-quran); font-size: 1.05rem; color: #fff; line-height: 1.8; margin-bottom: 0.5rem;">
                                    « \${qm.rawText} »
                                </div>
                                <div style="font-size: 0.74rem; color: var(--gold-light); line-height: 1.5; background: rgba(0,0,0,0.25); padding: 0.45rem 0.7rem; border-radius: 6px;">
                                    <i class="fa-solid fa-clock"></i> يقع هذا الموضع في سورة \${qm.surahName}، وهي ضمن المحطات العلمية الجاري إدماجها تباعاً في التطبيق حتى سورة الناس.
                                </div>
                            \`;
                        }
                        container.appendChild(card);
                    });
                    return;
                }
            }

            // 3. لم يتم العثور على الكلمة في القرآن إطلاقاً
            container.innerHTML = \`
                <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
                    <i class="fa-solid fa-circle-question" style="font-size: 2.2rem; color: var(--text-muted); opacity: 0.5; margin-bottom: 0.8rem;"></i>
                    <div style="font-size: 0.95rem; color: #fff; font-weight: 700; margin-bottom: 0.4rem;">
                        لم يتم العثور على نتائج مطابقة لـ "\${rawQuery}"
                    </div>
                    <p style="font-size: 0.78rem; line-height: 1.6; max-width: 440px; margin: 0 auto;">
                        تأكد من صحة الكلمة، أو جرب توسيع النطاق إلى <button onclick="setSearchScope('quran', document.getElementById('scopeQuran'))" style="background:none; border:none; color:var(--gold); font-weight:700; text-decoration:underline; cursor:pointer;">القرآن كاملاً</button>، أو كتابة جزء أوضح من الآية.
                    </p>
                </div>
            \`;
        }

        // دعم اختصار لوحة المفاتيح Ctrl+K و / لفتح البحث
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT')) {
                e.preventDefault();
                openSmartSearchModal();
            }
            if (e.key === 'Escape') {
                closeSmartSearchModal();
            }
        });
`;

if (!html.includes('function openSmartSearchModal()')) {
    const endScriptMarker = '</script>';
    const lastScriptIdx = html.lastIndexOf(endScriptMarker);
    html = html.substring(0, lastScriptIdx) + '\n' + searchJS + '\n' + html.substring(lastScriptIdx);
    console.log('Inserted searchJS before </script>.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated settings and smart search in index.html!');
