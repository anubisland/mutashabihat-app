const fs = require('fs');

const infitarClusters = JSON.parse(fs.readFileSync('infitar_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if infitar already exists
if (html.includes('"infitar": {') || html.includes('value="infitar"')) {
    console.log("Infitar already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="takwir">سورة التكوير (17 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="infitar">سورة الانفطار (13 موضعاً محققاً)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option takwir not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'takwir: 30';
const juzReplacement = 'takwir: 30, infitar: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const infitarEntry = `,\n    "infitar": {\n        "name": "سورة الانفطار",\n        "totalClusters": ${infitarClusters.length},\n        "clusters": ${JSON.stringify(infitarClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + infitarEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Al-Infitar into index.html!");
