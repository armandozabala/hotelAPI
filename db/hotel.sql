CREATE DATABASE IF NOT EXISTS hotels_db;

USE hotels_db;

CREATE TABLE hotel (
	id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) DEFAULT NULL,
    categoria INT(11) DEFAULT NULL,
    precio DOUBLE, DEFAULT NULL,
    direccion VARCHAR(45) DEFAULT NULL,
    foto VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY(id)
);

DESCRIBE hotel;

INSERT INTO hotel values
(1, 'Hotel Campestre', 5, 150, 'Cra 10a #65-81', 'https://es.wikipedia.org/wiki/Gran_Hotel_Villavicencio#/media/Archivo:Gran_Hotel_Villavicencio_1.JPG'),
(2, 'Hotel Campestre', 5, 250, 'Cra 10a #65-81', 'https://meta.wikimedia.org/wiki/Hotel_Wikipedia#/media/File:HotelWiki1.JPG');


SELECT * FROM hotel;



CREATE DEFINER =`root`@`localhost` PROCEDURE `hotelAddOrEdit`(
		IN _id INT,
        IN _nombre VARCHAR(45),
        IN _categoria INT(11),
        IN _precio DOUBLE,
        IN _direccion VARCHAR(45),
        IN _foto VARCHAR(255)
)
BEGIN

		IF _id =  0 THEN
        
           INSERT INTO hotel (nombre, categoria, precio, direccion, foto)
           VALUES (_nombre, _categoria, _precio, _direccion, _foto);
           SET _id = LAST_INSERT_ID();
           
		ELSE
        
			UPDATE hotel
				SET
                nombre = _nombre,
				categoria = _categoria,
                precio = _precio,
				direccion = _direccion,
				foto = _foto
                
            WHERE id = _id;
            
		END IF;
        
        SELECT _id AS id;
            
END