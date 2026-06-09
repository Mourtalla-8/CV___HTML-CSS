(() => {
  const nameElementId = "cv-name";

  // "TANJIRO / KAMADO" in multiple scripts/transliterations.
  // Arabic is wrapped in direction isolate marks to avoid flipping the whole line.
  const decoyPairs = [
    { a: "TANJIRO", b: "KAMADO" },
    { a: "炭治郎", b: "竈門" },
    { a: "タンジロウ", b: "カマド" },
    { a: "\u2067تانجيرو\u2069", b: "\u2067كامادو\u2069" },
    { a: "炭治郎", b: "灶门" },
    { a: "Тандзиро", b: "Камадо" },
    { a: "탄지로", b: "카마도" },
    { a: "तंजीरो", b: "कामादो" },
  ];

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function uniqueCharsFromText(text) {
    const chars = Array.from(text).filter((c) => c !== " " && c !== "\n" && c !== "\t");
    return Array.from(new Set(chars));
  }

  function makePool(finalA, finalB) {
    const base =
      decoyPairs.map((p) => `${p.a}${p.b}`).join("") +
      finalA +
      finalB +
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return uniqueCharsFromText(base);
  }

  function pickRandom(arr) {
    return arr[(Math.random() * arr.length) | 0];
  }

  function buildScrambled(finalText, revealCount, pool, revealFromRight) {
    const len = finalText.length;
    let out = "";
    for (let i = 0; i < len; i++) {
      const finalChar = finalText[i];
      if (finalChar === " ") {
        out += " ";
        continue;
      }
      const resolved = revealFromRight ? i >= len - revealCount : i < revealCount;
      out += resolved ? finalChar : pickRandom(pool);
    }
    return out;
  }

  function startScramble(parentEl, lineA, lineB, finalA, finalB, opts) {
    const options = {
      durationMs: 820,
      preludeMs: 260,
      switchEveryMs: 55,
      fps: 40,
      ...opts,
    };

    if (!parentEl || !lineA || !lineB || !finalA || !finalB) return;

    if (prefersReducedMotion) {
      parentEl.classList.remove("is-scrambling");
      lineA.textContent = finalA;
      lineB.textContent = finalB;
      return;
    }

    if (typeof parentEl._cancelScramble === "function") parentEl._cancelScramble();

    const pool = makePool(finalA, finalB);
    const start = performance.now();
    let rafId = 0;
    let lastPreludeSwitchAt = -Infinity;
    let lastFrameAt = -Infinity;

    parentEl.classList.add("is-scrambling");

    parentEl._cancelScramble = () => {
      cancelAnimationFrame(rafId);
      parentEl.classList.remove("is-scrambling");
      parentEl._cancelScramble = null;
    };

    const tick = (now) => {
      // Frame cap (stable on low-power devices / mobile).
      if (now - lastFrameAt < 1000 / options.fps) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      lastFrameAt = now;

      const elapsed = now - start;

      // Prelude: cycle through "TANJIRO / KAMADO" variants.
      if (elapsed < options.preludeMs) {
        if (elapsed - lastPreludeSwitchAt >= options.switchEveryMs) {
          const pair = pickRandom(decoyPairs);
          lineA.textContent = pair.a;
          lineB.textContent = pair.b;
          lastPreludeSwitchAt = elapsed;
        }
        rafId = requestAnimationFrame(tick);
        return;
      }

      const scrambleElapsed = elapsed - options.preludeMs;
      const scrambleDuration = Math.max(1, options.durationMs - options.preludeMs);
      const p = Math.min(1, scrambleElapsed / scrambleDuration);
      const revealCountA = Math.floor(p * finalA.length);
      const revealCountB = Math.floor(p * finalB.length);

      // Reveal from right to left to match the right-aligned layout.
      lineA.textContent = buildScrambled(finalA, revealCountA, pool, true);
      lineB.textContent = buildScrambled(finalB, revealCountB, pool, true);

      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        lineA.textContent = finalA;
        lineB.textContent = finalB;
        parentEl.classList.remove("is-scrambling");
        parentEl._cancelScramble = null;
      }
    };

    rafId = requestAnimationFrame(tick);
  }

  function init() {
    const el = document.getElementById(nameElementId);
    if (!el) return;

    const lines = el.querySelectorAll(".name-line");
    if (!lines || lines.length < 2) return;

    const lineA = lines[0];
    const lineB = lines[1];
    const finalA = (lineA.getAttribute("data-final") || lineA.textContent || "").trim();
    const finalB = (lineB.getAttribute("data-final") || lineB.textContent || "").trim();
    const run = () => startScramble(el, lineA, lineB, finalA, finalB);

    run(); // on load
    el.addEventListener("mouseenter", run);
    el.addEventListener("pointerdown", run);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
