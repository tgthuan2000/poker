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

export const randomNumber = () => {
   return Math.round(Math.random() * 355 )
}

export const getDateTime = () => {
    const today = new Date();
    const formatDateTime = (element) => {
        return `0${element}`.slice(-2)
    }
    const hours = formatDateTime(today.getHours())
    const minute = formatDateTime(today.getMinutes())
    const second = formatDateTime(today.getSeconds())
    const date = formatDateTime(today.getDate())
    const month = formatDateTime(today.getMonth()+1)
    return hours + ":" + minute + ":" + second + " - " + date + '/' + month + '/' + today.getFullYear();
}