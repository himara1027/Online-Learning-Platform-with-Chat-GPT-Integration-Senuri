// // controllers/gptController.js
// const dotenv = require('dotenv');
// const OpenAI = require('openai');

// dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// let requestCount = 0;
// const MAX_REQUESTS = 250;

// const getCourseRecommendations = async (req, res) => {
//   if (requestCount >= MAX_REQUESTS) {
//     return res.status(429).json({ error: 'API request limit (250) reached' });
//   }

//   const { prompt } = req.body;

//   if (!prompt) {
//     return res.status(400).json({ error: 'Prompt is required' });
//   }

//   try {
//     const completion = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content:
//             'You are a helpful academic advisor. Recommend course paths based on student goals. Keep it concise and structured.',
//         },
//         { role: 'user', content: prompt },
//       ],
//       max_tokens: 300,
//       temperature: 0.7,
//     });

//     requestCount++;

//     const reply = completion.choices[0].message.content;
//     res.status(200).json({ reply, requestCount });
//   } catch (err) {
//     console.error('GPT Error:', err);
//     res.status(500).json({ error: 'GPT request failed' });
//   }
// };

// module.exports = { getCourseRecommendations };
