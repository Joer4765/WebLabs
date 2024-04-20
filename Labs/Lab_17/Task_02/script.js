document.addEventListener("DOMContentLoaded", () => {
    let selectedBlock;

    document.getElementById('addBlock').addEventListener('click', addBlock);
    document.getElementById('container').addEventListener('auxclick', removeBlock);
    document.getElementById('container').addEventListener('click', handleClick);
    document.getElementById('container').addEventListener('mouseover', handleMouseOver);
    document.getElementById('container').addEventListener('mouseout', handleMouseOut);
    document.getElementById('container').addEventListener('contextmenu', handleContextMenu);
    document.getElementById('color').addEventListener('change', handleColorChange);
    document.getElementById('fontSize').addEventListener('change', handleFontSizeChange);
    document.addEventListener('click', closeContextMenu);
    function handleContextMenu(event) {
        event.preventDefault();
        if (event.target.classList.contains('block')) {
            selectedBlock = event.target;
            const contextMenu = document.getElementById('contextMenu');
            contextMenu.style.left = `${event.pageX}px`;
            contextMenu.style.top = `${event.pageY}px`;
            contextMenu.style.display = 'block';
        }
    }

    function closeContextMenu(event) {
        if (!event.target.closest('#contextMenu')) {
            document.getElementById('contextMenu').style.display = 'none';
        }
    }

    function handleColorChange(event) {
        if (selectedBlock) {
            selectedBlock.style.backgroundColor = event.target.value;
        }
    }
    function handleFontSizeChange(event) {
        if (selectedBlock) {
            selectedBlock.style.fontSize = `${event.target.value}px`;
        }
    }
    function handleClick(event) {
        // selectedBlock = event.target;
        if (event.target.classList.contains('block')) {
            const rect = event.target.getBoundingClientRect();
            alert(`Розміри блоку: ${event.target.style.width} x ${event.target.style.height}\nКоординати блоку: (${rect.left}, ${rect.top})`);
        }
    }

    let color;
    function handleMouseOver(event) {
        if (event.target.classList.contains('block')) {
            color = event.target.style.backgroundColor;
            event.target.style.backgroundColor = getRandomColor();
        }
    }

    function handleMouseOut(event) {
        if (event.target.classList.contains('block')) {
            // event.target.style.backgroundColor = getRandomColor();
            event.target.style.backgroundColor = color;
        }
    }
    function addBlock() {
        const container = document.getElementById('container');
        const block = document.createElement('div');
        const text = prompt('Введіть текст для блоку:', '');

        block.classList.add('block');
        block.style.width = `${Math.floor(Math.random() * 100) + 50}px`;
        block.style.height = `${Math.floor(Math.random() * 100) + 50}px`;
        block.style.backgroundColor = getRandomColor();
        block.style.left = `${Math.floor(Math.random() * (container.clientWidth - parseInt(block.style.width)))}px`;
        block.style.top = `${Math.floor(Math.random() * (container.clientHeight - parseInt(block.style.height)))}px`;
        block.textContent = text;

        container.append(block);

        setTimeout(() => {
            block.classList.add('visible');
        }, 100);

        scrollToBottom(container);
    }

    function removeBlock(event) {
        if (event.target.classList.contains('block') && event.button === 1) {
            event.target.classList.remove('visible');
            setTimeout(() => {
                event.target.remove();
            }, 500);
        }
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function scrollToBottom(container) {
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    }
});

