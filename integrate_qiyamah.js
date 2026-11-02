const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add qiyamah option to surahSelect
const targetOption = '<option value="muddaththir">سورة المدثر (12 موضعاً محققاً)</option>';
const newOption = '<option value="muddaththir">سورة المدثر (12 موضعاً محققاً)</option>\n                <option value="qiyamah">سورة القيامة (12 موضعاً محققاً)</option>';

if (!html.includes('value="qiyamah"')) {
    html = html.replace(targetOption, newOption);
    console.log('Added qiyamah option to surahSelect');
}

// 2. Add qiyamah to surahsData
const startMarker = 'const surahsData = {';
const startIdx = html.indexOf(startMarker);
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);

const code = html.substring(startIdx + 'const surahsData = '.length, endIdx).trim().replace(/;$/, '');
const surahsData = JSON.parse(code);

const qiyamahClusters = JSON.parse(fs.readFileSync('qiyamah_clusters.json', 'utf8'));

surahsData['qiyamah'] = {
    name: 'سورة القيامة',
    totalAyahs: 40,
    clusters: qiyamahClusters
};

console.log('Added surah qiyamah to surahsData with', qiyamahClusters.length, 'clusters');

const newSurahsDataJson = JSON.stringify(surahsData, null, 4);
html = html.substring(0, startIdx) + 'const surahsData = ' + newSurahsDataJson + ';\n\n        ' + html.substring(endIdx);

// 3. Update search isIntegrated check
html = html.replace(/const isIntegrated = qm\.surahNum <= \d+;[^\n]*/, 'const isIntegrated = qm.surahNum <= 75; // متاح حالياً حتى سورة القيامة (75)');

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Surah Al-Qiyamah successfully integrated into index.html!');
