CREATE TABLE [dbo].[Sale]
(
	[SaleId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[ProductId] INT NOT NULL CONSTRAINT [FK_Sale_ProductId] Foreign Key (ProductId) References [dbo].[Product] (ProductId),
	[SalesPersonId] INT NOT NULL CONSTRAINT [FK_Sale_SalesPersonId] Foreign Key (SalesPersonId) References [dbo].[SalesPerson] (SalesPersonId),
	[CustomerId] INT NOT NULL CONSTRAINT [FK_Sale_CustomerId] Foreign Key (CustomerId) References [dbo].[Customer] (CustomerId), 
    [Date] DATETIME NOT NULL,
)
