// define the variables
var table,thead,tbody,db, btn;

 
try {
    if (window.openDatabase) {
        db = openDatabase("com.js-html5.websql", "0.1", "js-html5.com websql demo", 200000);
        if (!db)
            alert("Failed to open the database on disk.  This is probably because the version was bad or there is not enough space left in this domain's quota");
    } else
   		alert("Couldn't open the database.  Please try with a browser with this feature enabled");
} catch(err) {
    db = null;
    alert("Couldn't open the database.  Please try with a browser with this feature enabled");
}




// when loaded
window.onload = function() {
	table = document.querySelector('#db_table');
	thead = document.querySelector('#db_table thead');
	tbody = document.querySelector('#db_table tbody');

	btn = document.querySelector('#add_new');
	btn.onclick = function() {
		var username = prompt('Enter a username');
		var email = prompt('Enter an email address');
		
		var obj = {
			username : username,
			email : email
		};
		db.transaction(function(tx) {
			insertRow(obj,tx);
		});
	
	};


	db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM people", [], function(tx,result) {
        	addRows(result);
        }, function(tx, error) {
            tx.executeSql("CREATE TABLE people (id INTEGER PRIMARY KEY, username TEXT, email TEXT)", [], function(tx,result) { 
               var obj = {
               		id: '1',
					username: 'sydlawrence',
					email: 'syd@js-html5.com'
				};
                insertRow(obj,tx);
                
            },function(tx,error){console.log(error)});
        });
    });

	var obj = {
		username: 'username',
		email: 'email'
	};
	thead.innerHTML += addRow(obj,'th');
};

function insertRow(data,tx) {
	var sql = "INSERT INTO people (username, email) VALUES ('"+data.username+"','"+data.email+"')";
	
	
	

	 tx.executeSql(sql,[],function(tx,result){
	 	data.id = result.insertId;

	 	
	 	tbody.innerHTML += addRow(data);

	 	
	 },function(tx,err){
	 	console.log('error');
	 	console.log(err);
	 });
}

function addRows(result) {
	for (i=0;i<result.rows.length;i++) {	
		tbody.innerHTML += addRow(result.rows.item(i))
	}
}

function addRow(data,el) {
	if (!el)
		el = "td";
	var html = "<tr>";
	html += "<"+el+">"+data.id+"</"+el+">";
	html += "<"+el+">"+data.username+"</"+el+">";
	html += "<"+el+">"+data.email+"</"+el+">";
	html+= "</tr>";
	
	return html;
}


