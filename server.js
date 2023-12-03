// grab the main Express module from package installed
const express = require("express");
const path = require('path')
const bodyParser = require('body-parser');

// load dotenv module
const { config } = require("dotenv");
// load openai module
const OpenAI = require("openai");

// Load environment variables
config();

// create the app variable and call the Express function
const app = express()

// middleware
app.use(express.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// instantiate openai instance
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
})

// establish which port you’d like to use
const port = process.env.PORT || 3000;

app.get('/ask', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
})

app.post('/ask', async (req, res) => {
    const { prompt } = req.body;
    console.log('Line 35: ', req.body.prompt)
    try {
        if(prompt === null){
            throw new Error("Uh oh, no prompt was provided");
        }
        // make the api call
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: prompt,
        });
        console.log(response)
        const completion = response.choices[0].text;
        // console.log(completion)
        return res.json({data: completion})

    } catch (error) {
        console.log(error.message);
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
})