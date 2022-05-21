const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const mainContainer = document.getElementById("container");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const load = document.getElementById("loader");

let apiQuotes = []; //as it would be an array of several we just need one at a time

//loading::

function loading() {
  load.hidden = false;
  mainContainer.hidden = true;
}
//hide loading
function complete() {
  mainContainer.hidden = false;
  load.hidden = true;
}

function newQuote() {
  loading();//as when the button is pressed 
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; //to generate a random number from 1 to the upper limit of the array
  if (!quote.author) {
    //or quote.author =="" same thing as some of them have null values
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
  loading();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL); //await is used so that it waits for the fetch request can only be used with async if we dont add await then it might cause an error as it would try to fill response before fetching causing an error
    apiQuotes = await response.json(); //as it would be a series of strings from the web server
    newQuote(); //funciton that generates random quote
  } catch (error) {
    //cath the error here
  }
}

function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; //template string was used here as it allows us to pass in a variable that will be converted into a string "?" after tweet word is for adding query parameter = value tells us the value type ie text here
  window.open(twitterURL, "_blank"); //window .open basically opens twitterURL's value here in a tab whenever the function tweetQuote is run 
                                    //blank opens in new tab
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
getQuotes();
