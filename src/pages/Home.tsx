import './Home.css';
import catMascot from '../images/cat-mascot.png';

const Home: React.FC = () => {
    return (
        <div className="home-page">
            <section className="hero section reveal">
                <div className="hero-content">
                    <div className="badge glass">Next-Gen Web Design</div>
                    <h1 className="hero-title">
                        Crafting <span className="neon-text">Digital</span> <br />
                        Purr-fection
                    </h1>
                    <p className="hero-subtitle">
                        Advanced full-stack engineer specialized in high-performance web applications and cat-inspired digital architectures.
                    </p>
                    <div className="hero-btns">
                        <button className="btn btn-primary">View Projects</button>
                        <button className="btn glass">Contact Alpha Cat</button>
                    </div>
                    <div className="stats-row">
                        <div className="stat-item">
                            <span className="stat-num neon-text">50+</span>
                            <span className="stat-label">Clients</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-num neon-text">120k</span>
                            <span className="stat-label">Kibbles Earned</span>
                        </div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="mascot-wrapper">
                        <img src={catMascot} alt="Tech Mascot" className="mascot-img" />
                        <div className="glow-circle primary"></div>
                        <div className="glow-circle secondary"></div>
                    </div>
                    <div className="floating-card c1 glass reveal" style={{ animationDelay: '0.2s' }}>
                        <span className="f-icon">⚡</span>
                        <div>
                            <p>Performance</p>
                            <small>99.9% Rank</small>
                        </div>
                    </div>
                    <div className="floating-card c2 glass reveal" style={{ animationDelay: '0.4s' }}>
                        <span className="f-icon">🛡️</span>
                        <div>
                            <p>Security</p>
                            <small>Meow-proof</small>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
