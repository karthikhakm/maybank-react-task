# Google Places Autocomplete App

This is a React-based application that demonstrates the use of Google Places API to implement location search functionality with autocomplete. The application allows users to search for locations, view search results, and see the locations displayed on a Google Map.

## Features

- **Google Places Autocomplete**: Uses Google Places API to search for places as the user types.
- **Map Integration**: Displays selected places on a Google Map using markers.
- **Search History**: Saves and displays the search history of locations. Clicking on a history item will set it as the selected place on the map.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: For state management to store search results, selected places, and handle async logic (fetching places).
- **Redux Thunk**: Middleware for handling asynchronous actions in Redux, used to fetch places data from the Google Maps API.
- **React Bootstrap**: For styling and responsive design components.
- **Google Maps API**: For integrating Google Maps and Places Autocomplete functionality.

## Prerequisites

Before running the project locally, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)