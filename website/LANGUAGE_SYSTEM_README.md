# B - Study Language System

## Overview
The B - Study website now supports both Arabic (default) and English languages with automatic RTL/LTR direction switching.

## Features
- ✅ **Arabic as default language**
- ✅ **English language support**
- ✅ **Automatic RTL/LTR direction switching**
- ✅ **Language persistence using localStorage**
- ✅ **Professional language switcher UI**
- ✅ **Responsive design**
- ✅ **Accessibility support**

## How It Works

### 1. Language Switcher
The language switcher appears in the header of all pages and allows users to switch between Arabic and English.

### 2. Translation System
All text content uses `data-i18n` attributes that automatically translate when the language changes.

### 3. Direction Switching
- **Arabic**: RTL (Right-to-Left) layout
- **English**: LTR (Left-to-Right) layout

## Files Structure

```
website/
├── javascript/
│   └── language.js          # Main language management system
├── styles/
│   ├── language-switcher.css # Language switcher styles
│   ├── main.css             # Updated with RTL/LTR support
│   └── dashboard-layout.css # Updated with RTL/LTR support
├── landingNew.html          # Updated with language support
├── dashboard.html           # Updated with language support
└── LANGUAGE_SYSTEM_README.md # This file
```

## How to Add Language Support to New Pages

### 1. Include Required Files
Add these lines to the `<head>` section of your HTML file:

```html
<!-- Language switcher styles -->
<link rel="stylesheet" href="./styles/language-switcher.css">

<!-- Language management system -->
<script src="./javascript/language.js"></script>
```

### 2. Set HTML Language and Direction
```html
<html lang="ar">
<body dir="rtl">
```

### 3. Add Language Switcher to Header
The language switcher will be automatically added to the header navigation. Just make sure your header has a `<nav>` element:

```html
<header>
    <nav>
        <!-- Your existing header content -->
        <!-- Language switcher will be added here automatically -->
    </nav>
</header>
```

### 4. Add Translation Attributes
Add `data-i18n` attributes to all text elements:

```html
<!-- Before -->
<h1>Welcome to B - Study</h1>
<p>Start your learning journey</p>

<!-- After -->
<h1 data-i18n="hero-title">Welcome to B - Study</h1>
<p data-i18n="hero-subtitle">Start your learning journey</p>
```

### 5. Add Translations
Add new translation keys to the `translations` object in `language.js`:

```javascript
translations: {
    ar: {
        'new-key': 'النص بالعربية',
        // ... existing translations
    },
    en: {
        'new-key': 'Text in English',
        // ... existing translations
    }
}
```

## Available Translation Keys

### Navigation
- `nav-home` - Home
- `nav-my-courses` - My Courses
- `nav-q-bank` - Question Bank
- `nav-all-courses` - All Courses
- `nav-reviews` - Reviews
- `nav-help` - Help
- `nav-settings` - Settings
- `nav-logout` - Logout

### Landing Page
- `hero-title` - Main hero title
- `hero-subtitle` - Hero subtitle
- `hero-description` - Hero description
- `signup-btn` - Sign up button
- `login-btn` - Login button
- `download-app-title` - Download app title
- `latest-courses` - Latest courses section
- `loading-courses` - Loading courses text

### Course Related
- `course-title` - Course title
- `course-description` - Course description
- `course-duration` - Course duration
- `lecture-count` - Lecture count
- `exam-count` - Exam count
- `buy-now` - Buy now button
- `continue-learning` - Continue learning button

### Dashboard
- `dashboard-title` - Dashboard title
- `welcome-morning` - Good morning
- `welcome-afternoon` - Good afternoon
- `welcome-evening` - Good evening

### Common Actions
- `loading` - Loading text
- `error` - Error text
- `success` - Success text
- `cancel` - Cancel button
- `save` - Save button
- `edit` - Edit button
- `delete` - Delete button
- `confirm` - Confirm button
- `close` - Close button
- `back` - Back button
- `next` - Next button
- `previous` - Previous button
- `submit` - Submit button

## CSS Classes for RTL/LTR Support

### Body Classes
- `body.rtl` - Arabic/RTL layout
- `body.ltr` - English/LTR layout

### Direction Support
```css
/* RTL specific adjustments */
body.rtl .container {
    text-align: right;
}

/* LTR specific adjustments */
body.ltr .container {
    text-align: left;
}
```

## JavaScript API

### Language Manager Instance
```javascript
// Access the language manager
const langManager = window.languageManager;

// Switch language programmatically
langManager.switchLanguage('en'); // Switch to English
langManager.switchLanguage('ar'); // Switch to Arabic

// Get current language
const currentLang = langManager.currentLanguage;

// Get translation
const text = langManager.getText('nav-home');
```

### Events
```javascript
// Listen for language changes
document.addEventListener('languageChanged', (event) => {
    console.log('Language changed to:', event.detail.language);
    // Your custom logic here
});
```

## Browser Storage
The language preference is automatically saved to localStorage and restored on page load.

## Accessibility Features
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ High contrast mode support
- ✅ Reduced motion support
- ✅ Focus indicators

## Browser Compatibility
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Performance
- ✅ Lightweight (minimal JavaScript)
- ✅ No external dependencies
- ✅ Fast language switching
- ✅ Efficient translation lookup

## Troubleshooting

### Language Switcher Not Appearing
1. Make sure `language.js` is loaded
2. Check that your header has a `<nav>` element
3. Verify `language-switcher.css` is included

### Translations Not Working
1. Check that `data-i18n` attributes are correctly set
2. Verify translation keys exist in `language.js`
3. Ensure the language manager is initialized

### RTL/LTR Not Switching
1. Check that `main.css` includes RTL/LTR styles
2. Verify `dir` attribute is set on `<body>`
3. Ensure CSS classes are being applied correctly

## Adding New Languages

To add support for additional languages:

1. **Add language to translations object:**
```javascript
translations: {
    ar: { /* Arabic translations */ },
    en: { /* English translations */ },
    fr: { /* French translations */ } // New language
}
```

2. **Update language switcher HTML:**
```javascript
switcher.innerHTML = `
    <button class="lang-btn ${this.currentLanguage === 'ar' ? 'active' : ''}" data-lang="ar">
        <span>العربية</span>
    </button>
    <button class="lang-btn ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">
        <span>English</span>
    </button>
    <button class="lang-btn ${this.currentLanguage === 'fr' ? 'active' : ''}" data-lang="fr">
        <span>Français</span>
    </button>
`;
```

3. **Add RTL/LTR support for the new language if needed**

## Support
For questions or issues with the language system, please refer to the code comments in `language.js` or contact the development team. 