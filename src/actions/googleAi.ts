'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');

export async function generateContentAi(prompt: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  const cleanResponse = text.trim().replace(/^```json|```$/g, '');
  const parsedResponse = JSON.parse(cleanResponse);

  return parsedResponse;
}
