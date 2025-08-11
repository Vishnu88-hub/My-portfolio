function showAlert() {
  alert("Welcome to Organic Farming Guide!");
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

function displayDate() {
  document.getElementById("date").innerHTML = "Today's Date: " + new Date().toDateString();
}

displayDate();

function redirectToPage(page) {
  window.location.href = page;
}