// ===== FORM VALIDATION FUNCTIONALITY =====

class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.errors = {};
        this.isValid = true;
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.setupValidation();
        this.bindEvents();
    }
    
    setupValidation() {
        // Define validation rules
        this.rules = {
            name: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Please enter a valid name (2-50 characters, letters only)'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            phone: {
                required: false,
                pattern: /^[\+]?[1-9][\d]{0,15}$/,
                message: 'Please enter a valid phone number'
            },
            company: {
                required: false,
                maxLength: 100,
                message: 'Company name must be less than 100 characters'
            },
            service: {
                required: true,
                message: 'Please select a service'
            },
            budget: {
                required: false,
                message: 'Please select a budget range'
            },
            timeline: {
                required: false,
                message: 'Please select a timeline'
            },
            message: {
                required: true,
                minLength: 10,
                maxLength: 1000,
                message: 'Please enter a detailed message (10-1000 characters)'
            }
        };
    }
    
    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validateForm();
        });
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }
    
    validateForm() {
        this.isValid = true;
        this.errors = {};
        
        // Validate all fields
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            this.validateField(input);
        });
        
        // Check if form is valid
        if (this.isValid) {
            this.submitForm();
        } else {
            this.displayErrors();
        }
    }
    
    validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const rule = this.rules[fieldName];
        
        if (!rule) return true;
        
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (rule.required && !fieldValue) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} is required`;
        }
        
        // Pattern validation
        if (isValid && fieldValue && rule.pattern && !rule.pattern.test(fieldValue)) {
            isValid = false;
            errorMessage = rule.message;
        }
        
        // Length validation
        if (isValid && fieldValue) {
            if (rule.minLength && fieldValue.length < rule.minLength) {
                isValid = false;
                errorMessage = rule.message;
            }
            
            if (rule.maxLength && fieldValue.length > rule.maxLength) {
                isValid = false;
                errorMessage = rule.message;
            }
        }
        
        // Custom validation
        if (isValid && fieldValue) {
            const customValidation = this.customValidation(fieldName, fieldValue);
            if (!customValidation.isValid) {
                isValid = false;
                errorMessage = customValidation.message;
            }
        }
        
        if (!isValid) {
            this.errors[fieldName] = errorMessage;
            this.isValid = false;
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }
        
        return isValid;
    }
    
    customValidation(fieldName, value) {
        switch (fieldName) {
            case 'email':
                return this.validateEmail(value);
            case 'phone':
                return this.validatePhone(value);
            case 'message':
                return this.validateMessage(value);
            default:
                return { isValid: true };
        }
    }
    
    validateEmail(email) {
        // Additional email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { isValid: false, message: 'Please enter a valid email address' };
        }
        
        // Check for common typos
        const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
        const domain = email.split('@')[1];
        if (domain && !commonDomains.includes(domain)) {
            // Check for typos in common domains
            for (let commonDomain of commonDomains) {
                if (this.calculateLevenshteinDistance(domain, commonDomain) <= 2) {
                    return { 
                        isValid: false, 
                        message: `Did you mean ${email.split('@')[0]}@${commonDomain}?` 
                    };
                }
            }
        }
        
        return { isValid: true };
    }
    
    validatePhone(phone) {
        if (!phone) return { isValid: true };
        
        // Remove all non-digit characters
        const digits = phone.replace(/\D/g, '');
        
        // Check if it's a valid length (7-15 digits)
        if (digits.length < 7 || digits.length > 15) {
            return { isValid: false, message: 'Phone number must be 7-15 digits long' };
        }
        
        return { isValid: true };
    }
    
    validateMessage(message) {
        // Check for spam-like content
        const spamWords = ['free', 'win', 'click here', 'buy now', 'limited time'];
        const lowerMessage = message.toLowerCase();
        
        for (let spamWord of spamWords) {
            if (lowerMessage.includes(spamWord)) {
                return { 
                    isValid: false, 
                    message: 'Please provide a more detailed description of your project' 
                };
            }
        }
        
        return { isValid: true };
    }
    
    showFieldError(field, message) {
        // Remove existing error
        this.clearFieldError(field);
        
        // Add error class
        field.classList.add('error');
        
        // Create error message element
        const errorElement = document.createElement('span');
        errorElement.className = 'form-error';
        errorElement.id = `${field.name}-error`;
        errorElement.textContent = message;
        
        // Insert error message
        field.parentNode.appendChild(errorElement);
        
        // Focus field if it's the first error
        if (Object.keys(this.errors).length === 1) {
            field.focus();
        }
    }
    
    clearFieldError(field) {
        // Remove error class
        field.classList.remove('error');
        
        // Remove error message
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.remove();
        }
        
        // Remove from errors object
        delete this.errors[field.name];
    }
    
    displayErrors() {
        // Scroll to first error
        const firstErrorField = this.form.querySelector('.error');
        if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Show general error message
        this.showGeneralError('Please correct the errors below and try again.');
    }
    
    showGeneralError(message) {
        // Remove existing general error
        const existingError = this.form.querySelector('.general-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Create general error element
        const errorElement = document.createElement('div');
        errorElement.className = 'general-error';
        errorElement.style.cssText = `
            background: #fee;
            color: #c33;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid #fcc;
        `;
        errorElement.textContent = message;
        
        // Insert at top of form
        this.form.insertBefore(errorElement, this.form.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorElement.parentNode) {
                errorElement.remove();
            }
        }, 5000);
    }
    
    async submitForm() {
        const submitButton = this.form.querySelector('.form-submit');
        const buttonText = submitButton.querySelector('.btn-text');
        const buttonLoading = submitButton.querySelector('.btn-loading');
        
        // Show loading state
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'flex';
        submitButton.disabled = true;
        
        try {
            // Collect form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate form submission (replace with actual endpoint)
            const response = await this.submitToServer(data);
            
            if (response.success) {
                this.showSuccessMessage();
                this.form.reset();
            } else {
                this.showGeneralError(response.message || 'There was an error submitting your form. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showGeneralError('There was an error submitting your form. Please try again.');
        } finally {
            // Reset button state
            buttonText.style.display = 'block';
            buttonLoading.style.display = 'none';
            submitButton.disabled = false;
        }
    }
    
    async submitToServer(data) {
        // Simulate API call (replace with actual implementation)
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate success
                resolve({ success: true, message: 'Form submitted successfully!' });
                
                // In a real implementation, you would make an actual API call:
                // fetch('/api/contact', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(data)
                // })
                // .then(response => response.json())
                // .then(result => resolve(result))
                // .catch(error => reject(error));
            }, 2000);
        });
    }
    
    showSuccessMessage() {
        // Create success message
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.style.cssText = `
            background: #efe;
            color: #363;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid #cfc;
            text-align: center;
        `;
        successElement.innerHTML = `
            <h3 style="margin: 0 0 0.5rem 0; color: #363;">Thank You!</h3>
            <p style="margin: 0;">Your message has been sent successfully. We'll get back to you within 24 hours.</p>
        `;
        
        // Replace form content
        this.form.innerHTML = '';
        this.form.appendChild(successElement);
        
        // Track successful submission
        if (typeof trackEvent === 'function') {
            trackEvent('Form', 'Success', 'Contact Form');
        }
    }
    
    getFieldLabel(fieldName) {
        const labels = {
            name: 'Full Name',
            email: 'Email Address',
            phone: 'Phone Number',
            company: 'Company',
            service: 'Service Interest',
            budget: 'Project Budget',
            timeline: 'Project Timeline',
            message: 'Project Description'
        };
        
        return labels[fieldName] || fieldName;
    }
    
    calculateLevenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }
}

// ===== INITIALIZE FORM VALIDATION =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        window.formValidator = new FormValidator('contact-form');
    }
});

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidator;
}

