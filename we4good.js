// Replace 'YOUR_API_KEY' and 'YOUR_SEARCH_ENGINE_ID' with actual values
const API_KEY = 'YOUR_API_KEY';
const SEARCH_ENGINE_ID = 'YOUR_SEARCH_ENGINE_ID';

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const query = document.getElementById('query').value;
    if (query) {
        searchGoogle(query);
    }
});

function searchGoogle(query) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayResults(data.items))
        .catch(error => console.error('Error:', error));
}

function displayResults(items) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (items && items.length > 0) {
        document.querySelector('.results-section').style.display = 'block';
        items.forEach(item => {
            const result = document.createElement('div');
            result.classList.add('result');

            const title = document.createElement('a');
            title.href = item.link;
            title.target = '_blank';
            title.textContent = item.title;
            result.appendChild(title);

            const snippet = document.createElement('p');
            snippet.textContent = item.snippet;
            result.appendChild(snippet);

            resultsDiv.appendChild(result);
        });
    } else {
        resultsDiv.innerHTML = '<p>No results found</p>';
    }
}
