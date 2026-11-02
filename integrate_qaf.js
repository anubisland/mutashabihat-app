const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const qafClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/qaf_scholarly_verified.json', 'utf8'));

const qafData = {
  name: "سورة ق",
  totalAyahs: 45,
  clusters: qafClusters
};

// 1. Add option to dropdown after hujurat
const hujuratOption = '<option value="hujurat">سورة الحجرات (17 موضعاً محققاً)</option>';
const qafOption = '\n                <option value="qaf">سورة ق (24 موضعاً محققاً)</option>';

if (html.includes(hujuratOption)) {
  if (!html.includes('value="qaf"')) {
    html = html.replace(hujuratOption, hujuratOption + qafOption);
    console.log('Added qaf to dropdown.');
  } else {
    console.log('qaf option already in dropdown.');
  }
} else {
  console.log('hujuratOption not found!');
}

// 2. Add qaf to surahsData
const endMarker = 'let currentSurah =';
const endIdx = html.indexOf(endMarker);
if (endIdx === -1) {
  console.error('FAIL: endMarker not found!');
  process.exit(1);
}

// Find the last closing `};` before `let currentSurah =`
const lastBraceIdx = html.lastIndexOf('};', endIdx);
if (lastBraceIdx === -1) {
  console.error('FAIL: lastBraceIdx not found!');
  process.exit(1);
}

const qafJsonStr = ',\n    "qaf": ' + JSON.stringify(qafData, null, 4);

// Check if qaf already in surahsData
if (!html.includes('"qaf": {')) {
  html = html.substring(0, lastBraceIdx) + qafJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted qaf into surahsData.');
} else {
  console.log('qaf already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Qaf into index.html!');
