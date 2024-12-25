const axios = require("axios");
require("dotenv").config();
const Game = require("../model/game");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// Function to generate random price in INR
const randomPriceInRupees = () =>
  Math.round(Math.random() * (5000 - 500) + 500);

const fetchAndStoregame = async (req, res) => {
  try {
    const rawgApiKey = process.env.RAWG_API_KEY;
    const baseUrl = process.env.BASE_URL;
    let page = 1;
    let gameStored = 0;

    while (gameStored < 200) {
      const { data } = await axios.get(baseUrl, {
        params: {
          key: rawgApiKey,
          page,
          page_size: 40,
        },
      });

      const filteredGames = data.results.filter((game) => game.rating > 3);

      for (const game of filteredGames) {
        const gameDetails = await axios.get(`${baseUrl}/${game.id}`, {
          params: {
            key: rawgApiKey,
          },
        });

        const details = gameDetails.data;

        // Fetching screenshots
        const fetchScreenshots = async (gameId) => {
          try {
            const screenshotData = await axios.get(
              `${baseUrl}/${gameId}/screenshots`,
              {
                params: { key: rawgApiKey },
              }
            );
            if (screenshotData.data && screenshotData.data.results) {
              return screenshotData.data.results.map(
                (screenshot) => screenshot.image
              );
            } else {
              console.warn(
                `No screenshots found in response for Game ID ${gameId}`
              );
              return [];
            }
          } catch (err) {
            console.error(
              `Failed to fetch screenshots for Game ID ${gameId}:`,
              err.message
            );
            return [];
          }
        };

        // fetching the trailer
        const fetchTrailer = async (gameId) => {
          try {
            const trailerData = await axios.get(`${baseUrl}/${gameId}/movies`, {
              params: { key: rawgApiKey },
            });
            if (trailerData.data.results.length > 0) {
              return (
                trailerData.data.results[0].data.max || "No trailer available"
              );
            }
            return "No trailer available";
          } catch (err) {
            console.error(
              `Failed to fetch trailer for Game ID ${gameId}:`,
              err.message
            );
            return "No trailer available";
          }
        };

        // Fetching publisher
        const fetchPublisher = async (publishers) => {
          try {
            if (publishers.length > 0) {
              return publishers.map((publisher) => publisher.name);
            }
            return ["No publisher available"];
          } catch (err) {
            console.error(`Failed to fetch publisher for Game ID ${game.id}:`, err.message);
            return ["Error fetching publisher"];
          }
        };

        const publisher = await fetchPublisher(details.publishers || []);

        const screenshots = await fetchScreenshots(game.id);

        const trailer = await fetchTrailer(game.id);

        const existingGame = await Game.findOne({ name: details.name });

        if (!existingGame) {
          await Game.create({
            name: details.name,
            gameId: game.id,
            description: details.description_raw || "No description available",
            system_requirements: details.platforms?.reduce((acc, p) => {
              acc[p.platform.name] =
                p.requirements?.minimum || "No requirements available";
              return acc;
            }, {}),
            rating: details.rating,
            price: randomPriceInRupees(),
            publisher: publisher,
            released: details.released,
            genres: details.genres.map((genre) => genre.name),
            tags: details.tags.map((tag) => tag.name),
            screenshots: screenshots.length > 0 ? screenshots : [],

            trailer,
            poster: details.background_image,
          });
          gameStored++;
        }

        if (gameStored >= 200) break;
      }

      page++;
      await delay(500);
    }
    // console.log(`Successfully stored ${gameStored} games.`);
  } catch (err) {
    console.error("Error fetching games:", err.message);
  }
};

module.exports = { fetchAndStoregame };
