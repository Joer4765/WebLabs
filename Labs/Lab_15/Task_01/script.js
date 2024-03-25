document.addEventListener("DOMContentLoaded", () => {
    let lamp = document.getElementById("lamp");
    const toggleButton = document.getElementById("toggleButton");
    const lampTypeSelect = document.getElementById("lampType");
    const sleepButton = document.getElementById("sleepButton");

    function turn_off_lamp() {
        lamp.classList.remove("on", "dimmed");
        toggleButton.textContent = "Turn on";
    }

    toggleButton.addEventListener("click", () => {
        if (lamp.classList.contains("on") || lamp.classList.contains("dimmed")) {
            turn_off_lamp();
        }
        else if (lamp.classList.contains("normal-lamp")) {
            function turn_on_with_brightness() {
                let brightness = prompt("Enter brightness (1 - full; 2 - dimmed): ");
                if (brightness === "1") {
                    lamp.classList.add("on");
                }
                else if (brightness === "2") {
                    lamp.classList.add("dimmed");
                }
                else {
                    alert("You entered wrong brightness");
                    turn_on_with_brightness();
                }
            }
            turn_on_with_brightness();

            toggleButton.textContent = "Turn off";
        }
        else {
            lamp.classList.add("on");
            toggleButton.textContent = "Turn off";
        }
    });

    lampTypeSelect.addEventListener("change", () => {
        const selectedType = lampTypeSelect.value;
        lamp.className = `lamp ${selectedType}`;
        toggleButton.textContent = "Turn on";
    })

    let timerId;
    sleepButton.addEventListener("click", () => {
        if (sleepButton.textContent === "Turn off after 5 minutes") {
            timerId = setTimeout(turn_off_lamp, 300_000);
            sleepButton.textContent = "Cancer sleep timer";
        }
        else if (sleepButton.textContent === "Cancer sleep timer") {
            clearTimeout(timerId);
            sleepButton.textContent = "Turn off after 5 minutes";
        }
    })
});