# React + Vite

The purpose of this project is to develop a weather app, key components are API's in React, state management as well as asynchronous methods.

This is what what research has given me, for a beginner i need to use lucide-react for icons, axios for fetching data, and react-select-async-paginate for location searching.

By combining these modules with Open-Meteo, a 100% free weather API that requires no API keys or registration, i avoid complexity- that is often frowned upon in programming

Improvement upon this program would be to include splash, and login, this will be on the next iteration of this project

1. install packages/modules required for this project

- npm install axios lucide-react react-select-async-paginate
- this means we are installing them all at once, but i deferred to install one by one, i am still new to commands and would like to practice: this then goes, npm install axios, npm install lucide-react, npm install react-select-async-paginate

2. the folder structure artifact

- weather-project
  ├── .gitignore # Excludes node_modules, build artifacts, and local environments
  ├── index.html # Single Page Application entry point template
  ├── package.json # Manifest tracking scripts and dependencies (axios, lucide-react)
  ├── vite.config.js # Compilation configuration for Vite engine
  └── src/
  ├── main.jsx # React DOM bootstrapping script
  ├── App.jsx # Core application layer managing shared state pipelines
  ├── App.css # Structural layout overrides
  ├── index.css # Global base styles and variables
  ├── assets/
  │ └── icons.svg # Vector graphic sprites matrix
  ├── components/
  │ ├── WeatherDisplay.jsx # View component presenting thermodynamic data output
  │ └── SearchInput.jsx # Wrapped AsyncPaginate input handling location queries
  └── services/
  └── weatherService.js # Detached async data pipeline handling API queries via axios

3. simplicity

- to ensure we do not create a long code we need to create services, on our project we have weather service
  we also need to have components(weatherDisplay, searchInput) so our code is not long, we also need seperation so we have presentation layer as well as application layer and logic.

4. Final outcome

- we need to learn separation as well as why it is necessary then how they all come together in the final product.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
