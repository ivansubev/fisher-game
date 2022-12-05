async function start(){
    let homeButton = document.getElementById('home');
    let logoutButton = document.getElementById('logout');
    let loginButton = document.getElementById('login');
    let registerButton = document.getElementById('register');
    let addCatchForm = document.getElementById('addForm');
    let catchesDiv = document.getElementById('catches');
    let addCatchButton = document.getElementsByClassName('add')[0];
    let loadButton = document.getElementsByClassName('load')[0];

    logoutButton.addEventListener('click', onLogout);
    loadButton.addEventListener('click', loadCatches);
    addCatchForm.addEventListener('submit', addCatch)

    function displayCatch(obj) {
        let divElement = document.createElement('div');
        divElement.classList = 'catch';

        // <label>Angler</label>\
        let anglerLabel = document.createElement('label');
        anglerLabel.textContent = "Angler";
        divElement.appendChild(anglerLabel)
        // <input type="text" class="angler" value=${obj['angler']} disabled>\
        let anglerInput = document.createElement('input');
        anglerInput.type = 'text';
        anglerInput.classList = 'angler';
        if (obj['_ownerId'] != sessionStorage.getItem('id')) {
            anglerInput.setAttribute('disabled', 'disabled')
        }
        anglerInput.value = obj['angler'];
        divElement.appendChild(anglerInput)
        // <label>Weight</label>\
        let weightLabel = document.createElement('label');
        weightLabel.textContent = "Weight";
        divElement.appendChild(weightLabel)
        // <input type="text" class="weight" value=${obj['weight']} disabled>\
        let weightInput = document.createElement('input');
        weightInput.type = 'text';
        weightInput.classList = 'weight';
        if (obj['_ownerId'] != sessionStorage.getItem('id')) {
            weightInput.setAttribute('disabled', 'disabled')
        }
        weightInput.value = obj['weight'];
        divElement.appendChild(weightInput)
        // <label>Species</label>\
        let speciesLabel = document.createElement('label');
        speciesLabel.textContent = "Species";
        divElement.appendChild(speciesLabel)
        // <input type="text" class="species" value=${obj['species']} disabled>\
        let speciesInput = document.createElement('input');
        speciesInput.type = 'text';
        speciesInput.classList = 'species';
        if (obj['_ownerId'] != sessionStorage.getItem('id')) {
            speciesInput.setAttribute('disabled', 'disabled')
        }
        speciesInput.value = obj['species'];
        divElement.appendChild(speciesInput)
        // <label>Location</label>\
        let locationLabel = document.createElement('label');
        locationLabel.textContent = "Location";
        divElement.appendChild(locationLabel)
        // <input type="text" class="location" value=${obj['location']} disabled>\
        let locationInput = document.createElement('input');
        locationInput.type = 'text';
        locationInput.classList = 'location';
        if (obj['_ownerId'] != sessionStorage.getItem('id')) {
            locationInput.setAttribute('disabled', 'disabled')
        }
        locationInput.value = obj['location'];
        divElement.appendChild(locationInput)
        // <label>Bait</label>\
        let baitLabel = document.createElement('label');
        baitLabel.textContent = "Bait";
        divElement.appendChild(baitLabel)
        // <input type="text" class="bait" value=${obj['bait']} disabled>\
        let baitInput = document.createElement('input');
        baitInput.type = 'text';
        baitInput.classList = 'bait';
        if (obj['_ownerId'] != sessionStorage.getItem('id')) {
            baitInput.setAttribute('disabled', 'disabled')
        }
        baitInput.value = obj['bait'];
        divElement.appendChild(baitInput)
        // <label>Capture Time</label>\
        let captureTimeLabel = document.createElement('label');
        captureTimeLabel.textContent = "Capture Time";
        divElement.appendChild(captureTimeLabel)
        // <input type="number" class="captureTime" value=${obj['captureTime']} disabled>\
        let captureTimeInput = document.createElement('input');
        captureTimeInput.type = 'text';
        captureTimeInput.classList = 'captureTime';
        if (obj['_ownerId'] != sessionStorage.getItem('id')) {
            captureTimeInput.setAttribute('disabled', 'disabled')
        }
        captureTimeInput.value = obj['captureTime'];
        divElement.appendChild(captureTimeInput)
        // <button class="update" data-id=${obj['_ownerId']} >Update</button>\
        let updateButton = document.createElement('button')
        updateButton.classList = 'update'
        updateButton.textContent = "Update"
        updateButton.setAttribute('data-id', obj['_ownerId'])
        updateButton.setAttribute('id', obj['_id']);
        if (obj['_ownerId'] != sessionStorage.getItem('id')) {
            updateButton.setAttribute('disabled', 'disabled')
        }
        updateButton.addEventListener('click', updateCatch)
        divElement.appendChild(updateButton)
        // <button class="delete" data-id=${obj['_ownerId']} >Delete</button>
        let deleteButton = document.createElement('button')
        deleteButton.classList = 'delete'
        deleteButton.textContent = "Delete"
        deleteButton.setAttribute('data-id', obj['_ownerId'])
        deleteButton.setAttribute('id', obj['_id']);
        if (obj['_ownerId'] != sessionStorage.getItem('id')) {
            deleteButton.setAttribute('disabled', 'disabled')
        }
        deleteButton.addEventListener('click', deleteCatch)
        divElement.appendChild(deleteButton);

        return divElement
    }

    async function addCatch(ev) {
        ev.preventDefault()
        let token = sessionStorage.getItem('accessToken')
        let catchInfo = new FormData(ev.target);
        let anglerName = catchInfo.get('angler');
        let weightNum = catchInfo.get('weight');
        let speciesType = catchInfo.get('species');
        let locationType = catchInfo.get('location');
        let baitType = catchInfo.get('bait');
        let captureTimeDuration = catchInfo.get('captureTime');

        let catchSubmitInfo = {
            "angler":anglerName, 
            "weight":weightNum, 
            "species":speciesType, 
            "location":locationType, 
            "bait":baitType, 
            "captureTime": captureTimeDuration
        }

        let response = await fetch('http://localhost:3030/data/catches', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(catchSubmitInfo)
        })

        console.log(await response.json())
        document.querySelector('[name=angler]').value = ''
        document.querySelector('[name=weight]').value = ''
        document.querySelector('[name=species]').value = ''
        document.querySelector('[name=location]').value = ''
        document.querySelector('[name=bait]').value = ''
        document.querySelector('[name=captureTime]').value = ''

    }
    async function updateCatch(ev){
        let createdElement = ev.target.parentNode
        let anglerName = createdElement.getElementsByClassName('angler')[0].value
        let weight = createdElement.getElementsByClassName('weight')[0].value
        let species = createdElement.getElementsByClassName('species')[0].value
        let location = createdElement.getElementsByClassName('location')[0].value
        let bait = createdElement.getElementsByClassName('bait')[0].value
        let captureTime = createdElement.getElementsByClassName('captureTime')[0].value
        let id = createdElement.getElementsByClassName('update')[0].getAttribute('id')
        let token = sessionStorage.getItem('accessToken')
        
        let updatedCatchInfo = {
            "angler": anglerName, 
            "weight": weight, 
            "species": species, 
            "location":location, 
            "bait": bait, 
            "captureTime": captureTime
        }

        let response = await fetch(`http://localhost:3030/data/catches/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(updatedCatchInfo)
        })
    }

    async function deleteCatch(ev) {
        let id = ev.target.getAttribute('id')
        let token = sessionStorage.getItem('accessToken')
        
        let response = await fetch(`http://localhost:3030/data/catches/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            }
        })
    }

    async function onLogout(ev) {
        let token = sessionStorage.getItem('accessToken');

        let response = await fetch('http://localhost:3030/users/logout', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            }
        })
        sessionStorage.clear();
        window.location = 'index.html'
    }

    async function loadCatches(ev) {
        while (catchesDiv.firstChild) {
            catchesDiv.removeChild(catchesDiv.lastChild)
        }
        let response = await fetch('http://localhost:3030/data/catches');
        let data = await response.json()
        console.log(data)
        for (let [idx, entry] of Object.entries(data)){
            catchesDiv.appendChild(displayCatch(entry))
        }
    }

    if (!sessionStorage.getItem('accessToken')) {
        logoutButton.setAttribute('style', 'display:none');
        addCatchButton.setAttribute('disabled', 'disabled')
    }
    else {
        logoutButton.setAttribute('style', 'display:inline-block')
        loginButton.setAttribute('style', 'display:none');
        registerButton.setAttribute('style', 'display:none');
        addCatchButton.removeAttribute('disabled');
    }
}

start()