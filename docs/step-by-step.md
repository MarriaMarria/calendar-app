# Calendar app with node.js and SQL server

  - [Development of the project:](#development-of-the-project)
    - [We will use docker for SQL Server](#we-will-use-docker-for-sql-server)
    - [Create database](#create-database)
    - [Create node project](#create-node-project)
    - [Download framework hapi](#download-framework-hapi)
    - [Download some useful Packages](#download-some-useful-packages)
    - [Create node project](#create-node-project)
    - 
## Development of the project:

#### We will use docker for SQL Server:

```
docker pull microsoft/mssql-server-linux:2017-latest
```
```
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Password.1234567890' -e 'MSSQL_PID=Express' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2017-latest-ubuntu
```

    -d - detached, on the background
    --name - we specify a name
    -e - we specify env vavs
    -p - we specify ports
    and we tell which image to use
    ACCEPT_EULA - accept Microsoft terms of service
    MSSQL_PID - can be express, developer etc.
    SA_PASSWORD - God's password, be careful with it and never use it like here in open 

#### Create database

Go to Azure Data Studio. Connect to the DB (server: localhost, password the same as we set while pulling the image).
Open new query and type: 

```
CREATE DATABASE calendar;
GO
```
This will create a new DB named calendar. 
Change to it. Then we create our table and insert a couple of rows to work with.

```
DROP TABLE IF EXISTS events;

CREATE TABLE events (
    id int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL
    , userId NVARCHAR(50) NOT NULL
    , title NVARCHAR(200) NOT NULL
    , [description] NVARCHAR(1000) NULL
    , startDate date NOT NULL
    , startTime time(0) NULL
    , endDate date NULL
    , endTime time(0) NULL
    , INDEX idx_events_userID ( userId )

)

INSERT INTO events ( userId, title, [description], startDate, startTime, endDate, endTime )
VALUES ( 'user1234', N'appointment', N'description stuff', '2020-03-31', '14:30', NULL, NULL)
, ( 'user1234', N'online conference', N'', '2020-04-01', NULL, '2020-04-02', NULL)
```

#### Create node project

```
npm init
```

#### Download framework hapi

```
npm install @hapi/hapi
```

#### Download some useful Packages

```
npm install --save-dev eslint eslint-config-reverentgeek
npm install mssql fs-extra
```
This has to be configured, so go to npm docs eslint-config-reverentgeek to check for information. Create .eslintrc.js file in the root and paste module.exports to it. 

### Create webserver with hapi
https://hapi.dev/tutorials/gettingstarted/?lang=en_US

#### Start the applications
Check in package.json that the path to index.js is correct (here I change the main to SRC/index.js):
```
{
  "name": "tuto-node-sql",
  "version": "1.0.0",
  "description": "calendar app with nodejs and sql server",
  "main": "src/index.js",
  "directories": {
    "doc": "docs"
  },
```
node .
``` 
