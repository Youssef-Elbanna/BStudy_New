// Dashboard My Courses JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadMyCourses();
    // loadVideoViewHistory(); // Commented out video view history loading
    
    // Add event listener for view history filter
    const viewHistoryFilter = document.getElementById('viewHistoryFilter');
    if (viewHistoryFilter) {
        viewHistoryFilter.addEventListener('change', function() {
            filterVideoViewHistory();
        });
    }
});

async function loadMyCourses() {
    try {
        const token = localStorage.getItem('student_token');
        if (!token) {
            console.log('No token found');
            renderMyCourses([]);
            return;
        }
        
        console.log('Loading my courses with token:', token.substring(0, 20) + '...');
        
        const response = await fetch('http://localhost:3000/api/student/courses/mycourses?_t=' + Date.now(), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Response status:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('Response data:', data);
            
            if (data.message) {
                // No courses found
                console.log('No courses message:', data.message);
                renderMyCourses([]);
            } else {
                renderMyCourses(data.courses || []);
            }
        } else {
            const errorData = await response.json().catch(() => ({}));
            console.error('Failed to load my courses:', response.status, errorData);
            renderMyCourses([]);
        }
    } catch (error) {
        console.error('Error loading my courses:', error);
        renderMyCourses([]);
    }
}

function renderMyCourses(courses) {
    const container = document.getElementById('my-courses-container');
    if (!container) return;
    
    // Update the enrolled courses count
    const enrolledCountElement = document.getElementById('enrolled-courses-count');
    if (enrolledCountElement) {
        enrolledCountElement.textContent = courses.length;
    }
    
    if (courses.length === 0) {
        container.innerHTML = '<div class="no-courses" style="text-align: center; padding: 40px; color: #666;">لا توجد كورسات مسجلة</div>';
        return;
    }
    
    container.innerHTML = courses.map(course => `
        <div class="course" onclick="window.location.href='course-enrolling.html?courseId=${course.id}'" style="cursor: pointer;">
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.description || ''}</p>
            </div>
            <div class="course-meta" style="display: flex; gap: 12px; margin-top: 10px;">
                <span style="background: #EEF4FA; border-radius: 8px; padding: 4px 12px; color: #2E6FF4; font-weight: 600;">عدد الساعات: ${course.credits}</span>
                <span style="background: #F4CB3C; border-radius: 8px; padding: 4px 12px; color: #fff; font-weight: 600;">السعر: ${course.price} جنيه</span>
            </div>
            <div style="margin-top: 8px;">
                <a href="course-enrolling.html?courseId=${course.id}" onclick="event.stopPropagation();" style="background: linear-gradient(282deg, #1031D0 0%, #2E6FF4 50%, #89BAF8 100%); color: #fff; padding: 8px 24px; border-radius: 20px; text-decoration: none; font-weight: 600; font-size: 1rem;">عرض الكورس</a>
            </div>
        </div>
    `).join('');
}

async function loadVideoViewHistory() {
    try {
        const token = localStorage.getItem('student_token');
        if (!token) {
            console.log('No token found');
            return;
        }
        
        const response = await fetch('http://localhost:3000/api/student/videos/my-view-history', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            window.videoViewHistory = data.views || [];
            renderVideoViewHistory(window.videoViewHistory);
        } else {
            console.error('Failed to load video view history');
        }
    } catch (error) {
        console.error('Error loading video view history:', error);
    }
}

function renderVideoViewHistory(views) {
    const tbody = document.getElementById('viewHistoryTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (views.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #666;">لا توجد مشاهدات</td></tr>';
        return;
    }
    
    views.forEach(view => {
        const row = document.createElement('tr');
        const statusBadge = view.is_limit_reached ? 
            '<span style="background: #dc3545; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">وصل للحد</span>' : 
            '<span style="background: #28a745; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">متاح</span>';
        
        const lastWatchedDate = view.last_watched_at ? 
            new Date(view.last_watched_at).toLocaleString('ar-EG') : 
            'غير محدد';
        
        row.innerHTML = `
            <td>${view.video_title || 'غير محدد'}</td>
            <td>${view.course_name || 'غير محدد'}</td>
            <td>${view.view_count}/3</td>
            <td>${lastWatchedDate}</td>
            <td>${statusBadge}</td>
        `;
        tbody.appendChild(row);
    });
}

function filterVideoViewHistory() {
    const filterValue = document.getElementById('viewHistoryFilter')?.value || 'all';
    let filteredViews = [...(window.videoViewHistory || [])];
    
    switch (filterValue) {
        case 'recent':
            filteredViews.sort((a, b) => new Date(b.last_viewed_at) - new Date(a.last_viewed_at));
            break;
        case 'limit-reached':
            filteredViews = filteredViews.filter(view => view.is_limit_reached);
            break;
        default:
            // Show all
            break;
    }
    
    renderVideoViewHistory(filteredViews);
} 