function qs(el) {
    return document.querySelector(el)
}

function ce(el) {
    return document.createElement(el)
}

const dogBar = qs('#dog-bar')
const dogInfo = qs('#dog-info')
const goodDogFilter = qs('#good-dog-filter')
const url = 'http://localhost:3000/pups'
let filtered = false



function addDog(dog) {
    const dogName = ce('span')
    dogName.innerText = dog.name
    dogBar.append(dogName)
    dogName.addEventListener("click", () => {
        const goodOrBad = ce('button')
        const dogImg = ce('img')
        const pupName = ce('h2')
        dogInfo.innerHTML = ""
       
        dogImg.src = dog.image
        // debugger
        pupName.innerText = dog.name
        // debugger
        
        goodOrBad.innerText = (dog.isGoodDog) ? "Good Dog!" : "Bad Dog!"
        goodOrBad.addEventListener("click", () => {
            const configObj = {
                method: "PATCH",
                headers: {"Content-Type": "application/json", "Accept": "application.json"},
                body: JSON.stringify({isGoodDog: !dog.isGoodDog})
            }
            fetch(`${url}/${dog.id}`, configObj).then(res => res.json())
            .then(json => {
                dog = json
                goodOrBad.innerText = (dog.isGoodDog) ? "Good Dog!" : "Bad Dog!"
            })
        })
        dogInfo.append(dogImg, pupName, goodOrBad)
    })
}

function addDogs(dogs) {
    for (const aDog of dogs) {
        if (!filtered || aDog.isGoodDog) {
            addDog(aDog)
        }
    }
}

fetch(url).then(res => res.json()).then(json => addDogs(json))

goodDogFilter.addEventListener("click", () => {
    dogBar.innerHTML = ""
    dogInfo.innerHTML = ""
    filtered = !filtered
    event.target.innerText = filtered ? "Filter good dogs: ON" : "Filter good dogs: OFF"
    fetch(url).then(res => res.json()).then(json => addDogs(json))
})