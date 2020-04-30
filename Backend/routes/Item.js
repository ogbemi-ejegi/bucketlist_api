const express = require('express');
const router = express.Router();
const {itemValidation, jwtValidation} = require('../validation');
const { ObjectId } = require('mongoose').Types;
const item = require('../models/Item');

//Router to post a item
router.post('/', jwtValidation, async (req, res) => {
    const {error} = itemValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if that item name is taken
    const itemExist = await item.findOne({itemname: req.body.itemname});
    if(itemExist) return res.status(400).send('That item name already exist');

    //create item
    const newitem = new item({itemname: req.body.itemname});

    try {
        saveditem = await newitem.save();
        res.status(201).send({itemId: saveditem._id, itemName: saveditem.itemname});
    } catch (error) {
        res.status(400).send(error);
    }

});

//Router to get all item
router.get('/', async (req, res) => {
    //Get all item from database
    const items = await item.find();
    const response = {
        itemList: items.map((item) =>{
            return {
                id: item._id,
                itemName: item.itemname,
                date: item.date
            }
        })
    }
    res.status(200).json(response);
});

//Router to get a single item
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    if(!ObjectId.isValid(id)){
        return res.status(400).send({
            message: `The ID ${id} is not a valid item id`
        });
    }
    const singleitem = await item.findById(id);
    const response = {
        singleitem: {
            id: singleitem._id,
            itemname: singleitem.itemname,
            date: singleitem.date
        }
    }
    if(singleitem){
        res.status(200).json(singleitem)
    } else {
        res.status(500).json({error: 'Server error'})
    }
});

//Router to update item
router.patch('/update/:id', async (req, res, next) => {
    //const {error} = itemValidation(req.body);
    //if (error) return res.status(400).send(error.details[0].message);
    const {id} = req.params;
    response = await item.findByIdAndUpdate({_id:id}, {$set:{itemname: req.body.newitemName}});
    if (response) {
        res.send('item has been updated')
    } else {
        res.status(500).send('Error')
    }
   
});

//Router to delet item from list
router.delete('/itemlists/:id', async (req, res, next) => {
    const {id} = req.params;
    items = item.findByIdAndDelete(id);
    if(items.length > 0){
        const response = {
            itemList: items.map((item) =>{
                return {
                    id: item._id,
                    itemName: item.itemname,
                    date: item.date
                }
            })
        }
        res.status(200).json({response, "message": "item has been deleted"});
    } else {
        res.json({"Message": "No available item"});
    }
    
});

module.exports = router;