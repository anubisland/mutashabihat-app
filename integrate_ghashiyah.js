const fs = require('fs');

const ghashiyahClusters = JSON.parse(fs.readFileSync('ghashiyah_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if ghashiyah already exists
if (html.includes('"ghashiyah": {') || html.includes('value="ghashiyah"')) {
    console.log("Ghashiyah already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="ala">سورة الأعلى (12 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="ghashiyah">سورة الغاشية (13 موضعاً محققاً)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option ala not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'ala: 30';
const juzReplacement = 'ala: 30, ghashiyah: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const ghashiyahEntry = `,\n    "ghashiyah": {\n        "name": "سورة الغاشية",\n        "totalClusters": ${ghashiyahClusters.length},\n        "clusters": ${JSON.stringify(ghashiyahClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + ghashiyahEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Al-Ghashiyah into index.html!");
