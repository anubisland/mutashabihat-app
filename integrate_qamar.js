const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const qamarClusters = JSON.parse(fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/qamar_clusters.json', 'utf8'));

const qamarData = {
  name: "سورة القمر",
  totalAyahs: 55,
  clusters: qamarClusters
};

// 1. Add option to dropdown after najm
const najmOption = '<option value="najm">سورة النجم (20 موضعاً محققاً)</option>';
const qamarOption = '\n                <option value="qamar">سورة القمر (20 موضعاً محققاً)</option>';

if (html.includes(najmOption)) {
  if (!html.includes('value="qamar"')) {
    html = html.replace(najmOption, najmOption + qamarOption);
    console.log('Added qamar to dropdown after najm.');
  } else {
    console.log('qamar option already in dropdown.');
  }
} else {
  console.log('najmOption not found!');
}

// 2. Add qamar to surahsData
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

const qamarJsonStr = ',\n    "qamar": ' + JSON.stringify(qamarData, null, 4);

// Check if qamar already in surahsData
if (!html.includes('"qamar": {')) {
  html = html.substring(0, lastBraceIdx) + qamarJsonStr + '\n' + html.substring(lastBraceIdx);
  console.log('Inserted qamar into surahsData.');
} else {
  console.log('qamar already in surahsData.');
}

// 3. Enhance tadabbur array-of-strings support
const oldTadabburCode = `                if (Array.isArray(cluster.tadabbur)) {
                    tItems = cluster.tadabbur;
                } else if (typeof cluster.tadabbur === 'string' && cluster.tadabbur.trim()) {`;

const newTadabburCode = `                if (Array.isArray(cluster.tadabbur)) {
                    if (cluster.alBurhan) {
                        tItems.push({ h: "التوجيه البياني عند أئمة المتشابهات", d: cluster.alBurhan });
                    }
                    cluster.tadabbur.forEach(t => {
                        tItems.push(typeof t === 'string' ? { h: "سر التفرقة واللطيفة التدبرية", d: t } : t);
                    });
                } else if (typeof cluster.tadabbur === 'string' && cluster.tadabbur.trim()) {`;

if (html.includes(oldTadabburCode)) {
  html = html.replace(oldTadabburCode, newTadabburCode);
  console.log('Updated tadabbur handling to flawlessly support string arrays & alBurhan.');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully integrated Surah Al-Qamar into index.html!');
