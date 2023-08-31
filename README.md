# tiendamia

Este proyecto consta de dos partes, una api hecha en nestjs y una ui hecha en nextjs, adicional a esto se encuentra dockerisada y esta hecha de tal forma que con un solo comando puedan levantar el proyecto sin problemas.

## setup

cree una copia del archivo `docker-compose.override.example.yml` y nombrela `docker-compose.override.yml` despues de esto levante el proyecto usando docker-compose de la siguiente forma `docker-compose up` y espere a que levante el proyecto, este comando levantara la base datos, el api y la ui, adicional a esto ejecutara los seeders y las migrations, despues de que termine de levantar el proyecto si accede a http://localhost:3000/ deberia de ver la ui con la informacion optenida de la base datos a travez del api

si desea agregar mas valores a la base de datos ejecute el siguiente comando `docker-compose exec api npx sequelize-cli db:seed:all` esto ejecutara los seeders
