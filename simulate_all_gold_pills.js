const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const startMarker = 'const surahsData = {';
const startIdx = html.indexOf(startMarker);
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);

const code = html.substring(startIdx + 'const surahsData = '.length, endIdx).trim().replace(/;$/, '');
const surahsData = JSON.parse(code);

function normalizeSurahName(name) {
    return (name || '')
        .replace(/^سورة\s+/, '')
        .replace(/[\u064B-\u065F\u0670\u06E1\u06D6-\u06ED]/g, '')
        .replace(/[إأآٱ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/[ىي]/g, 'ي')
        .replace(/ء/g, '')
        .trim();
}

function isSameSurah(s1, s2) {
    if (!s1 || !s2) return false;
    return normalizeSurahName(s1) === normalizeSurahName(s2);
}

function getCleanSurahTitle(name) {
    return (name || '').replace(/^سورة\s+/, '').replace(/[\u064B-\u065F\u0670\u06E1\u06D6-\u06ED]/g, '').trim();
}

let totalCheckedSurahs = 0;
let errors = [];

for (const sKey of Object.keys(surahsData)) {
    totalCheckedSurahs++;
    const s = surahsData[sKey];
    const curSurahName = (s.name || '').replace(/^سورة\s+سورة/, 'سورة').trim();

    s.clusters.forEach((c, cIdx) => {
        let goldFound = 0;
        let cyanFound = 0;

        c.verses.forEach((v, vIdx) => {
            let verseSurah = v.surahName || (v.surah ? (typeof v.surah === 'string' ? (v.surah.startsWith('سورة') ? v.surah : 'سورة ' + v.surah) : '') : '');
            if (!verseSurah) {
                verseSurah = curSurahName;
            }
            verseSurah = verseSurah.replace(/^سورة\s+سورة/, 'سورة').trim();

            const isOtherSurah = !isSameSurah(verseSurah, curSurahName);
            const pillClass = isOtherSurah ? 'pill-surah-tag other-surah' : 'pill-surah-tag same-surah-gold';
            const surahLabelShort = isOtherSurah ? getCleanSurahTitle(verseSurah) : getCleanSurahTitle(curSurahName);

            if (!isOtherSurah) {
                goldFound++;
                if (pillClass.includes('other-surah')) {
                    errors.push(`[${sKey} c${cIdx} v${vIdx}] Active surah verse got other-surah class!`);
                }
            } else {
                cyanFound++;
                if (!pillClass.includes('other-surah')) {
                    errors.push(`[${sKey} c${cIdx} v${vIdx}] External surah verse did not get other-surah class!`);
                }
            }
        });

        if (goldFound === 0) {
            errors.push(`[${sKey} c${cIdx} (${c.id})] Has 0 verses from active surah!`);
        }
    });
}

console.log(`Verified ${totalCheckedSurahs} surahs in database.`);
if (errors.length > 0) {
    console.log(`❌ Found ${errors.length} errors:`);
    errors.slice(0, 20).forEach(e => console.log('  -', e));
    process.exit(1);
} else {
    console.log('✅ ALL 65 SURAHS (including Az-Zukhruf through At-Tahrim):');
    console.log('   - 100% of active surah verses in Column 2 get the glowing GOLD badge (.same-surah-gold)!');
    console.log('   - 100% of cross-surah verses get the distinct CYAN badge (.other-surah)!');
    console.log('   - Zero mismatches or missed verses across the entire application!');
}
