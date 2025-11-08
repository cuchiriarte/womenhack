(function(){
  const authArea = document.getElementById('auth-area-market');
  const appArea = document.getElementById('market-app');
  function renderAuth(){
    authArea.innerHTML = `
      <h2>Marketplace</h2>
      <div style="display:flex;gap:1rem;flex-wrap:wrap">
        <div style="flex:1">
          <h3>Login</h3>
          <form id="login-m">
            <label>Usuario <input class="input" name="user" required></label>
            <label>Contraseña <input class="input" name="pass" type="password" required></label>
            <div class="mt-1"><button class="btn" type="submit">Entrar</button></div>
          </form>
        </div>
        <div style="flex:1">
          <h3>Registro (Freelancer)</h3>
          <form id="reg-m">
            <label>Usuario <input class="input" name="user" required></label>
            <label>Contraseña <input class="input" name="pass" type="password" required></label>
            <label>Habilidades (comas) <input class="input" name="skills"></label>
            <div class="mt-1"><button class="btn alt" type="submit">Registrar</button></div>
          </form>
        </div>
      </div>
    `;
    document.getElementById('login-m').addEventListener('submit', onLogin);
    document.getElementById('reg-m').addEventListener('submit', onRegister);
  }

  function onLogin(e){
    e.preventDefault();
    const fd = new FormData(e.target); const user = fd.get('user').trim(); const pass = fd.get('pass').trim();
    const creds = RM.getCreds();
    const users = [].concat(creds.empresa||[], creds.freelancer||[]);
    const match = users.find(u=>u.user===user && u.pass===pass);
    if(!match){ alert('Credenciales no válidas (demo)'); return; }
    localStorage.setItem('rm_session', JSON.stringify({user:match.user, role:match.role}));
    renderApp();
  }

  function onRegister(e){
    e.preventDefault();
    const fd = new FormData(e.target);
    const user = fd.get('user').trim(); const pass = fd.get('pass').trim();
    const skills = (fd.get('skills')||'').split(',').map(s=>s.trim()).filter(Boolean);
    const creds = RM.getCreds();
    creds.freelancer = creds.freelancer || [];
    if(creds.freelancer.find(u=>u.user===user) || creds.empresa.find(u=>u.user===user)){
      alert('Usuario ya existe (demo).'); return;
    }
    creds.freelancer.unshift({user, pass, role:'freelancer', skills});
    RM.saveCreds(creds);
    alert('Registrado (demo). Ahora inicia sesión.');
    renderAuth();
  }

  function renderApp(){
    const sess = JSON.parse(localStorage.getItem('rm_session')||'null');
    if(!sess){ authArea.style.display='block'; appArea.style.display='none'; renderAuth(); return; }
    authArea.style.display='none'; appArea.style.display='block';
    appArea.innerHTML = `
      <h2>Bienvenida, ${RM.escapeHTML(sess.user)}</h2>
      <div class="mt-1"><button id="logout-m" class="btn alt">Cerrar sesión</button></div>
      <section class="mt-1">
        <h3>Publicar oferta</h3>
        <form id="offer-form">
          <label>Título <input class="input" name="title" required></label>
          <label>Descripción <textarea class="input" name="desc" required></textarea></label>
          <label>Precio €/h <input class="input" name="price" type="number"></label>
          <div class="mt-1"><button class="btn" type="submit">Publicar</button></div>
        </form>
      </section>
      <section class="mt-1">
        <h3>Ofertas</h3>
        <div id="offers-list"></div>
      </section>
    `;
    document.getElementById('logout-m').addEventListener('click', ()=>{
      localStorage.removeItem('rm_session'); renderApp();
    });
    const offersKey = 'rm_offers_v1';
    if(!localStorage.getItem(offersKey)) localStorage.setItem(offersKey, JSON.stringify([]));
    const list = document.getElementById('offers-list');
    function refresh(){
      const arr = JSON.parse(localStorage.getItem(offersKey)||'[]');
      list.innerHTML = '';
      if(arr.length===0){ list.innerHTML = '<p class="small">No hay ofertas todavía.</p>'; return; }
      arr.forEach(o=>{
        const d=document.createElement('div'); d.className='offer-card mt-1';
        d.innerHTML=`<h4>${RM.escapeHTML(o.title)}</h4><div class="small badge">${RM.escapeHTML(o.price||'—')} €/h</div><p>${RM.escapeHTML(o.desc)}</p><div class="small">Publicado por: ${RM.escapeHTML(o.author)}</div>`;
        list.appendChild(d);
      });
    }
    refresh();
    document.getElementById('offer-form').addEventListener('submit', e=>{
      e.preventDefault();
      const fd=new FormData(e.target);
      const title=fd.get('title').trim(), desc=fd.get('desc').trim();
      if(!title||!desc){ alert('Título y descripción obligatorios'); return; }
      const offers = JSON.parse(localStorage.getItem(offersKey)||'[]');
      const sess = JSON.parse(localStorage.getItem('rm_session')||'{}');
      offers.unshift({id:Date.now().toString(), title, desc, price:fd.get('price'), author:sess.user});
      localStorage.setItem(offersKey, JSON.stringify(offers));
      e.target.reset();
      refresh();
    });
  }

  renderAuth();
  renderApp();
})();