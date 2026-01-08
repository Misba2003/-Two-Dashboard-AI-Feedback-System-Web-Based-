import dotenv from "dotenv";

dotenv.config();

/**
 * Analyzes a review using LLM (OpenAI) or returns mocked response
 * @param {string} review - The review text
 * @param {number} rating - The rating (1-5)
 * @returns {Promise<Object>} JSON object with user_response, summary, action
 */
export async function analyzeReview(review, rating) {
  const apiKey = process.env.OPENAI_API_KEY;

  // If no API key, return safe mocked response
  if (!apiKey) {
    return {
      user_response: review,
      summary: `Review with rating ${rating}: ${review.substring(0, 100)}${review.length > 100 ? '...' : ''}`,
      action: rating >= 4 ? "positive" : rating <= 2 ? "negative" : "neutral"
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a review analyzer. Return ONLY valid JSON with: user_response (string), summary (string), action (string: positive/negative/neutral). No markdown, no code blocks, just JSON."
          },
          {
            role: "user",
            content: `Analyze this review (rating: ${rating}/5): "${review}"`
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content?.trim();

    if (!content) {
      throw new Error("No response from LLM");
    }

    // Parse JSON response (remove markdown code blocks if present)
    let jsonStr = content;
    if (content.startsWith("```")) {
      jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    }

    const result = JSON.parse(jsonStr);

    // Ensure required fields exist
    return {
      user_response: result.user_response || review,
      summary: result.summary || "",
      action: result.action || "neutral"
    };

  } catch (error) {
    console.error("LLM analysis error:", error.message);
    // Return safe fallback on LLM failure
    return {
      user_response: review,
      summary: `Review analysis failed: ${error.message}`,
      action: "neutral"
    };
  }
}

