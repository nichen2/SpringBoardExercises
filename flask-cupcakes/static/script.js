async function getCupcakes() {
    try {
        const response = await axios.get("http://127.0.0.1:5000/api/cupcakes");
        const cupcakes = response.data.cupcakes;
        cupcakes.forEach(cupcake => {
            $("#cupcakes-list").append(`<li> ${cupcake.flavor} - Rating: ${cupcake.rating}</li>`);
        });

    } catch (error) {
        console.log("Something went wrong when fetching cupcakes", error)
    }
}

async function addCupcake() {
    try {
        const cupcake = {
            flavor: $("#cupcake-flavor").val(),
            size: $("#cupcake-size").val(),
            rating: $("#cupcake-rating").val(),
            image: $("#cupcake-image").val(),
        };
        const response = await axios.post("http://127.0.0.1:5000/api/cupcakes", cupcake);
        console.log("Cupcake added:", response.data);
        $("#cupcakes-list").append(`<li> ${cupcake.flavor} - Rating:${cupcake.rating}</li>`);
    } catch (error) {
        console.log("Error adding cupcake", error);
    }
}

function clearForm() {
    $("#cupcake-flavor").val("");
    $("#cupcake-size").val("");
    $("#cupcake-rating").val("");
    $("#cupcake-image").val("");
}

$("#cupcake-form").submit((event) => {
    event.preventDefault();
    addCupcake();
    clearForm();
});

getCupcakes();
  