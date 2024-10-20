document.addEventListener('DOMContentLoaded', () => {
    const mythFactBoxes = document.querySelectorAll('.myth-fact-box');

    mythFactBoxes.forEach(box => {
        box.addEventListener('mouseover', () => {
            box.classList.add('highlight');
        });

        box.addEventListener('mouseout', () => {
            box.classList.remove('highlight');
        });
    });
});
