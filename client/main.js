const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")

const addBtn = document.querySelector('#addBtn')
const addText = document.querySelector('#addText')


const fortunesContainer = document.querySelector(`#fortunesContainer`)
const form = document.querySelector('form')

const baseURL = "http://localhost:4000/api/fortunes/"

const fortunesCallback = ({data: fortunes}) => displayFortunes(fortunes)
const errCallback = error => console.log(error)

const getCompliment = () => {
    axios.get(`http://localhost:4000/api/compliment/`)
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const randomFortune = () => {
    axios.get(baseURL)
        .then(res => {
            const data = res.data
            alert(data)
        })
}

const getAllFortunes = () => axios.get(baseURL).then(fortunesCallback).catch(errCallback)


const createFortune = () => {
    let bodyObj = {
        text: addText.value
    }
    axios.post(baseURL, bodyObj).then(fortunesCallback).catch(errCallback)
    addText.value = ''
}

const deleteFortune = id => axios.delete(`${baseURL}:${id}`).then(fortunesCallback).catch(errCallback)

const updateFortune = id => {
    const editText = document.getElementById(`editText${id}`)
    let bodyObj = {
        text: editText.value
    }

    axios.put(`${baseURL}${id}`, bodyObj).then(fortunesCallback).catch(errCallback)
    editText.value = ''
}


function createFortuneTag(fortune) {
    const fortuneTag = document.createElement('div')
    const {id, text} = fortune
    fortuneTag.classList.add('fortuneTag')
    fortuneTag.setAttribute('id', `${id}`)
    if (fortune.id != undefined) {
        fortuneTag.innerHTML = 
        `<p class="fortune">${id}. ${text}</p>
        <div class="buttonsComtainer">
            <button class="deleteFortune" id="Delete${id}" onClick="deleteFortune(${id})">Delete</button>
            <input type="text" id="editText${id}" name="newFortune" placeholder="Edit Fortune">
            <button class="editSubmit" id="editSubmit${id}" onClick="updateFortune(${id})">Update</button>
        </div>`
    }
    fortunesContainer.appendChild(fortuneTag)
}


const displayFortunes = (array) => {
    fortunesContainer.innerHTML = ''
    for(let i = 0; i < array.length; i++) {
        createFortuneTag(array[i])
    }
}



complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', randomFortune)



addBtn.addEventListener('click', (event) =>{
    event.preventDefault()
    createFortune()
})




getAllFortunes()
