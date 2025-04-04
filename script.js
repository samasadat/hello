document.addEventListener("DOMContentLoaded", () => {
  const fetchButton = document.getElementById("fetchButton");
  const resultsDiv = document.getElementById("results");

  const API_URL = "https://67ee271bc11d5ff4bf7883f7.mockapi.io/tasks";

  fetchButton.addEventListener("click", async function () {
    resultsDiv.innerHTML = "";

    fetch(API_URL, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((tasks) => {
        console.log(tasks);
        resultsDiv.innerHTML = tasks;
      })
      .catch((error) => {
        resultsDiv.innerHTML = `HTTP error: ${error}! status: ${response.status}`;
      });
  });
});
