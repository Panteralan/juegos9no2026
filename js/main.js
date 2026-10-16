/* =========================================
   Muestra de juegos MakeCode — menú
   ========================================= */

const botonMenu = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav");
const enlaces = [...nav.querySelectorAll('a[href^="#"]')];

/* ====== Abrir / cerrar el menú en celular ====== */
botonMenu.addEventListener("click", () => {
  const abierto = nav.classList.toggle("open");
  botonMenu.setAttribute("aria-expanded", abierto);
});

// al elegir una sección, el menú se cierra solo
enlaces.forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    botonMenu.setAttribute("aria-expanded", false);
  })
);

/* ====== Marcar en el menú la sección que se está viendo ====== */
const secciones = enlaces
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

function marcar(id) {
  enlaces.forEach((a) => {
    const activo = a.getAttribute("href") === "#" + id;
    a.classList.toggle("activo", activo);
    if (activo) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  });
}

// una sección cuenta como "visible" cuando cruza una franja cerca de la parte de arriba
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) marcar(e.target.id);
    });
  },
  { rootMargin: "-30% 0px -65% 0px" }
);
secciones.forEach((s) => observador.observe(s));

// en la portada no hay ninguna sección marcada
const portada = document.getElementById("inicio");
if (portada) {
  new IntersectionObserver(
    ([e]) => { if (e.isIntersecting) marcar(null); },
    { rootMargin: "-30% 0px -65% 0px" }
  ).observe(portada);
}
