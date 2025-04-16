const express = require('express');
const bp = require('body-parser');
const { exec } = require('child_process'); // Import the child_process module





const app = express();
app.use(bp.json());

app.use(bp.urlencoded({extended:true}))
app.use(express.static('public'));

app.get('/', (req,res)=>{
  res.sendFile(__dirname+ '/home.html')
})

 app.post('/', (req,res)=> {
    const dataArray = [] 
  const dept = req.body.department
  const pwb = req.body.tiredness
  const gen=req.body.gender
  const grad=req.body.education
    const bh = req.body['breakfast-habit'];
  const sti = req.body['sleep-time-interval'];
  const mubs = req.body['mobile-usage-before-sleep'];
  const cs = req.body['concentration-score'];
  const cl= req.body['concentration-level'];
  const muh = req.body['mobile-usage-hours'];
  const mua = req.body['most-used-app'];
  
  const mp = req.body['major-problem'];
  const anp = req.body['anxiety-problem'];
  const as = req.body['adequate-sleep'];
  const rls = req.body['reasons-for-late-sleep'];
  const sc = req.body['single-child'];
  const sp = req.body['single-parent'];
  const sesa = req.body['self-satisfaction'];
  const anps = req.body['anxiety-problems'];

  
  

  
    dataArray.push(dept, pwb, gen, grad, bh, sti, mubs, cs, cl, muh, mua, mp, anp, as, rls, sc, sp, sesa, anps)

  console.log(dataArray)

  
  res.json(dataArray)
})

app.listen(3000,()=>{
  console.log('server is listening in the port 3000')
})

// app.post('/predict', (req, res) => {
//   const inputData = req.body; // Get input data from the frontend

//   console.log(inputData)

//   // Specify the path to your Python notebook
//   const pythonNotebookPath = 'Copy_of_mentalhealthset.ipynb';

//   // Use 'exec' to run the Python script
//   exec(`python3 ${pythonNotebookPath}`, (error, stdout, stderr) => {
//       if (error) {
//           console.error(`Error executing Python script: ${error}`);
//           return res.status(500).json({ error: 'Internal Server Error' });
//       }
//       // Assuming your Python script outputs JSON data
//       try {
//           const prediction = JSON.parse(stdout);
//           res.json({ prediction });
//       } catch (e) {
//           console.error(`Error parsing Python script output: ${e}`);
//           res.status(500).json({ error: 'Internal Server Error' });
//       }
//   });
// });

// app.get('/', (req,res)=>{
//   res.sendFile(__dirname+ '/stu.html')
// })





// app.listen(3001, ()=> {

//   console.log("server started at 1080")
// })