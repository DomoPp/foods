const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const expressUpload = require('express-fileupload');
const path = require('path');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_foods"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connects Database is success");
})

const app = express();

app.use(cors());
app.use(expressUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route("/api/foods")
    .get((req, res) => {
        let sql = "SELECT * FROM tb_foods ORDER BY f_id DESC";
        
        db.query(sql, (error, results) => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            return res.json(results)
        })
    })
    .post(async (req, res, next) => {
        
        let data = req.body;

        let sql = ' INSERT INTO tb_foods SET ? '
        if(req.files !== null){
            
            const upload = req.files.f_img;
            
            await upload.mv("./backend/upload/" + upload.name, err => {
                if (err) throw err;
                
                db.query(sql, {...data, f_img: '/'+upload.name}, (error, results) => {
                    if (error) return res.status(500).json({
                        "status": 500,
                        "message": "Internal Server Error" // error.sqlMessage
                    });
                    next();
                });
            });
        }else{
            await db.query(sql, {...data, f_img: "/system.jpg"}, (error, results) => {
                if (error) return res.status(500).json({
                    "status": 500,
                    "message": "Internal Server Error" // error.sqlMessage
                });
                next();
            });
        }
        // res.json({result: "Hello"})
    }, getDataAll)

app.route("/api/food/:id")
    .get((req, res, next) => {
        let sql = ' SELECT * FROM tb_foods WHERE f_id = ? '
        db.query(sql, [req.params.id], (error, results) => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            res.json(results);
        });
    })
    .put((req, res, next) => {
        
        let data = {
            f_name : req.body.f_name,
            f_ingredient: req.body.f_ingredient,
            f_formula: req.body.f_formula,
            f_by: req.body.f_by
        }
        
        let sql = ' UPDATE tb_foods SET ? WHERE f_id = ? '
        db.query(sql, [data, req.params.id], (error) => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            });
            
            next();
        });
    }, getDataAll)

    .delete((req, res, next) => {        
        let sql = ' DELETE FROM tb_foods WHERE f_id = ? '
        db.query(sql, [req.params.id], error => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            next();
        })
    }, getDataAll);


app.route("/api/comment/:id")
    .get(getComment)
    .post((req, res) => {
        let sql = ' INSERT INTO tb_comment SET ? ';
        db.query(sql, req.body, (error, results) => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            });
            res.json(results);
        });
    })

function getDataAll(req, res){
    db.query("SELECT * FROM tb_foods", (error, result) => {
        if (error) return res.status(500).json({
            "status": 500,
            "message": "Internal Server Error" // error.sqlMessage
        })
        return res.json(result);
    })
}

function getComment(req, res){
    db.query("SELECT * FROM tb_comment WHERE c_food = ? ORDER BY c_id DESC", [req.params.id], (error, result) => {
        if (error) return res.status(500).json({
            "status": 500,
            "message": "Internal Server Error" // error.sqlMessage
        })
        return res.json(result);
    })
}

app.use("/img", express.static(path.join(__dirname, "./upload")));


app.listen(3000, console.log("Server is running... port: 3000"));