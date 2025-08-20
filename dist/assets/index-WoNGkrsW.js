import{a as L,b as z,u as T,r as t,j as e,F as A,c as M,e as N,d as s,f as q,l as w}from"./index-d8kVQcWg.js";const I=s.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-color: #f5f5f5;
`,B=s.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`,D=s.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`,G=s.form`
  display: flex;
  flex-direction: column;
`,l=s.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  background: #f9f9f9;

  svg {
    margin-right: 0.5rem;
    color: #888;
  }
`,d=s.input`
  border: none;
  outline: none;
  flex: 1;
  background: transparent;
  font-size: 1rem;
`,J=s.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`,P=s.p`
  text-align: center;
  margin-top: 1rem;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`,U=()=>e.jsx("div",{style:{textAlign:"center",color:"#28a745"},children:"Registro realizado com sucesso! Redirecionando..."}),V=()=>e.jsxs("div",{style:{textAlign:"center",color:"#28a745",marginTop:"1rem"},children:[e.jsx("h3",{children:"Login realizado com sucesso!"}),e.jsx("p",{children:"Você será redirecionado para a página inicial."})]}),H=()=>{const n=L(),u=z(),g=T(),[o,m]=t.useState(!1),[i,p]=t.useState(""),[c,x]=t.useState(""),[f,h]=t.useState(""),[b,j]=t.useState(!1),[v,S]=t.useState(""),[k,C]=t.useState(!1),[F,y]=t.useState(!1);t.useEffect(()=>{n.state&&n.state.isRegister!==void 0&&m(n.state.isRegister)},[n.state]);const R=()=>{m(!o)},E=async r=>{r.preventDefault(),j(!0),S("");try{if(o){await q({name:f,email:i,password:c}),h(""),p(""),x(""),C(!0);const a=await w({email:i,password:c});g.login(a.token),y(!0),setTimeout(()=>{u("/")},3e3)}else{const a=await w({email:i,password:c});g.login(a.token),y(!0),setTimeout(()=>{u("/")},3e3)}}catch(a){S(a.message||"Erro ao processar a solicitação.")}finally{j(!1)}};return e.jsx(I,{children:e.jsx(B,{children:k?e.jsx(U,{}):F?e.jsx(V,{}):e.jsxs(e.Fragment,{children:[e.jsx(D,{children:o?"Registrar":"Login"}),e.jsxs(G,{onSubmit:E,children:[o&&e.jsxs(l,{children:[e.jsx(A,{}),e.jsx(d,{type:"text",placeholder:"Nome",value:f,onChange:r=>h(r.target.value),required:!0})]}),e.jsxs(l,{children:[e.jsx(M,{}),e.jsx(d,{type:"email",placeholder:"Email",value:i,onChange:r=>p(r.target.value),required:!0})]}),e.jsxs(l,{children:[e.jsx(N,{}),e.jsx(d,{type:"password",placeholder:"Senha",value:c,onChange:r=>x(r.target.value),required:!0})]}),v&&e.jsx("p",{style:{color:"red",textAlign:"center"},children:v}),e.jsx(J,{type:"submit",disabled:b,children:b?"Carregando...":o?"Registrar":"Login"})]}),e.jsx(P,{onClick:R,children:o?"Já possui uma conta? Fazer login":"Não possui uma conta? Criar conta"})]})})})};export{H as default};
