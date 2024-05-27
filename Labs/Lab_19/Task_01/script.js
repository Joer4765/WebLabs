const signupUsernameEl = document.querySelector('#username');
const loginUsernameEl = document.querySelector('#login-username');
const emailEl = document.querySelector('#email');
const signupPasswordEl = document.querySelector('#password');
const loginPasswordEl = document.querySelector('#login-password');
const confirmPasswordEl = document.querySelector('#confirm-password');

const signupForm = document.querySelector('#signup');
const loginForm = document.querySelector('#login');

const logoutButton = document.getElementById('logout');
const deleteAccountButton = document.getElementById('delete-account');
const mainPage = document.getElementById('main-page');
const container = document.querySelector('.container');

const tabs = document.querySelectorAll(".tab-button");
const forms = document.querySelectorAll(".form");

const passwordInputs = document.querySelectorAll(".form-field.password");

passwordInputs.forEach(passwordInput => {
    let passwordToggle = passwordInput.querySelector(".password-toggle-icon i");
    let passwordField = passwordInput.querySelector("input[type='password']");
    passwordToggle.addEventListener("click", () => {
        if (passwordField.type === "password") {
            passwordField.type = "text";
            passwordToggle.classList.remove("fa-eye");
            passwordToggle.classList.add("fa-eye-slash");
        } else {
            passwordField.type = "password";
            passwordToggle.classList.remove("fa-eye-slash");
            passwordToggle.classList.add("fa-eye");
        }
    });
});


tabs.forEach(tab => {
    tab.addEventListener("click", function () {
        forms.forEach(form => {
            form.style.display = "none";
        });
        tabs.forEach(t => {
            t.classList.remove("active");
        });
        document.getElementById(tab.id.replace('-tab', '')).style.display = "block";
        tab.classList.add("active");
    });
});


const checkUsername = (usernameElement) => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameElement.value.trim();

    if (!isRequired(username)) {
        showError(usernameElement, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameElement, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameElement);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = (passwordElement) => {

    let valid = false;

    const password = passwordElement.value.trim();

    if (!isRequired(password)) {
        showError(passwordElement.parentElement, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordElement.parentElement, 'Password must has at lea st 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordElement.parentElement);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = signupPasswordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl.parentElement, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl.parentElement, 'The password does not match');
    } else {
        showSuccess(confirmPasswordEl.parentElement);
        valid = true;
    }

    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value !== '';
const isBetween = (length, min, max) => !(length < min || length > max);


const showError = (input, message) => {
    const formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = '';
}


function simulateSubmit(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(Math.random() > 0.5) {
                resolve(true);
            } else {
                reject(new Error('Server error'));
            }
        }, 1500);
    });
}

function submitForm(data, form) {
    const loader = document.getElementById('loader')
    const tint = document.getElementById('tint')
    loader.style.display = 'block';
    tint.style.display = 'block';
    simulateSubmit(data).then(() => {
        loader.style.display = 'none';
        tint.style.display = 'none';
        alert('Form submitted successfully');
        form.reset();
    }).catch(err => {
        loader.style.display = 'none';
        tint.style.display = 'none';
        alert(err.message);
    });
}


signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isUsernameValid = checkUsername(signupUsernameEl),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(signupPasswordEl),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    if (isFormValid) {
        submitForm(new FormData(this), signupForm);
    }
});

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isUsernameValid = checkUsername(loginUsernameEl),
        isPasswordValid = checkPassword(loginPasswordEl);

    let isFormValid = isUsernameValid && isPasswordValid;

    if (isFormValid) {
        submitForm(new FormData(this), loginForm);
    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};
//
signupForm.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername(signupUsernameEl);
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword(signupPasswordEl);
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));

loginForm.addEventListener('input', debounce((e) => {
    switch (e.target.id) {
        case 'login-username':
            checkUsername(loginUsernameEl);
            break;
        case 'login-password':
            checkPassword(loginPasswordEl);
            break;
    }
}));

document.getElementById("login-tab").click(); // Default form