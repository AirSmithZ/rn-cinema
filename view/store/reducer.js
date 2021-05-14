const reducer = (preState,action)=>{
    let {type,payload} = action
    // return preState
    switch (type) {
        case 'text':
            console.log(payload,'payload')
            return {
                ...preState,
                text:payload
            }
    
        case 'syncList':
            return {
                ...preState,
                list:payload
            }
        case 'detailTitle':
            return {
                ...preState,
                title:payload
            }
    }
}
export default reducer