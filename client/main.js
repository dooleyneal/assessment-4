//const { default: axios } = require("axios")
//const fortunes = require(`./db.json`)


const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")

const addBtn = document.querySelector('#submit')
const deleteBtn = document.querySelector('.deleteFortune')
const editBtn = document.querySelector('.editFortune')




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
const createFortune = body => axios.post(baseURL, body).then(fortunesCallback).catch(errCallback)
const deleteFortune = id => axios.delete(`${baseURL}/${id}`).then(fortunesCallback).catch(errCallback)
const updateFortune = (id, text) => axios.put(`${baseURL}/${id}`, {text}).then(fortunesCallback).catch(errCallback)


function submitHandler(element) {
    element.preventDefault()

    let text = document.querySelector(`#text`)

    let bodyObj = {
        text: text.value
    }
    createFortune(bodyObj)

    text.value = ''
}

function createFortuneTag(fortune) {
    const fortuneTag = document.createElement('div')
    fortuneTag.classList.add('fortuneTag')
    fortuneTag.setAttribute('id', `${fortune.id}`)
    fortuneTag.innerHTML = 
    `<p class="fortune">${fortune.text}</p>
    <div class="buttonsComtainer">
        <button class="deleteFortune" onclick="deleteFortune(${fortune.id}">Delete</button>
        <button class="editFortune">Edit Fortune</button>
    </div>`
    console.log(fortuneTag)

    fortunesContainer.appendChild(fortuneTag)
}


const displayFortunes = (array) => {
    fortuneList.innerHTML = ''
    for(i in array) {
        createFortuneTag(array[i])
    }
}


const editText = (id) => {
    const fortuneTag = document.querySelector(`div#${id}`)
    const divAppend = document.createElement('form')
    divAppend.innerHTML = 
    `<form>
        <input type="text" id="text" name="newFortune" placeholder="New Fortune">
        <input type="submit" value="Submit" id="submit"> 
    </form>`
    fortuneTag.appendChild(divAppend)
    updateFortune(id, document.querySelector(`input#text`).value)
}



complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', randomFortune)
addBtn.addEventListener('click', createFortune(document.querySelector(`form`)))
deleteBtn.addEventListener('click', deleteFortune(deleteBtn.id))
editBtn.addEventListener('click', editText(editBtn.id))



getAllFortunes()
//console.log({data: fortunes})
