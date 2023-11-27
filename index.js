var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/admin');
var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/sign_up", (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var address = req.body.address;
    var city = req.body.city;
    var data = {
        "username": username,
        "email": email,
        "password": password,
        "address": address,
        "city": city
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) throw err;
        console.log("Record Inserted Successfully");
    });
    return res.redirect('login.html');

})

app.post("/login",(request,response) => {
    try{
        //console.log(req.body);
        const username = request.body.username;
        const password = request.body.password;
        //const { username, password } = req.body

        console.log(`${username} and ${password}`);

        db.collection('users').findOne({ username: username }, (err, res) => {
            if (res == null) {
                response.send("Invalid information!❌❌❌! Please create account first");
            }
            else if (err) throw err;
            if (res.password === password) {
                console.log("login sucessfully");
            
                return response.redirect('login_success.html');
            }
            else {
                response.send("Invalid Password!❌❌❌");
            }


        });

        

    }catch(error){
        console.log(error)
    }
})


app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');

}).listen(4000);

console.log("Listening on Port 4000");