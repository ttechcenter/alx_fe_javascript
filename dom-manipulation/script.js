const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const categorySelect = document.getElementById('categorySelect');
const addQuoteForm = document.getElementById('addQuoteForm');
const showAddFormButton = document.getElementById('showAddForm');

let quotes = [
  { text: 'The only way to do great work is to love what you do.', category: 'inspiration' },
  { text: 'In the middle of difficulty lies opportunity.', category: 'inspiration' },
  // ... more quotes
];

function showRandomQuote(category) {
  let filteredQuotes = quotes;
  if (category !== 'all') {
    filteredQuotes = quotes.filter(quote => quote.category === category);
  }
  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = 'No quotes found for this category.';
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = randomQuote.text;
}

newQuoteButton.addEventListener('click', () => {
  const category = categorySelect.value;
  showRandomQuote(category);
});

function createAddQuoteForm() {
  addQuoteForm.style.display = 'block';
  showAddFormButton.style.display = 'none';
}

function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    // Add category to select if it doesn't exist
    if (!categorySelect.options.namedItem(newQuoteCategory)) {
      const option = document.createElement('option');
      option.value = newQuoteCategory;
      option.text = newQuoteCategory;
      categorySelect.appendChild(option);
    }
    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    showRandomQuote('all'); // Display a new quote, including the added one
  }
}

showAddFormButton.addEventListener('click', createAddQuoteForm);

// Initial quote display
showRandomQuote('all');
