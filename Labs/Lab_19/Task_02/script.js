const signupUsernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const signupPasswordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');

const loginUsernameEl = document.querySelector('#login-username');
const loginPasswordEl = document.querySelector('#login-password');

const signupForm = document.querySelector('#signup');
const loginForm = document.querySelector('#login');

const logoutButton = document.getElementById('logout');
const deleteAccountButton = document.getElementById('delete-account');
const mainPage = document.getElementById('main-page');
const container = document.querySelector('.container');
const authorizationPage = document.getElementById('authorization-page');

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

    const min = 3, max = 25;

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
            if (Math.random() > 0.5) {
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
        // loader.style.display = 'none';
        // tint.style.display = 'none';
        // alert('Form submitted successfully');
        form.reset();
    }).catch(err => {
        throw new Error(err.message);
    }).finally(() => {
        loader.style.display = 'none';
        tint.style.display = 'none';
    });
}

signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const userData = {
        username: signupUsernameEl.value,
        email: emailEl.value,
        password: signupPasswordEl.value,
    }

    let isUsernameValid = checkUsername(signupUsernameEl), isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(signupPasswordEl), isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

    if (isFormValid) {
        const storedUsername = JSON.parse(localStorage.getItem('user'))?.username;
        const storedPassword = JSON.parse(localStorage.getItem('user'))?.password;

        const username = signupUsernameEl.value;
        const password = signupPasswordEl.value;

        if (!(password === storedPassword && storedUsername === username)) {
            try {
                submitForm(new FormData(this), signupForm);
                localStorage.setItem('user', JSON.stringify(userData));
                mainPage.style.display = 'block';
                authorizationPage.style.display = 'none';
            } catch (e) {
                alert(e.message);
            }
        } else {
            alert(`User already exists`);
        }
    }
});

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isUsernameValid = checkUsername(loginUsernameEl), isPasswordValid = checkPassword(loginPasswordEl);

    let isFormValid = isUsernameValid && isPasswordValid;

    if (isFormValid) {
        const username = loginUsernameEl.value;
        const password = loginPasswordEl.value;
        const storedUsername = JSON.parse(localStorage.getItem('user'))?.username;
        const storedPassword = JSON.parse(localStorage.getItem('user'))?.password;
        if (password === storedPassword && storedUsername === username) {
            try {
                submitForm(new FormData(this), loginForm);
                mainPage.style.display = 'block';
                authorizationPage.style.display = 'none';
            } catch (e) {
                alert(e.message);
            }
        } else {
            alert('Incorrect username or password!');
        }
    }
});

logoutButton.addEventListener('click', function () {
    mainPage.style.display = 'none';
    authorizationPage.style.display = 'flex';
});

deleteAccountButton.addEventListener('click', function () {
    localStorage.removeItem('user');
    // alert('Account deleted successfully!');
    mainPage.style.display = 'none';
    authorizationPage.style.display = 'flex';
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


let usersGlobal = [];
let currentPage = 1;
const resultsPerPage = 50;

async function fetchUsers() {
    try {
        const response = await fetch(`https://randomuser.me/api/?results=${resultsPerPage}&page=${currentPage}`);
        const data = await response.json();
        usersGlobal = [...usersGlobal, ...data.results]; // Append new users to the global array
        displayUsers(usersGlobal);
        currentPage++; // Increment the page number for the next API call
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Event listener for infinite scrolling
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        fetchUsers(); // Load more users when scrolling to the bottom
    }
});

function displayUsers(users) {
    const container = document.getElementById('user-cards-container');
    container.innerHTML = '';
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
            <img src="${user.picture.large}" alt="Profile Picture">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>Age: ${user.dob.age}</p>
            <p>Phone: ${user.phone}</p>
            <p>Email: ${user.email}</p>
            <p>Registation date: ${user.registered.date}</p>
            <p>Country: ${user.location.country}</p>
            <p>State: ${user.location.state}</p>
            <p>City: ${user.location.city}</p>
        `;
        container.appendChild(card);
    });
}


document.getElementById('sort-by').addEventListener('change', function() {
    sortUsers(this.value);
    updateURL();
});

function sortUsers(sortMethod) {
    switch (sortMethod) {
        case 'name-asc':
            usersGlobal.sort((a, b) => a.name.first.localeCompare(b.name.first));
            break;
        case 'name-desc':
            usersGlobal.sort((a, b) => b.name.first.localeCompare(a.name.first));
            break;
        case 'age-asc':
            usersGlobal.sort((a, b) => a.dob.age - b.dob.age);
            break;
        case 'age-desc':
            usersGlobal.sort((a, b) => b.dob.age - a.dob.age);
            break;
        case 'date-asc':
            usersGlobal.sort((a, b) => new Date(a.registered.date) - new Date(b.registered.date));
            break;
        case 'date-desc':
            usersGlobal.sort((a, b) => new Date(b.registered.date) - new Date(a.registered.date));
            break;
    }
    displayUsers(usersGlobal);
}

function updateURL() {
    const nameFilter = document.getElementById('filter-name').value;
    const ageFilter = document.getElementById('filter-age').value;
    const locationFilter = document.getElementById('filter-location').value;
    const emailFilter = document.getElementById('filter-email').value;
    const sortBy = document.getElementById('sort-by').value;

    const queryParams = new URLSearchParams({
        name: nameFilter,
        age: ageFilter,
        location: locationFilter,
        email: emailFilter,
        sort: sortBy
    });

    history.pushState({}, '', '?' + queryParams.toString());
}

// Add this call inside your existing event listeners for filters and sorting
document.querySelectorAll('#filter-name, #filter-age, #filter-location, #filter-email').forEach(input => {
    input.addEventListener('input', () => {
        handleFilterChange();
        updateURL();
    });
});

function handleFilterChange() {
    const filteredUsers = usersGlobal.filter(user => {
        const nameMatch = user.name.first.toLowerCase().includes(document.getElementById('filter-name').value.toLowerCase()) ||
            user.name.last.toLowerCase().includes(document.getElementById('filter-name').value.toLowerCase());
        const ageMatch = user.dob.age.toString().includes(document.getElementById('filter-age').value);
        const locationMatch = user.location.city.toLowerCase().includes(document.getElementById('filter-location').value.toLowerCase()) ||
            user.location.state.toLowerCase().includes(document.getElementById('filter-location').value.toLowerCase()) ||
            user.location.country.toLowerCase().includes(document.getElementById('filter-location').value.toLowerCase());
        const emailMatch = user.email.toLowerCase().includes(document.getElementById('filter-email').value.toLowerCase());

        return nameMatch && (ageMatch || document.getElementById('filter-age').value === '') && locationMatch && emailMatch;
    });
    displayUsers(filteredUsers);
}

function setFiltersAndSortingFromURL() {
    const queryParams = new URLSearchParams(window.location.search);
    document.getElementById('filter-name').value = queryParams.get('name') || '';
    document.getElementById('filter-age').value = queryParams.get('age') || '';
    document.getElementById('filter-location').value = queryParams.get('location') || '';
    document.getElementById('filter-email').value = queryParams.get('email') || '';
    document.getElementById('sort-by').value = queryParams.get('sort') || 'name-asc';

    sortUsers(document.getElementById('sort-by').value);
    handleFilterChange(); // Update the display based on the initial filters and sorting
}

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers().then(() => {
        setFiltersAndSortingFromURL();
        }
    );
    // fetchUsers();
});

document.getElementById("login-tab").click();
if (localStorage.getItem('user')) {
    mainPage.style.display = 'block';
    authorizationPage.style.display = 'none';
}