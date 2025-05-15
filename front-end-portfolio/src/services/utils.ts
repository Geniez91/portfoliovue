export function getDaysofDate(date:Date){
    return new Date(date).getFullYear()
}

export function emptyRules(value:string):any{
    if(value.length>0)return true
    return `Le champ n'est pas complété`
}

export function formatDateToMonthYear(datestr:Date):string{
const date=new Date(datestr)
return date.toLocaleDateString('fr-FR',{year:'numeric',month:'long'}).toUpperCase()
}

export function calculateDifferenceBetweenTwoDates(date1: string | Date, date2: string | Date): string  {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d1.getTime() - d2.getTime());
    const totalMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.4375)); 
    const years = Math.floor(totalMonths / 12);

    if(years < 1){
        return `(${totalMonths} mois)`
    }
    return `(${years} ans)`
  }
  