export namespace ELoggerContext {
  export enum SkillsService {
    GetAllSkills = 'SkillsService.GetAllSkills',
    AddSkills = 'SkillsService.AddSkills',
    UpdateSkills = 'SkillsService.UpdateSkills',
    DeleteSkills = 'SkillsService.DeleteSkills',
    UploadSkillImage = 'SkillsService.UploadSkillImage',
    FindSkill = 'SkillsService.FindSkill',
  }
  export enum AuthService {
    signIn = 'AuthService.signIn',
  }
  export enum WorkExperienceService {
    AddWorkExperience = 'WorkExperienceService.AddWorkExperience',
    DeleteWorkExperience = 'WorkExperienceService.DeleteWorkExperience',
    UpdateWorkExperience = 'WorkExperienceService.UpdateWorkExperience',
    GetAllWorkExperience = 'WorkExperienceService.GetAllWorkExperience',
    FindWorkExperienceByIdOrThrow = 'WorkExperienceService.FindWorkExperienceByIdOrThrow',
    UploadWorkExperienceImage = 'WorkExperienceService.UploadWorkExperienceImage',
  }
  export enum ProjectService {
    GetAllProject = 'ProjectService.GetAllProject',
    AddProject = 'ProjectService.AddProject',
    FindProjectByIdOrThrow = 'ProjectService.FindProjectByIdOrThrow',
    UpdateProject = 'ProjectService.UpdateProject',
    DeleteProject = 'ProjectService.DeleteProject',
    UploadProjectImage = 'ProjectService.UploadProjectImage',
  }
}
