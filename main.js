let users = [];
let editIndex = null;
const userList = document.getElementById('userList');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const form = document.getElementById('userForm');
const errorMessage = document.getElementById('errorMassage');
const emailInput = document.getElementById('emailInput');
const nameInput = document.getElementById('nameInput');
const lastNameInput = document.getElementById('lastName');
const passwordInput = document.getElementById('password');
const dobInput = document.getElementById('dateofbrith');
const countryInput = document.getElementById('country');
const photoInput = document.getElementById('profilePhoto');
users = [];

function openModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
function renderUsers() {
    userList.innerHTML = '';

    users.forEach(function (user) {
        const li = document.createElement('li');

        li.textContent =
            user.nameInput + ' ' + user.lastName + ' - ' + user.email;

        userList.appendChild(li);
    });
}
if (
    !form ||
    !nameInput ||
    !lastNameInput ||
    !emailInput ||
    !passwordInput ||
    !dobInput ||
    !countryInput ||
    !photoInput
) {
    console.error('Some form elements not found');
} else {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = {
            nameInput: nameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            dob: dobInput.value,
            country: countryInput.value,
            photo: photoInput.files[0],
        };

        console.log(data);
    });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();

    if (!nameValue || !emailValue) {
        errorMessage.classList.remove('hidden');
        alert('برای ثبت نام لازمه که پر کنی :)');
        return;
    }

    errorMessage.classList.add('hidden');

    const user = {
        nameInput: nameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        dob: dobInput.value,
        country: countryInput.value,
        profilePhoto: photoInput.files[0] || 'no-photo',
    };

    users.push(user);
    renderUsers();
    form.reset();
    closeModal();
    nameInput.value = '';
    emailInput.value = '';

    closeModal();
});
userList.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        const index = e.target.getAttribute('data-index');

        users.splice(index, 1);

        renderUsers();
    }
    saveUsers();
    renderUsers();
});
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}
renderUsers();
async function loadCountries() {
    try {
        const response = await fetch(
            'https://restcountries.com/v3.1/all?fields=name',
        );

        const countries = await response.json();

        countryInput.innerHTML = '';

        countries.forEach((country) => {
            const option = document.createElement('option');

            option.value = country.name.common;
            option.textContent = country.name.common;

            countryInput.appendChild(option);
        });
    } catch (error) {
        console.error('Country API error:', error);
    }
}

loadCountries();
