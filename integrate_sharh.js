const fs = require('fs');

const sharhClusters = JSON.parse(fs.readFileSync('sharh_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if sharh already exists
if (html.includes('"sharh": {') || html.includes('value="sharh"')) {
    console.log("Sharh already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="duha">سورة الضحى (8 مواضع محققة)</option>';
const selectReplacement = selectTarget + '\n                <option value="sharh">سورة الشرح (6 مواضع محققة)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option duha not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'duha: 30';
const juzReplacement = 'duha: 30, sharh: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP duha: 30 not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const sharhEntry = `,\n    "sharh": {\n        "name": "سورة الشرح",\n        "totalClusters": ${sharhClusters.length},\n        "clusters": ${JSON.stringify(sharhClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + sharhEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Ash-Sharh into index.html!");
