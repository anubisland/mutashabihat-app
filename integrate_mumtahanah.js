const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const mumtahanahClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/mumtahanah_clusters.json', 'utf8'));

const mumtahanahData = {
  name: "سورة الممتحنة",
  totalAyahs: 13,
  clusters: mumtahanahClusters
};

// 1. Add option to dropdown after hashr
const hashrOption = 'value="hashr"';
const mumtahanahOption = '\n                <option value="mumtahanah">سورة الممتحنة (20 موضعاً محققاً)</option>';

if (html.includes(hashrOption)) {
  if (!html.includes('value="mumtahanah"')) {
    const hashrIdx = html.indexOf(hashrOption);
    const closingTag = '</option>';
    const closeIdx = html.indexOf(closingTag, hashrIdx);
    if (closeIdx !== -1) {
      const insertAt = closeIdx + closingTag.length;
      html = html.substring(0, insertAt) + mumtahanahOption + html.substring(insertAt);
      console.log('Added mumtahanah to dropdown after hashr.');
    } else {
      console.error('Could not find </option> after value="hashr"');
    }
  } else {
    console.log('mumtahanah option already in dropdown.');
  }
} else {
  console.log('hashr option not found in dropdown!');
}

// 2. Add mumtahanah to surahsData
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

const mumtahanahJsonStr = ',\n    "mumtahanah": ' + JSON.stringify(mumtahanahData, null, 4);

// Check if mumtahanah already in surahsData
if (!html.includes('"mumtahanah": {')) {
  html = html.substring(0, lastBraceIdx) + mumtahanahJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted mumtahanah into surahsData.');
} else {
  console.log('mumtahanah already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Mumtahanah into index.html!');
