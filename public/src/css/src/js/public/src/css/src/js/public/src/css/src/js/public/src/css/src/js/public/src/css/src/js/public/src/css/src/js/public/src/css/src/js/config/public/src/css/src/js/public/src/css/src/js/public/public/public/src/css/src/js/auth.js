/* ===================================
   AUTHENTICATION JAVASCRIPT
   Version 1.0
   =================================== */

// ===== AUTH MANAGER =====
class AuthManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    init() {
        this.setupEventListeners();
        if (typeof PreloaderManager !== 'undefined') {
            PreloaderManager.hide();
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('login')) return 'login';
        if (path.includes('register')) return 'register';
        if (path.includes('forgot-password')) return 'forgot-password';
        return null;
    }

    setupEventListeners() {
        if (this.currentPage === 'login') {
            this.setupLoginPage();
        } else if (this.currentPage === 'register') {
            this.setupRegisterPage();
        } else if (this.currentPage === 'forgot-password') {
            this.setupForgotPasswordPage();
        }
    }

    // ===== LOGIN PAGE =====
    setupLoginPage() {
        const form = document.getElementById('loginForm');
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        const googleBtn = document.getElementById('googleLoginBtn');
        const facebookBtn = document.getElementById('facebookLoginBtn');

        // Toggle password visibility
        if (togglePassword) {
            togglePassword.addEventListener('click', () => {
                this.togglePasswordVisibility(passwordInput, togglePassword);
            });
        }

        // Form submission
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Social login
        if (googleBtn) {
            googleBtn.addEventListener('click', () => {
                this.handleSocialLogin('google');
            });
        }

        if (facebookBtn) {
            facebookBtn.addEventListener('click', () => {
                this.handleSocialLogin('facebook');
            });
        }
    }

    handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Validation
        if (!this.validateEmail(email)) {
            this.showError('emailError', 'Please enter a valid email address');
            return;
        }

        if (!this.validatePassword(password)) {
            this.showError('passwordError', 'Password must be at least 6 characters');
            return;
        }

        // Mock login
        const user = {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            email: email,
            firstName: email.split('@')[0],
            lastName: 'User',
            createdAt: new Date().toISOString()
        };

        localStorage.setItem('userProfile', JSON.stringify(user));
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }

        alert('Login successful! Redirecting to account...');
        window.location.href = '/account';
    }

    handleSocialLogin(provider) {
        alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login - Coming soon!`);
    }

    // ===== REGISTER PAGE =====
    setupRegisterPage() {
        const form = document.getElementById('registerForm');
        const togglePassword = document.getElementById('toggleRegisterPassword');
        const toggleConfirm = document.getElementById('toggleConfirmPassword');
        const passwordInput = document.getElementById('registerPassword');
        const confirmInput = document.getElementById('confirmPassword');
        const googleBtn = document.getElementById('googleRegisterBtn');
        const facebookBtn = document.getElementById('facebookRegisterBtn');

        // Toggle password visibility
        if (togglePassword) {
            togglePassword.addEventListener('click', () => {
                this.togglePasswordVisibility(passwordInput, togglePassword);
            });
        }

        if (toggleConfirm) {
            toggleConfirm.addEventListener('click', () => {
                this.togglePasswordVisibility(confirmInput, toggleConfirm);
            });
        }

        // Password strength indicator
        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                this.updatePasswordStrength(passwordInput.value);
            });
        }

        // Form submission
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }

        // Social register
        if (googleBtn) {
            googleBtn.addEventListener('click', () => {
                this.handleSocialLogin('google');
            });
        }

        if (facebookBtn) {
            facebookBtn.addEventListener('click', () => {
                this.handleSocialLogin('facebook');
            });
        }
    }

    handleRegister() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        const subscribeNewsletter = document.getElementById('subscribeNewsletter').checked;

        // Validation
        if (!firstName.trim()) {
            this.showError('firstNameError', 'First name is required');
            return;
        }

        if (!lastName.trim()) {
            this.showError('lastNameError', 'Last name is required');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showError('registerEmailError', 'Please enter a valid email address');
            return;
        }

        if (!this.validatePassword(password)) {
            this.showError('registerPasswordError', 'Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            this.showError('confirmPasswordError', 'Passwords do not match');
            return;
        }

        if (!agreeTerms) {
            this.showError('agreeTermsError', 'You must agree to the terms and conditions');
            return;
        }

        // Mock registration
        const user = {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            email: email,
            firstName: firstName,
            lastName: lastName,
            createdAt: new Date().toISOString(),
            subscribed: subscribeNewsletter,
            tier: 'bronze',
            points: 0
        };

        localStorage.setItem('userProfile', JSON.stringify(user));
        
        alert('Account created successfully! Welcome to DANHAYS!');
        window.location.href = '/account';
    }

    updatePasswordStrength(password) {
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        let strength = 0;

        if (password.length >= 6) strength += 1;
        if (password.length >= 12) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[!@#$%^&*]/.test(password)) strength += 1;

        let level = 'weak';
        let percentage = 33;

        if (strength >= 3) {
            level = 'medium';
            percentage = 66;
        }

        if (strength >= 4) {
            level = 'strong';
            percentage = 100;
        }

        strengthBar.className = `strength-bar ${level}`;
        strengthBar.style.width = percentage + '%';
        strengthText.textContent = `Password strength: ${level.toUpperCase()}`;
    }

    // ===== FORGOT PASSWORD PAGE =====
    setupForgotPasswordPage() {
        const form = document.getElementById('forgotPasswordForm');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleForgotPassword();
            });
        }
    }

    handleForgotPassword() {
        const email = document.getElementById('resetEmail').value;

        if (!this.validateEmail(email)) {
            this.showError('resetEmailError', 'Please enter a valid email address');
            return;
        }

        // Mock reset email
        this.clearError('resetEmailError');
        const successMsg = document.getElementById('resetSuccess');
        successMsg.textContent = `Password reset link sent to ${email}. Check your inbox!`;
        successMsg.classList.add('show');
        successMsg.style.display = 'block';

        // Disable form
        document.getElementById('forgotPasswordForm').style.display = 'none';
    }

    // ===== UTILITY FUNCTIONS =====
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    validatePassword(password) {
        return password && password.length >= 6;
    }

    togglePasswordVisibility(inputElement, buttonElement) {
        if (inputElement.type === 'password') {
            inputElement.type = 'text';
            buttonElement.textContent = '🙈';
        } else {
            inputElement.type = 'password';
            buttonElement.textContent = '👁️';
        }
    }

    showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.classList.add('show');
            element.style.display = 'block';

            // Find input field and add error class
            const form = element.closest('.auth-form');
            if (form) {
                const inputs = form.querySelectorAll('input');
                inputs.forEach(input => {
                    if (input.id && elementId.includes(input.id.replace('Error', ''))) {
                        input.classList.add('error');
                    }
                });
            }
        }
    }

    clearError(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = '';
            element.classList.remove('show');
            element.style.display = 'none';

            const form = element.closest('.auth-form');
            if (form) {
                const inputs = form.querySelectorAll('input');
                inputs.forEach(input => input.classList.remove('error'));
            }
        }
    }
}

// ===== INITIALIZATION =====
let authManager;
document.addEventListener('DOMContentLoaded', () => {
    authManager = new AuthManager();
});
