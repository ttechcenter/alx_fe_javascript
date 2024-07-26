    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const categorySelect = document.getElementById('categorySelect');
    const categoryFilter = document.getElementById('categoryFilter');
    const addQuoteForm = document.getElementById('addQuoteForm');
    const showAddFormButton = document.getElementById('showAddForm');
    const exportQuotesButton = document.getElementById('exportQuotes');
    const importFile = document.getElementById('importFile');

    const STORAGE_KEY = 'quotes';
    const LAST_FILTER_KEY = 'lastFilter';

    let quotes = [];

    // Load quotes from local storage on initialization
    const storedQuotes = localStorage.getItem(STORAGE_KEY);
    if (storedQuotes) {
      quotes = JSON.parse(storedQuotes);
    }

    // Load last selected filter from local storage
    const lastFilter = localStorage.getItem(LAST_FILTER_KEY);

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
        // Add category to filter if it doesn't exist
        if (!categoryFilter.options.namedItem(newQuoteCategory)) {
          const option = document.createElement('option');
          option.value = newQuoteCategory;
          option.text = newQuoteCategory;
          categoryFilter.appendChild(option);
        }
        // Clear input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        saveQuotes();
        showRandomQuote('all');
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
          populateCategoryFilter();
          alert('Quotes imported successfully!');
        } catch (error) {
          alert('Error importing quotes: ' + error.message);
        }
      };
      fileReader.readAsText(event.target.files[0]);
    }


function populateCategories() {
  const categories = new Set(quotes.map(quote => quote.category));
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.text = category;
    categoryFilter.appendChild(option);   

  });
  if (lastFilter && categoryFilter.options.namedItem(lastFilter)) {
    categoryFilter.value = lastFilter;
  }
}

    function filterQuotes() {
      const selectedCategory = categoryFilter.value;
      const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
      // Update quoteDisplay with filtered quotes
      // ... logic to update quoteDisplay
      localStorage.setItem(LAST_FILTER_KEY, selectedCategory);
    }

    showAddFormButton.addEventListener('click', createAddQuoteForm);
    newQuoteButton.addEventListener('click', () => {
      const category = categorySelect.value;
      showRandomQuote(category);
    });
    exportQuotesButton.addEventListener('click', exportQuotes);

    populateCategoryFilter(); // Initial populate
    filterQuotes(); // Initial filter

const SYNC_INTERVAL = 5000; // Sync every 5 seconds (for demonstration)

async function fetchQuotesFromServer() {
  try {
    const newQuote = {
      // Create a new quote object to send to the server
      text: 'New quote from client',
      category: 'new'
    };

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuote)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error   
 syncing data:', error);
    // Handle sync errors, e.g., show a notification
  }
}

function syncQuotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}
setInterval(syncData, SYNC_INTERVAL);
