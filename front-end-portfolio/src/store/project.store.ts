import type { IProject2, IProject3 } from "@/interfaces/interfaces";
import { getAllProject,addProject, deleteProject, updateProject } from "@/services/project.service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectStore=defineStore('project',()=>{
    const project=ref<IProject3[]>([])
    const errorMessage = ref('');
    const successMessage = ref('');
    const isLoaded=ref(false);

    async function getAllProjects():Promise<void>{
        try{
            project.value=await getAllProject()
            isLoaded.value=true
            }
        catch(error){
        errorMessage.value='Erreur de chargement des projets'
        throw error
                }
        }
    async function addProjects(add:IProject3,token:string)   {
        try{
            const result=await addProject(add,token)
            project.value.push(result.data)
            successMessage.value=`L'ajout de votre projet a bien été effectué`
        }
        catch(error){
            errorMessage.value='Erreur lors de l"ajout d"un projet'
            throw error
        }
    }
    async function deleteProjects(token:string,id:number){
        try{
            await deleteProject(token,id)
            project.value=project.value.filter((projet)=>projet.id===id)
            successMessage.value=`La suppression de votre projet a bien été effectué`
        }
        catch(error){
            errorMessage.value='Erreur lors de la suppression d"une expérience professionnelle'
            throw error;
        }
    }
    async function updateProjects(token:string,id:number,add:IProject3){
        try{
            const result=await updateProject(id,add,token)
            const index=project.value.findIndex((workExperiences)=>workExperiences.id===add.id)
            project.value[index]=result.data
            successMessage.value=`La modification de votre projet a bien été effectué`
        }
        catch(error){
            errorMessage.value='Erreur lors de la mise à jour d"une expérience professionnelle'
            throw error;
        }
    }
        return {project,errorMessage,successMessage,isLoaded,getAllProjects,addProjects,deleteProjects,updateProjects}
})