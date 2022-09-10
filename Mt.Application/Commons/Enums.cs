namespace Mt.Application.Commons
{
    public enum MetaDataTypes
    {
        Countries = 1,
        Cities = 2,
    }

    public enum CustomersSortFields
    {
        CompanyName,
        ContactTitle,
        CustomerId,
        ContactName,
        Country,
    }

    public enum OrdersSortFields
    {
        ContactName,
        Employee,
        OrderDate,
        ShipCountry,
        TotalOrderedUnits,
    }
}
