const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const saffClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/saff_clusters.json', 'utf8'));

const saffData = {
  name: "سورة الصف",
  totalAyahs: 14,
  clusters: saffClusters
};

// 1. Add option to dropdown after mumtahanah
const mumtahanahOption = 'value="mumtahanah"';
const saffOption = '\n                <option value="saff">سورة الصف (20 موضعاً محققاً)</option>';

if (html.includes(mumtahanahOption)) {
  if (!html.includes('value="saff"')) {
    const mumtahanahIdx = html.indexOf(mumtahanahOption);
    const closingTag = '</option>';
    const closeIdx = html.indexOf(closingTag, mumtahanahIdx);
    if (closeIdx !== -1) {
      const insertAt = closeIdx + closingTag.length;
      html = html.substring(0, insertAt) + saffOption + html.substring(insertAt);
      console.log('Added saff to dropdown after mumtahanah.');
    } else {
      console.error('Could not find </option> after value="mumtahanah"');
    }
  } else {
    console.log('saff option already in dropdown.');
  }
} else {
  console.log('mumtahanah option not found in dropdown!');
}

// 2. Add saff to surahsData
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

const saffJsonStr = ',\n    "saff": ' + JSON.stringify(saffData, null, 4);

// Check if saff already in surahsData
if (!html.includes('"saff": {')) {
  html = html.substring(0, lastBraceIdx) + saffJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted saff into surahsData.');
} else {
  console.log('saff already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah As-Saff into index.html!');
