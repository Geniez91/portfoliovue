import { describe, expect, it, vi } from "vitest";
import { loadMarkdown } from "./experienceDetail.service";

global.fetch = vi.fn(async (url) => {
    return {
        url: url,
    };
}) as unknown as typeof fetch;

describe('loadMarkdown',()=>{
    it('should load markdown TechupClimate when route is TechupClimate',async ()=>{
        const result=await loadMarkdown('TechupClimate')
         expect(result.url).toBe('/content/Carbonscore.md')
    })

    it('should load markdown IUT Paris when route is IUT Paris',async ()=>{
        const result=await loadMarkdown('IUT Paris Cité')
         expect(result.url).toBe('/content/IUTParis.md')
    })

    it('should load markdown Centre de Recherche et des Restauration des musées de France when route is Centre de Recherche et des Restauration des musées de France',async ()=>{
        const result=await loadMarkdown('Centre de Recherche et des Restauration des musées de France')
         expect(result.url).toBe('/content/C2RMF.md')
    })

    it('should load markdown IUT Paris when route IUT Pari',async ()=>{
        const result=await loadMarkdown('Fruity-Ice')
         expect(result.url).toBe('/content/FruityIce.md')
    })
})