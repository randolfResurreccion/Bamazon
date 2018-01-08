

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
var count = 0;
function start() {
    if (count === 0) {
        count++;
        inquirer.prompt([
            {
                name: "q1",
                type: "list",
                message: "Please enter the item id of the Item you are looking for:  ",
                choices: ["id 1", "id 2", "id 3", "id 4", "id 5", "id 6", "id 7", "id 8", "id 9", "id 10"]
            },
            {
                name: "q2",
                type: "input",
                message: "Enter how many of this item you want to purchase: "
            }
        ]).then(function (answer) {
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                // console.log(res);
                for (var i = 0; i < res.length; i++) {
                    if (answer.q2 > res[i].stock_quantity) {
                        console.log("Insufficient quantity!");

                    }
                    else {
                        res[i].stock_quantity -= answer.q2;
                        connection.query("UPDATE products SET stock_quantity=" + res[i].stock_quantity + "WHERE item_id=" + res[i].item_id, function (err, res) {
                            if (err) throw err;
                        });

                        // updateStocks(answer.q2, answer.q1);
                    }
                }
            });
        })
    }
    else {
        // connection.end();
    }

};

// function updateStocks() {
//     connection.query("UPDATE products SET ? WHERE ?",
//         [
//             {
//                 stock_quantity: ""
//             },
//             {
//                 id: q1
//             }
//         ], function (err, res) { });
// }

