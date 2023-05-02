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
  let hasError = (errorMessages.day !== '' || errorMessages.month !== '' || errorMessages.year !== '') ? true : false

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

      addErrorStyle()
    } else {
      removeErrorStyle()

      let finalDays = getDay(currentDate, userDate)
      let finalMonths = curentDateDayJsFormat.diff(userInput, 'month') % 12
      let finalYears = curentDateDayJsFormat.diff(userInput, 'year')

      let dayStart = 0
      let monthStart = 0
      let yearStart = 0

      let dayInterval = setInterval(() => {
        if (finalDays == 0) {
          dayOutput.innerHTML = 0;
          clearInterval(dayInterval)
        } else {
          dayStart++;
          dayOutput.innerHTML = dayStart;
          if (dayStart == finalDays) clearInterval(dayInterval)
        }
      }, 20)

      let monthInterval = setInterval(() => {
        if (finalMonths == 0) {
          monthOutput.innerHTML = 0;
          clearInterval(monthInterval)
        } else {
          monthStart++;
          monthOutput.innerHTML = monthStart;
          if (monthStart == finalMonths) clearInterval(monthInterval)
        }
      }, 50)

      let yearInterval = setInterval(() => {
        if (finalYears == 0) {
          yearOutput.innerHTML = 0;
          clearInterval(yearInterval)
        } else {
          yearStart++;
          yearOutput.innerHTML = yearStart;
          if (yearStart == finalYears) clearInterval(yearInterval)
        }
      }, 10)

      if (finalDays == 0 && finalMonths == 0) {
        alert('Happy Birthday!!')
      }
    }
  }
})

function removeErrorStyle() {
  dayErrorElement.style.visibility = 'hidden'
  dayInput.classList.remove("error-outline")
  dayTitle.classList.remove("error-color")

  monthInput.classList.remove("error-outline")
  monthTitle.classList.remove("error-color")

  yearInput.classList.remove("error-outline")
  yearTitle.classList.remove("error-color")
}

function addErrorStyle() {
  dayErrorElement.style.visibility = 'visible'
  dayInput.classList.add("error-outline")
  dayTitle.classList.add("error-color")

  monthInput.classList.add("error-outline")
  monthTitle.classList.add("error-color")

  yearInput.classList.add("error-outline")
  yearTitle.classList.add("error-color")
}

function getDay(currentDate, userDate) {
  const currentDay = currentDate.getDate()
  const userBirthDay = userDate.getDate()

  if (userBirthDay < currentDay) {
    return currentDay - userBirthDay
  } else if (userBirthDay > currentDay) {
    return userBirthDay - currentDay
  } else {
    return 0 // if they're equal
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

  // if month is a valid month, check for valid days in that month
  switch (parseInt(monthInput.value)) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      if (dayInput.value > 31) {
        errorMessages.day = 'Must be a valid day for this month (31 days)'
      }
      break;
    case 2:
      // if leap year
      if (yearInput.value % 4 == 0) {
        if (dayInput.value > 29) {
          errorMessages.day = 'Must be a valid day for this month (29 days)'
        }
      } else {
        if (dayInput.value > 28) {
          errorMessages.day = 'Must be a valid day for this month (28 days)'
        }
      }
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      if (dayInput.value > 30) {
        errorMessages.day = 'Must be a valid day for this month (30 days)'
      }
      break;
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