import { Project } from "@/project/entity/project.entity.dto";


export const ALL_PROJECT = [
  {
    content: 'content',
    description: 'description',
    linkGithub: 'linktoGitHub',
    name: 'name',
    nbCollaborator: 2,
    stackImg: [
      {
        img: 'img',
        name: 'name',
      },
    ],
    thumbnail: ['test'],
    year: new Date('2025-07-03'),
    id: 5,
  },
];

export const ALL_PROJECT_TRANSFORMED: Project[] = [
  {
    content: 'content',
    description: 'description',
    linkGithub: 'linktoGitHub',
    name: 'name',
    nbCollaborator: 2,
    stackImg: [
      {
        img: 'img',
        name: 'name',
      },
    ],
    thumbnail: ['test'],
    year: new Date('2025-07-03'),
    id: 5,
  },
];

export const ADD_PROJECT: Project = {
  content: 'content',
  description: 'description',
  linkGithub: 'linktoGitHub',
  name: 'name',
  nbCollaborator: 2,
  stackImg: [
    {
      img: 'img',
      name: 'name',
    },
  ],
  thumbnail: ['test'],
  year: new Date('2025-07-03'),
};

export const DELETE_PROJECT: Project = {
  content: 'content',
  description: 'description',
  linkGithub: 'linktoGitHub',
  name: 'name',
  nbCollaborator: 2,
  stackImg: [
    {
      img: 'img',
      name: 'name',
    },
  ],
  thumbnail: ['test'],
  year: new Date('2025-07-03'),
  id: 1,
};
