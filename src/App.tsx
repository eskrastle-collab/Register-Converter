import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, ClipboardCheck, RotateCcw } from "lucide-react";

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/(\p{L})(\p{L}*)/gu, (_, first, rest) =>
      first.toLocaleUpperCase("ru-RU") + rest.toLocaleLowerCase("ru-RU")
    );
}

// Console runtime tests
function runRuntimeTests() {
  const tests = [
    { name: "Upper: russian", input: "привет мир", mode: "upper", expect: "ПРИВЕТ МИР" },
    { name: "Lower: english", input: "HELLO WORLD!", mode: "lower", expect: "hello world!" },
    { name: "Title: punctuation", input: "москва — город героев", mode: "title", expect: "Москва — Город Героев" },
    { name: "Title: mixed alpha", input: "javaScript И реАкт", mode: "title", expect: "Javascript И Реакт" },
    { name: "Title: hyphenated", input: "санкт-петербург", mode: "title", expect: "Санкт-Петербург" },
    { name: "Empty input", input: "", mode: "upper", expect: "" },
  ] as const;

  const apply = (txt: string, mode: string) => {
    switch (mode) {
      case "upper": return txt.toLocaleUpperCase("ru-RU");
      case "lower": return txt.toLocaleLowerCase("ru-RU");
      case "title": return toTitleCase(txt);
      default: return txt;
    }
  };

  let passed = 0;
  for (const t of tests) {
    const got = apply(t.input, t.mode);
    const ok = got === t.expect;
    if (!ok) console.error(`[TEST FAIL] ${t.name}: expected →`, t.expect, "got →", got);
    else passed++;
  }
  console.info(`[Tests] Passed ${passed}/${tests.length}`);
}

export default function App() {
  const [text, setText] = useState<string>("");
  const [mode, setMode] = useState<"upper" | "lower" | "title">("upper");
  const [copied, setCopied] = useState(false);

  const [heightRem, setHeightRem] = useState<number | null>(null);
  useEffect(() => {
    try { runRuntimeTests(); } catch {}
    try {
      const root = document.documentElement;
      const cs = getComputedStyle(root);
      const initial = cs.getPropertyValue('--editor-h').trim();
      let val = 20;
      if (initial.endsWith('rem')) val = parseFloat(initial) || 20;
      else if (initial.endsWith('px')) {
        const px = parseFloat(initial);
        const base = parseFloat(cs.fontSize) || 16;
        val = +(px / base).toFixed(2);
      }
      setHeightRem(val);
    } catch {}
  }, []);

  useEffect(() => {
    if (heightRem == null) return;
    document.documentElement.style.setProperty('--editor-h', `${heightRem}rem`);
  }, [heightRem]);

  const resetHeight = () => {
    try {
      const root = document.documentElement;
      root.style.removeProperty('--editor-h');
      const cs = getComputedStyle(root);
      const initial = cs.getPropertyValue('--editor-h').trim();
      let val = 20;
      if (initial.endsWith('rem')) val = parseFloat(initial) || 20;
      else if (initial.endsWith('px')) {
        const px = parseFloat(initial);
        const base = parseFloat(cs.fontSize) || 16;
        val = +(px / base).toFixed(2);
      }
      setHeightRem(val);
    } catch {}
  };

  const output = useMemo(() => {
    if (!text) return "";
    switch (mode) {
      case "upper": return text.toLocaleUpperCase("ru-RU");
      case "lower": return text.toLocaleLowerCase("ru-RU");
      case "title": return toTitleCase(text);
      default: return text;
    }
  }, [text, mode]);

  const copy = async () => {
    const data = output ?? "";
    if (!data) return;
    let success = false;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(data);
        success = true;
      }
    } catch {}
    if (!success) {
      try {
        const ta = document.createElement('textarea');
        ta.value = data;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ta.setSelectionRange(0, 999999);
        success = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch {}
    }
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const clearAll = () => setText("");

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-10 w-80 h-80 rounded-full blur-3xl bg-gradient-to-tr from-fuchsia-500/30 via-blue-500/30 to-emerald-400/30 animate-float-slow" />
        <div className="absolute top-1/3 -right-10 w-96 h-96 rounded-full blur-3xl bg-gradient-to-tr from-amber-400/20 via-rose-500/20 to-indigo-500/20 animate-float-slower" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-3xl bg-gradient-to-tr from-cyan-400/20 via-violet-500/20 to-pink-500/20 animate-float-slowest" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-10 py-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Конвертер регистров</h1>
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          href="https://t.me/StocksiUltimate_bot?start=r61558uUltimateRGB"
          target="_blank"
          rel="noreferrer noopener"
          className="btn-ultimate group relative inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold tracking-tight"
        >
          <span aria-hidden className="glow absolute inset-0 rounded-2xl" />
          <span aria-hidden className="inner absolute inset-0 rounded-2xl bg-slate-900/60 backdrop-blur-md ring-1 ring-white/20" />
          <span aria-hidden className="shine absolute inset-0 rounded-2xl overflow-hidden"><span className="shine-bar" /></span>
          <span aria-hidden className="particles pointer-events-none absolute inset-0">
            <span className="particle p1" />
            <span className="particle p2" />
            <span className="particle p3" />
            <span className="particle p4" />
          </span>
          <span className="relative z-10">Сервис оперативных новостей STOCKSI Ultimate</span>
        </motion.a>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 pb-16">
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-8 mb-8">
              <div className="grow">
                <h2 className="text-2xl font-semibold tracking-tight mb-2">Мгновенное преобразование текста</h2>
                <p className="text-slate-300/90 text-sm">Выберите режим и вводите текст — результат появится справа.</p>
              </div>

              <div className="self-start lg:self-auto">
                <div className="relative bg-white/10 ring-1 ring-white/15 rounded-2xl p-1 flex w-full sm:w-auto">
                  {[
                    { id: "upper", label: "В ВЕРХНИЙ" },
                    { id: "lower", label: "в нижний" },
                    { id: "title", label: "Каждое Слово" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setMode(opt.id as "upper" | "lower" | "title")}
                      className={`relative px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all ${mode === opt.id ? "text-slate-900" : "text-slate-200 hover:text-white"}`}
                    >
                      {mode === opt.id && (
                        <motion.span layoutId="pill" transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute inset-0 rounded-xl bg-gradient-to-br from-white to-white/90 shadow-[0_1px_8px_rgba(255,255,255,0.2)]" />
                      )}
                      <span className="relative z-10 mix-blend-normal">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="self-start lg:self-auto">
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 ring-1 ring-white/10 px-3 py-2">
                  <span className="text-xs text-slate-300 whitespace-nowrap">Высота полей</span>
                  <input type="range" className="range" min={12} max={32} step={1} value={heightRem ?? 20} onChange={(e) => setHeightRem(Number(e.target.value))} aria-label="Высота полей" />
                  <button type="button" onClick={resetHeight} className="text-xs rounded-lg px-2 py-1 bg-white/10 ring-1 ring-white/10 hover:bg-white/15" title="Сбросить к значению по умолчанию">По умолчанию</button>
                  <span className="text-xs tabular-nums text-slate-400">{Math.round((heightRem ?? 20) * 16)}px</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <label className="block text-sm font-medium mb-2 text-slate-200">Исходный текст</label>
                <div className="relative">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Вставьте или наберите текст здесь..."
                    className="w-full h-[var(--editor-h)] resize-none rounded-2xl bg-slate-900/50 focus:bg-slate-900/70 outline-none ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-fuchsia-400/70 p-4 leading-relaxed text-slate-100 placeholder:text-slate-400"
                  />
                  <motion.button onClick={clearAll} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} disabled={!text}
                    className={`absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-xl ring-1 px-3 py-2 text-sm min-w-28 justify-center ${text ? 'bg-white/10 hover:bg-white/15 ring-white/15' : 'bg-white/5 ring-white/10 opacity-50 cursor-not-allowed'}`}>
                    <RotateCcw className="size-4" /> Сбросить
                  </motion.button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="mb-2"><label className="block text-sm font-medium text-slate-200">Результат</label></div>
                <div className="relative">
                  <div className="w-full h-[var(--editor-h)] rounded-2xl bg-slate-900/30 ring-1 ring-inset ring-white/10 p-4 overflow-auto">
                    <pre className="whitespace-pre-wrap break-words font-sans text-slate-100 leading-relaxed">{output || "(Здесь появится преобразованный текст)"}</pre>
                  </div>
                  <motion.button onClick={copy} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} disabled={!output}
                    className={`absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-xl ring-1 px-3 py-2 text-sm min-w-28 justify-center ${output ? 'bg-white/10 hover:bg-white/15 ring-white/15' : 'bg-white/5 ring-white/10 opacity-50 cursor-not-allowed'}`}>
                    {copied ? <ClipboardCheck className="size-4" /> : <Copy className="size-4" />}
                    {copied ? "Скопировано" : "Копировать"}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="text-center text-slate-400 text-xs mt-6">
          Сделано с любовью • Поддерживает кириллицу и латиницу • Работает локально в браузере
        </div>
      </main>
    </div>
  );
}
