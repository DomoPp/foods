const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testdb"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connects Database is success");
})

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route("/api/foods")
    .get((req, res) => {
        let sql = "SELECT * FROM food_menu ORDER BY fId DESC";
        
        db.query(sql, (error, results) => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            return res.json(results)
        })
    })
    .post((req, res, next) => {
        let user = {
            "name": req.body.name,
            "email": req.body.email
        }
        let sql = ' INSERT INTO food_menu SET ? '
        db.query(sql, user, (error, results, fields) => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })

            return res.json(results)
        })
    })

app.route("/api/food/:id")
    .all((req, res, next) => {
        //check id in database
        let sql = ' SELECT * FROM tbl_users WHERE id = ? '
        db.query(sql, [req.params.id], (error, results, fields) => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            if (results.length === 0) return res.status(400).json({
                "status": 400,
                "message": "Not found user with the given ID"
            })
            res.user = results  //set user and next process
            next()
        })
    })
    .get((req, res, next) => {
        return res.json(res.user)
    })
    .put((req, res, next) => {
        let user = {
            "name": req.body.name,
            "email": req.body.email
        }
        let sql = ' UPDATE tbl_users SET ? WHERE id = ? '
        db.query(sql, [user, req.params.id], (error, results, fields) => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            if (results.affectedRows > 0) {
                // update database from all form data
                user = Object.assign(res.user[0], user)
            } else { //update but same value
                user = res.user
            }

            const result = {
                "status": 200,
                "data": user
            }
            return res.json(result)
        })
    })
    .delete((req, res, next) => {
        let sql = ' DELETE FROM tbl_users WHERE id = ? '
        db.query(sql, [req.params.id], (error, results, fields) => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })

            const result = {
                "status": 200,
                "data": res.user
            }
            return res.json(result)
        })
    })


app.use("/img", express.static(path.join(__dirname, "./upload")));


app.listen(3000, console.log("Server is running... port: 3000"));