document.addEventListener('DOMContentLoaded', () => {
  const materias = document.querySelectorAll('.materia');

  materias.forEach(el => {
    el.addEventListener('click', () => {
      if (el.classList.contains('oculta')) return;  // no clickable si está oculta

      // Alterna pendiente <-> aprobada
      el.classList.toggle('aprobada');
      el.classList.toggle('pendiente');

      // Revisa prerrequisitos y desbloquea nuevas materias
      checkPrereqs();
    });
  });

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

  // Al cargar, haz el primer chequeo en caso de que ya tengas aprobadas algunas
  checkPrereqs();
});
