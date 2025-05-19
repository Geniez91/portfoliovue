import { Prisma } from "@prisma/client"
import { WorkExperienceService } from "./workExperience.service"
import { PrismaService } from "@/prisma/prisma.service"
import { ConfigService } from "@nestjs/config"
import { ADD_EXPERIENCE, ALL_WORK_EXPERIENCES, ALL_WORK_EXPERIENCES_TRANSFORMED, DELETE_EXPERIENCE } from "../../test/workExperience"
import { Logger } from "@nestjs/common"

describe('workExperienceService',()=>{
    let prisma=new PrismaService()
    let configService=new ConfigService()
    let workExperienceService=new WorkExperienceService(prisma,configService)

    describe('getAllWorkExperience',()=>{
        it('should return all the workExperiences',async()=>{
        prisma.workExperience.findMany=jest.fn().mockResolvedValue(ALL_WORK_EXPERIENCES)
        
        const result= await workExperienceService.getAllWorkExperience()
        
        expect(result).toEqual(ALL_WORK_EXPERIENCES_TRANSFORMED)
        })

        it('should return an error', async () => {
        prisma.workExperience.findMany = jest.fn().mockRejectedValue(new Error())

        await expect(workExperienceService.getAllWorkExperience()).rejects.toThrow()
        })
    })

    describe('addWorkExperience',()=>{
    it('should add work experiences',async()=>{
        prisma.workExperience.create=jest.fn().mockResolvedValue(ADD_EXPERIENCE)

        await workExperienceService.addWorkExperience('img',ADD_EXPERIENCE)

        expect(prisma.workExperience.create).toHaveBeenCalledWith({
        data: ADD_EXPERIENCE,
    });
    })

    it('should return an error',async()=>{
        prisma.workExperience.create=jest.fn().mockRejectedValue(new Error())

        await expect(workExperienceService.addWorkExperience('img',ADD_EXPERIENCE)).rejects.toThrow()
    })
    })

    describe('deleteWorkExperience',()=>{
        it('should delete work experience',async()=>{
            prisma.workExperience.delete=jest.fn().mockResolvedValue(DELETE_EXPERIENCE)

            await workExperienceService.deleteWorkExperience(1)

            expect(prisma.workExperience.delete).toHaveBeenCalledWith({ where:{ id:1}});
        })

        it('should throw an erro',async()=>{
            prisma.workExperience.delete=jest.fn().mockRejectedValue(new Error())

            await expect(workExperienceService.deleteWorkExperience(1)).rejects.toThrow()
        })
    })

    describe('updateWorkExperience',()=>{
        it("should update work experience",async()=>{
            prisma.workExperience.update=jest.fn().mockResolvedValue(ADD_EXPERIENCE)

            await workExperienceService.updateWorkExperience(1,ADD_EXPERIENCE)

            expect(prisma.workExperience.update).toHaveBeenCalledWith({
                where:{ id:1},
                data: ADD_EXPERIENCE,
            })
        })

        it('should throw an error',async()=>{
            prisma.workExperience.update=jest.fn().mockRejectedValue(new Error())

            await expect(workExperienceService.updateWorkExperience(1,ADD_EXPERIENCE)).rejects.toThrow()
        })
    })
})