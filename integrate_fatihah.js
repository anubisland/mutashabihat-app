const fs = require('fs');

const fatihahClusters = JSON.parse(fs.readFileSync('fatihah_clusters.json', 'utf8'));

let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if already integrated
if (html.includes('"fatihah": {') || html.includes('value="fatihah"')) {
    console.log("Fatihah already integrated!");
    process.exit(0);
}

// 2. Add to surahSelectDropdown
const selectTarget = '<option value="baqarah" selected>';
const selectReplacement = '<option value="fatihah">سورة الفاتحة (3 مواضع محققة)</option>\n                <option value="baqarah" selected>';

if (!html.includes(selectTarget)) {
    console.error("Target option baqarah not found in surahSelectDropdown!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'baqarah: 1';
const juzReplacement = 'fatihah: 1, baqarah: 1';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP baqarah: 1 not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject fatihah into surahsData right at the top
const dataTarget = 'const surahsData = {\n';
const fatihahEntry = `const surahsData = {\n    "fatihah": {\n        "name": "سورة الفاتحة",\n        "totalClusters": ${fatihahClusters.length},\n        "clusters": ${JSON.stringify(fatihahClusters, null, 8)}\n    },\n`;

if (!html.includes(dataTarget)) {
    console.error("Target surahsData opening not found!");
    process.exit(1);
}
html = html.replace(dataTarget, fatihahEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surah Al-Fatihah into index.html!");
