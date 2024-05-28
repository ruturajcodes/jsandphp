import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from './key.js';

const { Client } = Appwrite;

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6618c876123f97f0026b');

// require('dotenv').config();

// const API_KEY = process.env.my_API_KEY;

// Access your API key (see "Set up your API key" above)

const hobbyInput = document.getElementById("my-hobby")
const genAI = new GoogleGenerativeAI(API_KEY);



async function run(hobby) {
  
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});

  
  const prompt = `You are an interviewer for a candidate who has qualified the UPSC Mains 
  exam (Civil Services Exam in India), generate questions based on following guidelines, alongwith
  approaches to handle the questions and the apt answer from the point of view of the candidate. 
  The questions should not only remain restricted to the Civil Services point of view but also 
  extend to spark the candidate to think in an abstract and logical construct resulting into a 
  scope for brainstorming and testing his/her aptitude. Include questions based on outcomes/results
  of having a hobby of : ${hobby} that is given as input. Also include questions like some
  negative questions about the hobby : "${hobby}" so as to check how does the candidate tackle
  an uneasy situation. For this, generate 10 questions, respective approaches, and respective apt 
  answers, considering the fed input and given style instructions with equal weightage to all the 
  aspects of the style instructions, keep questions restricted to the given input i.e. "${hobby}". 
  Give the output in json format dictionary with keys (question, approach, apt_answer) and their respective 
  values. Don't delimit the output by \`\`\`json or any white-space, keep it as seen in json, 
  comply with the following example format strictly
  for example: 
  [ 
    {
    "question": "How do you think your hobby of playing cricket has shaped your leadership qualities?",
    "approach": "Emphasize the teamwork, communication, and decision-making skills developed through cricket, and how these translate to effective leadership in administrative roles.",
    "apt_answer": "Playing cricket has fostered my ability to work harmoniously within a team, effectively communicate my ideas, and make prompt decisions under pressure. These skills are invaluable in the civil service, where collaboration and leadership are essential."
    },
    {
    // ... other question-answer objects here ...
    } 
  ]
  
  `
  // console.log(hobby);
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  // console.log(text);
  // console.log(typeof(text));
  const jsonData = JSON.parse(text);
  // const jsonData = text;
  // console.log(jsonData);

  const q_hobby_arr = []
  const app_hobby_arr = []
  const ans_hobby_arr = []

  
  // console.log("Hobby: ");
  for (let i = 0; i < jsonData.length; i++) {
    
    q_hobby_arr[i] = jsonData[i].question 
    app_hobby_arr[i] = jsonData[i].approach 
    ans_hobby_arr[i] = jsonData[i].apt_answer 
    // console.log(jsonData[i].question);
    console.log(`Question: ${i+1}`);
    console.log(q_hobby_arr[i]);  
    console.log(`Answer: ${i+1}`);
    console.log(ans_hobby_arr[i]);
    console.log(`Approach:`);
    console.log(app_hobby_arr[i]);

    console.log("\n");

  }

  // for (const question of jsonData) {
  //   console.log(question.question);
  //   console.log(question.approach);
  //   console.log(question.apt_answer);
  //   console.log("-------"); // Optional separator between questions

  // const thirdQuestion = jsonData[2].question;
  // const thirdAnswer = jsonData[2].apt_answer;

  // console.log("Third Question:", thirdQuestion);
  // console.log("Third Answer:", thirdAnswer);
  

//   const cleanText = text.trim().replace(/```/g, '');
//   const jsonData = JSON.parse(cleanText); // Parse the text into a JavaScript object
 
//   const firstQuestion = jsonData.question;
//   const firstApproach = jsonData.approach;
//   const firstAnswer = jsonData.apt_answer;

//   console.log(firstQuestion);
//   console.log(firstApproach);
//   console.log(firstAnswer);


}

const btn = document.getElementById("hob-btn")
btn.addEventListener("click", () => {
  const hobby = hobbyInput.value
  run(hobby)
})




// run();