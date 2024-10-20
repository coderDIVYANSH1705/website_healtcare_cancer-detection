document.addEventListener('DOMContentLoaded', () => {
    const tips = document.querySelectorAll('.tip');

    tips.forEach(tip => {
        tip.addEventListener('mouseover', () => {
            tip.classList.add('highlight');
        });

        tip.addEventListener('mouseout', () => {
            tip.classList.remove('highlight');
        });
    });
});
