window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  const $ = id => document.getElementById(id);

  if(!JSON.parse(localStorage.getItem("favorites"))){
    const favorites = [];
    localStorage.setItem("favorites",JSON.stringify(favorites));

  }

  // Aqui debemos agregar nuestro fetch
  const apiCall = async () => {
    try {
      let response = await fetch("http://localhost:3031/api/movies");
      let peliculas = await response.json();

      //console.log(peliculas);
      let data = peliculas.data;

      data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;
        const verMas = document.createElement("a");
        verMas.innerHTML = '<i class="far fa-eye"></i>'
        verMas.setAttribute('class', 'botonAgregar')

        verMas.href = "formulario.html?id="+movie.id;

        const action = document.createElement("div");
        action.setAttribute('class', 'action');

        const star = document.createElement("button");
        star.setAttribute('class', 'botonAgregar')
        star.innerHTML = '<i class="far fa-star"></i>';
        star.setAttribute('id','favoriteOff' + movie.id);
        star.onclick = () => {
          $('favoriteOff'+movie.id).setAttribute('hidden', true);
          $('favoriteOn'+movie.id).removeAttribute('hidden');

          const favorites = JSON.parse(localStorage.getItem('favorites'));
          favorites.push(movie.id);
          localStorage.setItem("favorites",JSON.stringify(favorites));
          console.log(localStorage.getItem('favorites'))
        }


        const star2 = document.createElement("button");
        star2.setAttribute('class', 'botonAgregar')
        star2.innerHTML = '<i class="fas fa-star"></i>';
        star2.setAttribute('hidden', true);
        star2.setAttribute('id','favoriteOn' + movie.id);
        star2.onclick = () => {
          $('favoriteOn'+movie.id).setAttribute('hidden', true);
          $('favoriteOff'+movie.id).removeAttribute('hidden');

          const favorites = JSON.parse(localStorage.getItem('favorites'));
          let index = favorites.indexOf(movie.id);
          favorites.splice(index,1)
          localStorage.setItem("favorites",JSON.stringify(favorites));
          console.log(localStorage.getItem('favorites'))
        }

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);

        action.appendChild(verMas);
        action.appendChild(star);
        action.appendChild(star2);

        card.appendChild(action)
        if(JSON.parse(localStorage.getItem('favorites')).includes(movie.id)){
          $('favoriteOff'+movie.id).setAttribute('hidden', true);
          $('favoriteOn'+movie.id).removeAttribute('hidden');
        }else{
          $('favoriteOn'+movie.id).setAttribute('hidden', true);
          $('favoriteOff'+movie.id).removeAttribute('hidden')
        }

      });
    } catch (error) {
      console.log(error);
    }
  };
  apiCall();


};
