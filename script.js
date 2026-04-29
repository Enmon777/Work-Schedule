let role = "admin";

function setRole(newRole) {
  role = newRole;

  const title = document.getElementById("title");
  const desc = document.getElementById("description");

  if (role === "admin") {
    title.innerText = "Run shifts, clock-ins, and employee records.";
    desc.innerText = "Admins manage schedules, payroll, and employees.";
  } else {
    title.innerText = "Track your workday easily.";
    desc.innerText = "Employees can clock in and view schedules.";
  }

  document.getElementById("adminBtn").classList.toggle("active", role === "admin");
  document.getElementById("employeeBtn").classList.toggle("active", role === "employee");
}

// LIVE CLOCK
let selectedTimezone = "local";

function changeTimezone() {
  selectedTimezone = document.getElementById("timezoneSelect").value;
  updateClock();
}

function updateClock() {
  const now = new Date();

  let timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };

  let dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric"
  };

  let timeString, dateString;

  if (selectedTimezone === "local") {
    timeString = now.toLocaleTimeString(undefined, timeOptions);
    dateString = now.toLocaleDateString(undefined, dateOptions);
  } else {
    timeString = now.toLocaleTimeString("en-US", {
      ...timeOptions,
      timeZone: selectedTimezone
    });

    dateString = now.toLocaleDateString("en-US", {
      ...dateOptions,
      timeZone: selectedTimezone
    });
  }

  document.getElementById("clockTime").innerText = timeString;
  document.getElementById("clockDate").innerText = dateString;
}

// Run clock
setInterval(updateClock, 1000);
updateClock();


// CALENDAR
function generateCalendar() {
  const calendar = document.getElementById("calendar");
  const monthYear = document.getElementById("monthYear");

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.innerText = now.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  calendar.innerHTML = "";

  // Empty slots
  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += `<div></div>`;
  }

  // Days
  for (let day = 1; day <= lastDate; day++) {
    const today = day === now.getDate() ? "today" : "";
    calendar.innerHTML += `<div class="day ${today}">${day}</div>`;
  }
}

generateCalendar();