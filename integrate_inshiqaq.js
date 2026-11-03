const fs = require('fs');

const inshiqaqClusters = JSON.parse(fs.readFileSync('inshiqaq_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if inshiqaq already exists
if (html.includes('"inshiqaq": {') || html.includes('value="inshiqaq"')) {
    console.log("Inshiqaq already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="mutaffifin">سورة المطففين (16 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="inshiqaq">سورة الانشقاق (13 موضعاً محققاً)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option mutaffifin not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'mutaffifin: 30';
const juzReplacement = 'mutaffifin: 30, inshiqaq: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const inshiqaqEntry = `,\n    "inshiqaq": {\n        "name": "سورة الانشقاق",\n        "totalClusters": ${inshiqaqClusters.length},\n        "clusters": ${JSON.stringify(inshiqaqClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + inshiqaqEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Al-Inshiqaq into index.html!");
