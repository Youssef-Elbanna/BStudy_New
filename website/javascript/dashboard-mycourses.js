document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('student_token');
    if (!token) return;
    fetch('http://localhost:3000/api/student/profile/me', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => {
        if (data && data.username) {
            const welcome = document.querySelector('.username .welcome');
            const name = document.querySelector('.username .name');
            if (welcome) welcome.textContent = 'Welcome';
            if (name) name.textContent = data.username;
        }
    })
    .catch(() => {/* keep default text on error */});
}); 