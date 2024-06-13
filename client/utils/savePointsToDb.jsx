export const savePointsToDatabase = async (
  username,
  points,
  choice,
  majorityChoice,
) => {
  try {
    const response = await fetch("/api/add-points", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, points, choice, majorityChoice }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to update points");
    }
    const data = await response.json();
    console.log("Points updated:", data);
  } catch (error) {
    console.error("Error updating points:", error);
  }
};
