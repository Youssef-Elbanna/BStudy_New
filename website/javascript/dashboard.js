/* ========================================
   B - STUDY WEBSITE DASHBOARD JAVASCRIPT
   ========================================
   
   This file contains all the interactive functionality for the dashboard
   including wallet management, notifications, OTP input handling,
   navigation, and modal management.
   
   Table of Contents:
   1. Wallet Management Functions
   2. Notification System
   3. OTP Input Handling
   4. Navigation Menu Management
   5. Security Features
   6. Modal Management
   ======================================== */

(function enforceLogin() {
    const publicPages = ['login.html', 'signup.html'];
    const isPublic = publicPages.some(page => window.location.pathname.endsWith(page));
    if (!isPublic) {
        const token = localStorage.getItem('student_token');
        if (!token) {
            window.location.href = 'login.html';
        }
    }
})();

/* ========================================
   1. WALLET MANAGEMENT FUNCTIONS
   ========================================
   Functions for handling wallet information display and interaction.
   ======================================== */

/**
 * Toggles the wallet information display
 * 
 * Shows or hides the wallet information panel and manages
 * click outside functionality for better user experience.
 */
function showWallet() {
    let walletInfo = document.getElementById("wallet-info-id");
    
    // Toggle wallet display
    if (walletInfo.style.display == "none" || walletInfo.style.display === "") {
        walletInfo.style.display = "flex";
        // Add event listener to handle clicks outside of the wallet
        document.addEventListener('click', handleOutsideClick);
    } else {
        walletInfo.style.display = "none";
    }
}

/**
 * Handles clicks outside the wallet panel to close it
 * 
 * @param {Event} event - The click event object
 * 
 * Closes the wallet panel when user clicks outside of it
 * and removes the event listener to prevent memory leaks.
 */
function handleOutsideClick(event) {
    let walletInfo = document.getElementById("wallet-info-id");
    let walletButton = document.querySelector('.wallet');
    
    // Check if click is outside wallet panel and not on wallet button
    if (!walletInfo.contains(event.target) && event.target !== walletButton) {
        walletInfo.style.display = "none";
        document.removeEventListener('click', handleOutsideClick);
    }
}

/* ========================================
   2. NOTIFICATION SYSTEM
   ========================================
   Functions for handling notification display and audio feedback.
   ======================================== */

/**
 * Displays a notification with audio feedback
 * 
 * Shows a notification card that slides in from the left,
 * plays a notification sound, and automatically hides after 3 seconds.
 */
function showNotification() {
    let notification = document.getElementById("notification-card-show");
    let audio = document.getElementById('notificationSound');
    
    // Play notification sound if audio element exists
    if (audio) {
        audio.play().catch(error => {
            console.log('Audio play failed:', error);
        });
    }
    
    // Slide notification in from left if notification element exists
    if (notification) {
        notification.style.left = "20px";
        
        // Auto-hide notification after 3 seconds
        setTimeout(function () {
            notification.style.left = "-300px";
        }, 3000);
    }
}

// Show notification 1 second after page load
setTimeout(showNotification, 1000);

/* ========================================
   3. OTP INPUT HANDLING
   ========================================
   Functions for managing OTP (One-Time Password) input fields
   with automatic navigation and paste functionality.
   ======================================== */

/**
 * Handles input in OTP fields with automatic navigation
 * 
 * @param {number} index - The current input field index (1-12)
 * @param {Event} event - The input event object
 * 
 * Features:
 * - Only allows numeric input
 * - Auto-focuses next field when digit is entered
 * - Auto-focuses previous field on backspace
 * - Handles field navigation intelligently
 */
function handleInput(index, event) {
    // Ensure the input value is numeric only
    event.target.value = event.target.value.replace(/\D/g, '');

    // Move to the next input field if available and digit entered
    if (event.target.value !== '' && index < 12) {
        document.querySelector(`.otp-input:nth-child(${index + 1})`).focus();
    }

    // Move to the previous input field on backspace
    if (event.inputType === 'deleteContentBackward') {
        if (index > 1 && event.target.value === '') {
            document.querySelector(`.otp-input:nth-child(${index - 1})`).focus();
        } else if (index === 1 && event.target.value === '') {
            document.querySelector(`.otp-input:nth-child(${index})`).focus();
        }
    }
}

/**
 * Handles paste events in OTP fields
 * 
 * @param {number} index - The starting input field index
 * @param {Event} event - The paste event object
 * 
 * Distributes pasted text across multiple OTP input fields
 * and filters out non-numeric characters.
 */
function handlePaste(index, event) {
    // Get the pasted text from clipboard
    const pastedText = (event.clipboardData || window.clipboardData).getData('text');

    // Distribute pasted text among input fields
    for (let i = 0; i < pastedText.length && (index + i) <= 12; i++) {
        const inputField = document.querySelector(`.otp-input:nth-child(${index + i})`);
        if (inputField) {
            inputField.value = pastedText[i].replace(/\D/g, '');
        }
    }
}

/**
 * Handles clipboard paste using modern Clipboard API
 * 
 * Uses the modern navigator.clipboard.readText() API to read
 * clipboard content and distribute it across OTP fields.
 * Falls back gracefully if API is not available.
 */
async function pasteText() {
    try {
        // Read text from clipboard using modern API
        const pastedText = await navigator.clipboard.readText();
        
        // Distribute pasted text among input fields
        for (let i = 0; i < pastedText.length && i < 12; i++) {
            const inputField = document.querySelector(`.otp-input:nth-child(${i + 1})`);
            if (inputField) {
                inputField.value = pastedText[i].replace(/\D/g, '');
            }
        }
    } catch (err) {
        console.error('Unable to read clipboard text:', err);
    }
}

/* ========================================
   4. NAVIGATION MENU MANAGEMENT
   ========================================
   Functions for handling navigation menu interactions and active states.
   ======================================== */

// Get all navigation link elements
let listElements = document.querySelectorAll('.link');

// Add click event listeners to all navigation links
listElements.forEach(listElement => {
    listElement.addEventListener('click', () => {
        // If clicked element is already active, remove active state
        if (listElement.classList.contains('active')) {
            listElement.classList.remove('active');
        } else {
            // Remove active state from all other elements
            listElements.forEach(listE => {
                listE.classList.remove('active');
            })
            // Toggle active state on clicked element
            listElement.classList.toggle('active');
        }
    })
});

/* ========================================
   5. SECURITY FEATURES
   ========================================
   Security measures to protect the application.
   ======================================== */

/**
 * Blocks right-click context menu for security
 * 
 * Prevents users from accessing browser context menu
 * which could expose sensitive information or functionality.
 */
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

/* ========================================
   6. MODAL MANAGEMENT
   ========================================
   Functions for handling modal dialogs and their interactions.
   ======================================== */

// Get modal elements
var modal = document.getElementById('modal');
var modal2 = document.getElementById('modal2');

// Get buttons that open the modals
var openModalBtn = document.getElementById("openModalBtn");
var openModal2Btn = document.getElementById("openModal2Btn");

// Get close button elements
var closeBtn = document.getElementsByClassName("close")[0];
var closeBtn2 = document.getElementsByClassName("close")[1];

/**
 * Opens the first modal dialog
 */
openModalBtn.onclick = function() {
    modal.style.display = "block";
}

/**
 * Opens the second modal dialog
 */
openModal2Btn.onclick = function() {
    modal2.style.display = "block";
}

/**
 * Closes the first modal dialog
 */
closeBtn.onclick = function() {
    modal.style.display = "none";
}

/**
 * Closes the second modal dialog
 */
closeBtn2.onclick = function() {
    modal2.style.display = "none";
}

/**
 * Closes modals when clicking outside of them
 * 
 * @param {Event} event - The click event object
 * 
 * Handles clicks outside modal content to close the dialogs
 * for better user experience.
 */
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    else if (event.target == modal2) {
        modal2.style.display = "none"
    }
}

function updateHeaderUserInfo() {
    const token = localStorage.getItem('student_token');
    const nameElem = document.querySelector('.username .name');
    const welcomeElem = document.querySelector('.username .welcome');
    // Set greeting based on time
    if (welcomeElem) {
        const hour = new Date().getHours();
        let greeting = 'صباح الخير';
        if (hour >= 12 && hour < 17) greeting = 'مساء الخير';
        else if (hour >= 17) greeting = 'مساء الخير';
        welcomeElem.textContent = greeting;
    }
    if (!nameElem) return;
    if (!token) {
        nameElem.textContent = 'زائر';
        return;
    }
    fetch('http://localhost:3000/api/student/profile/me', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => {
        nameElem.textContent = data.username || data.name || data.student_id || 'اسم غير معروف';
    })
    .catch(() => {
        nameElem.textContent = 'زائر';
    });
}
document.addEventListener('DOMContentLoaded', updateHeaderUserInfo);

function renderMainCourses() {
    console.log('renderMainCourses called');
    const mainCoursesList = document.getElementById('main-courses-list');
    if (!mainCoursesList) return;
    mainCoursesList.innerHTML = '<div style="text-align:center;padding:2em;">جاري تحميل الكورسات...</div>';
    fetch('http://localhost:3000/api/public/courses')
        .then(response => response.json())
        .then(courses => {
            console.log('Courses fetched:', courses);
            if (!Array.isArray(courses) || courses.length === 0) {
                mainCoursesList.innerHTML = '<p style="text-align:center;">لا توجد كورسات متاحة حاليا</p>';
                return;
            }
            mainCoursesList.innerHTML = '';
            const title = document.createElement('h2');
            title.style.textAlign = 'center';
            title.style.marginBottom = '24px';
            title.textContent = 'كل الكورسات';
            mainCoursesList.appendChild(title);
            const grid = document.createElement('div');
            grid.style.display = 'grid';
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(260px, 1fr))';
            grid.style.gap = '24px';
            grid.style.padding = '0 16px 32px 16px';
            courses.forEach(course => {
                const card = document.createElement('div');
                card.style.background = '#fff';
                card.style.borderRadius = '12px';
                card.style.boxShadow = '0 2px 8px rgba(46,111,244,0.08)';
                card.style.padding = '24px 18px 18px 18px';
                card.style.display = 'flex';
                card.style.flexDirection = 'column';
                card.style.justifyContent = 'space-between';
                card.style.minHeight = '180px';

                const h3 = document.createElement('h3');
                h3.style.margin = '0 0 10px 0';
                h3.style.fontSize = '1.2em';
                h3.style.color = '#2E6FF4';
                h3.textContent = course.course_name;

                const p = document.createElement('p');
                p.style.margin = '0 0 12px 0';
                p.style.color = '#58647C';
                p.style.minHeight = '40px';
                p.textContent = course.description;

                const metaDiv = document.createElement('div');
                metaDiv.style.display = 'flex';
                metaDiv.style.justifyContent = 'space-between';
                metaDiv.style.alignItems = 'center';
                metaDiv.style.marginTop = 'auto';

                const creditsSpan = document.createElement('span');
                creditsSpan.style.color = '#8D98AF';
                creditsSpan.style.fontSize = '0.95em';
                creditsSpan.textContent = `عدد الساعات: ${course.credits}`;

                const priceSpan = document.createElement('span');
                priceSpan.style.color = '#262F44';
                priceSpan.style.fontWeight = '600';
                priceSpan.textContent = `${course.price} جنيه`;

                metaDiv.appendChild(creditsSpan);
                metaDiv.appendChild(priceSpan);

                card.appendChild(h3);
                card.appendChild(p);
                card.appendChild(metaDiv);
                grid.appendChild(card);
            });
            mainCoursesList.appendChild(grid);
        })
        .catch(() => {
            mainCoursesList.innerHTML = '<p style="text-align:center;">تعذر تحميل الكورسات.</p>';
        });
}
document.addEventListener('DOMContentLoaded', renderMainCourses);

document.addEventListener('DOMContentLoaded', function() {
    const coursesList = document.getElementById('courses-list');
    if (!coursesList) return;
    fetch('http://localhost:3000/api/public/courses')
        .then(response => response.json())
        .then(courses => {
            coursesList.innerHTML = '';
            if (!Array.isArray(courses) || courses.length === 0) {
                coursesList.innerHTML = '<p>لا توجد كورسات متاحة حاليا</p>';
                return;
            }
            courses.forEach(course => {
                const courseDiv = document.createElement('div');
                courseDiv.className = 'course';

                const infoDiv = document.createElement('div');
                infoDiv.className = 'info';

                const courseInfoDiv = document.createElement('div');
                courseInfoDiv.className = 'course-info';
                const h3 = document.createElement('h3');
                h3.textContent = course.course_name;
                const p = document.createElement('p');
                p.textContent = course.description;
                courseInfoDiv.appendChild(h3);
                courseInfoDiv.appendChild(p);

                const coursePriceDiv = document.createElement('div');
                coursePriceDiv.className = 'course-price';
                const priceSpan = document.createElement('span');
                priceSpan.textContent = `${course.price} جنيه`;
                coursePriceDiv.appendChild(priceSpan);

                infoDiv.appendChild(courseInfoDiv);
                infoDiv.appendChild(coursePriceDiv);
                courseDiv.appendChild(infoDiv);
                coursesList.appendChild(courseDiv);
            });
        })
        .catch(err => {
            coursesList.innerHTML = '<p>تعذر تحميل الكورسات.</p>';
        });

    const usernameElem = document.getElementById('dashboard-username');
    const emailElem = document.getElementById('dashboard-email');
    if (!usernameElem || !emailElem) return;
    const token = localStorage.getItem('student_token');
    if (!token) {
        usernameElem.textContent = 'لم يتم تسجيل الدخول';
        emailElem.textContent = '';
        return;
    }
    fetch('http://localhost:3000/api/student/profile/me', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => {
        usernameElem.textContent = data.username || data.name || data.student_id || 'اسم غير معروف';
        emailElem.textContent = data.email || '';
    })
    .catch(() => {
        usernameElem.textContent = 'خطأ في جلب البيانات';
        emailElem.textContent = '';
    });

    // Universal logout logic for any sidebar-item with خروج or Logout text
    function handleLogoutClick(e) {
        e.preventDefault();
        // Remove all possible student session/auth keys
        localStorage.removeItem('student_token');
        // Optionally clear all localStorage (uncomment if needed):
        // localStorage.clear();
        // Remove cookies (if any)
        document.cookie.split(';').forEach(function(c) {
            document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });
        window.location.href = 'landingNew.html';
    }
    // Attach to #logout-btn if present
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogoutClick);
    }
    // Attach to any sidebar-item with خروج or Logout text (flexible match)
    document.querySelectorAll('.sidebar-item').forEach(function(item) {
        const text = item.textContent.replace(/\s+/g, '').toLowerCase();
        if (text.includes('خروج') || text.includes('logout')) {
            item.addEventListener('click', handleLogoutClick);
        }
    });
});
