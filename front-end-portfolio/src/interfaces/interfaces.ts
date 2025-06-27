export type TItemNavBar = 'Qui-suis-je ?'|'Mes compétences'|'Mon parcours académique'|'Mes expériences professionnelles'|'Mes projets'|'Contact'|'Mon CV'
export type TSkillsExperience='VueJS'|'TypeScript'|'HTML'|'CSS'|'Javascript'|'Angular'|'PHP'|'React'|'Node.Js'|'Nest'|'Mysql'|'PostgreSQL'|'OracleSQL'|'Modelisation Base de données (MCD/MLD)'|'UML'|'Travail en équipe'|'Collaboratif'|'Sérieux'|`A l'écoute`
export type TSkillsShow='Développement Web'|'Base de donnees'|'Savoir être'|'Langues'
export type TSkills='Back-end'|'Front-end'|'Base de données'|'Modelisation'|'Soft Skills'|'Languages'

export type TSkillsLanguage='Français'|'Anglais'
export type TLanguageLevel='Débutant'|'Intermédiaire'|'Bi-lingue'|'Langue Maternelle'
export type TNameStack='JavaScript'|'TypeScript'|'VueJS'|'HTML'|'CSS'|'Python'|'SKlearn'|'Pandas'|'Angular'|'Nest'|'React Native'|'React'|'PHP'|'C#'|'Go'|'Redis'|'Flutter'|'Firebase'
export type TSkillsType='Front'|'Bdd'|'Modelisation'|'Back'|'Langues'


export interface IItemNavBar{
    name:TItemNavBar,
    to?:string,
    href?:string
}

export interface ISkills{
id:number;
language:string;
yearsExperience?:number;
usageExperience?:Date;
srcImg:string;
idType:TSkills 
level?:string;
TOIEC?:number;
}

export interface ISkillsExperience{
    language:TSkillsExperience,
    yearsExperience?:number,
    usageExperience?:number,
    srcImg:any
}

export interface ISkillsLanguage{
    language:TSkillsLanguage,
    level:TLanguageLevel,
    srcImg:any,
    TOIEC?:number
}

export interface IAcademic{
    year:string,
    title:string,
    description?:string,
    logo:any,
    name:string,
    website:string
}

export interface IWorkExperience{
    period:string,
    name:string,
    entreprise:string,
    description:string[],
    stackImg:any[];
    entrepriseImg:any;
}

export interface IWorkExperience1{
    id?:string,
    nameCompany:string;
    stack:IStackWorkExperience[],
    job:string;
    tasks:string[],
    startDate:Date,
    endDate:Date,
    content:string;
    srcImg:File;
}

export interface IWorkExperience2{
    id?:number,
    nameCompany:string;
    stack:IStackWorkExperience[],
    job:string;
    tasks:string[],
    startDate:Date,
    endDate:Date,
    content:string;
    srcImg:string|File;
}

export interface IProject{
    name:string,
    thumbnail:any[],
    description: string,
    nbCollaborator:number,
    stackImg:IStack[];
    linkGithub:string;
    year:Date;
}

export interface IProject2{
    id?:number
    name:string
    year:Date
    description:string
    linkGitHub:string
    stackImg:IStack[]
    thumbnail:string[]
    content:string

}

export interface IProject3{
    id?:number
    name:string
    year:Date
    description:string
    linkGithub:string
    stackImg:IStack[]
    thumbnail:File[]|string[]
    content:string
    nbCollaborator:number,
}



export interface IStack{
    img:any,
    name:TNameStack
}

export interface IEmailSend {
    name:string,
    email:string,
    subject:string,
    message:string,
}

export interface IHeader{
    Authorization:string,
    "Content-Type"?:string
}

export interface IStackWorkExperience{
    img:string;
    name:string;
}

