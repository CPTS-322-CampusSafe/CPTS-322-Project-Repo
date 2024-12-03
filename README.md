# CampusSafe

A cross-platform mobile application that provides features for notifying college students about various emergencies.

# Build and Run

Needed tools: npm, npx, and Python

## Frontend

Run these commands:

1. `cd frontend/CampusSafe`
2. `npm install`, to install the necessary dependencies
3. `npx expo start`
   - Note: may be a different command for MacOS or Linux
4. Install Expo Go on device
   - XCode will need to be install on your development device to build for iOS
5. Scan QR code with Expo Go app

Additional Commands:

1. Run `npx expo lint` to run the linter (ESLint and Prettier) to find issues in the project
   - May want to install the Prettier and/or ESLint VSCode extentions for a better development experience

## Backend

Run these commands:

1. `python -m venv env`
2. To activate the virtual environment run:
   - Windows cmd: `env/Scripts/activate.bat`
   - Windows PowerShell: `env/Scripts/Activate.ps1`
   - Linux or macOS: `soruce env/bin/activate`
3. `pip install -r requirements.txt`
4. `cd campussafe`
5. `python manage.py runserver`
6. The server should now be running on `http://127.0.0.1:8000/` (or `http://localhost:8000/`)
7. Migrations will need to be run to create the database with: `python manage.py migrate`

Additionally, run `pip freeze > requirements.txt` in the `backend` folder to add any newly installed libaries (via pip) to the requirements file.

[See more information about the backend.](backend/README.md)

## Running the Frontend with the Backend

Here are some additional notes for running the front end and back end together:

1. The `baseAPI_URL` constant in `authentication_system.ts` may need to be changed depending on what device you are running on:

   - If running a local development server:
     - Change to: "http://10.0.2.2:8000" if running frontend on an Android emulator
     - Change to your private IP address if running frontend on a physical device
   - If running on a production server:
     - Change to the domain of the server (https://www.example.com)

2. The backend server can be run as a Docker container by using the following commands:

   - `docker run -p 8000:8000 -d josephbuchholz/campus-safe`
   - Run `docker logs --follow <container_id>` to view the logs
   - Run `docker stop <container_id>` to stop the server

## Testing

Run `npm test` to run all front end test cases.
