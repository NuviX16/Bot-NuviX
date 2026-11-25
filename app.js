const $ = id => document.getElementById(id);

$("cifras").innerHTML = [["60", "comandos"], ["27", "módulos"], ["4.9k", "líneas de Python"], ["24/7", "en la nube"]]
  .map(([n, t]) => `<div><b>${n}</b>${t}</div>`).join("");

// tarjetas animadas de tema
const temas = [["lain_wired_1", "Lain Wired"], ["reze_sunset_1", "Reze Sunset"], ["rei_winter_1", "Rei Winter"], ["geass_invierno_1", "Geass Invierno"],
  ["bocchi_white_1", "Bocchi White"], ["kaneki_ghoul_1", "Kaneki Ghoul"], ["tsuna_hyper_1", "Tsuna Hyper"], ["rukia_bankai_1", "Rukia Bankai"]];
$("tarjetas").innerHTML = temas.map(([k, n]) =>
  `<video src="assets/tema/${k}.mp4" muted loop playsinline autoplay preload="metadata" aria-label="Tarjeta del tema ${n}"></video>`).join("");

// funciones por grupo; s = solo el dueño
const grupos = [
  { n: "Comunidad", d: "La entrada al servidor y lo que hace que la gente se quede.", c: [
    ["botón de entrada", "sin él solo se ven las reglas y la guía"], ["roles por botón", "linux, gaming, anime, música, avisos"],
    ["/encuesta", "con botones y cierre automático"], ["/plan", "arma una partida o salida y crea el evento"],
    ["Citar", "menú contextual: convierte un mensaje en tarjeta"], ["tickets", "canal privado con el staff"],
    ["#jugando-ahora", "panel con lo que juega cada quien"], ["destacados", "los mensajes con 3 ⭐ pasan a la vitrina"],
    ["concurso", "escritorio de la semana, domingo 20:00"]] },
  { n: "Niveles y lunas ☾", d: "XP por hablar y una economía propia para gastar en colores.", c: [
    ["/nivel", "tarjeta con tu progreso"], ["/top", "ranking del servidor"], ["/temporada", "tabla del mes"], ["/diaria", "lunas del día, con racha"],
    ["/misiones", "3 retos diarios que pagan lunas"], ["/tienda", "8 colores de nombre + color propio"], ["/regalar", "pásale lunas a alguien"],
    ["/perfil", "tarjeta completa; /perfil-editar cambia frase y color"]] },
  { n: "Para pasar el rato", d: "Minijuegos y cosas para presumir.", c: [
    ["/pescar", "28 especies, cada 45 min"], ["/coleccion", "lo que has pescado"], ["/vender", "repetidos por lunas"],
    ["/loteria", "boletos de 50 ☾, sorteo el sábado 21:00"], ["/cumple", "felicitación automática a las 9:00"],
    ["/spotify", "tarjeta de lo que alguien escucha"], ["/top-juegos", "lo más jugado del servidor"]] },
  { n: "Avisos", d: "Revisa APIs públicas cada rato y avisa en su canal.", c: [
    ["/anime seguir", "episodios nuevos (AniList)"], ["/manga seguir", "capítulos de manga, manhwa y manhua (MangaUpdates)"],
    ["/oferta seguir", "cuando un juego baja de precio (CheapShark)"], ["juegos gratis", "Epic, Steam y más (GamerPower)"],
    ["directos y videos", "Twitch y YouTube en anuncios"], ["devlog", "mis commits y PRs públicos de GitHub"]] },
  { n: "El escritorio", d: "Lo que conecta el servidor con mi Arch Linux.", c: [
    ["/rice", "resumen del escritorio con la tarjeta del tema"], ["/tema", "tema actual y su paleta"], ["/nowplaying", "lo que suena en mi Spotify"],
    ["/frase", "la frase del escritorio"], ["/captura", "foto del escritorio en un workspace vacío", 1], ["/video · /stream", "anuncia contenido nuevo", 1],
    ["/pc", "estado, tema, bloquear, música, volumen, actualizaciones, salud", 1]] },
  { n: "Mi día", d: "Un asistente personal en un canal privado.", c: [
    ["/midia", "resumen con clima de Tepic, clases y pendientes", 1], ["/tarea", "entregas con aviso un día antes", 1],
    ["/horario", "aviso 10 min antes de cada clase", 1], ["/bitacora", "bitácora de la estadía y reporte .docx", 1],
    ["/idea", "banco de ideas para videos", 1], ["panel web", "tareas e ideas desde el navegador", 1], ["al celular", "los avisos importantes llegan por ntfy", 1]] },
  { n: "Moderación", d: "Para que el servidor se cuide solo.", c: [
    ["AutoMod", "spam y menciones masivas → aislamiento 10 min"], ["registro", "canal privado con todo lo que pasa"],
    ["comandos en su canal", "fuera de #comandos el bot no responde"], ["límites", "30 s entre comandos por persona"]] },
];
const filtros = $("filtros");
function ver(g) {
  $("grupos").innerHTML = grupos.filter(x => g === "Todo" || x.n === g).map(x => `<article class="grupo">
    <header><b>${x.n}</b><small>${x.c.length}</small></header><p>${x.d}</p>
    <ul class="cmds">${x.c.map(([k, t, s]) => `<li><code>${k}</code><span>${t}${s ? '<span class="solo">dueño</span>' : ""}</span></li>`).join("")}</ul></article>`).join("");
  filtros.querySelectorAll(".chip").forEach(b => b.setAttribute("aria-pressed", b.dataset.g === g));
}
["Todo", ...grupos.map(x => x.n)].forEach(g => {
  const b = document.createElement("button"); b.className = "chip"; b.type = "button"; b.dataset.g = g; b.textContent = g;
  b.onclick = () => ver(g); filtros.append(b);
});
ver("Todo");
