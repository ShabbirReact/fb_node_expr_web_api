
var express = require('express');
var app = express();

//1.
var sql = require('mssql');
//2.

//loadEmployees(2);
//3.
app.get('/Emp', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        server: 'localhost',
        database: 'Company',
        user: 'sa',
        password: 'React@2019',
        port:1433
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from EmployeeInfo', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
function loadEmployees(id) {
    //4.
    var dbConn = new sql.Connection(config); //This is just an instance and not connecting to db
 //5.
    dbConn.connect().then(function () {
      //6.
        var request = new sql.Request(dbConn);
       //7.
        request.query("select * from EmployeeInfo where EmpNo="+id).then(function (recordSet) { 
            console.log(recordSet);
            dbConn.close();
        }).catch(function (err) {
            //8.
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        //9.
        console.log(err);
    });
}
//10.


//1
function executeStoredProc(){
   //2. 
     var dbConn = new sql.Connection(config); 
     dbConn.connect().then(function () {
       
        //3.
         var request = new sql.Request(dbConn);
        request.input ('Salary',sql.Int,50000)
        .execute("GetAllEmployeeBySalary").then(function (recordSet) { 
            //4.
            console.log(recordSet);
            dbConn.close();
        }).catch(function (err) {
            //5.
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        //6.
        console.log(err);
    });
}
//7.
//executeStoredProc();

//1.
function insertRow(){
    //2.
     var dbConn = new sql.Connection(config); 
     //3.
     dbConn.connect().then(function () {
        //4.
         var transaction = new sql.Transaction(dbConn);
         //5.
         transaction.begin().then(function(){
         //6.
            var request = new sql.Request(transaction);
              //7.
        request.query("Insert into EmployeeInfo (EmpName,Salary,DeptName,Designation) values ('T.M. Sabnis',13000,'Accounts','Lead')")
        .then(function () {
            //8.
            transaction.commit().then(function(recordSet){
                    console.log(recordSet);
                dbConn.close();
            }).catch(function(err){
                //9.
                console.log( "Error in Transaction Commit " + err);
                dbConn.close();   
            });     
            }).catch(function(err){
                //10.
                console.log( "Error in Transaction Begin " + err);
                dbConn.close();
            });
            
        }).catch(function (err) {
            //11.
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        //12.
        console.log(err);
    });
}
//13.
//insertRow();
 