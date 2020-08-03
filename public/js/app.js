console.log('Client side loaded')

/* fetch('http://puzzle.mead.io/puzzle').then ((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}) */

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-one')
const msgTwo = document.querySelector('#msg-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value

    msgOne.textContent = 'Loading ... '
    msgTwo.textContent = ''

    const url = 'http://localhost:3000/weather?address='+location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msgOne.textContent = data.error
                msgTwo.textContent = ''
                console.log(data.error)
            }else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})