import { Figure } from './editor.models';

export interface Project {
  id: number;
  title: string;
  desc: string;
}

export interface ProjectFull extends Project {
  figures: Figure[];
}
