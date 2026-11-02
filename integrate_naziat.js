const fs = require('fs');

const naziatClusters = JSON.parse(fs.readFileSync('naziat_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if naziat already exists
if (html.includes('"naziat": {') || html.includes('value="naziat"')) {
    console.log("Naziat already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="naba">سورة النبأ (13 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="naziat">سورة النازعات (16 موضعاً محققاً)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option naba not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'mursalat: 29, naba: 30';
const juzReplacement = 'mursalat: 29, naba: 30, naziat: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const naziatEntry = `,\n    "naziat": {\n        "name": "سورة النازعات",\n        "totalClusters": ${naziatClusters.length},\n        "clusters": ${JSON.stringify(naziatClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + naziatEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah An-Nazi'at into index.html!");
