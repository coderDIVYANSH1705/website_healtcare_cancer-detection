function calculateBMI() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const resultDiv = document.getElementById('result');
    
    if (height > 0 && weight > 0) {
        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        const bmiValue = document.getElementById('bmiValue');
        const bmiMessage = document.getElementById('bmiMessage');

        bmiValue.textContent = bmi;

        let message;
        if (bmi < 18.5) {
            message = "You are underweight.";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            message = "You have a normal weight.";
        } else if (bmi >= 25 && bmi < 29.9) {
            message = "You are overweight.";
        } else {
            message = "You are obese.";
        }

        bmiMessage.textContent = message;

        resultDiv.classList.add('fadeIn');
    } else {
        alert("Please enter valid height and weight values.");
    }
}

// Sparkle effect
document.addEventListener('DOMContentLoaded', () => {
    const sparkleContainer = document.getElementById('sparkleContainer');

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = `${Math.random() * window.innerWidth}px`;
        sparkle.style.top = `${Math.random() * window.innerHeight}px`;
        sparkleContainer.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }

    setInterval(createSparkle, 500);
});
