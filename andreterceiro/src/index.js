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

async function logRollResult(characterName, blockAlias, diceResult, attribute) {
    console.log(`${characterName} rolou um dado de ${blockAlias} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playerRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log("\n===========================================");
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

        if (block == "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
            await logRollResult(player1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);            
            await logRollResult(player2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);            
       } else if (block == "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
            await logRollResult(player1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);            
            await logRollResult(player2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        } else {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
            console.log(`${character1.NOME} confrontou com ${character2.NOME}`);
            await logRollResult(player1.NOME, "poder", diceResult1, character1.PODER);            
            await logRollResult(player2.NOME, "poder", diceResult2, character2.PODER);            
        
            if (powerResult1 > powerResult2) {
                if (character2.PONTOS > 0) {
                    character2.PONTOS--;
                    console.log(`${character2.NOME} perdeu 1 ponto`);
                } else {
                    console.log(`${character2.NOME} não perdeu pontos pois estava com zero pontos`);
                }

            } else if (powerResult2 > powerResult1) {
                if (character1.PONTOS > 0) {
                    character1.PONTOS--;
                    console.log(`${character1.NOME} perdeu 1 ponto`);
                } else {
                    console.log(`${character1.NOME} não perdeu pontos pois estava com zero pontos`);
                }
            } else {
                console.log("Confronto empatado! Nenhum ponto foi perdido");
            }
        }

        // Verificando o vencedor

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou 1 ponto`);
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} marcou 1 ponto`);
            character2.PONTOS++;
        } else if (totalTestSkill1 > 0) { // Para evitar o caso de block == "CONFRONTO"
            console.log("Rodada empatada");
        }
    }
}

async function declareWinner(character1, character2) {
    console.log("\n\n*******************************************")
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)
    
    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns!`);
    } else if (character1.PONTOS < character2.PONTOS) {
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns!`);
    } else {
        console.log("A corrida terminou empatada")
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
    await declareWinner(player1, player2);
})();