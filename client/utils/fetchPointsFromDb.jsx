export const fetchPoints = async (username, setPoints, errorCallback) => {
  console.log(`Fetching points for username: ${username}`);
  try {
    const response = await fetch(`/api/get-points?username=${username}`);
    console.log(`Fetch response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error response text: ${errorText}`);
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("Fetched points data:", data);
    setPoints(data.points);
  } catch (error) {
    console.error("Error fetching points:", error);
    if (errorCallback) {
      errorCallback(error);
    }
  }
};
