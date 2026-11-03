const fs = require('fs');

const mutaffifinClusters = JSON.parse(fs.readFileSync('mutaffifin_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if mutaffifin already exists
if (html.includes('"mutaffifin": {') || html.includes('value="mutaffifin"')) {
    console.log("Mutaffifin already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="infitar">سورة الانفطار (13 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="mutaffifin">سورة المطففين (16 موضعاً محققاً)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option infitar not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'infitar: 30';
const juzReplacement = 'infitar: 30, mutaffifin: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const mutaffifinEntry = `,\n    "mutaffifin": {\n        "name": "سورة المطففين",\n        "totalClusters": ${mutaffifinClusters.length},\n        "clusters": ${JSON.stringify(mutaffifinClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + mutaffifinEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Al-Mutaffifin into index.html!");
