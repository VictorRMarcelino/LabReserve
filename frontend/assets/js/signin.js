class SignupForm {
    constructor() {
        this.form = document.getElementById('signupForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.confirmPasswordInput = document.getElementById('confirmPassword');
        this.termsCheckbox = document.getElementById('agreeTerms');
        this.signupBtn = document.getElementById('signupBtn');
        this.notification = document.getElementById('notification');
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupInputValidation();
        this.setupSocialButtons();
    }

    setupInputValidation() {
        // Validação em tempo real
        [this.emailInput, this.passwordInput, this.confirmPasswordInput].forEach(input => {
            input.addEventListener('input', () => {
                this.validateField(input);
            });

            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });

        // Validação dos termos
        this.termsCheckbox.addEventListener('change', () => {
            this.validateTerms();
        });
    }

    validateField(input) {
        const value = input.value.trim();
        const field = input.name;
        const errorElement = input.parentElement.querySelector('.error-message');

        // Limpa erro anterior
        input.parentElement.classList.remove('error');
        errorElement.textContent = '';

        if (!value) {
            this.showFieldError(input, errorElement, 'Este campo é obrigatório');
            return false;
        }

        switch(field) {
            case 'email':
                if (!this.isValidEmail(value)) {
                    this.showFieldError(input, errorElement, 'Digite um e-mail válido');
                    return false;
                }
                break;

            case 'password':
                if (value.length < 6) {
                    this.showFieldError(input, errorElement, 'A senha deve ter pelo menos 6 caracteres');
                    return false;
                }
                break;

            case 'confirmPassword':
                if (value !== this.passwordInput.value) {
                    this.showFieldError(input, errorElement, 'As senhas não coincidem');
                    return false;
                }
                break;
        }

        input.parentElement.classList.add('success');
        return true;
    }

    validateTerms() {
        const termsError = document.getElementById('termsError');
        
        if (!this.termsCheckbox.checked) {
            termsError.textContent = 'Você deve aceitar os termos';
            return false;
        }

        termsError.textContent = '';
        return true;
    }

    showFieldError(input, errorElement, message) {
        input.parentElement.classList.add('error');
        input.parentElement.classList.remove('success');
        errorElement.textContent = message;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Valida todos os campos
        const isEmailValid = this.validateField(this.emailInput);
        const isPasswordValid = this.validateField(this.passwordInput);
        const isConfirmPasswordValid = this.validateField(this.confirmPasswordInput);
        const isTermsValid = this.validateTerms();

        if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isTermsValid) {
            this.showNotification('Por favor, corrija os erros no formulário', 'error');
            return;
        }

        // Simular processo de cadastro
        await this.simulateSignup();
    }

    async simulateSignup() {
        this.setLoading(true);

        try {
            // Simular requisição à API
            await new Promise(resolve => setTimeout(resolve, 1500));

            const formData = {
                email: this.emailInput.value.trim(),
                password: this.passwordInput.value,
                agreeTerms: this.termsCheckbox.checked
            };

            console.log('Dados do cadastro:', formData);

            // Simular resposta de sucesso
            this.showNotification('Conta criada com sucesso!', 'success');
            
            // Redirecionar após cadastro bem-sucedido
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);

        } catch (error) {
            this.showNotification('Erro ao criar conta. Tente novamente.', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(isLoading) {
        if (isLoading) {
            this.signupBtn.classList.add('loading');
            this.signupBtn.disabled = true;
        } else {
            this.signupBtn.classList.remove('loading');
            this.signupBtn.disabled = false;
        }
    }

    showNotification(message, type) {
        this.notification.textContent = message;
        this.notification.className = `notification ${type} show`;
        
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 4000);
    }

    setupSocialButtons() {
        // Google Signup
        document.querySelector('.google-btn').addEventListener('click', () => {
            this.showNotification('Redirecionando para autenticação com Google...', 'success');
            // Implementar autenticação com Google
        });

        // GitHub Signup
        document.querySelector('.github-btn').addEventListener('click', () => {
            this.showNotification('Redirecionando para autenticação com GitHub...', 'success');
            // Implementar autenticação com GitHub
        });

        // Login link
        document.querySelector('.login-link a').addEventListener('click', (e) => {
            e.preventDefault();
            this.showNotification('Redirecionando para login...', 'success');
            setTimeout(() => {
                window.location.href = '/login';
            }, 1000);
        });
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new SignupForm();
});