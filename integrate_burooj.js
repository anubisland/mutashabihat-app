const fs = require('fs');

const buroojClusters = JSON.parse(fs.readFileSync('burooj_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if burooj already exists
if (html.includes('"burooj": {') || html.includes('value="burooj"')) {
    console.log("Burooj already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="inshiqaq">سورة الانشقاق (13 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="burooj">سورة البروج (15 موضعاً محققاً)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option inshiqaq not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'inshiqaq: 30';
const juzReplacement = 'inshiqaq: 30, burooj: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const buroojEntry = `,\n    "burooj": {\n        "name": "سورة البروج",\n        "totalClusters": ${buroojClusters.length},\n        "clusters": ${JSON.stringify(buroojClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + buroojEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Al-Burooj into index.html!");
