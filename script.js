document.addEventListener('DOMContentLoaded', () => {
  const materias = Array.from(document.querySelectorAll('.materia'));
  let progress = JSON.parse(localStorage.getItem('mallaProgress') || '{}');

  // 1) Aplicar estado guardado y garantizar unlock de sin prerrequisitos
  materias.forEach(el => {
    const code = el.dataset.code;
    // Estado guardado
    if (progress[code] === 'aprobada') {
      el.classList.add('aprobada');
      el.classList.remove('pendiente');
    } else {
      el.classList.add('pendiente');
      el.classList.remove('aprobada');
    }
    // Si no tiene data-prereq, quitamos locked
    if (!el.hasAttribute('data-prereq')) {
      el.classList.remove('locked');
    }
  });

  // 2) Función para bloquear/desbloquear según prerrequisitos
  function checkPrereqs() {
    materias.forEach(el => {
      const prereqAttr = el.getAttribute('data-prereq');
      if (!prereqAttr) {
        // Sin prerrequisitos: desbloqueada
        el.classList.remove('locked');
      } else {
        const codes = prereqAttr.split(',').map(c => c.trim());
        const ok = codes.every(code => {
          const req = materias.find(m => m.dataset.code === code);
          return req && req.classList.contains('aprobada');
        });
        if (ok) {
          el.classList.remove('locked');
        } else {
          // Bloquear y resetear su estado
          el.classList.add('locked');
          el.classList.remove('aprobada');
          el.classList.add('pendiente');
          progress[el.dataset.code] = 'pendiente';
        }
      }
    });
  }

  checkPrereqs();

  // 3) Handler de clic: solo descontpela si NO está locked
  materias.forEach(el => {
    el.addEventListener('click', () => {
      if (el.classList.contains('locked')) return;
      // Alterna aprobado ↔ pendiente
      const nowAprob = el.classList.toggle('aprobada');
      el.classList.toggle('pendiente');
      // Guardar
      progress[el.dataset.code] = nowAprob ? 'aprobada' : 'pendiente';
      localStorage.setItem('mallaProgress', JSON.stringify(progress));
      // Rechequear prerrequisitos
      checkPrereqs();
    });
  });
});

