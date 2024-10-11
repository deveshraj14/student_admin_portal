const mongoose=require('mongoose')
const Data = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        dbName: 'newwalo',
        // useNewUrlParser: true,
        // useUnifiedTopology: true
      })   
    .then(() => {
        console.log("connected");
    })
    .catch((err) => {
        console.log("Error connecting to database:", err);
    });  
};

module.exports= Data;


// JpTAsuenFmj2Z1rA
// rajputdevesh12345