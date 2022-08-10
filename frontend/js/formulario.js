window.onload = () => {
 let query = new URLSearchParams(location.search);
 let id = query.get('id');

 const $ = id => document.getElementById(id);

    const apiCall = async (id) => {
        try {
          let response = await fetch("http://localhost:3031/api/movies/" + id);
          let pelicula = await response.json();
    
          console.log(pelicula);

          let data = pelicula.data

          $('title').value = data.title
          $('rating').value = data.rating
          $('awards').value = data.awards
          $('release_date').value = moment(data.release_date).format('YYYY-MM-DD')
          $('length').value = data.length
         
        } catch (error) {
          console.log(error);
        }
      };
      apiCall(id);

}