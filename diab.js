document.getElementById('data-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const glucoseLevel = document.getElementById('glucose-level').value;

    const response = await fetch('/api/glucose', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level: glucoseLevel }),
    });

    const data = await response.json();
    document.getElementById('feedback').innerText = data.message;
    checkDangerIndicator(glucoseLevel);
    fetchData('daily'); // Default fetch for daily data
});

async function fetchData(period) {
    const response = await fetch(`/api/glucose-data?period=${period}`);
    const data = await response.json();

    const ctx = document.getElementById('glucoseChart').getContext('2d');
    const glucoseLevels = data.map(item => item.level);
    const labels = data.map(item => new Date(item.date).toLocaleDateString());

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Glucose Levels',
                data: glucoseLevels,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Glucose Level (mg/dL)',
                    },
                },
            },
        },
    });
}

function checkDangerIndicator(level) {
    const indicator = document.getElementById('danger-indicator');
    if (level < 70) {
        indicator.innerText = "Danger: Low Glucose Level!";
        indicator.classList.remove('hidden');
    } else if (level > 180) {
        indicator.innerText = "Danger: High Glucose Level!";
        indicator.classList.remove('hidden');
    } else {
        indicator.classList.add('hidden');
    }
}


