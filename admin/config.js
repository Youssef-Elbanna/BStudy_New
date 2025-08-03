// API Configuration
const ENV = {
    // Development environment
    development: {
        API_BASE_URL: "http://localhost:3000/api",
        
        // Admin Authentication
        ADMIN_LOGIN_ENDPOINT: "/admin/auth/login",
        ADMIN_LOGOUT_ENDPOINT: "/admin/auth/logout",
        
        // Admin Courses
        ADMIN_COURSES_ENDPOINT: "/admin/courses",
        ADMIN_COURSE_DETAIL_ENDPOINT: "/admin/courses/{course_id}",
        ADMIN_COURSE_UPDATE_ENDPOINT: "/admin/courses/{course_id}",
        ADMIN_COURSE_DELETE_ENDPOINT: "/admin/courses/{course_id}",
        ADMIN_COURSE_ENROLL_STUDENT_ENDPOINT: "/admin/courses/{course_id}/students/{student_id}/enroll",
        ADMIN_ADD_VIDEO_ENDPOINT: "/admin/courses/{course_id}/videos",
        
        // Admin Students
        ADMIN_STUDENTS_ENDPOINT: "/admin/students",
        ADMIN_STUDENT_DETAIL_ENDPOINT: "/admin/students/{student_id}",
        ADMIN_STUDENT_ACTION_ENDPOINT: "/admin/students/{student_id}/{action}",
        
        // Admin Users
        ADMIN_USERS_ENDPOINT: "/admin/auth/users",
        
        // Admin Video Views
        ADMIN_VIDEO_VIEWS_ENDPOINT: "/admin/video-views/all",
        ADMIN_VIDEO_VIEW_RESET_ENDPOINT: "/admin/video-views/reset/{view_id}",
        ADMIN_VIDEO_VIEW_DELETE_ENDPOINT: "/admin/video-views/delete/{view_id}",
        
        // Admin Promo Codes
        ADMIN_PROMO_CODES_ENDPOINT: "/admin/courses/promo",
        
        // Public Endpoints
        PUBLIC_COURSES_ENDPOINT: "/public/courses",
        PUBLIC_VIDEOS_ENDPOINT: "/public/videos/{video_id}",
        
        // Student Endpoints
        STUDENT_REGISTER_ENDPOINT: "/student/register",
        STUDENT_LOGIN_ENDPOINT: "/student/login",
        STUDENT_LOGOUT_ENDPOINT: "/student/logout",
        STUDENT_MY_COURSES_ENDPOINT: "/student/courses/mycourses",
        STUDENT_VIDEO_VIEW_HISTORY_ENDPOINT: "/student/videos/my-view-history",
        STUDENT_VIDEO_VIEW_STATUS_ENDPOINT: "/student/videos/{video_id}/view-status",
        STUDENT_VIDEO_WATCH_ENDPOINT: "/student/videos/{video_id}/watch",
        STUDENT_PROFILE_DELETE_ACCOUNT_ENDPOINT: "/student/profile/delete-account",
        STUDENT_PROFILE_ME_ENDPOINT: "/student/profile/me",
        STUDENT_CART_ENDPOINT: "/student/courses/cart",
        STUDENT_CART_ADD_ENDPOINT: "/student/courses/cart/add",
        STUDENT_CART_REMOVE_ENDPOINT: "/student/courses/cart/remove",
        STUDENT_PAYMENT_PROCESS_ENDPOINT: "/student/courses/payment/process",
        STUDENT_VALIDATE_PROMO_ENDPOINT: "/student/validate-promo",
        STUDENT_VIDEO_PLAYER_ENDPOINT: "/student/videos/{video_id}/player",
        STUDENT_PURCHASE_COURSE_ENDPOINT: "/admin/courses/purchase"
    },
    // Production environment
    production: {
        API_BASE_URL: "https://your-production-domain.com/api", // Change this to your production URL
        
        // Admin Authentication
        ADMIN_LOGIN_ENDPOINT: "/admin/auth/login",
        ADMIN_LOGOUT_ENDPOINT: "/admin/auth/logout",
        
        // Admin Courses
        ADMIN_COURSES_ENDPOINT: "/admin/courses",
        ADMIN_COURSE_DETAIL_ENDPOINT: "/admin/courses/{course_id}",
        ADMIN_COURSE_UPDATE_ENDPOINT: "/admin/courses/{course_id}",
        ADMIN_COURSE_DELETE_ENDPOINT: "/admin/courses/{course_id}",
        ADMIN_COURSE_ENROLL_STUDENT_ENDPOINT: "/admin/courses/{course_id}/students/{student_id}/enroll",
        ADMIN_ADD_VIDEO_ENDPOINT: "/admin/courses/{course_id}/videos",
        
        // Admin Students
        ADMIN_STUDENTS_ENDPOINT: "/admin/students",
        ADMIN_STUDENT_DETAIL_ENDPOINT: "/admin/students/{student_id}",
        ADMIN_STUDENT_ACTION_ENDPOINT: "/admin/students/{student_id}/{action}",
        
        // Admin Users
        ADMIN_USERS_ENDPOINT: "/admin/auth/users",
        
        // Admin Video Views
        ADMIN_VIDEO_VIEWS_ENDPOINT: "/admin/video-views/all",
        ADMIN_VIDEO_VIEW_RESET_ENDPOINT: "/admin/video-views/reset/{view_id}",
        ADMIN_VIDEO_VIEW_DELETE_ENDPOINT: "/admin/video-views/delete/{view_id}",
        
        // Admin Promo Codes
        ADMIN_PROMO_CODES_ENDPOINT: "/admin/courses/promo",
        
        // Public Endpoints
        PUBLIC_COURSES_ENDPOINT: "/public/courses",
        PUBLIC_VIDEOS_ENDPOINT: "/public/videos/{video_id}",
        
        // Student Endpoints
        STUDENT_REGISTER_ENDPOINT: "/student/register",
        STUDENT_LOGIN_ENDPOINT: "/student/login",
        STUDENT_LOGOUT_ENDPOINT: "/student/logout",
        STUDENT_MY_COURSES_ENDPOINT: "/student/courses/mycourses",
        STUDENT_VIDEO_VIEW_HISTORY_ENDPOINT: "/student/videos/my-view-history",
        STUDENT_VIDEO_VIEW_STATUS_ENDPOINT: "/student/videos/{video_id}/view-status",
        STUDENT_VIDEO_WATCH_ENDPOINT: "/student/videos/{video_id}/watch",
        STUDENT_PROFILE_DELETE_ACCOUNT_ENDPOINT: "/student/profile/delete-account",
        STUDENT_PROFILE_ME_ENDPOINT: "/student/profile/me",
        STUDENT_CART_ENDPOINT: "/student/courses/cart",
        STUDENT_CART_ADD_ENDPOINT: "/student/courses/cart/add",
        STUDENT_CART_REMOVE_ENDPOINT: "/student/courses/cart/remove",
        STUDENT_PAYMENT_PROCESS_ENDPOINT: "/student/courses/payment/process",
        STUDENT_VALIDATE_PROMO_ENDPOINT: "/student/validate-promo",
        STUDENT_VIDEO_PLAYER_ENDPOINT: "/student/videos/{video_id}/player",
        STUDENT_PURCHASE_COURSE_ENDPOINT: "/admin/courses/purchase"
    }
};

// Detect environment (you can change this to 'production' when deploying)
const CURRENT_ENV = 'development';

// Export the current environment configuration
const API_CONFIG = ENV[CURRENT_ENV];

// Helper function to get full API URL
function getApiUrl(endpoint) {
    return API_CONFIG.API_BASE_URL + endpoint;
}

// Helper function to replace URL parameters
function replaceUrlParams(url, params) {
    let result = url;
    for (const [key, value] of Object.entries(params)) {
        result = result.replace(`{${key}}`, value);
    }
    return result;
}
  