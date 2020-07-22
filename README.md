Hotel API - NodeJS - Express - MySQL

db/hotel.sql  => archivo sql para ejecutar la creacion de la tabla y un procedure para la agregacion y modificacion de datos.

databaseConfig.js => archivo de configuracion de la base de datos, permite configurar parametros principales para los ambientes de dev o prod.

routes/hotels.js => capa de persistencia de datos, contiene los principales funcionalidades del API CRUD.

index.js => ejecucion inicial

npm package:

        "express": "^4.17.1",
        "mysql": "^2.17.1"


for start serve:

npm run dev

# node_api_hotel
