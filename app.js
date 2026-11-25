const $ = id => document.getElementById(id);

// galería: tarjetas de tema como imágenes adjuntas
const temas = ["reze_sunset_1", "rei_winter_1", "geass_invierno_1", "bocchi_white_1", "kaneki_ghoul_1", "tsuna_hyper_1", "rukia_bankai_1", "lain_wired_1"];
$("galeria").innerHTML = temas.map(k => `<video src="assets/tema/${k}.mp4" muted loop playsinline autoplay preload="metadata" aria-hidden="true"></video>`).join("");

// un embed por área, como los manda el bot; el tercer valor marca lo que solo usa nuvix
const areas = [
  ["Comunidad", "#57f287", [["botón de entrada", "sin él solo se ven reglas y guía"], ["roles por botón", "linux, gaming, anime, música"],
    ["/encuesta", "botones y cierre automático"], ["/plan", "arma una partida o salida"], ["Citar", "un mensaje convertido en tarjeta"],
    ["tickets", "canal privado con el staff"], ["#jugando-ahora", "lo que juega cada quien"], ["destacados", "3 ⭐ y pasa a la vitrina"]]],
  ["Niveles y lunas ☾", "#b49cf0", [["/nivel", "tu progreso en tarjeta"], ["/top", "ranking del server"], ["/temporada", "tabla del mes"],
    ["/diaria", "lunas del día, con racha"], ["/misiones", "3 retos diarios"], ["/tienda", "colores para tu nombre"], ["/regalar", "pasa lunas a alguien"], ["/perfil", "tu tarjeta completa"]]],
  ["Para pasar el rato", "#fee75c", [["/pescar", "28 especies, cada 45 min"], ["/coleccion", "lo que has pescado"], ["/vender", "repetidos por lunas"],
    ["/loteria", "sorteo el sábado 21:00"], ["/cumple", "felicitación a las 9:00"], ["/spotify", "lo que alguien escucha"], ["/top-juegos", "lo más jugado"]]],
  ["Avisos", "#00a8fc", [["/anime seguir", "episodios nuevos (AniList)"], ["/manga seguir", "capítulos nuevos (MangaUpdates)"],
    ["/oferta seguir", "cuando un juego baja de precio"], ["juegos gratis", "Epic, Steam y más"], ["directos y videos", "Twitch y YouTube"], ["devlog", "mis commits de GitHub"]]],
  ["El escritorio de nuvix", "#f0a0c8", [["/rice", "resumen con la tarjeta del tema"], ["/tema", "tema actual y su paleta"], ["/nowplaying", "lo que suena en su Spotify"],
    ["/frase", "la frase del escritorio"], ["/captura", "foto del escritorio", 1], ["/pc", "estado, tema, música, volumen", 1]]],
  ["Mi día", "#eb459e", [["/midia", "resumen con clima y clases", 1], ["/tarea", "entregas con aviso", 1], ["/horario", "aviso antes de cada clase", 1],
    ["/bitacora", "bitácora y reporte .docx", 1], ["/idea", "ideas para videos", 1], ["panel web", "todo desde el navegador", 1]]],
  ["Moderación", "#ed4245", [["AutoMod", "spam y menciones masivas"], ["registro", "todo lo que pasa, en privado"],
    ["#comandos", "fuera de aquí no respondo"], ["límites", "30 s entre comandos"]]],
];
$("embeds").innerHTML = areas.map(([n, color, cmds]) => `<div class="embed cmds" style="border-left-color:${color}">
  <p class="emb-tit">${n}</p><div class="campos">${cmds.map(([c, d, s]) =>
    `<div class="campo"><b>${c}${s ? " 🔒" : ""}</b><span>${d}</span></div>`).join("")}</div></div>`).join("");

// temas: lo mismo que pasa en el servidor cuando nuvix cambia de fondo
const TEMAS = [{"k": "lain_wired", "n": "Lain Wired", "a": "#b49cf0"}, {"k": "reze_sunset", "n": "Reze Sunset", "a": "#e0a57a"},
  {"k": "rei_winter", "n": "Rei Winter", "a": "#a8c4ec"}, {"k": "geass_invierno", "n": "Geass Invierno", "a": "#a9c0e0"},
  {"k": "bocchi_white", "n": "Bocchi White", "a": "#f2a7c3"}, {"k": "kaneki_ghoul", "n": "Kaneki Ghoul", "a": "#cfd0d6"},
  {"k": "tsuna_hyper", "n": "Tsuna Hyper", "a": "#f5b83d"}, {"k": "rukia_bankai", "n": "Rukia Bankai", "a": "#8fc4f0"}];
function ponerTema(t) {
  document.documentElement.style.setProperty("--rol-yo", t.a);
  document.querySelectorAll(".av-bot").forEach(im => im.src = `assets/retrato/${t.k}.webp`);
  ["invBanner", "bannerImg"].forEach(id => $(id).src = `assets/fondo/${t.k}.webp`);
  document.querySelector(".app").style.setProperty("--fondo-app", `url("assets/fondo/${t.k}.webp")`);
  ["invFondo", "temaCard"].forEach(id => { const v = $(id); v.src = `assets/tema/${t.k}_1.mp4`; v.play().catch(() => {}) });
  const bv = $("bvVideo"); bv.src = `assets/bienvenida/${t.k}.mp4`; bv.play().catch(() => {});
  $("temaTit").textContent = `✦ nuevo tema: ${t.n}`;
  document.querySelectorAll(".tema-btn").forEach(b => b.setAttribute("aria-checked", b.dataset.k === t.k));
}
$("temasInv").innerHTML = TEMAS.map(t => `<button type="button" role="radio" class="tema-btn" data-k="${t.k}" title="${t.n}" aria-label="${t.n}">
  <img src="assets/retrato/${t.k}.webp" alt=""></button>`).join("");
document.querySelectorAll(".tema-btn").forEach(b => b.onclick = () => ponerTema(TEMAS.find(t => t.k === b.dataset.k)));
ponerTema(TEMAS[0]);

// canales: se desplaza el chat de la ventana, no la página
const chat = document.querySelector(".chat");
const enlaces = [...document.querySelectorAll(".lista a")];
enlaces.forEach(a => a.addEventListener("click", e => {
  const sec = document.querySelector(a.getAttribute("href")); if (!sec) return;
  e.preventDefault(); chat.scrollTo({ top: sec.offsetTop - chat.offsetTop, behavior: "smooth" });
}));
const obs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) enlaces.forEach(a => a.classList.toggle("activo", a.getAttribute("href") === "#" + e.target.id));
}), { root: chat, rootMargin: "-30% 0px -60% 0px" });
document.querySelectorAll(".canal").forEach(s => obs.observe(s));
