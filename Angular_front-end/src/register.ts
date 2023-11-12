document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#registerform')!;
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form as HTMLFormElement);
        fetch('accountAPI', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Handle response as needed
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
