create database estudiantes2023;
use estudiantes2023;

create table estudiantes(
	id int primary key auto_increment,
    nombre varchar(50),
    apellido varchar(70),
    email varchar(255) unique
);

-- comenzamos con CRUD
select * from estudiantes;

-- insertar estudiante
insert into estudiantes(nombre, apellido, email) values ("Ludmila", "Sanchez", "ludmi@gmail.com");

-- update
update estudiantes set nombre="Juan", apellido="Sanchez", email="juanSZ@gmail.com" where id = 1; 

-- delete
delete from estudiantes where id = 1;