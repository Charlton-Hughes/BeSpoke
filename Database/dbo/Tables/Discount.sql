CREATE TABLE [dbo].[Discount]
(
	[DiscountId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[ProductId] INT NOT NULL CONSTRAINT [FK_Discount_ProductId] Foreign Key (ProductId) References [dbo].[Product] (ProductId), 
    [BeginDate] DATE NOT NULL, 
    [EndDate] DATE NOT NULL, 
    [DiscountPercentage] DECIMAL(2, 2) NOT NULL,

)
