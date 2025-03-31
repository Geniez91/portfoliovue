import type { ISkills, TSkills } from "@/interfaces/interfaces";
import { addSkills, deleteSkill, getAllSkills, updateSkill } from "@/services/skills.service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSkillStore=defineStore('skill',()=>{
    const skills = ref<ISkills[]>([]);
    const errorMessage = ref('');
    const successMessage = ref('');

    async function getSkills():Promise<void>{
        try{
          skills.value=await getAllSkills()
        }
        catch(error){
            errorMessage.value='Erreur de chargement des compétences'
            throw error;
        }
    }
    async function addSkill(language:string,type:TSkills,srcImg:File,token:string,yearsExperience?:number,usageExperience?:Date,level?:string):Promise<void>{
        try{
            successMessage.value=''
            const result=await addSkills(language,type,srcImg,token,yearsExperience,usageExperience,level)
            skills.value.push(result.data)
            successMessage.value=`L'ajout de votre compétence a bien été effectué`
        }
        catch(error){
            errorMessage.value=`Erreur lors de l'ajout d'une compétence`
            throw error;
        }
    }

    async function deleteSkillById(id:number,token:string){
        try{
            successMessage.value=''
            const result=await deleteSkill(id,token)
            skills.value= skills.value.filter((skill)=>skill.id!==id)
            successMessage.value=`La suppresion de votre compétence a bien été effectué`
            return result
        }
        catch(error){
            errorMessage.value=`Error lors de la suppresion d'une compétence`
            throw error;
        }
       
    }

    async function updateSkillById(id:number,skill:ISkills,token:string,file:File){
        try{
            successMessage.value=''
            const result=await updateSkill(id,skill,file,token)
            const index=skills.value.findIndex((skill)=>skill.id===id)
            skills.value[index]=result.data
            successMessage.value=`La mise à jour de votre compétence a bien été effectué`
        }
        catch(error){
            errorMessage.value=`Erreur lors de la mise à jour d'une compétence`
            throw error;
        }
    }
    return {skills,errorMessage,successMessage,getSkills,addSkill,deleteSkillById,updateSkillById}
})