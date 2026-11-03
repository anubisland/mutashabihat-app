const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Extract surahsData
const dataMatch = html.match(/const surahsData = (\{[\s\S]*?\n\};)/);
if (!dataMatch) {
    console.error("surahsData not found!");
    process.exit(1);
}

let surahsData;
try {
    surahsData = eval('(' + dataMatch[1].replace(/;\s*$/, '') + ')');
} catch (e) {
    console.error("Failed to eval surahsData:", e);
    process.exit(1);
}

const finalSurahs = ['nasr', 'masad', 'ikhlas', 'falaq', 'nas'];
let allOk = true;

for (const key of finalSurahs) {
    if (!surahsData[key]) {
        console.error(`Surah ${key} not found in surahsData!`);
        allOk = false;
        continue;
    }
    const s = surahsData[key];
    console.log(`Checking ${s.name} (${key}): ${s.clusters.length} clusters...`);
    
    for (const c of s.clusters) {
        if (!c.id || !c.category || !c.title || !c.subtitle || !c.rhyme || !c.rule || !c.dabit || !c.alBurhan || !c.tadabbur || !c.scale || !c.quiz || !c.verses) {
            console.error(`Cluster ${c.id} missing core fields!`);
            allOk = false;
        }
        if (!Array.isArray(c.tadabbur) || c.tadabbur.length < 2) {
            console.error(`Cluster ${c.id} invalid tadabbur!`);
            allOk = false;
        }
        if (!Array.isArray(c.scale) || c.scale.length !== 2) {
            console.error(`Cluster ${c.id} invalid scale!`);
            allOk = false;
        }
        if (!c.quiz.question || !Array.isArray(c.quiz.options) || c.quiz.options.length !== 4) {
            console.error(`Cluster ${c.id} invalid quiz!`);
            allOk = false;
        }
        if (c.verses.length < 2) {
            console.error(`Cluster ${c.id} verses.length < 2!`);
            allOk = false;
        }
        for (const v of c.verses) {
            if (!v.surah || !v.surahKey || !v.ayah || !v.quarter || !v.page || !v.pos || !v.tokens || !v.text || !v.html) {
                console.error(`Cluster ${c.id} verse missing metadata!`, v);
                allOk = false;
            }
        }
    }
}

if (allOk) {
    console.log("\n>>> SURAHS 110-114 VERIFIED 100% CLEAN IN INDEX.HTML! <<<");
} else {
    console.error("\n>>> VERIFICATION FAILED! <<<");
    process.exit(1);
}
