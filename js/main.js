const form = document.getElementById("form")
const inputs = document.querySelectorAll("input")

const dayTitle = document.getElementById("day-title")
const monthTitle = document.getElementById("month-title")
const yearTitle = document.getElementById("year-title")

const dayInput = document.getElementById("day-input")
const monthInput = document.getElementById("month-input")
const yearInput = document.getElementById("year-input")

const dayOutput = document.getElementById("day-output")
const monthOutput = document.getElementById("month-output")
const yearOutput = document.getElementById("year-output")

const dayErrorElement = document.getElementById("day-error")
const monthErrorElement = document.getElementById("month-error")
const yearErrorElement = document.getElementById("year-error")

const errorMessages = {
  day: '',
  month: '',
  year: ''
}

let hasError


// if user is inputting data, clear error messages
inputs.forEach((input) => {
  input.addEventListener('input', () => {
    errorMessages.day = ''
    errorMessages.month = ''
    errorMessages.year = ''

    if (input == inputs[0]) {
      dayErrorElement.style.visibility = 'hidden'
      dayInput.classList.remove("error-outline")
      dayTitle.classList.remove("error-color")
    }
    if (input == inputs[1]) {
      monthErrorElement.style.visibility = 'hidden'
      monthInput.classList.remove("error-outline")
      monthTitle.classList.remove("error-color")
    }
    if (input == inputs[2]) {
      yearErrorElement.style.visibility = 'hidden'
      yearInput.classList.remove("error-outline")
      yearTitle.classList.remove("error-color")
    }
  })
})

// validate before submitting
form.addEventListener('submit', (e) => {
  e.preventDefault() // prevent form submission

  // check if input fields are empty and fill errorMEssage object
  checkIfEmpty()

  // check if input values are within the allowed range
  checkIfValid()

  // check if there are errors
  hasError = (errorMessages.day !== '' || errorMessages.month !== '' || errorMessages.year !== '') ? true : false

  // if there are errors, show error messages
  if (hasError) {
    showErrorMessages()
  } else {
    // calculate age
    let userInput = `${yearInput.value}-${monthInput.value}-${dayInput.value}`
    const userDate = new Date(userInput)
    const currentDate = new Date()
    const curentDateDayJsFormat = dayjs(currentDate)
    const difference = curentDateDayJsFormat.diff(userInput, 'day')

    if (difference < 0) {
      // show error
      dayErrorElement.innerHTML = 'Must be a valid date'
      hasError = true

      dayErrorElement.style.visibility = 'visible'
      dayInput.classList.add("error-outline")
      dayTitle.classList.add("error-color")

      monthInput.classList.add("error-outline")
      monthTitle.classList.add("error-color")

      yearInput.classList.add("error-outline")
      yearTitle.classList.add("error-color")
    } else {
      // remove errors and show difference on UI
      dayErrorElement.style.visibility = 'hidden'
      dayInput.classList.remove("error-outline")
      dayTitle.classList.remove("error-color")

      monthInput.classList.remove("error-outline")
      monthTitle.classList.remove("error-color")

      yearInput.classList.remove("error-outline")
      yearTitle.classList.remove("error-color")

      dayOutput.innerHTML = getDay(currentDate, userDate)
      monthOutput.innerHTML = curentDateDayJsFormat.diff(userInput, 'month') % 12
      yearOutput.innerHTML = curentDateDayJsFormat.diff(userInput, 'year')
    }
  }
})

function getDay(currentDate, userDate) {
  const currentDay = currentDate.getDate()
  const userBirthDay = userDate.getDate()

  if (userBirthDay < currentDay) {
    return currentDay - userBirthDay
  } else if (userBirthDay > currentDay) {
    return userBirthDay - currentDay
  } else {
    return currentDay - userBirthDay
  }
}

// a and b are javascript Date objects
function calculateDiffInDays(userDate, currentDate) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(userDate.getFullYear(), userDate.getMonth(), userDate.getDate());
  const utc2 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function checkIfEmpty() {
  if (dayInput.value === '' || dayInput == null) {
    errorMessages.day = 'This field is required'
  }

  if (monthInput.value === '' || dayInput == null) {
    errorMessages.month = 'This field is required'
  }

  if (yearInput.value === '' || yearInput == null) {
    errorMessages.year = 'This field is required'
  }
}

function checkIfValid() {
  if (dayInput.value > 31 || dayInput.value < 1) {
    errorMessages.day = 'Must be a valid day'
  }

  if (monthInput.value > 12 || monthInput.value < 1) {
    errorMessages.month = 'Must be a valid month'
  }

  let date = new Date()
  if (yearInput.value > date.getFullYear()) {
    errorMessages.year = 'Must be in the past'
  } else if ((yearInput.value < (date.getFullYear() - 120))) {
    errorMessages.year = 'You can\'t be that old!'
  }
}

function showErrorMessages() {
  if (errorMessages.day) {
    dayErrorElement.innerHTML = errorMessages.day
    dayErrorElement.style.visibility = 'visible'
    dayInput.classList.add("error-outline")
    dayTitle.classList.add("error-color")
  }

  if (errorMessages.month) {
    monthErrorElement.innerHTML = errorMessages.month
    monthErrorElement.style.visibility = 'visible'
    monthInput.classList.add("error-outline")
    monthTitle.classList.add("error-color")
  }

  if (errorMessages.year) {
    yearErrorElement.innerHTML = errorMessages.year
    yearErrorElement.style.visibility = 'visible'
    yearInput.classList.add("error-outline")
    yearTitle.classList.add("error-color")
  }
}