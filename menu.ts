import leia = require("readline-sync");
import { colors } from './src/util/Colors';
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { ContaController } from "./src/controller/ContaController";
import { readlinkSync } from "fs";

export function main() {

    let contas: ContaController = new ContaController();
    let opcao, numero, agencia, tipo, limite, aniversario, valor, numeroDestino: number;
    let saldo: number;
    let titular: string;
    let continua: boolean = true;
    const tiposContas = [ 'Conta Corrente', 'Conta Poupanca'];

    console.log(colors.bg.black, colors.fg.blue)
    const contacorrente: ContaCorrente = new ContaCorrente(2, 123, 1, "Thiago", 20000, 2000);
    contacorrente.visualizar();
    contacorrente.sacar(3000);
    contacorrente.visualizar();
    contacorrente.depositar(1050);
    contacorrente.visualizar();
    console.log("    ",colors.reset);

    const contapoupanca: ContaPoupanca = new ContaPoupanca(3, 123, 2, "Indio", 55000, 10);
    contapoupanca.visualizar();
    contapoupanca.sacar(200);
    contapoupanca.visualizar();
    contapoupanca.depositar(1000);
    contapoupanca.visualizar();

    while (continua) {

     
        console.log(colors.bg.black, colors.fg.yellow,
            "*****************************************************");
        console.log("                                                     ");
        console.log("                BANCO DO BRAZIL COM Z                ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            9 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ",
            colors.reset
        );

        opcao = leia.questionInt("Entre com a opcao desejada: ");

        if (opcao == 9) {
            console.log(colors.fg.greenstrong,
                "\nBanco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.redstrong, "\n\nCriar Conta\n\n", colors.reset);

                console.log("Digite o numero da agencia: ");
                agencia = leia.questionInt("");

                console.log("Digite o nome do titular da conta: ");
                titular = leia.question("")

                console.log("Digite o tipo da conta: ");
                tipo = leia.keyInSelect(tiposContas, "", {cancel: false}) + 1;

                console.log("Digite o Saldo da conta (R$): ");
                saldo = leia.questionFloat("");

                switch (tipo) {
                    case 1:
                        console.log("Digite o limite da Conta (R$): ");
                        limite = leia.questionFloat("");
                        contas.cadastrar(
                            new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite)
                        );
                        break;
                    
                    case 2:
                        console.log("Digite o dia do aniversario da conta poupanca: ");
                        aniversario = leia.questionInt("");
                        contas.cadastrar(
                            new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario)
                        );
                        break;
                }
                break;

            case 2:
                console.log(colors.fg.redstrong, "\n\nListar todas as Contas\n\n", colors.reset);
                contas.listarTodas();

                break;
            
            case 3:
                console.log(colors.fg.whitestrong, "\n\nConsultar dados da Conta - por número\n\n", colors.reset);
                console.log("Digite o numero da conta: ");
                numero = leia.questionInt("");
                contas.procurarPorNumero(numero);
                
                break;
            case 4:
                console.log(colors.fg.whitestrong, "\n\nAtualizar dados da Conta\n\n", colors.reset);
                console.log("Digite o numero da conta: ");
                numero = leia.questionInt("");

                let conta = contas.buscarNoArray(numero);

                if (conta != null) {
                    console.log("Digite o numero da agencia: ");
                    agencia = leia.questionInt("");

                    console.log("Digite o nome do titular da conta: ");
                    titular = leia.question("");

                    tipo = conta.tipo;

                    console.log("\nDigite o saldo da conta (R$): ");
                    saldo = leia.questionFloat("");

                    switch(tipo) {
                        case 1:
                            console.log("\nDigite o saldo da conta (R$): ");
                            limite = leia.questionFloat("");
                            contas.atualizar(new ContaCorrente(numero, agencia, tipo, titular, saldo, limite));
                            break;
                        case 2:
                            console.log("Digite o dia do aniversario da Conta Poupanca: ");
                            aniversario = leia.questionInt("");
                            contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario));
                            break;

                    }
                } else {
                    console.log(colors.fg.red, "\nA Conta numero: " + numero + " nao foi encontrada!", colors.reset);

                }
                
                break;
            case 5:
                console.log(colors.fg.whitestrong, "\n\nApagar uma Conta\n\n", colors.reset);
                console.log("Digite o numero da Conta: ");
                numero = leia.questionInt("");
                contas.deletar(numero);

                break;
            case 6:
                console.log(colors.fg.whitestrong, "\n\nSaque\n\n", colors.reset);
                console.log("Digite o numero da Conta: ");
                numero = leia.questionInt("");

                console.log("\nDigite o valor do Saque (R$): ");
                valor = leia.questionFloat("");
                contas.sacar(numero, valor);

                break;
            case 7:
                console.log(colors.fg.whitestrong, "\n\nDepósito\n\n", colors.reset);
                console.log("Digite o numero da Conta: ");
                numero = leia.questionInt("");

                console.log("\nDigite o valor do Deposito (R$): ");
                valor = leia.questionFloat("");
                contas.depositar(numero, valor);
           
                break;
            case 8:
                console.log(colors.fg.whitestrong, "\n\nTransferência entre Contas\n\n", colors.reset);
                console.log("Digite o numero da Conta de Origem: ");
                numero = leia.questionInt("");

                console.log("\nDigite o numero da Conta de Destino: ");
                numeroDestino = leia.questionFloat("");

                console.log("\nDigite o valor do Deposito (R$): ");
                valor = leia.questionFloat("");

                contas.transferir(numero, numeroDestino, valor);

                break;
            default:
                console.log("\nOpção Inválida!\n");

                break;
        }
    }

}


export function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: Ayron Paulo de Souza Sant Anna");
    console.log("Generation Brasil - ayronpaulo2r@gmail.com");
    console.log("https://github.com/Ayron0");
    console.log("*****************************************************");
}

main();