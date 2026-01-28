import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo", 
  temperature: 0.7,
  maxTokens: 2000,
});

export async function getEmbeddedSystemsResponse(userQuestion: string) {
  const messages = [
    new SystemMessage(
      `You are an expert Embedded Systems and IoT assistant. You provide clear, beginner-friendly explanations about STM32, Arduino, sensors, microcontrollers, communication protocols (I2C, SPI, UART), and small IoT projects. 

Give detailed code snippets in C/C++ for microcontrollers or Python for Raspberry Pi/IoT devices when relevant. 

Include:
- Step-by-step explanations
- Complete code examples with comments
- Common pitfalls and best practices
- Hardware connections when applicable

Answer the user's question thoroughly and accurately.`
    ),
    new HumanMessage(userQuestion),
  ];

  try {
    const response = await llm.invoke(messages);
    return response.content;
  } catch (error) {
    console.error("LangChain error:", error);
    throw new Error("Failed to get AI response");
  }
}