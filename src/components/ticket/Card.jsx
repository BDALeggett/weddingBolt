/**
 * Card.jsx — v2025-05-31
 * Realistic tilt: edge nearest the pointer lifts upward, with subtle pop-out scale.
 * Directional shine replaces circular hotspot.  Idle foil rest-opacity = 0.2.
 */
import { useRef, useState, useEffect } from "react";
import "./Card.css";

/* ---------- assets ---------- */
import cardFront    from "./assets/card-front.png";
import foilTexA     from "./assets/foil-gradient-blue-red.png";
import foilTexB     from "./assets/foil-gradient-green-pink.png";
import maskTex      from "./assets/mask.png";
import sparklesImg  from "./assets/sparkles.png";
import crossLogo    from "./assets/cross.png";
import foilMatte    from "./assets/ticket-foil-mask.png";   // cover-up layer

export default function Card({ width = 320 }) {
  /* refs */
  const cardRef  = useRef(null);
  const hlRef    = useRef(null);
  const foilARef = useRef(null);
  const foilBRef = useRef(null);
  const logoRef  = useRef(null);

  /* state */
  const [focused, setFocused] = useState(false);
  const [tapStart, setTapStart] = useState({ x: 0, y: 0 });
  const inertiaTimer = useRef(null);

  /* ----------------------------------------------------- */
  /*  Tilt + shine                                         */
  /* ----------------------------------------------------- */
  const REST_OPACITY = 0.2;         // foil opacity when idle

  const applyTilt = (pageX, pageY) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const offsetX  = pageX - left;
    const offsetY  = pageY - top;
    const px = offsetX / width;     // 0 → 1
    const py = offsetY / height;    // 0 → 1

    /* 1. rotation -------------------------------------------------- */
    const rx = (py - 0.5) * -45;    // pointer bottom -> rx ⬆
    const ry = (px - 0.5) *  45;    // pointer right   -> ry ⬆
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);

    /* subtle scale exaggeration */
    const mag   = Math.hypot(rx, ry);            // 0-64
    /* depth “push” – max 28 px toward the viewer when pointer near corner */
    const tz = Math.min(28, Math.hypot(rx, ry) * 0.6);  // 0 → 28
    card.style.setProperty("--tz", `${tz}px`);


    /* 2. border shadow -------------------------------------------- */
    const maxShift = 32;
    card.style.setProperty("--sx", `${(px - 0.5) * maxShift}px`);
    card.style.setProperty("--sy", `${(py - 0.5) * maxShift}px`);
    const blur  = Math.max(9, 32 - mag * 0.35);
    const alpha = Math.max(0.09, 0.35 - mag * 0.004);
    card.style.setProperty("--sblur", `${blur}px`);
    card.style.setProperty("--sopa",  `${alpha}`);

    /* 3. directional shine ---------------------------------------- */
    const hl = hlRef.current;
    if (hl) {
      const angle = Math.atan2(0.5 - py, 0.5 - px) * 180 / Math.PI + 90;
      hl.style.opacity = "1";
      hl.style.background = `linear-gradient(${angle}deg,
        rgba(255,255,255,0.9) 0%,
        rgba(255,255,255,0.25) 35%,
        rgba(0,0,0,0.85) 100%)`;
    }

    /* 4. foil opacity (full under pointer) ------------------------ */
    const hotspotBoost = 1 - Math.min(1, Math.hypot(px - 0.5, py - 0.5) * 2);

    const setFoilOpacity = (ref, invert = false, axis = "horizontal") => {
      const foil = ref.current;
      if (!foil) return;
      let dir = axis === "horizontal" ? px : (px + py) / 2;
      dir = invert ? 1 - dir : dir;
      const opacity = REST_OPACITY + (1 - REST_OPACITY) *
                      Math.max(dir, hotspotBoost);
      foil.style.opacity = Math.min(1, opacity);
    };
    setFoilOpacity(foilARef, false, "horizontal");
    setFoilOpacity(foilBRef, true,  "diagonal");

    /* 5. logo proximity fade -------------------------------------- */
    const logo = logoRef.current;
    if (logo) {
      const { left: l, top: t, width: w, height: h } =
            logo.getBoundingClientRect();
      const dist = Math.hypot(pageX - (l + w / 2), pageY - (t + h / 2));
      logo.style.opacity = Math.max(0.05, Math.min(1, 1 - dist / 140));
    }
  };

  /* ------------------------------------------------------------- */
  /*  Highlight reset                                              */
  /* ------------------------------------------------------------- */
  const resetHighlight = () => {
    const hl = hlRef.current;
    if (!hl) return;
    hl.style.transition = "background 0.5s ease, opacity 0.5s ease";
    hl.style.opacity    = "0";
    hl.style.background =
      "radial-gradient(circle 120px at 50% 50%, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.7) 100%)";
    hl.addEventListener("transitionend", () => {
      hl.style.transition = "";
    }, { once: true });
  };

  /* ------------------------------------------------------------- */
  /*  Resets                                                       */
  /* ------------------------------------------------------------- */
  const resetFoil = () => {
    [foilARef, foilBRef].forEach(r => r.current && (
      r.current.style.opacity = REST_OPACITY
    ));
  };

  const resetTiltWithInertia = () => {
    clearTimeout(inertiaTimer.current);
    const c = cardRef.current;
    if (!c) return;
    c.classList.add("inertia");
    c.style.setProperty("--rx", "0deg");
    c.style.setProperty("--ry", "0deg");
    c.style.setProperty("--scl", "1");
    c.style.setProperty("--sx", "0px");
    c.style.setProperty("--sy", "0px");
    c.style.setProperty("--sblur", "32px");
    c.style.setProperty("--sopa",  "0.35");
    resetFoil();
    resetHighlight();
    inertiaTimer.current = setTimeout(() => c.classList.remove("inertia"), 800);
  };

  const hardResetTilt = () => {
    clearTimeout(inertiaTimer.current);
    const c = cardRef.current;
    if (!c) return;
    c.classList.remove("inertia");
    c.style.cssText = "";          // wipe inline transforms & shadows
    resetFoil();
    resetHighlight();
  };

  /* ------------------------------------------------------------- */
  /*  Pointer / touch plumbing                                     */
  /* ------------------------------------------------------------- */
  const TAP_THRESH = 8;
  let didDrag = false;

  const onDown = e => {
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    if (x != null && y != null) setTapStart({ x, y });
    didDrag = false;
    cardRef.current?.setPointerCapture?.(e.pointerId);
  };

  const onMove = e => {
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    if (x == null || y == null) return;
    applyTilt(x, y);
    if (Math.abs(x - tapStart.x) > TAP_THRESH ||
        Math.abs(y - tapStart.y) > TAP_THRESH) didDrag = true;
  };

  const onUp = e => {
    cardRef.current?.releasePointerCapture?.(e.pointerId);
    if (!focused && !didDrag) setFocused(true);
    resetTiltWithInertia();
  };

  const onLeave = () => { if (!focused) resetTiltWithInertia(); };

  /* ------------------------------------------------------------- */
  /*  Focus side-effects                                           */
  /* ------------------------------------------------------------- */
  useEffect(() => {
    document.body.style.overflow = focused ? "hidden" : "";
    if (!focused) hardResetTilt();
    return () => { document.body.style.overflow = ""; };
  }, [focused]);

  /* ------------------------------------------------------------- */
  /*  JSX                                                          */
  /* ------------------------------------------------------------- */
  return (
    <>
      {focused && (
        <div
          className="overlay"
          onPointerDown={e => e.preventDefault()}
          onClick={() => setFocused(false)}
        />
      )}

      <div
        ref={cardRef}
        className={`shiny-card${focused ? " focused" : ""}`}
        style={{ width }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onLeave}
        tabIndex={0}
        onKeyDown={e => e.key === "Escape" && setFocused(false)}
      >
        <div className="shine">
          {/* foil layers */}
          <div
            ref={foilARef}
            className="foil-layer"
            style={{
              backgroundImage: `url(${foilTexA})`,
              WebkitMaskImage: `url(${maskTex})`,
              maskImage:       `url(${maskTex})`,
            }}
          />
          <div
            ref={foilBRef}
            className="foil-layer"
            style={{
              backgroundImage: `url(${foilTexB})`,
              WebkitMaskImage: `url(${maskTex})`,
              maskImage:       `url(${maskTex})`,
            }}
          />

          {/* cover-up matte to block foil in certain areas */}
          <div
            className="foil-matte"
            style={{ backgroundImage: `url(${foilMatte})` }}
          />

          {/* directional highlight */}
          <div ref={hlRef} className="highlight" />

          {/* sparkles + logo */}
          <div
            className="sparkles"
            style={{
              backgroundImage: `url(${sparklesImg})`,
              WebkitMaskImage: `url(${maskTex})`,
              maskImage:       `url(${maskTex})`,
            }}
          />
          <img ref={logoRef} src={crossLogo} alt="" className="holo-logo" />
        </div>

        {/* base artwork */}
        <img src={cardFront} alt="Card front" className="card-img" />
      </div>
    </>
  );
}
