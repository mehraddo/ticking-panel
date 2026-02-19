let users = [];
const saved = localStorage.getItem('users');
if (saved) {
    users = JSON.parse(saved);
}
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
function isEnglishName(value) {
    return /^[A-Za-z]+$/.test(value);
}
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
    users.forEach(function (user, index) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${user.nameInput} ${user.lastName} - ${user.email}
            <button class="delete-btn" data-index="${index}">
                حذف
            </button>`;
        userList.appendChild(li);
    });
    localStorage.setItem('users', JSON.stringify(users));
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
    console.error('فرم المنت پیدا نشد ');
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
    if (!isEnglishName(nameInput.value)) {
        alert('نام خود را "انگلیسی وارد کنید"');
        return;
    }
    if (!isEnglishName(lastNameInput.value)) {
        alert('نام خانوادگی را انگلیسی پر کنید');
        return;
    }
    if (!emailInput.checkValidity()) {
        alert('جدی باهام ؟ فرمت ایمیل درست نیست مشتی');
        return;
    }
    function isAdult(dateString) {
        const today = new Date();
        const birthDate = new Date(dateString);
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18 && birthDate < today;
    }
    if (!isAdult(dobInput.value)) {
        alert('   سنت زیر 18 ساله جوجو نمیتونم ثبت نامت کنم :) ');
        return;
    }
    if (passwordInput.value.length < 8) {
        alert('رمز عبور باید 8 کارتر باشه به بالا :(');
        return;
    }
    const result = zxcvbn(passwordInput.value);
    if (result.score < 2) {
        alert('رمز عبورت زیادی ضعیفه');
        return;
    }
    const photoInput = document.getElementById('profilePhoto');
    let profilePhoto = 'no-photo';
    if (photoInput.files.length > 0) {
        const file = photoInput.files[0];

        const allowedTypes = ['image/jpeg', 'image/png'];

        if (!allowedTypes.includes(file.type)) {
            alert('فرمت عکس معتبر نیست');
            return;
        }
        if (file.size > 80 * 1024) {
            alert('فرمت 80 کیلوبایت الرت داد ؟');
            return;
        }
        profilePhoto = file;
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
    nameInput.value = '';
    emailInput.value = '';
    photoInput.value = '';
    closeModal();
});
userList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        users.splice(index, 1);
        saveUsers();
        renderUsers();
    }
});
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}
function deleteUser(index) {
    users.splice(index, 1);

    localStorage.setItem('users', JSON.stringify(users));

    renderUsers();
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
