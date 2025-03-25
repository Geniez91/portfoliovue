import type { ISkills, TSkills } from "@/interfaces/interfaces";
import { addSkills, deleteSkill, getAllSkills } from "@/services/skills.service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSkillStore=defineStore('skill',()=>{
    const skills = ref<ISkills[]>([]);

    async function getSkills():Promise<void>{
        try{
          skills.value=await getAllSkills()
        }
        catch(error){
            throw error;
        }
    }
    async function addSkill(language:string,type:TSkills,srcImg:File,token:string,yearsExperience?:number,usageExperience?:Date,level?:string):Promise<void>{
        try{
            const result=await addSkills(language,type,srcImg,token,yearsExperience,usageExperience,level)
            skills.value.push(result.data)
        }
        catch(error){
            throw error;
        }
    }

    async function deleteSkillById(id:number,token:string){
        const result=await deleteSkill(id,token)
        skills.value= skills.value.filter((skill)=>skill.id!==id)
    }

    return {skills,getSkills,addSkill,deleteSkillById}
})