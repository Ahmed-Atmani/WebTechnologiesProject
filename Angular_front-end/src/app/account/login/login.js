document.addEventListener('DOMContentLoaded', function () {
    var showToggle = document.getElementById('showToggle');
    var password = document.getElementById('password');
    showToggle.addEventListener('click', function () {
        if (password.type === 'password') {
            password.type = 'text';
        }
        else {
            password.type = 'password';
        }
    });
});
