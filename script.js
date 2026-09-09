// ============================================================
// Monóxido de Carbono · Guía informativa — interactividad
// Medidor de concentración (ppm): actualiza nivel, tiempo y efecto.
// ============================================================

const PPM_BANDS = [
  { max: 9,    level: "Normal",   effect: "Sin síntomas. Aire limpio.",                        time: "Indefinido",      tone: "teal"  },
  { max: 35,   level: "Leve",     effect: "Dolor de cabeza leve tras exposición prolongada.",  time: "~8 horas",        tone: "teal"  },
  { max: 100,  level: "Moderado", effect: "Dolor de cabeza, mareo, fatiga y náuseas.",         time: "~1–2 horas",      tone: "amber" },
  { max: 200,  level: "Grave",    effect: "Confusión, vértigo, visión borrosa, palpitaciones.", time: "~30 min – 1 h",   tone: "amber" },
  { max: 400,  level: "Crítico",  effect: "Pérdida de conciencia, convulsiones, riesgo vital.", time: "~3 minutos",      tone: "red"   },
  { max: 1000, level: "Letal",    effect: "Coma y fallecimiento en minutos.",                  time: "< 5 minutos",     tone: "dark"  },
];

const BADGE_CLASSES = {
  teal: "badge badge-teal",
  amber: "badge badge-amber",
  red: "badge badge-red",
  dark: "badge badge-dark",
};

function bandForPpm(ppm) {
  return PPM_BANDS.find((b) => ppm <= b.max) || PPM_BANDS[PPM_BANDS.length - 1];
}

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("ppm-slider");
  const valueEl = document.getElementById("ppm-value");
  const badgeEl = document.getElementById("band-badge");
  const timeEl = document.getElementById("band-time");
  const effectEl = document.getElementById("band-effect");

  if (!slider || !valueEl || !badgeEl || !timeEl || !effectEl) return;

  function update() {
    const ppm = Number(slider.value);
    const band = bandForPpm(ppm);

    valueEl.textContent = ppm;
    badgeEl.textContent = "Nivel " + band.level;
    badgeEl.className = BADGE_CLASSES[band.tone];
    timeEl.textContent = "Tiempo aprox. " + band.time;
    effectEl.textContent = band.effect;
  }

  slider.addEventListener("input", update);
  update();
});
