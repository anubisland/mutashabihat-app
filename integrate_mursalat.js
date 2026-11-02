const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add mursalat option to surahSelect
const targetOption = '<option value="insan">سورة الإنسان (14 موضعاً محققاً)</option>';
const newOption = '<option value="insan">سورة الإنسان (14 موضعاً محققاً)</option>\n                <option value="mursalat">سورة المرسلات (12 موضعاً محققاً)</option>';

if (!html.includes('value="mursalat"')) {
    html = html.replace(targetOption, newOption);
    console.log('Added mursalat option to surahSelect');
}

// 2. Add mursalat to surahsData
const startMarker = 'const surahsData = {';
const startIdx = html.indexOf(startMarker);
if (startIdx === -1) {
    console.error('Could not find const surahsData = {');
    process.exit(1);
}

// Find the end of surahsData object
let depth = 0;
let endIdx = -1;
for (let i = startIdx + startMarker.length - 1; i < html.length; i++) {
    if (html[i] === '{') depth++;
    else if (html[i] === '}') {
        depth--;
        if (depth === 0) {
            endIdx = i + 1;
            break;
        }
    }
}

const surahsDataCode = html.substring(startIdx + 'const surahsData = '.length, endIdx);
const surahsData = eval('(' + surahsDataCode + ')');

const mursalatClusters = JSON.parse(fs.readFileSync('mursalat_clusters.json', 'utf8'));

surahsData.mursalat = {
    name: 'سورة المرسلات',
    totalClusters: mursalatClusters.length,
    clusters: mursalatClusters
};

console.log(`Prepared surahsData.mursalat with ${mursalatClusters.length} clusters.`);

const newSurahsDataJson = JSON.stringify(surahsData, null, 4);
html = html.substring(0, startIdx) + 'const surahsData = ' + newSurahsDataJson + ';\n\n        ' + html.substring(endIdx);

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Successfully integrated Surah Al-Mursalat into index.html!');
