const firebase=require('firebase/app')
const express=require("express");
const multer=require('multer');
const path=require('path')
const app=express();
const { getStorage, ref, uploadBytesResumable,downloadURL, getDownloadURL } = require("firebase/storage");

// const upload=multer({dest:"my-uploads"});
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkTVL_FS17diZVH852oQRG-dB__o6Lnzw",
  authDomain: "care-club-4b0b6.firebaseapp.com",
  projectId: "care-club-4b0b6",
  storageBucket: "care-club-4b0b6.appspot.com",
  messagingSenderId: "1059626952989",
  appId: "1:1059626952989:web:1b186213e3a8e73cf599f4"
};
firebase.initializeApp(firebaseConfig);
const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

// Initialize Firebase
app.use(express.static('views'))//setting public folder as static which means compiler will look all the js and front end fiels in public folder by default

app.set("view engine","ejs");
app.set("views",path.join(__dirname+'/views'));
// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
	// 	  cb(null, './my-uploads')
// 	},
// 	filename: function (req, file, cb) {
	
// 	  cb(null, `${Date.now()}-${file.originalname}`)
// 	}
//   })
		// const upload = multer({ storage: storage })
app.use(express.urlencoded({extended:false}))
  app.get('/',(req,res)=>{
	  res.render('index')
	})
	app.post('/',upload.single("img"),(req,res)=>{
	const storageRef = ref(storage, `files/${req.file.originalname + "  "+Math.floor((Math.random() * 1000) + 1)}`);

	uploadBytesResumable(storageRef, req.file.buffer).then((snapshot) => {
	  console.log(snapshot);
	});
	
	console.log(req.file);
	res.redirect('/');
  })
  
  app.listen(80,()=>console.log("server is listening on port 80"));