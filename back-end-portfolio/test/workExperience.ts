import { WorkExperience } from "@/workExperience/workExperience.interface";

export const ALL_WORK_EXPERIENCES_TRANSFORMED:WorkExperience[]=[
    {
        id:1,
        content:'content',
        endDate:new Date('2024-10-10'),
        job:'Stagiaire',
        nameCompany:'FruityIce',
        srcImg:'img',
        stack:[{
            img:'test',
            name:'name'
        }],
        startDate:new Date('2024-09-09'),
        tasks:['test','test2']
    },
        {
            id:2,
        content:'content',
        endDate:new Date('2024-10-10'),
        job:'Stagiaire',
        nameCompany:'FruityIce',
        srcImg:'img',
        stack:[{
            img:'test',
            name:'name'
        }],
        startDate:new Date('2024-09-09'),
        tasks:['test','test2']
    }
]

export const ALL_WORK_EXPERIENCES=[
    {
        id:1,
        content:'content',
        endDate:new Date('2024-10-10'),
        job:'Stagiaire',
        nameCompany:'FruityIce',
        srcImg:'img',
        stack:[{
            img:'test',
            name:'name'
        }],
        startDate:new Date('2024-09-09'),
        tasks:['test','test2']
    },
        {
        id:2,
        content:'content',
        endDate:new Date('2024-10-10'),
        job:'Stagiaire',
        nameCompany:'FruityIce',
        srcImg:'img',
        stack:[{
            img:'test',
            name:'name'
        }],
        startDate:new Date('2024-09-09'),
        tasks:['test','test2']
    }
]

export const ADD_EXPERIENCE:WorkExperience={
    content:'content',
    endDate:new Date('2025-05-16'),
    job:'job',
    nameCompany:'TechupClimate',
    srcImg:'img',
    stack:[{
        img:'img.png',
        name:'JS'
    }],
    startDate:new Date('2025-05-15'),
    tasks:['add task'],
}

export const UPDATE_EXPERIENCE:WorkExperience={
    content:'content',
    endDate:new Date('2025-05-16'),
    job:'job',
    nameCompany:'TechupClimate',
    srcImg:'img',
    stack:[{
        img:'img.png',
        name:'JS'
    }],
    startDate:new Date('2025-05-15'),
    tasks:['add task'],
}


export const DELETE_EXPERIENCE:WorkExperience={
    content:'content',
    endDate:new Date('2025-05-16'),
    job:'job',
    nameCompany:'TechupClimate',
    srcImg:'img',
    stack:[{
        img:'img.png',
        name:'JS'
    }],
    startDate:new Date('2025-05-15'),
    tasks:['add task'],
    id:1
}

