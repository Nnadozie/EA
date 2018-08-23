//EAs involve gene pool, cross over, mutation, and termination
//create gene pool
//check for fittest
//cross over and mutate
//terminate when a fitness criteria is reached

//Goal, evolve strings which spell out my name
//var goal = "Nnadozie Ekenechukwu Okeke" //fitness 3.5384615384615383


//Creating a gene pool
var pool = [
    " ik0002495n 02945 024525 0",
    "02985289 0-295 2- 90252905",
    "9ag890952390595959m9824099",
    "6\\\"89898**%DZGGSh#77^**(%(",
    "23452354q2544452452567^£&3",
    "£%a&*$%GDH&^*$*$JFH^&DGH&&",
    "%^£DFGHU^%&FJTY^&$GT $^$^h",
]


//create fitness function
//length is same as my full name
//sum of first two, then 
var omni = "The cat AtE the WILd Weste"
function checkFitness(gene) {
    //var fittest = "Nnadozie Ekenechukwu Okeke"
    var fittest = omni
    var sum = 0

    for(let i = 0; i < gene.length; i++) {

            if(fittest[i] != gene[i]) {
                sum+=1
            }
    }
    return sum
}

////console.log(checkFitness("Nnadozie Ekenechukwu Okeke"))


//check for fittest
function chooseFittest(poo) {
    ////console.log("got here 2")
    var rank = []
    var rankOb = {}
    var calc = 0
    for(let i of poo) {
        calc = checkFitness(i)
        if(calc < 0){calc = calc * -1}
        rank.push(calc)
        //console.log(rank)
        rankOb[calc] = i
        //console.log(rankOb)
        /*if(calc == 0){
            ////console.log("got here 3")
            stop = 1            
            rank.sort((a, b)=>(a > b))
            ////console.log(rankOb)
            return([rankOb[rank[0]], rankOb[rank[1]], rankOb[rank[2]], rankOb[rank[3]]])

        }*/
    }
    rank.sort((a, b)=>(a > b))
    //console.log(rankOb)
   //console.log(` fittest: ${[rankOb[rank[0]], rankOb[rank[1]], rankOb[rank[2]], rankOb[rank[3]]]}`)
    return([rankOb[rank[0]], rankOb[rank[1]], rankOb[rank[2]], rankOb[rank[3]]])
}

////console.log(chooseFittest(pool))

//cross over
function randSlice(gene1, gene2) {
    //var bin = Math.random() * (2 - 0)
    var cut = Math.random() * (gene1.length - 1)
    var off1 = gene1.slice(0,cut)
    var off2 = gene2.slice(cut, gene2.length)
    return (off1+off2)
    
}

//for each fittest
function breed(fittest) {
    //var offSpring = []
    var mate = []
    
        for(let k = 0; k < 10; k++){

            mate.push(randSlice(fittest[0],fittest[1]))
            mate.push(randSlice(fittest[0],fittest[2]))
            mate.push(randSlice(fittest[0],fittest[3]))
            mate.push(randSlice(fittest[1],fittest[2]))
            mate.push(randSlice(fittest[1],fittest[3]))
            mate.push(randSlice(fittest[2],fittest[3]))
            mate.push(randSlice(fittest[1],fittest[0]))
            mate.push(randSlice(fittest[2],fittest[0]))
            mate.push(randSlice(fittest[3],fittest[0]))
            mate.push(randSlice(fittest[2],fittest[1]))
            mate.push(randSlice(fittest[3],fittest[1]))
            mate.push(randSlice(fittest[3],fittest[2]))
    }

    return mate
}

function mutate(offSpring) {
    //console.log(offSpring)
    var mut, mut1 = 0

    for(let i = 0; i < offSpring.length; i++){
        sool = 'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        sool = sool.split('')
        mut = Math.random() * (offSpring[i].length - 1)
        out = Math.random() * (sool.length - 1)
        mut = Math.round(mut)
        out = Math.round(out)
        ////console.log(`os len: ${offSpring[i].length}`)
        ////console.log(mut) 
        mut1 = Math.random() * (offSpring[i].length - 1)
        out2 = Math.random() * (sool.length - 1)
        mut1 = Math.round(mut1)
        out2 = Math.round(out2)
        ////console.log(`os len 2: ${offSpring[i].length}`)
        ////console.log(mut1)
        ////console.log(offSpring[i][mut])
        offSpring[i] = offSpring[i].split('')
        //console.log(offSpring[i])
        //console.log(`${mut} ${mut1}`)
        //console.log(offSpring[i][mut])
        offSpring[i][mut] = sool[out]
        //offSpring[i][mut1] = sool[out2]        
        //console.log(offSpring[i].toString())
        offSpring[i] = offSpring[i].join('')
        //console.log(offSpring[i])

        //String.fromCharCode(s.charCodeAt() + 1)
        
    }
    //console.log(offSpring)    
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
        ////console.log('Lyric saved!');
    });
}

var stop = 0
var j = 0
while(stop == 0) {
    //console.log(j)
    //console.log(`start${pool}`)
    //console.log(pool)    
    var fittest = chooseFittest(pool)
    var copy = fittest.map((n)=>{return n})

    for(let i of fittest) {
        //console.log(j+": " + i)
       writeTf(j+": " + i)
    }

    if (fittest[0] == omni) {
        //writeTf(j+": " + fittest[0])
        console.log("FIT!")        
        stop = 1
    }

    //console.log(pool)
    childs = breed(fittest)
    ////console.log(pool)
    childs = mutate(fittest)

    pool = copy.concat(childs)
    //console.log(pool)
    j++
    if(j==100000){break;}
}
console.log("got here 4")

/*for(let j = 0; j < 3000; j++) {
    pool = chooseFittest(pool)
    pool = breed(pool)
    pool = mutate(pool)
    for(let i of pool) {
        writeTf(j+": " + i)
    }
}*/


/*pool = chooseFittest(pool)
pool = breed(pool)
//console.log(pool)
pool = mutate(pool)
//console.log(pool)
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
////console.log(pool)
gen++
}
//console.log(stop)

**/