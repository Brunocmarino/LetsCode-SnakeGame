import { useEffect, useState } from "react"
import "./cobrinha.css"

export interface Ponto{
    l: number,
    c: number,
}

export interface Pixel{
 state: 'fruta' | 'branco' | 'head' | 'cobra'
}

export type Direction = 'right' | 'down' | 'up' | 'left'

export const Cobra = () => {

    const cobraInicio = [
        {
            l:3,
            c:3
        },
        {
            l:3,
            c:4
        },
        {
            l:3,
            c:5
        },
        {
            l:3,
            c:6
        },
        {
            l:3,
            c:7
        }    
    ]

    const matrix = Array(35).fill(Array(50).fill({state: 'branco'}));

    const [cobra, setCobra] = useState<Array<Ponto>>(cobraInicio)
    const [quadro, setQuadro] = useState<Array<Array<Pixel>>>(matrix)
    const [recarrega,setRecarrega] = useState(true)
    const [direction, setDirection] = useState<Direction>('right')
    const [comida, setComida] = useState<Ponto>({l: 25, c: 25})

    const andarCobra = (cobra : Ponto[], quadro:Pixel[][], direction ?: string) => {
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
                if(head.c>=lastC){
                    ponto = {
                        l: head.l,
                        c: 0,
                    }
                }
                else{
                    ponto = {
                        l: head.l,
                        c: head.c+1,
                    }
                }
                    break;
        }
        let newCobra = JSON.parse(JSON.stringify(cobra))
        newCobra.unshift(ponto)

        if(ponto.l != comida.l || ponto.c != comida.c) 
            newCobra.pop()
        else{geraComida()}
        setCobra(newCobra)
        return newCobra
    }

    const geraComida = (quadro:Pixel[][]) => {
        let linha : number
        let coluna : number
        let newQuadro : Pixel [][]
        let estaNaCobra : Ponto|undefined = undefined
        do{
            linha = Math.round(Math.random()*(34))
            coluna = Math.round(Math.random()*(49))
            estaNaCobra = cobra?.find((c)=>(c.l===linha && c.c===coluna))
        }while(estaNaCobra)
        setComida({l: linha, c: coluna})
    }

    const atualizaQuadro = () =>{
        let quadroAux: Pixel[][] = []                  
        for(let i=0;i<35;i++){
          let array :Pixel[] = []
          for(let j=0;j<50;j++){
            let item :Pixel = {
              state: 'branco'
             }
            array.push(item)
          }
          quadroAux.push(array)     
        }
        // let quadroAux = JSON.parse(JSON.stringify(quadro))s
        quadroAux[comida.l][comida.c].state = 'fruta'
        cobra?.forEach((p,idx) => {
            if(idx===0)
                quadroAux[p.l][p.c].state = 'head'
            else
                quadroAux[p.l][p.c].state = 'cobra'
        });

        setQuadro(quadroAux)
    }
    
    const apertaTecla = (event) => {
        event.preventDefault()
        if(event.key == 'a'){
            setDirection('left')
        }
        
        else if(event.key == 'w'){
            setDirection('up')
        }
        
        else if(event.key == 'd'){
            setDirection('right')
        }    
        
        else if(event.key == 's'){
            setDirection('down')
        }
    }  
    

    useEffect(()=>{
        atualizaQuadro()
        geraComida(quadro)
    },[])

    useEffect(()=>{
        setTimeout(()=>{
            if(quadro&&cobra){
                andarCobra(cobra,quadro,direction)
            }
            atualizaQuadro()
            setRecarrega(!recarrega)
        },50)
    },[recarrega])



    return (
        <>
      <div id="board" onKeyPress={(e) => apertaTecla(e)}>
        
        {quadro && (
         quadro.map((array) =>(
            array.map((pixel, id)=>(
                pixel.state==='branco' 
                ? <div className="pixelWhite" key={id}></div>
                : pixel.state==='cobra'
                    ? <div className="pixelBlack" key={id}></div>
                        :pixel.state==='head' 
                            ?<div className="pixelRed" key={id}></div>
                            :<div className="pixelRed" key={id}></div>
            ))
         )
        ))}
      </div>
      <input id='input' type="text" onKeyPress={(e) => apertaTecla(e)}/>
      </>
     )
}
