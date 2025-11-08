(function(){
  const authArea = document.getElementById('auth-area');
  const appArea = document.getElementById('school-app');
  const CRED_KEY = RM.KEY_CRED;
  function renderAuth(){
    authArea.innerHTML = `
      <h2>Acceso Escuela</h2>
      <div style="display:flex;gap:1rem;flex-wrap:wrap">
        <div style="flex:1">
          <h3>Login</h3>
          <form id="login-form">
            <label>Usuario <input class="input" name="user" required></label>
            <label>Contraseña <input class="input" name="pass" type="password" required></label>
            <div class="mt-1"><button class="btn" type="submit">Entrar</button></div>
          </form>
        </div>
        <div style="flex:1">
          <h3>Registro (Aprendiz)</h3>
          <form id="reg-form">
            <label>Usuario <input class="input" name="user" required></label>
            <label>Contraseña <input class="input" name="pass" type="password" required></label>
            <label>Habilidades (comas) <input class="input" name="skills"></label>
            <div class="mt-1"><button class="btn alt" type="submit">Registrar</button></div>
          </form>
        </div>
      </div>
    `;
    document.getElementById('login-form').addEventListener('submit', onLogin);
    document.getElementById('reg-form').addEventListener('submit', onRegister);
  }

  function onLogin(e){
    e.preventDefault();
    const fd = new FormData(e.target);
    const user = fd.get('user').trim();
    const pass = fd.get('pass').trim();
    const creds = RM.getCreds();
    // combine escuela + aprendiz arrays to search
    const users = [].concat(creds.escuela||[], creds.aprendiz||[]);
    const match = users.find(u=>u.user===user && u.pass===pass);
    if(!match){ alert('Credenciales no válidas (demo)'); return; }
    // store session demo
    localStorage.setItem('rm_session', JSON.stringify({user:match.user, role:match.role}));
    renderApp();
  }

  function onRegister(e){
    e.preventDefault();
    const fd = new FormData(e.target);
    const user = fd.get('user').trim();
    const pass = fd.get('pass').trim();
    const skills = (fd.get('skills')||'').split(',').map(s=>s.trim()).filter(Boolean);
    const creds = RM.getCreds();
    creds.aprendiz = creds.aprendiz || [];
    if(creds.aprendiz.find(u=>u.user===user) || creds.escuela.find(u=>u.user===user)){
      alert('Usuario ya existe (demo).');
      return;
    }
    creds.aprendiz.unshift({user, pass, role:'aprendiz', skills});
    RM.saveCreds(creds);
    alert('Registrado (demo). Ahora puedes iniciar sesión.');
    renderAuth();
  }

  function renderApp(){
    const sess = JSON.parse(localStorage.getItem('rm_session')||'null');
    if(!sess){ authArea.style.display='block'; appArea.style.display='none'; renderAuth(); return; }
    authArea.style.display='none'; appArea.style.display='block';
    // simple courses demo
    const courses = [
      {id:'c1', title:'Introducción a JS', level:'Principiante', desc:'Bases de programación con JavaScript.'},
      {id:'c2', title:'Diseño UX/UI', level:'Intermedio', desc:'Principios de diseño centrado en el usuario.'},
      {id:'c3', title:'Data y visualización', level:'Principiante', desc:'Visualizar datos con herramientas básicas.'}
    ];
    appArea.innerHTML = `
      <h2>Bienvenida, ${RM.escapeHTML(sess.user)}</h2>
      <div class="mt-1">
        <button id="logout" class="btn alt">Cerrar sesión</button>
      </div>
      <section class="mt-1">
        <h3>Mis cursos</h3>
        <div id="courses" class="grid"></div>
      </section>
      <section class="mt-1">
        <h3>Perfil</h3>
        <div id="profile-area"></div>
      </section>
    `;
    document.getElementById('logout').addEventListener('click', ()=>{
      localStorage.removeItem('rm_session');
      renderApp();
    });
    const list = document.getElementById('courses');
    courses.forEach(c=>{
      const d = document.createElement('div'); d.className='course-card';
      d.innerHTML = `<h4>${RM.escapeHTML(c.title)}</h4><div class="small badge">${RM.escapeHTML(c.level)}</div><p>${RM.escapeHTML(c.desc)}</p><button class="btn" data-id="${c.id}">Inscribirme</button>`;
      list.appendChild(d);
    });
    list.addEventListener('click', e=>{
      if(e.target.matches('button')){
        alert('Inscripción simulada (demo).');
      }
    });
    renderProfileArea(sess.user);
  }

  function renderProfileArea(user){
    const creds = RM.getCreds();
    const all = [].concat(creds.escuela||[], creds.aprendiz||[]);
    const me = all.find(u=>u.user===user) || {};
    const el = document.getElementById('profile-area');
    el.innerHTML = `<p><strong>Usuario:</strong> ${RM.escapeHTML(me.user||'')}</p>
      <p><strong>Habilidades:</strong> ${(me.skills||[]).map(RM.escapeHTML).join(', ') || '—'}</p>
      <div class="mt-1"><button id="edit-profile" class="btn">Editar perfil</button></div>`;
    document.getElementById('edit-profile').addEventListener('click', ()=>{
      el.innerHTML = `
        <form id="edit-form">
          <label>Habilidades (comas) <input class="input" name="skills" value="${RM.escapeHTML((me.skills||[]).join(', '))}"></label>
          <div class="mt-1"><button class="btn" type="submit">Guardar</button></div>
        </form>
      `;
      document.getElementById('edit-form').addEventListener('submit', (ev)=>{
        ev.preventDefault();
        const skills = (new FormData(ev.target).get('skills')||'').split(',').map(s=>s.trim()).filter(Boolean);
        // update storage
        const creds2 = RM.getCreds();
        ['escuela','aprendiz'].forEach(k=>{
          creds2[k] = (creds2[k]||[]).map(u=>{
            if(u.user===me.user){ u.skills = skills; }
            return u;
          });
        });
        RM.saveCreds(creds2);
        alert('Perfil actualizado (demo).');
        renderApp();
      });
    });
  }

  // init
  renderAuth();
  renderApp();
})();