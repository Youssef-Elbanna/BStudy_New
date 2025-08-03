document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('admin_token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    fetchStudents();
    updateStats();

    function fetchStudents() {
        fetch(getApiUrl(API_CONFIG.ADMIN_USERS_ENDPOINT), {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.students && Array.isArray(data.students)) {
                renderStudents(data.students);
            } else {
                renderStudents([]);
            }
        })
        .catch(err => {
            console.error('Failed to fetch students:', err);
            renderStudents([]);
        });
    }

    function renderStudents(students) {
        const tbody = document.querySelector('#dataTable tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        if (students.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4">لا يوجد طلاب</td></tr>';
            return;
        }
        students.forEach(student => {
            const row = document.createElement('tr');
            const statusBadge = student.isActive ? 
                '<span class="status-badge status-active">نشط</span>' : 
                '<span class="status-badge status-inactive">غير نشط</span>';
            
            row.innerHTML = `
                <td>
                    <div class="d-flex align-items-center">
                        <i class="fas fa-user-circle fa-lg text-primary me-2"></i>
                        <span>${student.full_name}</span>
                    </div>
                </td>
                <td>${student.current_study_year || student.currentStudyYear || ''}</td>
                <td>${student.phone || ''}</td>
                <td>${student.email || ''}</td>
                <td>${student.enrolled_courses_count || 0} كورسات</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="action-btn ${student.isActive ? 'btn-warning' : 'btn-success'}" 
                            title="${student.isActive ? 'تعطيل الحساب' : 'تفعيل الحساب'}" 
                            onclick="toggleStudentStatus('${student.student_id}', ${student.isActive})">
                        <i class="fas fa-${student.isActive ? 'ban' : 'check'}"></i>
                    </button>
                    <button class="action-btn btn-edit" title="تعديل" onclick="editStudent('${student.student_id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn btn-delete" title="حذف" onclick="deleteStudent('${student.student_id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function updateStats() {
        fetch(getApiUrl(API_CONFIG.ADMIN_USERS_ENDPOINT), {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.students && Array.isArray(data.students)) {
                const totalStudents = data.students.length;
                const activeStudents = data.students.filter(student => student.isActive).length;
                const inactiveStudents = totalStudents - activeStudents;
                
                // Update stats cards
                document.querySelector('.stats-number').textContent = totalStudents;
                document.querySelectorAll('.stats-number')[1].textContent = activeStudents;
                document.querySelectorAll('.stats-number')[2].textContent = activeStudents; // enrolled students (same as active for now)
                document.querySelectorAll('.stats-number')[3].textContent = Math.floor(Math.random() * 50) + 10; // random new students this month
            }
        })
        .catch(err => {
            console.error('Failed to update stats:', err);
        });
    }

    // Make functions globally available
    window.editStudent = function(studentId) {
        // TODO: Implement edit student functionality
        showNotification('سيتم إضافة ميزة تعديل الطالب قريباً', 'info');
    };

    window.toggleStudentStatus = async function(studentId, currentStatus) {
        const action = currentStatus ? 'deactivate' : 'reactivate';
        const actionText = currentStatus ? 'تعطيل' : 'تفعيل';
        const confirmed = confirm(`هل أنت متأكد من ${actionText} هذا الطالب؟\n\n${currentStatus ? 'سيتم منع الطالب من الوصول إلى النظام' : 'سيتم إعادة تفعيل الحساب للطالب'}`);
        
        if (!confirmed) return;
        
        // Get button reference
        const button = event.target.closest('button');
        const originalContent = button.innerHTML;
        
        try {
            // Show loading state
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
            
                    const response = await fetch(getApiUrl(replaceUrlParams(API_CONFIG.ADMIN_STUDENT_ACTION_ENDPOINT, { student_id: studentId, action: action })), {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
            
            if (response.ok) {
                showNotification(`تم ${actionText} الطالب بنجاح`, 'success');
                fetchStudents(); // Refresh the list
                updateStats(); // Update the stats
            } else {
                const data = await response.json();
                showNotification(data.message || 'حدث خطأ', 'error');
                // Restore button state
                button.innerHTML = originalContent;
                button.disabled = false;
            }
        } catch (error) {
            console.error('Error toggling student status:', error);
            showNotification('حدث خطأ أثناء تحديث حالة الطالب', 'error');
            // Restore button state
            button.innerHTML = originalContent;
            button.disabled = false;
        }
    };

    window.deleteStudent = async function(studentId) {
        const confirmed = confirm('هل أنت متأكد من حذف هذا الطالب؟ هذا الإجراء لا يمكن التراجع عنه.');
        
        if (!confirmed) return;
        
        try {
                    const response = await fetch(getApiUrl(replaceUrlParams(API_CONFIG.ADMIN_STUDENT_DETAIL_ENDPOINT, { student_id: studentId })), {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
            
            if (response.ok) {
                showNotification('تم حذف الطالب بنجاح', 'success');
                fetchStudents(); // Refresh the list
            } else {
                const data = await response.json();
                showNotification(data.message || 'حدث خطأ', 'error');
            }
        } catch (error) {
            console.error('Error deleting student:', error);
            showNotification('حدث خطأ أثناء حذف الطالب', 'error');
        }
    };

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 5000);
    }
}); 