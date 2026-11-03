const fs = require('fs');

const takwirClusters = JSON.parse(fs.readFileSync('takwir_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if takwir already exists
if (html.includes('"takwir": {') || html.includes('value="takwir"')) {
    console.log("Takwir already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="abas">سورة عبس (16 موضعاً محققاً)</option>';
const selectReplacement = selectTarget + '\n                <option value="takwir">سورة التكوير (17 موضعاً محققاً)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option abas not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'abas: 30';
const juzReplacement = 'abas: 30, takwir: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const takwirEntry = `,\n    "takwir": {\n        "name": "سورة التكوير",\n        "totalClusters": ${takwirClusters.length},\n        "clusters": ${JSON.stringify(takwirClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + takwirEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah At-Takwir into index.html!");
