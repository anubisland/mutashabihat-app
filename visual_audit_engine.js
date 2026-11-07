const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8089;
const WORKSPACE = 'C:\\Users\\melwa\\.gemini\\antigravity\\scratch\\mutashabihat-app';
const ARTIFACTS_DIR = 'C:\\Users\\melwa\\.gemini\\antigravity\\brain\\4e7ffec0-6a41-4532-8faa-7fb28d8bccd1';

// 1. Local HTTP Server
const server = http.createServer((req, res) => {
    let filePath = path.join(WORKSPACE, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        return res.end('Not found');
    }
    const ext = path.extname(filePath);
    const mimeMap = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.svg': 'image/svg+xml',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg'
    };
    res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'text/plain' });
    fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, async () => {
    console.log(`Test server running at http://localhost:${PORT}`);
    try {
        await runHeadlessChromeTests();
    } catch (e) {
        console.error('Error in headless test:', e);
    } finally {
        server.close();
        process.exit(0);
    }
});

async function runHeadlessChromeTests() {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const userDataDir = path.join(WORKSPACE, '.chrome_test_profile');
    
    const chromeProcess = spawn(chromePath, [
        '--headless=new',
        '--remote-debugging-port=9222',
        `--user-data-dir=${userDataDir}`,
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check'
    ]);

    // Wait for Chrome to listen on 9222
    let wsUrl = '';
    for (let i = 0; i < 20; i++) {
        await new Promise(r => setTimeout(r, 400));
        try {
            const resp = await fetch('http://localhost:9222/json/version');
            const data = await resp.json();
            wsUrl = data.webSocketDebuggerUrl;
            if (wsUrl) break;
        } catch (e) {}
    }

    if (!wsUrl) {
        chromeProcess.kill();
        throw new Error('Could not connect to Chrome debugger WebSocket');
    }
    console.log('Connected to Chrome CDP:', wsUrl);

    // Connect to the page target
    let tabWsUrl;
    try {
        const listResp = await fetch('http://localhost:9222/json/list');
        const list = await listResp.json();
        const pageTab = list.find(t => t.type === 'page');
        if (pageTab) tabWsUrl = pageTab.webSocketDebuggerUrl;
    } catch (e) {}

    if (!tabWsUrl) {
        const newTabResp = await fetch('http://localhost:9222/json/new', { method: 'PUT' });
        const tabData = await newTabResp.json();
        tabWsUrl = tabData.webSocketDebuggerUrl;
    }

    const ws = new WebSocket(tabWsUrl);
    await new Promise(r => ws.onopen = r);

    let msgId = 1;
    const callbacks = new Map();
    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && callbacks.has(msg.id)) {
            callbacks.get(msg.id)(msg);
            callbacks.delete(msg.id);
        }
    };

    function send(method, params = {}) {
        return new Promise((resolve, reject) => {
            const id = msgId++;
            callbacks.set(id, (msg) => {
                if (msg.error) reject(msg.error);
                else resolve(msg.result);
            });
            ws.send(JSON.stringify({ id, method, params }));
        });
    }

    await send('Page.enable');
    await send('DOM.enable');
    await send('Runtime.enable');

    console.log('Navigating to http://localhost:' + PORT + '/index.html ...');
    await send('Page.navigate', { url: `http://localhost:${PORT}/index.html` });
    await new Promise(r => setTimeout(r, 2000));

    console.log('--- Page loaded, starting viewport test ---');

    // Helper to evaluate JS in the page
    async function evalCode(expr) {
        const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
        return res.result.value;
    }

    // Helper to take screenshot
    async function takeScreenshot(filename) {
        const shot = await send('Page.captureScreenshot', { format: 'png' });
        const buf = Buffer.from(shot.data, 'base64');
        const savePath = path.join(ARTIFACTS_DIR, filename);
        fs.writeFileSync(savePath, buf);
        console.log(`[Screenshot Saved] -> ${savePath}`);
    }

    // TEST 1: Mobile Viewport 380x820
    console.log('\n=========================================');
    console.log('TEST SUITE 1: Mobile Portrait (380px x 820px)');
    console.log('=========================================');
    await send('Emulation.setDeviceMetricsOverride', {
        width: 380,
        height: 820,
        deviceScaleFactor: 2,
        mobile: true
    });
    await new Promise(r => setTimeout(r, 600));

    // A) Check Mode: Surah Mode (Default)
    console.log('\n--- Checking Mode: Surah Mode (Default) ---');
    let audit = await evalCode(`(${function() {
        const issues = [];
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Check horizontal overflow on document
        if (document.documentElement.scrollWidth > vw + 1) {
            issues.push('Document overflows viewport horizontally! scrollWidth=' + document.documentElement.scrollWidth + ' vs vw=' + vw);
        }

        // Check key elements
        const elementsToCheck = [
            { sel: '.master-navy-header', name: 'Header' },
            { sel: '.perspective-master-switch-bar', name: 'Perspective Bar' },
            { sel: '.controls-utility-bar', name: 'Controls Utility Bar' },
            { sel: '.font-sizer-group', name: 'Font Sizer Group' },
            { sel: '#btnDimMode', name: 'Dim Mode Button' },
            { sel: '#btnHeaderSearch', name: 'Header Search Button' },
            { sel: '.surah-horizon-bar', name: 'Horizon Ribbon' },
            { sel: '.active-stage-banner', name: 'Stage Banner' },
            { sel: '.scale-contrast-deck', name: 'Scale Deck' }
        ];

        elementsToCheck.forEach(item => {
            const el = document.querySelector(item.sel);
            if (!el) {
                issues.push('Element ' + item.name + ' (' + item.sel + ') NOT found in DOM!');
                return;
            }
            const r = el.getBoundingClientRect();
            if (r.right > vw + 1) {
                issues.push('Element ' + item.name + ' overflows right edge! right=' + Math.round(r.right) + ' > vw=' + vw);
            }
            if (r.left < -1) {
                issues.push('Element ' + item.name + ' overflows left edge! left=' + Math.round(r.left) + ' < 0');
            }
        });

        // Check if Juz subfilters are visible in Surah Mode
        const juzSub = document.getElementById('juzSubfiltersGroup');
        if (juzSub && getComputedStyle(juzSub).display !== 'none') {
            issues.push('CRITICAL BUG: juzSubfiltersGroup is visible in Surah Mode!');
        }

        // Check font sizer buttons
        const btnMinus = document.querySelector('.btn-font-minus');
        const btnPlus = document.querySelector('.btn-font-plus');
        if (btnPlus) {
            const rPlus = btnPlus.getBoundingClientRect();
            if (rPlus.right > vw + 1) issues.push('Button +A is clipped on right edge! right=' + Math.round(rPlus.right) + ' > vw=' + vw);
            if (rPlus.width === 0 || rPlus.height === 0) issues.push('Button +A has zero size!');
        }

        return { issues, vw, vh };
    }})()`);

    console.log('Surah Mode Audit Issues:', audit.issues);
    await takeScreenshot('audit_mobile_surah.png');

    // B) Switch to Juz Mode & Check Juz 4
    console.log('\n--- Switching to Juz Mode: Juz 4 ---');
    await evalCode(`setTier('juz'); switchJuz(4);`);
    await new Promise(r => setTimeout(r, 600));

    let auditJuz = await evalCode(`(${function() {
        const issues = [];
        const vw = window.innerWidth;

        // Check if juz dropdown matches selectedJuz
        const dropdown = document.getElementById('juzSelectDropdown');
        if (dropdown && dropdown.value !== '4') {
            issues.push('CRITICAL BUG: juzSelectDropdown.value (' + dropdown.value + ') does not match selectedJuz (4)!');
        }

        // Check if Juz subfilters are visible and not clipped
        const juzSub = document.getElementById('juzSubfiltersGroup');
        if (!juzSub || getComputedStyle(juzSub).display === 'none') {
            issues.push('Juz subfilters should be visible in Juz Mode but are hidden!');
        } else {
            const r = juzSub.getBoundingClientRect();
            if (r.right > vw + 1) issues.push('Juz subfilters overflow right edge! right=' + Math.round(r.right) + ' > vw=' + vw);
            if (r.left < -1) issues.push('Juz subfilters overflow left edge! left=' + Math.round(r.left) + ' < 0');
        }

        // Check the first 5 chips in horizon
        const chips = Array.from(document.querySelectorAll('.timeline-pin-chip'));
        const chipTexts = chips.slice(0, 5).map(c => c.textContent.trim());

        return { issues, chipTexts, chipsCount: chips.length };
    }})()`);

    console.log('Juz 4 Mode Audit Issues:', auditJuz.issues);
    console.log('Juz 4 Chips count:', auditJuz.chipsCount);
    console.log('Juz 4 First 5 Chips:', auditJuz.chipTexts);
    await takeScreenshot('audit_mobile_juz4.png');

    // C) Check Quran Atlas Mode
    console.log('\n--- Switching to Grand Quran Atlas Mode ---');
    await evalCode(`setTier('quran');`);
    await new Promise(r => setTimeout(r, 600));

    let auditAtlas = await evalCode(`(${function() {
        const issues = [];
        const vw = window.innerWidth;

        const juzSub = document.getElementById('juzSubfiltersGroup');
        if (juzSub && getComputedStyle(juzSub).display !== 'none') {
            issues.push('CRITICAL BUG: juzSubfiltersGroup is visible in Quran Atlas Mode!');
        }

        const atlasRibbon = document.getElementById('quranAtlasRibbon');
        if (!atlasRibbon || getComputedStyle(atlasRibbon).display === 'none') {
            issues.push('CRITICAL BUG: quranAtlasRibbon is hidden in Quran Atlas Mode!');
        }

        return { issues };
    }})()`);

    console.log('Atlas Mode Audit Issues:', auditAtlas.issues);
    await takeScreenshot('audit_mobile_atlas.png');

    // D) TEST 2: Tablet Portrait (810px x 1080px)
    console.log('\n=========================================');
    console.log('TEST SUITE 2: Tablet Portrait (810px x 1080px)');
    console.log('=========================================');
    await send('Emulation.setDeviceMetricsOverride', {
        width: 810,
        height: 1080,
        deviceScaleFactor: 2,
        mobile: true
    });
    await new Promise(r => setTimeout(r, 600));
    await evalCode(`setTier('surah'); switchSurah('baqarah');`);
    await new Promise(r => setTimeout(r, 500));

    let auditTablet = await evalCode(`(${function() {
        const issues = [];
        const vw = window.innerWidth;
        if (document.documentElement.scrollWidth > vw + 1) {
            issues.push('Tablet Portrait overflows viewport horizontally! scrollWidth=' + document.documentElement.scrollWidth);
        }
        return { issues };
    }})()`);

    console.log('Tablet Portrait Audit Issues:', auditTablet.issues);
    await takeScreenshot('audit_tablet_portrait.png');

    // E) TEST 3: Light Theme Test (Mobile 380x820 & Tablet 810x1080)
    console.log('\n=========================================');
    console.log('TEST SUITE 3: Light Theme Verification');
    console.log('=========================================');
    await send('Emulation.setDeviceMetricsOverride', {
        width: 380,
        height: 820,
        deviceScaleFactor: 2,
        mobile: true
    });
    await evalCode(`document.body.classList.add('light-theme');`);
    await new Promise(r => setTimeout(r, 600));
    await takeScreenshot('audit_mobile_light_theme.png');
    console.log('[Light Theme Mobile Screenshot Captured]');

    console.log('\n>>> VISUAL AUDIT COMPLETE <<<');
    ws.close();
    chromeProcess.kill();
}
