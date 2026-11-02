const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const waqiahClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/waqiah_clusters.json', 'utf8'));

const waqiahData = {
  name: "سورة الواقعة",
  totalAyahs: 96,
  clusters: waqiahClusters
};

// 1. Add option to dropdown after rahman
const rahmanOption = 'value="rahman"';
const waqiahOption = '\n                <option value="waqiah">سورة الواقعة (22 موضعاً محققاً)</option>';

if (html.includes(rahmanOption)) {
  if (!html.includes('value="waqiah"')) {
    const rahmanIdx = html.indexOf(rahmanOption);
    const closingTag = '</option>';
    const closeIdx = html.indexOf(closingTag, rahmanIdx);
    if (closeIdx !== -1) {
      const insertAt = closeIdx + closingTag.length;
      html = html.substring(0, insertAt) + waqiahOption + html.substring(insertAt);
      console.log('Added waqiah to dropdown after rahman.');
    } else {
      console.error('Could not find </option> after value="rahman"');
    }
  } else {
    console.log('waqiah option already in dropdown.');
  }
} else {
  console.log('rahman option not found in dropdown!');
}

// 2. Add waqiah to surahsData
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

const waqiahJsonStr = ',\n    "waqiah": ' + JSON.stringify(waqiahData, null, 4);

// Check if waqiah already in surahsData
if (!html.includes('"waqiah": {')) {
  html = html.substring(0, lastBraceIdx) + waqiahJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted waqiah into surahsData.');
} else {
  console.log('waqiah already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Waqi\'ah into index.html!');
