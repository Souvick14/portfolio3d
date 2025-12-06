// Dynamic Section Rendering
class SectionsManager {
    constructor() {
        this.data = null;
    }

    async loadAllData() {
        try {
            this.data = await apiService.getAllData();
            this.renderAllSections();
        } catch (error) {
            console.error('Failed to load data:', error);
            this.showError();
        }
    }

    renderAllSections() {
        this.renderSkills();
        this.renderProjects();
        this.renderObjectives();
        this.renderDreams();
        this.renderAchievements();
        this.renderContact();
        this.renderCV();
        
        // Update cursor effects for new elements
        if (cursorEffects) {
            cursorEffects.updateInteractiveElements();
        }
    }

    renderSkills() {
        const container = document.getElementById('skills-container');
        if (!this.data || !this.data.skills) return;

        container.innerHTML = '';

        Object.keys(this.data.skills).forEach(category => {
            const categorySection = document.createElement('div');
            categorySection.className = 'skill-category fade-in-up';
            
            const categoryTitle = document.createElement('h3');
            categoryTitle.className = 'category-title';
            categoryTitle.textContent = category;
            categorySection.appendChild(categoryTitle);

            const skillsGrid = document.createElement('div');
            skillsGrid.className = 'skills-grid';

            this.data.skills[category].forEach(skill => {
                const skillCard = this.createSkillCard(skill);
                skillsGrid.appendChild(skillCard);
            });

            categorySection.appendChild(skillsGrid);
            container.appendChild(categorySection);
        });
    }

    createSkillCard(skill) {
        const card = document.createElement('div');
        card.className = 'skill-card';
        
        card.innerHTML = `
            <div class="skill-header">
                <img src="${skill.icon_url}" alt="${skill.name}" class="skill-icon" onerror="this.style.display='none'">
                <h4 class="skill-name">${skill.name}</h4>
            </div>
            <div class="skill-proficiency">
                <div class="proficiency-bar">
                    <div class="proficiency-fill" data-level="${skill.proficiency_level}" style="width: 0%"></div>
                </div>
                <span class="proficiency-text">${skill.proficiency_level}%</span>
            </div>
        `;

        return card;
    }

    renderProjects() {
        const container = document.getElementById('projects-container');
        if (!this.data || !this.data.projects) return;

        container.innerHTML = '';

        this.data.projects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            container.appendChild(projectCard);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card fade-in-up';
        
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        const githubLink = project.github_url ? 
            `<a href="${project.github_url}" class="project-link" target="_blank">
                <i class="fab fa-github"></i> Code
            </a>` : '';

        const demoLink = project.demo_url ? 
            `<a href="${project.demo_url}" class="project-link" target="_blank">
                <i class="fas fa-external-link-alt"></i> Demo
            </a>` : '';

        card.innerHTML = `
            <img src="${project.image_url}" alt="${project.title}" class="project-image" 
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27200%27%3E%3Crect fill=%27%231a1a2e%27 width=%27400%27 height=%27200%27/%3E%3Ctext fill=%27%238b5cf6%27 font-family=%27Orbitron%27 font-size=%2724%27 x=%2750%25%27 y=%2750%25%27 text-anchor=%27middle%27 dominant-baseline=%27middle%27%3E${project.title}%3C/text%3E%3C/svg%3E'">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">${techTags}</div>
                <div class="project-links">
                    ${githubLink}
                    ${demoLink}
                </div>
            </div>
        `;

        return card;
    }

    renderObjectives() {
        const container = document.getElementById('objectives-container');
        if (!this.data || !this.data.objectives) return;

        container.innerHTML = '';

        this.data.objectives.forEach(objective => {
            const item = this.createTimelineItem(objective, 'objective');
            container.appendChild(item);
        });
    }

    renderAchievements() {
        const container = document.getElementById('achievements-container');
        if (!this.data || !this.data.achievements) return;

        container.innerHTML = '';

        this.data.achievements.forEach(achievement => {
            const item = this.createTimelineItem(achievement, 'achievement');
            container.appendChild(item);
        });
    }

    createTimelineItem(data, type) {
        const item = document.createElement('div');
        item.className = 'timeline-item fade-in-up';

        const statusBadge = type === 'objective' && data.status ? 
            `<span class="status-badge status-${data.status}">
                ${data.status.replace('-', ' ').toUpperCase()}
            </span>` : '';

        const date = type === 'objective' && data.target_date ? 
            `<span><i class="fas fa-calendar"></i> Target: ${new Date(data.target_date).toLocaleDateString()}</span>` :
            type === 'achievement' && data.achievement_date ?
            `<span><i class="fas fa-calendar"></i> ${new Date(data.achievement_date).toLocaleDateString()}</span>` : '';

        const category = data.category ? 
            `<span><i class="fas fa-tag"></i> ${data.category}</span>` : '';

        item.innerHTML = `
            <h3 class="timeline-title">${data.title}</h3>
            <p class="timeline-description">${data.description}</p>
            <div class="timeline-meta">
                ${statusBadge}
                ${date}
                ${category}
            </div>
        `;

        return item;
    }

    renderDreams() {
        const container = document.getElementById('dreams-container');
        if (!this.data || !this.data.dreams) return;

        container.innerHTML = '';

        this.data.dreams.forEach(dream => {
            const dreamCard = this.createDreamCard(dream);
            container.appendChild(dreamCard);
        });
    }

    createDreamCard(dream) {
        const card = document.createElement('div');
        card.className = 'dream-card fade-in-up';

        card.innerHTML = `
            <img src="${dream.image_url}" alt="${dream.title}" class="dream-image"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27300%27 height=%27200%27%3E%3Crect fill=%27%231a1a2e%27 width=%27300%27 height=%27200%27/%3E%3Ctext fill=%27%23ff00ff%27 font-family=%27Orbitron%27 font-size=%2720%27 x=%2750%25%27 y=%2750%25%27 text-anchor=%27middle%27 dominant-baseline=%27middle%27%3E✨%3C/text%3E%3C/svg%3E'">
            <div class="dream-content">
                <h3 class="dream-title">${dream.title}</h3>
                <p class="dream-description">${dream.description}</p>
                ${dream.category ? `<span class="dream-category">${dream.category}</span>` : ''}
            </div>
        `;

        return card;
    }

    renderContact() {
        const container = document.getElementById('contact-info');
        if (!this.data || !this.data.contact) return;

        container.innerHTML = '';

        this.data.contact.forEach(contact => {
            const contactItem = this.createContactItem(contact);
            container.appendChild(contactItem);
        });
    }

    createContactItem(contact) {
        const item = document.createElement('div');
        item.className = 'contact-item fade-in-up';

        const isLink = contact.type === 'linkedin' || contact.type === 'github' || 
                      contact.type === 'twitter' || contact.value.startsWith('http');

        const content = isLink ? 
            `<a href="${contact.value}" target="_blank" class="contact-value">${contact.value}</a>` :
            `<span class="contact-value">${contact.value}</span>`;

        item.innerHTML = `
            <i class="${contact.icon} contact-icon"></i>
            <div class="contact-details">
                <span class="contact-type">${contact.type}</span>
                ${content}
            </div>
        `;

        return item;
    }

    showError() {
        const sections = [
            'skills-container', 'projects-container', 'objectives-container',
            'dreams-container', 'achievements-container', 'contact-info'
        ];

        sections.forEach(id => {
            const container = document.getElementById(id);
            if (container) {
                container.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Unable to load data. Please ensure the backend server is running.</p>
                        <button class="btn btn-primary" onclick="sectionsManager.loadAllData()">
                            <span>Retry</span>
                        </button>
                    </div>
                `;
            }
        });
    }

    async renderCV() {
        const container = document.getElementById('cv-container');
        if (!container) return;
        
        try {
            const response = await fetch(`${CONFIG.API_URL}/cv`);
            const result = await response.json();
            
            if (result.success && result.data) {
                const cv = result.data;
                const uploadDate = new Date(cv.uploaded_date).toLocaleDateString();
                
                container.innerHTML = `
                    <div class="cv-card">
                        <div class="cv-icon">
                            <i class="fas fa-file-pdf"></i>
                        </div>
                        <h3 class="cv-title">${cv.title || 'My Resume'}</h3>
                        <span class="cv-upload-date">Last updated: ${uploadDate}</span>
                        <a href="${cv.pdf_url}" 
                           target="_blank" 
                           download 
                           class="cv-download-btn">
                            <i class="fas fa-download"></i>
                            Download CV
                        </a>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <p class="no-cv-message">
                        <i class="fas fa-info-circle"></i><br>
                        No CV available at the moment.
                    </p>
                `;
            }
        } catch (error) {
            console.error('Error loading CV:', error);
            container.innerHTML = `
                <p class="no-cv-message">
                    <i class="fas fa-exclamation-circle"></i><br>
                    Failed to load CV. Please try again later.
                </p>
            `;
        }
    }
}

// Initialize sections manager
const sectionsManager = new SectionsManager();

// Load data when page loads
window.addEventListener('load', () => {
    sectionsManager.loadAllData();
});
