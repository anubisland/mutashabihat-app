const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add nuh option to surahSelect
const targetOption = '<option value="maarij">سورة المعارج (14 موضعاً محققاً)</option>';
const newOption = '<option value="maarij">سورة المعارج (14 موضعاً محققاً)</option>\n                <option value="nuh">سورة نوح (12 موضعاً محققاً)</option>';

if (!html.includes('value="nuh"')) {
    html = html.replace(targetOption, newOption);
    console.log('Added nuh option to surahSelect');
}

// 2. Add nuh to surahsData
const startMarker = 'const surahsData = {';
const startIdx = html.indexOf(startMarker);
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);

const code = html.substring(startIdx + 'const surahsData = '.length, endIdx).trim().replace(/;$/, '');
const surahsData = JSON.parse(code);

const nuhClusters = JSON.parse(fs.readFileSync('nuh_clusters.json', 'utf8'));

surahsData['nuh'] = {
    name: 'سورة نوح',
    totalAyahs: 28,
    clusters: nuhClusters
};

console.log('Added surah nuh to surahsData with', nuhClusters.length, 'clusters');

const newSurahsDataJson = JSON.stringify(surahsData, null, 4);
html = html.substring(0, startIdx) + 'const surahsData = ' + newSurahsDataJson + ';\n\n        ' + html.substring(endIdx);

// 3. Update search isIntegrated check
html = html.replace(/const isIntegrated = qm\.surahNum <= \d+;[^\n]*/, 'const isIntegrated = qm.surahNum <= 71; // متاح حالياً حتى سورة نوح (71)');

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Surah Nuh successfully integrated into index.html!');
