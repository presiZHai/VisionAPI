import * as dotenv from "dotenv";
import { OpenAI } from "openai";
import fs from "fs";


dotenv.config();
const openai = new OpenAI();

const base64Image = fs.readFileSync("images/menu.png", {
    encoding: "base64",
});

const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        {
            role: "system",
            content: [
                {
                    type: "text",
                    text: "Return a JSON structure based on the requirement of the user. Only return the JSON structure, nothing else. Do not return ```json",
                }
            ]
        },
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: "Create a JSON structure for all items on the menu. Return only the JSON structure",
                },
                {
                    type: "image_url",
                    image_url:  {
                        url: `data:image/png;base64,${base64Image}`,
                    }                           //process.env.IMAGE_URL
                }
            ]
        }
    ]
});

const jsonOutput = response.choices[0].message.content;

// Save the JSON output to a file
fs.writeFileSync("output.json", jsonOutput);

console.log("JSON output saved to output.json");