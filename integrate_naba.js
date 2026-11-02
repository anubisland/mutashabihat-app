const fs = require('fs');

const nabaClusters = JSON.parse(fs.readFileSync('naba_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if naba already exists
if (html.includes('"naba": {') || html.includes('value="naba"')) {
    console.log("Naba already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="mursalat">سورة المرسلات (12 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="naba">سورة النبأ (13 موضعاً محققاً)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option not found!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'insan: 29, mursalat: 29';
const juzReplacement = 'insan: 29, mursalat: 29, naba: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
// Find the end of mursalat in surahsData
const dataTarget = `            }\n        ]\n    }\n};`;
const nabaEntry = `,\n    "naba": {\n        "name": "سورة النبأ",\n        "totalClusters": ${nabaClusters.length},\n        "clusters": ${JSON.stringify(nabaClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `            }\n        ]\n    }` + nabaEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah An-Naba into index.html!");
