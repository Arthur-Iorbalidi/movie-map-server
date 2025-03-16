# Movie-Map-server

## 
1. Install Node.js, PostgreSQL
2. Fork this repository
3. Clone your newly created repo
4. Go to the project folder
5. install the dependencies with `npm i`
6. Create .env file with the following content
```
PORT=5000
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_DB=movie-map-db
POSTGRESS_PASSWORD=yourpassword
POSTGRESS_PORT=5432
PRIVATE_KEY=rT9u$K8f*sP!aJ2qLk3VzN5xWuB
```
Change some settings if needed

7. Create a database and restore it from a dump. Dumps in several formats are located in the "database-dumps" folder
8. start the local server using `npm run start`