document.addEventListener("DOMContentLoaded", () => {
    const lightSelect = document.getElementById("light-select");
    const changeDuration = document.getElementById("change-duration");
    const nextLight = document.getElementById("next-light");
    let trafficLight = document.getElementById("traffic-light");

    const red = "url('resources/traffic-light-red.png') no-repeat center center";
    const yellow = "url('resources/traffic-light-yellow.png') no-repeat center center";
    const green = "url('resources/traffic-light-green.png') no-repeat center center";
    const dark = "url('resources/traffic-light-dark.png') no-repeat center center";

    let redDelay = 5000;
    let yellowDelay = 3000;
    let greenDelay = 7000;


    function switch_state() {
        let delay = 0;
        let state = 0;
        let blink = 1;

        function tick() {
            switch (state) {
                case 0:
                    delay = redDelay;
                    trafficLight.style.background = red;
                    state = 1;
                    break;
                case 1:
                    delay = yellowDelay;
                    trafficLight.style.background = yellow;
                    state = 2;
                    break;
                case 2:
                    delay = greenDelay;
                    trafficLight.style.background = green;
                    state = 3;
                    break;
                case 3:
                    delay = yellowDelay / 6;
                    trafficLight.style.background = yellow;
                    if (blink === 3) {
                        state = 0;
                        blink = 1;
                    }
                    else {
                        state = 4;
                    }
                    break;
                case 4:
                    delay = yellowDelay / 6;
                    trafficLight.style.background = dark;
                    state = 3;
                    ++blink;
                    break;
            }
            timerId = setTimeout(tick, delay);
        }

        let timerId = setTimeout(tick, 0);

        nextLight.addEventListener("click", () => {
            clearTimeout(timerId);
            timerId = setTimeout(tick, 0);
        })
    }

    switch_state();

    changeDuration.addEventListener("click", () => {
        const selectedLight = lightSelect.value;
        let delay = prompt(`Enter new duration for ${selectedLight} light in seconds`) * 1000;
        switch (selectedLight) {
            case "red":
                redDelay = delay;
                break;
            case "yellow":
                yellowDelay = delay;
                break;
            case "green":
                greenDelay = delay;
                break;
        }
    })
});