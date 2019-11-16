var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var readline = require('readline-sync');

// Create connection to database
var config =
{
    authentication: {
        options: {
            userName: 'perez', // update me
            password: 'SparkDev19' // update me
        },
        type: 'default'
    },
    server: 'sparkdevsg.database.windows.net', // update me
    options:
    {
        database: 'Census Outreach Organizations', //update me
        encrypt: true
    }
}
var connection = new Connection(config);





// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            
            var OrgID = readline.question("OrgID?")
            var user = readline.question ("Username? ");
            var passW = readline.question("Password? ");
            
            
           showInfo(OrgID)
            
        }
    }
);



function showInfo(OrgID)
{
    console.log('Reading rows  from the Table...');

    // Read all rows from table
    var request = new Request(
        "SELECT * from Organizations where OrgID =" + OrgID 
            ,
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}



function insertLogin(user, passW){
    request = new Request("UPDATE Logins SET username ='" + user + "' , password = '"+passW+"'  WHERE OrgID=10 " , function(err){
        if (err){
            console.log(err);}
            process.exit()

    });
    connection.execSql(request);}

 

function authenticate(user){
       request = new Request("SELECT CASE WHEN COUNT(OrgID) = 1 THEN CAST (1 as BIT) ELSE CAST (0 as BIT) END As IsOrg     FROM [dbo].[Logins] WHERE username = '" +user+ "' ", function(err){
           if (err){
             console.log(err);}

             process.exit()
       });
       connection.execSql(request); }