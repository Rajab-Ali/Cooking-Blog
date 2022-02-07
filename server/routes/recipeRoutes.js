const express=require('express')
const router=express.Router()
const {homepage,
        ExploreCategory,
        ExploreCategoryById,
        ExploreRecipe, 
        ExploreLatest, 
        ExploreRandom,
        SubmitRecipe,
        SubmitRecipeOnPost, 
        SearchRecipe
    }=require('../controllers/recipeController')


router.get('/',homepage)
router.get('/categories',ExploreCategory)
router.get('/categories/:id',ExploreCategoryById)
router.get('/recipe/:id',ExploreRecipe)
router.get('/explore-latest',ExploreLatest)
router.get('/explore-random',ExploreRandom)
router.get('/submit-recipe',SubmitRecipe)
router.post('/submit-recipe',SubmitRecipeOnPost)
router.post('/search',SearchRecipe)
module.exports=router