const BASE_URL = "http://api.forismatic.com/api/1.0/";
const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const TWITTER_URL = "https://twitter.com/intent/tweet";

/* ELements */
const twitterBtn = document.getElementById("twitter-btn");
const getQuoteBtn = document.getElementById("generate-btn");
const quoteContainer = document.getElementById("quote-container");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const loader = document.getElementById("loader");

/* Hide the loading spinner */
function hideLoadingSpinner() {
  loader.hidden = true;
	quoteContainer.classList.remove("hide");

}

/* Show the loading spinner */
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.classList.add("hide");
}

/* Function to get random quotes */
async function getRandomQuote() {
  /* Make an API Request */
  try {
    showLoadingSpinner();
    const response = await fetch(
      `${CORS_PROXY_URL}${BASE_URL}?method=getQuote&format=json&lang=en`
    );
    const data = await response.json();

    /* Destructure the data needed for display */
    const { quoteAuthor, quoteText } = data;

    if (quoteAuthor === "" || !quoteAuthor) {
      quoteAuthor = "Unknown";
    }

    /* Add class to decrease text size if it's long */
    if (quoteText.length >= 120) {
      quote.classList.add("small-text");
    } else {
      if (quote.classList.contains("small-text")) {
        quote.classList.remove("small-text");
      }
    }

    /* Populate the data */
    quote.textContent = quoteText;
    author.textContent = `-${quoteAuthor}`;

    /* Hide the spinner */
    hideLoadingSpinner();
  } catch (err) {
    console.log("Error fetching quotes", err);
    getRandomQuote();
  }
}

/* Method to tweet the quote */
async function tweetQuote() {
  const quoteText = quote.innerText;
  const quoteAuthor = author.innerText;

  if (quoteText !== "") {
    window.open(`${TWITTER_URL}?text=${quoteText}${quoteAuthor}`, "_blank");
  }
}

/* Tweet button Event Listenener */
twitterBtn.addEventListener("click", tweetQuote);

/* Get Quote Event Listener */
getQuoteBtn.addEventListener("click", getRandomQuote);

/* Get a Quote on load */
getRandomQuote();


