// ========================================
// B - STUDY LANGUAGE SYSTEM
// ========================================
// Handles Arabic and English language switching
// Default language: Arabic (ar)

class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'ar';
        this.translations = {
            ar: {
                // Header & Navigation
                'nav-home': 'الرئيسية',
                'nav-my-courses': 'كورساتي',
                'nav-q-bank': 'بنك الاسئلة',
                'nav-all-courses': 'كل الكورسات',
                'nav-reviews': 'المراجعات',
                'nav-help': 'مساعدة',
                'nav-privacy': 'سياسة الخصوصية',
                'nav-settings': 'الاعدادات',
                'nav-logout': 'خروج',
                
                // Landing Page
                'hero-title': 'انت مستعد دلوقتي؟',
                'hero-subtitle': 'أبدأ رحلة التعلم يلا مستني ايه !',
                'hero-description': 'B - Study هي منصة تعليمية تهدف الى تسهيل عملية التعلم عن بعد للطلاب والمعلمين',
                'signup-btn': 'عمل حساب جديد',
                'login-btn': 'لدي حساب بالفعل',
                'download-app-title': 'حمل التطبيق قريبًا',
                'latest-courses': 'أحدث الكورسات',
                'loading-courses': 'جاري تحميل الكورسات...',
                'no-courses-title': 'لا توجد كورسات متاحة',
                'no-courses-desc': 'جاري العمل على إضافة كورسات جديدة',
                
                // Course Filters
                'filter-1st-secondary': '1ث',
                'filter-2nd-secondary': '2ث',
                'filter-3rd-secondary': '3ث',
                'filter-1st-college': '1 كلية',
                
                // About Section
                'about-title': 'استكشف عالم التعلم مع B - Study التعليمية فتح أفقك التعليمي وتحقيق أهدافك معنا.',
                'about-description': 'مرحبًا بك في منصتنا التعليمية المبتكرة حيث يتلاقى التعلم الشيق بالتكنولوجيا الحديثة. نحن نؤمن بقوة التعليم في تغيير حيوات الأفراد، ونقدم لك فرصة فريدة لاكتساب المهارات والمعرفة بطريقة ملهمة ومحفزة.',
                'features-title': 'مميزات المنصة',
                'feature-1': '🎓 محتوى تعليمي متنوع: دورات مصممة بعناية تغطي مجموعة واسعة من المواد.',
                'feature-2': '🚀 تعلم تفاعلي: اختبر المحتوى من خلال أنشطة تعليمية مشوقة ومحاكاة واقعية.',
                'feature-3': '🔄 تقييم مستمر: تتبع تقدمك واحصل على تقييمات دورية لتعزيز تجربتك التعليمية.',
                'feature-4': '🌐 تواصل وشارك: انضم إلى مجتمعنا التعليمي وتفاعل مع متعلمين آخرين ومدرسين متميزين.',
                'feature-5': '🎉 دورات مجانية: استمتع بفرصة الوصول إلى محتوى مجاني لتجربة ملموسة لما نقدمه.',
                
                // CTA Section
                'cta-description': 'اكتشف عالم التعلم الجديد وابدأ رحلتك التعليمية اليوم. سجل الآن للوصول إلى المحتوى الحصري والتفاعل مع مجتمعنا التعليمي المميز.',
                'cta-button': 'سجل الآن',
                'cta-motivation': 'إيه اللي بتستنى؟ إبدأ معانا النهاردة وإبدأ رحلتك نحو التعلم والتألق!',
                
                // Footer
                'footer-tagline': 'اتعلم بكل متعة وسهولة مع B - Study',
                'footer-description': 'أهلاً بيك في منصتنا التعليمية الجديدة، حيث التعلم بيبقى أحلى بتقنيات جديدة. احنا بنؤمن إن التعليم بيغير حياة الناس، وبنقدملك فرصة فريدة إنك تكتسب مهارات ومعرفة بشكل ملهم ومحفز.',
                'footer-download-title': 'حمل التطبيق دلوقتي',
                'developer-credit': 'Developed By B-Study Technical Team',
                
                // Dashboard
                'welcome-morning': 'صباح الخير',
                'welcome-evening': 'مساء الخير',
                'welcome-afternoon': 'مساء الخير',
                'dashboard-title': 'الرئيسية',
                'my-courses': 'كورساتي',
                'all-courses': 'كل الكورسات',
                'q-bank': 'بنك الاسئلة',
                'reviews': 'المراجعات',
                'help': 'مساعدة',
                'settings': 'الاعدادات',
                'logout': 'خروج',
                
                // Course Related
                'course-duration': 'ساعة',
                'lecture-count': 'محاضرة',
                'exam-count': 'أمتحانات',
                'course-title': 'الشهر الاول | الصف الاول الثانوي',
                'course-description': 'يحتوي علي شرح الشهر الاول في الصف الاول الثانوي',
                'buy-now': 'شراء الان',
                'continue-learning': 'أكمل التعلم الان',
                'course-price': 'جنيه',
                
                // Exam Related
                'exam-title': 'الامتحان علي الدرس',
                'question-count': 'سؤال',
                'mcq-count': 'اختر',
                'tf-count': 'صح وخطأ',
                'essay-count': 'مقالي',
                'duration': 'دقيقة',
                'start-exam': 'أبدأ الامتحان الان',
                'lesson-description': 'يحتوي علي شرح الشهر الاول في الصف الاول الثانوي',
                
                // Common
                'loading': 'جاري التحميل...',
                'error': 'خطأ',
                'success': 'نجح',
                'cancel': 'إلغاء',
                'save': 'حفظ',
                'edit': 'تعديل',
                'delete': 'حذف',
                'confirm': 'تأكيد',
                'close': 'إغلاق',
                'back': 'رجوع',
                'next': 'التالي',
                'previous': 'السابق',
                'submit': 'إرسال',
                'search': 'بحث',
                'filter': 'تصفية',
                'sort': 'ترتيب',
                'view': 'عرض',
                'download': 'تحميل',
                'upload': 'رفع',
                'share': 'مشاركة',
                'like': 'إعجاب',
                'comment': 'تعليق',
                'follow': 'متابعة',
                'unfollow': 'إلغاء المتابعة',
                'profile': 'الملف الشخصي',
                'account': 'الحساب',
                'notifications': 'الإشعارات',
                'messages': 'الرسائل',
                'inbox': 'صندوق الوارد',
                'sent': 'المرسل',
                'draft': 'المسودة',
                'trash': 'المحذوفات',
                'archive': 'الأرشيف',
                'favorites': 'المفضلة',
                'bookmarks': 'الإشارات المرجعية',
                'history': 'السجل',
                'recent': 'الأخيرة',
                'popular': 'الشائعة',
                'trending': 'الرائجة',
                'new': 'جديد',
                'hot': 'ساخن',
                'featured': 'مميز',
                'premium': 'مميز',
                'free': 'مجاني',
                'paid': 'مدفوع',
                'trial': 'تجريبي',
                'demo': 'تجريبي',
                'beta': 'تجريبي',
                'alpha': 'تجريبي',
                'stable': 'مستقر',
                'latest': 'الأحدث',
                'oldest': 'الأقدم',
                'best': 'الأفضل',
                'worst': 'الأسوأ',
                'highest': 'الأعلى',
                'lowest': 'الأدنى',
                'most': 'الأكثر',
                'least': 'الأقل',
                'all': 'الكل',
                'none': 'لا شيء',
                'some': 'بعض',
                'many': 'كثير',
                'few': 'قليل',
                'several': 'عدة',
                'multiple': 'متعدد',
                'single': 'واحد',
                'double': 'مزدوج',
                'triple': 'ثلاثي',
                'quadruple': 'رباعي',
                'quintuple': 'خماسي',
                'sextuple': 'سداسي',
                'septuple': 'سباعي',
                'octuple': 'ثماني',
                'nonuple': 'تساعي',
                'decuple': 'عشاري'
            },
            en: {
                // Header & Navigation
                'nav-home': 'Home',
                'nav-my-courses': 'My Courses',
                'nav-q-bank': 'Question Bank',
                'nav-all-courses': 'All Courses',
                'nav-reviews': 'Reviews',
                'nav-help': 'Help',
                'nav-privacy': 'Privacy Policy',
                'nav-settings': 'Settings',
                'nav-logout': 'Logout',
                
                // Landing Page
                'hero-title': 'Are you ready now?',
                'hero-subtitle': 'Start your learning journey, what are you waiting for!',
                'hero-description': 'B - Study is an educational platform aimed at facilitating distance learning for students and teachers',
                'signup-btn': 'Create New Account',
                'login-btn': 'I Already Have an Account',
                'download-app-title': 'Download the App Soon',
                'latest-courses': 'Latest Courses',
                'loading-courses': 'Loading courses...',
                'no-courses-title': 'No courses available',
                'no-courses-desc': 'We are working on adding new courses',
                
                // Course Filters
                'filter-1st-secondary': '1st Sec',
                'filter-2nd-secondary': '2nd Sec',
                'filter-3rd-secondary': '3rd Sec',
                'filter-1st-college': '1st College',
                
                // About Section
                'about-title': 'Explore the world of learning with B - Study Educational Platform. Open your educational horizons and achieve your goals with us.',
                'about-description': 'Welcome to our innovative educational platform where exciting learning meets modern technology. We believe in the power of education to change individuals\' lives, and we offer you a unique opportunity to acquire skills and knowledge in an inspiring and motivating way.',
                'features-title': 'Platform Features',
                'feature-1': '🎓 Diverse Educational Content: Carefully designed courses covering a wide range of subjects.',
                'feature-2': '🚀 Interactive Learning: Test content through exciting educational activities and realistic simulations.',
                'feature-3': '🔄 Continuous Assessment: Track your progress and get periodic evaluations to enhance your educational experience.',
                'feature-4': '🌐 Connect and Share: Join our educational community and interact with other learners and distinguished teachers.',
                'feature-5': '🎉 Free Courses: Enjoy the opportunity to access free content for a tangible experience of what we offer.',
                
                // CTA Section
                'cta-description': 'Discover the new world of learning and start your educational journey today. Register now to access exclusive content and interact with our distinguished educational community.',
                'cta-button': 'Register Now',
                'cta-motivation': 'What are you waiting for? Start with us today and begin your journey towards learning and excellence!',
                
                // Footer
                'footer-tagline': 'Learn with fun and ease with B - Study',
                'footer-description': 'Welcome to our new educational platform, where learning becomes more enjoyable with new technologies. We believe that education changes people\'s lives, and we offer you a unique opportunity to acquire skills and knowledge in an inspiring and motivating way.',
                'footer-download-title': 'Download the App Now',
                'developer-credit': 'Developed By B-Study Technical Team',
                
                // Dashboard
                'welcome-morning': 'Good Morning',
                'welcome-evening': 'Good Evening',
                'welcome-afternoon': 'Good Afternoon',
                'dashboard-title': 'Dashboard',
                'my-courses': 'My Courses',
                'all-courses': 'All Courses',
                'q-bank': 'Question Bank',
                'reviews': 'Reviews',
                'help': 'Help',
                'settings': 'Settings',
                'logout': 'Logout',
                
                // Course Related
                'course-duration': 'hours',
                'lecture-count': 'lectures',
                'exam-count': 'exams',
                'course-title': 'First Month | First Secondary',
                'course-description': 'Contains explanation of the first month in first secondary',
                'buy-now': 'Buy Now',
                'continue-learning': 'Continue Learning',
                'course-price': 'EGP',
                
                // Exam Related
                'exam-title': 'Exam on the Lesson',
                'question-count': 'questions',
                'mcq-count': 'MCQ',
                'tf-count': 'True/False',
                'essay-count': 'Essay',
                'duration': 'minutes',
                'start-exam': 'Start Exam Now',
                'lesson-description': 'Contains explanation of the first month in first secondary',
                
                // Common
                'loading': 'Loading...',
                'error': 'Error',
                'success': 'Success',
                'cancel': 'Cancel',
                'save': 'Save',
                'edit': 'Edit',
                'delete': 'Delete',
                'confirm': 'Confirm',
                'close': 'Close',
                'back': 'Back',
                'next': 'Next',
                'previous': 'Previous',
                'submit': 'Submit',
                'search': 'Search',
                'filter': 'Filter',
                'sort': 'Sort',
                'view': 'View',
                'download': 'Download',
                'upload': 'Upload',
                'share': 'Share',
                'like': 'Like',
                'comment': 'Comment',
                'follow': 'Follow',
                'unfollow': 'Unfollow',
                'profile': 'Profile',
                'account': 'Account',
                'notifications': 'Notifications',
                'messages': 'Messages',
                'inbox': 'Inbox',
                'sent': 'Sent',
                'draft': 'Draft',
                'trash': 'Trash',
                'archive': 'Archive',
                'favorites': 'Favorites',
                'bookmarks': 'Bookmarks',
                'history': 'History',
                'recent': 'Recent',
                'popular': 'Popular',
                'trending': 'Trending',
                'new': 'New',
                'hot': 'Hot',
                'featured': 'Featured',
                'premium': 'Premium',
                'free': 'Free',
                'paid': 'Paid',
                'trial': 'Trial',
                'demo': 'Demo',
                'beta': 'Beta',
                'alpha': 'Alpha',
                'stable': 'Stable',
                'latest': 'Latest',
                'oldest': 'Oldest',
                'best': 'Best',
                'worst': 'Worst',
                'highest': 'Highest',
                'lowest': 'Lowest',
                'most': 'Most',
                'least': 'Least',
                'all': 'All',
                'none': 'None',
                'some': 'Some',
                'many': 'Many',
                'few': 'Few',
                'several': 'Several',
                'multiple': 'Multiple',
                'single': 'Single',
                'double': 'Double',
                'triple': 'Triple',
                'quadruple': 'Quadruple',
                'quintuple': 'Quintuple',
                'sextuple': 'Sextuple',
                'septuple': 'Septuple',
                'octuple': 'Octuple',
                'nonuple': 'Nonuple',
                'decuple': 'Decuple'
            }
        };
        
        this.init();
    }
    
    init() {
        this.setLanguage(this.currentLanguage);
        this.createLanguageSwitcher();
        this.translatePage();
    }
    
    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        
        // Update HTML lang attribute and direction
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Add/remove RTL class for CSS
        if (lang === 'ar') {
            document.body.classList.add('rtl');
            document.body.classList.remove('ltr');
        } else {
            document.body.classList.add('ltr');
            document.body.classList.remove('rtl');
        }
    }
    
    getText(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
    
    translatePage() {
        // Find all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getText(key);
            
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = translation;
            } else if (element.tagName === 'IMG') {
                element.alt = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Update dynamic content
        this.updateDynamicContent();
    }
    
    updateDynamicContent() {
        // Update welcome message based on time
        const welcomeElements = document.querySelectorAll('.welcome');
        welcomeElements.forEach(element => {
            const hour = new Date().getHours();
            let welcomeKey = 'welcome-morning';
            
            if (hour >= 12 && hour < 17) {
                welcomeKey = 'welcome-afternoon';
            } else if (hour >= 17) {
                welcomeKey = 'welcome-evening';
            }
            
            element.textContent = this.getText(welcomeKey);
        });
    }
    
    createLanguageSwitcher() {
        // Check if language switcher already exists
        if (document.querySelector('.language-switcher')) {
            return;
        }
        
        // Create language switcher
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${this.currentLanguage === 'ar' ? 'active' : ''}" data-lang="ar">
                <span>العربية</span>
            </button>
            <button class="lang-btn ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">
                <span>English</span>
            </button>
        `;
        
        // Add event listeners
        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.closest('.lang-btn').dataset.lang;
                this.switchLanguage(lang);
            });
        });
        
        // Insert into header at the beginning (left side)
        const header = document.querySelector('header nav');
        if (header) {
            header.insertBefore(switcher, header.firstChild);
        }
    }
    
    switchLanguage(lang) {
        this.setLanguage(lang);
        this.translatePage();
        
        // Update language switcher buttons
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Trigger custom event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
} 