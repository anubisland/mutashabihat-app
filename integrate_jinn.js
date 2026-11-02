const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add jinn option to surahSelect
const targetOption = '<option value="nuh">سورة نوح (12 موضعاً محققاً)</option>';
const newOption = '<option value="nuh">سورة نوح (12 موضعاً محققاً)</option>\n                <option value="jinn">سورة الجن (12 موضعاً محققاً)</option>';

if (!html.includes('value="jinn"')) {
    html = html.replace(targetOption, newOption);
    console.log('Added jinn option to surahSelect');
}

// 2. Add jinn to surahsData
const startMarker = 'const surahsData = {';
const startIdx = html.indexOf(startMarker);
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker, startIdx);

const code = html.substring(startIdx + 'const surahsData = '.length, endIdx).trim().replace(/;$/, '');
const surahsData = JSON.parse(code);

const jinnClusters = JSON.parse(fs.readFileSync('jinn_clusters.json', 'utf8'));

surahsData['jinn'] = {
    name: 'سورة الجن',
    totalAyahs: 28,
    clusters: jinnClusters
};

console.log('Added surah jinn to surahsData with', jinnClusters.length, 'clusters');

const newSurahsDataJson = JSON.stringify(surahsData, null, 4);
html = html.substring(0, startIdx) + 'const surahsData = ' + newSurahsDataJson + ';\n\n        ' + html.substring(endIdx);

// 3. Update search isIntegrated check
html = html.replace(/const isIntegrated = qm\.surahNum <= \d+;[^\n]*/, 'const isIntegrated = qm.surahNum <= 72; // متاح حالياً حتى سورة الجن (72)');

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Surah Al-Jinn successfully integrated into index.html!');
