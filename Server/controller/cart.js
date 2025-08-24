const fs = require('fs');

exports.post = (req, res) => {
    fs.readFile("cart.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading cart data");
        }
        let cart = JSON.parse(data);
        cart.push(req.body);
        fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
            if (err) {
                res.status(500).send("Error adding to cart");
            } else {
                res.send("Success add order");
            }
        });
    });
}

exports.getById = (req, res) => {
    console.log("getById called with id:", req.params.id);

    fs.readFile("cart.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading cart data");
        }
        const id = req.params.id;
        const cart = JSON.parse(data);
        const userCart = cart.filter(item => item.userId == id);
        // מחזיר מערך ריק במקום שגיאה 404
        res.json(userCart);
    });
}


// exports.getById = (req, res) => {
//     fs.readFile("cart.json", "utf-8", (err, data) => {
//         if (err) {
//             return res.status(500).send("Error reading cart data");
//         }
//         const id = req.params.id;
//         const cart = JSON.parse(data);
//         const userCart = cart.filter(item => item.userId == id);
//         if (userCart.length === 0) {
//             return res.status(404).send("No products found for user with id " + id);
//         }
//         res.json(userCart);
//     });
// }

exports.delete = (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    fs.readFile("cart.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading cart data");
        }
        let cart = JSON.parse(data);
        // Remove the item with matching userId and productId
        cart = cart.filter(item => !(item.userId == userId && item.productId == productId));

        fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
            if (err) {
                res.status(500).send("Error writing cart data");
            } else {
                res.send("Product removed from cart successfully");
            }
        });
    });
}

// פונקציה חדשה לניקוי כל הסל של המשתמש
exports.clearCart = (req, res) => {
    console.log(req.params.userId, "545454")
    const userId = req.params.userId;

    fs.readFile("cart.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading cart data");
        }

        let cart = JSON.parse(data);
        // Keep only items that do NOT belong to the user
        const updated = cart.filter(item => item.userId != userId);

        fs.writeFile("cart.json", JSON.stringify(updated), (err) => {
            if (err) {
                return res.status(500).send("Error writing cart data");
            } else {
                res.send("Cart cleared successfully");
            }
        });
    });
};



// const fs = require('fs');


// exports.post = (req, res) => {

//     fs.readFile("cart.json", "utf-8", (err, data) => {
//         //המרה של טקסט למערך
//         let cart = JSON.parse(data);
//         //body =  לתוכן שנשלח בפונקציה פןסט
//         cart.push(req.body);
//         fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
//             if (err) {
//                 res.status(500).send("error  in add order ");
//             } else {
//                 res.send("sucess add order");
//             }
//         })
//     })
// }

// exports.getById = (req, res) => {
//     debugger
//     fs.readFile("cart.json", "utf-8", (err, data) => {
//         if (err) {
//             return res.status(500).send("error read file users ")
//         }


//         const id = req.params.id;

//         const cart = JSON.parse(data);


//         const userCart = cart.filter(st => st.userId == id)

//         if (userCart.length === 0) {
//             return res.status(404).send("לא נמצאו מוצרים למשתמש עם id " + id);
//         }

//         res.json(userCart);





//     })
// }


// exports.delete = (req, res) => {
//   const userId = req.params.userId;
//   const productId = req.params.productId;

//   fs.readFile("cart.json", "utf-8", (err, data) => {
//     if (err) {
//       return res.status(500).send("Error reading cart data");
//     }

//     let cart = JSON.parse(data);

//     // פילטור להסרת המוצר לפי userId ו-productId
//     cart = cart.filter(
//       (item) => !(item.userId == userId && item.productId == productId)
//     );

//     fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
//       if (err) {
//         res.status(500).send("Error writing cart data");
//       } else {
//         res.send("Product removed from cart successfully");
//       }
//     });
//   });
// };