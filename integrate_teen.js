const fs = require('fs');

const teenClusters = JSON.parse(fs.readFileSync('teen_clusters.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if teen already exists
if (html.includes('"teen": {') || html.includes('value="teen"')) {
    console.log("Teen already integrated!");
    process.exit(0);
}

// 2. Add option to surahSelect
const selectTarget = '<option value="sharh">سورة الشرح (6 مواضع محققة)</option>';
const selectReplacement = selectTarget + '\n                <option value="teen">سورة التين (6 مواضع محققة)</option>';
if (!html.includes(selectTarget)) {
    console.error("Target option sharh not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'sharh: 30';
const juzReplacement = 'sharh: 30, teen: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP sharh: 30 not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const teenEntry = `,\n    "teen": {\n        "name": "سورة التين",\n        "totalClusters": ${teenClusters.length},\n        "clusters": ${JSON.stringify(teenClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + teenEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah At-Tin into index.html!");
