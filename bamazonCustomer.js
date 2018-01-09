

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "291woodlawn",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log(connection.threadId);
    displayProducts();

});

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        // console.log(res);
        console.log("-----------------------");
        console.log("Welcome To Bamazon");
        console.log("-----------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + " | ");

        };
        start();
    });
};



function start() {
    inquirer.prompt([
        {
            name: "desiredItem",
            type: "input",
            message: "Please enter the item id of the Item you are looking for: ",
        },
        {
            name: "desiredQuantity",
            type: "input",
            message: "Enter how many of this item you want to purchase: "
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE item_id = ?", [answer.desiredItem], function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                var quantitySelected = parseInt(answer.desiredQuantity);
                var total = answer.desiredQuantity * res[i].price;
                var product_name = res[i].product_name;
                var stockUpdate = res[i].stock_quantity - quantitySelected;
                if (quantitySelected > res[i].stock_quantity) {
                    console.log("Insufficient quantity!");
                    connection.end();
                }
                else {
                   
                    console.log("Item chosen: " + product_name);
                    updateStocks(answer.desiredItem, stockUpdate);
                    console.log("There is " + stockUpdate + " " + product_name + " left");
                }

                function updateStocks(target_item, stockUpdate) {
                    
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: stockUpdate
                            },
                            {
                                item_id: target_item
                            }
                        ], function (err, res) {
                            if (err) throw err;
                            console.log("stock updated");
                            connection.end();
                            console.log("Your total is: $" + total)

                        });
                }
            }


        });
    })

};



