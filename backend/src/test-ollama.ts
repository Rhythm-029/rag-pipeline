import { generateAnswer } from "./services/ollama.service";

async function test() {
  const answer =
    await generateAnswer(
      "PullUp is a ride sharing startup founded by Krish.",
      "What is PullUp?"
    );

  console.log(answer);
}

test();