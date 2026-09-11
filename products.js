let allProducts = [];
async function fetchProducts() {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        allProducts = await res.json();
        renderProducts(allProducts);
        applyCategoryFromURL();
    } catch (err) {
        console.error("Failed to fetch products:", err);
    }
}
function renderProducts(products) {
    const container = document.getElementById("products");
    container.innerHTML = "";
    products.forEach((p, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${p.image}" alt="${p.title}">
            <h3><a href="product.html?id=${p.id}">${p.title}</a></h3>
            <p><b>$${p.price}</b></p>
        `;
        container.appendChild(card);

        setTimeout(() => {
            card.classList.add("show");
        }, index * 50);
    });
}

function filterProducts(categoryText) {
    if (categoryText === "all") {
        renderProducts(allProducts);
        return;
    }
    const filtered = allProducts.filter(
        p => p.category.toLowerCase() === categoryText.toLowerCase()
    );
    renderProducts(filtered);
}

document.querySelectorAll("#filters .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        filterProducts(btn.textContent.trim().toLowerCase());
    });
});

function applyCategoryFromURL() {
    const params= new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (!category) return;

    const categoryMap = {
        men: "men's clothing",
        women: "women's clothing",
        accessories: "jewelery"
    };

    const apiCategory = categoryMap[category];
    if (apiCategory) {
        filterProducts(apiCategory);
        document.querySelector(".product-container")?.scrollIntoView({ behavior: "smooth" });
    }
}
fetchProducts();