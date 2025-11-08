// This file contains JavaScript code for client-side functionality, such as form handling and dynamic content loading.

document.addEventListener("DOMContentLoaded", function() {
    // Function to load content dynamically
    function loadContent(page) {
        const contentDiv = document.getElementById("content");
        fetch(page)
            .then(response => response.text())
            .then(data => {
                contentDiv.innerHTML = data;
            })
            .catch(error => {
                console.error("Error loading content:", error);
            });
    }

    // Event listeners for navigation links
    document.getElementById("nav-marketplace").addEventListener("click", function() {
        loadContent("marketplace/index.html");
    });

    document.getElementById("nav-school").addEventListener("click", function() {
        loadContent("school/index.html");
    });

    document.getElementById("nav-about").addEventListener("click", function() {
        loadContent("about.html");
    });

    // Load the landing page content by default
    loadContent("landing.html");
});