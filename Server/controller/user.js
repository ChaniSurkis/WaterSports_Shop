
const fs = require('fs');

function get(req, res) {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let user = data.find(st => st.id == id)

            if (user == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(user);
            }

        }


    })
}

// exports.login = (req, res) => {
//     fs.readFile("users.json", "utf-8", (err, data) => {
//         if (err) {
//             res.status(500).send("error read file users ")
//         } else {
//             let user = req.body
//             data = JSON.parse(data);
//             let currentUser = data.find(st => st.password == user.password)

//             if (currentUser == undefined) {
//                 res.status(500).send("user isn't exist!, please register");
//             } else {
//                 res.send(currentUser);
//             }

//         }

//     })
//     }
exports.login = (req, res) => {
  const fs = require("fs");

  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading users file");
    } else {
      const { email, password } = req.body;
      let users = JSON.parse(data);

      // בדיקת התאמה גם לפי אימייל וגם לפי סיסמה
      const currentUser = users.find(user => user.email === email && user.password === password);

      if (!currentUser) {
        res.status(401).send("User not found or incorrect email/password");
      } else {
        res.status(200).send(currentUser);
      }
    }
  });
};


exports.post = (req, res) => {
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send("שגיאה בקריאת קובץ");

    let users = [];

    try {
      users = JSON.parse(data);
      console.log("users:",users)
    } catch (e) {
        
      return res.status(500).send("פורמט קובץ שגוי");
    }

    // בדיקת ייחודיות ת"ז או מייל
    const exists = users.find(
      u => u.tz === req.body.tz || u.email === req.body.email
    );
    if (exists) {
      return res.status(400).send("משתמש כבר קיים");
    }

    // יצירת id חדש
    const lastId = users.length > 0 ? users[users.length - 1].id : 0;
    req.body.id = lastId + 1;

    // הוספה לרשימה
    users.push(req.body);

  fs.writeFile("users.json", JSON.stringify(users, null, 2), err => {
  if (err) {
    console.log("err")
    res.status(500).send("שגיאה בהוספת משתמש");
  } else {
    
    res.status(201).json(req.body);  // מחזיר את האובייקט החדש שנוסף
  }
});

  });
};

//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
