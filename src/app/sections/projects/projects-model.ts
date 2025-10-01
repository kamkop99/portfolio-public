export interface ProjectItem {
  title: string;
  year: string;
  githubURL: string;
  description: string;
  imageURL: string;
  techStack: String[];
  techInfo: Record<string, string>
}

export interface ProjectsSection {
    id: string;
    title: string;
    content: ProjectItem[];
}