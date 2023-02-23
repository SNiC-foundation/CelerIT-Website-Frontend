# CelerIT-Website-Frontend
This is the frontend of the SNiC 2022: CelerIT frontend. It contains two branches:
- `main`: This is the branch that contains the version of the frontend that requires the backend.
The backend contains all information about partners, speakers and the program.
- `readonly`: This branch is decoupled from the backend. It still contains pages that require the backend, but these are only the admin pages and are hidden.
The public pages use JSON files to input data. Static files like images are also added to the frontend.

The website is built in such a way that other committees can use it as well. For possible improvement to the frontend, please look at the CelerIT evaluation document.

## Installation
1. Install NodeJS 16, e.g. via Node Version Manager.
2. Clone this repository. Place its folder next to the backend repository folder (for client generation).
3. `npm install`
4. `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deployment
Make sure the folders of the frontend and backend in `docker-compose.yml` are correct.
Also make sure the repository is correct (CelerIT used the private GEWIS Docker repository).
Then, simply use docker-compose to deploy the stack with the correct environment variables. The website will be running at `localhost:9639`.
