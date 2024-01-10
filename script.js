document.addEventListener("DOMContentLoaded", function () {
    const listBtn = document.getElementById("list-view");
    const gridBtn = document.getElementById("grid-view");
    const productsContainer = document.getElementById("products-container");
    let jsonData = [];

    const fetchData = async () => {
        try {
            const response = await fetch("https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            jsonData = await response.json();
            console.log(jsonData.data);

            // After successful fetch, render the products
            renderProducts("list");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to create a product HTML element
    function createProductElement(product) {
        const productItem = document.createElement("div");
        productItem.classList.add("plp__product-item");

        // Create the product image element
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("plp__product-item-img-wrapper");
        const productImg = document.createElement("img");
        productImg.width = 175;
        productImg.height = 175;
        productImg.src = product.product_image;
        productImg.alt = "";
        imgWrapper.appendChild(productImg);

        // Create the product badge element
        const badge = document.createElement("div");
        badge.classList.add("plp__product-item-badge");
        badge.textContent = product.product_badge;

        // Create the product title and variants element
        const productInfo = document.createElement("div");
        const title = document.createElement("h2");
        title.textContent = product.product_title;

        const variantsList = document.createElement("ul");
    product.product_variants.forEach(variant => {
        for (const key in variant) {
            if (variant.hasOwnProperty(key)) {
                const li = document.createElement("li");
                li.textContent = variant[key];
                variantsList.appendChild(li);
            }
        }
    });
        productInfo.appendChild(title);
        productInfo.appendChild(variantsList);

        // Append elements to product item
        imgWrapper.appendChild(badge);
        productItem.appendChild(imgWrapper);
        productItem.appendChild(productInfo);

        return productItem;
    }

    function renderProducts(viewMode) {
        productsContainer.innerHTML = "";

        jsonData.data.forEach(product => {
            const productElement = createProductElement(product);
            productsContainer.appendChild(productElement);
        });

        productsContainer.classList.remove("list", "grid");
        productsContainer.classList.add(viewMode);
    }

    listBtn.onclick = () => {
        renderProducts("list");
    };

    gridBtn.onclick = () => {
        renderProducts("grid");
    };

        
    // Fetch data when the DOM is loaded
    fetchData();
});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    