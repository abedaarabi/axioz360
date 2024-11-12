import * as webllm from "@mlc-ai/web-llm";
// Or only import what you need
import { CreateMLCEngine } from "@mlc-ai/web-llm";

// Add this interface
export interface ModelLoadingProgress {
  progress: number;

  text: string;
}

export async function startWebLLM(
  selectedModel: string,
  onProgress?: (progress: ModelLoadingProgress) => void
) {
  const initProgressCallback = (initProgress: webllm.InitProgressReport) => {
    console.log(initProgress);

    if (onProgress) {
      const progress = initProgress.progress * 100;
      onProgress({
        progress,
        text: `${initProgress.text} (${progress.toFixed(1)}%)`,
      });
    }
  };

  const engine = await CreateMLCEngine(selectedModel, { initProgressCallback });

  return engine;
}

// const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";
