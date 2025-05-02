import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Assuming usage
import { ExternalLink, Github } from 'lucide-react'; // Assuming usage

// Define the project type based on data in projects.tsx
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
}

interface ProjectCardProps {
  project: Project | null | undefined; // Allow project to be potentially null/undefined
  style?: React.CSSProperties;
  variants?: any; // Define Framer Motion variants type if possible
}

const ProjectCard = React.memo(({ project, style, variants }: ProjectCardProps) => {
  // Early return if project data or id is missing to ensure key validity
  if (!project || !project.id) {
    // You might want to log an error here or return a placeholder
    return null;
  }

  // Now we know project and project.id exist and are valid
  return (
    <motion.div
      key={project.id} // Use the validated project.id directly
      variants={variants}
      style={style}
      // Add the actual classes from projects.tsx map if needed, e.g.:
      className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:border-white/20 hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col"
    >
      {/* Card content: Image, Title, Description, Tags, Links */}
      {/* Example Structure: */}
      <div className="relative w-full h-48 md:h-56">
        <Image
          src={project.image}
          alt={project.title}
          width={500}
          height={300}
          className="rounded-t-lg w-full h-48 object-cover img-responsive hardware-accelerated"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">{project.title}</h3>
        <p className="text-sm text-white/70 mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs bg-white/10 text-indigo-300 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-end space-x-3 mt-auto pt-4 border-t border-white/10">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-200"> <Github size={20} /> </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-200"> <ExternalLink size={20} /> </a>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard'; // Good practice for memoized components

export default ProjectCard;