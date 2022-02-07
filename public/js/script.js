let addIngredientBtn=document.getElementById('addIngredientBtn')
let ingredientlist=document.querySelector('.ingredientlist')
let ingredientDiv = document.querySelectorAll('.ingredientDiv')[0]

addIngredientBtn.addEventListener('click',()=>{
    var newIngredients = ingredientDiv.cloneNode(true)
    let input=newIngredients.firstElementChild
    input.value=""
    ingredientlist.appendChild(newIngredients)
})