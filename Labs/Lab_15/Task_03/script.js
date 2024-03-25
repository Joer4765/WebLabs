document.addEventListener("DOMContentLoaded", () => {
    const timerButton = document.getElementById("timer-button");
    const timerKillButton = document.getElementById("timer-kill-button");
    const clock =  document.getElementById('clock');
    const timer = document.getElementById('timer');
    // const timerDefault = "Timer ends is: 0 day(s) 0 hour(s) 0 minute(s) 0 second(s)";

    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        clock.innerText = `${hours}:${minutes}:${seconds}`;
    }
    let updateClockIntervalID = setInterval(updateClock, 1000);

    timerButton.addEventListener("click", () => {
        const userInput = prompt("Enter timer completion date and time in format 'year-month-day hour:minute:second' (e.g. '2024-03-20 12:00:00'):");
        const targetDate = new Date(userInput).getTime();
        console.log(targetDate);
        if (isNaN(targetDate)) {
            alert("Wrong datetime format!");
            return;
        }
        if (targetDate === 0) {
            return;
        }

        clearInterval(updateClockIntervalID);
        updateClockIntervalID = setInterval(updateClock, 1000);

        const timerIntervalID = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                clearInterval(timerIntervalID);
                console.log("Timer ended!");
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timer.innerText = `Timer ends is: ${days} day(s) ${hours} hour(s) ${minutes} minute(s) ${seconds} second(s)`;
        }, 1000);

        timerKillButton.addEventListener("click", () => {
            clearInterval(timerIntervalID);
            timer.innerText = "";
            timerButton.textContent = "Set timer";
        });

        timerButton.addEventListener("click", () => {
            clearInterval(timerIntervalID);
            timer.innerText = "";
        });

        timerButton.textContent = "Reset timer";
    });


    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    const day = document.querySelector(".calendar-dates");

    const currdate = document
        .querySelector(".calendar-current-date");

    const prenexIcons = document
        .querySelectorAll(".calendar-navigation span");


// Array of month names
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

    function generateCalendar() {

        // Get the first day of the month
        let dayOne = new Date(year, month, 1).getDay();

        // Get the last date of the month
        let lastDate = new Date(year, month + 1, 0).getDate();

        // Get the day of the last date of the month
        let dayEnd = new Date(year, month, lastDate).getDay();

        // Get the last date of the previous month
        let monthLastDate = new Date(year, month, 0).getDate();

        // Variable to store the generated calendar HTML
        let lit = "";

        // Loop to add the last dates of the previous month
        for (let i = dayOne; i > 0; i--) {
            lit +=
                `<li class="inactive">${monthLastDate - i + 1}</li>`;
        }

        // Loop to add the dates of the current month
        for (let i = 1; i <= lastDate; i++) {

            // Check if the current date is today
            let isToday = i === date.getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()
                ? "current"
                : "active";
            lit += `<li class="${isToday}">${i}</li>`;
        }

        // Loop to add the first dates of the next month
        for (let i = dayEnd; i < 6; i++) {
            lit += `<li class="inactive">${i - dayEnd + 1}</li>`
        }

        // Update the text of the current date element
        // with the formatted current month and year
        currdate.innerText = `${months[month]} ${year}`;

        // update the HTML of the dates element
        // with the generated calendar
        day.innerHTML = lit;
    }
    generateCalendar();

    let selectedDate;
    function addSelectAction() {
        let dayIcons = document.querySelectorAll(".calendar-dates li.active");
        let selectedDayIcon = dayIcons[0];
        dayIcons.forEach(dayIcon => {
            dayIcon.addEventListener("click", () => {

                dayIcon.style.setProperty('--background-color', 'rgba(99,50,197,0.51)');
                selectedDayIcon.style.setProperty('--background-color', undefined);

                let selectedDay = parseInt(dayIcon.textContent);
                selectedDayIcon = dayIcon;

                selectedDate = new Date(year, month, selectedDay);
                console.log(selectedDate);
            });
        });
    }
    addSelectAction();


    prenexIcons.forEach(icon => {

        icon.addEventListener("click", () => {

            switch (icon.id) {
                case "calendar-prev":
                    --month;
                    break;
                case "calendar-next":
                    ++month;
                    break;
            }

            // Check if the month is out of range
            if (month < 0 || month > 11) {

                // Set the date to the first day of the
                // month with the new year
                date = new Date(year, month, new Date().getDate());
                console.log(date);

                // Set the year to the new year
                year = date.getFullYear();
                console.log(year);

                // Set the month to the new month
                month = date.getMonth();
            }

            else {

                // Set the date to the current date
                date = new Date();
            }

            generateCalendar();
            addSelectAction();
        });
    });


    const birthButton = document.getElementById("birthday-button");

    birthButton.addEventListener("click", () => {

        let now = new Date();
        let birthday = selectedDate;
        let currentYear = now.getFullYear();
        let nextBirthday = new Date(currentYear, birthday.getMonth(), birthday.getDate());

        if (now > nextBirthday) {
            nextBirthday.setFullYear(currentYear + 1);
        }

        let timeDifference = nextBirthday.getTime() - now.getTime();

        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        let months, days;

        if (nextBirthday.getDate() > now.getDate()) {
            months = nextBirthday.getMonth() - now.getMonth() +
                (12 * (nextBirthday.getFullYear() - now.getFullYear()));
            days = nextBirthday.getDate() - now.getDate() - 1;
        }
        else {
            months = nextBirthday.getMonth() - now.getMonth() +
                (11 * (nextBirthday.getFullYear() - now.getFullYear()));
            days = nextBirthday.getDate() - now.getDate() + 30;
        }

        alert(`Your birthday will be in ${months} months ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);
    });
});


