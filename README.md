## My Gaming Deals App 🎮

Welcome to My Gaming Deals App, a project designed to help gamers find the best deals on PC games across multiple stores, including Steam, GreenManGaming, Fanatical, and many others. This app is built using the power of the [CheapShark API](https://www.cheapshark.com), a comprehensive price comparison service for digital PC games.

## Features

- **💲 Deals**: Fetch and display game deals from Steam. Each deal includes price, savings, and other metadata for games available on Steam. Deals are fetched from the following endpoint:
  https://www.cheapshark.com/api/1.0/deals?storeID=1

## Technologies Used 💻

- **Frontend**: React (v18.2.0), TypeScript (v5.2.2), Vite (v5.2.0)
- **Styling**: CSS
- **API**: CheapShark API for fetching game deals

## Dependencies 📦

- `axios`: For making HTTP requests.
- `react` & `react-dom`: For building the user interface.
- `react-range`: For creating range sliders for filters.
- Development dependencies include `@typescript-eslint/eslint-plugin`, `@vitejs/plugin-react`, and `eslint`.

## Project Status 🚧

This app is a **Work In Progress (WIP)**. Future plans include utilizing more endpoints from the CheapShark API to enhance the app's functionality and provide users with more options to find the best game deals.

## Acknowledgments 👏

Special thanks to the [CheapShark API](https://www.cheapshark.com) for providing the game deals data.

Stay tuned for more updates and features! 🚀

## Live Demo 🚀

Check out the live demo of My Gaming Deals App here: [My Gaming Deals App Live Demo](https://my-gaming-deals-app-cmu7.vercel.app)