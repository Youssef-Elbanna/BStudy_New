document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('promoForm');
    const tableBody = document.querySelector('#promoTable tbody');
    const token = localStorage.getItem('admin_token');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (!token) {
            alert('يجب تسجيل الدخول كمسؤول');
            return;
        }
        const code = document.getElementById('promoCode').value;
        const discount_type = document.getElementById('discountType').value;
        const discount_value = parseFloat(document.getElementById('discountValue').value);
        const expires_at = new Date(document.getElementById('expiresAt').value).toISOString();

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
            // Optionally parse response
            // const data = await response.json();
            addPromoRow(payload);
            form.reset();
            showNotification('تمت إضافة كود الخصم بنجاح', 'success');
        } catch (err) {
            showNotification('حدث خطأ أثناء إضافة كود الخصم', 'error');
        }
    });

    function addPromoRow(promo) {
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
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 5000);
    }
}); 