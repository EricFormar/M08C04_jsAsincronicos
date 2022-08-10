window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

  const apiCall = async () => {
    try {
      let response = await fetch("http://localhost:3031/api/movies");
      let peliculas = await response.json();

      const favorites = JSON.parse(localStorage.getItem('favorites'));

      let data = peliculas.data.filter(movie => favorites.includes(movie.id));
      if(data.length > 0){
      data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
  
        const h1 = document.createElement("h1");
        h1.textContent = movie.title;
  
        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;
  
        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;
  
        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
      });
      
    }else{
      const h2 = document.createElement("h2");
      h2.textContent = "Aún no tienes peliculas favoritas";
      container.appendChild(h2)
    }
     
    } catch (error) {
      console.log(error);
    }
  };
  apiCall();

  /** Codigo que debemos usar para mostrar los datos en el frontend
   
  */
};
