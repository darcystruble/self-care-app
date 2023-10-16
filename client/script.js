// DOM ELEMENTS
let calendar = document.querySelector('.cal-main')
let calMonths = document.querySelector('.cal-month')
let calDays = document.querySelector('.cal-days')
let checklist = document.querySelector('.todo-holder')
let taskInput = document.querySelector('#type-task')
let taskBtn = document.querySelector('#add-task')
let nameArea = document.querySelector('.greeting')

// VARIABLES
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let curDate = new Date()
let curMonth = curDate.getMonth()
let curYear = curDate.getFullYear()
const base = 'http://localhost:3001/'
const currentUser = '652d563b750183a1591c276e'
console.log(curDate)
console.log('poop')
// FUNCTIONS
// axios testing
const tester = async () => {
    let testing = await axios.get(`${base}days`)
    let findingDate = testing.data[2].date
    console.log(findingDate)
}
tester()

// Greetin the user
const displayName = async () => {
    let thisuser = await axios.get(`${base}users/${currentUser}`)
    console.log(thisuser.data.firstName)
    nameArea.innerText = thisuser.data.username
}
displayName()


// calendar functions
const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

const makeCal = (month, year) => {
    let daysOfMonth = [31, getFebDays(year), 31, 30 ,31, 30 ,31, 31, 30, 31, 30 ,31]
    if (month > 11 || month < 0) {month = curDate.getMonth()}
    if (!year) {year = curDate.getFullYear()}

    calMonths.innerHTML = `<span class="greater-less" id="prev-month">&lt;</span><span class="month-name">${months[month]}</span><span class="greater-less" id="next-month">&gt;</span>`

    let firstDay = new Date(year, month, 1)
    for(let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++){
        let day = document.createElement('div')
        if ( i >= firstDay.getDay()) {
            day.classList.add('cal-day')
            day.innerHTML = i - firstDay.getDay() + 1
            if (i - firstDay.getDay() + 1 === curDate.getDate() && year === curDate.getFullYear() && month === curDate.getMonth()){
                day.classList.add('cur-date')
            }
        }
        calDays.appendChild(day)
    }
    
}

// task adder
const addNewTask = () => {
    let newLi = document.createElement('li')
    newLi.innerText = taskInput.value
    checklist.appendChild(newLi)
}

// gratitude journal

// CALL FUNCTIONS
makeCal(curMonth, curYear)

// ONCLICK
taskBtn.addEventListener('click', addNewTask)

document.querySelector('#prev-month').addEventListener('click', () => {
    console.log('back-click')
    calDays.replaceChildren()
    --curMonth
    makeCal(curMonth, curYear)
})
document.querySelector('#next-month').addEventListener('click', () => {
    calDays.replaceChildren()
    ++curMonth
    makeCal(curMonth, curYear)
})

// CALENDAR CHANGES
document.querySelector('#mood1').addEventListener('click', () => {
    document.querySelectorAll('.cal-day').forEach((day) => {
        day.addEventListener('click', () => {
            day.classList.remove('happy', 'calm', 'tired', 'stressed', 'sad')
            console.log(day.innerText)
            day.innerText = '🤩'
            day.classList.add('motivated')
        })
    })
})

document.querySelector('#mood2').addEventListener('click', ()=> {
    document.querySelectorAll('.cal-day').forEach((day) => {
        day.addEventListener('click', () => {
            day.classList.remove('calm', 'tired', 'stressed', 'sad')
            console.log(day.innerText)
            day.innerText = '😄'
            day.classList.add('happy')
        })
    })
})

document.querySelector('#mood3').addEventListener('click', ()=> {
    document.querySelectorAll('.cal-day').forEach((day) => {
        day.addEventListener('click', () => {
            day.classList.remove('tired', 'stressed', 'sad')
            console.log(day.innerText)
            day.innerText = '😌'
            day.classList.add('calm')
        })
    })
})
document.querySelector('#mood4').addEventListener('click', ()=> {
    document.querySelectorAll('.cal-day').forEach((day) => {
        day.addEventListener('click', () => {
            day.classList.remove('stressed', 'sad')
            console.log(day.innerText)
            day.innerText = '😴'
            day.classList.add('tired')
        })
    })
})
document.querySelector('#mood5').addEventListener('click', ()=> {
    document.querySelectorAll('.cal-day').forEach((day) => {
        day.addEventListener('click', () => {
            day.classList.remove('sad')
            console.log(day.innerText)
            day.innerText = '😖'
            day.classList.add('stressed')
        })
    })
})
document.querySelector('#mood6').addEventListener('click', ()=> {
    document.querySelectorAll('.cal-day').forEach((day) => {
        day.addEventListener('click', () => {
            console.log(day.innerText)
            day.innerText = '😔'
            day.classList.add('sad')
        })
    })
})
