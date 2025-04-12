import{u as k,r as c,Z as C,j as e,i as v,C as D,G as h,k as R,T as o,B as j,f as F,N as I}from"./index-CeZ0tbR2.js";import{T as N}from"./TextualAddressLink-Kw8TJYPY.js";import{T as B}from"./TableSorter-ChxbmX19.js";import{T as w,a as A,b as H,c as L,d as E,e as P,f as t,g as z}from"./TableWrapper-C7G5NxaH.js";function Z({id:f,initPageSize:y=25}){var u;const n=k(),[l,x]=c.useState(0),[i,S]=c.useState(y),[d,g]=c.useState(!0),{result:a,loading:T}=C({tokenId:f,pageNum:l+1,pageSize:i,isDesc:d}),p=(s,r)=>{x(r)},m=s=>{S(parseInt(s.target.value)),x(0)},b=c.useCallback((s,r)=>{g(r==="default"||r==="desc")},[g]);return e.jsx(e.Fragment,{children:T?e.jsx(v,{sx:{minHeight:"600px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(D,{})}):a!=null&&a.list.length?e.jsxs(e.Fragment,{children:[e.jsxs(h,{display:"flex",sx:{padding:{xs:"var(--space-14)",sm:"0 var(--space-20) 0"},flexDirection:{xs:"column",sm:"row"}},children:[e.jsxs(h,{display:"flex",alignItems:"center",sx:{gap:"var(--space-4)"},children:[e.jsx(R,{}),e.jsxs(o,{children:["Total of ",Number(a==null?void 0:a.total).toLocaleString()," holders"]})]}),e.jsx(w,{component:"div",count:(a==null?void 0:a.total)||0,page:l,onPageChange:p,rowsPerPage:i,onRowsPerPageChange:m,sx:{marginLeft:"auto",flexShrink:0,display:{xs:"none",md:"block"},opacity:(a==null?void 0:a.pages)>1?1:0,pointerEvents:(a==null?void 0:a.pages)>1?"auto":"none"},labelRowsPerPage:"Show:"})]}),e.jsx(A,{children:e.jsx(e.Fragment,{children:e.jsx(H,{children:e.jsxs(L,{children:[e.jsx(E,{children:e.jsxs(P,{children:[e.jsx(t,{children:e.jsx(o,{whiteSpace:"nowrap",sx:{color:n.palette.mode==="dark"?n.colors.grey400:n.colors.grey600},children:"Rank"})}),e.jsx(t,{children:e.jsx(o,{whiteSpace:"nowrap",sx:{color:n.palette.mode==="dark"?n.colors.grey400:n.colors.grey600},children:"Address"})}),e.jsx(t,{children:e.jsx(B,{title:"Amount",onSorter:s=>b("amount",s),sort:d?"desc":"asc"})}),e.jsx(t,{children:e.jsx(o,{whiteSpace:"nowrap",sx:{color:n.palette.mode==="dark"?n.colors.grey400:n.colors.grey600},children:"Percentage"})}),e.jsx(t,{children:e.jsx(o,{whiteSpace:"nowrap",sx:{color:n.palette.mode==="dark"?n.colors.grey400:n.colors.grey600},children:"Value"})})]})}),e.jsx(z,{children:(u=a==null?void 0:a.list)==null?void 0:u.map((s,r)=>e.jsxs(P,{children:[e.jsx(t,{children:e.jsx(o,{children:l*i+r+1})}),e.jsx(t,{children:e.jsx(N,{alias:s.alias,owner:s.owner,account:s.accountId,subaccount:s.subaccount})}),e.jsx(t,{children:e.jsx(o,{children:new j(s.amount).toFormat(s.tokenDecimal)})}),e.jsx(t,{children:e.jsxs(o,{children:[new j(s.amount).dividedBy(s.totalSupply).multipliedBy(100).toFixed(2),"%"]})}),e.jsx(t,{children:e.jsx(o,{children:F(s.valueUSD)})})]},s.owner??s.accountId))})]})})})}),e.jsx(w,{component:"div",count:(a==null?void 0:a.total)||0,page:l,onPageChange:p,rowsPerPage:i,onRowsPerPageChange:m,sx:{marginLeft:"auto",flexShrink:0},labelRowsPerPage:"Show:"})]}):e.jsx(e.Fragment,{children:e.jsx(I,{})})})}export{Z as T};
