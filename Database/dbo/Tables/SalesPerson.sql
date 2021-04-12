CREATE TABLE [dbo].[SalesPerson]
(
	[SalesPersonId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [FirstName] NVARCHAR(50) NOT NULL, 
    [LastName] NVARCHAR(50) NOT NULL, 
    [StreetAddress] NVARCHAR(200) NOT NULL, 
    [City] NVARCHAR(50) NOT NULL, 
    [State] NVARCHAR(2) NOT NULL, 
    [ZipCode] INT NOT NULL, 
    [StartDate] DATE NOT NULL, 
    [TerminationDate] DATE NULL, 
    [Manager] NVARCHAR(50) NULL,
    CONSTRAINT UC_SalesPerson_FirstName_LastName_StreetAddress_City_State_Zipcode UNIQUE (FirstName, LastName,StreetAddress,City,ZipCode),
)
