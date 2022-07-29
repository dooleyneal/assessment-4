//const { default: axios } = require("axios")
//const fortunes = require(`./db.json`)


const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")

const addBtn = document.querySelector('#addBtn')
const addText = document.querySelector('#addText')


// const deleteBtn = document.querySelector('.deleteFortune')
// const editBtn = document.querySelector('.editFortune')




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


const createFortune = body => {
    let bodyObj = {
        text: addText.value
    }
    axios.post(baseURL, bodyObj).then(fortunesCallback).catch(errCallback)
}



const deleteFortune = id => axios.delete(`${baseURL}/:${id}`).then(res => displayFortunes(res.data)).catch(errCallback)
const updateFortune = (id, text) => axios.put(`${baseURL}/${id}`, {text}).then(fortunesCallback).catch(errCallback)


function submitHandler(element) {
    element.preventDefault()


    let bodyObj = {
        text: addText.value
    }
    createFortune(bodyObj)

    text.value = ''
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
            <button class="editFortune">Edit Fortune</button>
        </div>`
        console.log(fortune.id)
        console.log(fortune.text)
    }
    fortunesContainer.appendChild(fortuneTag)
}


const displayFortunes = (array) => {
    fortunesContainer.innerHTML = ''
    for(let i = 0; i < array.length; i++) {
        createFortuneTag(array[i])
    }
}


const editText = (id) => {
    const fortuneTag = document.querySelector(`div#${id}`)
    const divAppend = document.createElement('form')
    divAppend.innerHTML = 
    `<input type="text" id="text" name="newFortune" placeholder="New Fortune">
    <input type="submit" value="Submit" id="submit"> 
    `
    fortuneTag.appendChild(divAppend)
    updateFortune(id, document.querySelector(`input#text`).value)
}



complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', randomFortune)



addBtn.addEventListener('click', (event) =>{
    event.preventDefault()
    createFortune(form)
})
// deleteBtn.addEventListener('click', (event) => {
//     event.preventDefault()
//     deleteFortune(document.getElementById())
// })
// editBtn.addEventListener('click', (event) => {
//     event.preventDefault()
//     editText(id)
// })



getAllFortunes()
//console.log({data: fortunes})