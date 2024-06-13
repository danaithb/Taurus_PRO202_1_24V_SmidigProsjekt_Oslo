export const updatePointsInDatabase = async (username, newPoints) => {
  try {
    console.log(
      `Sending request to update points for ${username} with ${newPoints}`,
    );
    const response = await fetch("/api/updatePoints", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, points: newPoints }),
    });

    console.log(`Update points response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error response text: ${errorText}`);
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    console.log("Points updated successfully:", { username, newPoints });
  } catch (error) {
    console.error("Error updating points:", error);
  }
};
