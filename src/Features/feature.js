export const search = (arrayList, refValue, element) => {
    const check = arrayList.find(item => 
        item[element].toLowerCase() === refValue.current.value.toLowerCase().trim()
    )
    if(check !== undefined)
        return false
    else if(refValue.current.value.trim() === '')
        return false
    else
        return true
}

export const filter = (arrayList, refValue, element) => {
    return arrayList.filter(item =>
        item[element].toLowerCase().search(refValue.current.value.toLowerCase().trim()) !== -1
    )
}


export const randomString = (length = 5) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
   return result
}