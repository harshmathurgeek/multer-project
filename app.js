const express=require("express");
const multer=require('multer');
const path=require('path')
const app=express();
// const upload=multer({dest:"my-uploads"});
app.use(express.static('views'))//setting public folder as static which means compiler will look all the js and front end fiels in public folder by default

app.set("view engine","ejs");
app.set("views",path.join(__dirname+'/views'));
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, './my-uploads')
	},
	filename: function (req, file, cb) {
	   
	  cb(null, `${Date.now()}-${file.originalname}`)
	}
  })
		const upload = multer({ storage: storage })
app.use(express.urlencoded({extended:false}))
  app.get('/',(req,res)=>{
	res.render('index')
  })
  app.post('/',upload.single("img"),(req,res)=>{
	console.log(req.file);
	res.redirect('/');
  })
  
  app.listen(80,()=>console.log("server is listening on port 80"));