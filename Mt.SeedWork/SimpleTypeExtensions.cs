using System;

namespace Mt.SeedWork
{
    public static class SimpleTypeExtensions
    {
        public static DateTime? ToDateTime(this long? value)
        {
            if (value == null)
            {
                return null;
            }
            return DateTimeOffset.FromUnixTimeMilliseconds(value.Value).UtcDateTime;
        }
        public static DateTime ToDateTime(this long value)
        {
            return DateTimeOffset.FromUnixTimeMilliseconds(value).UtcDateTime;
        }
    }
}
