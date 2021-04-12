CREATE TABLE [dbo].[Product]
(
	[ProductId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [ProductName] NVARCHAR(50) NOT NULL, 
    [Manufacturer] NVARCHAR(50) NOT NULL, 
    [Style] NVARCHAR(50) NOT NULL, 
    [PurchasePrice] DECIMAL(8, 2) NOT NULL, 
    [SalePrice] DECIMAL(8, 2) NOT NULL, 
    [QtyOnHand] INT NOT NULL, 
    [CommissionPercentage] DECIMAL(2, 2) NOT NULL,
    CONSTRAINT UC_Product_ProductName_Manufacturer_Style UNIQUE (ProductName, [Manufacturer],[Style])
)