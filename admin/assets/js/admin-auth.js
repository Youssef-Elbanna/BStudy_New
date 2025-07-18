// ========================================
// ADMIN AUTHENTICATION JAVASCRIPT
// ========================================

// Utility function to get environment variables from window.ENV or fallback
function getEnvVar(key, fallback = '') {
    if (window.ENV && window.ENV[key]) {
        return window.ENV[key];
    }
    return fallback;
}

class AdminAuth {
    constructor() {
        // Use API base URL and endpoint from environment variables
        this.apiBase = getEnvVar('API_BASE_URL', 'http://localhost:3000/api');
        this.loginEndpoint = getEnvVar('ADMIN_LOGIN_ENDPOINT', '/admin/auth/login');
        this.tokenKey = 'admin_token';
        this.userKey = 'admin_user';
        this.init();
    }

    init() {
        // Check if user is already logged in
        const token = this.getToken();
        if (token) {
            this.redirectToDashboard();
        }

        // Add event listeners
        this.addEventListeners();
    }

    addEventListeners() {
        // Attach submit event to login form
        const loginForm = document.querySelector('form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
    }

    async handleLogin() {
        // Get email and password from form fields
        const email = document.getElementById('exampleInputEmail').value;
        const password = document.getElementById('exampleInputPassword').value;

        if (!email || !password) {
            this.showNotification('يرجى إدخال البريد الإلكتروني وكلمة المرور', 'error');
            return;
        }

        try {
            // Send login request to API
            const response = await fetch(`${this.apiBase}${this.loginEndpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            // Check for successful login (token in response)
            if (data.token) {
                // Store token (and optionally user data if available)
                localStorage.setItem(this.tokenKey, data.token);
                if (data.user) {
                    localStorage.setItem(this.userKey, JSON.stringify(data.user));
                }
                this.showNotification('تم تسجيل الدخول بنجاح', 'success');
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard-admin.html';
                }, 1000);
            } else {
                this.showNotification(data.message || 'فشل في تسجيل الدخول', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showNotification('خطأ في الاتصال بالخادم', 'error');
        }
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    getUser() {
        const user = localStorage.getItem(this.userKey);
        return user ? JSON.parse(user) : null;
    }

    isLoggedIn() {
        return !!this.getToken();
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        window.location.href = 'login.html';
    }

    redirectToDashboard() {
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'dashboard-admin.html';
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Initialize admin auth when DOM is loaded
// This ensures the login logic is ready as soon as the page loads

document.addEventListener('DOMContentLoaded', () => {
    new AdminAuth();
}); 