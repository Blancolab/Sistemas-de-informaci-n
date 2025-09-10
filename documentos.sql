-- Creación de la tabla Oficio
CREATE TABLE Oficio (
    numero_oficio INT PRIMARY KEY,        -- Clave primaria, única
    nombre VARCHAR(100) NOT NULL,
    seccion VARCHAR(100),
    fecha DATE NOT NULL,
    hash VARCHAR(255) UNIQUE NOT NULL     -- Campo único
);

-- Creación de la tabla Usuario
CREATE TABLE Usuario (
    nombre_usuario VARCHAR(100) PRIMARY KEY,   -- Clave primaria, única
    contraseña VARCHAR(255) UNIQUE NOT NULL    -- Campo único
);