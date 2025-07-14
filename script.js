document.addEventListener('DOMContentLoaded', () => {
  const loginOverlay  = document.getElementById('loginOverlay');
  const mainContent   = document.getElementById('mainContent');
  const usernameInput = document.getElementById('usernameInput');
  const regInput      = document.getElementById('regInput');
  const startBtn      = document.getElementById('startBtn');
  const usernameDisp  = document.getElementById('usernameDisplay');
  const regDisp       = document.getElementById('regDisplay');

  // Siempre mostramos el login al entrar
  loginOverlay.classList.remove('hidden');
  mainContent.classList.add('hidden');

  startBtn.addEventListener('click', () => {
    const user = usernameInput.value.trim();
    const reg  = regInput.value.trim();
    if (!user || !reg) {
      return alert('Por favor ingresa Estudiante y Registro.');
    }
    // Ocultamos login y mostramos contenido
    usernameDisp.textContent = user;
    regDisp.textContent      = reg;
    loginOverlay.classList.add('hidden');
    mainContent.classList.remove('hidden');

    // Inicializamos la malla con este usuario/reg
    initApp(reg);
  });

  function initApp(registro) {
    const materias   = Array.from(document.querySelectorAll('.materia'));
    const storageKey = `mallaProgress_${registro}`;
    let progress     = JSON.parse(localStorage.getItem(storageKey) || '{}');

    // Aplica estado guardado y desbloqueo inicial
    materias.forEach(el => {
      const code = el.dataset.code;
      if (progress[code] === 'aprobada') {
        el.classList.add('aprobada');
        el.classList.remove('pendiente');
      } else {
        el.classList.add('pendiente');
        el.classList.remove('aprobada');
      }
      if (!el.hasAttribute('data-prereq')) {
        el.classList.remove('locked');
      }
    });

    // Función que bloquea/desbloquea según prerrequisitos
    function checkPrereqs() {
      materias.forEach(el => {
        const prereqs = el.getAttribute('data-prereq');
        if (!prereqs) {
          el.classList.remove('locked');
        } else {
          const codes = prereqs.split(',').map(c => c.trim());
          const ok = codes.every(code => {
            const req = materias.find(m => m.dataset.code === code);
            return req && req.classList.contains('aprobada');
          });
          if (ok) {
            el.classList.remove('locked');
          } else {
            el.classList.add('locked');
            el.classList.remove('aprobada');
            el.classList.add('pendiente');
            progress[el.dataset.code] = 'pendiente';
          }
        }
      });
      localStorage.setItem(storageKey, JSON.stringify(progress));
    }

    // Primer chequeo
    checkPrereqs();

    // Handler de clic en materias
    materias.forEach(el => {
      el.addEventListener('click', () => {
        if (el.classList.contains('locked')) return;
        const approved = el.classList.toggle('aprobada');
        el.classList.toggle('pendiente');
        progress[el.dataset.code] = approved ? 'aprobada' : 'pendiente';
        localStorage.setItem(storageKey, JSON.stringify(progress));
        checkPrereqs();
      });
    });
  }
});
