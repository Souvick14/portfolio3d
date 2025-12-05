// API Service - Handles all backend communication
const API_BASE_URL = 'https://web-production-87e81.up.railway.app/api';

class APIService {
    constructor() {
        this.cache = {};
    }

    async fetchData(endpoint) {
        // Return cached data if available
        if (this.cache[endpoint]) {
            return this.cache[endpoint];
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                // Cache the data
                this.cache[endpoint] = data.data;
                return data.data;
            } else {
                throw new Error(data.error || 'Failed to fetch data');
            }
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            throw error;
        }
    }

    async getAllData() {
        return this.fetchData('/all');
    }

    async getSkills() {
        return this.fetchData('/skills');
    }

    async getProjects(featured = null) {
        const endpoint = featured !== null ? `/projects?featured=${featured}` : '/projects';
        return this.fetchData(endpoint);
    }

    async getObjectives(status = null) {
        const endpoint = status ? `/objectives?status=${status}` : '/objectives';
        return this.fetchData(endpoint);
    }

    async getContact() {
        return this.fetchData('/contact');
    }

    async getDreams(category = null) {
        const endpoint = category ? `/dreams?category=${category}` : '/dreams';
        return this.fetchData(endpoint);
    }

    async getAchievements(category = null) {
        const endpoint = category ? `/achievements?category=${category}` : '/achievements';
        return this.fetchData(endpoint);
    }

    clearCache() {
        this.cache = {};
    }
}

// Create global API service instance
const apiService = new APIService();
