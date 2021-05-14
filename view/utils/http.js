export default class HTTP{
    fetchGet (options){
        return fetch(options.url)
        .then((res)=>res.json())
        .then((resJson)=>{
            options.success(resJson)
        })
        .catch((err)=>{
            options.error(err)
        })
    }
}