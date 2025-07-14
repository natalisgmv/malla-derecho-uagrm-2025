document.addEventListener('DOMContentLoaded', () => {
  const materias = Array.from(document.querySelectorAll('.materia'));
  let progress = JSON.parse(localStorage.getItem('mallaProgress') || '{}');

  // 1) Aplica el progreso guardado
  materias.forEach(el => {
    const code = el.dataset.code;
    if (progress[code] === 'aprobada') {
      el.classList.add('aprobada');
      el.classList.remove('pendiente');
    } else {
      el.classList.add('pendiente');
      el.classList.remove('aprobada');
    }
  });

  // 2) Función que bloquea/desbloquea según prerrequisitos
  function checkPrereqs() {
    materias.forEach(el => {
      const prereq = el.dataset.prereq;
      if (!prereq) {
        // sin prerrequisitos: desbloqueada
        el.classList.remove('locked');
      } else {
        const codes = prereq.split(',').map(c => c.trim());
        const ok = codes.every(code => {
          const req = materias.find(m => m.dataset.code === code);
          return req && req.classList.contains('aprobada');
        });
        if (ok) {
          el.classList.remove('locked');
        } else {
          // bloquea y resetea su estado a pendiente
          el.classList.add('locked');
          el.classList.remove('aprobada');
          el.classList.add('pendiente');
          progress[el.dataset.code] = 'pendiente';
        }
      }
    });
  }

  // Chequeo inicial
  checkPrereqs();

  // 3) Handler de clic: sólo si NO está locked
  materias.forEach(el => {
    el.addEventListener('click', () => {
      if (el.classList.contains('locked')) return;
      // toggle aprobado/pendiente
      if (el.classList.contains('aprobada')) {
        el.classList.remove('aprobada');
        el.classList.add('pendiente');
        progress[el.dataset.code] = 'pendiente';
      } else {
        el.classList.remove('pendiente');
        el.classList.add('aprobada');
        progress[el.dataset.code] = 'aprobada';
      }
      localStorage.setItem('mallaProgress', JSON.stringify(progress));
      checkPrereqs();
    });
  });
});
