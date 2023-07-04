const url = 'https://recetas-en-espanol.p.rapidapi.com/api/recipes';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8c74fb9232msh2acea2532bc0cd4p1a956ajsn491901d84916',
		'X-RapidAPI-Host': 'recetas-en-espanol.p.rapidapi.com'
	}
};

let resultado = []; 

const renderProductos = async () => {
	try {
		const respuesta = await fetch(url, options);
		resultado = await respuesta.json();

		renderRecetas(resultado);

	} catch (error) {
		document.getElementById("render").innerHTML = 
		Swal.fire({
			icon: 'error',
			title: 'Ups..',
			text: 'No se encontro la info esperada!!!',
		  })
	}
};

const renderRecetas = (recetas) => {
	let salida = "";
	recetas.forEach(item => {
		salida += `<div class="col-md-3 my-5 pd-5 ">
			<div class="card img-fluid">
			<img src="${item.img}" class="card-img-top" alt="${item.description}">
			<div class="card-body">
			  <h5 class="card-title">${item.title}</h5>
			  <p class="card-text">${item.title}</p>
			  <a href="#" class="btn btn-outline-secondary d-grid gap-2 col-6 mx-auto" " onclick="verReceta('${item.url}')">Ver Receta</a>
			</div>
		  </div>
		  </div>`;
	});

	document.getElementById("render").innerHTML = salida;
};

const filtrarProductos = () => {
	const searchInput = document.getElementById("busqueda").value.toLowerCase();

	const recetasFiltradas = resultado.filter((item, index, self) => {
		const categoriaCumple = item.category.toLowerCase().includes(searchInput);
		const tituloCumple = self.findIndex(r => r.title === item.title) === index;
		return categoriaCumple && tituloCumple;
	});

	let salida = "";
	if (recetasFiltradas.length > 0) {
		renderRecetas(recetasFiltradas);
	} else {
		salida = Swal.fire({
			icon: 'error',
			title: 'Ups..',
			text: 'No se encontro la categoria esperada!!!', 
			
		  })
		document.getElementById("render").innerHTML = salida;
	}
};

const searchButton = document.getElementById("botonBusqueda");
searchButton.addEventListener("click", filtrarProductos);

const verReceta = (url) => {
	window.location.href = url;
};

renderProductos();
