var addIngredientBtn=document.getElementById('addIngredientBtn')
var ingredientlist=document.querySelector('.ingredientlist')
console.log(ingredientlist);
var ingredientDiv = document.querySelectorAll('.ingredientDiv')[0]
console.log(ingredientDiv);
addIngredientBtn.addEventListener('click',()=>{
    var newIngredients = ingredientDiv.cloneNode(true)
    console.log(newIngredients.firstChild);
    ingredientlist.appendChild(newIngredients)
})