
const token =
localStorage.getItem("token");


if(!token){

window.location="index.html";

}



let grafico =
document.getElementById(
"graficoProjetos"
);



new Chart(grafico,{

type:"bar",

data:{


labels:[
"Alunos",
"Empresas",
"Projetos",
"Desafios"
],


datasets:[{

label:"Quantidade",

data:[
120,
35,
18,
50
]


}]

}


});
