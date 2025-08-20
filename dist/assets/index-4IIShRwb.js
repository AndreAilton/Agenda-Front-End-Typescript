import{r as i,j as e,d as r,L as P,u as ae}from"./index-DCs1BkpB.js";import{c as R,a as oe,b as B,g as G,d as ne,e as ie,f as se}from"./userServices-C9jvlJxW.js";const U=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 2rem 1rem;
`,ce=r.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`,de=r.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`,le=r.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }

  select {
    flex: 1;
    min-width: 0;
  }
`,me=r.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;

  button {
    flex: 1;
    min-width: 120px;

    @media (max-width: 480px) {
      flex: 1 1 100%;
    }
  }
`,ge=r.div``,ue=r.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,xe=r.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: ${({$done:c})=>c?"#d4edda":"#f9f9f9"};
  color: ${({$done:c})=>c?"#155724":"#333"};
  transition: background 0.3s;

  &:hover {
    background: ${({$done:c})=>c?"#c3e6cb":"#e9ecef"};
  }

  @media (min-width: 480px) {
    flex-direction: row;
    align-items: center;
  }
`,pe=r.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  word-break: break-word;
`,he=r.h3`
  margin: 0;
  font-size: 1.2rem;
  text-decoration: ${({$done:c})=>c?"line-through":"none"};
`,fe=r.p`
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: #666;
`,je=r.span`
  font-size: 0.8rem;
  color: #007bff;
`,be=r.span`
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.5rem;
`,l=r.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`,ye=r(l)`
  background: #dc3545;

  &:hover {
    background: #c82333;
  }
`,M=r.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`,A=r.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 480px) {
    padding: 1rem;
    max-width: 90%;
  }
`,O=r.h3`
  margin-bottom: 1rem;
  color: #333;
`,p=r.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`,j=r.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`,b=r.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`,Ce=r.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`,ve=r.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f9f9f9;
  color: #333;
  transition: background 0.3s;

  &:hover {
    background: #e9ecef;
  }
`,ke=()=>{const[c,T]=i.useState([]),[H,F]=i.useState(!0),[$,s]=i.useState(""),[V,y]=i.useState(!1),[J,C]=i.useState(!1),[g,v]=i.useState({tittle:"",description:"",category:""}),[m,h]=i.useState(null),[d,k]=i.useState({tittle:"",description:"",category:""}),[S,K]=i.useState(""),[q,Q]=i.useState("asc"),[D,X]=i.useState("all"),[z,Y]=i.useState([]),[x,w]=i.useState(""),[Z,E]=i.useState(!1),L=async()=>{const t=localStorage.getItem("token");if(!t){s("Usuário não autenticado."),F(!1);return}try{const o=(await G(t)).map(n=>({...n,done:n.done??!1}));T(o)}catch(a){s(a.message||"Erro ao carregar as tarefas.")}finally{F(!1)}},_=async t=>{const a=localStorage.getItem("token");if(!a)return s("Usuário não autenticado.");try{await ie(a,t);const o=await G(a);T(o)}catch(o){s(o.message||"Erro ao excluir a tarefa.")}},ee=async(t,a)=>{const o=localStorage.getItem("token");if(!o)return s("Usuário não autenticado.");try{await B(o,t,{done:!a}),T(n=>n.map(I=>I.id===t?{...I,done:!a}:I))}catch(n){s(n.message||"Erro ao atualizar o status da tarefa.")}},f=async()=>{const t=localStorage.getItem("token");if(!t)return s("Usuário não autenticado.");try{const a=await ne(t);Y(a)}catch(a){s(a.message||"Erro ao carregar as categorias.")}},te=async t=>{const a=localStorage.getItem("token");if(!a)return s("Usuário não autenticado.");try{await se(a,t),f()}catch(o){s(o.message||"Erro ao excluir a categoria.")}};i.useEffect(()=>{L()},[]);const re=c.filter(t=>{const a=S?t.category===S:!0,o=D==="all"?!0:D==="done"?t.done:!t.done;return a&&o}).sort((t,a)=>q==="asc"?new Date(t.createdAt).getTime()-new Date(a.createdAt).getTime():new Date(a.createdAt).getTime()-new Date(t.createdAt).getTime());return H?e.jsx(U,{children:"Carregando tarefas..."}):$?e.jsx(U,{children:$}):e.jsxs(U,{children:[e.jsxs(ce,{children:[e.jsx(de,{children:"Minha To-Do List"}),e.jsxs(le,{children:[e.jsxs(b,{value:S,onChange:t=>K(t.target.value),children:[e.jsx("option",{value:"",children:"Todas as Categorias"}),[...new Set(c.map(t=>t.category))].map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsxs(b,{value:D,onChange:t=>X(t.target.value),children:[e.jsx("option",{value:"all",children:"Todas"}),e.jsx("option",{value:"done",children:"Concluídas"}),e.jsx("option",{value:"inProgress",children:"Em Andamento"})]}),e.jsxs(b,{value:q,onChange:t=>Q(t.target.value),children:[e.jsx("option",{value:"asc",children:"Ordem Crescente"}),e.jsx("option",{value:"desc",children:"Ordem Decrescente"})]})]}),e.jsxs(me,{children:[e.jsx(l,{onClick:()=>{y(!0),f()},children:"Criar Nova Tarefa"}),e.jsx(l,{onClick:()=>{E(!0),f()},children:"Gerenciar Categorias"})]}),e.jsx(ge,{children:e.jsx(ue,{children:re.map(t=>e.jsxs(xe,{$done:!!t.done,onClick:()=>ee(t.id,t.done),onDoubleClick:()=>{h(t),C(!0)},children:[e.jsxs(pe,{children:[e.jsx(he,{$done:!!t.done,children:t.tittle}),e.jsx(fe,{children:t.description}),e.jsx(je,{children:t.category}),e.jsxs(be,{children:["Criado em:"," ",new Date(t.createdAt).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})]})]}),e.jsx("div",{children:e.jsx(l,{onClick:a=>{a.stopPropagation(),_(t.id)},children:"Excluir"})})]},t.id))})})]}),V&&e.jsx(M,{onClick:()=>y(!1),children:e.jsxs(A,{onClick:t=>t.stopPropagation(),children:[e.jsx(O,{children:"Criar Nova Tarefa"}),d.tittle&&e.jsx(j,{children:d.tittle}),e.jsx(p,{type:"text",placeholder:"Título",value:g.tittle,onChange:t=>v({...g,tittle:t.target.value})}),d.description&&e.jsx(j,{children:d.description}),e.jsx(p,{type:"text",placeholder:"Descrição",value:g.description,onChange:t=>v({...g,description:t.target.value})}),e.jsxs(b,{value:g.category,onChange:t=>v({...g,category:t.target.value}),children:[e.jsx("option",{value:"",children:"Selecione uma Categoria"}),z.map(t=>e.jsx("option",{value:t.category,children:t.category},t.id))]}),e.jsx(p,{type:"text",placeholder:"Ou digite uma nova categoria",value:x,onChange:t=>w(t.target.value)}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx(l,{onClick:async()=>{var a,o;const t=localStorage.getItem("token");if(!t)return s("Usuário não autenticado.");try{let n=g.category;x.trim()&&(await R(t,{category:x}),n=x,w(""),f()),await oe(t,{...g,category:n}),y(!1),v({tittle:"",description:"",category:""}),k({tittle:"",description:"",category:""}),L()}catch(n){k({...d,tittle:((o=(a=n.response)==null?void 0:a.data)==null?void 0:o.message)||"Erro ao criar a tarefa."})}},children:"Salvar"}),e.jsx(l,{onClick:()=>y(!1),children:"Cancelar"})]})]})}),J&&m&&e.jsx(M,{onClick:()=>C(!1),children:e.jsxs(A,{onClick:t=>t.stopPropagation(),children:[e.jsx(O,{children:"Editar Tarefa"}),d.tittle&&e.jsx(j,{children:d.tittle}),e.jsx(p,{type:"text",placeholder:"Título",value:m.tittle,onChange:t=>h({...m,tittle:t.target.value})}),d.description&&e.jsx(j,{children:d.description}),e.jsx(p,{type:"text",placeholder:"Descrição",value:m.description,onChange:t=>h({...m,description:t.target.value})}),d.category&&e.jsx(j,{children:d.category}),e.jsxs(b,{value:m.category,onChange:t=>h({...m,category:t.target.value}),children:[e.jsx("option",{value:"",children:"Selecione uma Categoria"}),z.map(t=>e.jsx("option",{value:t.category,children:t.category},t.id))]}),e.jsx(l,{onClick:async()=>{var a,o;const t=localStorage.getItem("token");if(!t)return s("Usuário não autenticado.");try{await B(t,m.id,m),L(),C(!1),h(null),k({tittle:"",description:"",category:""})}catch(n){k({...d,tittle:((o=(a=n.response)==null?void 0:a.data)==null?void 0:o.message)||"Erro ao alterar a tarefa."})}},children:"Salvar"}),e.jsx(l,{onClick:()=>C(!1),children:"Cancelar"})]})}),Z&&e.jsx(M,{onClick:()=>E(!1),children:e.jsxs(A,{onClick:t=>t.stopPropagation(),children:[e.jsx(O,{children:"Gerenciar Categorias"}),e.jsx(p,{type:"text",placeholder:"Nova Categoria",value:x,onChange:t=>w(t.target.value)}),e.jsx(l,{onClick:async()=>{var a,o;const t=localStorage.getItem("token");if(!t)return s("Usuário não autenticado.");try{await R(t,{category:x}),w(""),f()}catch(n){s(((o=(a=n.response)==null?void 0:a.data)==null?void 0:o.message)||"Erro ao criar a categoria.")}},children:"Adicionar"}),e.jsx(Ce,{children:z.map(t=>e.jsxs(ve,{children:[e.jsx("span",{children:t.category}),e.jsx(ye,{onClick:()=>te(t.id),children:"Excluir"})]},t.id))}),e.jsx(l,{onClick:()=>E(!1),children:"Fechar"})]})})]})},we=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 2rem;
  box-sizing: border-box; /* Garante que o padding seja incluído no tamanho total */
  overflow: hidden; /* Evita que o conteúdo ultrapasse os limites */
`,Te=r.header`
  text-align: center;
  margin-bottom: 2rem;
`,Se=r.h1`
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    font-size: 1.8rem; /* Reduz o tamanho da fonte em telas menores */
  }
`,De=r.p`
  font-size: 1.2rem;
  color: #555;
`,ze=r.section`
  margin: 2rem 0;
  text-align: center;
  max-width: 90%; /* Limita a largura máxima */
  width: 100%; /* Garante que ocupe 100% do espaço disponível */
  box-sizing: border-box;
`,N=r.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap; /* Permite que os itens quebrem linha */
  justify-content: center;
  gap: 1rem; /* Espaçamento entre os itens */
`,u=r.li`
  font-size: 1rem;
  color: #333;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px; /* Define uma largura mínima */
  max-width: 300px; /* Define uma largura máxima */
  flex: 1; /* Permite que os itens cresçam igualmente */

  &::before {
    content: "✔";
    color: #28a745;
    margin-right: 0.5rem;
  }
`,Ee=r.section`
  margin: 2rem 0;
  text-align: center;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 90%; /* Limita a largura máxima */
  width: 100%; /* Garante que ocupe 100% do espaço disponível */
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem; /* Reduz o padding em telas menores */
  }
`,Le=r.h2`
  font-size: 1.8rem;
  color: #007bff;
  margin-bottom: 1rem;
`,Ie=r.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;
`,Ue=r.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`,W=r.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem; /* Reduz o padding do botão */
    font-size: 0.9rem; /* Reduz o tamanho da fonte */
  }
`,Me=r.footer`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: #888;
`,Ae=()=>e.jsxs(we,{children:[e.jsxs(Te,{children:[e.jsx(Se,{children:"Bem-vindo à To-Do List"}),e.jsx(De,{children:"Organize suas tarefas de forma simples e eficiente!"})]}),e.jsxs(ze,{children:[e.jsx("h2",{children:"Recursos e Funcionalidades"}),e.jsxs(N,{children:[e.jsx(u,{children:"Criação de tarefas com título, descrição e categoria"}),e.jsx(u,{children:"Marcar tarefas como concluídas com um duplo clique"}),e.jsx(u,{children:"Filtrar tarefas por categoria, status e ordem"}),e.jsx(u,{children:"Gerenciamento de categorias personalizadas"}),e.jsx(u,{children:"Interface intuitiva e responsiva"})]}),e.jsx(W,{children:e.jsx(P,{to:"/Auth",style:{textDecoration:"none",color:"#fff"},state:{isRegister:!0},children:"Cadastrar-se"})})]}),e.jsxs(Ee,{children:[e.jsx(Le,{children:"Dashboard de Controle"}),e.jsx(Ie,{children:"Tenha uma visão completa do seu progresso com o nosso Dashboard:"}),e.jsxs(N,{children:[e.jsx(u,{children:"Visualize o total de tarefas criadas"}),e.jsx(u,{children:"Acompanhe as tarefas concluídas"}),e.jsx(u,{children:"Gerencie suas categorias personalizadas"})]}),e.jsx(Ue,{children:e.jsx(W,{children:e.jsx(P,{to:"/Auth",style:{textDecoration:"none",color:"#fff"},children:"Acessar Dashboard"})})})]}),e.jsx(Me,{children:e.jsx("p",{children:"© 2025 To-Do List. Todos os direitos reservados."})})]}),$e=()=>{const{isLoggedIn:c}=ae();return e.jsx(e.Fragment,{children:c?e.jsx(ke,{}):e.jsx(Ae,{})})};export{$e as default};
