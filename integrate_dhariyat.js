const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const dhariyatClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/dhariyat_scholarly_verified.json', 'utf8'));

const dhariyatData = {
  name: "سورة الذاريات",
  totalAyahs: 60,
  clusters: dhariyatClusters
};

// 1. Add option to dropdown after qaf
const qafOption = '<option value="qaf">سورة ق (24 موضعاً محققاً)</option>';
const dhariyatOption = '\n                <option value="dhariyat">سورة الذاريات (22 موضعاً محققاً)</option>';

if (html.includes(qafOption)) {
  if (!html.includes('value="dhariyat"')) {
    html = html.replace(qafOption, qafOption + dhariyatOption);
    console.log('Added dhariyat to dropdown.');
  } else {
    console.log('dhariyat option already in dropdown.');
  }
} else {
  console.log('qafOption not found!');
}

// 2. Add dhariyat to surahsData
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

const dhariyatJsonStr = ',\n    "dhariyat": ' + JSON.stringify(dhariyatData, null, 4);

// Check if dhariyat already in surahsData
if (!html.includes('"dhariyat": {')) {
  html = html.substring(0, lastBraceIdx) + dhariyatJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted dhariyat into surahsData.');
} else {
  console.log('dhariyat already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Adh-Dhariyat into index.html!');
