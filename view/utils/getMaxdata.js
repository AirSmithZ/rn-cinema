export const getMaxdata=(a,b)=>{
    if(a<=0){
       return 0
    }
    if(a>=b){
        return b  
    }
    return a
}

export const distinctData = (arr,key)=>{
    let set = new Set()
    return arr.reduce((p,c)=> set.has(c[key]) ? p: (set.add(c[key]),[...p,c]),[])
}