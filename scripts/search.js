let searchBox = document.getElementById("searchInput");
let cards = document.querySelectorAll("#cardContainer .package-card");

searchBox.addEventListener("input", () => {
    let text = searchBox.value.toLowerCase();

    cards.forEach(card => {
let cardText = card.querySelector("h3").innerText.toLowerCase();
        if (cardText.includes(text) && text !== "") {
            card.style.display = "block"; // show matching card
        } else if (text === "") {
            card.style.display = "block"; // show all when box is empty
        } else {
            card.style.display = "none";  // hide others
        }
    });
});
