document.addEventListener('DOMContentLoaded', () => {
  const materias = Array.from(document.querySelectorAll('.materia'));
  // Cargo el progreso previo (o un objeto vacío)
  let progress = JSON.parse(localStorage.getItem('mallaProgress') || '{}');

  // Aplico el estado guardado a cada materia
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

  // Función que muestra/oculta según prerrequisitos y resetea estados si corresponde
  function checkPrereqs() {
    materias.forEach(el => {
      const prereq = el.dataset.prereq;
      if (!prereq) {
        // nivel 1 o sin prerrequisitos: siempre visible
        el.classList.remove('oculta');
      } else {
        // para niveles >1: compruebo todos los códigos
        const codes = prereq.split(',').map(c => c.trim());
        const ok = codes.every(code => {
          const req = materias.find(m => m.dataset.code === code);
          return req && req.classList.contains('aprobada');
        });
        if (ok) {
          el.classList.remove('oculta');
        } else {
          // oculto y reseteo a pendiente
          el.classList.add('oculta');
          el.classList.remove('aprobada');
          el.classList.add('pendiente');
          progress[el.dataset.code] = 'pendiente';
        }
      }
    });
  }

  // Primer chequeo al cargar
  checkPrereqs();

  // Manejador de clic único para alternar pendiente ↔ aprobada
  materias.forEach(el => {
    el.addEventListener('click', () => {
      if (el.classList.contains('oculta')) return; // no clickeable
      if (el.classList.contains('aprobada')) {
        el.classList.remove('aprobada');
        el.classList.add('pendiente');
        progress[el.dataset.code] = 'pendiente';
      } else {
        el.classList.remove('pendiente');
        el.classList.add('aprobada');
        progress[el.dataset.code] = 'aprobada';
      }
      // guardo estado y vuelvo a recalcular prerrequisitos
      localStorage.setItem('mallaProgress', JSON.stringify(progress));
      checkPrereqs();
    });
  });
});
