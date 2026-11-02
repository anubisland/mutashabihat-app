const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const turClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/tur_scholarly_verified.json', 'utf8'));

const turData = {
  name: "سورة الطور",
  totalAyahs: 49,
  clusters: turClusters
};

// 1. Add option to dropdown after dhariyat
const dhariyatOption = '<option value="dhariyat">سورة الذاريات (22 موضعاً محققاً)</option>';
const turOption = '\n                <option value="tur">سورة الطور (20 موضعاً محققاً)</option>';

if (html.includes(dhariyatOption)) {
  if (!html.includes('value="tur"')) {
    html = html.replace(dhariyatOption, dhariyatOption + turOption);
    console.log('Added tur to dropdown after dhariyat.');
  } else {
    console.log('tur option already in dropdown.');
  }
} else {
  console.log('dhariyatOption not found!');
}

// 2. Add tur to surahsData
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

const turJsonStr = ',\n    "tur": ' + JSON.stringify(turData, null, 4);

// Check if tur already in surahsData
if (!html.includes('"tur": {')) {
  html = html.substring(0, lastBraceIdx) + turJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted tur into surahsData.');
} else {
  console.log('tur already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah At-Tur into index.html!');
