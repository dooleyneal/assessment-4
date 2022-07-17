const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const fortuneList = document.getElementById("fortuneList")
const addBtn = document.getElementById('submit')


const fortunesCallback = ({data: fortunes}) => displayFortunes(fortunes)
const errCallback = error => console.log(error)

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const randomFortune = () => {
    axios.get("http://localhost:4000/api/fortunes/")
        .then(res => {
            const data = res.data
            alert(data)
        })
}

const getAllFortunes = () => {
    axios.get("http://localhost:4000/api/fortunes/").then(fortunesCallback).catch(errCallback)
}

const createFortune = body => {
    axios.post("http://localhost:4000/api/fortunes/", body).then(fortunesCallback).catch(errCallback)
}


const createFortuneTag = (fortune) => {
    const fortuneTag = document.createElement('div')
    fortuneTag.classList.add('fortuneTag')
    fortuneTag.setAttribute('id', `${fortune.id}`)
    fortuneTag.innerHTML = 
    `
    <p class="fortune>${fortune.id}. ${fortune.text}</p>
    <form>
        <button class="deleteFortune" id="${fortune.id}">Delete</button>
        <button class="editFortune" id="${fortune.id}">Edit Fortune</button>
    </form>`

    fortuneList.appendChild(fortuneTag)
}


const displayFortunes = (array) => {
    fortuneList.innerHTML = ''
    for(i in array) {
        createFortuneTag(array[i])
    }
}




complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', randomFortune)
addBtn.addEventListener('click', createFortune)



getAllFortunes()
