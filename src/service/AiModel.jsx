

import {GoogleGenerativeAI} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "Generate Travel Plan for {location}, for {totalDays} for {traveler} with a {budget} ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {noOfDays} days with each day plan with best time to visit in JSON format\n\n\n",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const chatSession = model.startChat({
    generationConfig,

    history: [
      {
        role: "user",
        parts: [
          {text: "Generate Travel Plan for Location: Las Vegas, for 3 for couples with a cheap {budget} in inr,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image URL, geo coordinates, rating, descriptions, and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the Place location for 3 days with each day plan with best time to visit in JSON format\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"location\": \"Las Vegas\",\n  \"travelers\": \"Couple\",\n  \"budget\": \"Cheap\",\n  \"totalDays\": 3,\n  \"hotels\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50 - $100 per night\",\n      \"hotelImageURL\": \"https://www.theD.com/images/hero-images/hero-main.jpg\",\n      \"geoCoordinates\": \"36.1699° N, 115.1423° W\",\n      \"rating\": 4.0,\n      \"description\": \"A retro-themed hotel with a central location on Fremont Street, known for its vibrant nightlife and casinos.\"\n    },\n    {\n      \"hotelName\": \"Golden Nugget Las Vegas\",\n      \"hotelAddress\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$70 - $150 per night\",\n      \"hotelImageURL\": \"https://www.goldennugget.com/las-vegas/images/hero-carousel-images/hero-carousel-01.jpg\",\n      \"geoCoordinates\": \"36.1696° N, 115.1413° W\",\n      \"rating\": 4.5,\n      \"description\": \"A luxurious hotel with a stunning shark tank and a vibrant casino, located on Fremont Street.\"\n    },\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$40 - $80 per night\",\n      \"hotelImageURL\": \"https://www.circuscircus.com/media/images/circus-circus-hero.jpg\",\n      \"geoCoordinates\": \"36.1022° N, 115.1735° W\",\n      \"rating\": 3.5,\n      \"description\": \"A family-friendly hotel with a carnival atmosphere, featuring a circus theme, thrilling rides, and affordable accommodations.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"A pedestrian mall with a canopy of lights, live entertainment, and street performers.\",\n          \"placeImageURL\": \"https://www.fremontstreetexperience.com/media/1505/fremont-street-experience-live-music-stage-1.jpg\",\n          \"geoCoordinates\": \"36.1699° N, 115.1423° W\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"bestTime\": \"Evening (for the light show and entertainment)\"\n        },\n        {\n          \"placeName\": \"The Neon Museum\",\n          \"placeDetails\": \"A museum showcasing historic neon signs from Las Vegas' past.\",\n          \"placeImageURL\": \"https://www.neonmuseum.org/sites/default/files/styles/banner_image/public/images/2018/08/neon-museum-las-vegas-neon-sign-museum-sign-museum-night-sign-neon-lights-neon-sign-art-1575x750.jpg?itok=5_n-L9_M\",\n          \"geoCoordinates\": \"36.1702° N, 115.1369° W\",\n          \"ticketPricing\": \"$20\",\n          \"rating\": 4.0,\n          \"bestTime\": \"Afternoon\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"plan\": [\n        {\n          \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n          \"placeDetails\": \"A free, stunning display of floral arrangements and sculptures, changing seasonally.\",\n          \"placeImageURL\": \"https://www.bellagio.com/content/dam/mgmresorts/bellagio/images/bellagio-conservatory/bellagio-conservatory-seasonal-floral-displays-fall-2018-900x500.jpg\",\n          \"geoCoordinates\": \"36.1120° N, 115.1748° W\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"bestTime\": \"Any time of day\"\n        },\n        {\n          \"placeName\": \"The High Roller Observation Wheel\",\n          \"placeDetails\": \"A giant observation wheel offering panoramic views of the Las Vegas Strip.\",\n          \"placeImageURL\": \"https://www.caesars.com/content/dam/caesars/linq/images/attractions/high-roller-observation-wheel-hero-mobile.jpg\",\n          \"geoCoordinates\": \"36.1112° N, 115.1728° W\",\n          \"ticketPricing\": \"$30\",\n          \"rating\": 4.0,\n          \"bestTime\": \"Evening (for the city lights)\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"plan\": [\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"A scenic area with stunning red rock formations, hiking trails, and rock climbing opportunities.\",\n          \"placeImageURL\": \"https://www.nps.gov/redr/planyourvisit/images/Red-Rock-Canyon-DSC_1754_2.jpg\",\n          \"geoCoordinates\": \"36.1852° N, 115.2631° W\",\n          \"ticketPricing\": \"$7 per vehicle\",\n          \"rating\": 4.5,\n          \"bestTime\": \"Morning or afternoon (to avoid the heat)\"\n        },\n        {\n          \"placeName\": \"Hoover Dam\",\n          \"placeDetails\": \"A historic dam located on the Colorado River, offering tours and scenic views.\",\n          \"placeImageURL\": \"https://www.nps.gov/hove/learn/photosmultimedia/media/IMG_0587.jpg\",\n          \"geoCoordinates\": \"36.0059° N, 114.9930° W\",\n          \"ticketPricing\": \"Free to visit, tours available\",\n          \"rating\": 4.0,\n          \"bestTime\": \"Morning or afternoon\"\n        }\n      ]\n    }\n  ]\n}\n```"},
        ],
      },
    ],
  });

