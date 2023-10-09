class Calculator{
    constructor(previousOperand,currentOperand){
        this.previousOperand = previousOperand
        this.currentOperand = currentOperand
        this.clear()
    }
    show(x){
        if (x == '.' && this.current.includes('.')) return

        if(x == 'e'){
            this.previousOperand.innerText = this.current.toString() + x.toString()
            this.currentOperand.innerText = 2.71
        }
        if(x=='π'){
            this.previousOperand.innerText = this.current.toString() + x.toString()
            this.currentOperand.innerText = 3.14
        }
        if(x == 'sin' || x == 'cos'|| x == 'tan' || x=='√' || x == '∛'){
            this.operation = x
            this.previous = this.current.toString() + x.toString()
        }
        else{
            this.current = this.current.toString() + x.toString()
        }
    }
    clear(){
        this.previous = ''
        this.current = ''
        this.operation = undefined
        this.previousOperand.innerText = ''
        this.currentOperand.innerText = ''
    }
    display(){
        this.currentOperand.innerText = this.current
        this.previousOperand.innerText = this.previous 
    }
    chooseOp(y){
        if(this.current === '')return
        if(this.previous !==''){
            this.calculate()
        }
        this.operation = y
        this.previous = this.current.toString() + y.toString()
        this.current = ''
    }
    calculate(){
        let cal=''
        let prev = parseFloat(this.previous)
        let curr = parseFloat(this.current)

        if(isNaN(prev || isNaN(curr))) return

        switch (this.operation) {
            case '+':
                cal = prev + curr
                break;
            case '-':
                cal = prev - curr
                break;
            case '/':
                cal = prev / curr
                break;
            case '*':
                cal = prev * curr
                break;
            case 'sin':
                cal = Math.sin(curr)
                break;
            case 'tan':
                console.log(curr);
                cal = Math.tan(curr)
                break;
            case 'cos':
                console.log(curr);
                cal = Math.cos(curr)
                break;
            case '√':
                cal = Math.round(curr ** 0.5)
                break
            case '∛':
                cal = Math.round(curr ** 0.33)
                break
            case '%':
                cal = prev%curr
                break;
            case '^':
                cal = prev ** curr
                break;
            case '!':
                cal = mul(prev)
            case '<':
                cal = prev<curr
                break
            case '>':
                cal = prev>curr
                break
            default:
                break;
        }
        this.current = cal
        this.operation = undefined
        this.previous = ''
    }
    remove(){
        this.current = this.current.toString().slice(0,-1)
    }
}

const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const clear = document.querySelector('.allClear')
const del = document.querySelector('.del')
const previousOperand = document.querySelector('.previous')
const currentOperand = document.querySelector('.current')
const equal = document.querySelector('.equal')
const trig = document.querySelectorAll('.trig')
const ans = document.querySelector('.ans')
const constant =document.querySelectorAll('.const')


const calculator = new Calculator(previousOperand,currentOperand)

Array.from(constant).forEach((c)=>{
    c.addEventListener('click',()=>{
        calculator.show(c.innerText)
    })
})

Array.from(numbers).forEach((number)=>{
    number.addEventListener('click',()=>{
        calculator.show(number.innerText)
        calculator.display()    
    })
})

Array.from(operations).forEach((operation)=>{
    operation.addEventListener('click',()=>{
        calculator.chooseOp(operation.innerText)
        calculator.display()
    })
})

clear.addEventListener('click',()=>{
    calculator.clear()
    calculator.display()
})

equal.addEventListener('click',()=>{
    calculator.calculate()
    calculator.display()
})


del.addEventListener('click',()=>{
    calculator.remove()
    calculator.display()
})

Array.from(trig).forEach((t)=>{
    t.addEventListener('click',()=>{
        calculator.show(t.innerText)
        calculator.display()
    })
})
function mul(x){
    if (x==0) return 1
    return x * mul(x-1)
}