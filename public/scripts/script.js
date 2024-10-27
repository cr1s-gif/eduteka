// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get all the cards
var cards = document.querySelectorAll(".card");

// When the user clicks on any card, open the modal
cards.forEach(card => {
    card.addEventListener("click", function() {
        modal.style.display = "flex";
    });
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
