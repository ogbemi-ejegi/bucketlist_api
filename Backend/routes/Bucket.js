const express = require('express');
const router = express.Router();
const {bucketValidation, jwtValidation} = require('../validation');
const { ObjectId } = require('mongoose').Types;
const Bucket = require('../models/bucket');

//Router to post a bucket
router.post('/', jwtValidation, async (req, res) => {
    const {error} = bucketValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if that bucket name is taken
    const bucketExist = await Bucket.findOne({bucketname: req.body.bucketname});
    if(bucketExist) return res.status(400).send('That bucket name already exist');

    //create bucket
    const newBucket = new Bucket({bucketname: req.body.bucketname});

    try {
        savedBucket = await newBucket.save();
        res.status(201).send({bucketId: savedBucket._id, bucketName: savedBucket.bucketname});
    } catch (error) {
        res.status(400).send(error);
    }

});
router.get('/reg', async (req, res)=>{
    const buckets = await Bucket.find();
    console.log(buckets);
    res.json(buckets);
});

router.get('/', async (req, res) => {
    try {
        const buckets = await Bucket.find();
        return res.status(200).json(buckets);
    } catch(error) {
        console.log(error);
    }
})

//Router to get all bucket
// router.get('/', async (req, res) => {
//     //Get all bucket from database
//     try {
//         const buckets = await Bucket.find();   
//         const bucketList = buckets.map((bucket) =>{
//         return {
//             id: bucket._id,
//             bucketName: bucket.bucketname,
//             date: bucket.date
//         }
//     })
//         return res.status(200).json(bucketList);
//     } catch (error) {
//         console.log(error);
//     }
// });

//Router to get a single bucket
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    if(!ObjectId.isValid(id)){
        return res.status(400).send({
            message: `The ID ${id} is not a valid bucket id`
        });
    }
    const singleBucket = await Bucket.findById(id);
    const response = {
        singleBucket: {
            id: singleBucket._id,
            bucketname: singleBucket.bucketname,
            date: singleBucket.date
        }
    }
    if(singleBucket){
        res.status(200).json(singleBucket)
    } else {
        res.status(500).json({error: 'Server error'})
    }
});

//Router to update bucket
router.patch('/update/:id', async (req, res, next) => {
    //const {error} = bucketValidation(req.body);
    //if (error) return res.status(400).send(error.details[0].message);
    const {id} = req.params;
    response = await Bucket.findByIdAndUpdate({_id:id}, {$set:{bucketname: req.body.newBucketName}});
    if (response) {
        res.send('Bucket has been updated')
    } else {
        res.status(500).send('Error')
    }
   
});

//Router to delet bucket from list
router.delete('/bucketlists/:id', async (req, res, next) => {
    const {id} = req.params;
    buckets = Bucket.findByIdAndDelete(id);
    if(buckets.length > 0){
        const response = {
            bucketList: buckets.map((bucket) =>{
                return {
                    id: bucket._id,
                    bucketName: bucket.bucketname,
                    date: bucket.date
                }
            })
        }
        res.status(200).json({response, "message": "bucket has been deleted"});
    } else {
        res.json({"Message": "No available bucket"});
    }
    
});

module.exports = router;