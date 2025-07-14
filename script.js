document.addEventListener('DOMContentLoaded', () => {
  const loginOverlay  = document.getElementById('loginOverlay');
  const mainContent   = document.getElementById('mainContent');
  const usernameInput = document.getElementById('usernameInput');
  const regInput      = document.getElementById('regInput');
  const startBtn      = document.getElementById('startBtn');
  const usernameDisp  = document.getElementById('usernameDisplay');
  const regDisp       = document.getElementById('regDisplay');

  let currentUser = localStorage.getItem('currentUser');
  let currentReg  = localStorage.getItem('currentReg');

  // Si ya hay datos, ocultar overlay y arrancar
  if (currentUser && currentReg) {
    loginOverlay.classList.add('hidden');
    mainContent.classList.remove('hidden');
    usernameDisp.textContent = currentUser;
    regDisp.textContent = currentReg;
    initApp();
  }

  // Login
  startBtn.addEventListener('click', () => {
    const name = usernameInput.value.trim();
    const reg  = regInput.value.trim();
    if (!name || !reg) {
      return alert('Por favor ingresa Estudiante y Registro.');
    }
    currentUser = name;
    currentReg  = reg;
    localStorage.setItem('currentUser', currentUser);
    localStorage.setItem('currentReg', currentReg);
    loginOverlay.classList.add('hidden');
    mainContent.classList.remove('hidden');
    usernameDisp.textContent = currentUser;
    regDisp.textContent = currentReg;
    initApp();
  });

  function initApp() {
    const materias = Array.from(document.querySelectorAll('.materia'));
    // Cargo progreso de este registro
    const key = `mallaProgress_${currentReg}`;
    let progress = JSON.parse(localStorage.getItem(key) || '{}');

    // Aplico estado guardado y desbloqueo inicial
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

    // Bloqueo/desbloqueo según prerrequisitos
    function checkPrereqs() {
      materias.forEach(el => {
        const prereqAttr = el.getAttribute('data-prereq');
        if (!prereqAttr) {
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
            el.classList.add('locked');
            el.classList.remove('aprobada');
            el.classList.add('pendiente');
            progress[el.dataset.code] = 'pendiente';
          }
        }
      });
      localStorage.setItem(key, JSON.stringify(progress));
    }

    checkPrereqs();

    // Manejo de clic
    materias.forEach(el => {
      el.addEventListener('click', () => {
        if (el.classList.contains('locked')) return;
        const nowAprob = el.classList.toggle('aprobada');
        el.classList.toggle('pendiente');
        progress[el.dataset.code] = nowAprob ? 'aprobada' : 'pendiente';
        localStorage.setItem(key, JSON.stringify(progress));
        checkPrereqs();
      });
    });
  }
});
