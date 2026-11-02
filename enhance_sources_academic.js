const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const startMarker = '<!-- 4. أمهات المصادر والمراجع العلمية المعتمدة -->';
const endMarker = '<!-- 5. بطاقة الإصدار والهوية -->';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Markers not found!');
    process.exit(1);
}

const detailedSourcesHtml = `<!-- 4. أمهات المصادر والمراجع العلمية المعتمدة -->
                <div style="background: rgba(0,0,0,0.4); padding: 0.95rem 1.15rem; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.3); box-shadow: inset 0 0 15px rgba(0,0,0,0.5);">
                    <div style="font-size: 0.92rem; color: var(--gold-light); font-weight: 800; margin-bottom: 0.45rem; display: flex; align-items: center; justify-content: space-between;">
                        <span style="display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fa-solid fa-book-journal-whills" style="color: var(--gold);"></i> التوثيق الأكاديمي والمصادر التراثية المعتمدة
                        </span>
                        <span style="font-size: 0.68rem; background: rgba(212, 175, 55, 0.15); color: var(--gold); padding: 2px 8px; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.3);">تحقيق تراثي معتمد</span>
                    </div>
                    <div style="font-size: 0.74rem; color: var(--text-muted); margin-bottom: 0.75rem; line-height: 1.6;">
                        كافة المتشابهات والتوجيهات البيانية والضوابط المنظومة في التطبيق محررة بدقة وفق التحقيق المعتمد لأمهات كتب علم المتشابه اللفظي لكبار أئمة التفسير والقراءات:
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 0.65rem; max-height: 270px; overflow-y: auto; padding-left: 0.3rem;">
                        
                        <!-- المصدر 1 -->
                        <div style="background: rgba(255,255,255,0.03); border-right: 3px solid var(--gold); padding: 0.55rem 0.75rem; border-radius: 6px;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline;">
                                <div style="font-weight: 700; color: #fff; font-size: 0.84rem;">١. البرهان في توجيه متشابه القرآن لما فيه من الحجة والبيان</div>
                                <span style="font-size: 0.68rem; color: var(--gold); font-family: monospace;">ت ~٥٠٥هـ</span>
                            </div>
                            <div style="font-size: 0.74rem; color: var(--gold); margin-top: 0.15rem; font-weight: 600;">
                                لتاج القراء، برهان الدين أبي القاسم محمود بن حمزة بن نصر الكرماني
                            </div>
                            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem; line-height: 1.45;">
                                <strong style="color: #cbd5e1;">التحقيق والشهرة:</strong> عمدة ضبط الفوارق اللفظية والتقديم والتأخير، ويُعرف أيضاً ومطبوع باسم <span style="color:#e2e8f0;">«أسرار التكرار في القرآن»</span> (حققته لجان علمية منها تحقيق د. عبد القادر عطا ود. السيد الجميلي).
                            </div>
                        </div>

                        <!-- المصدر 2 -->
                        <div style="background: rgba(255,255,255,0.03); border-right: 3px solid #34d399; padding: 0.55rem 0.75rem; border-radius: 6px;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline;">
                                <div style="font-weight: 700; color: #fff; font-size: 0.84rem;">٢. درة التنزيل وغرة التأويل في بيان الآيات المتشابهات في كتاب الله العزيز</div>
                                <span style="font-size: 0.68rem; color: #34d399; font-family: monospace;">ت ٤٢٠هـ</span>
                            </div>
                            <div style="font-size: 0.74rem; color: #34d399; margin-top: 0.15rem; font-weight: 600;">
                                للإمام أبي عبد الله محمد بن عبد الله الأصبهاني المعروف بـ «الخطيب الإسكافي»
                            </div>
                            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem; line-height: 1.45;">
                                <strong style="color: #cbd5e1;">التحقيق والشهرة:</strong> أقدم وأجلّ مراجع أسرار النظم البياني والزيادة والحذف؛ (نُسب قديماً خطأً للفخر الرازي أو للقاضي عبد الجبار، وثبت قطوعاً بمخطوطاته ونقول الأئمة أنه للإسكافي، بتحقيق د. محمد مصطفى آيدين ود. درويش الجندي).
                            </div>
                        </div>

                        <!-- المصدر 3 -->
                        <div style="background: rgba(255,255,255,0.03); border-right: 3px solid #38bdf8; padding: 0.55rem 0.75rem; border-radius: 6px;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline;">
                                <div style="font-weight: 700; color: #fff; font-size: 0.84rem;">٣. ملاك التأويل القاطع بذوي الإلحاد والتعطيل في توجيه المتشابه اللفظ من آي التنزيل</div>
                                <span style="font-size: 0.68rem; color: #38bdf8; font-family: monospace;">ت ٧٠٨هـ</span>
                            </div>
                            <div style="font-size: 0.74rem; color: #38bdf8; margin-top: 0.15rem; font-weight: 600;">
                                للحافظ المقرئ أبي جعفر أحمد بن إبراهيم بن الزبير الثقفي العاصمي الغرناطي
                            </div>
                            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem; line-height: 1.45;">
                                <strong style="color: #cbd5e1;">التحقيق والشهرة:</strong> ميزان السياق القرآني الأعظم، وسر تعليل فوارق العبارات بمناسبة مقاصد السور، ورَدّ توهم التناقض (حقق في رسائل علمية رفيعة منها تحقيق د. سعيد الفلاح بدار الغرب الإسلامي).
                            </div>
                        </div>

                        <!-- المصدر 4 -->
                        <div style="background: rgba(255,255,255,0.03); border-right: 3px solid #fbbf24; padding: 0.55rem 0.75rem; border-radius: 6px;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline;">
                                <div style="font-weight: 700; color: #fff; font-size: 0.84rem;">٤. هداية المرتاب وغاية الحفاظ والطلاب في تبيين متشابه الكتاب</div>
                                <span style="font-size: 0.68rem; color: #fbbf24; font-family: monospace;">ت ٦٤٣هـ</span>
                            </div>
                            <div style="font-size: 0.74rem; color: #fbbf24; margin-top: 0.15rem; font-weight: 600;">
                                للإمام المقرئ المفسر النحوي علم الدين أبي الحسن علي بن محمد الهمداني السخاوي
                            </div>
                            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem; line-height: 1.45;">
                                <strong style="color: #cbd5e1;">التحقيق والشهرة:</strong> المنظومة اللامية الأشهر عالمياً في حصر المتشابهات اللفظية (تلميذ الإمام الشاطبي، وتمييزاً له عن المؤرخ المتأخر شمس الدين السخاوي ت ٩٠٢هـ؛ شُرحت المنظومة بشروح جليلة منها شرح الشيخ علي الضباع شيخ المقارئ المصرية).
                            </div>
                        </div>

                        <!-- المصدر 5 -->
                        <div style="background: rgba(255,255,255,0.03); border-right: 3px solid #c084fc; padding: 0.55rem 0.75rem; border-radius: 6px;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline;">
                                <div style="font-weight: 700; color: #fff; font-size: 0.84rem;">٥. كشف المعاني في متشابه المثاني</div>
                                <span style="font-size: 0.68rem; color: #c084fc; font-family: monospace;">ت ٧٣٣هـ</span>
                            </div>
                            <div style="font-size: 0.74rem; color: #c084fc; margin-top: 0.15rem; font-weight: 600;">
                                لشيخ الإسلام قاضي القضاة بدر الدين أبي عبد الله محمد بن إبراهيم بن جماعة الكناني الحموي
                            </div>
                            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem; line-height: 1.45;">
                                <strong style="color: #cbd5e1;">التحقيق والشهرة:</strong> التحقيق الإيجازي اللطيف والربط المعنوي المتقن بين الآيات المتشابهة في مبانيها ومعانيها (حققه د. عبد الجواد خلف، وطبع بدار الوفاء).
                            </div>
                        </div>

                        <!-- المصدر 6 -->
                        <div style="background: rgba(255,255,255,0.03); border-right: 3px solid #f43f5e; padding: 0.55rem 0.75rem; border-radius: 6px;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline;">
                                <div style="font-weight: 700; color: #fff; font-size: 0.84rem;">٦. فتح الرحمن بكشف ما يلتبس في القرآن</div>
                                <span style="font-size: 0.68rem; color: #fb7185; font-family: monospace;">ت ٩٢٦هـ</span>
                            </div>
                            <div style="font-size: 0.74rem; color: #fb7185; margin-top: 0.15rem; font-weight: 600;">
                                لشيخ الإسلام زين الدين أبي يحيى زكريا بن محمد بن أحمد بن زكريا الأنصاري السنيكي القاهري
                            </div>
                            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem; line-height: 1.45;">
                                <strong style="color: #cbd5e1;">التحقيق والشهرة:</strong> الجامع المحرر الخاتم لتحقيقات المتقدمين، مع التوجيه النحوي والتفسيري المقارن لكل موضع مشكل (حققه العلامة المحدث د. نور الدين عتر بدار القرآن بدمشق).
                            </div>
                        </div>

                    </div>
                </div>

                `;

html = html.substring(0, startIndex) + detailedSourcesHtml + html.substring(endIndex);
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully enhanced canonical sources with comprehensive scholarly documentation!');
