const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = "document.getElementById('sheetSurahPart').textContent = `${surahName} (المسألة #${clusterIndex + 1}) • ${verse.quarter}`;\r\n            document.getElementById('sheetQuarterName').textContent = verse.pos;\r\n            document.getElementById('sheetPageNumber').textContent = `صفحة ${verse.page}`;";

const replacement = "const mQuarter = verse.quarter || '';\r\n            const mPos = verse.pos || 'موضع الآية';\r\n            const mPage = verse.page || '—';\r\n            document.getElementById('sheetSurahPart').textContent = `${surahName} (المسألة #${clusterIndex + 1}) • ${mQuarter}`;\r\n            document.getElementById('sheetQuarterName').textContent = mPos;\r\n            document.getElementById('sheetPageNumber').textContent = `صفحة ${mPage}`;";

if (html.includes(target)) {
    html = html.replace(target, replacement);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('✅ Successfully updated openMushafModal() in index.html');
} else {
    // Try LF version
    const targetLF = target.replace(/\r\n/g, '\n');
    const replacementLF = replacement.replace(/\r\n/g, '\n');
    if (html.includes(targetLF)) {
        html = html.replace(targetLF, replacementLF);
        fs.writeFileSync('index.html', html, 'utf8');
        console.log('✅ Successfully updated openMushafModal() (LF) in index.html');
    } else {
        console.error('❌ Could not find target in index.html');
    }
}
