import { Router } from "express";

const router = Router();

router.get("/vf", (req, res) => {
  let questao = "O Counter-Strike começou como um mod do Half-Life.";
  let opcoes = ["Verdadeiro", "Falso"];
  let imagem = "/images/half-life-logo.jpg";
  res.render("questao_vf", {
    question: questao,
    options: opcoes,
    image: imagem,
  });
});

router.get("/espacos", (req, res) => {
  let questao = "Quantos espaços existem entre as palavras desta frase?";
  let frase = "Esta frase tem 7 espaços.";
  res.render("questao_espacos", {
    question: questao,
    sentence: frase,
  });
});

export default router;
