-- Portfolio Database Schema
-- Drop existing tables if they exist
DROP TABLE IF EXISTS lifetime_achievements CASCADE;
DROP TABLE IF EXISTS lifetime_dreams CASCADE;
DROP TABLE IF EXISTS contact_info CASCADE;
DROP TABLE IF EXISTS objectives CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skills CASCADE;

-- Skills Table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- e.g., 'Frontend', 'Backend', 'Database', 'Tools'
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 0 AND 100),
    icon_url VARCHAR(255),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[], -- Array of technologies used
    github_url VARCHAR(255),
    demo_url VARCHAR(255),
    image_url VARCHAR(255),
    featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Objectives Table
CREATE TABLE objectives (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    target_date DATE,
    priority INTEGER CHECK (priority BETWEEN 1 AND 5), -- 1 = highest priority
    status VARCHAR(50) DEFAULT 'in-progress', -- 'in-progress', 'completed', 'planned'
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Information Table
CREATE TABLE contact_info (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL, -- e.g., 'email', 'phone', 'linkedin', 'github'
    value VARCHAR(255) NOT NULL,
    icon VARCHAR(100), -- Icon class or name
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lifetime Dreams Table
CREATE TABLE lifetime_dreams (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100), -- e.g., 'Career', 'Personal', 'Travel', 'Learning'
    image_url VARCHAR(255),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lifetime Achievements Table
CREATE TABLE lifetime_achievements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    achievement_date DATE,
    category VARCHAR(100), -- e.g., 'Education', 'Career', 'Personal', 'Awards'
    image_url VARCHAR(255),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_objectives_status ON objectives(status);
CREATE INDEX idx_contact_active ON contact_info(is_active);
CREATE INDEX idx_dreams_category ON lifetime_dreams(category);
CREATE INDEX idx_achievements_category ON lifetime_achievements(category);
CREATE INDEX idx_achievements_date ON lifetime_achievements(achievement_date);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_objectives_updated_at BEFORE UPDATE ON objectives
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dreams_updated_at BEFORE UPDATE ON lifetime_dreams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON lifetime_achievements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
