const _ = require('lodash')
const db = require('./mongodb')
const dbOperation = async (body) => {
    const collection = await getCollection('Student');
    const operation = _.get(body, 'operation')
    const filter = _.get(body, 'filter')
    const data = _.get(body, 'data')
    try {
        if (operation === 'update') {
            const result = await collection.updateMany(
                filter, { $set: data })
            return result;
        }

        else if (operation === 'insert') {
            const result = await collection.insertOne(data);
            return result;
        }
        else if (operation === 'delete') {
            const result = await collection.deleteMany(filter);
            return result;
        }
        else if (operation === 'find') {
            const result = await collection.findOne(filter);
            return result;
        }
    } catch (error) {
        console.log(error);
    } finally {
        console.log(`${operation} operation executed successfully.`)
    }
    return {
        data: 'Unable to understand your question'
    }
}

const getCollection = async (collectionName) => {
    try {
        const client = await db.getMongoClient;
        const mydb = client.db('OpenAI');
        const collection = mydb.collection(collectionName);
        return collection;
    } catch (err) {
        console.error('Error getting collection', collectionName);
        console.error('Error message:', err.message);
    }
}

module.exports = {
    dbOperation,
}