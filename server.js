const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process'); // Import the child_process module

const app = express();
const port = process.env.PORT || 1080;

app.use(bodyParser.json());

app.post('/predict', (req, res) => {
    const inputData = req.body; // Get input data from the frontend

    // Specify the path to your Python notebook
    const pythonNotebookPath = 'survey2_mental.ipynb';

    // Use 'exec' to run the Python script
    exec(`python3 ${pythonNotebookPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error}`);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Assuming your Python script outputs JSON data
        try {
            const prediction = JSON.parse(stdout);
            res.json({ prediction });
        } catch (e) {
            console.error(`Error parsing Python script output: ${e}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

app.listen(1080, () => {
    console.log(`Server is running on port 1080`);
});
