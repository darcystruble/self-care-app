// DOM ELEMENTS
let calendar = document.querySelector('.cal-main')
let calMonths = document.querySelector('.cal-month')
let calDays = document.querySelector('.cal-days')
let checklist = document.querySelector('.todo-holder')
let taskInput = document.querySelector('#type-task')
let taskBtn = document.querySelector('#add-task')
let nameArea = document.querySelector('.greeting')
let gratInput = document.querySelector('#gratitude-input')
let gratResult = document.querySelector('.gratitude-holder')
let oldGratResults = document.querySelector('.gratitude-holder2')

// VARIABLES
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let curDate = new Date()
let curMonth = curDate.getMonth()
let curYear = curDate.getFullYear()
let compareDate = curDate.toISOString()
const base = 'http://localhost:3001/'
const currentUser = '652d563b750183a1591c276e'
// newObj.date = (getActivitiesTable.data[x].start_date_local.slice(0, 10))
console.log(curDate)

// FUNCTIONS
// axios testing
const tester = async () => {
    let testing = await axios.get(`${base}todo`)
    let findingDate = testing.data[2].date
    console.log(findingDate.slice(0, 10))
    let newDate = curDate.toISOString()
    console.log(compareDate.slice(0, 10))
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

// tasks functions
const listTasks = async () => {
    let tasks = await axios.get(`${base}todo`)
    tasks.data.forEach((task) => {
        if (task.date.slice(0, 10) == compareDate.slice(0, 10)){
            let taskLi = document.createElement('li')
            taskLi.innerText = task.text
            checklist.appendChild(taskLi)
        }
    })
}

const addNewTask = async () => {
    await axios.post(`${base}todo`, { date: new Date(), text: taskInput.value, isComplete: false, userId: currentUser })
    let newLi = document.createElement('li')
    newLi.innerText = taskInput.value
    checklist.appendChild(newLi)
    taskInput.value = ''
}

// gratitude journal
const oldPosts = async () => {
    let oldPostsAxios = await axios.get(`${base}gratitude`)
    let testDate = new Date()
    console.log(oldPostsAxios.data[3], testDate)
    oldPostsAxios.data.forEach((post) => {
        let onePost = document.createElement('div')
        onePost.classList.add('grat-spacing')
        console.log(post.entry)
        if (post.userId == currentUser) {
            onePost.innerText = post.entry
        } else {
            return
        }
        oldGratResults.appendChild(onePost)
    })
}
oldPosts()


// CALL FUNCTIONS
makeCal(curMonth, curYear)
listTasks()

// ONCLICK
taskBtn.addEventListener('click', addNewTask)

gratInput.addEventListener('keypress', async (e) => {
    if(e.keyCode === 13) {
        gratResult.innerText = gratInput.value
        await axios.post(`${base}gratitude`, {date: new Date(), entry: gratInput.value, userId: currentUser})
    }
})

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
