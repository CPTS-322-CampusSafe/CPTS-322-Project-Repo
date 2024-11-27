# The Backend for CampusSafe

Needed tools: Python

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

Also, to build/rebuild a Docker image run `docker build -t campus-safe .` in the `backend` directory.

## Enabling Email Notifications

For debugging purposes a console backend can be used for email notifications (printing to the console instead of actually sending emails): To
enable this set `FAKE_NOTIFICATIONS` to `True` in `campussafe/campussafe/settings.py`.

Otherwise for real email notifications set `FAKE_NOTIFICATIONS` to `False` and create an `.env` file in the `campussafe/campussafe` directory containing values
for `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD`.

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
