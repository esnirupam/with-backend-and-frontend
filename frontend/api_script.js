// DOM Elements
const apiList = document.getElementById('api-list');
const categoryList = document.getElementById('category-list');

// Initialize API List Display
displayAPIs();
populateCategories();

// Function to Fetch APIs from Backend and Display
async function displayAPIs() {
    try {
        const res = await fetch('http://localhost:5000/api/apis');
        const apis = await res.json();
        displayFilteredAPIs(apis); // Display all APIs
    } catch (error) {
        console.error("Error loading APIs:", error);
    }
}

// Function to Add New API
async function addAPI() {
    const apiName = document.getElementById('apiName').value;
    const apiURL = document.getElementById('apiURL').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('apiCategory').value || 'General';

    if (apiName && apiURL && description) {
        const newAPI = { name: apiName, url: apiURL, category, description };

        try {
            const res = await fetch('http://localhost:5000/api/apis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAPI),
            });

            if (res.ok) {
                displayAPIs();
                document.getElementById('contribute-form').reset();
                addCategoryIfNotExists(category);
            } else {
                console.error("Failed to add API:", await res.text());
            }
        } catch (error) {
            console.error("Error adding API:", error);
        }
    } else {
        alert("Please fill in all required fields.");
    }
}

// Function to Populate Category List
function populateCategories() {
    categoryList.innerHTML = '';
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.textContent = category;
        categoryItem.onclick = () => filterByCategory(category);
        categoryList.appendChild(categoryItem);
    });
}

// Search & Filter Functions
function filterAPIs() {
    const searchTerm = document.getElementById('main-search').value.toLowerCase();
    fetch('http://localhost:5000/api/apis')
        .then(response => response.json())
        .then(apis => {
            const filteredAPIs = apis.filter(api =>
                api.name.toLowerCase().includes(searchTerm) ||
                api.category.toLowerCase().includes(searchTerm)
            );
            displayFilteredAPIs(filteredAPIs);
        })
        .catch(error => console.error("Error filtering APIs:", error));
}

function filterCategories() {
    const searchTerm = document.getElementById('category-search').value.toLowerCase();
    const categoryItems = Array.from(categoryList.getElementsByTagName('li'));

    categoryItems.forEach(category => {
        const text = category.textContent.toLowerCase();
        category.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
}

// Filter APIs by Category
function filterByCategory(category) {
    fetch('http://localhost:5000/api/apis')
        .then(response => response.json())
        .then(apis => {
            const filteredAPIs = apis.filter(api => api.category.toLowerCase() === category.toLowerCase());
            displayFilteredAPIs(filteredAPIs);
        })
        .catch(error => console.error("Error filtering by category:", error));
}

// Helper Function to Display APIs
function displayFilteredAPIs(apis) {
    apiList.innerHTML = '';
    apis.forEach(api => {
        const apiCard = document.createElement('div');
        apiCard.className = 'api-card';
        apiCard.innerHTML = `
            <h3>${api.name}</h3>
            <p><strong>URL:</strong> <a href="${api.url}" target="_blank">${api.url}</a></p>
            <p><strong>Description:</strong> ${api.description}</p>
            <p><strong>Category:</strong> ${api.category}</p>
        `;
        apiList.appendChild(apiCard);
    });
}

// Add Category If Not Exists
function addCategoryIfNotExists(newCategory) {
    const normalizedNewCategory = newCategory.toLowerCase().trim();
    const categoryExists = categories.some(
        existingCategory => existingCategory.toLowerCase() === normalizedNewCategory
    );

    if (!categoryExists) {
        categories.push(newCategory);
        populateCategories();
    } else {
        alert("Category already exists.");
    }
}
