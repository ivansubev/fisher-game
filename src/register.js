async function start() {
    let homeButton = document.getElementById('home');
    let logoutButton = document.getElementById('logout');
    let loginButton = document.getElementById('login');
    let registerButton = document.getElementById('register');

    if (!sessionStorage.getItem('accessToken')) {
        logoutButton.setAttribute('style', 'display:none')
    }
    else {
        logoutButton.setAttribute('style', 'display:inline-block')
        loginButton.setAttribute('style', 'display:none');
        registerButton.setAttribute('style', 'display:none')
    }

    let formElement = document.querySelector('form')
    formElement.addEventListener('submit', registerUser);

    async function registerUser(ev) {
        ev.preventDefault();
        let submitData = new FormData(ev.target);
        let email = submitData.get('email');
        let pass = submitData.get('password');
        let pass2 = submitData.get('rePass');
        try {
            if (email == '' || pass == '') {
                throw new Error('All fields are required!')
            }
            if (pass != pass2) {
                throw new Error("Passwords must match!")
            }
            let userInfo = {
                'email': email,
                'password': pass
            }
            let response = await fetch('http://localhost:3030/users/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
            if (response.ok == false) {
                let error = await response.json()
                throw new Error(error.message)
            }
            let data = await response.json()
            sessionStorage.setItem('accessToken', data['accessToken']);
            sessionStorage.setItem('id', data['_id']);
            window.location = 'index.html';

            
        } catch (error) {
            window.alert(error.message)
        }
    }
}

start()