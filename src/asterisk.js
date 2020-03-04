const util = require('util');
const cli = util.promisify(require('child_process').exec);


module.exports = {

    async calls(req, res) {
        // PEGANDO COMANDO DO LINUX DIRETO DO CLI
        const asterisk = await cli('asterisk -rx "core show channels concise"');
        let arrey = asterisk.stdout.toString().split("\n");
        let parseArrey = [];
        arrey.map((item, index) => {
            if (index < arrey.length - 1) {
                parseArrey.push(item)
            }

        });

        // console.log(Object.prototype.toString.call(a));
        // const cred = ["SIP/SIP_E1_VIVO_7510-0024f8d0!from-trunk!!1!Up!AppDial!(Outgoing Line)!1140205050!!!3!26!214004ee-0074-4c1e-a0c8-d3fdb58955d5!1581050433.13665457",
        //     "SIP/3499-0024f8cf!macro-dialout-trunk!s!24!Up!Dial!SIP/SIP_E1_VIVO_7510/0151140205050,300,RrLT!3125227510!!!3!27!214004ee-0074-4c1e-a0c8-d3fdb58955d5!1581050432.13665453",
        //     "SIP/SIP_E1_VIVO_7559-0014f5ce!from-trunk!!1!Up!AppDial!(Outgoing Line)!01599982356844!!!3!498!ab92969e-f4a9-407b-9a89-09983d5d1da3!1580500157.7738983",
        //     "SIP/5000-0000001a!billing!999500262!2!Up!Dial!SIP/Credflash_Celular_Local/999500262,30,TtrR!5000!Freddy!Freddy!3!758!13a7b95c-dfa5-4995-8800-61d53f0ae643!1580367515.26"];

        let voip = {};
        let calls = [];
        //FILTRANDO SOMENTE AS LINHAS DE LIGAÇAO DE SAIDA DOS RAMAIS.
        parseArrey.map((value, ix) => {
            if (value.match(/from-discadora/) || value.match(/macro-dialout-trunk/) || value.match(/billing/)) {
                calls.push(value.split('!'));
            }
        })
        // FIM DO FILTRO

        //MONTANDO O OBJETO VOIP{} PARA RESPOSTA DA API
        calls.map((v, i) => {
            calls[i].map((valor, index) => {
                if (index === 0) {
                    voip[`call${i}`] = {
                        origem: valor
                    }
                }
                if (index === 1) {
                    Object.assign(voip[`call${i}`], {
                        contexto: valor
                    })
                }
                if (index === 4) {
                    Object.assign(voip[`call${i}`], {
                        status: valor
                    })
                }
                if (index === 6) {
                    Object.assign(voip[`call${i}`], {
                        destino: valor
                    })
                }
                if (index === 11) {
                    Object.assign(voip[`call${i}`], {
                        duracao: valor
                    })
                }
                if (index === 13) {
                    Object.assign(voip[`call${i}`], {
                        uniqueid: valor
                    })
                }
            })
        })

        return res.json(voip);
        // return res.json({cli: await (await cli('uptime')).stdout});

    }

};