﻿using Microsoft.EntityFrameworkCore;
using Mt.Domain.Entities;

namespace Mt.Application.Persistence
{
    public interface INorthWindDbContext
    {
        System.Threading.Tasks.Task SaveChangesAsync();
        DbSet<AlphabeticalListOfProduct> AlphabeticalListOfProducts { get; set; }
        DbSet<Category> Categories { get; set; }
        DbSet<CategorySalesFor1997> CategorySalesFor1997s { get; set; }
        DbSet<CurrentProductList> CurrentProductLists { get; set; }
        DbSet<CustomerAndSuppliersByCity> CustomerAndSuppliersByCities { get; set; }
        DbSet<CustomerCustomerDemo> CustomerCustomerDemos { get; set; }
        DbSet<CustomerDemographic> CustomerDemographics { get; set; }
        DbSet<Customer> Customers { get; set; }
        DbSet<Employee> Employees { get; set; }
        DbSet<EmployeeTerritory> EmployeeTerritories { get; set; }
        DbSet<Invoice> Invoices { get; set; }
        DbSet<OrderDetail> OrderDetails { get; set; }
        DbSet<OrderDetailsExtended> OrderDetailsExtendeds { get; set; }
        DbSet<Order> Orders { get; set; }
        DbSet<OrdersQry> OrdersQries { get; set; }
        DbSet<OrderSubtotal> OrderSubtotals { get; set; }
        DbSet<Product> Products { get; set; }
        DbSet<ProductsAboveAveragePrice> ProductsAboveAveragePrices { get; set; }
        DbSet<ProductSalesFor1997> ProductSalesFor1997s { get; set; }
        DbSet<ProductsByCategory> ProductsByCategories { get; set; }
        DbSet<QuarterlyOrder> QuarterlyOrders { get; set; }
        DbSet<Region> Regions { get; set; }
        DbSet<SalesByCategory> SalesByCategories { get; set; }
        DbSet<SalesTotalsByAmount> SalesTotalsByAmounts { get; set; }
        DbSet<Shipper> Shippers { get; set; }
        DbSet<SummaryOfSalesByQuarter> SummaryOfSalesByQuarters { get; set; }
        DbSet<SummaryOfSalesByYear> SummaryOfSalesByYears { get; set; }
        DbSet<Supplier> Suppliers { get; set; }
        DbSet<Territory> Territories { get; set; }
    }
}