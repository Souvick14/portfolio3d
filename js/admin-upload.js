// File upload handler for admin panel
async function uploadImageFile(fileInput) {
    const file = fileInput.files[0];
    if (!file) return null;

    const formData = new FormData();
    formData.append('image', file);

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
        showAlert('❌ Image upload failed: ' + error.message, 'error');
        return null;
    }
}

// Modify the addItem function to handle file uploads
const originalAddItem = window.addItem;
window.addItem = async function(e, type) {
    e.preventDefault();
    
    // Check if this is Dreams or Achievements (sections with image support)
    if (type === 'dreams' || type === 'achievements') {
        const fileInput = e.target.querySelector('input[type="file"][name="image"]');
        
        // If file was selected, upload it first
        if (fileInput && fileInput.files.length > 0) {
            showAlert('⏳ Uploading image...', 'success');
            
            const imageUrl = await uploadImageFile(fileInput);
            if (!imageUrl) {
                return; // Upload failed, don't proceed
            }
            
            // Add the image URL to the form data
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'image_url';
            hiddenInput.value = imageUrl;
            e.target.appendChild(hiddenInput);
            
            // Remove the file input so it doesn't interfere with FormData
            fileInput.remove();
        }
    }
    
    // Call the original addItem function
    return originalAddItem.call(this, e, type);
};

console.log('✅ File upload handler loaded');
