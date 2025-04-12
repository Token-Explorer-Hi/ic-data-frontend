import{u as Z,r as o,d as N,j as e,i as m,a1 as n,M as z,C as E,G as x,k as H,t as b,N as M}from"./index-CeZ0tbR2.js";import{I as O,F as $,S as G,T as B}from"./index-Ca902Vf3.js";import{T as W}from"./TypographyLink-9WA1_1xo.js";import{T as y}from"./TransactionAddressLink-BO8Ju-cI.js";import{T as P,a as _,b as q,c as J,d as K,e as k,f as t,g as Q}from"./TableWrapper-C7G5NxaH.js";import{u as U}from"./useTransactions-BRof3kjw.js";import{t as V}from"./time-CULYZmTc.js";import"./TransactionTooltip-B0j2Et1-.js";const X=90*24*3600;function ie(){const h=Z(),[p,g]=o.useState(0),[d,u]=o.useState(0),[j,C]=o.useState([]),[I,A]=o.useState([]),{allTransactionTypes:v}=N(),[i,f]=o.useState(!0);o.useEffect(()=>{localStorage.getItem("hideZeroTransfer")&&f(localStorage.getItem("hideZeroTransfer")==="true");let s=Math.floor((window.innerHeight-400)/45);s<10&&(s=10),u(s),C([s,s*2,s*3,s*4])},[]);const[l,D]=o.useState({from:new Date(Date.now()-X*1e3),to:new Date(Date.now())}),{result:a,loading:F}=U({page:p,size:d,startTime:l.from?l.from.getTime().toString():null,endTime:l.to?l.to.getTime().toString():null,txTypes:I}),w=o.useMemo(()=>i?((a==null?void 0:a.list)??[]).filter(s=>{var c;return((c=s.token0Symbol)==null?void 0:c.toLowerCase())==="icp"?Number(s.token0Amount)>1e-4:!0}):(a==null?void 0:a.list)??[],[a,i]),T=(s,c)=>{g(c)},S=s=>{u(parseInt(s.target.value)),g(0)},R=o.useCallback(s=>{A(s)},[]),r=h.palette.mode==="dark"?h.colors.grey400:h.colors.grey600,L=()=>{const s=!i;f(s),localStorage.setItem("hideZeroTransfer",s?"true":"false")};return e.jsxs(m,{className:"wrap",sx:{padding:{xs:"var(--space-14)",sm:"var(--space-20)"},height:"100%",flex:1,display:"flex",flexDirection:"column"},children:[e.jsxs(m,{display:"flex",justifyContent:"space-between",mb:2,children:[e.jsx(n,{variant:"h4",sx:{display:"flex",alignItems:"center"},children:"Transactions"}),e.jsx(O,{callback:D})]}),e.jsx(z,{sx:{height:"100%",flex:1,display:"flex",flexDirection:"column",position:"relative"},children:F?e.jsx(m,{sx:{minHeight:"600px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(E,{})}):w.length?e.jsxs(e.Fragment,{children:[e.jsxs(x,{display:"flex",sx:{gap:"var(--space-4)",alignItems:{xs:"flex-start",md:"center"},flexDirection:{xs:"column",md:"row"}},children:[e.jsxs(x,{display:"flex",alignItems:"center",sx:{gap:"var(--space-4)",padding:{xs:"var(--space-16)",sm:"var(--space-20)"}},children:[e.jsx(H,{}),e.jsxs(n,{children:["More than ",Number((a==null?void 0:a.total)??0).toLocaleString()," transactions found"]})]}),e.jsxs(x,{display:"flex",alignItems:"center",marginLeft:"auto",children:[e.jsx($,{control:e.jsx(G,{onChange:L,checked:i,sx:{width:52}}),sx:{width:"auto",whiteSpace:"nowrap"},label:"Hide Zero Transfer"}),e.jsx(P,{rowsPerPageOptions:j,component:"div",count:(a==null?void 0:a.total)||0,page:p,onPageChange:T,rowsPerPage:d,onRowsPerPageChange:S,sx:{marginLeft:"auto",flexShrink:0,display:{xs:"none",md:"block"},opacity:(a==null?void 0:a.pages)>1?1:0,pointerEvents:(a==null?void 0:a.pages)>1?"auto":"none"},labelRowsPerPage:"Show:"})]})]}),e.jsx(_,{children:e.jsx(q,{children:e.jsxs(J,{children:[e.jsx(K,{children:e.jsxs(k,{children:[e.jsx(t,{children:e.jsx(n,{whiteSpace:"nowrap",sx:{color:r},children:"Timestamp"})}),e.jsx(t,{children:e.jsxs(x,{display:"flex",alignItems:"center",children:[e.jsx(n,{whiteSpace:"nowrap",sx:{color:r},children:"Type"}),e.jsx(B,{values:v,onFilter:R})]})}),e.jsx(t,{children:e.jsx(n,{whiteSpace:"nowrap",sx:{color:r},children:"Token0 Amount"})}),e.jsx(t,{children:e.jsx(n,{whiteSpace:"nowrap",sx:{color:r},children:"Token1 Amount"})}),e.jsx(t,{children:e.jsx(n,{whiteSpace:"nowrap",sx:{color:r},children:"From"})}),e.jsx(t,{children:e.jsx(n,{whiteSpace:"nowrap",sx:{color:r},children:"To"})}),e.jsx(t,{children:e.jsx(n,{whiteSpace:"nowrap",sx:{color:r},children:"Action"})})]})}),e.jsx(Q,{children:w.map(s=>e.jsxs(k,{children:[e.jsx(t,{children:e.jsx(n,{whiteSpace:"nowrap",children:V(s.token0TxTime)})}),e.jsx(t,{children:e.jsx(n,{whiteSpace:"nowrap",children:s.op})}),e.jsx(t,{children:e.jsx(n,{whiteSpace:"nowrap",children:s.token0Amount?`${b(s.token0Amount)} ${s.token0Symbol}`:"--"})}),e.jsx(t,{children:e.jsx(n,{whiteSpace:"nowrap",children:s.token1Amount?`${b(s.token1Amount)} ${s.token1Symbol}`:"--"})}),e.jsx(t,{children:e.jsx(y,{alias:s.fromAlias,owner:s.fromOwner??s.fromAccountId,sub:s.fromSubaccount})}),e.jsx(t,{children:e.jsx(y,{alias:s.toAlias,owner:s.toOwner??s.toAccountId,sub:s.toSubaccount})}),e.jsx(t,{children:e.jsx(W,{to:`/transactions/details/${s.id}`,children:"Details"})})]},s.id))})]})})}),e.jsx(P,{rowsPerPageOptions:j,component:"div",count:(a==null?void 0:a.total)||0,page:p,onPageChange:T,rowsPerPage:d,onRowsPerPageChange:S,sx:{marginLeft:"auto",flexShrink:0},labelRowsPerPage:"Show:"})]}):e.jsx(e.Fragment,{children:e.jsx(M,{})})})]})}export{ie as default};
