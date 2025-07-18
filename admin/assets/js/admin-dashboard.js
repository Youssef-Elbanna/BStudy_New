// ========================================
// ADMIN DASHBOARD JAVASCRIPT
// ========================================

class AdminDashboard {
    constructor() {
        this.apiBase = 'http://localhost:3000/api';
        this.tokenKey = 'admin_token';
        this.userKey = 'admin_user';
        this.init();
    }

    init() {
        // Check authentication
        if (!this.isLoggedIn()) {
            this.redirectToLogin();
            return;
        }

        // Load dashboard data
        this.loadDashboardData();
        
        // Add event listeners
        this.addEventListeners();
        
        // Update user info
        this.updateUserInfo();
    }

    addEventListeners() {
        // Logout button
        const logoutBtn = document.querySelector('[data-logout]');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Navigation links
        const navLinks = document.querySelectorAll('[data-nav]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-nav');
                this.navigateTo(page);
            });
        });
    }

    async loadDashboardData() {
        try {
            // Load statistics
            await this.loadStats();
            
            // Load recent courses
            await this.loadRecentCourses();
            
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            this.showNotification('خطأ في تحميل البيانات', 'error');
        }
    }

    async loadStats() {
        try {
            const response = await fetch(`${this.apiBase}/admin/stats`, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });

            const data = await response.json();

            if (data.success) {
                this.updateStats(data.data);
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    updateStats(stats) {
        // Update statistics cards
        const elements = {
            totalUsers: document.querySelector('[data-stat="totalUsers"]'),
            totalCourses: document.querySelector('[data-stat="totalCourses"]'),
            totalRevenue: document.querySelector('[data-stat="totalRevenue"]'),
            monthlyRevenue: document.querySelector('[data-stat="monthlyRevenue"]'),
            activeUsers: document.querySelector('[data-stat="activeUsers"]'),
            newUsersThisMonth: document.querySelector('[data-stat="newUsersThisMonth"]'),
            totalEnrollments: document.querySelector('[data-stat="totalEnrollments"]'),
            averageRating: document.querySelector('[data-stat="averageRating"]')
        };

        // Update each stat if element exists
        Object.keys(elements).forEach(key => {
            if (elements[key] && stats[key] !== undefined) {
                if (key.includes('Revenue')) {
                    elements[key].textContent = `$${stats[key].toLocaleString()}`;
                } else if (key === 'averageRating') {
                    elements[key].textContent = stats[key].toFixed(1);
                } else {
                    elements[key].textContent = stats[key].toLocaleString();
                }
            }
        });
    }

    async loadRecentCourses() {
        try {
            const response = await fetch('http://localhost:3000/api/public/courses');
            const data = await response.json();
            if (Array.isArray(data)) {
                this.updateCoursesTable(data);
            } else {
                this.updateCoursesTable([]);
            }
        } catch (error) {
            console.error('Error loading courses:', error);
            this.updateCoursesTable([]);
        }
    }

    updateCoursesTable(courses) {
        const tbody = document.querySelector('#dataTable tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        if (courses.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7">لا يوجد كورسات</td></tr>';
            return;
        }
        courses.forEach(course => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.course_name}</td>
                <td>${course.description || ''}</td>
                <td>${course.credits || ''}</td>
                <td>${course.price || ''}</td>
                <td>---</td>
                <td>---</td>
                <td><button class="btn btn-primary btn-sm">تعديل</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    updateUserInfo() {
        const user = this.getUser();
        if (user) {
            const userNameElement = document.querySelector('.img-profile + span');
            if (userNameElement) {
                userNameElement.textContent = user.name || 'مدير النظام';
            }
        }
    }

    editCourse(courseId) {
        // Navigate to edit course page
        window.location.href = `add-course.html?id=${courseId}`;
    }

    navigateTo(page) {
        window.location.href = `${page}.html`;
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

    redirectToLogin() {
        window.location.href = 'login.html';
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

// Initialize admin dashboard when DOM is loaded
let adminDashboard;
document.addEventListener('DOMContentLoaded', () => {
    adminDashboard = new AdminDashboard();
}); 