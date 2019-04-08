const express = require("express");
const app = express();
const cors = require("cors");
const jwt=require("jsonwebtoken");

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:"http://localhost:4200"
}));

app.post("/authenticate",(req,res)=>{
  const credentials=req.body;

  const token=jwt.sign({"username":credentials.username,"org":"Marlabs"},'marlabs-secret',{expiresIn:'1h'})
  if(credentials.username=="admin" && credentials.password=="admin"){
    res.status(200).send({
      isLoggedIn:true,
      token:token 
    })
  }else{
    res.send({
      isLoggedIn:false
    })
  }
})

const productsData = [
    {
      "productId": 1,
      "productName": "Leaf Rake",
      "productCode": "GDN-0011",
      "releaseDate": "March 19, 2016",
      "description": "Leaf rake with 48-inch wooden handle.",
      "price": 19.95,
      "starRating": 3.2,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    },
    {
      "productId": 2,
      "productName": "Garden Cart",
      "productCode": "GDN-0023",
      "releaseDate": "March 18, 2016",
      "description": "15 gallon capacity rolling garden cart",
      "price": 32.99,
      "starRating": 4.2,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
    },
    {
      "productId": 5,
      "productName": "Hammer",
      "productCode": "TBX-0048",
      "releaseDate": "May 21, 2016",
      "description": "Curved claw steel hammer",
      "price": 8.9,
      "starRating": 4.8,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
    },
    {
      "productId": 8,
      "productName": "Saw",
      "productCode": "TBX-0022",
      "releaseDate": "May 15, 2016",
      "description": "15-inch steel blade hand saw",
      "price": 11.55,
      "starRating": 3.7,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
    },
    {
      "productId": 10,
      "productName": "Video Game Controller",
      "productCode": "GMG-0042",
      "releaseDate": "October 15, 2015",
      "description": "Standard two-button video game controller",
      "price": 35.95,
      "starRating": 4.6,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
    }
  ]

app.use((req,res,next)=>{
  const token=req.body.token || req.params.token || req.headers.token;
  if(!token){
    res.send("Invalid request");
  }else{
    jwt.verify(token,"marlabs-secret",(err,decoded)=>{
      if(err){
        res.send("Invalid token");
      }else{
        req.decoded=decoded;
        next();
      }
      })
    }
  })

  app.get('/products',(req,res)=>{
    console.log("Inside products api");
    console.log(req.decoded);
    res.status(200).send(productsData);
  })

  app.listen(3000, ()=>{
      console.log("server running @localhost:3000");
  })