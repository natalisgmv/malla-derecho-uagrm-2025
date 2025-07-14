document.addEventListener('DOMContentLoaded', () => {
  const materias = document.querySelectorAll('.materia');

  // Al hacer clic, ciclo de estados y chequeo de prerrequisitos
  materias.forEach(el => {
    el.addEventListener('click', () => {
      if (el.classList.contains('oculta')) return; // no clickeable si está oculta

      if (el.classList.contains('pendiente')) {
        el.classList.replace('pendiente', 'cursando');
      } else if (el.classList.contains('cursando')) {
        el.classList.replace('cursando', 'aprobada');
      } else {
        el.classList.replace('aprobada', 'pendiente');
      }

      checkPrereqs();
    });
  });

  // Revela las materias cuyas prerrequisitos estén aprobadas
  function checkPrereqs() {
    document.querySelectorAll('.materia.oculta').forEach(el => {
      const prereqs = el.dataset.prereq.split(',');
      const ok = prereqs.every(code => {
        const req = document.querySelector(`.materia[data-code="${code.trim()}"]`);
        return req && req.classList.contains('aprobada');
      });
      if (ok) el.classList.remove('oculta');
    });
  }
});

