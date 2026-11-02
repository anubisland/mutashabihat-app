const fs = require('fs');

const abasClusters = JSON.parse(fs.readFileSync('abas_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if abas already exists
if (html.includes('"abas": {') || html.includes('value="abas"')) {
    console.log("Abas already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="naziat">سورة النازعات (16 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="abas">سورة عبس (16 موضعاً محققاً)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option naziat not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'naziat: 30';
const juzReplacement = 'naziat: 30, abas: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const abasEntry = `,\n    "abas": {\n        "name": "سورة عبس",\n        "totalClusters": ${abasClusters.length},\n        "clusters": ${JSON.stringify(abasClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + abasEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Abasa into index.html!");
