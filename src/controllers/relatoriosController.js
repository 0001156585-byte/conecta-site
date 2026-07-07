const relatorios = require("../queries/relatoriosQueries");


exports.dashboard = async(req,res)=>{


    try{


        const desafios =
            await relatorios.totalDesafios();


        const equipes =
            await relatorios.totalEquipes();


        const projetos =
            await relatorios.totalProjetos();


        const media =
            await relatorios.mediaAvaliacoes();



        res.json({

            desafios,
            equipes,
            projetos,
            media

        });



    }catch(error){


        res.status(500).json({

            erro:error.message

        });


    }


};