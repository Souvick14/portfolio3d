// Admin Password Authentication
(function() {
    const ADMIN_PASSWORD = 'sou@1029384756';
    const AUTH_KEY = 'portfolio_admin_authenticated';

    // Check if already authenticated
    function checkAuth() {
        return sessionStorage.getItem(AUTH_KEY) === 'true';
    }

    // Show password modal
    function showPasswordModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.style.display = 'flex';
            document.getElementById('password-input').focus();
        }
    }

    // Hide password modal
    function hidePasswordModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Verify password
    function verifyPassword() {
        const input = document.getElementById('password-input');
        const error = document.getElementById('password-error');
        const enteredPassword = input.value;

        if (enteredPassword === ADMIN_PASSWORD) {
            sessionStorage.setItem(AUTH_KEY, 'true');
            hidePasswordModal();
            error.style.display = 'none';
            input.value = '';
        } else {
            error.style.display = 'block';
            error.textContent = '❌ Incorrect password. Please try again.';
            input.value = '';
            input.focus();
        }
    }

    // Initialize on page load
    window.addEventListener('DOMContentLoaded', function() {
        // Create auth modal if doesn't exist
        if (!document.getElementById('auth-modal')) {
            const modalHTML = `
                <div id="auth-modal" class="auth-modal">
                    <div class="auth-modal-content">
                        <h2>🔐 Admin Access Required</h2>
                        <p>Please enter the admin password to continue</p>
                        <input 
                            type="password" 
                            id="password-input" 
                            placeholder="Enter password"
                            autocomplete="off"
                        >
                        <div id="password-error" class="password-error"></div>
                        <button onclick="window.adminAuth.verify()" class="auth-submit-btn">
                            Unlock Admin Panel
                        </button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        // Check authentication
        if (!checkAuth()) {
            showPasswordModal();
        }

        // Enter key support
        document.getElementById('password-input')?.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verifyPassword();
            }
        });
    });

    // Expose verify function globally
    window.adminAuth = {
        verify: verifyPassword,
        logout: function() {
            sessionStorage.removeItem(AUTH_KEY);
            location.reload();
        }
    };

    console.log('🔐 Admin authentication loaded');
})();
