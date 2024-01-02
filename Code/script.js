document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('analyze-btn').addEventListener('click', analyzeRecipe);
    document.getElementById('new-recipe-btn').addEventListener('click', resetForm);
});

function analyzeRecipe() {
    // Use the variables from secrets.js
    const appId = EDAMAM_APP_ID;
    const appKey = EDAMAM_APP_KEY; 
    const recipeText = document.getElementById('recipe-input').value;
    const url = 'https://api.edamam.com/api/nutrition-details?app_id=' + appId + '&app_key=' + appKey;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingr: recipeText.split('\n') })
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error fetching nutrition data. Please check the console for more information.');
    });
}

function displayResults(data) {
    // Get the table body where the ingredient breakdown will be displayed
    const breakdownTableBody = document.querySelector('#breakdown-table tbody');
    
    // Clear out the previous results
    breakdownTableBody.innerHTML = '';
    
    // Iterate over each ingredient to display its breakdown
    data.ingredients.forEach((ingredient) => {
        ingredient.parsed.forEach((item) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.quantity}</td>
                <td>${item.measure}</td>
                <td>${item.food}</td>
                <td>${item.nutrients.ENERC_KCAL.quantity.toFixed(2)}</td>
                <td>${item.weight.toFixed(2)} g</td>
            `;
            breakdownTableBody.appendChild(row);
        });
    });

    const nutritionFactsDiv = document.getElementById('nutrition-facts');

    // Clear previous nutrition facts
    nutritionFactsDiv.innerHTML = '<h3>Nutrition Facts</h3>';

    // Function to create and append nutrition facts
    Object.entries(data.totalNutrients).forEach(([key, value]) => {
        const p = document.createElement('p');
        p.innerHTML = `${value.label}: <strong>${parseFloat(value.quantity).toFixed(2)} ${value.unit}</strong>`;
        nutritionFactsDiv.appendChild(p);
    });

    // Display additional labels like diet and health labels if they are present
    if (data.dietLabels.length || data.healthLabels.length) {
        const dietHealthContainer = document.createElement('div');

        if (data.dietLabels.length) {
            const dietLabelP = document.createElement('p');
            dietLabelP.innerHTML = `<strong>Diet Labels:</strong> ${data.dietLabels.join(', ')}`;
            dietHealthContainer.appendChild(dietLabelP);
        }

        if (data.healthLabels.length) {
            const healthLabelP = document.createElement('p');
            healthLabelP.innerHTML = `<strong>Health Labels:</strong> ${data.healthLabels.join(', ')}`;
            dietHealthContainer.appendChild(healthLabelP);
        }

        nutritionFactsDiv.appendChild(dietHealthContainer);
    }

    // Append total calories at the top
    const caloriesP = document.createElement('p');
    caloriesP.innerHTML = `<strong>Calories:</strong> ${parseFloat(data.calories).toFixed(2)}`;
    nutritionFactsDiv.insertBefore(caloriesP, nutritionFactsDiv.firstChild);
}

function resetForm() {
    document.getElementById('recipe-input').value = '';
    const breakdownTableBody = document.querySelector('#breakdown-table tbody');
    breakdownTableBody.innerHTML = '';
    const nutritionFactsDiv = document.getElementById('nutrition-facts');
    nutritionFactsDiv.innerHTML = '<h3>Nutrition Facts</h3>';
}
