const wrapper = document.querySelector (".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");

registerLink .addEventListener("click",()=>{
    wrapper.classList.add("active");
});
loginLink .addEventListener("click",()=>{
    wrapper.classList.remove("active");
});
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;

            const res = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password,})
            });

            if (res.ok) {
                alert('Usuario registrado');
            } else {
                alert('Error al registrar usuario');
            }
        });

        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('loginPassword').value;

            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                alert('Inicio de sesión exitoso');
            } else {
                alert('Error al iniciar sesión');
            }
        });