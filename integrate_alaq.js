const fs = require('fs');

const alaqClusters = JSON.parse(fs.readFileSync('alaq_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if alaq already exists
if (html.includes('"alaq": {') || html.includes('value="alaq"')) {
    console.log("Alaq already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="teen">سورة التين (6 مواضع محققة)</option>';
const selectReplacement = selectTarget + '\n                <option value="alaq">سورة العلق (9 مواضع محققة)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option teen not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'teen: 30';
const juzReplacement = 'teen: 30, alaq: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP teen: 30 not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const alaqEntry = `,\n    "alaq": {\n        "name": "سورة العلق",\n        "totalClusters": ${alaqClusters.length},\n        "clusters": ${JSON.stringify(alaqClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + alaqEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Al-Alaq into index.html!");
