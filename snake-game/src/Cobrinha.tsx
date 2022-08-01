export interface ponto{
    ant: ponto,
    l:number,
    c:number,
}

export const Cobra = () => {
    let cobra : ponto[]
    let head : ponto
    let tail : ponto
    let size : number
    const andarCobra = (cobra : ponto[], direction : string, quadro:ponto[][]) => {
        //Ainda tem que verificar se sai do quadro ou não
        const lastL = quadro.length-1
        const lastC = quadro[0].length-1
        const head = cobra[0]
        const tail = cobra[cobra.length-1]
        let ponto : ponto = {
            ant: head,
            l: 0,
            c: 0,
        }
        switch (direction){
            case 'up':
                    if(head.l<=0){
                        ponto = {
                            ant: head,
                            l: lastL,
                            c: head.c,
                        }
                    }
                    else{
                        ponto = {
                            ant: head,
                            l: head.l - 1,
                            c: head.c,
                        }
                    }
                    break;
            case 'down':
                if(head.l>=lastL){
                    ponto = {
                        ant: head,
                        l: 0,
                        c: head.c,
                    }
                }
                else{
                    ponto = {
                        ant: head,
                        l: head.l + 1,
                        c: head.c,
                    }
                }
                    break;
            case 'left':
                if(head.c<=0){
                    ponto = {
                        ant: head,
                        l: head.l,
                        c: lastC,
                    }
                }
                else{
                    ponto = {
                        ant: head,
                        l: head.l,
                        c: head.c-1,
                    }
                }
                    break;
            case 'right':
                if(head.l>=lastC){
                    ponto = {
                        ant: head,
                        l: head.l,
                        c: 0,
                    }
                }
                else{
                    ponto = {
                        ant: head,
                        l: head.l + 1,
                        c: head.c,
                    }
                }
                    break;
        }
        cobra.push(ponto)
        cobra.splice(cobra.length-1)
        return cobra
    }

}
//   -------|
//          |
//          |----h
// Tabuleiro (Visual/html)
// Andar Cobra (cobra, direção){andaHead, andaTail}
// Input do Usuário
// GameOver (cobra, tabuleiro)
// ColocaComida()
// ComeComida()