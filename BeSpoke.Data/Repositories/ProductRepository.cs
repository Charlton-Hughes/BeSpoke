using BeSpoke.Data.Context;
using BeSpoke.Entities.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeSpoke.Data.Repositories
{
    public class ProductRepository
    {
        BeSpokeContext context = new BeSpokeContext();

        public List<Product> GetProducts()
        {
            return context.Products.ToList();
        }

        public bool AddOrUpdateProduct(Product product)
        {
            bool success = true;
            try
            {
                if (product.ProductId > 0)
                {
                    Product existing = context.Products.Where(x => x.ProductId == product.ProductId).FirstOrDefault();
                    existing.CommissionPercentage = product.CommissionPercentage;
                    existing.Manufacturer = product.Manufacturer;
                    existing.ProductName = product.ProductName;
                    existing.PurchasePrice = product.PurchasePrice;
                    existing.QtyOnHand = product.QtyOnHand;
                    existing.SalePrice = product.SalePrice;
                    existing.Style = product.Style;
                }
                else
                {
                    context.Products.Add(product);
                }
                context.SaveChanges();
            }
            catch (Exception e)
            {
                success = false;
            }
            return success;
        }

        public void UpdateQtyOnHand(int productId)
        {
            try
            {
                Product product = context.Products.Where(x => x.ProductId == productId).FirstOrDefault();
                product.QtyOnHand = product.QtyOnHand - 1;
                context.SaveChanges();
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}
