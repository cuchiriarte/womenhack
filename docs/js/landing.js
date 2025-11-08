```javascript
(function(){
  const app = document.querySelector('#app');
  if(!app) return;
  app.innerHTML = `
    <section class="card hero">
      <div class="left">
        <h2>ReinsertaMamá</h2>
        <p class="small">Apoyando a madres andaluzas para volver al mundo laboral mediante formación STEAM y oportunidades freelance.</p>
        <div class="mt-1">
          <a href="escuela.html" class="btn">Ir a la Escuela</a>
          <a href="market.html" class="btn alt">Ir al Marketplace</a>
        </div>
      </div>
      <div class="right">
        <div style="width:100%;height:160px;border-radius:8px;background:linear-gradient(90deg,var(--purple),var(--blue));"></div>
      </div>
    </section>

    <section class="card">
      <h3>Objetivos</h3>
      <ul>
        <li>Cerrar la brecha laboral para madres en Andalucía.</li>
        <li>Ofrecer rutas STEAM accesibles y prácticas.</li>
        <li>Conectar talento con empresas locales mediante un marketplace.</li>
      </ul>
    </section>

    <section class="card">
      <h3>Quiénes somos</h3>
      <p>Proyecto demo orientado a facilitar la formación y la salida profesional de madres andaluzas. Inspirado en modelos de escuelas digitales y marketplaces para freelances.</p>
    </section>
  `;
})();
```