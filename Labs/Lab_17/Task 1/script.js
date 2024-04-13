document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('container');
    const infoButton = document.querySelector('.button-info');
    const hiderButton = document.querySelector('.button-hider');
    const hiders = document.querySelector('.hiders');

    for (let i = 0; i < 10; i++) {
        let block = document.createElement('div');
        block.className = 'block';
        block.textContent = 'Block ' + (i + 1);
        block.id = 'Block ' + (i + 1);
        container.append(block);

        let info = document.createElement('div');
        info.className = 'info';
        block.append(info);

        block.addEventListener('click', () => {
            let newSize = prompt('Enter new size (widthxheight):');
            let [width, height] = newSize.split('x');
            block.style.width = width + 'px';
            block.style.height = height + 'px';
            getInfo();
        });
    }

    function getInfo() {
        let blocks = document.getElementsByClassName('block');
        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i];
            let rect = block.getBoundingClientRect();
            let info = block.querySelector('.info');
            info.innerHTML = '';
            let info_arr = [
                block.offsetWidth + 'x' + block.offsetHeight,
                rect.left + ',' + rect.top,
                (rect.left - container.getBoundingClientRect().left) +
                ',' + (rect.top - container.getBoundingClientRect().top),
                container.scrollTop
            ];

            for (let c of info_arr) {
                let item = document.createElement('div');
                item.innerHTML = c;
                info.append(item);
            }

            block.append(info);

        }
    }

    infoButton.addEventListener('click', () => {
        getInfo();
    })

    document.addEventListener('click', function(event) {
        let id = event.target.dataset.toggleId;
        if (!id) return;

        let elem = document.getElementById(id);

        elem.hidden = !elem.hidden;
    });

    hiderButton.addEventListener('click', () => {
        let id = prompt('Enter element id: ');
        let hider = document.createElement('button');
        hider.setAttribute('data-toggle-id', id);
        hider.innerHTML = `Приховувач ${id}`;
        hiders.append(hider);
    });
});