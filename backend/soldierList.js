const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const app = express();
const Soldier = require("./SoldierSchema");

const searchContent = (array, sort, sortby, content) => {
    let result = array;
    if (content && content !== "undefined") {
        result = array.filter(
            item =>
                item.name.search(content) !== -1 ||
                item.sex.search(content) !== -1 ||
                item.rank.search(content) !== -1 ||
                item.startDate.search(content) !== -1 ||
                item.phone.search(content) !== -1 ||
                item.email.search(content) !== -1 ||
                item.superiorName.search(content) !== -1
        );
    }
    switch (sort) {
        case "1":
            if (sortby === "subordinate") {
                return result.sort(
                    (a, b) =>
                        a.directSubordinates.length -
                        b.directSubordinates.length
                );
            }
            return result.sort((a, b) => a[sortby] > b[sortby]);
        case "-1":
            if (sortby === "subordinate") {
                return result.sort(
                    (a, b) =>
                        b.directSubordinates.length -
                        a.directSubordinates.length
                );
            }
            return result.sort((a, b) => b[sortby] > a[sortby]);
        default:
            return result;
    }
};
mongoose.connect(
    "mongodb+srv://namipapa:Ice5548449@namipapa-zsvih.mongodb.net/test?retryWrites=true&w=majority"
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

app.use("/soldiers", router);
app.listen(9000, () => {
    console.log("Beack-end Start!");
});

router.get("/getall", (req, res) => {
    Soldier.find((err, soldiers) => {
        if(err){
            res.status(500).json({ message: "Not found" });
        }else{
            res.status(200).json(soldiers);
        }
    })
})
router.get("/getsome", (req, res) => {
    let start = req.query.start|| 0;
    let end = req.query.end || 1; 
    let sort = req.query.sort;
    let content = req.query.search;
    let sortby = req.query.sortby;
    let type = req.query.type;
    let hasNext = false;
    let array = [];
    Soldier.find((err, soldiers) => {
        if(err) {
            res.status(500).json({message: "Not found"});
        }else{
            switch(type){
                case "directsub":
                    let superiorID = req.query.superiorID;
                    array = soldiers.filter(item => item.superiorID === superiorID);
                    array = searchContent(array, sort, sortby, content);
                    if(end * 5 < array.length){
                        hasNext = true;
                    };
                    res.json({
                        hasNext,
                        soldiers: array.slice(start * 5, end * 5)
                    })
                    break;
                default:
                    array = searchContent(soldiers, sort, sortby, content);
                    if(end * 5 < array.length){
                        hasNext = true
                    };
                    res.json({
                        hasNext,
                        soldiers: array.slice(start * 5, end * 5)
                    });
            }
        }
    })
});
router.get("/getone/:id", (req, res) => {
    var result = {};
    Soldier.findById(req.params.id, (err, soldier) => {
        if (err) {
            res.status(500).json({ message: "Can not find soldier" });
        }
        result._id = req.params.id;
        result.name = soldier.name;
        result.avatar = soldier.avatar;
        result.startDate = soldier.startDate;
        result.sex = soldier.sex;
        result.rank = soldier.rank;
        result.phone = soldier.phone;
        result.email = soldier.email;
        result.superiorID = soldier.superiorID;
        result.superiorName = soldier.superiorName;
        result.directSubordinates = soldier.directSubordinates;

        var sub = {};
        var queue = [req.params.id];
        
        while (queue.length > 0){
            let node = queue[0];
            sub[node] = true;
            queue.splice(0, 1);

            Soldier.findById(node, (err, tmp) => {
                if(err){
                    res.status(500).json({
                        message: "Tree map error"
                    })
                }
                for(let child of tmp.directSubordinates){
                    queue.push(child);
                }
            })
        }
        Soldier.find((err, soldiers) => {
            if(err){
                res.status(500).json({message: "Not found"})
            }
            soldiers = soldiers.filter(item => sub[item._id.toString()] !== true);
            result = {
                ...result,
                options: soldiers
            }
            res.status(200).json(result);
        })
    });
});
router.post("/create", (req, res) => {
    var soldier = new Soldier();
    soldier.avatar = req.body.avatar;
    soldier.name = req.body.name;
    soldier.sex = req.body.sex;
    soldier.rank = req.body.rank;
    soldier.startDate = req.body.startDate;
    soldier.phone = req.body.phone;
    soldier.email = req.body.email;
    soldier.superiorID = req.body.superiorID;
    soldier.superiorName = "";
    soldier.directSubordinates = [];
    if (soldier.superiorID){
        Soldier.findById(req.body.superiorID, (err, superior) => {
            if (err) {
                res.status(500).json({ message: "Can not find superior" });
            } else {
                soldier.superiorName = superior.name;
                superior.directSubordinates.push(soldier._id);
                superior.save(err => {
                    if (err) {
                        res.status(500).json({
                            message: "Cannot update superior"
                        });
                    }
                });
                soldier.save(err => {
                    if(err){
                        res.status(500).json({message: "Cannot create" + err})
                    }
                })
            }
        });
    }else{
        soldier.save(err => {
            if (err) {
                res.status(500).json({ message: "Cannot create:" + err });
            }
        })
    }
    res.status(201).json({ message: "Create " + soldier.name });
});
router.put("/edit/:id", (req, res) => {
    Soldier.findById(req.params.id, (err, soldier) => {
        if (err) {
            res.status(500).json({ message: "Can not find soldier" });
        } else {
            let OriginalSuperior = soldier.superiorID;
            let UpdatedSuperior = req.body.superiorID;

            soldier.avatar = req.body.avatar;
            soldier.name = req.body.name;
            soldier.sex = req.body.sex;
            soldier.rank = req.body.rank;
            soldier.startDate = req.body.startDate;
            soldier.phone = req.body.phone;
            soldier.email = req.body.email;
            soldier.superiorID = UpdatedSuperior;

            for (let directSubordinate of soldier.directSubordinates){
                Soldier.findById(directSubordinate, (err, sub) => {
                    if(err) {
                        res.status(500).json({
                            message: "Can not find directSubordinate"
                        })
                    } else {
                        sub.superiorName = req.body.name;
                        sub.save(err => {
                            if (err) {
                                res.status(500).json({
                                    message:
                                        "Can not save directSubordinate"
                                })
                            }
                        })
                    }
                })
            }
            if (
                OriginalSuperior &&
                OriginalSuperior !== UpdatedSuperior
            ) {
                Soldier.findById(OriginalSuperior, (err, superior) => {
                    if (err) {
                        res.status(500).json({
                            message: "Can not find original superior"
                        });
                    } else {
                        superior.directSubordinates = superior.directSubordinates.filter(
                            item => item !== req.params.id
                        );
                        superior.save(err => {
                            if (err) {
                                res.status(500).json({
                                    message:
                                        "Can not update original superior"
                                });
                            }
                        });
                    }
                });
            }
            if (
                UpdatedSuperior
            ) {
                Soldier.findById(UpdatedSuperior, (err, superior) => {
                    if (err) {
                        res.status(500).json({
                            message: "Can not find current superior"
                        });
                    } else {
                        soldier.superiorID = superior._id;
                        soldier.superiorName = superior.name;
                        if(UpdatedSuperior !== OriginalSuperior){
                            superior.directSubordinates.push(soldier._id);
                        }
                        superior.save(err => {
                            if (err) {
                                res.status(500).json({
                                    message:
                                        "Can not update current superior"
                                });
                            }
                        });
                        soldier.save(err => {
                            if (err) {
                                res.status(500).json({ message: "Can not update soldier" });
                            } else {
                                res.status(200).json(soldier);
                            }
                        });
                    }
                });
            }else{
                soldier.superiorName = '';
                soldier.save(err => {
                    if (err) {
                        res.status(500).json({ message: "Can not update soldier" });
                    } else {
                        res.status(200).json(soldier);
                    }
                });
            }
        }
    });
});
router.delete("/delete/:id", (req, res) => {
    Soldier.findById(req.params.id, (err, soldier) => {
        if (err) {
            res.status(500).json({ message: "Can not find soldier" });
        } else {
            let originalSuperior = soldier.superiorID;
            if (originalSuperior) {
                Soldier.findById(originalSuperior, (err, superior) => {
                    if (err) {
                        res.status(500).json({
                            message: "Can not find original superior"
                        });
                    }
                    superior.directSubordinates = superior.directSubordinates.filter(
                        item => item !== req.params.id
                    );
                    superior.save(err => {
                        if (err) {
                            res.status(500).json({
                                message: "Can not update original superior"
                            });
                        }
                    });
                });
            }
            for (let directSubordinate of soldier.directSubordinates) {
                Soldier.findById(directSubordinate, (err, sub) => {
                    if (err) {
                        res.status(500).json({
                            message: "Can not find subordinate"
                        });
                    } else {
                        sub.superiorID = '';
                        sub.superiorName = '';
                        sub.save(err => {
                            if (err) {
                                res.status(500).json({
                                    message: "Can not update subordinate"
                                });
                            }
                        });
                    }
                });
            }
            Soldier.remove(
                {
                    _id: soldier._id
                },
                (err, soldier) => {
                    if (err) {
                        res.json({ message: "delete fail" });
                    } else {
                        res.json({
                            message: "Successful delete" 
                        });
                    }
                }
            );
        }
    });
});