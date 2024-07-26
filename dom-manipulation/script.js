const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const categorySelect = document.getElementById('categorySelect');
    const addQuoteForm = document.getElementById('addQuoteForm');
    const showAddFormButton = document.getElementById('showAddForm');
    const exportQuotesButton = document.getElementById('exportQuotes');
    const importFile = document.getElementById('importFile');

    const STORAGE_KEY = 'quotes'; // Key for local storage

    let quotes = [];

    // Load quotes from local storage on initialization
    const storedQuotes = localStorage.getItem(STORAGE_KEY);
    if (storedQuotes) {
      quotes = JSON.parse(storedQuotes);
    }

    function showRandomQuote(category) {
      let filteredQuotes = quotes;
      if (category !== 'all') {
        filteredQuotes = quotes.filter(quote => quote.category === category);
      }
      if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = '<p>No quotes found for this category.</p>';
        return;
      }
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const randomQuote = filteredQuotes[randomIndex];
      quoteDisplay.textContent = randomQuote.text;
    }

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
        saveQuotes(); // Save quotes to local storage after adding
        showRandomQuote('all'); // Display a new quote, including the added one
      }
    }

    function saveQuotes() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
    }

    function exportQuotes() {
      const quotesJson = JSON.stringify(quotes);
      const blob = new Blob([quotesJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download   
 = 'quotes.json';
      link.click();
      URL.revokeObjectURL(url); // Clean up temporary URL
    }

    function importFromJsonFile(event) {
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
        try {
          const importedQuotes = JSON.parse(event.target.result);
          quotes.push(...importedQuotes);
          saveQuotes();
          alert('Quotes imported successfully!');
        } catch (error) {
          alert('Error importing quotes: ' + error.message);
        }
      };
      fileReader.readAsText(event.target.files[0]);
    }

    showAddFormButton.addEventListener('click', createAddQuoteForm);
    newQuoteButton.addEventListener('click', () => {
      const category = categorySelect.value;
      showRandomQuote(category);
    });
    exportQuotesButton.addEventListener('click', exportQuotes);

    // Initial quote display
    showRandomQuote('all');
