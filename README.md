```markdown:README.md
# My Gaming Deals App 🎮

Welcome to My Gaming Deals App, a project designed to help gamers find the best deals on PC games across multiple stores, including Steam, GreenManGaming, Fanatical, and many others. This app is built using the power of the [CheapShark API](https://www.cheapshark.com), a comprehensive price comparison service for digital PC games.

## Features

- **💲 Deals**: Fetch and display game deals from Steam. Each deal includes price, savings, and other metadata for games available on Steam. Deals are fetched from the following endpoint:
  ```
  https://www.cheapshark.com/api/1.0/deals?storeID=1
  ```

## Technologies Used

- **Frontend**: React (v18.2.0), TypeScript (v5.2.2), Vite (v5.2.0)
- **Styling**: CSS
- **API**: CheapShark API for fetching game deals

## Dependencies

To ensure the app runs smoothly, the following dependencies are included in the project:

- `axios` for making HTTP requests
- `react` and `react-dom` for building the user interface
- `react-range` for creating range sliders for filters
- Development dependencies like `@typescript-eslint/eslint-plugin`, `@vitejs/plugin-react`, and `eslint` for code quality and development experience

Refer to `package.json` for the complete list of dependencies and their versions.

## Project Status

This app is currently a **Work In Progress (WIP)**. Future plans include utilizing more endpoints from the CheapShark API to enhance the app's functionality and provide users with more options to find the best game deals.

## Acknowledgments

- [CheapShark API](https://www.cheapshark.com) for providing the game deals data.

Stay tuned for more updates and features! 🚀
