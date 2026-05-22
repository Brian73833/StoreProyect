-- 1. Creación de la base de datos si no existe
CREATE DATABASE StoreDB;

-- Seleccionar la base de datos activa para las siguientes operaciones
USE StoreDB;

-- =========================================================================
-- 2. CREACIÓN DE TABLAS 
-- =========================================================================

-- Tabla: Category 

CREATE TABLE Category (
    CategoryId             INT              NOT NULL IDENTITY(1,1),
    CategoryResourceId     UNIQUEIDENTIFIER NOT NULL,
    Name                   NVARCHAR(50)     NOT NULL,

    CONSTRAINT PK_Category PRIMARY KEY (CategoryId)
    );

-- Tabla: Product 
CREATE TABLE Product (
    ProductId          INT              NOT NULL IDENTITY(1,1),
    ProductResourceId  UNIQUEIDENTIFIER NOT NULL,
    Name               NVARCHAR(100)    NOT NULL,
    Description        NVARCHAR(255)    NULL,
    Price              DECIMAL(10, 2)   NOT NULL,
    Stock              INT              NOT NULL,
    ImagePath          NVARCHAR(500)    NULL,
    CategoryId         INT              NOT NULL,

    CONSTRAINT PK_Product    PRIMARY KEY (ProductId),
    CONSTRAINT FK_Product_Category FOREIGN KEY (CategoryId)
    REFERENCES Category (CategoryId)
    );

-- Tabla: Role 
CREATE TABLE Role (
    Id               INT              NOT NULL IDENTITY(1,1),
    RoleResourceId   UNIQUEIDENTIFIER NOT NULL,
    Name             NVARCHAR(100)    NOT NULL,

    CONSTRAINT PK_Role          PRIMARY KEY (Id),
    CONSTRAINT UQ_Role_Name     UNIQUE (Name),
    CONSTRAINT UQ_Role_ResourceId UNIQUE (RoleResourceId)
    );

-- Tabla: User 
CREATE TABLE [User] (
    UserId           INT              NOT NULL IDENTITY(1,1),
    UserResourceId   UNIQUEIDENTIFIER NOT NULL,
    Name             NVARCHAR(100)    NOT NULL,
    Email            NVARCHAR(100)    NOT NULL,
    PasswordHash     NVARCHAR(255)    NOT NULL,

    CONSTRAINT PK_User PRIMARY KEY (UserId)
    );

-- Tabla: UserRole 
CREATE TABLE UserRole (
    UserId             INT              NOT NULL,
    RoleId             INT              NOT NULL,
    UserRoleResourceId UNIQUEIDENTIFIER NOT NULL,

    CONSTRAINT PK_UserRole              PRIMARY KEY (UserId, RoleId),
    CONSTRAINT UQ_UserRole_ResourceId   UNIQUE (UserRoleResourceId),
    CONSTRAINT FK_UserRole_User         FOREIGN KEY (UserId)
    REFERENCES [User] (UserId),
    CONSTRAINT FK_UserRole_Role         FOREIGN KEY (RoleId)
    REFERENCES Role (Id)
    );

-- =========================================================================
-- 3. INSERCIÓN DE DATOS
-- =========================================================================

-- Llenar la tabla de Roles
INSERT INTO Role (RoleResourceId, Name)
    VALUES 
    (NEWID(), 'Administrator'),
    (NEWID(), 'Customer');

-- Agregar Usuario Admin
INSERT INTO [User] (UserResourceId, Name, Email, PasswordHash)
    VALUES (
    NEWID(),
    'Administrator',
    'admin@gmail.com',
    '$2a$12$ZRKMr5nXHnl6/guG.CzgJuCMyU3cth24YaJH88kFuIdQQBQ96Jd3C'
    );

-- Asociar el usuario Administrador con el Rol de 'Administrator'
INSERT INTO UserRole (UserId, RoleId, UserRoleResourceId)
    VALUES (
    (SELECT UserId FROM [User] WHERE Email = 'admin@gmail.com'),
    (SELECT Id FROM Role WHERE Name = 'Administrator'),
    NEWID()
    );
