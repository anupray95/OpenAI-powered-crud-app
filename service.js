const _ = require('lodash')
const {get_response_from_openai} = require('./openai')
const {dbOperation}=require('./db/crud')


const get_response = async(message) => {
    const response_opeani = await get_response_from_openai(message)
    const json = JSON.parse(response_opeani)
    return await dbOperation(json);
}

module.exports = {
    get_response,
}