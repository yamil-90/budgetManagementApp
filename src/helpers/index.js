export const formatAmount = amount => {
    return Number(amount).toLocaleString('en-US',
        {
            style: 'currency',
            currency: 'USD'
        })
}
export const generateRandomId = () => {
    const random = Math.random().toString(36).substring(2, 11)
    const date = Date.now().toString();
    return (date + random);
}

export const formatDate=( date)=>{
    const newDate = new Date(date)
    const options = {
        year:'numeric',
        month:'short',
        day:'2-digit'
    }
    return newDate.toLocaleDateString('es-ES', options)
}