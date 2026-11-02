const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const najmClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/najm_scholarly_verified.json', 'utf8'));

const najmData = {
  name: "سورة النجم",
  totalAyahs: 62,
  clusters: najmClusters
};

// 1. Add option to dropdown after tur
const turOption = '<option value="tur">سورة الطور (20 موضعاً محققاً)</option>';
const najmOption = '\n                <option value="najm">سورة النجم (20 موضعاً محققاً)</option>';

if (html.includes(turOption)) {
  if (!html.includes('value="najm"')) {
    html = html.replace(turOption, turOption + najmOption);
    console.log('Added najm to dropdown after tur.');
  } else {
    console.log('najm option already in dropdown.');
  }
} else {
  console.log('turOption not found!');
}

// 2. Add najm to surahsData
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

const najmJsonStr = ',\n    "najm": ' + JSON.stringify(najmData, null, 4);

// Check if najm already in surahsData
if (!html.includes('"najm": {')) {
  html = html.substring(0, lastBraceIdx) + najmJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted najm into surahsData.');
} else {
  console.log('najm already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah An-Najm into index.html!');
