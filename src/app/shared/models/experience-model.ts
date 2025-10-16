export interface ExperienceItem {
 __id: number;
  title: string;
  fromDate: string;
  toDate: string;
  company: string;
  country: string;
  description: string[];
  technologies: string[];
  links: any;
  reached: boolean | true;
  revealed: boolean | false;
}

export interface ExperienceSection {
  id: string;
  title: string;
  content: ExperienceItem[];
}