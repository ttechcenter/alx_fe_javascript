const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteForm = document.getElementById('addQuoteForm');
const addQuoteBtn = document.getElementById('addQuoteBtn');

let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Work" },
    { text: "In the middle of difficulty lies opportunity.", category: "Life" },
    // Add more quotes here
];

function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.textContent = `"${randomQuote.text}"   
 - ${randomQuote.category}`;
}

function createAddQuoteForm() {
    addQuoteForm.style.display = 'block';
}

function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        addQuoteForm.style.display = 'none';
        showRandomQuote(); // Display the newly added quote
    } else {
        alert('Please enter both quote and category');
    }
}

newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', createAddQuoteForm);
