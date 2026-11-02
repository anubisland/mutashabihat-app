const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const hadidClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/hadid_clusters.json', 'utf8'));

const hadidData = {
  name: "سورة الحديد",
  totalAyahs: 29,
  clusters: hadidClusters
};

// 1. Add option to dropdown after waqiah
const waqiahOption = 'value="waqiah"';
const hadidOption = '\n                <option value="hadid">سورة الحديد (22 موضعاً محققاً)</option>';

if (html.includes(waqiahOption)) {
  if (!html.includes('value="hadid"')) {
    const waqiahIdx = html.indexOf(waqiahOption);
    const closingTag = '</option>';
    const closeIdx = html.indexOf(closingTag, waqiahIdx);
    if (closeIdx !== -1) {
      const insertAt = closeIdx + closingTag.length;
      html = html.substring(0, insertAt) + hadidOption + html.substring(insertAt);
      console.log('Added hadid to dropdown after waqiah.');
    } else {
      console.error('Could not find </option> after value="waqiah"');
    }
  } else {
    console.log('hadid option already in dropdown.');
  }
} else {
  console.log('waqiah option not found in dropdown!');
}

// 2. Add hadid to surahsData
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

const hadidJsonStr = ',\n    "hadid": ' + JSON.stringify(hadidData, null, 4);

// Check if hadid already in surahsData
if (!html.includes('"hadid": {')) {
  html = html.substring(0, lastBraceIdx) + hadidJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted hadid into surahsData.');
} else {
  console.log('hadid already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Hadid into index.html!');
