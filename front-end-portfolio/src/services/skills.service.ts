import type { ISkills, TSkills } from '@/interfaces/interfaces';
import axios from 'axios'
import { addHeaders } from './connexion.service';

const urlSkills='https://portfoliovue-back-end-production.up.railway.app/skills'
const urlDeleteSkills='https://portfoliovue-back-end-production.up.railway.app/skills?id='

export async function addSkills(language:string,type:TSkills,srcImg:File,token:string,yearsExperience?:number,usageExperience?:Date,level?:string,TOIEC?:number){
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

if(TOIEC){
formData.append('TOIEC',TOIEC.toString())
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

export async function deleteSkill(id:number,token:string){
    try{
      const result= await axios.delete(`${urlDeleteSkills}${id}`,{headers:addHeaders(token)})
      return result
    }
    catch(error){
        throw error
    }
}

export async function updateSkill(id:number,skill:ISkills,file:File,token:string){

    const formData = new FormData();
  
formData.append('file', file);
formData.append('idType', skill.idType);
formData.append('language', skill.language);
if (skill.usageExperience) {
    const usageDate = new Date(skill.usageExperience);
    if (!isNaN(usageDate.getTime())) { 
        formData.append('usageExperience', usageDate.toISOString());
    }
}

if(skill.yearsExperience){
    formData.append('yearsExperience', skill.yearsExperience.toString());
}

if(skill.level){
    formData.append('level',skill.level)
}

if(skill.TOIEC){
formData.append('TOIEC',skill.TOIEC.toString())
}

    try{
        const result=await axios.put(`${urlDeleteSkills}${id}`,formData,{headers:addHeaders(token)})
        return result
    }
    catch(error){
        throw error;
    }
}