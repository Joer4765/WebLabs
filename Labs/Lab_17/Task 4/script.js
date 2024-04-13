document.addEventListener('DOMContentLoaded', function () {
    function createTabs(node) {
        const tabButtons = document.createElement("div");
        const childElements = Array.from(node.children);
        const buttons = [];

        childElements.forEach((child, index) => {
            const button = document.createElement("button");
            button.textContent = child.getAttribute("data-tabname");
            button.addEventListener("click", () => {
                showTab(index);
            });
            tabButtons.appendChild(button);
            buttons.push(button);
        });

        node.insertBefore(tabButtons, node.firstChild);

        function showTab(index) {
            childElements.forEach((child, i) => {
                child.classList.toggle("visible", i === index);
                buttons[i].classList.toggle("active", i === index);
            });
        }

        showTab(0);
    }

    const tabsContainer = document.getElementById("tabs-container");
    createTabs(tabsContainer);
});