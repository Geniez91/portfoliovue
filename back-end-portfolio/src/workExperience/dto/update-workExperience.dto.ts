import { CreateProjectDto } from "@/project/dto/create-project.dto";
import { PartialType } from "@nestjs/swagger";
import { CreateWorkExperienceDto } from "./create-workExperience.dto";

export class UpdateWorkExperienceDto extends PartialType(CreateWorkExperienceDto) {}