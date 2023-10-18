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

// GLOBAL VARIABLES
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let curDate = new Date()
let curMonth = curDate.getMonth()
let curYear = curDate.getFullYear()
// let compareDate = curDate.toISOString()
// to be used before saving to api
let timezone = new Date().getTimezoneOffset() * 60000
let localISO = new Date(Date.now() - timezone).toISOString()
let curDateAdjust = new Date(Date.now() - timezone)

const base = 'http://localhost:3001/'
const currentUser = '652d563b750183a1591c276e'
// newObj.date = (getActivitiesTable.data[x].start_date_local.slice(0, 10))
console.log(curDate.toISOString())

// FUNCTIONS
// axios testing
const tester = async () => {
    let testing = await axios.get(`${base}todo`)
    let findingDate = testing.data[2].date
    console.log(curMonth + 1)
    console.log(curDate)
    console.log(timezone)
    console.log(new Date(Date.now()))
    console.log(curDateAdjust)
    console.log(localISO)
}
tester()

// Greetin the user
const displayName = async () => {
    let thisuser = await axios.get(`${base}users/${currentUser}`)
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
const calDaysColored = async () => {
    let colorDates = await axios.get(`${base}days`)
    let calDates = document.querySelectorAll('.cal-day')
    colorDates.data.forEach((day) => {
        let trim = day.date.slice(8, 10)
        let trimMonth = day.date.slice(5, 7)
        let curMonthAdj = curMonth + 1
        calDates.forEach((cal) => {
            if (day.user === currentUser && parseInt(trim).toString() === cal.innerText && curMonthAdj.toString() === trimMonth) {
                if (day.dayMood === 'motivated') {
                    cal.innerText = '🤩'
                    cal.classList.add('motivated')
                }
                if (day.dayMood === 'happy') {
                    cal.innerText = '😄'
                    cal.classList.add('happy')
                }
                if (day.dayMood === 'calm') {
                    cal.innerText = '😌'
                    cal.classList.add('calm')
                }
                if (day.dayMood === 'tired') {
                    cal.innerText = '😴'
                    cal.classList.add('tired')
                }
                if (day.dayMood === 'stressed') {
                    cal.innerText = '😖'
                    cal.classList.add('stressed')
                }
                if (day.dayMood === 'sad') {
                    cal.innerText = '😔'
                    cal.classList.add('sad')
                }
            }
        })
    })
}

// tasks functions
const listTasks = async () => {
    let tasks = await axios.get(`${base}todo`)
    // create each task li item
    tasks.data.forEach((task) => {
        if (task.date.slice(0, 10) === localISO.slice(0, 10)){
            let taskLi = document.createElement('li')
            taskLi.classList.add('list')
            taskLi.innerHTML = `<span class="checkbox"></span><span class="compare">${task.text}</span><i class="delete">&#10005;</i>`
            checklist.appendChild(taskLi)
            if (task.isComplete === true){
                taskLi.classList.add('checked')
                taskLi.firstChild.classList.add('checked')
            }
        }
    })
    // checkbox checked when clicked
    document.querySelectorAll('.list').forEach((bullet) => {
        console.log(bullet.firstChild.innerText)
        bullet.addEventListener('click', () => {
            tasks.data.forEach((task) => {
                if (bullet.firstChild.innerText === task.text && task.isComplete === false) {
                    console.log(task._id)
                    axios.put(`${base}todo/${task._id}`, { isComplete: true })
                    bullet.classList.add('checked')
                } else {
                    return
                }
            })
        })
    })
    document.querySelectorAll('.delete').forEach((x) => {
        console.log(x.previousSibling.innerText)
        tasks.data.forEach((task) => {
            x.addEventListener('click', () => {
                if (x.previousSibling.innerText === task.text && task.date.slice(0, 10) === localISO.slice(0, 10)) {
                    axios.delete(`${base}todo/${task._id}`)
                    x.parentElement.remove()
                }
            })
        })
    })
}

const addNewTask = async () => {
    await axios.post(`${base}todo`, { date: curDateAdjust, text: taskInput.value, isComplete: false, userId: currentUser })
    let newLi = document.createElement('li')
    newLi.classList.add('list')
    newLi.innerText = taskInput.value
    checklist.appendChild(newLi)
    taskInput.value = ''
}


// gratitude journal
const oldPosts = async () => {
    let oldPostsAxios = await axios.get(`${base}gratitude`)
    oldPostsAxios.data.forEach((post) => {
        let oldPost = document.createElement('div')
        let oldDate = document.createElement('div')
        oldDate.classList.add('grat-spacing')
        if (post.userId === currentUser && post.date.slice(0, 10) !== localISO.slice(0 ,10)) {
            oldDate.innerText = post.date.slice(5, 10)
            oldPost.innerText = post.entry
        } else {
            return
        }
        oldGratResults.append(oldDate, oldPost)
    })
}
const displayNewPosts = async () => {
    let newPostsAxios = await axios.get(`${base}gratitude`)
    newPostsAxios.data.forEach((post) => {
        let newPost = document.createElement('div')
        let newDate = document.createElement('div')
        newDate.classList.add('grat-spacing')
        if (post.userId === currentUser && post.date.slice(0, 10) === localISO.slice(0 ,10)) {
            newDate.innerText = post.date.slice(5, 10)
            newDate.innerHTML += `<b> Today:</b>`
            newPost.innerText = post.entry
        } else {
            return
        }
        gratResult.append(newDate, newPost)
    })
}



// CALL FUNCTIONS
makeCal(curMonth, curYear)
calDaysColored()
listTasks()
displayNewPosts()
oldPosts()

// ONCLICK
// Checklist functions
taskBtn.addEventListener('click', addNewTask)

// Gratitude functions
gratInput.addEventListener('keypress', async (e) => {
    if(e.keyCode === 13) {
        gratResult.innerText = gratInput.value
        await axios.post(`${base}gratitude`, {date: curDateAdjust, entry: gratInput.value, userId: currentUser})
    }
})

// Change Calendar Dates
document.querySelector('#prev-month').addEventListener('click', () => {
    calDays.replaceChildren()
    --curMonth
    makeCal(curMonth, curYear)
})
document.querySelector('#next-month').addEventListener('click', () => {
    calDays.replaceChildren()
    ++curMonth
    makeCal(curMonth, curYear)
})
console.log(curDate.toISOString().slice(8, 10))

// Calendar Mood Changes
document.querySelectorAll('.click-mood').forEach((mood) => {
    let curMood = document.querySelector('.cur-date')
    mood.addEventListener('click', async () => {
        let days = await axios.get(`${base}days`)
        days.data.forEach((day) => {
            if (day.date.slice(0, 10) === localISO.slice(0, 10)) {
                return
            }
        })
        if (mood.innerText === 'Motivated') {
            await axios.post(`${base}days`, { date: curDateAdjust, dayMood: 'motivated', user: currentUser })
            mood.classList.add('swap1')
            curMood.innerText = '🤩'
            curMood.classList.add('motivated')
        }
        if (mood.innerText === 'Happy') {
            await axios.post(`${base}days`, { date: curDateAdjust, dayMood: 'happy', user: currentUser })
            mood.classList.add('swap2')
            curMood.innerText = '😄'
            curMood.classList.add('happy')
        }
        if (mood.innerText === 'Calm') {
            await axios.post(`${base}days`, { date: curDateAdjust, dayMood: 'calm', user: currentUser })
            mood.classList.add('swap3')
            curMood.innerText = '😌'
            curMood.classList.add('calm')
        }
        if (mood.innerText === 'Tired') {
            await axios.post(`${base}days`, { date: curDateAdjust, dayMood: 'tired', user: currentUser })
            mood.classList.add('swap4')
            curMood.innerText = '😴'
            curMood.classList.add('tired')
        }
        if (mood.innerText === 'Stressed') {
            await axios.post(`${base}days`, { date: curDateAdjust, dayMood: 'stressed', user: currentUser })
            mood.classList.add('swap5')
            curMood.innerText = '😖'
            curMood.classList.add('stressed')
        }
        if (mood.innerText === 'Sad') {
            await axios.post(`${base}days`, { date: curDateAdjust, dayMood: 'sad', user: currentUser })
            mood.classList.add('swap6')
            curMood.innerText = '😔'
            curMood.classList.add('sad')
        }
    }, {once: true})
})