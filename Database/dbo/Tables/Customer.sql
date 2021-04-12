CREATE TABLE [dbo].[Customer]
(
	[CustomerId] INT IDENTITY (1,1) NOT NULL PRIMARY KEY,
	[FirstName] NVARCHAR(50) NOT NULL, 
    [LastName] NVARCHAR(50) NOT NULL, 
    [StreetAddress] NVARCHAR(200) NOT NULL, 
    [City] NVARCHAR(50) NOT NULL, 
    [State] NVARCHAR(2) NOT NULL, 
    [ZipCode] INT NOT NULL, 
    [StartDate] DATE NOT NULL, 
)
