
const fs = require('fs');

function get(req, res) {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let product = data.find(st => st.id == id)

            if (product == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(product);
            }

        }


    })
}


exports.post = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        let products = JSON.parse(data);
        //body =  לתוכן שנשלח בפונקציה פןסט 
        let product =req.body
        // מוסיף איידי למוצר החדש 
        products.push(product);
        fs.writeFile("products.json", JSON.stringify(products), (err) => {
            if (err) {
                res.status(500).send("error  in add products ");
            } else {
                res.send(product);
            }
        })
    })
}
exports.delete = (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  fs.readFile("cart.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading cart data");
    }

    let cart = JSON.parse(data);

    // פילטור להסרת המוצר לפי userId ו-productId
    cart = cart.filter(
      (item) => !(item.userId == userId && item.productId == productId)
    );

    fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
      if (err) {
        res.status(500).send("Error writing cart data");
      } else {
        res.send("Product removed from cart successfully");
      }
    });
  });
};



//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
