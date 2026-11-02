const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const mujadilahClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/mujadilah_clusters.json', 'utf8'));

const mujadilahData = {
  name: "سورة المجادلة",
  totalAyahs: 22,
  clusters: mujadilahClusters
};

// 1. Add option to dropdown after hadid
const hadidOption = 'value="hadid"';
const mujadilahOption = '\n                <option value="mujadilah">سورة المجادلة (22 موضعاً محققاً)</option>';

if (html.includes(hadidOption)) {
  if (!html.includes('value="mujadilah"')) {
    const hadidIdx = html.indexOf(hadidOption);
    const closingTag = '</option>';
    const closeIdx = html.indexOf(closingTag, hadidIdx);
    if (closeIdx !== -1) {
      const insertAt = closeIdx + closingTag.length;
      html = html.substring(0, insertAt) + mujadilahOption + html.substring(insertAt);
      console.log('Added mujadilah to dropdown after hadid.');
    } else {
      console.error('Could not find </option> after value="hadid"');
    }
  } else {
    console.log('mujadilah option already in dropdown.');
  }
} else {
  console.log('hadid option not found in dropdown!');
}

// 2. Add mujadilah to surahsData
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

const mujadilahJsonStr = ',\n    "mujadilah": ' + JSON.stringify(mujadilahData, null, 4);

// Check if mujadilah already in surahsData
if (!html.includes('"mujadilah": {')) {
  html = html.substring(0, lastBraceIdx) + mujadilahJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted mujadilah into surahsData.');
} else {
  console.log('mujadilah already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Mujadilah into index.html!');
