const fs = require('fs');
function get(req, res) {
    fs.readFile("waterSport.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}

function getById  (req, res) {

    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else{
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
function updateProductStock(req, res) {
    const { productId, quantity } = req.params; // שינוי כאן

    fs.readFile("waterSport.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading products data");
        }

        let products = JSON.parse(data);
        const productIndex = products.findIndex(p => p.id == productId);

        if (productIndex === -1) {
            return res.status(404).send("Product not found");
        }

        if (products[productIndex].stock < quantity) {
            return res.status(400).send("Not enough stock");
        }

        products[productIndex].stock -= quantity;

        fs.writeFile("waterSport.json", JSON.stringify(products, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing product data");
            } else {
                res.send("Product stock updated successfully");
            }
        });
    });
}

// function deleteBag(req, res) {
//     fs.writeFile("waterSport.json", "utf-8", (err, data) => {
//         if (err) {
//             res.status(500).send("error read file student ")
//         } else {
//             res.send(JSON.parse(data));
//         }

//     })
// }
function deleteP(req, res) {
    const idToDelete = req.params.id;

    fs.readFile("waterSport.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file bags.json");
        }

        let p;
        try {
            p = JSON.parse(data);
        } catch (parseErr) {
            return res.status(500).send("Error parsing JSON");
        }

        const updated = p.filter(product => product.id != idToDelete);

        fs.writeFile("waterSport.json", JSON.stringify(updated, null, 2), "utf-8", (err) => {
            if (err) {
                return res.status(500).send("Error writing to file");
            }

            res.send({ message: `Bag with id ${idToDelete} deleted successfully`, p: updated});
        });
    });
}

module.exports={get,getById,deleteP,updateProductStock}