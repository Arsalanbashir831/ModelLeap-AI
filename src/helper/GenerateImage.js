import { BASE_URL } from "../Constants";



export const generateImage = async (imageId, apiKey,chatId ) => {
 

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
          chatId:chatId
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.response
    
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
