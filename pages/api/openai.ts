// pages/api/openai.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAI } from "openai";

async function listEngines() {
  // console.log("API Key:", process.env.OPENAI_API_KEY);
  // console.log("Organization:", process.env.OPENAI_ORGANIZATION);

  const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAI(configuration);

  try {
    const response = await openai.listEngines();
    return response;
  } catch (error) {
    console.error("Error in listEngines:", error);
    throw error;
  }
}

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const engines = await listEngines();
//     res.status(200).json(engines);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const configuration = Configuration({
  //   organization: process.env.OPENAI_ORGANIZATION,
  //   apiKey: process.env.OPENAI_API_KEY,
  // });

  const openai = new OpenAI({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (req.method === "POST") {
    // Handle POST request
    const { prompt } = req.body;
    // ...process the prompt and perform actions
    // console.log("Prompt:", prompt);

    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
    });
    // console.log("Completion:", completion.choices[0].text);

    res.status(200).json({ completion: completion.choices[0].text });
  } else {
    // Handle other types of requests or return an error
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
