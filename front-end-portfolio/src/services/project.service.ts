import type { IProject } from "@/interfaces/interfaces";

export function projetsTitle(projets:IProject[]):string[]{
    return projets.map((projet => {
        return projet.name;
    }));
}

export function filterProjet(tagsFilters:IProject[],searchFilter:IProject[]){
   return tagsFilters.filter((projet)=>searchFilter.includes(projet))
}

export function searchProjetFilter(projets:IProject[],nameProjet:string){
    return projets.filter((projet)=>{
        return projet.name.startsWith(nameProjet);
    })
}

export function getTagStack(projets:IProject[]){
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

export function getTagsFilter(selectTag:string[],projets:IProject[]){
    if (selectTag.length === 0) {
        return projets;
      }
      return projets.filter((projet) => 
        projet.stackImg.some(stack => selectTag.includes(stack.name))
      );
}

export function sortProjetByYear(filtersProjet:IProject[]): Record<string, IProject[]>{
    return filtersProjet.reduce((acc:Record<string, IProject[]>, projet) => {
        const year = projet.year.getFullYear().toString();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(projet);
        return acc;
      }, {} as Record<string, IProject[]>);
}
