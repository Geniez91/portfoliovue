export function emailRules(value:string):any {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value)||'Veuillez entrer une adresse mail valide !';
}

export function emptyRules(value:string):any{
    if(value.length>0)return true
    return `Le champ n'est pas complété`
}

