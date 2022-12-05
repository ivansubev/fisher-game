async function login() {
    let formElement = document.getElementsByTagName('form')[0]
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

    formElement.addEventListener('submit', onSubmit);

    async function onSubmit(ev) {
        ev.preventDefault();
        let submitData = new FormData(ev.target);
        let email = submitData.get('email')
        let password = submitData.get('password')
        let userInfo = {
            'email': email,
            'password': password
        }
        try {
            if (email == '' || password == '') {
                throw new Error("All fields are required")
            }
            let response = await fetch('http://localhost:3030/users/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
            console.log(response)
            if (response.ok == false) {
                let error = await response.json()
                throw new Error(error.message)
            }
            let data = await response.json()
            console.log(data)
            sessionStorage.setItem('accessToken', data['accessToken'])
            sessionStorage.setItem('id', data['_id'])
            window.location = 'index.html'
        }
        catch (err) {
            window.alert(err.message)
        }
    }
}

login()