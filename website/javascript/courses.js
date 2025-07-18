/* ========================================
   COURSES DATA MANAGEMENT
   ========================================
   
   This module handles all course-related functionality for the B - Study platform.
   It replaces hardcoded course data with dynamic content from the MongoDB API.
   
   Features:
   - Fetch courses from API
   - Render course cards dynamically
   - Handle course filtering and search
   - Manage course enrollment
   - Update course displays
   ======================================== */

// ========================================
// API CONFIGURATION
// ========================================

const API_BASE_URL = 'http://localhost:3000/api';
const COURSES_API = `${API_BASE_URL}/courses`;

// ========================================
// CACHE MANAGEMENT
// ========================================

/**
 * In-memory cache for courses data
 * Reduces API calls and improves performance
 */
const courseCache = {
    data: null,
    timestamp: null,
    cacheDuration: 5 * 60 * 1000, // 5 minutes
    
    /**
     * Check if cache is valid
     */
    isValid() {
        return this.data && 
               this.timestamp && 
               (Date.now() - this.timestamp) < this.cacheDuration;
    },
    
    /**
     * Set cache data
     */
    set(data) {
        this.data = data;
        this.timestamp = Date.now();
    },
    
    /**
     * Get cached data
     */
    get() {
        return this.data;
    },
    
    /**
     * Clear cache
     */
    clear() {
        this.data = null;
        this.timestamp = null;
    }
};

// ========================================
// API UTILITY FUNCTIONS
// ========================================

/**
 * Make API request with error handling
 * 
 * @param {string} url - API endpoint
 * @param {Object} options - Request options
 * @returns {Promise<Object>} - API response
 */
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

/**
 * Handle API errors gracefully
 * 
 * @param {Error} error - Error object
 * @param {string} context - Error context
 */
function handleApiError(error, context = 'API request') {
    console.error(`${context} failed:`, error);
    
    // Show user-friendly error message
    const errorMessage = error.message.includes('fetch') 
        ? 'لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.'
        : 'حدث خطأ في جلب البيانات. يرجى المحاولة مرة أخرى.';
    
    showNotification(errorMessage, 'error');
}

// ========================================
// COURSE DATA FETCHING
// ========================================

/**
 * Fetch all published courses
 * 
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Array>} - Array of courses
 */
async function fetchCourses(filters = {}) {
    try {
        // Check cache first
        if (courseCache.isValid()) {
            return courseCache.get();
        }
        
        // Build query parameters
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        
        const url = `${COURSES_API}?${params.toString()}`;
        const response = await apiRequest(url);
        
        if (response.success) {
            // Cache the results
            courseCache.set(response.data.courses);
            return response.data.courses;
        } else {
            throw new Error(response.message || 'Failed to fetch courses');
        }
    } catch (error) {
        handleApiError(error, 'Fetching courses');
        return [];
    }
}

/**
 * Fetch featured courses
 * 
 * @returns {Promise<Array>} - Array of featured courses
 */
async function fetchFeaturedCourses() {
    try {
        const response = await apiRequest(`${COURSES_API}/featured`);
        
        if (response.success) {
            return response.data;
        } else {
            throw new Error(response.message || 'Failed to fetch featured courses');
        }
    } catch (error) {
        handleApiError(error, 'Fetching featured courses');
        return [];
    }
}

/**
 * Fetch course categories
 * 
 * @returns {Promise<Array>} - Array of categories
 */
async function fetchCategories() {
    try {
        const response = await apiRequest(`${COURSES_API}/categories`);
        
        if (response.success) {
            return response.data;
        } else {
            throw new Error(response.message || 'Failed to fetch categories');
        }
    } catch (error) {
        handleApiError(error, 'Fetching categories');
        return [];
    }
}

/**
 * Fetch single course by ID
 * 
 * @param {string} courseId - Course ID
 * @returns {Promise<Object>} - Course object
 */
async function fetchCourseById(courseId) {
    try {
        const response = await apiRequest(`${COURSES_API}/${courseId}`);
        
        if (response.success) {
            return response.data;
        } else {
            throw new Error(response.message || 'Failed to fetch course');
        }
    } catch (error) {
        handleApiError(error, 'Fetching course');
        return null;
    }
}

// ========================================
// COURSE RENDERING FUNCTIONS
// ========================================

/**
 * Create course card HTML element
 * 
 * @param {Object} course - Course data
 * @returns {HTMLElement} - Course card element
 */
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course';
    card.dataset.courseId = course._id;
    
    // Format course data
    const duration = formatDuration(course.totalDuration);
    const price = course.isFree ? 'مجاني' : `${course.price} جنيه`;
    const instructorName = course.instructor?.name || 'غير محدد';
    
    card.innerHTML = `
        <!-- Course thumbnail image -->
        <div class="img-course">
            <img src="${course.thumbnail}" alt="${course.title}" />
        </div>
        
        <!-- Course metadata (duration, lessons, exams) -->
        <div class="info">
            <!-- Course duration -->
            <div class="time">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <path d="M7.9998 1.70813C11.6818 1.70813 14.6665 4.6928 14.6665 8.3748C14.6665 12.0568 11.6818 15.0415 7.9998 15.0415C4.3178 15.0415 1.33313 12.0568 1.33313 8.3748C1.33313 4.6928 4.3178 1.70813 7.9998 1.70813ZM7.9998 3.04146C6.58531 3.04146 5.22875 3.60337 4.22856 4.60356C3.22837 5.60375 2.66646 6.96031 2.66646 8.3748C2.66646 9.78928 3.22837 11.1458 4.22856 12.146C5.22875 13.1462 6.58531 13.7081 7.9998 13.7081C9.41428 13.7081 10.7708 13.1462 11.771 12.146C12.7712 11.1458 13.3331 9.78928 13.3331 8.3748C13.3331 6.96031 12.7712 5.60375 11.771 4.60356C10.7708 3.60337 9.41428 3.04146 7.9998 3.04146ZM7.9998 4.3748C8.16308 4.37482 8.32069 4.43477 8.44271 4.54327C8.56473 4.65178 8.64269 4.8013 8.6618 4.96346L8.66646 5.04146V8.0988L10.4711 9.90346C10.5907 10.0234 10.6601 10.1844 10.6653 10.3537C10.6705 10.523 10.611 10.6879 10.499 10.815C10.3869 10.942 10.2308 11.0217 10.0621 11.0377C9.89353 11.0538 9.72512 11.0051 9.59113 10.9015L9.52846 10.8461L7.52846 8.84613C7.42485 8.74243 7.3583 8.60746 7.33913 8.46213L7.33313 8.3748V5.04146C7.33313 4.86465 7.40337 4.69508 7.52839 4.57006C7.65342 4.44503 7.82299 4.3748 7.9998 4.3748Z" fill="#EEF4FA"/>
                    </svg>
                </div>
                <h5>${duration}</h5>
            </div>
            
            <!-- Number of lessons -->
            <div class="classes">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9.80737 6.77901L5.49137 4.62034C5.36936 4.55928 5.23376 4.53045 5.09746 4.53657C4.96117 4.5427 4.8287 4.58358 4.71265 4.65533C4.59661 4.72708 4.50084 4.82732 4.43446 4.94651C4.36807 5.06571 4.33328 5.1999 4.33337 5.33634V9.41367C4.33328 9.55011 4.36807 9.6843 4.43446 9.8035C4.50084 9.92269 4.59661 10.0229 4.71265 10.0947C4.8287 10.1664 4.96117 10.2073 5.09746 10.2134C5.23376 10.2196 5.36936 10.1907 5.49137 10.1297L9.80737 7.97101C9.91796 7.91558 10.0109 7.83048 10.0759 7.72522C10.1409 7.61997 10.1753 7.49871 10.1753 7.37501C10.1753 7.25131 10.1409 7.13005 10.0759 7.02479C10.0109 6.91953 9.91796 6.83443 9.80737 6.77901Z" stroke="#EEF4FA" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7 13.375C10.3137 13.375 13 10.6887 13 7.375C13 4.06129 10.3137 1.375 7 1.375C3.68629 1.375 1 4.06129 1 7.375C1 10.6887 3.68629 13.375 7 13.375Z" stroke="#EEF4FA"/>
                    </svg>
                </div>
                <h5>${course.lessonCount} محاضرة</h5>
            </div>
            
            <!-- Number of exams -->
            <div class="exams">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <path d="M5 4.875H7M5 8.375H11M5 10.375H11M5 12.375H7M4 14.875H12C12.2652 14.875 12.5196 14.7696 12.7071 14.5821C12.8946 14.3946 13 14.1402 13 13.875V2.875C13 2.60978 12.8946 2.35543 12.7071 2.16789C12.5196 1.98036 12.2652 1.875 12 1.875H4C3.73478 1.875 3.48043 1.98036 3.29289 2.16789C3.10536 2.35543 3 2.60978 3 2.875V13.875C3 14.1402 3.10536 14.3946 3.29289 14.5821C3.48043 14.7696 3.73478 14.875 4 14.875Z" stroke="#3B4459" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11 5.125C11.1381 5.125 11.25 5.01307 11.25 4.875C11.25 4.73693 11.1381 4.625 11 4.625C10.8619 4.625 10.75 4.73693 10.75 4.875C10.75 5.01307 10.8619 5.125 11 5.125Z" fill="#3B4459" stroke="#3B4459"/>
                    </svg>
                </div>
                <h5>${course.examCount} أمتحان</h5>
            </div>
        </div>
        
        <!-- Course title and description -->
        <div class="course-info">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
        </div>
        
        <!-- Course pricing and purchase button -->
        <div class="course-price">
            <a href="course-details.html?id=${course._id}" class="view-course">عرض الكورس</a>
            <span>${price}</span>
        </div>
    `;
    
    return card;
}

/**
 * Render courses in a container
 * 
 * @param {Array} courses - Array of courses
 * @param {string} containerSelector - CSS selector for container
 */
function renderCourses(courses, containerSelector = '.courses') {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error('Course container not found:', containerSelector);
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    if (courses.length === 0) {
        container.innerHTML = `
            <div class="no-courses">
                <h3 data-i18n="no-courses-title">لا توجد كورسات متاحة</h3>
                <p data-i18n="no-courses-desc">جاري العمل على إضافة كورسات جديدة</p>
            </div>
        `;
        if (window.languageManager) {
            window.languageManager.translatePage();
        }
        return;
    }
    
    // Render each course
    courses.forEach(course => {
        const card = createCourseCard(course);
        container.appendChild(card);
    });
}

/**
 * Render featured courses
 * 
 * @param {Array} courses - Array of featured courses
 */
function renderFeaturedCourses(courses) {
    renderCourses(courses, '.featured-courses');
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Format duration from minutes to readable format
 * 
 * @param {number} minutes - Duration in minutes
 * @returns {string} - Formatted duration
 */
function formatDuration(minutes) {
    if (!minutes || minutes === 0) return 'غير محدد';
    
    if (minutes < 60) {
        return `${minutes} دقيقة`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        
        if (remainingMinutes === 0) {
            return `${hours} ساعة`;
        } else {
            return `${hours} ساعة ${remainingMinutes} دقيقة`;
        }
    }
}

/**
 * Show notification to user
 * 
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, warning)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
}

/**
 * Initialize course functionality
 * Called when page loads
 */
async function initializeCourses() {
    try {
        // Show loading state
        const container = document.querySelector('.courses');
        if (container) {
            container.innerHTML = '<div class="loading">جاري تحميل الكورسات...</div>';
        }
        
        // Fetch and render courses
        const courses = await fetchCourses();
        renderCourses(courses);
        
        // Fetch and render featured courses if container exists
        const featuredContainer = document.querySelector('.featured-courses');
        if (featuredContainer) {
            const featuredCourses = await fetchFeaturedCourses();
            renderFeaturedCourses(featuredCourses);
        }
        
    } catch (error) {
        console.error('Error initializing courses:', error);
        showNotification('حدث خطأ في تحميل الكورسات', 'error');
    }
}

/**
 * Filter courses by category
 * 
 * @param {string} category - Category to filter by
 */
async function filterCoursesByCategory(category) {
    try {
        const courses = await fetchCourses({ category });
        renderCourses(courses);
        
        // Update active filter button
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-category="${category}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
    } catch (error) {
        console.error('Error filtering courses:', error);
        showNotification('حدث خطأ في تصفية الكورسات', 'error');
    }
}

/**
 * Search courses
 * 
 * @param {string} query - Search query
 */
async function searchCourses(query) {
    try {
        const courses = await fetchCourses({ search: query });
        renderCourses(courses);
        
    } catch (error) {
        console.error('Error searching courses:', error);
        showNotification('حدث خطأ في البحث', 'error');
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

/**
 * Set up event listeners for course functionality
 */
function setupEventListeners() {
    // Category filter buttons
    document.querySelectorAll('.category-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const category = btn.dataset.category;
            filterCoursesByCategory(category);
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.course-search');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length >= 2) {
                searchTimeout = setTimeout(() => {
                    searchCourses(query);
                }, 500);
            } else if (query.length === 0) {
                // Reset to all courses
                initializeCourses();
            }
        });
    }
    
    // Course card click handlers
    document.addEventListener('click', (e) => {
        const courseCard = e.target.closest('.course');
        if (courseCard) {
            const courseId = courseCard.dataset.courseId;
            if (courseId) {
                window.location.href = `course-details.html?id=${courseId}`;
            }
        }
    });
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeCourses();
    setupEventListeners();
});

// ========================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ========================================

// Make functions available globally
window.CourseManager = {
    fetchCourses,
    fetchFeaturedCourses,
    fetchCourseById,
    renderCourses,
    renderFeaturedCourses,
    filterCoursesByCategory,
    searchCourses,
    initializeCourses,
    showNotification
}; 