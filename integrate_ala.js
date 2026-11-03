const fs = require('fs');

const alaClusters = JSON.parse(fs.readFileSync('ala_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if ala already exists
if (html.includes('"ala": {') || html.includes('value="ala"')) {
    console.log("Ala already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="tariq">سورة الطارق (11 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="ala">سورة الأعلى (12 موضعاً محققاً)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option tariq not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'tariq: 30';
const juzReplacement = 'tariq: 30, ala: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const alaEntry = `,\n    "ala": {\n        "name": "سورة الأعلى",\n        "totalClusters": ${alaClusters.length},\n        "clusters": ${JSON.stringify(alaClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + alaEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Al-A'la into index.html!");
