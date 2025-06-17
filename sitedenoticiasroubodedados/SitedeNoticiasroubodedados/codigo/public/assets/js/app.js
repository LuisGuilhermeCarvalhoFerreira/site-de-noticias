document.addEventListener('DOMContentLoaded', () => {
  // CARROSSEL
  const images = document.querySelectorAll('.carousel img');
  let current = 0;

  setInterval(() => {
    images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
  }, 3000);

  // PESQUISA E CARREGAMENTO DE NOTÍCIAS
  const searchInput = document.getElementById('search-input');
  const newsList = document.querySelector('.latest-news ul');

  if (newsList) {
    fetch('../../public/assets/js/news.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao carregar o arquivo JSON");
        }
        return response.json();
      })
      .then(data => {
        displayNews(data);

        if (searchInput) {
          searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredNews = data.filter(news =>
              news.title.toLowerCase().includes(searchTerm)
            );
            displayNews(filteredNews);
          });
        }
      })
      .catch(error => {
        console.error(error);
        newsList.innerHTML = '<li>Erro ao carregar as notícias.</li>';
      });
  }

  function displayNews(newsArray) {
    newsList.innerHTML = '';
    newsArray.forEach(news => {
      const li = document.createElement('li');
      li.textContent = news.title;
      newsList.appendChild(li);
    });
  }
});
