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
                card.style = 'box-shadow: 0 2px 10px rgba(46,111,244,0.10); border-radius: 18px; padding: 24px 20px; margin-bottom: 18px; background: #fff; display: flex; flex-direction: column; gap: 12px; min-width: 250px; cursor: pointer;';
                card.onclick = function() {
                    window.location.href = `course-enrolling.html?courseId=${course.course_id}`;
                };

                const title = document.createElement('h3');
                title.style = 'font-size: 1.3rem; color: var(--blue-3, #362083); margin-bottom: 6px;';
                title.textContent = course.course_name;

                const desc = document.createElement('p');
                desc.style = 'color: #58647C; font-size: 1rem; margin-bottom: 10px;';
                desc.textContent = course.description;

                const metaDiv = document.createElement('div');
                metaDiv.style = 'display: flex; gap: 18px; align-items: center; flex-wrap: wrap; margin-bottom: 8px;';

                const classesDiv = document.createElement('div');
                classesDiv.className = 'classes';
                classesDiv.dataset.courseId = course.course_id;
                classesDiv.style = 'display: flex; align-items: center; gap: 6px; background: #EEF4FA; border-radius: 8px; padding: 4px 12px;';
                const lectureCount = document.createElement('span');
                lectureCount.className = 'lecture-count';
                lectureCount.style = 'font-weight: 600; color: #2E6FF4;';
                lectureCount.textContent = 'جاري التحميل...';
                classesDiv.appendChild(lectureCount);

                const creditsDiv = document.createElement('div');
                creditsDiv.style = 'display: flex; align-items: center; gap: 6px; background: #F4CB3C; border-radius: 8px; padding: 4px 12px; color: #fff; font-weight: 600;';
                const creditsLabel = document.createElement('span');
                creditsLabel.textContent = 'عدد الساعات:';
                const creditsValue = document.createElement('span');
                creditsValue.textContent = course.credits;
                creditsDiv.appendChild(creditsLabel);
                creditsDiv.appendChild(creditsValue);

                const priceDiv = document.createElement('div');
                priceDiv.style = 'display: flex; align-items: center; gap: 6px; background: #E0B51D; border-radius: 8px; padding: 4px 12px; color: #fff; font-weight: 600;';
                const priceLabel = document.createElement('span');
                priceLabel.textContent = 'السعر:';
                const priceValue = document.createElement('span');
                priceValue.textContent = course.price + ' جنيه';
                priceDiv.appendChild(priceLabel);
                priceDiv.appendChild(priceValue);

                metaDiv.appendChild(classesDiv);
                metaDiv.appendChild(creditsDiv);
                metaDiv.appendChild(priceDiv);

                const btnDiv = document.createElement('div');
                btnDiv.style = 'margin-top: 8px;';
                const buyBtn = document.createElement('a');
                buyBtn.href = `course-enrolling.html?courseId=${course.course_id}`;
                buyBtn.style = 'background: linear-gradient(282deg, #1031D0 0%, #2E6FF4 50%, #89BAF8 100%); color: #fff; padding: 8px 24px; border-radius: 20px; text-decoration: none; font-weight: 600; font-size: 1rem;';
                buyBtn.textContent = 'اشتري الآن';
                buyBtn.onclick = function(e) {
                    e.stopPropagation();
                };
                btnDiv.appendChild(buyBtn);

                card.appendChild(title);
                card.appendChild(desc);
                card.appendChild(metaDiv);
                card.appendChild(btnDiv);

                coursesContainer.appendChild(card);
                // Get lecture count from course object
                const count = course.videos && Array.isArray(course.videos) ? course.videos.length : 0;
                const lectureCountDiv = card.querySelector('.classes');
                if (lectureCountDiv) {
                    lectureCountDiv.querySelector('.lecture-count').textContent = `${count} محاضرة`;
                }
            });
        })
        .catch(() => {
            const coursesContainer = document.querySelector('.courses');
            if (coursesContainer) coursesContainer.innerHTML = '<p>حدث خطأ أثناء تحميل الكورسات</p>';
        });
});