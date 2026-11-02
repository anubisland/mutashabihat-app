const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add muzzammil option to surahSelect
const targetOption = '<option value="jinn">سورة الجن (12 موضعاً محققاً)</option>';
const newOption = '<option value="jinn">سورة الجن (12 موضعاً محققاً)</option>\n                <option value="muzzammil">سورة المزمل (11 موضعاً محققاً)</option>';

if (!html.includes('value="muzzammil"')) {
    html = html.replace(targetOption, newOption);
    console.log('Added muzzammil option to surahSelect');
}

// 2. Add muzzammil to surahsData
const startMarker = 'const surahsData = {';
const startIdx = html.indexOf(startMarker);
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);

const code = html.substring(startIdx + 'const surahsData = '.length, endIdx).trim().replace(/;$/, '');
const surahsData = JSON.parse(code);

const muzzammilClusters = JSON.parse(fs.readFileSync('muzzammil_clusters.json', 'utf8'));

surahsData['muzzammil'] = {
    name: 'سورة المزمل',
    totalAyahs: 20,
    clusters: muzzammilClusters
};

console.log('Added surah muzzammil to surahsData with', muzzammilClusters.length, 'clusters');

const newSurahsDataJson = JSON.stringify(surahsData, null, 4);
html = html.substring(0, startIdx) + 'const surahsData = ' + newSurahsDataJson + ';\n\n        ' + html.substring(endIdx);

// 3. Update search isIntegrated check
html = html.replace(/const isIntegrated = qm\.surahNum <= \d+;[^\n]*/, 'const isIntegrated = qm.surahNum <= 73; // متاح حالياً حتى سورة المزمل (73)');

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Surah Al-Muzzammil successfully integrated into index.html!');
