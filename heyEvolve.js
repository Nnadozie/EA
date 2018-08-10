//EAs involve gene pool, cross over, mutation, and termination
//create gene pool
//check for fittest
//cross over and mutate
//terminate when a fitness criteria is reached

//Goal, evolve strings which spell out my name
//var goal = "Nnadozie Ekenechukwu Okeke" //fitness 3.5384615384615383


//Creating a gene pool
var pool = [
    "(&\"^£(&())BB&(D&(&&(V)))",
    "LCCOIUV(**YHS IYS(&S(VPV",
    ";;;;kjjj4444789/*6",
    "kjvvv8u99a[]'#'/'[[#''[[#####'///';[[]][[[p[]]'#//'",
    "jaf0ajfaafaft8aa5((£*££*^£(£*£(£*£",
    "kjj v8bba ad0f9a a0dfaub0",
    "Nnadozie Ekenechukwu Okeke"
]

//create fitness function
//length is same as my full name
//sum of first two, then 
function checkFitness(gene) {
    var count = 0
    var sum = 0
    var num = 0
    for(let i of gene){
        num = i.charCodeAt(0)
        if(count%2 == 0){
            num = -num
        }
        sum += num
        count++
    }
    return (sum/26)
}

//check for fittest
function chooseFittest(poo) {
    var rank = []
    var rankOb = {}
    var calc
    for(let i of poo) {
        calc = checkFitness(i) - 3.5384615384615383
        if(calc < 0){calc = calc * -1}
        rank.push(calc)
        rankOb[calc] = i
        if(calc == 0){
            stop = 1
        }
    }
    rank.sort((a, b)=>(a > b))
    //console.log(rankOb)
    return([rankOb[rank[0]], rankOb[rank[1]], rankOb[rank[2]], rankOb[rank[4]]])
}

//console.log(chooseFittest(pool))

//cross over
function randSlice(gene) {
    var bin = Math.random() * (2 - 0)
    var cut = Math.random() * (gene.length+1 - 0)
    if(bin == 0) {
        return gene.slice(0,cut)
    }else{
        return gene.slice(cut, gene.length+1)
    }
}

//for each fittest
function breed(fittest) {
    var offSpring = []
    var mate = []
    
        for(let k = 0; k < 10; k++){
            mate = []
            for(let i of fittest) {
                mate.push(randSlice(i))
            }
            //console.log(mate)
            offSpring.push(mate[0]+mate[1])
            offSpring.push(mate[0]+mate[2])
            offSpring.push(mate[1]+mate[2])
    }

    return offSpring
}

function mutate(offSpring) {
    var mut, mut1 = 0
    for(let i = 0; i < offSpring.length; i++){
        mut = Math.random() * (offSpring[i].length+1 - 0)
        mut1 = Math.random() * (offSpring[i].length+1 - 0)

        offSpring[i] = (offSpring[i].toString()).replace((offSpring[i].toString()).charAt(mut), String.fromCharCode(mut + 1))
        offSpring[i] = (offSpring[i].toString()).replace((offSpring[i].toString()).charAt(mut1), String.fromCharCode(mut1 - 1))
        
    }
    return offSpring
}


//---randomly slice all fittest
//choose between 0 and 1
//if 0 slice until random number between 0 and length
//if 1 slice from random number until length

//combine in all possible ways
//var offS = []
var fs = require('fs')

function writeTf(test) {
    fs.appendFile('log.txt', test+"\n", (err) => {  
        // throws an error, you could also catch it here
        if (err) throw err;
        
        // success case, the file was saved
        //console.log('Lyric saved!');
    });
}


for(let j = 0; j < 3000; j++) {
    pool = chooseFittest(pool)
    for(let i of pool) {
        writeTf(j+": " + i)
    }
    pool = breed(pool)
    for(let i of pool) {
        writeTf(j+": " + i)
    }
}

/*
var stop = 0
var gen = 1
while(stop == 0){
    pool = chooseFittest(pool)
    //logger.write(pool.toString())
    pool = breed(pool)
    for(let i of pool) {
        //setTimeout(, 3000)
        setTimeout(function() {
            writeTf(gen + ": " + i)
        }, 3000)      
    }

//writeTf(pool.toString())
//pool = mutate(pool)
//console.log(pool)
gen++
}
console.log(stop)

*/