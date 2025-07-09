const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function playerRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`Rodada: ${round}`);

        // Sortear bloco
        let block = getRandomBlock();
        console.log(`Bloco sorteado: ${block}\n`);

        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade
        let totalTestSkill1 = 0; 
        let totalTestSkill2 = 0;
    }
}

function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
    }

    return result;
}

(async function main() {
    console.log(`Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

    await playerRaceEngine(player1, player2);
})();