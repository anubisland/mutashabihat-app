const fs = require('fs');

const shamsClusters = JSON.parse(fs.readFileSync('shams_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if shams already exists
if (html.includes('"shams": {') || html.includes('value="shams"')) {
    console.log("Shams already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="balad">سورة البلد (13 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="shams">سورة الشمس (9 مواضع محققة)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option balad not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'balad: 30';
const juzReplacement = 'balad: 30, shams: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const shamsEntry = `,\n    "shams": {\n        "name": "سورة الشمس",\n        "totalClusters": ${shamsClusters.length},\n        "clusters": ${JSON.stringify(shamsClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + shamsEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Ash-Shams into index.html!");
