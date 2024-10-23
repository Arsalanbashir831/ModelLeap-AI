import { BASE_URL } from "../Constants";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateImage = async (imageId, apiKey, delayTime = 1000) => {
  const fetchImage = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/bot/get_images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          request_id: imageId.toString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          return data.output[0]; 
        } else {
          await delay(delayTime); 
          return fetchImage(); 
        }
      } else {
        throw new Error('Failed to fetch image generation status.');
      }
    } catch (error) {
      console.error("Error during image generation:", error);
      throw error; 
    }
  };

  return fetchImage();
};
