const fs = require('fs');

const tariqClusters = JSON.parse(fs.readFileSync('tariq_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if tariq already exists
if (html.includes('"tariq": {') || html.includes('value="tariq"')) {
    console.log("Tariq already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="burooj">سورة البروج (15 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="tariq">سورة الطارق (11 موضعاً محققاً)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option burooj not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'burooj: 30';
const juzReplacement = 'burooj: 30, tariq: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const tariqEntry = `,\n    "tariq": {\n        "name": "سورة الطارق",\n        "totalClusters": ${tariqClusters.length},\n        "clusters": ${JSON.stringify(tariqClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + tariqEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah At-Tariq into index.html!");
