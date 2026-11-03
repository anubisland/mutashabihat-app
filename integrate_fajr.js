const fs = require('fs');

const fajrClusters = JSON.parse(fs.readFileSync('fajr_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if fajr already exists
if (html.includes('"fajr": {') || html.includes('value="fajr"')) {
    console.log("Fajr already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="ghashiyah">سورة الغاشية (13 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="fajr">سورة الفجر (18 موضعاً محققاً)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option ghashiyah not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'ghashiyah: 30';
const juzReplacement = 'ghashiyah: 30, fajr: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const fajrEntry = `,\n    "fajr": {\n        "name": "سورة الفجر",\n        "totalClusters": ${fajrClusters.length},\n        "clusters": ${JSON.stringify(fajrClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + fajrEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Al-Fajr into index.html!");
