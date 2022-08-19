//body-parser module is used to parse the form data.
var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//connect to the database
mongoose.connect("mongodb+srv://PB1906:Push@todo.fgotkgf.mongodb.net/?retryWrites=true&w=majority");

//Create a schema , this is like a blueprint 
var toDoSchema = new mongoose.Schema({
    item: String 
});

var Todo=mongoose.model('Todo',toDoSchema);
//var data = [{item: 'get milk'},{item:'walk dog'},{item:'kick some coding ass'}];
var urlencodedParser=bodyParser.urlencoded({extended:false});
module.exports=function(app){

app.get('/todo',function(req,res){
    //get data from mongodb and pass it to view 
    Todo.find({},function(err,data){
        if(err) throw err;
    res.render('todo',{todos: data});
});
});
app.post('/todo',urlencodedParser, function(req,res){
    //get data from the view and add it to mongo db 
    var newToDo = Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.json(data);
    })
});

app.delete('/todo/:item',function(req,res){
    //delete the requested item from mongo db 
    Todo.find({items:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if (err) throw err;
        res.json(data);
    });
});


};