const mongoose = require('mongoose');

const recipeSchema=new mongoose.Schema({
 name:{
     type:String,
     required:[true,'This field is required'],
 },
 description:{
     type:String,
     required:[true,'This field is required']
 },
 email:{
     type:String,
     required:[true,'This field is required']
 },
 ingredients:{
     type:Array,
     required:[true,'This field is required']
 },
 category:{
     type:String,
     enum:['Thai','American','Chinese','Mexican','Spanish','Indian'],
     required:[true,'This field is required']
 },   
 image:{
    type: String,
    required:[true,'This field is required']
 }

}
)
recipeSchema.index({name:'text',description:'text',category:'text'})

module.exports=mongoose.model('Recipe',recipeSchema)