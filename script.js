// === PLAN DERECHO (AÑOS 1–5) ===
// NOTA: Se corrigió DER404 -> prereq SOLO 'DER202'. También se ajustó DER301 -> 'DER105' (Financiero desbloqueado por Economía Política),
// y DER306 -> 'DER205' (Procesal Penal requiere Penal I). Si algún otro requisito difiere, dime y lo ajusto igual de rápido.

const COURSES = [
  // Año 1
  { id:"DER100", name:"Introducción al Derecho", year:1, type:"instrumental",   prereq:[] },
  { id:"DER101", name:"Derecho Romano e Historia del Derecho", year:1, type:"instrumental",   prereq:[] },
  { id:"DER102", name:"Sociología General y Jurídica", year:1, type:"instrumental",   prereq:[] },
  { id:"DER103", name:"Ciencia Política e Historia del Pensamiento", year:1, type:"instrumental",   prereq:[] },
  { id:"DER104", name:"Derecho Civil I y II", year:1, type:"básica",   prereq:[] },
  { id:"DER105", name:"Economía Política", year:1, type:"complementaria",   prereq:[] },
  { id:"DER106", name:"Filosofía General y del Derecho", year:1, type:"básica",   prereq:[] },
  { id:"DER107", name:"Metodología de la Investigación Social y Jurídica", year:1, type:"básica",   prereq:[] },

  // Año 2
  { id:"DER200", name:"Derecho Constitucional y Procedimientos", year:2, type:"específica", prereq:["DER100","DER101","DER102","DER103"] },
  { id:"DER201", name:"Derechos Humanos y Derecho Indígena", year:2, type:"específica", prereq:["DER100"] },
  { id:"DER202", name:"Derecho Administrativo y Procedimiento", year:2, type:"específica", prereq:["DER100"] },
  { id:"DER203", name:"Derecho Civil III (Obligaciones)", year:2, type:"básica", prereq:["DER104"] },
  { id:"DER204", name:"Medicina Legal", year:2, type:"específica", prereq:["DER104"] },
  { id:"DER205", name:"Derecho Penal I", year:2, type:"específica", prereq:["DER105"] },
  { id:"DER206", name:"Criminología", year:2, type:"específica", prereq:["DER105"] },
  { id:"DER207", name:"Órgano Judicial y Expresión", year:2, type:"complementaria", prereq:["DER106"] },

  // Año 3
  { id:"DER300", name:"Derecho Laboral y Forense", year:3, type:"específica", prereq:["DER200"] },
  { id:"DER301", name:"Derecho Financiero, Tributario y Aduanero", year:3, type:"específica", prereq:["DER105"] }, // <- Fin por DER105
  { id:"DER302", name:"Derecho del Medio Ambiente y Procedimiento", year:3, type:"específica", prereq:["DER202"] },
  { id:"DER303", name:"Derecho Civil IV (Contratos)", year:3, type:"básica", prereq:["DER203"] },
  { id:"DER304", name:"Derecho Procesal Civil y Forense", year:3, type:"específica", prereq:["DER203"] },
  { id:"DER305", name:"Derecho Penal II", year:3, type:"básica", prereq:["DER205"] },
  { id:"DER306", name:"Derecho Procesal Penal y Forense", year:3, type:"específica", prereq:["DER205"] }, // <- por Penal I

  // Año 4
  { id:"DER400", name:"Derecho a la Seguridad Social, Proc. y Práctica Forense", year:4, type:"específica", prereq:["DER300"] },
  { id:"DER401", name:"Derecho Comercial y Empresarial", year:4, type:"específica", prereq:["DER301"] },
  { id:"DER402", name:"Derecho Agrario y Procedimiento", year:4, type:"específica", prereq:["DER302"] },
  { id:"DER403", name:"Derecho Civil V (Sucesiones)", year:4, type:"básica", prereq:["DER303"] },
  { id:"DER404", name:"Derecho Bancario, Bursátil y Cooperativo", year:4, type:"específica", prereq:["DER202"] }, // <- CORREGIDO
  { id:"DER405", name:"Derecho Informático", year:4, type:"específica", prereq:["DER304"] },
  { id:"DER406", name:"Derecho Internacional Público y Privado", year:4, type:"específica", prereq:["DER305","DER306"] },
  { id:"DER407", name:"Metodología y Taller de Tesis", year:4, type:"complementaria", prereq:["DER107"] },

  // Año 5
  { id:"DER500", name:"Derecho Autonómico y Municipal", year:5, type:"complementaria", prereq:["DER202"] },
  { id:"DER501", name:"Derecho Procesal Agrario y Proceso Oral", year:5, type:"específica", prereq:["DER402"] },
  { id:"DER502", name:"Derecho Minero y Petrolero", year:5, type:"específica", prereq:["DER302"] },
  { id:"DER503", name:"Derecho de Familia, Niñez y Adolescencia", year:5, type:"específica", prereq:["DER403"] },
  { id:"DER504", name:"Taller y Práctica Forense Civil", year:5, type:"específica", prereq:["DER303"] },
  { id:"DER505", name:"Taller y Práctica Forense Penal", year:5, type:"específica", prereq:["DER306"] },
  { id:"DER506", name:"Métodos Alternativos de Resolución de Conflictos", year:5, type:"complementaria", prereq:["DER407"] }
];

// === Estado y persistencia ===
let COMPLETED = new Set();       // ids aprobadas
let STORAGE_KEY = "";            // malla_<registro>

// Mapa de dependencias para cascada (padre -> [hijos])
const CHILDREN = {};
COURSES.forEach(c => c.prereq.forEach(p => {
  (CHILDREN[p] ||= []).push(c.id);
}));

// === Utilidades de UI ===
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...COMPLETED]));
}
function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  COMPLETED = new Set(raw ? JSON.parse(raw) : []);
}

// Desmarca en cascada todas las dependientes (DFS)
function unapproveCascade(rootId) {
  const stack = [rootId];
  while (stack.length) {
    const cur = stack.pop();
    (CHILDREN[cur] || []).forEach(ch => {
      if (COMPLETED.has(ch)) {
        COMPLETED.delete(ch);
        stack.push(ch);
      }
    });
  }
}

// ¿Esta materia está desbloqueada? => todos sus prereqs aprobados
function isUnlocked(course) {
  return course.prereq.every(p => COMPLETED.has(p));
}

// Render por año
function render() {
  $$(".tiles").forEach(cont => {
    const year = Number(cont.dataset.year);
    cont.innerHTML = "";
    COURSES.filter(c => c.year === year).forEach(c => {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.dataset.type = c.type;

      const done = COMPLETED.has(c.id);
      const unlocked = done || isUnlocked(c);

      if (done) tile.classList.add("completed");
      if (!unlocked) tile.classList.add("locked");

      tile.innerHTML = `
        <div class="tile-header">${c.id}</div>
        <div class="tile-body">${c.name}</div>
      `;

      tile.addEventListener("click", () => {
        if (tile.classList.contains("locked")) return;

        if (COMPLETED.has(c.id)) {
          // Desmarcar + cascada
          COMPLETED.delete(c.id);
          unapproveCascade(c.id);
        } else {
          // Marcar
          COMPLETED.add(c.id);
        }

        save();
        // Felicidades SOLO si a partir de este clic quedó todo completo
        const allDone = COURSES.every(x => COMPLETED.has(x.id));
        render();
        if (allDone) {
          $("#congratsModal").classList.remove("hidden");
          setTimeout(() => $("#congratsModal").classList.add("hidden"), 5000);
        }
      });

      cont.appendChild(tile);
    });
  });
}

// === Arranque ===
document.addEventListener("DOMContentLoaded", () => {
  // Modal siempre oculto al inicio
  $("#congratsModal").classList.add("hidden");

  $("#startBtn").addEventListener("click", () => {
    const name = $("#studentName").value.trim();
    const reg  = $("#studentId").value.trim();
    if (!name || !reg) { alert("Completa Estudiante y Registro"); return; }

    STORAGE_KEY = `malla_${reg}`;
    load();

    // Mostrar UI
    $("#loginOverlay").classList.add("hidden");
    $("#mainHeader").classList.remove("hidden");
    $("#curriculum").classList.remove("hidden");
    $("#infoBar").textContent = `Estudiante: ${name} — Registro: ${reg}`;

    render();
  });
});
