const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add insan option to surahSelect
const targetOption = '<option value="qiyamah">سورة القيامة (12 موضعاً محققاً)</option>';
const newOption = '<option value="qiyamah">سورة القيامة (12 موضعاً محققاً)</option>\n                <option value="insan">سورة الإنسان (14 موضعاً محققاً)</option>';

if (!html.includes('value="insan"')) {
    html = html.replace(targetOption, newOption);
    console.log('Added insan option to surahSelect');
}

// 2. Add insan to surahsData
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

const insanClusters = JSON.parse(fs.readFileSync('insan_clusters.json', 'utf8'));

surahsData.insan = {
    name: 'سورة الإنسان',
    totalClusters: insanClusters.length,
    clusters: insanClusters
};

console.log(`Prepared surahsData.insan with ${insanClusters.length} clusters.`);

const newSurahsDataJson = JSON.stringify(surahsData, null, 4);
html = html.substring(0, startIdx) + 'const surahsData = ' + newSurahsDataJson + ';\n\n        ' + html.substring(endIdx);

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ Successfully integrated Surah Al-Insan into index.html!');
