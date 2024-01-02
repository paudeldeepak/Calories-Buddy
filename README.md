# Calories Buddy

Calories Buddy is a web-based application that allows users to enter ingredients or recipes and receive an instant nutritional analysis, including calorie counts and detailed nutrient information. This application utilizes the Edamam Nutrition Analysis API to retrieve and display the nutritional data.

## Features

- **Recipe Input**: Users can input multiple ingredients or complete recipes to get nutritional information.
- **Nutritional Breakdown**: The application provides a detailed breakdown of calories and nutrients like fats, proteins, carbs, vitamins, and minerals.
- **Responsive Design**: Crafted with a responsive layout for a consistent experience across desktop and mobile devices.
- **Dynamic Content**: Utilizes JavaScript and AJAX for real-time content updates without the need for page reloads.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- A modern web browser.
- JS
- If editing or testing locally, a simple HTTP server (can be set up using Python or Node.js).

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/paudeldeepak/Calories-Buddy.git

2. Navigate to the project directory:
   ```bash
   cd calories-buddy
3. Open the index.html file in your web browser or use an HTTP server to serve the files.

### API Configuration
The application requires an API ID and Key from Edamam. To set this up:
1. Sign up for an API key at [Edamam's Developer Portal](https://developer.edamam.com/ "Visit Edamam's Developer Portal").
2. Create a secrets.js file in the root of the project directory.
3. Add your API credentials to secrets.js:
   ```bash
   const EDAMAM_APP_ID = 'your_app_id';
   const EDAMAM_APP_KEY = 'your_app_key';
4. Make sure to add secrets.js to your .gitignore file to keep your credentials secure.

### Usage
Simply enter the ingredients or recipes you wish to analyze in the text area provided (each ingredient on a new line) and click on the "Analyze" button to view the nutritional information.

### License
This project is open source and available under the [MIT License](https://github.com/paudeldeepak/Calories-Buddy/blob/main/LICENSE).

### Acknowledgements
[Edamam](https://www.edamam.com/), for providing the Nutrition Analysis API used in this project



