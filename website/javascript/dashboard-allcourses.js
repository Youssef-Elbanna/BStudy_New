function selectCategory(button) {
    // Remove 'selected' class from all buttons
    var buttons = document.querySelectorAll('.category');
    buttons.forEach(function (btn) {
      btn.classList.remove('selected');
    });
    // Add 'selected' class to the clicked button
    button.classList.add('selected');
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/public/courses')
        .then(res => res.json())
        .then(courses => {
            const coursesContainer = document.querySelector('.courses');
            if (!coursesContainer) return;
            coursesContainer.innerHTML = '';
            if (!Array.isArray(courses) || courses.length === 0) {
                coursesContainer.innerHTML = '<p>لا توجد كورسات متاحة حاليا</p>';
                return;
            }
            courses.forEach(course => {
                const card = document.createElement('div');
                card.className = 'course';
                card.style = 'box-shadow: 0 2px 10px rgba(46,111,244,0.10); border-radius: 18px; padding: 24px 20px; margin-bottom: 18px; background: #fff; display: flex; flex-direction: column; gap: 12px; min-width: 250px;';
                card.innerHTML = `
                    <h3 style="font-size: 1.3rem; color: var(--blue-3, #362083); margin-bottom: 6px;">${course.course_name}</h3>
                    <p style="color: #58647C; font-size: 1rem; margin-bottom: 10px;">${course.description}</p>
                    <div style="display: flex; gap: 18px; align-items: center; flex-wrap: wrap; margin-bottom: 8px;">
                        <div class="classes" data-course-id="${course.course_id}" style="display: flex; align-items: center; gap: 6px; background: #EEF4FA; border-radius: 8px; padding: 4px 12px;">
                            <span style="font-weight: 600; color: #2E6FF4;" class="lecture-count">جاري التحميل...</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; background: #F4CB3C; border-radius: 8px; padding: 4px 12px; color: #fff; font-weight: 600;">
                            <span>عدد الساعات:</span> <span>${course.credits}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; background: #E0B51D; border-radius: 8px; padding: 4px 12px; color: #fff; font-weight: 600;">
                            <span>السعر:</span> <span>${course.price} جنيه</span>
                        </div>
                    </div>
                    <div style="margin-top: 8px;">
                        <a href="#" style="background: linear-gradient(282deg, #1031D0 0%, #2E6FF4 50%, #89BAF8 100%); color: #fff; padding: 8px 24px; border-radius: 20px; text-decoration: none; font-weight: 600; font-size: 1rem;">أكمل التعلم الان</a>
                    </div>
                `;
                coursesContainer.appendChild(card);
                // Fetch lecture count for this course
                fetch(`http://localhost:3000/api/public/courses/${course.course_id}/videos`)
                    .then(res => res.json())
                    .then(videos => {
                        const count = Array.isArray(videos) ? videos.length : 0;
                        const classesDiv = card.querySelector('.classes');
                        if (classesDiv) {
                            classesDiv.querySelector('.lecture-count').textContent = `${count} محاضرة`;
                        }
                    })
                    .catch(() => {
                        // On error, do not set any text (leave as is or blank)
                        const classesDiv = card.querySelector('.classes');
                        if (classesDiv) {
                            classesDiv.querySelector('.lecture-count').textContent = '';
                        }
                    });
            });
        })
        .catch(() => {
            const coursesContainer = document.querySelector('.courses');
            if (coursesContainer) coursesContainer.innerHTML = '<p>حدث خطأ أثناء تحميل الكورسات</p>';
        });
});