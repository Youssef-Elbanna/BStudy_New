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
    
    // Play notification sound
    audio.play();
    
    // Slide notification in from left
    notification.style.left = "20px";
    
    // Auto-hide notification after 3 seconds
    setTimeout(function () {
        notification.style.left = "-300px";
    }, 3000);
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
                card.innerHTML = `
                    <div class="img-course">
                        <img src="/asseds/images/teacher.png" alt="Course Image" />
                    </div>
                    <div class="info">
                        <div class="time">
                            <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none"><path d="M7.9998 1.70813C11.6818 1.70813 14.6665 4.6928 14.6665 8.3748C14.6665 12.0568 11.6818 15.0415 7.9998 15.0415C4.3178 15.0415 1.33313 12.0568 1.33313 8.3748C1.33313 4.6928 4.3178 1.70813 7.9998 1.70813ZM7.9998 3.04146C6.58531 3.04146 5.22875 3.60337 4.22856 4.60356C3.22837 5.60375 2.66646 6.96031 2.66646 8.3748C2.66646 9.78928 3.22837 11.1458 4.22856 12.146C5.22875 13.1462 6.58531 13.7081 7.9998 13.7081C9.41428 13.7081 10.7708 13.1462 11.771 12.146C12.7712 11.1458 13.3331 9.78928 13.3331 8.3748C13.3331 6.96031 12.7712 5.60375 11.771 4.60356C10.7708 3.60337 9.41428 3.04146 7.9998 3.04146ZM7.9998 4.3748C8.16308 4.37482 8.32069 4.43477 8.44271 4.54327C8.56473 4.65178 8.64269 4.8013 8.6618 4.96346L8.66646 5.04146V8.0988L10.4711 9.90346C10.5907 10.0234 10.6601 10.1844 10.6653 10.3537C10.6705 10.523 10.611 10.6879 10.499 10.815C10.3869 10.942 10.2308 11.0217 10.0621 11.0377C9.89353 11.0538 9.72512 11.0051 9.59113 10.9015L9.52846 10.8461L7.52846 8.84613C7.42485 8.74243 7.3583 8.60746 7.33913 8.46213L7.33313 8.3748V5.04146C7.33313 4.86465 7.40337 4.69508 7.52839 4.57006C7.65342 4.44503 7.82299 4.3748 7.9998 4.3748Z" fill="#EEF4FA"/></svg></div>
                            <h5>${course.credits} ساعة</h5>
                        </div>
                        <div class="classes">
                            <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9.80737 6.77901L5.49137 4.62034C5.36936 4.55928 5.23376 4.53045 5.09746 4.53657C4.96117 4.5427 4.8287 4.58358 4.71265 4.65533C4.59661 4.72708 4.50084 4.82732 4.43446 4.94651C4.36807 5.06571 4.33328 5.1999 4.33337 5.33634V9.41367C4.33328 9.55011 4.36807 9.6843 4.43446 9.8035C4.50084 9.92269 4.59661 10.0229 4.71265 10.0947C4.8287 10.1664 4.96117 10.2073 5.09746 10.2134C5.23376 10.2196 5.36936 10.1907 5.49137 10.1297L9.80737 7.97101C9.91796 7.91558 10.0109 7.83048 10.0759 7.72522C10.1409 7.61997 10.1753 7.49871 10.1753 7.37501C10.1753 7.25131 10.1409 7.13005 10.0759 7.02479C10.0109 6.91953 9.91796 6.83443 9.80737 6.77901Z" stroke="#EEF4FA" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 13.375C10.3137 13.375 13 10.6887 13 7.375C13 4.06129 10.3137 1.375 7 1.375C3.68629 1.375 1 4.06129 1 7.375C1 10.6887 3.68629 13.375 7 13.375Z" stroke="#EEF4FA"/></svg></div>
                            <h5>${course.credits} محاضرة</h5>
                        </div>
                        <div class="exams">
                            <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none"><path d="M5 4.875H7M5 8.375H11M5 10.375H11M5 12.375H7M4 14.875H12C12.2652 14.875 12.5196 14.7696 12.7071 14.5821C12.8946 14.3946 13 14.1402 13 13.875V2.875C13 2.60978 12.8946 2.35543 12.7071 2.16789C12.5196 1.98036 12.2652 1.875 12 1.875H4C3.73478 1.875 3.48043 1.98036 3.29289 2.16789C3.10536 2.35543 3 2.60978 3 2.875V13.875C3 14.1402 3.10536 14.3946 3.29289 14.5821C3.48043 14.7696 3.73478 14.875 4 14.875Z" stroke="#3B4459" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 5.125C11.1381 5.125 11.25 5.01307 11.25 4.875C11.25 4.73693 11.1381 4.625 11 4.625C10.8619 4.625 10.75 4.73693 10.75 4.875C10.75 5.01307 10.8619 5.125 11 5.125Z" fill="#3B4459" stroke="#3B4459"/></svg></div>
                            <h5>3 أمتحانات</h5>
                        </div>
                    </div>
                    <div class="course-info">
                        <h3>${course.course_name}</h3>
                        <p>${course.description}</p>
                    </div>
                    <div class="course-price">
                        <a href="#">أكمل التعلم الان</a>
                        <span>${course.price} جنيه</span>
                    </div>
                `;
                coursesContainer.appendChild(card);
            });
        })
        .catch(() => {
            const coursesContainer = document.querySelector('.courses');
            if (coursesContainer) coursesContainer.innerHTML = '<p>حدث خطأ أثناء تحميل الكورسات</p>';
        });

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
        if (data && data.email) {
            const emailElem = document.querySelector('.dashboard-info .info p');
            if (emailElem) emailElem.textContent = data.email;
        }
    })
    .catch(() => {/* keep default text on error */});

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
        window.location.href = 'login.html';
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
