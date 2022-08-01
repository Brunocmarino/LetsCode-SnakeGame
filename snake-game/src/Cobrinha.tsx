import { useEffect, useState } from "react"

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
    let [quadro, setQuadro] = useState([[]])

    const geraQuadro = (size:number) => {
        let quadro: = [[]]
        for(let i=0;i<size;i++){
            quadro.push([])
            for(let j=0;j<size;j++){
                quadro[i].push(0) 
            }
        }
    }

    const andarCobra = (cobra : ponto[], quadro:ponto[][], direction ?: string) => {
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
        if(!direction){
            if(head.ant.l > head.l)   direction = 'up';
            if(head.ant.l < head.l)   direction = 'down';
            if(head.ant.c > head.c)   direction = 'left';
            if(head.ant.c < head.c)   direction = 'rignt';
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
    useEffect
    return(
        <>
        </>
    )
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