# Backend Development

## Prepare the database

### 1. Install MySQL Server locally
Check the link from [MySQL server installer](https://dev.mysql.com/downloads/mysql/).
Set your user during installation. For consistency, please add a user as `{username: appuser; password: DB_PASSWORD}`. (Check `DB_PASSWORD` in `../.env`)

### 2. Start MySQL Server
Once installed, use following command in your command window.
```bash
mysql -u appuser -p
```
MySQL would ask you to input password for this user. Input the value of `DB_PASSWORD`.

**Troubleshooting**
* If there's 'No such database' error, use the command `CREATE DATABASE habichew_db`

### 3. Initialise the database
```mysql
source database/init/init.sql
```
**Validate the initialisation**
```mysql
SHOW TABLES;
```
![You should see following output in CLI.](https://ibb.co/bj1mggy8)
Once you see this result, it means you've set the database and ready to start backend.

## Start the backend

```bash
npm install
npx nodemon app
```

The package `nodemon` allows HMR in backend.
