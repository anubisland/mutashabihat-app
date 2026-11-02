const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const jumuahClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/jumuah_clusters.json', 'utf8'));

const jumuahData = {
  name: "سورة الجمعة",
  totalAyahs: 11,
  clusters: jumuahClusters
};

// 1. Add option to dropdown after saff
const saffOption = 'value="saff"';
const jumuahOption = '\n                <option value="jumuah">سورة الجمعة (20 موضعاً محققاً)</option>';

if (html.includes(saffOption)) {
  if (!html.includes('value="jumuah"')) {
    const saffIdx = html.indexOf(saffOption);
    const closingTag = '</option>';
    const closeIdx = html.indexOf(closingTag, saffIdx);
    if (closeIdx !== -1) {
      const insertAt = closeIdx + closingTag.length;
      html = html.substring(0, insertAt) + jumuahOption + html.substring(insertAt);
      console.log('Added jumuah to dropdown after saff.');
    } else {
      console.error('Could not find </option> after value="saff"');
    }
  } else {
    console.log('jumuah option already in dropdown.');
  }
} else {
  console.log('saff option not found in dropdown!');
}

// 2. Add jumuah to surahsData
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

const jumuahJsonStr = ',\n    "jumuah": ' + JSON.stringify(jumuahData, null, 4);

// Check if jumuah already in surahsData
if (!html.includes('"jumuah": {')) {
  html = html.substring(0, lastBraceIdx) + jumuahJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted jumuah into surahsData.');
} else {
  console.log('jumuah already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Jumu\'ah into index.html!');
