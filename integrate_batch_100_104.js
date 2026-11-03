const fs = require('fs');

const adiyatClusters = JSON.parse(fs.readFileSync('adiyat_clusters.json', 'utf8'));
const qariahClusters = JSON.parse(fs.readFileSync('qariah_clusters.json', 'utf8'));
const takathurClusters = JSON.parse(fs.readFileSync('takathur_clusters.json', 'utf8'));
const asrClusters = JSON.parse(fs.readFileSync('asr_clusters.json', 'utf8'));
const humazahClusters = JSON.parse(fs.readFileSync('humazah_clusters.json', 'utf8'));

let html = fs.readFileSync('index.html', 'utf8');

// 1. Check if any already exists
if (html.includes('"adiyat": {') || html.includes('value="adiyat"')) {
    console.log("Adiyat already integrated!");
    process.exit(0);
}

// 2. Add options to surahSelect
const selectTarget = '<option value="zalzalah">سورة الزلزلة (5 مواضع محققة)</option>';
const selectReplacement = selectTarget + `\n                <option value="adiyat">سورة العاديات (4 مواضع محققة)</option>
                <option value="qariah">سورة القارعة (4 مواضع محققة)</option>
                <option value="takathur">سورة التكاثر (4 مواضع محققة)</option>
                <option value="asr">سورة العصر (موضعان محققان)</option>
                <option value="humazah">سورة الهمزة (4 مواضع محققة)</option>`;

if (!html.includes(selectTarget)) {
    console.error("Target option zalzalah not found in surahSelect!");
    process.exit(1);
}
html = html.replace(selectTarget, selectReplacement);

// 3. Add to SURAH_JUZ_MAP
const juzTarget = 'zalzalah: 30';
const juzReplacement = 'zalzalah: 30, adiyat: 30, qariah: 30, takathur: 30, asr: 30, humazah: 30';
if (!html.includes(juzTarget)) {
    console.error("Target SURAH_JUZ_MAP zalzalah: 30 not found!");
    process.exit(1);
}
html = html.replace(juzTarget, juzReplacement);

// 4. Inject into surahsData
const dataTarget = `]\n    }\n};`;
const batchEntry = `,\n    "adiyat": {\n        "name": "سورة العاديات",\n        "totalClusters": ${adiyatClusters.length},\n        "clusters": ${JSON.stringify(adiyatClusters, null, 8)}\n    },\n    "qariah": {\n        "name": "سورة القارعة",\n        "totalClusters": ${qariahClusters.length},\n        "clusters": ${JSON.stringify(qariahClusters, null, 8)}\n    },\n    "takathur": {\n        "name": "سورة التكاثر",\n        "totalClusters": ${takathurClusters.length},\n        "clusters": ${JSON.stringify(takathurClusters, null, 8)}\n    },\n    "asr": {\n        "name": "سورة العصر",\n        "totalClusters": ${asrClusters.length},\n        "clusters": ${JSON.stringify(asrClusters, null, 8)}\n    },\n    "humazah": {\n        "name": "سورة الهمزة",\n        "totalClusters": ${humazahClusters.length},\n        "clusters": ${JSON.stringify(humazahClusters, null, 8)}\n    }\n};`;

if (!html.includes(dataTarget)) {
    console.error("Target data closing not found!");
    process.exit(1);
}
html = html.replace(dataTarget, `]\n    }` + batchEntry);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully integrated Surahs 100-104 into index.html!");
