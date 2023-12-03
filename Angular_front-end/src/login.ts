document.addEventListener('DOMContentLoaded', function() {
const showToggle = document.getElementById('showToggle') as HTMLButtonElement;
const password = document.getElementById('password') as HTMLInputElement;

showToggle.addEventListener('click', function() {

    if (password.type === 'password') {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
});

});