# Watchlists Application

This README provides instructions on how to set up and run the watchlist application, a React+Vite project where you can search for movie names and save to watchlists. Multiple users can login on the same machine and if they save the watchlist then they can see their watchlist as it is saved in the localStorage in you browser.

## Prerequisites

- Node.js (version 18 or higher)
- npm (version 10 or higher)

## Installation

1. Clone the repository to your local machine:

``` 
https://github.com/bishalkar10/watchlists.git
```

2. Navigate to the project directory:
```
cd watchlists
```

3. Install the project dependencies:
```
npm install
```
4. Running the Application

To start the development server and run the application, execute the following command in the project directory:
```
npm run dev
```

This command will start the Vite development server, and the application will be accessible in your web browser at `http://localhost:5173`

## Troubleshooting

If you encounter any issues while starting the development server, such as errors related to `node_modules`, you can try the following steps to resolve the issue:


1. Delete the `node_modules` directory:

For Linux/Mac Users
```
rm -rf node_modules
``` 
For Windows Users
```
rmdir /s /q node_modules
```
2. Reinstall the project dependencies:
```
npm install
```
3. Try starting the development server again:
```
npm run dev
```
