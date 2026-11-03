const fs = require('fs');

const duhaClusters = JSON.parse(fs.readFileSync('duha_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if duha already exists
if (html.includes('"duha": {') || html.includes('value="duha"')) {
    console.log("Duha already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="layl">سورة الليل (11 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="duha">سورة الضحى (8 مواضع محققة)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option layl not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'layl: 30';
const juzReplacement = 'layl: 30, duha: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP layl: 30 not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const duhaEntry = `,\n    "duha": {\n        "name": "سورة الضحى",\n        "totalClusters": ${duhaClusters.length},\n        "clusters": ${JSON.stringify(duhaClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + duhaEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Ad-Duha into index.html!");
