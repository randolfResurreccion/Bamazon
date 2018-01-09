

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

// start function===============

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

            var quantitySelected = parseInt(answer.desiredQuantity);
            // console.log(res[0].stock_quantity);
            var stock_quantity = res[0].stock_quantity;
            if (quantitySelected > stock_quantity) {
                console.log("Insufficient quantity!");
                connection.end();

            }
            else {
                console.log("word");
                var stockUpdate = stock_quantity - quantitySelected;
                // console.log(stockUpdate);
                updateStocks(answer.desiredItem, stockUpdate);
            }

        });
    })

};

function updateStocks(target_item, stockUpdate) {
    console.log(target_item);
    console.log(stockUpdate);
    connection.query("UPDATE products SET ?",
    [
        {
            stock_quantity: stockUpdate
        },
        {
            item_id: target_item
        }
    ], function (err, res) {
        if(err) throw err;
        console.log(target_item);
        console.log(stockUpdate);
        console.log("stock updated");
        connection.end();

    });
}

