// NavBar

// Accordion widget
const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");

    const panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// Carousel
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let slideIndex = 1;
displaySlides(slideIndex);

prev.addEventListener("click", function() {
  slideIndex--;
  displaySlides(slideIndex);
});

next.addEventListener("click", function() {
  slideIndex++;
  displaySlides(slideIndex);
});

function displaySlides(n) {
  const slides = document.getElementsByClassName("slides");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

// Date Picker Widget
const datePickerElement = document.querySelector(".date-picker");
const selectedDateElement = document.querySelector(".selected-date");
const datesElement = document.querySelector(".dates");
const mthElement = document.querySelector(".mth");
const prevMonthElement = document.querySelector(".prev-mth");
const nextMonthElement = document.querySelector(".next-mth");
const daysElement = document.querySelector(".days");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mthElement.textContent = `${months[month]} ${year}`;
selectedDateElement.textContent = formatDate(date);

datePickerElement.addEventListener("click", toggleDatePicker);
nextMonthElement.addEventListener("click", showNextMonth);
prevMonthElement.addEventListener("click", showPrevMonth);
populateDays();

function toggleDatePicker(e) {
  if (!checkEventPathForClass(e.path, "dates")) {
    datesElement.classList.toggle("active");
  }
}

function showNextMonth(e) {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  mthElement.textContent = `${months[month]} ${year}`;
  populateDays();
}

function showPrevMonth(e) {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  mthElement.textContent = `${months[month]} ${year}`;
  populateDays();
}

// Helper function
function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }

  return false;
}

function formatDate(inputDate) {
  let currentDay = inputDate.getDate();
  let currentMonth = inputDate.getMonth() + 1;
  if (currentDay > 0 && currentDay < 10) {
    currentDay = `0${currentDay}`;
  }
  let currentYear = inputDate.getFullYear();
  return `${currentMonth} / ${currentDay} / ${currentYear}`;
}

function populateDays() {
  daysElement.innerHTML = "";
  let totalGivenDays = getTotalDaysOfMonth(month, year);
  let firstDayOfMonth = new Date(year, month, 1).getDay();

  for (let i = 0; i < totalGivenDays + firstDayOfMonth; i++) {
    const singleDayElement = document.createElement("div");
    singleDayElement.classList.add("single-day");

    const currentNumDayOnCalendar = i - firstDayOfMonth + 1;
    if (i >= firstDayOfMonth) {
      singleDayElement.textContent = currentNumDayOnCalendar;

      if (
        selectedDay === currentNumDayOnCalendar &&
        selectedYear === year &&
        selectedMonth === month
      ) {
        singleDayElement.classList.add("selected");
      }
    } else {
      singleDayElement.textContent = "";
    }

    singleDayElement.addEventListener("click", function() {
      selectedDate = new Date(year, month, currentNumDayOnCalendar);
      selectedDay = currentNumDayOnCalendar;
      selectedMonth = month;
      selectedYear = year;

      selectedDateElement.textContent = formatDate(selectedDate);
      selectedDateElement.dataset.value = selectedDate;

      populateDays();
    });

    daysElement.appendChild(singleDayElement);
  }
}

function getTotalDaysOfMonth(inputMonth, inputYear) {
  return new Date(inputYear, inputMonth + 1, 0).getDate();
  ß;
}
