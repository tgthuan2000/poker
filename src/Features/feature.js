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