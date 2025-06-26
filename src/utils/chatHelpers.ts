// Space-themed responses for the chatbot
const spaceResponses = [
  "Did you know that a day on Venus is longer than a year on Venus? Venus rotates so slowly that it takes 243 Earth days to complete one rotation, but it only takes 225 Earth days to orbit the Sun!",
  "The Great Red Spot on Jupiter is a giant storm that has been raging for at least 400 years. It's so large that about three Earths could fit inside it!",
  "There's a hexagonal-shaped cloud pattern at Saturn's north pole. This unique weather pattern has edges longer than the diameter of Earth!",
  "The Sun makes up 99.86% of the mass in our solar system. In fact, it takes up so much mass that you could fit 1.3 million Earths inside it!",
  "The closest known black hole to Earth is about 1,600 light-years away in the constellation Ophiuchus. Don't worry though, it's not close enough to pose any danger to us!",
];

// A list of basic questions the bot can respond to directly
const knownQuestions = {
  "what is a black hole": "A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it. The boundary of no escape is called the event horizon.",
  "how old is the universe": "The universe is approximately 13.8 billion years old, according to current scientific understanding based on observations of cosmic microwave background radiation and other evidence from the Big Bang theory.",
  "what is a light year": "A light-year is the distance light travels in one Earth year, which is approximately 9.46 trillion kilometers (5.88 trillion miles). It's used as a unit of measurement for the vast distances in space.",
  "how many planets are in the solar system": "There are eight officially recognized planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Pluto was reclassified as a 'dwarf planet' in 2006.",
  "what is a nebula": "A nebula is a giant cloud of dust and gas in space. Some nebulae come from the gas and dust thrown out by the explosion of a dying star. Other nebulae are regions where new stars are beginning to form.",
};

// API configuration
const API_BASE_URL = import.meta.env.PROD
  ? "https://astrobot-backend-fo7j.onrender.com"
  : "http://localhost:5000";

// Function to generate a bot response by calling the backend API
export const generateBotResponse = async (userMessage: string): Promise<string> => {
  // First check if we have a predefined response
  const lowerCaseMessage = userMessage.toLowerCase().trim();
  
  // Check space facts
  if (lowerCaseMessage.includes('fact') || lowerCaseMessage.includes('random')) {
    return spaceResponses[Math.floor(Math.random() * spaceResponses.length)];
  }
  
  // Check known questions
  if (knownQuestions.hasOwnProperty(lowerCaseMessage)) {
    return knownQuestions[lowerCaseMessage as keyof typeof knownQuestions];
  }

  // If no predefined response, call the backend API
  try {
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: userMessage }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle both array and string responses
    if (Array.isArray(data.response)) {
      return data.response.join(' ');
    }
    return data.response || "I couldn't find an answer to that. Try asking about space facts!";
    
  } catch (error) {
    console.error('API call failed:', error);
    return "Sorry, I'm having trouble connecting to the space knowledge base. Here's a fun fact instead: " + 
           spaceResponses[Math.floor(Math.random() * spaceResponses.length)];
  }
};
