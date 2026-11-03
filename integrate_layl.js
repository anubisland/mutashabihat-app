const fs = require('fs');

const laylClusters = JSON.parse(fs.readFileSync('layl_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if layl already exists
if (html.includes('"layl": {') || html.includes('value="layl"')) {
    console.log("Layl already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="shams">سورة الشمس (9 مواضع محققة)</option>';
const selectReplacement = selectTarget + '\n                <option value="layl">سورة الليل (11 موضعاً محققاً)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option shams not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'shams: 30';
const juzReplacement = 'shams: 30, layl: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP shams: 30 not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const laylEntry = `,\n    "layl": {\n        "name": "سورة الليل",\n        "totalClusters": ${laylClusters.length},\n        "clusters": ${JSON.stringify(laylClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + laylEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Al-Layl into index.html!");
