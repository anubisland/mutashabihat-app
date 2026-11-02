const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const hashrClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/hashr_clusters.json', 'utf8'));

const hashrData = {
  name: "سورة الحشر",
  totalAyahs: 24,
  clusters: hashrClusters
};

// 1. Add option to dropdown after mujadilah
const mujadilahOption = 'value="mujadilah"';
const hashrOption = '\n                <option value="hashr">سورة الحشر (22 موضعاً محققاً)</option>';

if (html.includes(mujadilahOption)) {
  if (!html.includes('value="hashr"')) {
    const mujadilahIdx = html.indexOf(mujadilahOption);
    const closingTag = '</option>';
    const closeIdx = html.indexOf(closingTag, mujadilahIdx);
    if (closeIdx !== -1) {
      const insertAt = closeIdx + closingTag.length;
      html = html.substring(0, insertAt) + hashrOption + html.substring(insertAt);
      console.log('Added hashr to dropdown after mujadilah.');
    } else {
      console.error('Could not find </option> after value="mujadilah"');
    }
  } else {
    console.log('hashr option already in dropdown.');
  }
} else {
  console.log('mujadilah option not found in dropdown!');
}

// 2. Add hashr to surahsData
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

const hashrJsonStr = ',\n    "hashr": ' + JSON.stringify(hashrData, null, 4);

// Check if hashr already in surahsData
if (!html.includes('"hashr": {')) {
  html = html.substring(0, lastBraceIdx) + hashrJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted hashr into surahsData.');
} else {
  console.log('hashr already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Hashr into index.html!');
