export interface AboutItem {
  intro: string;
  full_name: string;
  position: string;
  localization: string;
  work_experience: string;
  short_description: string;
  backend: Array<string>;
  frontend: Array<string>;
  interests: Array<string>;
  used_tools: Array<string>;
}

export interface AboutSection {
    id: string;
    title: string;
    content: AboutItem;
}