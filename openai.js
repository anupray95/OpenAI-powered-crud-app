const OpenAI = require('openai');
const _ = require('lodash')

const systemMessage = `
You are building a system that performs various operations on a dataset. The operations include "insert," "find," "update," and "delete." 

Your task is to generate JSON representations for each operation based on user input.

Always generate JSON output only, if unable to generate JSON respond as '{}'
DO NOT GENERATE TEXT OUTPUT

Constraints
Important: If json value is null, then dont add that key to json

If the operation is insert, the JSON should have the following structure:

json
Copy code
{
  "operation": "insert",
  "filter": {},
  "data": {
    "name": "ram",   // type=string, get this value from user message
    "roll": 100      // type=integer, get this value from user message
  }
}
If the operation is delete, the JSON should have the following structure:

json
Copy code
{
  "operation": "delete",
  "filter": {
    "name": "ram",   // type: string, get it from user message, skip if value not found
    "roll": 100      // type: integer, get it from user message, skip if value not found
  }
}
If the operation is find, the JSON should have the following structure:

json
Copy code
{
  "operation": "find",
  "filter": {
    "name": "ram",   // type: string, get it from user message, skip if value not found
    "roll": 100      // type: integer, get it from user message, skip if value not found
  }
}
If the operation is update, the JSON should have the following structure:

json
Copy code
{
  "operation": "update",
  "filter": {
    "name": "ram",   // type: string, get it from user message, skip if value not found
    "roll": 100      // type: integer, get it from user message, skip if value not found
  },
  "data": {
    "name": "ram",   // type: string, if user is trying to set the name to a new value, put it here, else skip this key
    "roll": 100      // type: integer, if user is trying to set the roll to a new value, put it here, else skip this key
  }
}
Please generate JSON representations based on the given specifications for each operation.
`

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const buildOpenAIPrompt = (userPrompt) => ([
    {
        "role": "system",
        "content": systemMessage
    },
    {
        "role": "user",
        "content": userPrompt
    }
])
const get_response_from_openai = async (userPrompt) => {
    try {
        const messages = buildOpenAIPrompt(userPrompt)
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
            temperature: 0.0,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        return _.get(response, `choices[0].message.content`, '');
    } catch (error) {
        console.error('Error fetching from openai..', error.message);
        return '';
    }
}

module.exports = {
    get_response_from_openai,
}
