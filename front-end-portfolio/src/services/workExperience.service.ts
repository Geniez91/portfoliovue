import type { IWorkExperience1, IWorkExperience2 } from "@/interfaces/interfaces";
import axios from "axios";
import { addHeaders } from "./connexion.service";

const urlWorkExperience='https://portfoliovue-back-end-production.up.railway.app/workExperience'
const urlDeleteWorkExperience='https://portfoliovue-back-end-production.up.railway.app/workExperience?id='


export async function addWorkExperience(workExperience:IWorkExperience1,token:string){
try{
        const formData = new FormData();
        formData.append('file', workExperience.srcImg);
        formData.append('content', workExperience.content);
        formData.append('job',workExperience.job)
        formData.append('nameCompany',workExperience.nameCompany)
        formData.append('stack', JSON.stringify(workExperience.stack));
        formData.append('tasks',JSON.stringify(workExperience.tasks))

        if(workExperience.endDate)
        {
            formData.append('endDate', workExperience.endDate.toISOString());
        }

        if(workExperience.startDate)
        {
            formData.append('startDate',workExperience.startDate.toISOString())
        }
        const result = await axios.post(urlWorkExperience,formData,{headers:addHeaders(token)})
        return result
}
catch(error){
    throw error;
}
}


export async function getAllWorkExperience(){
    try{
        const result=await axios.get(urlWorkExperience)
        return result.data
    }
    catch(error){
        throw error;
    }
}

export async function deleteWorkExperience(token:string,id:number){
    try{
        const result=await axios.delete(`${urlDeleteWorkExperience}${id}`,{headers:addHeaders(token)})
        return result.data
    }
    catch(error){
        throw error;
    }
}

export async function updateWorkExperience(workExperience:IWorkExperience2,token:string){
    try{
        const formData = new FormData();
        formData.append('file', workExperience.srcImg);
        formData.append('content', workExperience.content);
        formData.append('job',workExperience.job)
        formData.append('nameCompany',workExperience.nameCompany)
        formData.append('stack', JSON.stringify(workExperience.stack));
        formData.append('tasks',JSON.stringify(workExperience.tasks))

        if(workExperience.endDate)
        {
            formData.append('endDate', workExperience.endDate.toISOString());
        }

        if(workExperience.startDate)
        {
            formData.append('startDate',workExperience.startDate.toISOString())
        }
        const result = await axios.put(`${urlDeleteWorkExperience}${workExperience.id}`,formData,{headers:addHeaders(token)})
        return result
}
catch(error){
    throw error;
}
}