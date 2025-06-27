import type { IProject, IProject3 } from "@/interfaces/interfaces";
import axios from "axios";
import { addHeaders } from "./connexion.service";

const urlProject='https://portfoliovue-back-end-production.up.railway.app/project'
const urldeleteProject="https://portfoliovue-back-end-production.up.railway.app/project?id="

export async function getAllProject():Promise<IProject3[]>{
    try{
        const result=await axios.get(urlProject)
        return result.data
    }
    catch(error){
        throw error
    }
}

export async function addProject(project:IProject3,token:string){
  try{
    const formData = new FormData();
    formData.append('content', project.content);
    formData.append('name',project.name);
    formData.append('description',project.description);
    formData.append('linkGithub',project.linkGithub)
    formData.append('year',project.year.toISOString())
    formData.append('nbCollaborator',project.nbCollaborator.toString())
    formData.append('stackImg', JSON.stringify(project.stackImg));
    project.thumbnail.forEach((file) => {
  formData.append('file', file);
});

    const result = await axios.post(urlProject,formData,{headers:addHeaders(token)})
    return result
  }
  catch(error){
    throw error;
  }
}

export async function updateProject(id:number,project:IProject3,token:string){
  try{
    const formData = new FormData();
    formData.append('content', project.content);
    formData.append('name',project.name);
    formData.append('description',project.description);
    formData.append('linkGithub',project.linkGithub)
    formData.append('year', new Date(project.year).toISOString())
    formData.append('nbCollaborator',project.nbCollaborator.toString())
    formData.append('stackImg', JSON.stringify(project.stackImg));
    project.thumbnail.forEach((file) => {
  formData.append('file', file);
});
    const result = await axios.put(`${urldeleteProject}${id}`,formData,{headers:addHeaders(token)})
    return result
  }
  catch(error){
    throw error;
  }
}

export async function deleteProject(token:string,id:number){
try{
 const result= await axios.delete(`${urldeleteProject}${id}`,{headers:addHeaders(token)})
 return result.data
}
catch(error){
  throw error;
}
}

export function projetsTitle(projets:IProject3[]):string[]{
    return projets.map((projet => {
        return projet.name;
    }));
}

export function filterProjet(tagsFilters:IProject3[],searchFilter:IProject3[]){
   return tagsFilters.filter((projet)=>searchFilter.includes(projet))
}

export function searchProjetFilter(projets:IProject3[],nameProjet:string){
    return projets.filter((projet)=>{
        return projet.name.startsWith(nameProjet);
    })
}

export function getTagStack(projets:IProject3[]){
    const uniqueStack=new Set<string>();
    projets.map(projet=>projet.stackImg.map(stack=>uniqueStack.add(stack.name)))
    return Array.from(uniqueStack);
}

export function toggleTag(tag: string, selectedTags: string[]): string[] {
    if (selectedTags.includes(tag)) {
      return selectedTags.filter(t => t !== tag);
    } else {
      return [...selectedTags, tag];
    }
  }

export function getTagsFilter(selectTag:string[],projets:IProject3[]){
    if (selectTag.length === 0) {
        return projets;
      }
      return projets.filter((projet) => 
        projet.stackImg.some(stack => selectTag.includes(stack.name))
      );
}

export function sortProjetByYear(filtersProjet: IProject3[]): Record<string, IProject3[]> {
  return filtersProjet.reduce((acc: Record<string, IProject3[]>, projet) => {
    const date = projet.year instanceof Date ? projet.year : new Date(projet.year);
    const year = date.getFullYear().toString();

    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(projet);
    return acc;
  }, {});
}

