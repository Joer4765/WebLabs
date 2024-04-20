document.addEventListener('DOMContentLoaded', function () {
    const tree = document.querySelector('.tree');

    tree.addEventListener('click', function (event) {
        const target = event.target;

        if (target.tagName !== 'SPAN' || !target.classList.contains('node')) {
            return;
        }

        const children = target.parentNode.querySelector('ul');

        if (children) {
            children.hidden = !children.hidden;
            target.classList.toggle('collapsed');
        }
    });
});