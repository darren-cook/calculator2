(()=>{"use strict";const t={add:(t,n)=>t+n,sub:(t,n)=>t-n,mul:(t,n)=>t*n,div:(t,n)=>t/n,power:(t,n)=>Math.pow(t,n),sqrt:t=>Math.sqrt(t)};function n(t){let n="",e="";if(-1==t.indexOf("."))n=t.length;else{const o=t.split(".");n=o[0].length,e=o[1].length}if(n>9||t.includes("e")&&e>5)return Number(t).toExponential(5).toString();if(n+e>9){const e=11-n;return parseFloat(Number(t).toFixed(e).toString())}return t}const e=document.getElementById("history-button"),o=document.getElementById("history-list"),u=document.querySelectorAll(".number-button"),i=document.querySelectorAll(".operator-button"),r=document.querySelector(".allclear-button"),s=document.querySelector(".back-button"),m=document.querySelector(".decimal-button"),a=document.querySelector(".equal-button"),c=document.querySelector(".plusminus-button"),l=document.getElementById("main-operation"),d=document.getElementById("main-answer"),x={num1:"",operation:"",num2:"",ans:""};function C(){const t=document.createElement("div");t.classList.add("history-item");const n=document.createElement("div");n.classList.add("spacer");const e=document.createElement("div");e.classList.add("history-operation"),e.textContent=l.textContent;const u=document.createElement("div");u.classList.add("history-answer"),u.textContent=d.textContent,u.addEventListener("click",(()=>{x.ans||!x.num1?(x.num1=u.textContent,l.textContent=x.num1,d.textContent="",x.num2="",x.operation="",x.ans="",o.classList.toggle("history-list-closed"),o.classList.toggle("history-list-open")):x.operation&&!x.num2&&(x.num2=u.textContent,l.textContent+=x.num2,o.classList.toggle("history-list-closed"),o.classList.toggle("history-list-open"))})),t.appendChild(n),t.appendChild(e),t.appendChild(u),o.prepend(t)}e.addEventListener("click",(()=>{o.classList.toggle("history-list-closed"),o.classList.toggle("history-list-open")})),u.forEach((t=>{t.addEventListener("click",(()=>{const n=t.textContent;if(x.ans)return x.num1="",x.operation="",x.num2="",x.ans="",l.textContent="",void(d.textContent="");if(x.operation){if(x.num2.replace(".","").length>=9)return;x.num2+=n,l.textContent+=n}else{if(x.num1.replace(".","").length>=9)return;x.num1+=n,l.textContent+=n}}))})),m.addEventListener("click",(()=>{if(x.ans&&-1==x.ans.indexOf("."))return x.num1=`${x.ans}.`,x.operation="",x.num2="",x.ans="",l.textContent=x.num1,void(d.textContent="");if(!x.ans)if(x.operation){if(x.num2.length>=9)return;if(x.num2||(x.num2+="0",l.textContent+="0"),-1!=x.num2.indexOf("."))return;x.num2+=".",l.textContent+="."}else{if(-1!=x.num1.indexOf("."))return;if(x.num1.length>=9)return;x.num1||(x.num1+="0",l.textContent+="0"),x.num1+=".",l.textContent+="."}})),i.forEach((e=>{e.addEventListener("click",(()=>{const o=e.dataset.operator,u=e.textContent;if(x.num1){if(x.ans&&"sqrt"!=o)return x.num1=x.ans,x.operation=o,x.num2="",x.ans="",l.textContent=`${x.num1} ${u} `,void(d.textContent="");if(!x.operation||!x.num2||"sqrt"==o){if("sqrt"===o){if(x.ans){"."===x.num1.charAt(x.num1.length-1)&&(x.num1+="0",l.textContent+="0"),x.num1=x.ans,x.operation=o,x.num2="1";const e=n(t[x.operation](Number(x.num1),Number(x.num2)).toString());return x.ans=e,l.textContent=`${u} ${x.num1}`,d.textContent=e,void C()}{"."===x.num1.charAt(x.num1.length-1)&&(x.num1+="0",l.textContent+="0"),x.operation=o,x.num2="1";const e=n(t[x.operation](Number(x.num1),Number(x.num2)).toString());return x.ans=e,l.textContent=`${u} ${x.num1}`,d.textContent=e,void C()}}x.operation?(x.operation=o,l.textContent=l.textContent.slice(0,-3),l.textContent+=` ${u} `):("."===x.num1.charAt(x.num1.length-1)&&(x.num1+="0",l.textContent+="0"),x.operation=o,l.textContent+=` ${u} `)}}}))})),r.addEventListener("click",(()=>{x.num1="",x.operation="",x.num2="",x.ans="",l.textContent="",d.textContent=""})),s.addEventListener("click",(()=>x.ans?(x.num1=x.ans.slice(0,-1),x.operation="",x.num2="",x.ans="",l.textContent=x.num1,void(d.textContent="")):x.operation&&!x.num2?(x.operation="",void(l.textContent=x.num1)):void(x.operation?(x.num2=x.num2.slice(0,-1),l.textContent=l.textContent.slice(0,-1)):(x.num1=x.num1.slice(0,-1),l.textContent=l.textContent.slice(0,-1))))),c.addEventListener("click",(()=>{if(x.ans)return x.num1=(-1*x.ans).toString(),x.operation="",x.num2="",x.ans="",l.textContent=x.num1,void(d.textContent="");if(x.num1&&!x.num2&&!x.operation)return x.num1=(-1*x.num1).toString(),void(l.textContent=x.num1);if(x.num2){const t=l.textContent.split(" ");x.num2=(-1*x.num2).toString(),l.textContent=`${t[0]} ${t[1]} ${x.num2}`}})),a.addEventListener("click",(()=>{if(!x.num1||!x.operation||!x.num2)return;"."===x.num2.charAt(x.num2.length-1)&&(x.num2+="0",l.textContent+="0");const e=n(t[x.operation](Number(x.num1),Number(x.num2)).toString());x.ans=e,l.textContent+="  =",d.textContent=e,C()}))})();