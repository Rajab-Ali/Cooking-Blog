require('../models/database')
const Category=require('../models/category')
const Recipe=require('../models/recipe')
async function homepage(req,res){
    try {
        const limititems=4
        const categories=await Category.find({}).limit(limititems)
        const recipes=await Recipe.find({}).sort({_id:-1}).limit(limititems)
        const thai=await Recipe.find({'category':'Thai'}).limit(limititems)
        const american=await Recipe.find({'category':'American'}).limit(limititems)
        const indian=await Recipe.find({'category':'Indian'}).limit(limititems)
        const chinese=await Recipe.find({'category':'Chinese'}).limit(limititems)
        const food={recipes,thai,american,indian,chinese}
        res.render('index',{categories,food})        
    } catch (error) {
        res.status(500).send( {message:error.message || "Error Occured"} )   
    }
}

async function ExploreCategory(req,res){
    try {
        const limititems=20
        const categories=await Category.find({}).limit(limititems)
        res.render('categories',{categories})  
    } catch (error) {
        res.status(500).send({message:error.message|| "Error Occured"})
    }
}

async function ExploreCategoryById(req,res){
  try {
      const {id:categoryId}=req.params
      const limititems=5
      const categoriesbyid=await Recipe.find({'category':categoryId}).limit(limititems)
      res.render('categories',{categoriesbyid})  
  } catch (error) {
      res.status(500).send({message:error.message|| "Error Occured"})
  }
}

async function ExploreRecipe(req,res){
  try {
    const {id:RecipeId}=req.params
    const recipeProduct=await Recipe.findById(RecipeId)
    res.render('recipe',{recipeProduct})
    
  } catch (error) {
    res.status(500).send({message:error.message || "error Occured. "})
  }
}
async function SearchRecipe(req,res){
  try {
    let searchTerm=req.body.searchTerm
  const recipesearch=await Recipe.find({$text:{$search:searchTerm, $diacriticSensitive:true}})
  res.render('search',{recipesearch})
  } catch (error) {
    res.status(500).send({message:error.message || "error Occured. "})
  }
  
}

async function ExploreLatest(req,res){
  try {
      const latestrecipe=await Recipe.find({}).sort({_id:-1}).limit(20)
      res.render('explore',{latestrecipe})  
    
  } catch (error) {
    res.status(500).send({message:error.message || "error Occured. "})
  }
}

async function ExploreRandom(req,res){
  try {
      let count= await  Recipe.find().countDocuments()
      let randnum= Math.floor(Math.random()*count)

      const randomrecipe=await Recipe.findOne().skip(randnum).exec()
      res.render('random',{randomrecipe})  
    
  } catch (error) {
    res.status(500).send({message:error.message || "error Occured. "})
  }
}

async function SubmitRecipe(req,res){
  const infoErrorsObj=req.flash('infoErrors')
  const infoSubmitObj=req.flash('infoSubmit')
  res.render('submit',{infoErrorsObj,infoSubmitObj})
}

async function SubmitRecipeOnPost(req,res){
  try {

    let imageUploadfile
    let uploadPath
    let newImageName
    if (req.file){
      console.log('No files where Uploaded.');
    }
    else{
      imageUploadfile = req.files.image
      newImageName=  imageUploadfile.name
      console.log('image name: ',newImageName);
      uploadPath=require('path').resolve('./')+'/public/uploads/'+newImageName
      console.log(uploadPath);
      imageUploadfile.mv(uploadPath,(err)=>{
        if (err) return res.status(500).send({message:err.message || 'error occured'})
      })
    }

    const newRecipe = {
      "name":req.body.name,
      "description":req.body.description,
      "email":req.body.email, 
      'ingredients':req.body.Indgredients,
      "category":req.body.category,
      "image":newImageName,
    }
    console.log(newRecipe);
    await Recipe.insertMany([newRecipe])
      req.flash('infoSubmit','Recipe has been added.')
      res.redirect('/submit-recipe')
  }
  catch (error){
    req.flash('infoErrors',error.message)
    res.redirect('/submit-recipe')
  }
}
async function insertDymmyRecipeData(){
      try {
        await Recipe.insertMany([
          { 
            "name": "Tom Daley's Sweet & Sour Chicken",
            "description": "Drain the juices from the tinned fruit into a bowl, add the soy and fish sauces, then whisk in 1 teaspoon of cornflour until smooth. Chop the pineapple and peaches into bite-sized chunks and put aside.",
            "email": "recipeemail@raddy.co.uk",
            "ingredients": [
            "1 x 227 g tin of pineapple in natural juice",
            "1 x 213 g tin of peaches in natural juice",
            "1 tablespoon low-salt soy sauce",
            "1 tablespoon fish sauce",
            "2 teaspoons cornflour",
            "2 x 120 g free-range chicken breasts , skin on",
            "Chinese five-spice",
            "1 lime",
            "2 cloves of garlic",
            "1 bunch of asparagus , (350g)",
            "100 g tenderstem broccoli",
            "1 small onion",
            "2 fresh red chillies",
            "1 red pepper",
            "1 yellow pepper",
            "7 cm piece of ginger",
            "groundnut oil",
            "100 g baby sweetcorn",
            "1 teaspoon runny honey",
            "½ a bunch of fresh coriander , (15g)"
        ],
            "category": "Mexican", 
            "image": "tom.jpg"
          },
        ]);
      } catch (error) {
        console.log('err', + error.message)
      }
    }
    
   //insertDymmyRecipeData();
    

module.exports ={homepage,ExploreCategory,ExploreCategoryById,ExploreRecipe,ExploreLatest,ExploreRandom,SubmitRecipe,SubmitRecipeOnPost,SearchRecipe}