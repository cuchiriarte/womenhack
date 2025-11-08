// Demo SPA sin frameworks. Datos en localStorage.
(() => {
  console.log('app.js cargado'); // <-- añadido para depuración

  const STORAGE_PROFILE = 'rm_profile_v1';
  const STORAGE_MARKET = 'rm_market_v1';
  const STORAGE_COURSES = 'rm_courses_v1';

  // Utils
  const q = sel => document.querySelector(sel);
  const escapeHTML = str => String(str || '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[s]);

  // Datos iniciales (guardados si no existe)
  const initialCourses = [
    {id:'c1', title:'Introducción a la Programación', level:'Principiante', desc:'Bases de JS y lógica.'},
    {id:'c2', title:'Diseño UX/UI', level:'Intermedio', desc:'Prototipado y usabilidad.'},
    {id:'c3', title:'Data Science Básico', level:'Principiante', desc:'Introducción a datos y visualización.'}
  ];
  if(!localStorage.getItem(STORAGE_COURSES)) localStorage.setItem(STORAGE_COURSES, JSON.stringify(initialCourses));
  if(!localStorage.getItem(STORAGE_MARKET)) localStorage.setItem(STORAGE_MARKET, JSON.stringify([]));

  // Routing simple por hash
  function route(){
    const hash = location.hash.replace('#','') || '/';
    const app = q('#app');

    if(!app){
      console.error('app.js: elemento #app no encontrado en el DOM. Asegúrate de recargar la página después de que cargue el HTML.');
      return;
    }

    if(hash === '/' || hash === '') return renderLanding(app);
    if(hash.startsWith('/courses')) return renderCourses(app);
    if(hash.startsWith('/profile')) return renderProfile(app);
    if(hash.startsWith('/market')) return renderMarket(app);
    renderLanding(app);
  }
  window.addEventListener('hashchange', route);
  window.addEventListener('load', route);
  window.addEventListener('DOMContentLoaded', route); // <-- añade por si acaso

  // Renderers
  function renderLanding(container){
    container.innerHTML = `
      <section class="card hero">
        <div class="left">
          <h2>ReinsertaMamá</h2>
          <p class="small">Apoyando a madres andaluzas para volver al mundo laboral vía formación STEAM y oportunidades freelance.</p>
          <div class="mt-1">
            <a href="#/courses" class="btn">Ver cursos</a>
            <a href="#/market" class="btn alt">Explorar marketplace</a>
          </div>
        </div>
        <div class="right">
          <img src="" alt="Ilustración" style="width:100%;max-height:180px;object-fit:cover;border-radius:6px;background:#eef;padding:2rem">
        </div>
      </section>

      <section class="card">
        <h3>Objetivos</h3>
        <ul>
          <li>Cerrar la brecha laboral para madres en Andalucía.</li>
          <li>Ofrecer rutas de aprendizaje STEAM accesibles.</li>
          <li>Conectar talento con empresas mediante un marketplace local.</li>
        </ul>
      </section>

      <section class="card">
        <h3>Quiénes somos</h3>
        <p>Proyecto demo creado para facilitar la formación y salida profesional de madres andaluzas. Contenido orientativo y de prueba.</p>
      </section>
    `;
  }

  function renderCourses(container){
    const courses = JSON.parse(localStorage.getItem(STORAGE_COURSES) || '[]');
    container.innerHTML = `<section class="card"><h2>Cursos STEAM</h2><div id="courses-list" class="grid"></div></section>`;
    const list = q('#courses-list');
    courses.forEach(c => {
      const el = document.createElement('div');
      el.className = 'course-card';
      el.innerHTML = `<h4>${escapeHTML(c.title)}</h4>
        <div class="small badge">${escapeHTML(c.level)}</div>
        <p>${escapeHTML(c.desc)}</p>
        <button class="btn" data-id="${c.id}">Inscribirme (demo)</button>`;
      list.appendChild(el);
    });
    list.addEventListener('click', e => {
      if(e.target.matches('button')){
        alert('Inscripción simulada. En una versión completa almacenaríamos tu inscripción.');
      }
    });
  }

  function renderProfile(container){
    const profile = JSON.parse(localStorage.getItem(STORAGE_PROFILE) || '{}');
    container.innerHTML = `<section class="card"><h2>Perfil</h2>
      <form id="profile-form">
        <label>Nombre <input class="input" name="name" value="${escapeHTML(profile.name||'')}" /></label>
        <label>Localidad <input class="input" name="location" value="${escapeHTML(profile.location||'Andalucía')}" /></label>
        <label>Habilidades (separadas por comas) <input class="input" name="skills" value="${escapeHTML((profile.skills||[]).join(', '))}" /></label>
        <label>Enlace portfolio (opcional) <input class="input" name="portfolio" value="${escapeHTML(profile.portfolio||'')}" /></label>
        <div class="mt-1">
          <button class="btn" type="submit">Guardar</button>
          <button class="btn alt" type="button" id="clear-profile">Borrar</button>
        </div>
      </form>
      <div id="profile-saved" class="mt-1 small"></div>
    </section>`;
    const form = q('#profile-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get('name').trim();
      if(!name){ alert('El nombre es obligatorio'); return; }
      const profile = {
        name: name,
        location: fd.get('location').trim(),
        skills: fd.get('skills').split(',').map(s=>s.trim()).filter(Boolean),
        portfolio: fd.get('portfolio').trim()
      };
      localStorage.setItem(STORAGE_PROFILE, JSON.stringify(profile));
      q('#profile-saved').textContent = 'Perfil guardado en localStorage (demo).';
    });
    q('#clear-profile').addEventListener('click', () => {
      localStorage.removeItem(STORAGE_PROFILE);
      renderProfile(container);
    });
  }

  function renderMarket(container){
    const offers = JSON.parse(localStorage.getItem(STORAGE_MARKET) || '[]');
    container.innerHTML = `
      <section class="card">
        <h2>Marketplace</h2>
        <div class="mt-1">
          <form id="offer-form">
            <label>Título <input class="input" name="title" required /></label>
            <label>Descripción <textarea class="input" name="desc" required></textarea></label>
            <label>Precio orientativo (€/h) <input class="input" name="price" type="number" /></label>
            <div class="mt-1"><button class="btn" type="submit">Publicar oferta (demo)</button></div>
          </form>
        </div>
      </section>
      <section class="card">
        <h3>Ofertas publicadas</h3>
        <div id="offers-list"></div>
      </section>
    `;
    const list = q('#offers-list');
    function refreshOffers(){
      const data = JSON.parse(localStorage.getItem(STORAGE_MARKET) || '[]');
      list.innerHTML = '';
      if(data.length===0){ list.innerHTML = '<p class="small">No hay ofertas todavía.</p>'; return; }
      data.forEach(o => {
        const div = document.createElement('div');
        div.className = 'offer-card mt-1';
        div.innerHTML = `<h4>${escapeHTML(o.title)}</h4>
          <div class="small badge">${escapeHTML(o.price || '—')} €/h</div>
          <p>${escapeHTML(o.desc)}</p>`;
        list.appendChild(div);
      });
    }
    refreshOffers();
    q('#offer-form').addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const title = fd.get('title').trim();
      const desc = fd.get('desc').trim();
      if(!title || !desc){ alert('Título y descripción son obligatorios'); return; }
      const offers = JSON.parse(localStorage.getItem(STORAGE_MARKET) || '[]');
      offers.unshift({id:Date.now().toString(), title, desc, price:fd.get('price')});
      localStorage.setItem(STORAGE_MARKET, JSON.stringify(offers));
      e.target.reset();
      refreshOffers();
    });
  }

})();