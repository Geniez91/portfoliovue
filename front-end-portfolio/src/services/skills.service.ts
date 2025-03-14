import type { TSkills, TSkillsLanguage } from '@/interfaces/interfaces';
import axios from 'axios'
import { addHeaders } from './connexion.service';

const urlSkills='http://localhost:4000/skills'



export async function addSkills(language:string,yearsExperience:number,usageExperience:Date,srcImg:File,type:TSkills,token:string){
try{
    console.log(usageExperience)
    console.log(type)


    const formData = new FormData();
formData.append('file', srcImg);
formData.append('idType', type);
formData.append('language', language);
formData.append('usageExperience', usageExperience.toISOString());
formData.append('yearsExperience', yearsExperience.toString());

console.log(formData.get('file'))
console.log(formData.get('type'))


    const result = await axios.post(urlSkills,formData,{headers:addHeaders(token)})
    return result
}
catch(error){
    console.error(`Erreur lors de l'ajout de compétence:`, error);
    throw error;
}
}