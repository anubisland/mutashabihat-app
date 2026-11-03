const fs = require('fs');

const filClusters = JSON.parse(fs.readFileSync('fil_clusters.json', 'utf8'));
const qurayshClusters = JSON.parse(fs.readFileSync('quraysh_clusters.json', 'utf8'));
const maaunClusters = JSON.parse(fs.readFileSync('maaun_clusters.json', 'utf8'));
const kawtharClusters = JSON.parse(fs.readFileSync('kawthar_clusters.json', 'utf8'));
const kafiroonClusters = JSON.parse(fs.readFileSync('kafiroon_clusters.json', 'utf8'));

let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if any already exists
if (html.includes('"fil": {') || html.includes('value="fil"')) {
    console.log("Fil already integrated!");
    process.exit(0);
}

// 2. Add options to surahSelect
const selectTarget = '<option value="humazah">سورة الهمزة (4 مواضع محققة)</option>';
const selectReplacement = selectTarget + `\n                <option value="fil">سورة الفيل (4 مواضع محققة)</option>
                <option value="quraysh">سورة قريش (3 مواضع محققة)</option>
                <option value="maaun">سورة الماعون (موضعان محققان)</option>
                <option value="kawthar">سورة الكوثر (3 مواضع محققة)</option>
                <option value="kafiroon">سورة الكافرون (3 مواضع محققة)</option>`;

if (!html.includes(selectTarget)) {
    console.error("Target option humazah not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'humazah: 30';
const juzReplacement = 'humazah: 30, fil: 30, quraysh: 30, maaun: 30, kawthar: 30, kafiroon: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP humazah: 30 not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const batchEntry = `,\n    "fil": {\n        "name": "سورة الفيل",\n        "totalClusters": ${filClusters.length},\n        "clusters": ${JSON.stringify(filClusters, null, 8)}\n    },\n    "quraysh": {\n        "name": "سورة قريش",\n        "totalClusters": ${qurayshClusters.length},\n        "clusters": ${JSON.stringify(qurayshClusters, null, 8)}\n    },\n    "maaun": {\n        "name": "سورة الماعون",\n        "totalClusters": ${maaunClusters.length},\n        "clusters": ${JSON.stringify(maaunClusters, null, 8)}\n    },\n    "kawthar": {\n        "name": "سورة الكوثر",\n        "totalClusters": ${kawtharClusters.length},\n        "clusters": ${JSON.stringify(kawtharClusters, null, 8)}\n    },\n    "kafiroon": {\n        "name": "سورة الكافرون",\n        "totalClusters": ${kafiroonClusters.length},\n        "clusters": ${JSON.stringify(kafiroonClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + batchEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surahs 105-109 into index.html!");
