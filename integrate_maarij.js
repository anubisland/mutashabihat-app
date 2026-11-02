const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add maarij option to surahSelect
const targetOption = '<option value="haqqah">سورة الحاقة (11 موضعاً محققاً)</option>';
const newOption = '<option value="haqqah">سورة الحاقة (11 موضعاً محققاً)</option>\n                <option value="maarij">سورة المعارج (14 موضعاً محققاً)</option>';

if (!html.includes('value="maarij"')) {
    html = html.replace(targetOption, newOption);
    console.log('Added maarij option to surahSelect');
}

// 2. Add maarij to surahsData
const startMarker = 'const surahsData = {';
const startIdx = html.indexOf(startMarker);
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);

const code = html.substring(startIdx + 'const surahsData = '.length, endIdx).trim().replace(/;$/, '');
const surahsData = JSON.parse(code);

const maarijClusters = JSON.parse(fs.readFileSync('maarij_clusters.json', 'utf8'));

surahsData['maarij'] = {
    name: 'سورة المعارج',
    totalAyahs: 44,
    clusters: maarijClusters
};

console.log('Added surah maarij to surahsData with', maarijClusters.length, 'clusters');

const newSurahsDataJson = JSON.stringify(surahsData, null, 4);
html = html.substring(0, startIdx) + 'const surahsData = ' + newSurahsDataJson + ';\n\n        ' + html.substring(endIdx);

// 3. Update search isIntegrated check
html = html.replace(/const isIntegrated = qm\.surahNum <= \d+;[^\n]*/, 'const isIntegrated = qm.surahNum <= 70; // متاح حالياً حتى سورة المعارج (70)');

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Surah Al-Maarij successfully integrated into index.html!');
