import { useEffect, useState } from "react"
import "./cobrinha.css"

export interface Ponto{
    l: number,
    c: number,
}

export interface Pixel{
 state: boolean
}

export const Cobra = () => {
    const [cobra, setCobra] = useState<Array<Ponto>>()
    const [quadro, setQuadro] = useState<Array<Array<Pixel>>>()
    const criaCobra = () => {
        let ponto: Ponto = {
            l:3,
            c:3
        }
    }

    const andarCobra = (cobra : Ponto[], quadro:Ponto[][], direction ?: string) => {
        //Ainda tem que verificar se sai do quadro ou não
        const lastL = quadro.length-1
        const lastC = quadro[0].length-1
        const head = cobra[0]
        const tail = cobra[cobra.length-1]
        let ponto : Ponto = {
            l: 0,
            c: 0,
        }
        if(!direction){
            if(head && head.l > head.l)   direction = 'up';
            if(head && head.l < head.l)   direction = 'down';
            if(head && head.c > head.c)   direction = 'left';
            if(head && head.c < head.c)   direction = 'rignt';
        }
        switch (direction){
            case 'up':
                    if(head.l<=0){
                        ponto = {
                            l: lastL,
                            c: head.c,
                        }
                    }
                    else{
                        ponto = {
                            l: head.l - 1,
                            c: head.c,
                        }
                    }
                    break;
            case 'down':
                if(head.l>=lastL){
                    ponto = {
                        l: 0,
                        c: head.c,
                    }
                }
                else{
                    ponto = {
                        l: head.l + 1,
                        c: head.c,
                    }
                }
                    break;
            case 'left':
                if(head.c<=0){
                    ponto = {
                        l: head.l,
                        c: lastC,
                    }
                }
                else{
                    ponto = {
                        l: head.l,
                        c: head.c-1,
                    }
                }
                    break;
            case 'right':
                if(head.l>=lastC){
                    ponto = {
                        l: head.l,
                        c: 0,
                    }
                }
                else{
                    ponto = {
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

    const atualizaQuadro = () =>{
        let quadroAux: Pixel[][] = []
        for(let i=0;i<35;i++){
          let array :Pixel[] = []
          for(let j=0;j<50;j++){
            let item :Pixel = {
              state:false
             }
            array.push(item)
          }
          quadroAux.push(array)     
        }
        cobra?.forEach(p => {
            quadroAux[p.l][p.c].state = true
        });
        setQuadro(quadroAux)
    }

    

    useEffect(()=>{
        atualizaQuadro()
    },[])

    useEffect(()=>{
        atualizaQuadro()
    },[cobra])


    const apertaTecla = (event) => {
        event.preventDefault()
        if(event.key == '13'){
            console.log('enter')
        }
        else if(event.key == 'a'){
            console.log('left')
        }
        
        else if(event.key == 'w'){
            console.log('up')
        }
        
        else if(event.key == 'd'){
            console.log('right')
        }    
        
        else if(event.key == 's'){
            console.log('down')
        }
    }  

    return (
        <>
      <div id="board" onKeyPress={(e) => apertaTecla(e)}>
        
        {quadro && (
         quadro.map((array) =>(
            array.map((pixel, id)=>(
                pixel.state===false 
                ? <div className="pixelWhite" key={id}></div>
                : <div className="pixelBlack" key={id}></div>
            ))
         )
        ))}
      </div>
      <input id='input' type="text" onKeyPress={(e) => apertaTecla(e)}/>
      </>
     )
}
