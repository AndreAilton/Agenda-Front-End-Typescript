import{r,j as e,d as t}from"./index-DCs1BkpB.js";import{h as C,g as k,d as w}from"./userServices-C9jvlJxW.js";const T="/agenda/assets/user-Ovi5nVIQ.png",n=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem;
`,v=t.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
`,E=t.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
`,U=t.h2`
  color: #333;
  margin-bottom: 0.5rem;
`,y=t.p`
  color: #555;
  font-size: 1rem;
`,P=t.p`
  color: red;
  font-size: 1rem;
  text-align: center;
`,D=t.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
`,S=t.h3`
  color: #333;
  margin-bottom: 1rem;
`,i=t.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;

  span {
    font-weight: bold;
    color: #007bff;
  }
`,N=()=>{const[o,m]=r.useState(null),[c,d]=r.useState(""),[g,h]=r.useState(0),[x,f]=r.useState(0),[u,p]=r.useState(0);return r.useEffect(()=>{(async()=>{const s=localStorage.getItem("token");if(!s){d("Usuário não autenticado.");return}try{const a=await C(s);m(a.user);const l=await k(s);h(l.length),f(l.filter(j=>j.done).length);const b=await w(s);p(b.length)}catch(a){d(a.message||"Erro ao carregar os dados do usuário.")}})()},[]),c?e.jsx(n,{children:e.jsx(P,{children:c})}):o?e.jsxs(n,{children:[e.jsxs(v,{children:[e.jsx(E,{src:T,alt:"Foto de Perfil"}),e.jsx(U,{children:o.name||"Nome não disponível"}),e.jsx(y,{children:o.email||"E-mail não disponível"})]}),e.jsxs(D,{children:[e.jsx(S,{children:"Informações"}),e.jsxs(i,{children:["Total de Tarefas: ",e.jsx("span",{children:g})]}),e.jsxs(i,{children:["Tarefas Concluídas: ",e.jsx("span",{children:x})]}),e.jsxs(i,{children:["Total de Categorias: ",e.jsx("span",{children:u})]})]})]}):e.jsx(n,{children:e.jsx("p",{children:"Carregando..."})})};export{N as default};
