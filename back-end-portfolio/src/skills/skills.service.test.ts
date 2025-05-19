import { PrismaService } from "@/prisma/prisma.service"
import { ConfigService } from "@nestjs/config"
import { SkillsService } from "./skills.service"
import { ADD_SKILL, ALL_SKILLS, ALL_SKILLS_TRANSFORMED, DELETE_SKILL } from "../../test/skills"
import { AddSkills } from "./skills.interface"

describe('SkillService',()=>{
    let prisma=new PrismaService()
    let configService=new ConfigService()
    let skillService=new SkillsService(prisma,configService)

    describe('getAllSkills',()=>{
        it('should return all the skills',async()=>{
            prisma.skills.findMany=jest.fn().mockResolvedValue(ALL_SKILLS)

            const result=await skillService.getAllSkills()

            expect(result).toEqual(ALL_SKILLS_TRANSFORMED)
        })

        it('should throw an error',async()=>{
            prisma.skills.findMany=jest.fn().mockRejectedValue(new Error())

            await(expect(skillService.getAllSkills).rejects.toThrow())
        })
    })

    describe('addSkills',()=>{
        it('should add skill',async()=>{
            prisma.skills.create=jest.fn().mockResolvedValue(ADD_SKILL)

            await skillService.addSkills('img',ADD_SKILL)

            expect(prisma.skills.create).toHaveBeenCalledWith({
            data: ADD_SKILL,
        })
    })

    it('should throw an error',async()=>{
        prisma.skills.create=jest.fn().mockRejectedValue(new Error())

        await(expect(skillService.addSkills)).rejects.toThrow()
    })
    
})

describe('deleteSkill',()=>{
    it('should delete skills',async()=>{
        prisma.skills.delete=jest.fn().mockResolvedValue(DELETE_SKILL)

        await skillService.deleteSkills(1)

        expect(prisma.skills.delete).toHaveBeenCalledWith({
            where:{
                id:1
            }
        })
    })

    it('should throw an error',async ()=>{
        prisma.skills.delete=jest.fn().mockRejectedValue(new Error())

        await(expect(skillService.deleteSkills)).rejects.toThrow()
    })
})

describe('updateSkills',()=>{
    it('should update skills',async()=>{
        prisma.skills.update=jest.fn().mockResolvedValue(ADD_SKILL)

        await skillService.updateSkills(1,'img',ADD_SKILL)

        expect(prisma.skills.update).toHaveBeenCalledWith({
            where:{
                id:1
            }, 
            data:ADD_SKILL
        })
    })

    it('should throw an error',async()=>{
        prisma.skills.update=jest.fn().mockRejectedValue(new Error())

        await(expect(prisma.skills.update)).rejects.toThrow()
    })
})

})