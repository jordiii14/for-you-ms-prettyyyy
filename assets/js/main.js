/* ==========================================================================
   A LITTLE FAIRYTALE FOR MARY JOY — INTERACTIVE CHOREOGRAPHY & AUDIO ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------------
     1. OPENING STORYBOOK COVER
     ------------------------------------------------------------------------ */
  const openingCover = document.getElementById("opening-cover");
  const openFairytaleBtn = document.getElementById("open-fairytale-btn");
  const replayBtn = document.getElementById("replay-btn");
  const backToTopBtn = document.getElementById("back-to-top-btn");

  function openFairytale() {
    openingCover.classList.add("is-opened");
    document.body.classList.remove("intro-locked");
    window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(() => {
      document.querySelectorAll("#hero .reveal-up").forEach((el) => el.classList.add("is-visible"));
    }, 250);
  }

  if (openFairytaleBtn) {
    openFairytaleBtn.addEventListener("click", openFairytale);
  }

  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      setTimeout(() => {
        openingCover.classList.remove("is-opened");
        document.body.classList.add("intro-locked");
      }, 450);
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------------------
     2. SCROLL REVEAL OBSERVER, PARALLAX & PROGRESS RIBBON
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  const progressBar = document.getElementById("reading-progress-bar");
  const parallaxTargets = document.querySelectorAll("[data-parallax]");

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      if (!prefersReducedMotion) {
        parallaxTargets.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.15;
          if (scrollTop < window.innerHeight * 1.3) {
            el.style.transform = `translate3d(0, ${scrollTop * speed}px, 0)`;
          }
        });
      }
    },
    { passive: true }
  );

  /* ------------------------------------------------------------------------
     3. FLOATING PINK ROSE PETALS CANVAS
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById("petals-canvas");
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petalColors = [
      "rgba(244, 168, 198, 0.52)",
      "rgba(250, 206, 224, 0.65)",
      "rgba(227, 125, 165, 0.38)",
      "rgba(255, 232, 241, 0.72)",
    ];

    const petalCount = width < 640 ? 16 : 28;
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 6 + Math.random() * 8,
      speedY: 0.45 + Math.random() * 0.75,
      speedX: -0.35 + Math.random() * 0.7,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    function drawPetals() {
      ctx.clearRect(0, 0, width, height);
      for (const p of petals) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.3;
        p.angle += p.spin;

        if (p.y > height + 20) {
          p.y = -15;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -15;
        if (p.x < -20) p.x = width + 15;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -p.size / 2);
        ctx.bezierCurveTo(p.size, -p.size / 2, p.size, p.size, 0, p.size);
        ctx.bezierCurveTo(-p.size, p.size, -p.size, -p.size / 2, 0, -p.size / 2);
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(drawPetals);
    }

    drawPetals();
  }

  /* ------------------------------------------------------------------------
     4. DESKTOP CURSOR SPARKLE TRAIL
     ------------------------------------------------------------------------ */
  const sparkleContainer = document.getElementById("cursor-sparkles");
  if (sparkleContainer && !prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    let lastSparkleTime = 0;
    window.addEventListener(
      "mousemove",
      (e) => {
        const now = Date.now();
        if (now - lastSparkleTime < 55) return;
        lastSparkleTime = now;

        const dot = document.createElement("span");
        dot.className = "sparkle-dot";
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        sparkleContainer.appendChild(dot);

        setTimeout(() => {
          dot.remove();
        }, 850);
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------------------
     5. GARDEN OF THOUGHTS — INTERACTIVE BLOOMING ROSE CARDS
     ------------------------------------------------------------------------ */
  const roseCards = document.querySelectorAll(".rose-bloom-card");
  roseCards.forEach((card) => {
    card.addEventListener("click", () => {
      const expanded = card.getAttribute("aria-expanded") === "true";
      card.setAttribute("aria-expanded", String(!expanded));
      card.classList.toggle("is-bloomed");
      const hint = card.querySelector(".rose-tap-hint");
      if (hint) {
        hint.textContent = !expanded ? "Bloomed ✦" : "Tap to bloom";
      }
    });
  });

  /* ------------------------------------------------------------------------
     6. INTERACTIVE SEALED ENVELOPE & LETTER
     ------------------------------------------------------------------------ */
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const waxSealBtn = document.getElementById("wax-seal-btn");
  const unfoldedLetter = document.getElementById("unfolded-letter");
  const resealLetterBtn = document.getElementById("reseal-letter-btn");

  if (waxSealBtn && envelopeWrapper && unfoldedLetter) {
    waxSealBtn.addEventListener("click", () => {
      waxSealBtn.setAttribute("aria-expanded", "true");
      envelopeWrapper.classList.add("is-opening");
      setTimeout(() => {
        envelopeWrapper.classList.add("is-hidden");
        unfoldedLetter.hidden = false;
        unfoldedLetter.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "nearest" });
      }, 550);
    });
  }

  if (resealLetterBtn && envelopeWrapper && unfoldedLetter && waxSealBtn) {
    resealLetterBtn.addEventListener("click", () => {
      unfoldedLetter.hidden = true;
      envelopeWrapper.classList.remove("is-hidden", "is-opening");
      waxSealBtn.setAttribute("aria-expanded", "false");
    });
  }

  /* ------------------------------------------------------------------------
     7. ENCHANTED ROSE GLASS DOME INTERACTION
     ------------------------------------------------------------------------ */
  const glassDome = document.getElementById("glass-dome");
  const sparkRoseBtn = document.getElementById("spark-rose-btn");
  if (glassDome && sparkRoseBtn) {
    sparkRoseBtn.addEventListener("click", () => {
      glassDome.classList.add("is-sparked");
      sparkRoseBtn.querySelector("span").textContent = "✦ The rose glows a little brighter";
      setTimeout(() => {
        glassDome.classList.remove("is-sparked");
        sparkRoseBtn.querySelector("span").textContent = "✦ Touch the glass dome";
      }, 2400);
    });
  }

  /* ------------------------------------------------------------------------
     8. WISH CARD & FINAL CHAPTER GENTLE CHOICES
     ------------------------------------------------------------------------ */
  const makeWishBtn = document.getElementById("make-wish-btn");
  const wishFeedback = document.getElementById("wish-feedback");
  if (makeWishBtn && wishFeedback) {
    makeWishBtn.addEventListener("click", () => {
      wishFeedback.textContent = "Wish sent ✨ Here’s to many more easy conversations and genuine smiles ahead.";
      makeWishBtn.disabled = true;
      makeWishBtn.style.opacity = "0.78";
    });
  }

  const choiceBtns = document.querySelectorAll(".choice-btn");
  const choiceBanner = document.getElementById("choice-response-banner");
  const choiceMessages = {
    smile: "Knowing this made you smile already makes every line of this page completely worth it. 🌸",
    chapter: "No rush at all—we’ll take it one page, one conversation, and one smile at a time. ✨",
  };

  choiceBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      choiceBtns.forEach((b) => b.classList.remove("is-selected"));
      btn.classList.add("is-selected");
      const key = btn.dataset.choice;
      if (choiceBanner && choiceMessages[key]) {
        choiceBanner.hidden = false;
        choiceBanner.textContent = choiceMessages[key];
      }
    });
  });

  /* ------------------------------------------------------------------------
     9. SURPRISE SECRET NOTE MODAL
     ------------------------------------------------------------------------ */
  const surpriseBtn = document.getElementById("surprise-btn");
  const surpriseModal = document.getElementById("surprise-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  if (surpriseBtn && surpriseModal && closeModalBtn) {
    surpriseBtn.addEventListener("click", () => {
      surpriseModal.hidden = false;
      closeModalBtn.focus();
    });

    closeModalBtn.addEventListener("click", () => {
      surpriseModal.hidden = true;
      surpriseBtn.focus();
    });

    surpriseModal.addEventListener("click", (e) => {
      if (e.target === surpriseModal) {
        surpriseModal.hidden = true;
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !surpriseModal.hidden) {
        surpriseModal.hidden = true;
      }
    });
  }

  /* ------------------------------------------------------------------------
     10. OPTIONAL BACKGROUND MUSIC PLAYER (MP3 + GENTLE MUSIC-BOX FALLBACK)
     ------------------------------------------------------------------------ */
  const musicToggle = document.getElementById("music-toggle");
  const bgMusic = document.getElementById("bg-music");
  let isPlaying = false;
  let audioCtx = null;
  let chimeTimer = null;

  function startMusicBoxFallback() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === "suspended") audioCtx.resume();

    // Gentle fairytale waltz notes (F major / D minor dreamy arpeggio)
    const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880.0, 698.46];
    let step = 0;

    chimeTimer = setInterval(() => {
      if (!isPlaying) return;
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(notes[step % notes.length], now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.035, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 1.4);
      step++;
    }, 780);
  }

  function stopMusicBoxFallback() {
    if (chimeTimer) {
      clearInterval(chimeTimer);
      chimeTimer = null;
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener("click", async () => {
      const label = musicToggle.querySelector(".btn-label");
      if (!isPlaying) {
        isPlaying = true;
        musicToggle.setAttribute("aria-pressed", "true");
        if (label) label.textContent = "Melody: On";

        if (bgMusic) {
          try {
            await bgMusic.play();
          } catch (_) {
            // If user hasn't dropped an MP3 into assets/music/our-melody.mp3 yet, play gentle chime fallback
            startMusicBoxFallback();
          }
        } else {
          startMusicBoxFallback();
        }
      } else {
        isPlaying = false;
        musicToggle.setAttribute("aria-pressed", "false");
        if (label) label.textContent = "Melody: Off";
        if (bgMusic) bgMusic.pause();
        stopMusicBoxFallback();
      }
    });
  }
});
