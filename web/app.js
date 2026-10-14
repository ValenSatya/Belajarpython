/**
 * Logika Aplikasi Kursus LKS AI Academy
 * LMS Berjenjang Monokromatik (No Blue, No Pure White/Black)
 * Ergonomis untuk Sesi Membaca Lama, KaTeX Render, Live Terminal, dan Parser Markdown Presisi.
 */

let currentModuleIdx = 1; // Default Bab 2 (KNN)
let currentLessonIdx = 0; // Default Sub-bab 2.1
let openModules = { "mod-2": true }; // Default Bab 2 terbuka

document.addEventListener("DOMContentLoaded", () => {
    buildSidebar();
    loadLesson(currentModuleIdx, currentLessonIdx);
    setupEventListeners();
});

function buildSidebar() {
    const navContainer = document.getElementById("sidebar-nav");
    if (!navContainer) return;

    let html = "";

    COURSE_MODULES.forEach((mod, modIdx) => {
        const isOpen = !!openModules[mod.id];
        const isCurrentMod = modIdx === currentModuleIdx;
        const modNumber = mod.icon || String(modIdx + 1).padStart(2, '0');

        html += `
            <div class="mb-2 border border-[#27272a] rounded-xl overflow-hidden bg-[#18181b]">
                <!-- Header Bab (Klik untuk Buka/Tutup Sub-Bab) -->
                <button 
                    onclick="toggleModule('${mod.id}', ${modIdx})"
                    class="w-full text-left px-3.5 py-3 flex items-center justify-between text-xs font-bold transition-all hover:bg-[#222226] ${
                        isCurrentMod ? 'text-[#f4f4f5] bg-[#222226]' : 'text-[#d4d4d8]'
                    }"
                >
                    <div class="flex items-center space-x-2.5 truncate">
                        <span class="w-6 h-6 rounded-md bg-[#222226] text-[#d4d4d8] font-mono text-[11px] font-bold flex items-center justify-center shrink-0 border border-[#333338]">${modNumber}</span>
                        <span class="truncate tracking-tight">${mod.title}</span>
                    </div>
                    <div class="flex items-center space-x-2 shrink-0">
                        <span class="text-[10px] bg-[#222226] text-[#a1a1aa] px-1.5 py-0.5 rounded font-mono border border-[#333338]">${mod.lessons.length}</span>
                        <svg class="w-3.5 h-3.5 text-[#a1a1aa] transition-transform ${isOpen ? 'rotate-180 text-[#f4f4f5]' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </div>
                </button>

                <!-- Daftar Sub-Bab / Pelajaran (Accordion Body) -->
                <div id="sub-babs-${mod.id}" class="${isOpen ? 'block' : 'hidden'} bg-[#121214] border-t border-[#27272a] p-1.5 space-y-1">
        `;

        mod.lessons.forEach((lesson, lesIdx) => {
            const isCurrentLesson = (modIdx === currentModuleIdx && lesIdx === currentLessonIdx);
            html += `
                <button 
                    onclick="loadLesson(${modIdx}, ${lesIdx})"
                    id="lesson-btn-${lesson.id}"
                    class="w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between group ${
                        isCurrentLesson 
                        ? 'bg-[#2a2a2e] text-[#f4f4f5] font-semibold border border-[#52525b] shadow-sm' 
                        : 'text-[#a1a1aa] hover:bg-[#222226] hover:text-[#e4e4e7]'
                    }"
                >
                    <div class="flex items-center space-x-2 truncate">
                        <span class="w-1.5 h-1.5 rounded-full shrink-0 ${isCurrentLesson ? 'bg-[#f4f4f5]' : 'bg-[#52525b] group-hover:bg-[#a1a1aa]'}"></span>
                        <span class="truncate">${lesson.title}</span>
                    </div>
                    <span class="text-[10px] opacity-60 font-mono shrink-0 ml-1.5">${lesson.readingTime || ''}</span>
                </button>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    navContainer.innerHTML = html;
}

function toggleModule(modId, modIdx) {
    openModules[modId] = !openModules[modId];
    buildSidebar();
}

function loadLesson(modIdx, lesIdx) {
    currentModuleIdx = modIdx;
    currentLessonIdx = lesIdx;

    const mod = COURSE_MODULES[modIdx];
    if (!mod) return;
    const lesson = mod.lessons[lesIdx];
    if (!lesson) return;

    // Pastikan bab yang aktif terbuka
    openModules[mod.id] = true;
    buildSidebar();

    // Render Breadcrumb & Judul Pelajaran
    document.getElementById("breadcrumb-mod").innerText = mod.title;
    document.getElementById("breadcrumb-les").innerText = lesson.title;
    document.getElementById("lesson-title").innerText = lesson.title;
    
    const timeEl = document.getElementById("lesson-reading-time");
    if (timeEl) {
        timeEl.innerHTML = `
            <svg class="w-3 h-3 text-[#a1a1aa] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>${lesson.readingTime || "5 menit membaca"}</span>
        `;
    }

    // Hitung posisi sebelumnya & selanjutnya
    const prevInfo = getPrevLesson(modIdx, lesIdx);
    const nextInfo = getNextLesson(modIdx, lesIdx);

    const prevBtn = document.getElementById("nav-prev-btn");
    const nextBtn = document.getElementById("nav-next-btn");

    if (prevBtn) {
        if (prevInfo) {
            prevBtn.classList.remove("opacity-30", "pointer-events-none");
            prevBtn.onclick = () => loadLesson(prevInfo.modIdx, prevInfo.lesIdx);
            document.getElementById("prev-label").innerText = `Sebelumnya: ${prevInfo.lesson.title}`;
        } else {
            prevBtn.classList.add("opacity-30", "pointer-events-none");
            document.getElementById("prev-label").innerText = "Materi Awal";
        }
    }

    if (nextBtn) {
        if (nextInfo) {
            nextBtn.classList.remove("opacity-30", "pointer-events-none");
            nextBtn.onclick = () => loadLesson(nextInfo.modIdx, nextInfo.lesIdx);
            document.getElementById("next-label").innerText = `Selanjutnya: ${nextInfo.lesson.title}`;
        } else {
            nextBtn.classList.add("opacity-30", "pointer-events-none");
            document.getElementById("next-label").innerText = "Selesai Seluruh Kursus";
        }
    }

    // Render Konten Pelajaran dengan Spacing Nyaman Monokromatik (text-[15px], leading-[1.8])
    const contentEl = document.getElementById("lesson-content");
    let contentHtml = `
        <div class="text-[#d4d4d8] text-[15px] leading-[1.8] space-y-5">
            ${formatLessonMarkdown(lesson.content, lesson)}
        </div>
    `;

    // Jika pelajaran memuat kodingan praktikum
    if (lesson.codePath) {
        contentHtml += `
            <div class="mt-10 pt-8 border-t border-[#27272a] space-y-5">
                <div class="flex flex-wrap items-center justify-between gap-3 bg-[#18181b] border border-[#27272a] rounded-xl px-5 py-3.5 shadow-sm">
                    <div>
                        <div class="text-xs font-semibold text-[#f4f4f5] flex items-center space-x-2">
                            <span class="w-2 h-2 rounded-full bg-[#a1a1aa]"></span>
                            <span>Praktikum Koding NumPy (100% From Scratch)</span>
                        </div>
                        <div class="text-[12px] font-mono text-[#a1a1aa] mt-1">File: <span class="text-[#e4e4e7]">${lesson.codePath}</span></div>
                    </div>
                    <button 
                        onclick="runPythonScript('${lesson.codePath}')"
                        id="run-btn"
                        class="bg-[#27272a] hover:bg-[#323236] active:bg-[#1f1f22] text-[#f4f4f5] border border-[#52525b] font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-2 shadow-sm transition active:scale-95"
                    >
                        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"/></svg>
                        <span>Jalankan Script Asli</span>
                    </button>
                </div>

                <!-- Code Viewer Box Monokromatik -->
                <div class="bg-[#121214] border border-[#27272a] rounded-xl overflow-hidden shadow-inner">
                    <div class="bg-[#18181b] px-4 py-2.5 border-b border-[#27272a] flex items-center justify-between text-xs text-[#a1a1aa]">
                        <span class="font-mono text-[11px] text-[#d4d4d8]">${lesson.codePath}</span>
                        <button onclick="copyCurrentCode()" class="text-[#a1a1aa] hover:text-[#f4f4f5] transition text-[11px] flex items-center space-x-1.5">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                            <span>Salin Kode</span>
                        </button>
                    </div>
                    <pre class="p-4 text-[13px] font-mono overflow-x-auto text-[#e4e4e7] leading-relaxed max-h-[400px]"><code id="code-display">Memuat kode dari sistem lokal...</code></pre>
                </div>

                <!-- Bedah Sintaks & Alur Perhitungan Matematis (Jika Ada) -->
                ${renderSyntaxBreakdownHtml(lesson.syntaxBreakdown)}

                <!-- Terminal Output Live Window Monokromatik -->
                <div class="bg-[#101012] border border-[#27272a] rounded-xl overflow-hidden shadow-sm">
                    <div class="bg-[#18181b] px-4 py-2.5 border-b border-[#27272a] flex items-center justify-between text-xs text-[#a1a1aa]">
                        <div class="flex items-center space-x-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#3f3f46]"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-[#3f3f46]"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-[#3f3f46]"></span>
                            <span class="ml-2 font-mono text-[11px] text-[#d4d4d8]">Output Terminal Python</span>
                        </div>
                        <span id="exec-status" class="text-[10px] text-[#71717a] font-mono">Siap</span>
                    </div>
                    <pre id="terminal-output" class="p-4 text-[13px] font-mono text-[#d4d4d8] overflow-x-auto max-h-[300px] whitespace-pre-wrap leading-relaxed">Klik tombol [Jalankan Script Asli] di atas untuk mengeksekusi script ini secara nyata di laptopmu.</pre>
                </div>
            </div>
        `;
    } else if (lesson.syntaxBreakdown && lesson.syntaxBreakdown.length > 0) {
        contentHtml += renderSyntaxBreakdownHtml(lesson.syntaxBreakdown);
    }

    contentEl.innerHTML = contentHtml;

    // Load file kode jika ada
    if (lesson.codePath) {
        fetch(`/api/file?path=${encodeURIComponent(lesson.codePath)}`)
            .then(res => res.text())
            .then(codeText => {
                const codeEl = document.getElementById("code-display");
                if (codeEl) codeEl.innerText = codeText;
            })
            .catch(err => {
                const codeEl = document.getElementById("code-display");
                if (codeEl) codeEl.innerText = `# Gagal memuat file: ${err.message}`;
            });
    }

    // Render KaTeX Math
    if (window.renderMathInElement) {
        window.renderMathInElement(contentEl, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false }
            ],
            throwOnError: false
        });
    }

    // Apply Interactive Glossary Tooltips (Underline + Hover Definition)
    if (typeof applyGlossaryTooltips === "function") {
        applyGlossaryTooltips(contentEl);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function getPrevLesson(modIdx, lesIdx) {
    if (lesIdx > 0) {
        return { modIdx, lesIdx: lesIdx - 1, lesson: COURSE_MODULES[modIdx].lessons[lesIdx - 1] };
    }
    if (modIdx > 0) {
        const prevMod = COURSE_MODULES[modIdx - 1];
        const lastLesIdx = prevMod.lessons.length - 1;
        return { modIdx: modIdx - 1, lesIdx: lastLesIdx, lesson: prevMod.lessons[lastLesIdx] };
    }
    return null;
}

function getNextLesson(modIdx, lesIdx) {
    const curMod = COURSE_MODULES[modIdx];
    if (lesIdx < curMod.lessons.length - 1) {
        return { modIdx, lesIdx: lesIdx + 1, lesson: curMod.lessons[lesIdx + 1] };
    }
    if (modIdx < COURSE_MODULES.length - 1) {
        const nextMod = COURSE_MODULES[modIdx + 1];
        return { modIdx: modIdx + 1, lesIdx: 0, lesson: nextMod.lessons[0] };
    }
    return null;
}

const LESSON_DIAGRAM_MAPPING = {
    // Bab 1: Fondasi ML & Preprocessing
    "1.1": "ml_paradigm",
    "1.2": "ml_pipeline",
    // Bab 2: KNN
    "2.1": "knn_geometry",
    "2.2": "distance_metrics",
    // Bab 3: Decision Tree
    "3.1": "decision_tree_partition",
    // Bab 4: Naive Bayes
    "4.1": "naive_bayes_gaussian",
    // Bab 5: Regresi Linier
    "5.1": "linear_regression_residuals",
    // Bab 6: Regresi Logistik
    "6.1": "logistic_regression_sigmoid",
    // Bab 7: Evaluasi Klasifikasi
    "7.1": "confusion_matrix_grid",
    // Bab 9: K-Means
    "9.1": "kmeans_iterations",
    // Bab 10: Hierarchical
    "10.1": "dendrogram_hierarchy"
};

function renderDiagramCard(diagramId) {
    if (typeof COURSE_DIAGRAMS === "undefined" || !COURSE_DIAGRAMS[diagramId]) return "";
    const d = COURSE_DIAGRAMS[diagramId];
    return `
        <!-- Diagram Visualisasi Konsep Vektor Monokromatik -->
        <div class="my-8 bg-[#18181b] border border-[#27272a] rounded-xl p-5 shadow-sm space-y-3.5">
            <div class="flex items-center justify-between border-b border-[#27272a] pb-3">
                <div class="flex items-center space-x-2.5">
                    <span class="w-2 h-2 rounded-full bg-[#a1a1aa]"></span>
                    <h4 class="text-[13.5px] font-bold text-[#f4f4f5] tracking-tight">${d.title}</h4>
                </div>
                <span class="text-[9.5px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#222226] text-[#a1a1aa] border border-[#333338]">${d.category || "VISUALISASI KONSEP"}</span>
            </div>
            <div class="overflow-x-auto rounded-lg bg-[#141416] p-3 flex justify-center border border-[#27272a]">
                ${d.svg}
            </div>
            <div class="text-[12.5px] text-[#a1a1aa] leading-relaxed pt-0.5 flex items-start space-x-2 bg-[#141416]/50 p-2.5 rounded-lg border border-[#27272a]/60">
                <span class="font-mono text-[#d4d4d8] font-bold shrink-0 text-[11px] uppercase tracking-wider">Keterangan:</span>
                <span class="text-[#d4d4d8]">${d.caption}</span>
            </div>
        </div>
    `;
}

function formatLessonMarkdown(text, lesson = null) {
    if (!text) return "";

    // Tentukan apakah pelajaran ini memiliki diagram konsep
    let diagramId = lesson?.diagramId;
    if (!diagramId && lesson?.title) {
        const match = lesson.title.match(/^(\d+\.\d+)/);
        if (match && LESSON_DIAGRAM_MAPPING[match[1]]) {
            diagramId = LESSON_DIAGRAM_MAPPING[match[1]];
        }
    }

    let diagramInserted = false;

    const rendered = text.split("\n\n").map(block => {
        block = block.trim();
        if (!block) return "";

        // Raw HTML / SVG block
        if (block.startsWith("<div") || block.startsWith("<svg") || block.startsWith("<figure")) {
            return block;
        }

        // Tag Diagram Khusus :::diagram <id>
        if (block.startsWith(":::diagram")) {
            const diagId = block.replace(":::diagram", "").replace(":::", "").trim();
            diagramInserted = true;
            return renderDiagramCard(diagId);
        }

        // Horizontal Rule
        if (block === "---") {
            // Sisipkan diagram konsep tepat di garis pemisah pertama (antara Bab Teori Dasar dan Bagian 2)
            if (diagramId && !diagramInserted) {
                diagramInserted = true;
                return renderDiagramCard(diagramId) + `<hr class="border-[#27272a] my-8">`;
            }
            return `<hr class="border-[#27272a] my-8">`;
        }

        // Markdown Table Monokromatik
        if (block.includes("|") && block.includes("\n|")) {
            const lines = block.split("\n");
            const firstTableIdx = lines.findIndex(l => l.trim().startsWith("|"));
            if (firstTableIdx > 0) {
                const before = lines.slice(0, firstTableIdx).join("\n").trim();
                const tablePart = lines.slice(firstTableIdx).join("\n").trim();
                return formatLessonMarkdown(before) + formatLessonMarkdown(tablePart);
            }
            if (lines.length >= 2) {
                const headerLine = lines[0];
                const dataLines = lines.slice(2);
                const headers = headerLine.split("|").slice(1, -1).map(h => h.trim());
                
                let tableHtml = `<div class="overflow-x-auto my-6 rounded-xl border border-[#27272a] shadow-sm"><table class="w-full text-left text-[14px] border-collapse">`;
                tableHtml += `<thead class="bg-[#1f1f23] text-[#f4f4f5] font-semibold border-b border-[#27272a]"><tr>`;
                headers.forEach(h => {
                    tableHtml += `<th class="px-4 py-3">${formatInline(h)}</th>`;
                });
                tableHtml += `</tr></thead><tbody class="divide-y divide-[#27272a] bg-[#141416]">`;
                dataLines.forEach((rowLine, rIdx) => {
                    const cells = rowLine.split("|").slice(1, -1).map(c => c.trim());
                    tableHtml += `<tr class="${rIdx % 2 === 1 ? 'bg-[#1a1a1e]/60' : ''} hover:bg-[#222226] transition">`;
                    cells.forEach(c => {
                        tableHtml += `<td class="px-4 py-2.5 text-[#d4d4d8]">${formatInline(c)}</td>`;
                    });
                    tableHtml += `</tr>`;
                });
                tableHtml += `</tbody></table></div>`;
                return tableHtml;
            }
        }

        // Headings with trailing content
        if (block.startsWith("### ")) {
            const firstNl = block.indexOf("\n");
            if (firstNl !== -1) {
                const head = block.slice(0, firstNl).replace("### ", "").trim();
                const rest = block.slice(firstNl + 1).trim();
                return `<h3 class="text-lg font-bold text-[#f4f4f5] mt-9 mb-3.5 border-b border-[#27272a] pb-2 tracking-tight">${formatInline(head)}</h3>` + formatLessonMarkdown(rest);
            }
            return `<h3 class="text-lg font-bold text-[#f4f4f5] mt-9 mb-3.5 border-b border-[#27272a] pb-2 tracking-tight">${formatInline(block.replace("### ", ""))}</h3>`;
        }
        if (block.startsWith("#### ")) {
            const firstNl = block.indexOf("\n");
            if (firstNl !== -1) {
                const head = block.slice(0, firstNl).replace("#### ", "").trim();
                const rest = block.slice(firstNl + 1).trim();
                return `<h4 class="text-base font-semibold text-[#e4e4e7] mt-6 mb-2 tracking-tight">${formatInline(head)}</h4>` + formatLessonMarkdown(rest);
            }
            return `<h4 class="text-base font-semibold text-[#e4e4e7] mt-6 mb-2 tracking-tight">${formatInline(block.replace("#### ", ""))}</h4>`;
        }

        // Blockquotes (Callouts/Tips/Alerts) - Monokromatik Elegan
        if (block.startsWith("> ")) {
            const cleanContent = block.split("\n").map(l => l.replace(/^>\s?/, "")).join("<br>");
            let tagText = "CATATAN TEKNIS";

            if (block.includes("PERINGATAN") || block.includes("BAHAYA") || block.includes("JEBAKAN")) {
                tagText = "PERINGATAN UJIAN LKS";
            } else if (block.includes("TIPS")) {
                tagText = "TIPS KOMPETISI LKS";
            }

            return `
                <div class="my-6 border-l-4 border-[#71717a] bg-[#1c1c1f] p-4.5 rounded-r-xl border-y border-r border-[#27272a] text-[#d4d4d8] text-[14.5px] leading-relaxed shadow-sm">
                    <div class="mb-2">
                        <span class="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border text-[#d4d4d8] bg-[#27272a] border-[#3f3f46]">
                            ${tagText}
                        </span>
                    </div>
                    <div class="space-y-1.5 text-[#d4d4d8]">
                        ${formatInline(cleanContent)}
                    </div>
                </div>
            `;
        }

        // Code block
        if (block.startsWith("```")) {
            const code = block.replace(/```python|```/g, "").trim();
            return `<pre class="bg-[#121214] p-4 rounded-xl border border-[#27272a] text-[13px] font-mono text-[#e4e4e7] overflow-x-auto my-4 leading-relaxed shadow-inner"><code>${escapeHtml(code)}</code></pre>`;
        }

        // Math Block $$ ... $$
        if (block.startsWith("$$") && block.endsWith("$$")) {
            return `<div class="bg-[#18181b] p-4.5 rounded-xl border border-[#27272a] my-6 overflow-x-auto text-center font-serif text-[#f4f4f5] text-base shadow-sm">${block}</div>`;
        }

        // General Block (Paragraph & Lists)
        return parseBlockContent(block);
    }).join("");

    if (diagramId && !diagramInserted) {
        return rendered + renderDiagramCard(diagramId);
    }

    return rendered;
}

function parseBlockContent(block) {
    const lines = block.split("\n");
    let html = "";
    let inList = false;
    let listType = "ul";
    let currentParagraph = [];

    function flushParagraph() {
        if (currentParagraph.length > 0) {
            html += `<p class="text-[#d4d4d8] text-[15px] leading-[1.8] mb-4">${formatInline(currentParagraph.join("<br>"))}</p>`;
            currentParagraph = [];
        }
    }

    function flushList() {
        if (inList) {
            html += listType === "ul" ? `</ul>` : `</ol>`;
            inList = false;
        }
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Check if line is bullet list item: - or *
        const ulMatch = line.match(/^[-*]\s+(.*)$/);
        // Check if line is numbered list item: 1. 2.
        const olMatch = line.match(/^\d+\.\s+(.*)$/);

        if (ulMatch) {
            flushParagraph();
            if (!inList || listType !== "ul") {
                flushList();
                html += `<ul class="list-disc list-inside space-y-2.5 mb-5 pl-2 text-[#d4d4d8] text-[15px] leading-[1.8]">`;
                inList = true;
                listType = "ul";
            }
            html += `<li class="leading-[1.8] pl-1">${formatInline(ulMatch[1])}</li>`;
        } else if (olMatch) {
            flushParagraph();
            if (!inList || listType !== "ol") {
                flushList();
                html += `<ol class="list-decimal list-inside space-y-2.5 mb-5 pl-2 text-[#d4d4d8] text-[15px] leading-[1.8]">`;
                inList = true;
                listType = "ol";
            }
            html += `<li class="leading-[1.8] pl-1">${formatInline(olMatch[1])}</li>`;
        } else {
            flushList();
            currentParagraph.push(line);
        }
    }

    flushParagraph();
    flushList();
    return html;
}

function formatInline(str) {
    if (!str) return "";
    let s = str;
    
    // 1. Inline code: `code` (Monokromatik)
    s = s.replace(/`([^`]+)`/g, '<code class="text-[#e4e4e7] bg-[#222226] border border-[#333338] px-1.5 py-0.5 rounded text-[13px] font-mono font-medium">$1</code>');
    
    // 2. Bold: **bold** (non-greedy, text-[#f4f4f5])
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-[#f4f4f5]">$1</strong>');
    
    // 3. Italic: *italic* (non-greedy, strictly not adjacent to *)
    s = s.replace(/(^|[^*])\*([^*]+?)\*([^*]|$)/g, '$1<em class="italic text-[#a1a1aa]">$2</em>$3');
    
    return s;
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatExplanation(text) {
    if (!text) return "";
    let escaped = escapeHtml(text);
    // Render `inline code`
    escaped = escaped.replace(/`([^`]+)`/g, '<code class="text-[#e4e4e7] bg-[#222226] border border-[#333338] px-1.5 py-0.5 rounded text-[12px] font-mono font-medium">$1</code>');
    // Render **bold text**
    escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#f4f4f5] font-semibold">$1</strong>');
    return escaped;
}

function renderSyntaxBreakdownHtml(breakdownList) {
    if (!breakdownList || breakdownList.length === 0) return "";
    return `
        <!-- Bedah Sintaks & Logika Perhitungan Monokromatik -->
        <div class="bg-[#18181b] border border-[#27272a] rounded-xl p-6 shadow-sm space-y-4 my-6">
            <div class="flex items-center justify-between border-b border-[#27272a] pb-3.5">
                <div class="flex items-center space-x-3">
                    <span class="w-7 h-7 rounded-lg bg-[#222226] border border-[#333338] text-[#d4d4d8] text-xs font-mono font-bold flex items-center justify-center">01</span>
                    <div>
                        <h4 class="text-[14px] font-bold text-[#f4f4f5] tracking-tight">Analisis Logika &amp; Komputasi Matematis</h4>
                        <p class="text-[12px] text-[#a1a1aa]">Penjelasan langkah demi langkah mekanisme aljabar linier dan NumPy dari script di atas.</p>
                    </div>
                </div>
                <span class="text-[11px] font-mono bg-[#222226] text-[#a1a1aa] border border-[#333338] px-2.5 py-0.5 rounded-full">${breakdownList.length} Bagian Logika</span>
            </div>

            <div class="grid grid-cols-1 gap-3.5 pt-1">
                ${breakdownList.map((item, idx) => `
                    <div class="bg-[#141416] border border-[#27272a] hover:border-[#52525b] rounded-xl p-4.5 transition-all duration-200 group">
                        <div class="flex items-start justify-between gap-3 mb-2.5">
                            <div class="flex items-center space-x-2.5 overflow-x-auto max-w-full">
                                <span class="w-5 h-5 rounded bg-[#222226] text-[#a1a1aa] group-hover:bg-[#3f3f46] group-hover:text-[#f4f4f5] flex items-center justify-center text-[10px] font-mono font-bold transition shrink-0 border border-[#333338]">
                                    ${idx + 1}
                                </span>
                                <code class="text-[13px] font-mono text-[#e4e4e7] bg-[#222226] border border-[#333338] px-2.5 py-1 rounded-md break-all">
                                    ${escapeHtml(item.syntax)}
                                </code>
                            </div>
                            <span class="text-[10px] uppercase tracking-wider font-mono text-[#71717a] shrink-0">Langkah ${idx + 1}</span>
                        </div>
                        <div class="text-[14px] text-[#d4d4d8] leading-relaxed pl-7">
                            ${formatExplanation(item.explanation)}
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
}

function runPythonScript(scriptPath) {
    const term = document.getElementById("terminal-output");
    const status = document.getElementById("exec-status");
    const btn = document.getElementById("run-btn");

    if (term) term.innerText = `Menjalankan: py ${scriptPath}...\nMenghitung algoritma matematika...\n`;
    if (status) status.innerText = "Executing...";
    if (btn) btn.disabled = true;

    fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script: scriptPath })
    })
    .then(res => res.json())
    .then(data => {
        if (btn) btn.disabled = false;
        if (status) status.innerText = `Selesai (Exit Code: ${data.exit_code})`;

        let result = "";
        if (data.stdout) result += data.stdout;
        if (data.stderr) result += "\n[STDERR]:\n" + data.stderr;
        if (!result) result = "(Tidak ada output teks)";

        if (term) term.innerText = result;
    })
    .catch(err => {
        if (btn) btn.disabled = false;
        if (status) status.innerText = "Error";
        if (term) term.innerText = `[ERROR]: ${err.message}`;
    });
}

function copyCurrentCode() {
    const codeEl = document.getElementById("code-display");
    if (codeEl) {
        navigator.clipboard.writeText(codeEl.innerText);
        alert("Kode berhasil disalin!");
    }
}

function setupEventListeners() {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            document.querySelectorAll("[id^='lesson-btn-']").forEach(btn => {
                const text = btn.innerText.toLowerCase();
                btn.style.display = text.includes(query) ? "flex" : "none";
            });
        });
    }

    // Initialize interactive glossary events
    setupGlossaryEvents();
}

// ==========================================
// INTERACTIVE GLOSSARY TOOLTIPS (DICODING STYLE)
// ==========================================

let currentHoveredTerm = null;

function applyGlossaryTooltips(container) {
    if (!container || typeof GLOSSARY_DATA === "undefined") return;

    // Urutkan istilah berdasarkan panjang karakter terpanjang agar frasa multi-kata cocok lebih dulu
    const terms = Object.keys(GLOSSARY_DATA).sort((a, b) => b.length - a.length);
    if (terms.length === 0) return;

    // Escape karakter khusus regex
    const escapedTerms = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi');

    // Batasi penandaan maksimal 2 kali per istilah per halaman agar teks tetap bersih dan nyaman dibaca
    const termCounts = {};

    // Kumpulkan seluruh text node yang diizinkan
    const textNodes = [];
    const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                if (!node.nodeValue || !node.nodeValue.trim()) {
                    return NodeFilter.FILTER_REJECT;
                }
                const parent = node.parentElement;
                if (!parent) return NodeFilter.FILTER_REJECT;
                // Jangan sentuh kode, rumus matematika KaTeX, tombol, atau elemen navigasi
                if (parent.closest('code, pre, .katex, button, svg, script, style, .glossary-term, #terminal-output, #code-display, h1, h2, [id^="breadcrumb"]')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    let currentNode;
    while ((currentNode = walker.nextNode())) {
        textNodes.push(currentNode);
    }

    textNodes.forEach(node => {
        const text = node.nodeValue;
        if (!pattern.test(text)) return;
        pattern.lastIndex = 0;

        let hasMatch = false;
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;

        while ((match = pattern.exec(text)) !== null) {
            const matchedStr = match[0];
            const lowerKey = matchedStr.toLowerCase();
            const glossaryInfo = GLOSSARY_DATA[lowerKey];
            const count = termCounts[lowerKey] || 0;

            // Jika bukan istilah atau sudah ditandai 2 kali, lewati penandaan
            if (!glossaryInfo || count >= 2) {
                continue;
            }

            hasMatch = true;
            termCounts[lowerKey] = count + 1;

            const matchIndex = match.index;
            if (matchIndex > lastIndex) {
                fragment.appendChild(document.createTextNode(text.substring(lastIndex, matchIndex)));
            }

            // Elemen istilah dengan garis bawah titik-titik (dotted underline) khas Dicoding / LMS modern
            const span = document.createElement("span");
            span.className = "glossary-term cursor-help border-b border-dotted border-[#71717a] hover:border-[#f4f4f5] hover:text-[#f4f4f5] transition-colors";
            span.setAttribute("data-term", glossaryInfo.term);
            span.setAttribute("data-category", glossaryInfo.category || "Glosarium");
            span.setAttribute("data-def", glossaryInfo.desc);
            span.textContent = matchedStr;
            fragment.appendChild(span);

            lastIndex = pattern.lastIndex;
        }

        if (hasMatch) {
            if (lastIndex < text.length) {
                fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
            }
            if (node.parentNode) {
                node.parentNode.replaceChild(fragment, node);
            }
        }
    });
}

function showGlossaryTooltip(targetEl) {
    const tooltip = document.getElementById("glossary-tooltip");
    const titleEl = document.getElementById("tooltip-term-title");
    const badgeEl = document.getElementById("tooltip-term-badge");
    const descEl = document.getElementById("tooltip-term-desc");
    if (!tooltip || !titleEl || !descEl) return;

    const term = targetEl.getAttribute("data-term") || targetEl.innerText;
    const cat = targetEl.getAttribute("data-category") || "Glosarium";
    const def = targetEl.getAttribute("data-def");
    if (!def) return;

    titleEl.innerText = term;
    if (badgeEl) badgeEl.innerText = cat;
    descEl.innerText = def;

    // Tampilkan elemen untuk menghitung dimensi kotak
    tooltip.classList.remove("hidden");
    
    const rect = targetEl.getBoundingClientRect();
    const tipRect = tooltip.getBoundingClientRect();
    
    const margin = 12;
    // Posisi default: di atas kata
    let top = rect.top - tipRect.height - 10;
    let left = rect.left + (rect.width / 2) - (tipRect.width / 2);

    // Jika melebihi batas atas layar peramban, tampilkan di bawah kata
    if (top < margin) {
        top = rect.bottom + 10;
    }

    // Pastikan kotak tidak terpotong tepi kiri maupun kanan layar
    if (left < margin) {
        left = margin;
    } else if (left + tipRect.width > window.innerWidth - margin) {
        left = window.innerWidth - tipRect.width - margin;
    }

    tooltip.style.top = `${Math.round(top)}px`;
    tooltip.style.left = `${Math.round(left)}px`;

    // Animasi transisi masuk halus
    requestAnimationFrame(() => {
        tooltip.classList.remove("opacity-0", "scale-95");
        tooltip.classList.add("opacity-100", "scale-100");
    });
}

function hideGlossaryTooltip() {
    const tooltip = document.getElementById("glossary-tooltip");
    if (!tooltip) return;
    tooltip.classList.remove("opacity-100", "scale-100");
    tooltip.classList.add("opacity-0", "scale-95");
    setTimeout(() => {
        if (tooltip.classList.contains("opacity-0")) {
            tooltip.classList.add("hidden");
        }
    }, 150);
}

function setupGlossaryEvents() {
    const contentEl = document.getElementById("lesson-content");
    if (!contentEl) return;

    // Deteksi hover masuk (mouseenter / mouseover)
    contentEl.addEventListener("mouseover", (e) => {
        const termEl = e.target.closest(".glossary-term");
        if (termEl && termEl !== currentHoveredTerm) {
            currentHoveredTerm = termEl;
            showGlossaryTooltip(termEl);
        }
    });

    // Deteksi mouse keluar (mouseout)
    contentEl.addEventListener("mouseout", (e) => {
        const termEl = e.target.closest(".glossary-term");
        if (termEl && (!e.relatedTarget || !termEl.contains(e.relatedTarget))) {
            currentHoveredTerm = null;
            hideGlossaryTooltip();
        }
    });

    // Dukungan klik / sentuh pada layar ponsel (mobile / touch)
    contentEl.addEventListener("click", (e) => {
        const termEl = e.target.closest(".glossary-term");
        if (termEl) {
            e.stopPropagation();
            if (currentHoveredTerm === termEl) {
                currentHoveredTerm = null;
                hideGlossaryTooltip();
            } else {
                currentHoveredTerm = termEl;
                showGlossaryTooltip(termEl);
            }
        }
    });

    // Menutup tooltip saat klik di sembarang area luar
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".glossary-term")) {
            currentHoveredTerm = null;
            hideGlossaryTooltip();
        }
    });

    // Menutup tooltip saat pengguna menggulir halaman agar tidak melayang di posisi usang
    window.addEventListener("scroll", () => {
        if (currentHoveredTerm) {
            currentHoveredTerm = null;
            hideGlossaryTooltip();
        }
    }, { passive: true });
}

