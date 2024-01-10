# bus-ticketing-system
Efficient Node.js server for bus ticket management with RESTful APIs and PostgreSQL integration. Real-time updates and admin functionalities. 🚌🎫 #TicketingSystem #NodeJS

### Setting up

1. Download and install Node.js
   - Ideally using `fnm` so you can switch Node versions as required in the future
2. Download and install PostgreSQL
   1. Set the root `postgres` user's password to something you can remember, (you'll need it again later on)
   2. Test that PostgreSQL is running on your machine by entering `psql -U postgres` and then entering your password when prompted
   3. Create a ticketing database with the following statement `CREATE DATABASE ticketing;`
   4. If all went well and the database was created, exit psql shell.
3. Clone the project to your local machine
4. Open the terminal in VSCode and at the root of the project run `npm install`
5. Now we can bootstrap the database
   1. open the `database.sql` at the root of the project
   2. Run each sql for `ticketing` database. That will create each table
   3. Now, create `.env` file at the project.
   4. Copy containt present in `.env.example` file into `.env'.
   5. Update `DB_HOST`, `DB_PASSWORD` and `DB_DATABASE` as per your database configuration.
6. Now, run `npm run start` to start the application.
