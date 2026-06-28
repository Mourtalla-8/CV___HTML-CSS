// Scramble animation for the name in #cv-name.
// Decoy names flash first, then the real name resolves from right to left.
(() => {
  const nameElementId = "cv-name";

  // Demon Slayer easter egg - same joke in several scripts.
  // Arabic strings use isolate marks so RTL does not flip the whole line.
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
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function uniqueChars(text) {
    return [...new Set([...text].filter((char) => !/\s/.test(char)))];
  }

  function charPool(finalA, finalB) {
    const raw =
      decoyPairs.map((pair) => pair.a + pair.b).join("") +
      finalA +
      finalB +
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return uniqueChars(raw);
  }

  function pickRandom(items) {
    return items[(Math.random() * items.length) | 0];
  }

  function scrambleLine(text, revealCount, pool, fromRight) {
    let output = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === " ") {
        output += " ";
        continue;
      }

      const revealed = fromRight ? i >= text.length - revealCount : i < revealCount;
      output += revealed ? char : pickRandom(pool);
    }

    return output;
  }

  function startScramble(parentEl, lineA, lineB, finalA, finalB, opts = {}) {
    const settings = {
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

    if (typeof parentEl._cancelScramble === "function") {
      parentEl._cancelScramble();
    }

    const pool = charPool(finalA, finalB);
    const startedAt = performance.now();
    let frameId = 0;
    let lastDecoySwitch = -Infinity;
    let lastFrame = -Infinity;

    parentEl.classList.add("is-scrambling");

    parentEl._cancelScramble = () => {
      cancelAnimationFrame(frameId);
      parentEl.classList.remove("is-scrambling");
      parentEl._cancelScramble = null;
    };

    const tick = (now) => {
      const frameGap = 1000 / settings.fps;
      if (now - lastFrame < frameGap) {
        frameId = requestAnimationFrame(tick);
        return;
      }
      lastFrame = now;

      const elapsed = now - startedAt;

      if (elapsed < settings.preludeMs) {
        if (elapsed - lastDecoySwitch >= settings.switchEveryMs) {
          const pair = pickRandom(decoyPairs);
          lineA.textContent = pair.a;
          lineB.textContent = pair.b;
          lastDecoySwitch = elapsed;
        }
        frameId = requestAnimationFrame(tick);
        return;
      }

      const scrambleElapsed = elapsed - settings.preludeMs;
      const scrambleDuration = Math.max(1, settings.durationMs - settings.preludeMs);
      const progress = Math.min(1, scrambleElapsed / scrambleDuration);

      lineA.textContent = scrambleLine(finalA, Math.floor(progress * finalA.length), pool, true);
      lineB.textContent = scrambleLine(finalB, Math.floor(progress * finalB.length), pool, true);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      lineA.textContent = finalA;
      lineB.textContent = finalB;
      parentEl.classList.remove("is-scrambling");
      parentEl._cancelScramble = null;
    };

    frameId = requestAnimationFrame(tick);
  }

  function init() {
    const nameEl = document.getElementById(nameElementId) || document.querySelector(".cv-name");
    if (!nameEl) return;

    const lines = nameEl.querySelectorAll(".name-line");
    if (lines.length < 2) return;

    const [lineA, lineB] = lines;
    const finalA = (lineA.dataset.final || lineA.textContent || "").trim();
    const finalB = (lineB.dataset.final || lineB.textContent || "").trim();
    const run = () => startScramble(nameEl, lineA, lineB, finalA, finalB);

    run();
    nameEl.addEventListener("mouseenter", run);
    nameEl.addEventListener("focus", run);
    nameEl.addEventListener("pointerdown", run);
    nameEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        run();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
