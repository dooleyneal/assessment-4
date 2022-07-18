let fortunes = require('./db.json')
let globalID = 6

module.exports = {
   
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    randomFortune: (req,res) => {
        let randomID = (Math.floor(Math.random() * Object.keys(fortunes).length)) + 1
        for(const object in fortunes) {
            if (+fortunes[object].id === randomID) {
                res.status(200).send(fortunes[object].text)  
            }
        }
    },

    getAllFortunes: (req, res) => {
        res.status(200).send(fortunes)
    },

    createFortune: (req, res) => {
        const {text} = req.body
        let newFortune = {
            id: globalID,
            text: text
        }
        globalID++
        fortunes.push(newFortune)
        res.status(200).send(fortunes)
    },

    deleteFortune: (req, res) => {
        let index = fortunes.findIndex(e => e.id === +req.params.id)
        fortunes.splice(index,1)
        res.status(200).send(fortunes)
    },

    updateFortune: (req,res) => {
        const {id} = req.params
        const {newText} = req.body
        let index = fortunes.findIndex(e => +e.id === +id)
        fortunes[index].text = newText

        res.status(200).send(fortunes)
    }



}