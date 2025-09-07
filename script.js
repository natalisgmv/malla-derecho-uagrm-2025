// --- Datos de materias ---
const materias = [
  { sigla: "DER100", nombre: "INTRODUCCIÓN AL DERECHO", creditos: 8, tipo: "basicas-instrumentales", prereq: [], semestre: 1 },
  { sigla: "DER101", nombre: "DERECHO ROMANO E HIST. DEL DER. BOL.", creditos: 8, tipo: "basicas-instrumentales", prereq: [], semestre: 1 },
  { sigla: "DER102", nombre: "SOCILOGÍA GENERAL Y JURÍDICA", creditos: 6, tipo: "basicas-instrumentales", prereq: [], semestre: 1 },
  { sigla: "DER103", nombre: "CIENCIA POLÍTICA E HIST. DEL PENS. POLÍTICO", creditos: 6, tipo: "basicas-instrumentales", prereq: [], semestre: 1 },
  { sigla: "DER104", nombre: "DERECHO CIVIL I Y II (Personas y Derechos Reales)", creditos: 6, tipo: "basicas-instrumentales", prereq: [], semestre: 1 },
  { sigla: "DER105", nombre: "ECONOMÍA POLÍTICA", creditos: 6, tipo: "complementarias", prereq: [], semestre: 1 },
  { sigla: "DER106", nombre: "FILOSOFÍA GENERAL Y DEL DERECHO", creditos: 6, tipo: "basicas-instrumentales", prereq: [], semestre: 1 },
  { sigla: "DER107", nombre: "METODOLOGÍA DE INVESTIGACIÓN SOCIAL Y JURÍDICA", creditos: 8, tipo: "basicas-instrumentales", prereq: [], semestre: 1 },

  { sigla: "DER200", nombre: "DERECHO CONSTITUCIONAL Y PROC. CONST.", creditos: 8, tipo: "especificas", prereq: ["DER100", "DER103"], semestre: 2 },
  { sigla: "DER201", nombre: "DERECHOS HUMANOS, SU PROCEDIMIENTO Y DERECHO INDÍGENA", creditos: 8, tipo: "complementarias", prereq: ["DER101", "DER102"], semestre: 2 },
  { sigla: "DER202", nombre: "DERECHO ADMINISTRATIVO Y SU PROCEDIMIENTO", creditos: 8, tipo: "basicas-especificas", prereq: ["DER104"], semestre: 2 },
  { sigla: "DER203", nombre: "DERECHO CIVIL III (OBLIGACIONES)", creditos: 8, tipo: "especificas", prereq: ["DER104"], semestre: 2 },
  { sigla: "DER204", nombre: "MEDICINA LEGAL", creditos: 8, tipo: "especificas", prereq: ["DER104"], semestre: 2 },
  { sigla: "DER205", nombre: "DERECHO PENAL I", creditos: 8, tipo: "especificas", prereq: ["DER106"], semestre: 2 },
  { sigla: "DER206", nombre: "CRIMINOLOGÍA", creditos: 8, tipo: "especificas", prereq: ["DER102"], semestre: 2 },
  { sigla: "DER207", nombre: "LEY DEL ÓRGANO JUDICIAL, ÉTICA, TALLER DE EXPRESIÓN ORAL Y ESCRITA", creditos: 8, tipo: "especificas", prereq: ["DER106"], semestre: 2 },

  { sigla: "DER300", nombre: "DERECHO LABORAL, SU PROCEDIMIENTO Y PRÁCT. FORENSE", creditos: 6, tipo: "especificas", prereq: ["DER201"], semestre: 3 },
  { sigla: "DER301", nombre: "DERECHO FINANCIERO, TRIBUTARIO, ADUANERO Y SU PROCEDIMIENTO", creditos: 6, tipo: "especificas", prereq: ["DER105"], semestre: 3 },
  { sigla: "DER302", nombre: "DERECHO DEL MEDIO AMBIENTE Y SU PROCEDIMIENTO", creditos: 6, tipo: "especificas", prereq: ["DER200"], semestre: 3 },
  { sigla: "DER303", nombre: "DERECHO CIVIL IV (CONTRATOS)", creditos: 8, tipo: "especificas", prereq: ["DER203"], semestre: 3 },
  { sigla: "DER304", nombre: "DERECHO PROCESAL CIVIL Y PRÁCT. FORENSE", creditos: 10, tipo: "especificas", prereq: ["DER203"], semestre: 3 },
  { sigla: "DER305", nombre: "DERECHO PENAL II", creditos: 8, tipo: "especificas", prereq: ["DER204", "DER205"], semestre: 3 },
  { sigla: "DER306", nombre: "DERECHO PROCESAL PENAL Y PRÁCT. FORENSE", creditos: 10, tipo: "especificas", prereq: ["DER205", "DER206"], semestre: 3 },

  { sigla: "DER400", nombre: "DERECHO A LA SEGURIDAD SOCIAL, SUPROC. Y PRÁCT. FORENSE", creditos: 6, tipo: "especificas", prereq: ["DER300"], semestre: 4 },
  { sigla: "DER401", nombre: "DERECHO COMERCIAL Y EMPRESARIAL", creditos: 8, tipo: "basicas-especificas", prereq: ["DER301"], semestre: 4 },
  { sigla: "DER402", nombre: "DERECHO AGRARIO Y PROC. ADM. AGRARIO", creditos: 6, tipo: "basicas-especificas", prereq: ["DER302"], semestre: 4 },
  { sigla: "DER403", nombre: "DERECHO CIVIL V (SUCESIONES)", creditos: 8, tipo: "especificas", prereq: ["DER303"], semestre: 4 },
  { sigla: "DER404", nombre: "DERECHO BANCARIO, BURSÁTIL Y COOPERATIVO", creditos: 6, tipo: "basicas-especificas", prereq: ["DER202"], semestre: 4 },
  { sigla: "DER405", nombre: "DERECHO INFORMÁTICO", creditos: 6, tipo: "especificas", prereq: ["DER303"], semestre: 4 },
  { sigla: "DER406", nombre: "DERECHO INTERNACIONAL PÚBLICO Y PRIVADO", creditos: 8, tipo: "basicas-especificas", prereq: ["DER305"], semestre: 4 },
  { sigla: "DER407", nombre: "METODOLOGÍA Y TALLER DE TESIS", creditos: 8, tipo: "basicas-especificas", prereq: ["DER107"], semestre: 4 },

  { sigla: "DER500", nombre: "DERECHO AUTONÓMICO Y MUNICIPAL", creditos: 6, tipo: "especificas", prereq: ["DER202"], semestre: 5 },
  { sigla: "DER501", nombre: "DERECHO PROCESAL AGRARIO Y SU PROCESO ORAL", creditos: 6, tipo: "especificas", prereq: ["DER402"], semestre: 5 },
  { sigla: "DER502", nombre: "DERECHO MINERO Y PETROLERO", creditos: 8, tipo: "basicas-especificas", prereq: ["DER302"], semestre: 5 },
  { sigla: "DER503", nombre: "DERECHO DE FAMILIA, DE LA NIÑEZ, ADOLESCENCIA Y VIOLENCIA", creditos: 8, tipo: "especificas", prereq: ["DER403"], semestre: 5 },
  { sigla: "DER504", nombre: "TALLER Y PRÁCTICA FORENSE CIVIL", creditos: 6, tipo: "especificas", prereq: ["DER303"], semestre: 5 },
  { sigla: "DER505", nombre: "TALLER Y PRÁCT. FORENSE PENAL Y SISTEMA PENITENCIARIO", creditos: 6, tipo: "especificas", prereq: ["DER304", "DER305", "DER406"], semestre: 5 },
  { sigla: "DER506", nombre: "MÉTODOS ALTERNATIVOS DE RESOLUCIÓN DE CONFLICTOS", creditos: 6, tipo: "complementarias", prereq: ["DER407"], semestre: 5 }
];

let completadas = new Set();
const totalMaterias = materias.length;
let currentUser = null;

// --- Login ---
function login() {
  const name = document.getElementById('studentName').value.trim();
  const id = document.getElementById('studentId').value.trim();

  if (!name || !id) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  currentUser = { name, id };
  document.getElementById('userInfo').textContent = `👤 ${name} | 🆔 ${id}`;

  // Cargar progreso guardado
  const savedProgress = localStorage.getItem(`progress_${id}`);
  if (savedProgress) {
    completadas = new Set(JSON.parse(savedProgress));
  } else {
    completadas = new Set();
  }

  // Mostrar malla
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('mainScreen').classList.remove('hidden');

  renderMaterias();
  updateProgress();
}

// --- Logout ---
function logout() {
  saveProgress();
  completadas.clear();
  currentUser = null;
  document.getElementById('mainScreen').classList.add('hidden');
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('studentName').value = '';
  document.getElementById('studentId').value = '';
}

// --- Guardar progreso ---
function saveProgress() {
  if (currentUser) {
    localStorage.setItem(`progress_${currentUser.id}`, JSON.stringify([...completadas]));
  }
}

// --- Renderizar materias ---
function renderMaterias() {
  const semestres = document.querySelectorAll('.subjects');
  semestres.forEach(sem => sem.innerHTML = '');

  materias.forEach(materia => {
    const container = document.getElementById(`subjects-${materia.semestre}`);
    if (!container) return;

    const subject = document.createElement('div');
    subject.className = `subject ${completadas.has(materia.sigla) ? 'completed' : ''}`;
    subject.dataset.sigla = materia.sigla;

    subject.style.borderColor = getColor(materia.tipo);

    subject.innerHTML = `
      <div class="subject-type">${getTipoNombre(materia.tipo)}</div>
      <div class="subject-code">${materia.sigla}</div>
      <div class="subject-name">${materia.nombre}</div>
      <div class="subject-credits">${materia.creditos} cr.</div>
    `;

    if (materia.prereq.every(pr => completadas.has(pr)) || materia.prereq.length === 0) {
      subject.onclick = () => toggleMateria(materia.sigla);
    } else {
      subject.classList.add('locked');
      subject.title = "Prerrequisitos no cumplidos";
    }

    container.appendChild(subject);
  });
}

// --- Toggle materia ---
function toggleMateria(sigla) {
  if (completadas.has(sigla)) {
    completadas.delete(sigla);
  } else {
    completadas.add(sigla);
  }
  saveProgress();
  renderMaterias();
  updateProgress();
}

// --- Actualizar progreso ---
function updateProgress() {
  const progress = (completadas.size / totalMaterias) * 100;
  document.getElementById('progress').style.width = `${progress}%`;
  document.getElementById('status').textContent = `Progreso: ${Math.round(progress)}% (${completadas.size}/${totalMaterias})`;
}

// --- Resetear ---
function resetAll() {
  if (confirm("¿Estás seguro de reiniciar tu progreso?")) {
    completadas.clear();
    saveProgress();
    renderMaterias();
    updateProgress();
  }
}

// --- Mostrar completadas ---
function showCompleted() {
  if (completadas.size === 0) {
    alert("No has completado ninguna materia aún.");
  } else {
    alert("Materias completadas:\n" + Array.from(completadas).join("\n"));
  }
}

// --- Helpers ---
function getColor(tipo) {
  switch (tipo) {
    case "especificas": return "var(--especificas)";
    case "basicas-especificas": return "var(--basicas-especificas)";
    case "basicas-instrumentales": return "var(--basicas-instrumentales)";
    case "complementarias": return "var(--complementarias)";
    default: return "var(--border)";
  }
}

function getTipoNombre(tipo) {
  switch (tipo) {
    case "especificas": return "ESPECÍFICAS";
    case "basicas-especificas": return "BÁSICAS ESPECÍFICAS";
    case "basicas-instrumentales": return "BÁSICAS INSTRUMENTALES";
    case "complementarias": return "COMPLEMENTARIAS";
    default: return "OTRO";
  }
}
