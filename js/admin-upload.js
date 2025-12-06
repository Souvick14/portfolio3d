// File upload handler for admin panel
async function uploadImageFile(fileInput) {
    const file = fileInput.files[0];
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file);  // FIXED: Changed from 'image' to 'file'

    try {
        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (data.success) {
            return data.url;
        } else {
            throw new Error(data.error || 'Upload failed');
        }
    } catch (error) {
        console.error('Upload error:', error);
        showAlert('❌ Upload failed: ' + error.message, 'error');
        return null;
    }
}

// Modify the addItem function to handle file uploads for ALL sections
const originalAddItem = window.addItem;
window.addItem = async function(e, type) {
    e.preventDefault();
    
    // Check if this section supports file uploads
    const sectionsWithUploads = ['dreams', 'achievements', 'projects', 'skills'];
    if (sectionsWithUploads.includes(type)) {
        // Try to find file input - could be named 'image' or 'icon'
        let fileInput = e.target.querySelector('input[type="file"][name="image"]');
        if (!fileInput) {
            fileInput = e.target.querySelector('input[type="file"][name="icon"]');
        }
        
        // If file was selected, upload it first
        if (fileInput && fileInput.files.length > 0) {
            showAlert('⏳ Uploading file...', 'success');
            
            const fileUrl = await uploadImageFile(fileInput);
            if (!fileUrl) {
                return; // Upload failed, don't proceed
            }
            
            // Add the file URL to the form data
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            // Use icon_url for skills, image_url for others
            hiddenInput.name = (type === 'skills') ? 'icon_url' : 'image_url';
            hiddenInput.value = fileUrl;
            e.target.appendChild(hiddenInput);
            
            // Remove the file input so it doesn't interfere with FormData
            fileInput.remove();
        }
    }
    
    // Call the original addItem function
    return originalAddItem.call(this, e, type);
};

console.log('✅ File upload handler loaded');
