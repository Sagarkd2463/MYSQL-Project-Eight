const express = require('express');
const router = express.Router();

const db = require('./connection');

router.post('/create', (req, res) => {
    
    const { name, email, age, mobile, work, address, desc } = req.body;

    if(!name || !email || !age || !mobile || !work || !address || !desc){
        res.status(422).json('Please fill all the data!');
    }

    try {
        db.query("SELECT * FROM users WHERE email = ?", email, (err, data) => {
            if(data.length){
                res.status(422).json('This data already exists in database...');
            } else {
                db.query("INSERT INTO users SET ?", {name, email, age, mobile, work, address, desc}, (err, data) => {
                    if(err){
                        res.json(err.message);
                    } else {
                        res.status(201).json(req.body);
                    }
                });
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

router.get('/getuser', (req, res) => {

    db.query("SELECT * FROM users", (err, data) => {
        if(err){
            res.status(422).json(err.message);
        } else {
            res.status(200).json(data);
        }
    });
});

router.delete('/deleteuser/:id', (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM users WHERE id = ?", id, (err) => {
        if(err){
            res.status(422).json(err.message);
        } else {
            res.status(200).json(`Deleted user with id = ${id}`);
        }
    });
});

router.get('/induser/:id', (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM users WHERE id = ?", id, (err, data) => {
        if(err){
            res.status(422).json(err.message);
        } else {
            res.status(200).json(data);
        }
    });
});

router.patch('/updateuser/:id', (req, res) => {
    const { id } = req.params;

    const data = req.body;

    db.query("UPDATE users SET ? WHERE id = ?", [data, id], (err, result) => {
        if(err){
            res.status(422).json(err.message);
        } else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;