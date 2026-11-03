const fs = require('fs');
const vm = require('vm');
const html = fs.readFileSync('index.html', 'utf8');

const startStr = 'surahsData = {';
const startIdx = html.indexOf(startStr);
const endIdx = html.indexOf('let currentSurah =');
const jsCode = html.substring(startIdx, endIdx);
const sandbox = {};
vm.runInNewContext(jsCode, sandbox);

const fajr = sandbox.surahsData.fajr;
if (!fajr) {
    console.error("Fajr not found in surahsData!");
    process.exit(1);
}

console.log(`Fajr total clusters: ${fajr.clusters.length}`);
const errors = [];
fajr.clusters.forEach((c, idx) => {
    const cid = `fajr[${idx}] (${c.id})`;
    if (!c.category) errors.push(`${cid}: missing category`);
    if (!c.rhyme) errors.push(`${cid}: missing rhyme`);
    if (!c.rule) errors.push(`${cid}: missing rule`);
    if (!c.dabit) errors.push(`${cid}: missing dabit`);
    if (!c.tadabbur || c.tadabbur.length < 2) errors.push(`${cid}: missing tadabbur`);
    if (!c.scale || c.scale.length < 2) errors.push(`${cid}: missing scale`);
    if (!c.quiz || !c.quiz.question || c.quiz.options.length !== 4) errors.push(`${cid}: invalid quiz`);
    if (!c.verses || c.verses.length < 2) errors.push(`${cid}: singleton verses`);
    else {
        c.verses.forEach((v, vIdx) => {
            if (!v.ayah) errors.push(`${cid} v${vIdx}: missing ayah`);
            if (!v.page) errors.push(`${cid} v${vIdx}: missing page`);
            if (!v.pos) errors.push(`${cid} v${vIdx}: missing pos`);
            if (!v.tokens || v.tokens.length === 0) errors.push(`${cid} v${vIdx}: missing tokens`);
            if (!v.html) errors.push(`${cid} v${vIdx}: missing html`);
            if (!v.text) errors.push(`${cid} v${vIdx}: missing text`);
        });
    }
});

if (errors.length === 0) {
    console.log("Surah Al-Fajr in index.html is 100% verified with ZERO errors!");
} else {
    console.error("Errors found:", errors);
    process.exit(1);
}
