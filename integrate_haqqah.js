const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add haqqah option to surahSelect
const targetOption = '<option value="qalam">سورة القلم (16 موضعاً محققاً)</option>';
const newOption = '<option value="qalam">سورة القلم (16 موضعاً محققاً)</option>\n                <option value="haqqah">سورة الحاقة (11 موضعاً محققاً)</option>';

if (!html.includes('value="haqqah"')) {
    html = html.replace(targetOption, newOption);
    console.log('Added haqqah option to surahSelect');
}

// 2. Add haqqah to surahsData
const startMarker = 'const surahsData = {';
const startIdx = html.indexOf(startMarker);
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);

const code = html.substring(startIdx + 'const surahsData = '.length, endIdx).trim().replace(/;$/, '');
const surahsData = JSON.parse(code);

const haqqahClusters = JSON.parse(fs.readFileSync('haqqah_clusters.json', 'utf8'));

surahsData['haqqah'] = {
    name: 'سورة الحاقة',
    totalAyahs: 52,
    clusters: haqqahClusters
};

console.log('Added surah haqqah to surahsData with', haqqahClusters.length, 'clusters');

const newSurahsDataJson = JSON.stringify(surahsData, null, 4);
html = html.substring(0, startIdx) + 'const surahsData = ' + newSurahsDataJson + ';\n\n        ' + html.substring(endIdx);

// 3. Update search isIntegrated check
html = html.replace(/const isIntegrated = qm\.surahNum <= 68;[^\n]*/, 'const isIntegrated = qm.surahNum <= 69; // متاح حالياً حتى سورة الحاقة (69)');

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Surah Al-Haqqah successfully integrated into index.html!');
