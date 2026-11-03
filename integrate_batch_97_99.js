const fs = require('fs');

const qadrClusters = JSON.parse(fs.readFileSync('qadr_clusters.json', 'utf8'));
const bayyinahClusters = JSON.parse(fs.readFileSync('bayyinah_clusters.json', 'utf8'));
const zalzalahClusters = JSON.parse(fs.readFileSync('zalzalah_clusters.json', 'utf8'));

let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if any already exists
if (html.includes('"qadr": {') || html.includes('value="qadr"')) {
    console.log("Qadr already integrated!");
    process.exit(0);
}

// 2. Add options to surahSelect
const selectTarget = '<option value="alaq">سورة العلق (9 مواضع محققة)</option>';
const selectReplacement = selectTarget + `\n                <option value="qadr">سورة القدر (5 مواضع محققة)</option>
                <option value="bayyinah">سورة البينة (6 مواضع محققة)</option>
                <option value="zalzalah">سورة الزلزلة (5 مواضع محققة)</option>`;

if (!html.includes(selectTarget)) {
    console.error("Target option alaq not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'alaq: 30';
const juzReplacement = 'alaq: 30, qadr: 30, bayyinah: 30, zalzalah: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP alaq: 30 not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const batchEntry = `,\n    "qadr": {\n        "name": "سورة القدر",\n        "totalClusters": ${qadrClusters.length},\n        "clusters": ${JSON.stringify(qadrClusters, null, 8)}\n    },\n    "bayyinah": {\n        "name": "سورة البينة",\n        "totalClusters": ${bayyinahClusters.length},\n        "clusters": ${JSON.stringify(bayyinahClusters, null, 8)}\n    },\n    "zalzalah": {\n        "name": "سورة الزلزلة",\n        "totalClusters": ${zalzalahClusters.length},\n        "clusters": ${JSON.stringify(zalzalahClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + batchEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surahs Al-Qadr, Al-Bayyinah, and Az-Zalzalah into index.html!");
