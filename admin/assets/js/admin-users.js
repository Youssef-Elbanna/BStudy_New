document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('admin_token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    fetchStudents();

    function fetchStudents() {
        fetch('http://localhost:3000/api/admin/auth/users', {
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
            tbody.innerHTML = '<tr><td colspan="6">لا يوجد طلاب</td></tr>';
            return;
        }
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.full_name}</td>
                <td>${student.current_study_year || ''}</td>
                <td>${student.phone || ''}</td>
                <td>${student.email || ''}</td>
                <td>---</td>
                <td><button class="btn btn-primary btn-sm">تعديل</button></td>
            `;
            tbody.appendChild(row);
        });
    }
}); 