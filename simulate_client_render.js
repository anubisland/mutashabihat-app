const fs = require('fs');
const html = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');

// Mock a minimal DOM
const dom = {
  elements: {},
  getElementById(id) {
    if (!this.elements[id]) {
      this.elements[id] = {
        id: id,
        innerHTML: '',
        textContent: '',
        className: '',
        classList: { contains: () => false, toggle: () => {} },
        style: {},
        scrollIntoView: () => {},
        children: [],
        appendChild(child) { this.children.push(child); }
      };
    }
    return this.elements[id];
  },
  createElement(tag) {
    return {
      tag: tag,
      className: '',
      innerHTML: '',
      textContent: '',
      style: {}
    };
  },
  querySelectorAll() { return []; },
  querySelector() { return null; }
};

const window = { innerWidth: 1200 };
const document = dom;

// Extract JS
const startMarker = 'const surahsData = ';
const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf('</script>', startIdx);
const jsCode = html.substring(startIdx, endIdx);

// Run in context
const vm = require('vm');
const context = {
  document: dom,
  window: window,
  console: console,
  setTimeout: setTimeout,
  isDimmed: false,
  currentFontSize: 1.28
};
vm.createContext(context);
vm.runInContext(jsCode, context);

// Test switchSurah('anfal')
console.log('Testing switchSurah("anfal")...');
context.switchSurah('anfal');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-ANFAL ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);
dom.getElementById('tadabburList').children.forEach((c, i) => {
  console.log(`  Item #${i+1}: ${c.innerHTML.trim()}`);
});

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الأنفال') {
  console.error('FAIL: contextDeckSurahTitle is wrong!');
  process.exit(1);
}
if (!dom.getElementById('rhymeLine').textContent.includes('إنّما للمؤمنين')) {
  console.error('FAIL: rhymeLine is wrong!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty!');
  process.exit(1);
}

// Test switchSurah('tawbah')
console.log('\nTesting switchSurah("tawbah")...');
context.switchSurah('tawbah');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AT-TAWBAH ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة التوبة') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Tawbah!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Tawbah!');
  process.exit(1);
}

// Test switchSurah('yunus')
console.log('\nTesting switchSurah("yunus")...');
context.switchSurah('yunus');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH YUNUS ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة يونس') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Yunus!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Yunus!');
  process.exit(1);
}

// Test switchSurah('hud')
console.log('\nTesting switchSurah("hud")...');
context.switchSurah('hud');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH HUD ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة هود') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Hud!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Hud!');
  process.exit(1);
}

// Test switchSurah('yusuf')
console.log('\nTesting switchSurah("yusuf")...');
context.switchSurah('yusuf');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH YUSUF ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة يوسف') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Yusuf!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Yusuf!');
  process.exit(1);
}

// Test switchSurah('rad')
console.log('\nTesting switchSurah("rad")...');
context.switchSurah('rad');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AR-RA\'D ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الرعد') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Rad!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Rad!');
  process.exit(1);
}

// Test switchSurah('ibrahim')
console.log('\nTesting switchSurah("ibrahim")...');
context.switchSurah('ibrahim');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH IBRAHIM ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة إبراهيم') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Ibrahim!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Ibrahim!');
  process.exit(1);
}

// Test switchSurah('hijr')
console.log('\nTesting switchSurah("hijr")...');
context.switchSurah('hijr');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-HIJR ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الحجر') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Hijr!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Hijr!');
  process.exit(1);
}

// Test switchSurah('nahl')
console.log('\nTesting switchSurah("nahl")...');
context.switchSurah('nahl');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AN-NAHL ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة النحل') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Nahl!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Nahl!');
  process.exit(1);
}

// Test switchSurah('isra')
console.log('\nTesting switchSurah("isra")...');
context.switchSurah('isra');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-ISRA ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الإسراء') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Isra!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Isra!');
  process.exit(1);
}

// Test switchSurah('kahf')
console.log('\nTesting switchSurah("kahf")...');
context.switchSurah('kahf');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-KAHF ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الكهف') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Kahf!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Kahf!');
  process.exit(1);
}

// Test switchSurah('maryam')
console.log('\nTesting switchSurah("maryam")...');
context.switchSurah('maryam');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH MARYAM ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة مريم') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Maryam!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Maryam!');
  process.exit(1);
}

// Test switchSurah('taha')
console.log('\nTesting switchSurah("taha")...');
context.switchSurah('taha');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH TA-HA ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة طه') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Taha!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Taha!');
  process.exit(1);
}

// Test switchSurah('anbiya')
console.log('\nTesting switchSurah("anbiya")...');
context.switchSurah('anbiya');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-ANBIYA ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الأنبياء') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Anbiya!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Anbiya!');
  process.exit(1);
}

// Test switchSurah('hajj')
console.log('\nTesting switchSurah("hajj")...');
context.switchSurah('hajj');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-HAJJ ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الحج') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Hajj!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Hajj!');
  process.exit(1);
}

// Test switchSurah('muminun')
console.log('\nTesting switchSurah("muminun")...');
context.switchSurah('muminun');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-MU\'MINUN ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة المؤمنون') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Muminun!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Muminun!');
  process.exit(1);
}

// Test switchSurah('nur')
console.log('\nTesting switchSurah("nur")...');
context.switchSurah('nur');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AN-NUR ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة النور') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Nur!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Nur!');
  process.exit(1);
}

// Test switchSurah('furqan')
console.log('\nTesting switchSurah("furqan")...');
context.switchSurah('furqan');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-FURQAN ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الفرقان') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Furqan!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Furqan!');
  process.exit(1);
}

// Test switchSurah('shuara')
console.log('\nTesting switchSurah("shuara")...');
context.switchSurah('shuara');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH ASH-SHU\'ARA ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الشعراء') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Shuara!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Shuara!');
  process.exit(1);
}

// Test switchSurah('naml')
console.log('\nTesting switchSurah("naml")...');
context.switchSurah('naml');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AN-NAML ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة النمل') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Naml!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Naml!');
  process.exit(1);
}

// Test switchSurah('qasas')
console.log('\nTesting switchSurah("qasas")...');
context.switchSurah('qasas');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-QASAS ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة القصص') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Qasas!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Qasas!');
  process.exit(1);
}

// Test switchSurah('ankabut')
console.log('\nTesting switchSurah("ankabut")...');
context.switchSurah('ankabut');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-ANKABUT ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة العنكبوت') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Ankabut!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Ankabut!');
  process.exit(1);
}

// Test switchSurah('rum')
console.log('\nTesting switchSurah("rum")...');
context.switchSurah('rum');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AR-RUM ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الروم') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Rum!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Rum!');
  process.exit(1);
}

// Test switchSurah('luqman')
console.log('\nTesting switchSurah("luqman")...');
context.switchSurah('luqman');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH LUQMAN ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة لقمان') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Luqman!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Luqman!');
  process.exit(1);
}

// Test switchSurah('sajdah')
console.log('\nTesting switchSurah("sajdah")...');
context.switchSurah('sajdah');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AS-SAJDAH ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة السجدة') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Sajdah!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Sajdah!');
  process.exit(1);
}

// Test switchSurah('ahzab')
console.log('\nTesting switchSurah("ahzab")...');
context.switchSurah('ahzab');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-AHZAB ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الأحزاب') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Ahzab!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Ahzab!');
  process.exit(1);
}

// Test switchSurah('saba')
console.log('\nTesting switchSurah("saba")...');
context.switchSurah('saba');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH SABA ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة سبأ') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Saba!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Saba!');
  process.exit(1);
}

// Test switchSurah('fatir')
console.log('\nTesting switchSurah("fatir")...');
context.switchSurah('fatir');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH FATIR ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة فاطر') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Fatir!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Fatir!');
  process.exit(1);
}

// Test switchSurah('yasin')
console.log('\nTesting switchSurah("yasin")...');
context.switchSurah('yasin');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH YA-SIN ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة يس') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Yasin!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Yasin!');
  process.exit(1);
}

// Test switchSurah('saffat')
console.log('\nTesting switchSurah("saffat")...');
context.switchSurah('saffat');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AS-SAFFAT ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الصافات') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Saffat!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Saffat!');
  process.exit(1);
}

// Test switchSurah('sad')
console.log('\nTesting switchSurah("sad")...');
context.switchSurah('sad');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH SAD ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة ص') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Sad!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Sad!');
  process.exit(1);
}

// Test switchSurah('zumar')
console.log('\nTesting switchSurah("zumar")...');
context.switchSurah('zumar');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AZ-ZUMAR ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الزمر') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Zumar!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Zumar!');
  process.exit(1);
}

// Test switchSurah('ghafir')
console.log('\nTesting switchSurah("ghafir")...');
context.switchSurah('ghafir');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH GHAFIR ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة غافر') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Ghafir!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Ghafir!');
  process.exit(1);
}

// Test switchSurah('fussilat')
console.log('\nTesting switchSurah("fussilat")...');
context.switchSurah('fussilat');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH FUSSILAT ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة فصلت') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Fussilat!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Fussilat!');
  process.exit(1);
}

// Test switchSurah('shura')
console.log('\nTesting switchSurah("shura")...');
context.switchSurah('shura');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH ASH-SHURA ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الشورى') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Shura!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Shura!');
  process.exit(1);
}

// Test switchSurah('zukhruf')
console.log('\nTesting switchSurah("zukhruf")...');
context.switchSurah('zukhruf');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AZ-ZUKHRUF ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الزخرف') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Zukhruf!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Zukhruf!');
  process.exit(1);
}

// Test switchSurah('dukhan')
console.log('\nTesting switchSurah("dukhan")...');
context.switchSurah('dukhan');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AD-DUKHAN ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الدخان') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Dukhan!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Dukhan!');
  process.exit(1);
}

// Test switchSurah('jathiyah')
console.log('\nTesting switchSurah("jathiyah")...');
context.switchSurah('jathiyah');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-JATHIYAH ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الجاثية') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Jathiyah!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Jathiyah!');
  process.exit(1);
}

// Test switchSurah('ahqaf')
console.log('\nTesting switchSurah("ahqaf")...');
context.switchSurah('ahqaf');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-AHQAF ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الأحقاف') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Ahqaf!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Ahqaf!');
  process.exit(1);
}

// Test switchSurah('muhammad')
console.log('\nTesting switchSurah("muhammad")...');
context.switchSurah('muhammad');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH MUHAMMAD ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة محمد') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Muhammad!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Muhammad!');
  process.exit(1);
}

// Test switchSurah('fath')
console.log('\nTesting switchSurah("fath")...');
context.switchSurah('fath');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-FATH ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الفتح') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Fath!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Fath!');
  process.exit(1);
}

// Test switchSurah('hujurat')
console.log('\nTesting switchSurah("hujurat")...');
context.switchSurah('hujurat');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-HUJURAT ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الحجرات') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Hujurat!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Hujurat!');
  process.exit(1);
}

// Test switchSurah('qaf')
console.log('\nTesting switchSurah("qaf")...');
context.switchSurah('qaf');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH QAF ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة ق') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Qaf!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Qaf!');
  process.exit(1);
}

// Test switchSurah('dhariyat')
console.log('\nTesting switchSurah("dhariyat")...');
context.switchSurah('dhariyat');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH ADH-DHARIYAT ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الذاريات') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Dhariyat!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Dhariyat!');
  process.exit(1);
}

// Test switchSurah('tur')
console.log('\nTesting switchSurah("tur")...');
context.switchSurah('tur');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AT-TUR ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الطور') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Tur!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Tur!');
  process.exit(1);
}

// Test switchSurah('najm')
console.log('\nTesting switchSurah("najm")...');
context.switchSurah('najm');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AN-NAJM ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة النجم') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Najm!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Najm!');
  process.exit(1);
}

// Test switchSurah('qamar')
console.log('\nTesting switchSurah("qamar")...');
context.switchSurah('qamar');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-QAMAR ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة القمر') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Qamar!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Qamar!');
  process.exit(1);
}

// Test switchSurah('rahman')
console.log('\nTesting switchSurah("rahman")...');
context.switchSurah('rahman');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AR-RAHMAN ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الرحمن') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Rahman!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Rahman!');
  process.exit(1);
}

// Test switchSurah('waqiah')
console.log('\nTesting switchSurah("waqiah")...');
context.switchSurah('waqiah');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-WAQI\'AH ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الواقعة') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Waqiah!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Waqiah!');
  process.exit(1);
}

// Test switchSurah('hadid')
console.log('\nTesting switchSurah("hadid")...');
context.switchSurah('hadid');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-HADID ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الحديد') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Hadid!');
  process.exit(1);
}
if (!dom.getElementById('rhymeLine').textContent.includes('الحَدِيد') && !dom.getElementById('rhymeLine').textContent.includes('الحديد')) {
  console.error('FAIL: rhymeLine does not mention Hadid!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Hadid!');
  process.exit(1);
}

// Test switchSurah('mujadilah')
console.log('\nTesting switchSurah("mujadilah")...');
context.switchSurah('mujadilah');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-MUJADILAH ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة المجادلة') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Mujadilah!');
  process.exit(1);
}
if (!dom.getElementById('rhymeLine').textContent.includes('المُجَادَلَة') && !dom.getElementById('rhymeLine').textContent.includes('المجادلة')) {
  console.error('FAIL: rhymeLine does not mention Mujadilah!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Mujadilah!');
  process.exit(1);
}

// Test switchSurah('hashr')
console.log('\nTesting switchSurah("hashr")...');
context.switchSurah('hashr');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-HASHR ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الحشر') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Hashr!');
  process.exit(1);
}
if (!dom.getElementById('rhymeLine').textContent.includes('الحَشْر') && !dom.getElementById('rhymeLine').textContent.includes('الحشر')) {
  console.error('FAIL: rhymeLine does not mention Hashr!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Hashr!');
  process.exit(1);
}

// Test switchSurah('mumtahanah')
console.log('\nTesting switchSurah("mumtahanah")...');
context.switchSurah('mumtahanah');

console.log('\n--- VERIFYING COLUMN 3 STATE FOR SURAH AL-MUMTAHANAH ---');
console.log('contextDeckSurahTitle:', dom.getElementById('contextDeckSurahTitle').textContent);
console.log('launchQuizBtnText:', dom.getElementById('launchQuizBtnText').textContent);
console.log('rhymeLine:', dom.getElementById('rhymeLine').textContent);
console.log('ruleSummary:', dom.getElementById('ruleSummary').innerHTML);
console.log('tadabbur items count:', dom.getElementById('tadabburList').children.length);

if (dom.getElementById('contextDeckSurahTitle').textContent !== 'سر التفرقة بالسياق في سورة الممتحنة') {
  console.error('FAIL: contextDeckSurahTitle is wrong for Mumtahanah!');
  process.exit(1);
}
if (!dom.getElementById('rhymeLine').textContent.includes('المُمْتَحَنَهْ') && !dom.getElementById('rhymeLine').textContent.includes('الممتحنة')) {
  console.error('FAIL: rhymeLine does not mention Mumtahanah!');
  process.exit(1);
}
if (dom.getElementById('tadabburList').children.length === 0) {
  console.error('FAIL: tadabburList is empty for Mumtahanah!');
  process.exit(1);
}

console.log('\n>>> ALL CLIENT SIMULATION CHECKS PASSED 100%! <<<');
