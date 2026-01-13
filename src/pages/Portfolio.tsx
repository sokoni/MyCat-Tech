import './Portfolio.css';

interface Project {
    title: string;
    category: string;
    description: string;
    tags: string[];
    link: string;
}

const projects: Project[] = [
    {
        title: "WhiskerWatch AI",
        category: "Machine Learning",
        description: "Real-time cat behavior analysis using deep learning and night-vision computer vision.",
        tags: ["Python", "TensorFlow", "React", "AWS"],
        link: "#"
    },
    {
        title: "MeowCommerce 2.0",
        category: "Full Stack",
        description: "High-performance kitten supply store with a custom GLSL based product viewer.",
        tags: ["Next.js", "Three.js", "Stripe", "PostgreSQL"],
        link: "#"
    },
    {
        title: "PurrSafe Security",
        category: "Cybersecurity",
        description: "End-to-end encrypted messaging for elite security felines.",
        tags: ["Go", "Rust", "WebRTC", "Redis"],
        link: "#"
    },
    {
        title: "LaserChase VR",
        category: "Game Dev",
        description: "Immersive VR experience for indoor cats to hunt virtual photons.",
        tags: ["Unity", "C#", "Oculus SDK"],
        link: "#"
    }
];

const Portfolio: React.FC = () => {
    return (
        <div className="portfolio-page">
            <section className="section reveal">
                <div className="portfolio-header">
                    <span className="badge glass">Finished Works</span>
                    <h2 className="section-title">Technical <span className="neon-text">Scratching</span> Post</h2>
                    <p className="section-subtitle">A collection of high-impact engineering projects crafted with precision and feline agility.</p>
                </div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div className="project-card glass reveal" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="project-content">
                                <span className="project-category">{project.category}</span>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                                </div>
                                <div className="project-actions">
                                    <a href={project.link} className="btn-link">Explore Case Study →</a>
                                </div>
                            </div>
                            <div className="card-glow"></div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
