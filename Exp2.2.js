const products = [
    { id: 1, name: "Laptop", category: "electronics", price: 55000 },
    { id: 2, name: "Smartphone", category: "electronics", price: 25000 },
    { id: 3, name: "T-Shirt", category: "fashion", price: 799 },
    { id: 4, name: "Jeans", category: "fashion", price: 1499 },
    { id: 5, name: "JavaScript Book", category: "books", price: 499 },
    { id: 6, name: "Python Book", category: "books", price: 699 }
];

const productGrid = document.getElementById("productGrid");
const filterCategory = document.getElementById("filterCategory");
const sortOption = document.getElementById("sortOption");

function displayProducts(items) {
    productGrid.innerHTML = "";
    items.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p class="price">₹${product.price.toFixed(2)}</p>
            </div>
        `;
    });
}

function updateProducts() {
    let filtered = [...products];

    const category = filterCategory.value;
    if (category !== "all") {
        filtered = filtered.filter(p => p.category === category);
    }

    const sort = sortOption.value;
    if (sort === "priceLow") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "priceHigh") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    displayProducts(filtered);
}

filterCategory.addEventListener("change", updateProducts);
sortOption.addEventListener("change", updateProducts);

displayProducts(products);
