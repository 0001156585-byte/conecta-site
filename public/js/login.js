const form =
document.getElementById("loginForm");


form.addEventListener("submit", async(e)=>{


e.preventDefault();



const email =
document.getElementById("email").value;


const senha =
document.getElementById("senha").value;



const resposta =
await fetch(
"http://localhost:3000/api/auth/login",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
senha
})

});


const dados =
await resposta.json();



if(resposta.ok){


localStorage.setItem(
"token",
dados.token
);



window.location="dashboard.html";


}else{


document.getElementById("mensagem")
.innerHTML =
dados.message;


}



});