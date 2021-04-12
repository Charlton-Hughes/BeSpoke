CREATE PROCEDURE [dbo].[QuarterlyCommission]
	@Year int
AS
Begin
--For Testing
--Declare @Year int = 2021;
Declare @QuarterOneStart DateTime = DateFromParts(@Year,1,1);
Declare @QuarterTwoStart DateTime = DateFromParts(@Year,4,1);
Declare @QuarterThreeStart DateTime = DateFromParts(@Year,7,1);
Declare @QuarterFourStart DateTime = DateFromParts(@Year,10,1);
Declare @NextYearStart DateTime = DateFromParts(@Year +1,1,1);

Select 
	(sp.LastName + ', '+sp.FirstName) as SalesPerson
	,Q1.Commission as Q1Commission
	,Q2.Commission as Q2Commission
	,Q3.Commission as Q3Commission
	,Q4.Commission as Q4Commission
from dbo.SalesPerson as sp
outer apply(
	select SUM((p.SalePrice * p.CommissionPercentage * (1.0 - ISNULL(d.DiscountPercentage,0)))) as Commission 
	from dbo.Sale as s
	left join dbo.Discount as d
		on d.ProductId = s.ProductId and s.[Date] between d.BeginDate and d.EndDate
	join dbo.Product as p
		on p.ProductId = s.ProductId
	where s.SalesPersonId = sp.SalesPersonId
		and s.Date >= @QuarterOneStart 
		and s.Date < @QuarterTwoStart
)Q1
outer apply(
	select SUM((p.SalePrice * p.CommissionPercentage * (1.0 - ISNULL(d.DiscountPercentage,0)))) as Commission 
	from dbo.Sale as s
	left join dbo.Discount as d
		on d.ProductId = s.ProductId and s.[Date] between d.BeginDate and d.EndDate
	join dbo.Product as p
		on p.ProductId = s.ProductId
	where s.SalesPersonId = sp.SalesPersonId
		and s.Date >= @QuarterTwoStart 
		and s.Date < @QuarterThreeStart
)Q2
outer apply(
	select SUM((p.SalePrice * p.CommissionPercentage * (1.0 - ISNULL(d.DiscountPercentage,0)))) as Commission 
	from dbo.Sale as s
	left join dbo.Discount as d
		on d.ProductId = s.ProductId  and s.[Date] between d.BeginDate and d.EndDate
	join dbo.Product as p
		on p.ProductId = s.ProductId
	where s.SalesPersonId = sp.SalesPersonId
		and s.Date >= @QuarterThreeStart 
		and s.Date < @QuarterFourStart
)Q3
outer apply(
	select SUM((p.SalePrice * p.CommissionPercentage * (1.0 - ISNULL(d.DiscountPercentage,0)))) as Commission 
	from dbo.Sale as s
	left join dbo.Discount as d
		on d.ProductId = s.ProductId and s.[Date] between d.BeginDate and d.EndDate
	join dbo.Product as p
		on p.ProductId = s.ProductId
	where s.SalesPersonId = sp.SalesPersonId
		and s.Date >= @QuarterFourStart 
		and s.Date < @NextYearStart
)Q4
--Future enhancement, not restricting sales after termination date yet.
--where sp.TerminationDate is null or sp.TerminationDate >= @QuarterOneStart




end
	
