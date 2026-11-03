const fs = require('fs');

const nasrClusters = JSON.parse(fs.readFileSync('nasr_clusters.json', 'utf8'));
const masadClusters = JSON.parse(fs.readFileSync('masad_clusters.json', 'utf8'));
const ikhlasClusters = JSON.parse(fs.readFileSync('ikhlas_clusters.json', 'utf8'));
const falaqClusters = JSON.parse(fs.readFileSync('falaq_clusters.json', 'utf8'));
const nasClusters = JSON.parse(fs.readFileSync('nas_clusters.json', 'utf8'));

let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if any already exists
if (html.includes('"nasr": {') || html.includes('value="nasr"')) {
    console.log("Nasr already integrated!");
    process.exit(0);
}

// 2. Add options to surahSelect
const selectTarget = '<option value="kafiroon">سورة الكافرون (3 مواضع محققة)</option>';
const selectReplacement = selectTarget + `\n                <option value="nasr">سورة النصر (موضعان محققان)</option>
                <option value="masad">سورة المسد (موضعان محققان)</option>
                <option value="ikhlas">سورة الإخلاص (موضعان محققان)</option>
                <option value="falaq">سورة الفلق (موضعان محققان)</option>
                <option value="nas">سورة الناس (موضعان محققان)</option>`;

if (!html.includes(selectTarget)) {
    console.error("Target option kafiroon not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'kafiroon: 30';
const juzReplacement = 'kafiroon: 30, nasr: 30, masad: 30, ikhlas: 30, falaq: 30, nas: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP kafiroon: 30 not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const batchEntry = `,\n    "nasr": {\n        "name": "سورة النصر",\n        "totalClusters": ${nasrClusters.length},\n        "clusters": ${JSON.stringify(nasrClusters, null, 8)}\n    },\n    "masad": {\n        "name": "سورة المسد",\n        "totalClusters": ${masadClusters.length},\n        "clusters": ${JSON.stringify(masadClusters, null, 8)}\n    },\n    "ikhlas": {\n        "name": "سورة الإخلاص",\n        "totalClusters": ${ikhlasClusters.length},\n        "clusters": ${JSON.stringify(ikhlasClusters, null, 8)}\n    },\n    "falaq": {\n        "name": "سورة الفلق",\n        "totalClusters": ${falaqClusters.length},\n        "clusters": ${JSON.stringify(falaqClusters, null, 8)}\n    },\n    "nas": {\n        "name": "سورة الناس",\n        "totalClusters": ${nasClusters.length},\n        "clusters": ${JSON.stringify(nasClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + batchEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surahs 110-114 (An-Nasr through An-Nas) into index.html!");
