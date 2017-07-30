const { MongoClient, ObjectID } = require('mongodb');
const connetionString = "mongodb://localhost:27017/items-db";

/*
    show dbs;
    show collections;

    db.tableName.find();
    db.tableName.find(name: "");
    db.tableName.find(name: { $regex: "--.*"});
    db.tableName.insert({});
    db.tableName.remove({}); -> remove all

    Ctrol+/
    Ctrl+K Ctrl+C
    Ctrl+K Ctrl+U
*/

const genId = (idString) => {
    return new ObjectID(idString);
};

MongoClient.connect(connetionString)
    .then(async (db) => {
        const collection = db.collection("items");

        let page = 1;
        let size = 15;
        const skip = (page - 1) * size;
        const limit = size;
        
        // await collection.insert({
        //     name: "George"
        // });
        // const test = await collection.findOne({
        //     name: {
        //         $regex: "Test.*"
        //     }
        // });
        // console.log(test);

        const id = "597c90c751f64e6294a0adac";
        const filter = {
            _id: new ObjectID(id)
        };
        const test = await collection.findOne(filter);
        await collection.updateOne({
            _id: test._id
        }, test);
        // console.log(test);

        const todoCollection = db.collection("todos");
        const todos = Array.from({ length: 15})
            .map((_, index) => {
                return {
                    text: "Todo #" + index,
                    isDone: !!(index % 2)
                };
            });
        await todoCollection.insertMany(todos);
        // await todoCollection.deleteOne({

        // });
        // await todoCollection.deleteMany({

        // });
        const updateFilter = {};
        await todoCollection.updateOne(updateFilter);

        const currentFilter = {
            $and: [{
                isDone: true
            }, {
                text: {$regex: ".*1.*"}
            }]
        };
        return await todoCollection.find(currentFilter)
            .toArray();
    })
    .then((items) => {
        console.log(items);
    });