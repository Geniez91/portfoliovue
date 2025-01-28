export type TItemNavBar = 'Qui-suis-je ?'|'Mes compétences'|'Mon parcours académique'|'Mes expériences professionnelles'|'Mes projets'|'Contact'
export type TSkillsExperience='VueJS'|'TypeScript'|'HTML'|'CSS'|'Javascript'|'Angular'|'PHP'|'React'|'Node.Js'|'Nest'|'Mysql'|'PostgreSQL'|'OracleSQL'|'Modelisation Base de données (MCD/MLD)'|'UML'|'Travail en équipe'|'Collaboratif'|'Sérieux'|`A l'écoute`
export type TSkillsShow='Développement Web'|'Base de donnees'|'Savoir être'|'Langues'
export type TSkillsLanguage='Français'|'Anglais'
export type TLanguageLevel='Débutant'|'Intermédiaire'|'Bi-lingue'|'Langue Maternelle'
export type TNameStack='JavaScript'|'TypeScript'|'VueJS'|'HTML'|'CSS'|'Python'|'SKlearn'|'Pandas'|'Angular'|'Nest'|'React Native'|'React'|'PHP'|'C#'|'Go'|'Redis'|'Flutter'|'Firebase'

export interface IItemNavBar{
    name:TItemNavBar,
    to:string
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

export interface IProject{
    name:string,
    thumbnail:any[],
    description: string,
    nbCollaborator:number,
    stackImg:IStack[];
    linkGithub:string;
    year:Date;
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



