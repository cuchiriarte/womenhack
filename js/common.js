(function(){
  const KEY = 'credentials-demo';
  const existing = localStorage.getItem(KEY);
  if(!existing){
    const demo = {
      escuela: [
        {user:'escuela1@demo.local', pass:'Esc1Demo!', role:'escuela'},
        {user:'escuela2@demo.local', pass:'Esc2Demo!', role:'escuela'}
      ],
      aprendiz: [
        {user:'aprendiz1@demo.local', pass:'Apr1Demo!', role:'aprendiz'},
        {user:'aprendiz2@demo.local', pass:'Apr2Demo!', role:'aprendiz'}
      ],
      empresa: [
        {user:'empresa1@demo.local', pass:'Emp1Demo!', role:'empresa'},
        {user:'empresa2@demo.local', pass:'Emp2Demo!', role:'empresa'}
      ],
      freelancer: [
        {user:'freela1@demo.local', pass:'Fre1Demo!', role:'freelancer'},
        {user:'freela2@demo.local', pass:'Fre2Demo!', role:'freelancer'}
      ]
    };
    localStorage.setItem(KEY, JSON.stringify(demo));
    console.log('common.js: credenciales demo inicializadas en localStorage');
  } else {
    console.log('common.js: credenciales demo ya presentes');
  }

  // util
  window.RM = {
    KEY_CRED: KEY,
    escapeHTML: function(str){ return String(str||'').replace(/[&<>"']/g, s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[s]); },
    getCreds: function(){ try { return JSON.parse(localStorage.getItem(KEY)||'{}'); } catch { return {}; } },
    saveCreds: function(obj){ localStorage.setItem(KEY, JSON.stringify(obj)); }
  };
})();