import type { IWorkExperience1, IWorkExperience2 } from "@/interfaces/interfaces";
import { getAllWorkExperience,addWorkExperience, deleteWorkExperience, updateWorkExperience } from "@/services/workExperience.service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWorkExperienceStore=defineStore('workExperience',()=>{
        const workExperiences = ref<IWorkExperience2[]>([]);
        const errorMessage = ref('');
        const successMessage = ref('');
        const isLoaded=ref(false);

        async function getAllWorkExperiences():Promise<void>{
            try{
                workExperiences.value=await getAllWorkExperience()
                isLoaded.value=true
            }
            catch(error){
                errorMessage.value='Erreur de chargement des compétences'
                throw error
            }
        }

        async function addWorkExperiences(workExperience:IWorkExperience1,token:string){
            try{
            const result=await addWorkExperience(workExperience,token)
            workExperiences.value.push(result.data)
             successMessage.value=`L'ajout de votre expérience a bien été effectué`
            }
            catch(error){
                errorMessage.value='Erreur lors de l"ajout d"une expérience professionnelle'
                throw error;
            }
        }

        async function deleteWorkExperiences(id:number,token:string){
            try{
               await deleteWorkExperience(token,id)
                workExperiences.value=workExperiences.value.filter((workExperience)=>workExperience.id!==id)
                successMessage.value=`La suppresion de votre expérience a bien été effectué`
            }
            catch(error){
                errorMessage.value='Erreur lors de la suppresion d"une expérience professionnelle'
                throw error;
            }
        }

        async function updateWorkExperienceById(workExperience:IWorkExperience2,token:string){
            try{
                const result=await updateWorkExperience(workExperience,token)
                const index=workExperiences.value.findIndex((workExperiences)=>workExperiences.id===workExperience.id)
                workExperiences.value[index]=result.data
                successMessage.value=`La mise à jour d'une expérience profesionelle a bien été effectué`
            }
            catch(error){
                errorMessage.value='Erreur lors de la mise à jour d"une expérience professionnelle'
                throw error;
            }
        }

        return {workExperiences,errorMessage,successMessage,isLoaded,getAllWorkExperiences,addWorkExperiences,deleteWorkExperiences,updateWorkExperienceById}
})