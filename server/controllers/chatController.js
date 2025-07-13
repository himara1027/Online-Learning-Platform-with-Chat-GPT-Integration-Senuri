// // server/controllers/chatController.js
// const openai = require('../config/openaiConfig');

// const getCourseRecommendations = async (req, res) => {
//   const { prompt } = req.body;
//   if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

//   try {
//     const chatResponse = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: 'You are a helpful assistant that recommends courses.' },
//         { role: 'user', content: prompt }
//       ],
//       max_tokens: 250,
//     });

//     res.json({ recommendation: chatResponse.choices[0].message.content });
//   } catch (err) {
//     console.error('OpenAI Error:', err);
//     res.status(500).json({ error: 'Failed to get recommendation' });
//   }
// };

// module.exports = { getCourseRecommendations };
