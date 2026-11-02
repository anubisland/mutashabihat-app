const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const rahmanClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/rahman_clusters.json', 'utf8'));

const rahmanData = {
  name: "سورة الرحمن",
  totalAyahs: 78,
  clusters: rahmanClusters
};

// 1. Add option to dropdown after qamar
const qamarOption = '<option value="qamar">سورة القمر (20 موضعاً محققاً)</option>';
const rahmanOption = '\n                <option value="rahman">سورة الرحمن (22 موضعاً محققاً)</option>';

if (html.includes('value="qamar"')) {
  if (!html.includes('value="rahman"')) {
    // Find the qamar option closing tag
    const qamarIdx = html.indexOf('value="qamar"');
    const closingTag = '</option>';
    const closeIdx = html.indexOf(closingTag, qamarIdx);
    if (closeIdx !== -1) {
      const insertAt = closeIdx + closingTag.length;
      html = html.substring(0, insertAt) + rahmanOption + html.substring(insertAt);
      console.log('Added rahman to dropdown after qamar.');
    } else {
      console.error('Could not find </option> after value="qamar"');
    }
  } else {
    console.log('rahman option already in dropdown.');
  }
} else {
  console.log('qamar option not found in dropdown!');
}

// 2. Add rahman to surahsData
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

const rahmanJsonStr = ',\n    "rahman": ' + JSON.stringify(rahmanData, null, 4);

// Check if rahman already in surahsData
if (!html.includes('"rahman": {')) {
  html = html.substring(0, lastBraceIdx) + rahmanJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted rahman into surahsData.');
} else {
  console.log('rahman already in surahsData.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Ar-Rahman into index.html!');
