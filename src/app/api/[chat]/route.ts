import axios from 'axios';

export async function POST(req: Request) {
  console.log('API Route Invoked');

  const { prompt } = await req.json();
  console.log('Received Prompt:', prompt);

  if (!prompt) {
    console.log('No Prompt Provided');
    return new Response('No Prompt Provided', { status: 400 });
  }

  const AZURE_API_KEY = process.env.AZURE_OPENAI_API_KEY;
  const AZURE_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
  const AZURE_DEPLOYMENT_NAME = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

  try {
    const apiURL = `${AZURE_ENDPOINT}openai/deployments/${AZURE_DEPLOYMENT_NAME}/chat/completions?api-version=2024-06-01`;
    console.log('Azure OpenAI API URL:', apiURL);

    const response = await axios.post(
      apiURL,
      {
        messages: [
          { role: 'system', content: 'You are now role-playing as Nikola Tesla. You should always respond as Nikola Tesla would. Your response should be short and precise' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 150,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_API_KEY,
        },
      }
    );

    console.log('Azure OpenAI Response:', response.data);

    const assistantMessage = response.data.choices[0].message.content.trim();
    console.log('Assistant Message:', assistantMessage);
    return new Response(JSON.stringify({ assistantMessage }), { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}