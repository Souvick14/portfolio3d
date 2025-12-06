// Override sections.js rendering for enhanced card layouts

// Only override if sectionsManager exists
if (typeof sectionsManager !== 'undefined') {
    
    // Override renderDreams to show images
    if (sectionsManager.renderDreams) {
        sectionsManager.renderDreams = function() {
            const container = document.getElementById('dreams-container');
            if (!this.data || !this.data.dreams) return;

            container.innerHTML = '';
            container.className = 'dreams-grid';

            this.data.dreams.forEach(dream => {
                const card = document.createElement('div');
                card.className = 'dream-card fade-in-up';
                
                const imageOrIcon = dream.image_url ?
                    `<img src="${dream.image_url}" alt="${dream.title}" class="dream-card-image">` :
                    '<div class="dream-icon">✨</div>';
                
                const category = dream.category ?
                    `<span class="dream-category"><i class="fas fa-tag"></i> ${dream.category}</span>` : '';
                
                card.innerHTML = `
                    ${imageOrIcon}
                    <h3 class="dream-title">${dream.title}</h3>
                    <p class="dream-description">${dream.description}</p>
                    ${category}
                `;
                
                container.appendChild(card);
            });
        };
    };

    // Override renderObjectives for card layout
    if (sectionsManager.renderObjectives) {
        sectionsManager.renderObjectives = function() {
            const container = document.getElementById('objectives-container');
            if (!this.data || !this.data.objectives) return;

            container.innerHTML = '';
            container.className = 'objectives-grid';

            this.data.objectives.forEach(objective => {
                const card = document.createElement('div');
                card.className = 'objective-card fade-in-up';
                
                const targetDate = objective.target_date ?
                    `<span class="objective-date"><i class="fas fa-calendar"></i> Target: ${new Date(objective.target_date).toLocaleDateString()}</span>` : '';
                
                const status = objective.status ?
                    `<span class="objective-status status-${objective.status}"><i class="fas fa-circle"></i> ${objective.status.replace('-', ' ').toUpperCase()}</span>` : '';
                
                card.innerHTML = `
                    <div class="objective-icon">🎯</div>
                    <h3 class="objective-title">${objective.title}</h3>
                    <p class="objective-description">${objective.description}</p>
                    <div>
                        ${status}
                        ${targetDate}
                    </div>
                `;
                
                container.appendChild(card);
            });
        };
    }

    // Override renderAchievements to show images
    if (sectionsManager.renderAchievements) {
        sectionsManager.renderAchievements = function() {
            const container = document.getElementById('achievements-container');
            if (!this.data || !this.data.achievements) return;

            container.innerHTML = '';
            container.className = 'achievements-grid';

            this.data.achievements.forEach(achievement => {
                const card = document.createElement('div');
                card.className = 'achievement-card fade-in-up';
                
                const imageOrIcon = achievement.image_url ?
                    `<img src="${achievement.image_url}" alt="${achievement.title}" class="achievement-card-image">` :
                    '<div class="achievement-icon">🏆</div>';
                
                const achievementDate = achievement.achievement_date ?
                    `<span class="achievement-date"><i class="fas fa-calendar"></i> ${new Date(achievement.achievement_date).toLocaleDateString()}</span>` : '';
                
                const category = achievement.category ?
                    `<span class="achievement-category"><i class="fas fa-tag"></i> ${achievement.category}</span>` : '';
                
                card.innerHTML = `
                    ${imageOrIcon}
                    <h3 class="achievement-title">${achievement.title}</h3>
                    <p class="achievement-description">${achievement.description}</p>
                    <div>
                        ${achievementDate}
                        ${category}
                    </div>
                `;
                
                container.appendChild(card);
            });
        };
    }
}

console.log('✅ Card overrides loaded with image support');
