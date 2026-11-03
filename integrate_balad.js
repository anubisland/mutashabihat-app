const fs = require('fs');

const baladClusters = JSON.parse(fs.readFileSync('balad_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if balad already exists
if (html.includes('"balad": {') || html.includes('value="balad"')) {
    console.log("Balad already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="fajr">سورة الفجر (18 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="balad">سورة البلد (13 موضعاً محققاً)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option fajr not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'fajr: 30';
const juzReplacement = 'fajr: 30, balad: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const baladEntry = `,\n    "balad": {\n        "name": "سورة البلد",\n        "totalClusters": ${baladClusters.length},\n        "clusters": ${JSON.stringify(baladClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + baladEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Al-Balad into index.html!");
