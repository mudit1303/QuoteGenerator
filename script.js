const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

//Loading function
function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

//complete loading
function complete(){
    loader.hidden = true
    quoteContainer.hidden = false
}

//show new Quote
function newQuote(){
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    
    authorText.textContent =  quote.author ? quote.author : 'unknown' 
    
    //check quote Length
    quote.text.length>120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote')
    quoteText.textContent =   quote.text
    complete()
}


//get Quotes from API
async function getQuotes(){
    loading()
    const apiUrl = `https://type.fit/api/quotes`
    try{
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch(err){

    }
}

//On Load
getQuotes()

//eventlistener function for tweet quote
function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterURL,'_blank')
}

//attaching event Listener with buttons
twitterBtn.addEventListener('click',tweetQuote)
newQuoteBtn.addEventListener('click',newQuote)