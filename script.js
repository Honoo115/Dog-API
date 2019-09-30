String.prototype.capFirstLetter = function(){
	return this.charAt(0).toUpperCase() + this.substring(1);
}
function getImages(num) {
  fetch('https://dog.ceo/api/breeds/image/random/' + num)
    .then(res => res.json())
    .then(dogData => $renderImages(dogData.message))
}

function breedSearch() {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(breedData => $renderBreeds(breedData.message));
}

function searchBreedImg(breed) {
let breedName = breed.toLowerCase();
	fetch('https://dog.ceo/api/breed/' + breedName + '/images/random')
		.then(res => res.json())
    // .then(breedImg => $renderSingle(breedImg.message))
    .then(breedImg => {
      console.log(breedImg);
      if (breedImg.status == "error"){
        console.log("Not applicable breed")
        errorHandler("Not applicable breed");
      } else if (breedImg.status == "success"){
        $renderSingle(breedImg.message)
      }
    })
}
function $renderImages(data) {
  data.forEach(img => {
    $(".dog-results").append(`
        <img class="dog-result" src="${img}">
      `);
  });
}
function $renderSingle(data) {
 	$('.dog-results').append(`
		<img class="dog-result single" src="${data}" alt="dog">
	`);
}
function $renderBreeds(data){
	let breedArr = [];
	for(let breed in data){
		breedArr.push(breed.capFirstLetter());
	}
	breedArr.sort().forEach(breed => {
		$('.breed_list').append(`
			<option value="${breed.toLowerCase()}">${breed}</option>
		`)		
	})  
}
function theListener() {
  $("form").submit(e => {
  e.preventDefault();
	$('.dog-results').empty();
  $('.error_handle').hide();
});
  $("#dog_lottery").submit(e => {
    let dogCount = $(".dog_total").val();
   	if(dogCount > 50){
			errorHandler("You cannot select more than 50 images. Please select a smaller number.");
		} else {
			getImages(dogCount);
		}
  });
  $("#breed_searcher").submit(e => {
    let breedName = $(".breed_names").val().toLowerCase();
    searchBreedImg(breedName);

  });
  $("#breed_browser").submit(e => {
    let breedName = $(".breed_list").val();
    searchBreedImg(breedName);

  });
}
function errorHandler(errorMsg){
$('.error_handle').text(errorMsg).show();
}
$(function(){
	breedSearch();
	theListener();
})