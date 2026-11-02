const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add muddaththir option to surahSelect
const targetOption = '<option value="muzzammil">سورة المزمل (11 موضعاً محققاً)</option>';
const newOption = '<option value="muzzammil">سورة المزمل (11 موضعاً محققاً)</option>\n                <option value="muddaththir">سورة المدثر (12 موضعاً محققاً)</option>';

if (!html.includes('value="muddaththir"')) {
    html = html.replace(targetOption, newOption);
    console.log('Added muddaththir option to surahSelect');
}

// 2. Add muddaththir to surahsData
const startMarker = 'const surahsData = {';
const startIdx = html.indexOf(startMarker);
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);

const code = html.substring(startIdx + 'const surahsData = '.length, endIdx).trim().replace(/;$/, '');
const surahsData = JSON.parse(code);

const muddaththirClusters = JSON.parse(fs.readFileSync('muddaththir_clusters.json', 'utf8'));

surahsData['muddaththir'] = {
    name: 'سورة المدثر',
    totalAyahs: 56,
    clusters: muddaththirClusters
};

console.log('Added surah muddaththir to surahsData with', muddaththirClusters.length, 'clusters');

const newSurahsDataJson = JSON.stringify(surahsData, null, 4);
html = html.substring(0, startIdx) + 'const surahsData = ' + newSurahsDataJson + ';\n\n        ' + html.substring(endIdx);

// 3. Update search isIntegrated check
html = html.replace(/const isIntegrated = qm\.surahNum <= \d+;[^\n]*/, 'const isIntegrated = qm.surahNum <= 74; // متاح حالياً حتى سورة المدثر (74)');

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Surah Al-Muddaththir successfully integrated into index.html!');
