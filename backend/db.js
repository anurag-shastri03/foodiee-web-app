const mongoose = require("mongoose");
const mongoURl = 'mongodb+srv://anurag:admin@gofood.midky.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=gofood'; 

const mongoDB = async()=>{
    try{
        const connect =  await mongoose.connect(mongoURl);
        console.log("Database Connected ");
        let fetched_data = mongoose.connection.db.collection("food_items");
        let data=await fetched_data.find({}).toArray();
        global.food_items = data;
        //console.log(global.food_items);
        let  food_category = mongoose.connection.db.collection("food_category");
        food_category = await food_category.find({}).toArray();
        global.food_category = food_category;
        let resp = {
          food_items : data,
          food_category : food_category
        }

        global.resp = resp;
        // //toArray(function (err,catData){
        //   if(err) console.log(err);
        //   else{
        //     global.food_items = data;
        //     global.food_category = catData;
        //   }  
        // })

        

    } catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = mongoDB;

