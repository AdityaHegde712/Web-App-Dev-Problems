document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');

    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const formData = {
            username,
            email,
            password,
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Registration successful');
                registrationForm.reset();
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    });
});
