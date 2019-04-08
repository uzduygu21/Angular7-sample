const express = require("express");
const app = express();
const cors = require("cors");
const jwt=require("jsonwebtoken");//jsonwebtoken package indirdim, burdada require ettik

app.use(express.json()); // Middleware func, include this(we used req.body that's why we needed middleware)
app.use(express.urlencoded({extended:true})); //// Middleware func, include this

app.use(cors({
    origin:"http://localhost:4200"
}));

app.post("/authenticate",(req,res)=>{
  const credentials=req.body;

  const token=jwt.sign({"username":credentials.username,"org":"Marlabs"},'marlabs-secret',{expiresIn:'1h'})
//bu pattern npmjs.com'dan alabiliriz."username" part,the part we need to store in token.we used username, system will understand okay this is duygu
//second param is the secret key,always use the things which cannot guess. like hwdhjdsfdy38i
//third param is the time it'll disappear, I want to make this token only for 1 hour
  if(credentials.username=="admin" && credentials.password=="admin"){
    res.status(200).send({
      isLoggedIn:true,
      token:token // Used token here
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

//to verify validate of token in the server, USE custom middleware func like below.Custom middleware func has 3 parameters
//next func will help you to proceed to the next process in the queu.
app.use((req,res,next)=>{
  const token=req.body.token || req.params.token || req.headers.token;
//there are 3 ways that server will allow you to send token values. Here we can nOT use body,because it's not POST req
//we can not use params because there's no params(alttaki products bakiyoruz).We can only send token with headers
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