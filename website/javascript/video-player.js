// Video Player JavaScript
// Handles video playback, view tracking, and restrictions

// VideoCipher API configuration
const VIDEO_CIPHER_API_SECRET = 'FahE4fLGwCLdvIeYIJ8gymkm2z2lWuV5uh0Drj7w8Kt6flgydhIGMze84xrIhh5n';
const VIDEO_CIPHER_API_URL = 'https://dev.vdocipher.com/api/videos';

// Global variables
let currentVideoId = null;
let currentCourseId = null;
let videoViews = 0;
let maxViews = 3; // Default max views per video
let videoList = [];
let currentVideoIndex = 0;

// Initialize video player
document.addEventListener('DOMContentLoaded', function() {
    initializeVideoPlayer();
});

function initializeVideoPlayer() {
    // Get video ID and course ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    currentVideoId = urlParams.get('videoId');
    currentCourseId = urlParams.get('courseId');
    
    if (!currentVideoId) {
        showError('معرف الفيديو مطلوب');
        return;
    }
    
    // Update back button to include course ID
    if (currentCourseId) {
        const backButton = document.getElementById('backToCourse');
        if (backButton) {
            backButton.href = `./course-enrolling.html?courseId=${currentCourseId}`;
        }
    }
    
    // Load video data and check views
    loadVideoData();
}

async function loadVideoData() {
    try {
        // Fetch video data from API
        const response = await fetch(`http://localhost:3000/api/public/videos/${currentVideoId}`);
        if (!response.ok) {
            throw new Error('فيديو غير موجود');
        }
        
        const videoData = await response.json();
        
        // Update UI with video information
        updateVideoInfo(videoData);
        
        // Check if user can view this video
        await checkVideoAccess(videoData);
        
    } catch (error) {
        console.error('Error loading video data:', error);
        showError('خطأ في تحميل بيانات الفيديو');
    }
}

function updateVideoInfo(videoData) {
    // Update video title
    const titleElement = document.getElementById('video-title');
    if (titleElement) {
        titleElement.textContent = videoData.title || 'عنوان الفيديو';
    }
    
    // Update video description
    const descriptionElement = document.getElementById('video-description');
    if (descriptionElement) {
        descriptionElement.textContent = videoData.description || 'وصف الفيديو';
    }
    
    // Update video duration
    const durationElement = document.getElementById('duration-text');
    if (durationElement && videoData.duration) {
        durationElement.textContent = formatDuration(videoData.duration);
    }
    
    // Update views count
    updateViewsDisplay();
}

async function checkVideoAccess(videoData) {
    try {
        // Get current views for this video
        const token = localStorage.getItem('student_token');
        const viewsResponse = await fetch(`http://localhost:3000/api/student/videos/${currentVideoId}/view-status`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (viewsResponse.ok) {
            const viewsData = await viewsResponse.json();
            videoViews = viewsData.view_count || 0;
            maxViews = viewsData.max_views || 3;
        }
        
        updateViewsDisplay();
        
        // Check if user has exceeded view limit
        if (videoViews >= maxViews) {
            showViewsWarning();
            return;
        }
        
        // Load video player
        await loadVideoPlayer(videoData);
        
    } catch (error) {
        console.error('Error checking video access:', error);
        // If we can't check views, allow playback but track locally
        await loadVideoPlayer(videoData);
    }
}

async function loadVideoPlayer(videoData) {
    try {
        const videoUrl = videoData.url || videoData.video_url;
        
        if (!videoUrl) {
            throw new Error('رابط الفيديو غير متوفر');
        }
        
        // Extract video ID from VideoCipher URL
        const match = videoUrl.match(/iframe\/([a-zA-Z0-9]+)/);
        if (!match) {
            throw new Error('رابط الفيديو غير صحيح');
        }
        
        const videoCipherId = match[1];
        
        // Get OTP from VideoCipher API
        const response = await fetch(`${VIDEO_CIPHER_API_URL}/${videoCipherId}/otp`, {
            method: 'POST',
            headers: {
                'Authorization': `Apisecret ${VIDEO_CIPHER_API_SECRET}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ttl: 300
            })
        });
        
        if (!response.ok) {
            throw new Error('خطأ في تحميل الفيديو');
        }
        
        const data = await response.json();
        const { otp, playbackInfo } = data;
        
        // Create and embed the iframe
        const iframe = document.createElement('iframe');
        iframe.src = `https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`;
        iframe.style.border = '0';
        iframe.style.width = '100%';
        iframe.style.height = '400px';
        iframe.allow = 'encrypted-media';
        iframe.allowFullscreen = true;
        
        // Clear loading and add iframe
        const playerContainer = document.getElementById('video-player');
        const loadingElement = document.getElementById('video-loading');
        
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
        
        playerContainer.innerHTML = '';
        playerContainer.appendChild(iframe);
        
        // Track video view
        trackVideoView();
        
        console.log('Video player loaded successfully');
        
    } catch (error) {
        console.error('Error loading video player:', error);
        showError('خطأ في تحميل الفيديو');
    }
}

async function trackVideoView() {
    try {
        // Increment local view count
        videoViews++;
        updateViewsDisplay();
        
        // Send view tracking to server
        const token = localStorage.getItem('student_token');
        await fetch(`http://localhost:3000/api/student/videos/${currentVideoId}/watch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                videoId: currentVideoId,
                timestamp: new Date().toISOString()
            })
        });
        
        console.log('Video view tracked successfully');
        
    } catch (error) {
        console.error('Error tracking video view:', error);
    }
}

function updateViewsDisplay() {
    const viewsElement = document.getElementById('views-count');
    if (viewsElement) {
        viewsElement.textContent = Math.max(0, maxViews - videoViews);
    }
}

function showViewsWarning() {
    const warningElement = document.getElementById('views-warning');
    const playerContainer = document.getElementById('video-player');
    
    if (warningElement && playerContainer) {
        warningElement.style.display = 'block';
        playerContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 400px; background: #f8f9fa; border-radius: 12px;">
                <div style="text-align: center; color: #6c757d;">
                    <h3>⚠️ تم استنفاذ المشاهدات</h3>
                    <p>لقد استنفذت جميع المشاهدات المتاحة لهذا الفيديو</p>
                </div>
            </div>
        `;
    }
}

function showError(message) {
    const playerContainer = document.getElementById('video-player');
    const loadingElement = document.getElementById('video-loading');
    
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    if (playerContainer) {
        playerContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 400px; background: #f8f9fa; border-radius: 12px;">
                <div style="text-align: center; color: #6c757d;">
                    <h3>❌ خطأ</h3>
                    <p>${message}</p>
                </div>
            </div>
        `;
    }
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Navigation controls
document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.getElementById('prev-video');
    const nextButton = document.getElementById('next-video');
    const upgradeButton = document.getElementById('upgrade-btn');
    
    if (prevButton) {
        prevButton.addEventListener('click', navigateToPreviousVideo);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', navigateToNextVideo);
    }
    
    if (upgradeButton) {
        upgradeButton.addEventListener('click', handleUpgrade);
    }
});

function navigateToPreviousVideo() {
    // Implementation for navigating to previous video
    console.log('Navigate to previous video');
    // This would need to be implemented based on your video list structure
}

function navigateToNextVideo() {
    // Implementation for navigating to next video
    console.log('Navigate to next video');
    // This would need to be implemented based on your video list structure
}

function handleUpgrade() {
    // Redirect to checkout page for course purchase
    if (currentCourseId) {
        window.location.href = `./checkout.html?courseId=${currentCourseId}`;
    } else {
        window.location.href = './dashboard-allcourses.html';
    }
}

// Handle video completion tracking
function onVideoComplete() {
    console.log('Video completed');
    // Additional completion tracking logic can be added here
}

// Handle video progress tracking
function onVideoProgress(progress) {
    console.log('Video progress:', progress);
    // Additional progress tracking logic can be added here
}

// Export functions for external use
window.videoPlayer = {
    trackView: trackVideoView,
    onComplete: onVideoComplete,
    onProgress: onVideoProgress
}; 