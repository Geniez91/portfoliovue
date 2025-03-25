import type { ISkills, TSkills } from '@/interfaces/interfaces';
import axios from 'axios'
import { addHeaders } from './connexion.service';

const urlSkills='https://portfoliovue-back-end-production.up.railway.app/skills'

export async function addSkills(language:string,type:TSkills,srcImg:File,token:string,yearsExperience?:number,usageExperience?:Date,level?:string){
try{
const formData = new FormData();
formData.append('file', srcImg);
formData.append('idType', type);
formData.append('language', language);
if(usageExperience){
    formData.append('usageExperience', usageExperience.toISOString());
}

if(yearsExperience){
    formData.append('yearsExperience', yearsExperience.toString());
}

if(level){
    formData.append('level',level)
}
const result = await axios.post(urlSkills,formData,{headers:addHeaders(token)})
return result
}
catch(error){
    console.error(`Erreur lors de l'ajout de compétence:`, error);
    throw error;
}
}

export async function getAllSkills():Promise<ISkills[]>{
    try{
        const result=await axios.get(urlSkills)
        return result.data
    }
    catch(error){
        throw error
    }
}