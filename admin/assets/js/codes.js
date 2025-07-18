document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('codeForm');
    const tableBody = document.querySelector('#codesTable tbody');
    const token = localStorage.getItem('admin_token');

    // Fetch all promo codes on page load
    fetchAllCodes();

    async function fetchAllCodes() {
        try {
            const response = await fetch('http://localhost:3000/api/admin/courses/promo', {
                headers: token ? { 'Authorization': 'Bearer ' + token } : {}
            });
            if (!response.ok) throw new Error('فشل في جلب الأكواد');
            const data = await response.json();
            if (Array.isArray(data)) {
                tableBody.innerHTML = '';
                data.forEach(addCodeRow);
            }
        } catch (err) {
            showNotification('حدث خطأ أثناء جلب الأكواد', 'error');
        }
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (!token) {
            showNotification('يجب تسجيل الدخول كمسؤول', 'error');
            return;
        }
        const code = document.getElementById('codeValue').value;
        const discount_type = document.getElementById('codeType').value;
        const discount_value = parseFloat(document.getElementById('codeAmount').value);
        const expires_at = new Date(document.getElementById('codeExpires').value).toISOString();

        const payload = { code, discount_type, discount_value, expires_at };

        try {
            const response = await fetch('http://localhost:3000/admin/courses/promo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error('فشل في إضافة الكود');
            const data = await response.json();
            if (data && data.promo) {
                addCodeRow(data.promo);
                form.reset();
                showNotification('تمت إضافة الكود بنجاح', 'success');
            } else {
                showNotification('لم يتم استلام بيانات الكود من الخادم', 'error');
            }
        } catch (err) {
            showNotification('حدث خطأ أثناء إضافة الكود', 'error');
        }
    });

    function addCodeRow(promo) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${promo.code}</td>
            <td>${promo.discount_type === 'percentage' ? 'نسبة مئوية' : 'قيمة ثابتة'}</td>
            <td>${promo.discount_value}</td>
            <td>${new Date(promo.expires_at).toLocaleString('ar-EG')}</td>
        `;
        tableBody.appendChild(row);
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\"></button>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 5000);
    }
}); 