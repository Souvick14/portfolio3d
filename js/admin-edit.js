// Admin Edit Functionality
const editState = {
    currentType: '',
    currentId: '',
    currentData: {}
};

// Add edit buttons to list items
function addEditButtons() {
    // Skills
    document.querySelectorAll('.skill-item').forEach(item => {
        if (!item.querySelector('.edit-btn')) {
            const id = item.dataset.id;
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerHTML = '✏️';
            editBtn.onclick = () => editItem('skill', id, item);
            item.appendChild(editBtn);
        }
    });

    // Projects  
    document.querySelectorAll('.project-item').forEach(item => {
        if (!item.querySelector('.edit-btn')) {
            const id = item.dataset.id;
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerHTML = '✏️';
            editBtn.onclick = () => editItem('project', id, item);
            item.appendChild(editBtn);
        }
    });

    // Dreams
    document.querySelectorAll('.dream-item').forEach(item => {
        if (!item.querySelector('.edit-btn')) {
            const id = item.dataset.id;
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerHTML = '✏️';
            editBtn.onclick = () => editItem('dream', id, item);
            item.appendChild(editBtn);
        }
    });

    // Objectives
    document.querySelectorAll('.objective-item').forEach(item => {
        if (!item.querySelector('.edit-btn')) {
            const id = item.dataset.id;
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerHTML = '✏️';
            editBtn.onclick = () => editItem('objective', id, item);
            item.appendChild(editBtn);
        }
    });

    // Achievements
    document.querySelectorAll('.achievement-item').forEach(item => {
        if (!item.querySelector('.edit-btn')) {
            const id = item.dataset.id;
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerHTML = '✏️';
            editBtn.onclick = () => editItem('achievement', id, item);
            item.appendChild(editBtn);
        }
    });

    // Contact
    document.querySelectorAll('.contact-item').forEach(item => {
        if (!item.querySelector('.edit-btn')) {
            const id = item.dataset.id;
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerHTML = '✏️';
            editBtn.onclick = () => editItem('contact', id, item);
            item.appendChild(editBtn);
        }
    });
}

// Edit item
async function editItem(type, id, element) {
    editState.currentType = type;
    editState.currentId = id;

    // Get current data from API
    const API_BASE = 'https://web-production-87e81.up.railway.app/api';
    try {
        const response = await fetch(`${API_BASE}/${type}s/${id}`);
        const data = await response.json();
        editState.currentData = data.data || data;

        // Show edit modal with current data
        showEditModal(type, editState.currentData);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to load data for editing');
    }
}

// Show edit modal
function showEditModal(type, data) {
    const modal = document.getElementById('edit-modal') || createEditModal();
    const form = document.getElementById('edit-form');
    
    // Build form based on type
    form.innerHTML = buildEditForm(type, data);
    
    modal.style.display = 'block';
}

// Create edit modal if it doesn't exist
function createEditModal() {
    const modal = document.createElement('div');
    modal.id = 'edit-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeEditModal()">&times;</span>
            <h2>Edit Item</h2>
            <form id="edit-form"></form>
            <div class="modal-buttons">
                <button onclick="saveEdit()" class="btn-save">Save</button>
                <button onclick="closeEditModal()" class="btn-cancel">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Build edit form HTML
function buildEditForm(type, data) {
    let html = '';
    
    for (let key in data) {
        if (key === '_id' || key === '__v' || key === 'createdAt' || key === 'updatedAt') continue;
        
        const value = data[key];
        const label = key.replace(/_/g, ' ').toUpperCase();
        
        if (typeof value === 'boolean') {
            html += `
                <label>
                    <input type="checkbox" name="${key}" ${value ? 'checked' : ''}> ${label}
                </label>
            `;
        } else if (key.includes('date')) {
            html += `
                <label>${label}:
                    <input type="date" name="${key}" value="${value ? new Date(value).toISOString().split('T')[0] : ''}">
                </label>
            `;
        } else if (key === 'description' || key.length > 50) {
            html += `
                <label>${label}:
                    <textarea name="${key}" rows="3">${value || ''}</textarea>
                </label>
            `;
        } else if (Array.isArray(value)) {
            html += `
                <label>${label} (comma-separated):
                    <input type="text" name="${key}" value="${value.join(', ')}">
                </label>
            `;
        } else {
            html += `
                <label>${label}:
                    <input type="text" name="${key}" value="${value || ''}">
                </label>
            `;
        }
    }
    
    return html;
}

// Save edited data
async function saveEdit() {
    const form = document.getElementById('edit-form');
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
        // Handle arrays
        if (editState.currentData[key] && Array.isArray(editState.currentData[key])) {
            data[key] = value.split(',').map(v => v.trim());
        }
        // Handle booleans
        else if (typeof editState.currentData[key] === 'boolean') {
            data[key] = form.querySelector(`[name="${key}"]`).checked;
        }
        // Handle numbers
        else if (typeof editState.currentData[key] === 'number') {
            data[key] = parseFloat(value) || 0;
        }
        // Handle strings
        else {
            data[key] = value;
        }
    });

    const API_BASE = 'https://web-production-87e81.up.railway.app/api';
    
    try {
        const response = await fetch(`${API_BASE}/${editState.currentType}s/${editState.currentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Updated successfully!');
            closeEditModal();
            location.reload(); // Reload to show updated data
        } else {
            alert('Failed to update');
        }
    } catch (error) {
        console.error('Error updating:', error);
        alert('Error updating data');
    }
}

// Close edit modal
function closeEditModal() {
    const modal = document.getElementById('edit-modal');
    if (modal) modal.style.display = 'none';
}

// Initialize - add edit buttons when data loads
document.addEventListener('DOMContentLoaded', () => {
    // Add observer to detect when lists are populated
    const observer = new MutationObserver(() => {
        addEditButtons();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

console.log('✅ Admin edit functionality loaded');
