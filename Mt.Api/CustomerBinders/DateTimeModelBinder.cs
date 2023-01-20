using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Threading.Tasks;

namespace Mt.Api.CustomerBinders
{
    public class DateTimeModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var valueProviderResult = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
            if (valueProviderResult == ValueProviderResult.None)
            {
                return Task.CompletedTask;
            }

            bindingContext.ModelState.SetModelValue(bindingContext.ModelName, valueProviderResult);

            var value = valueProviderResult.FirstValue;
            if (string.IsNullOrEmpty(value))
            {
                return Task.CompletedTask;
            }

            long unixTimestamp;
            if (!long.TryParse(value, out unixTimestamp))
            {
                bindingContext.ModelState.TryAddModelError(bindingContext.ModelName, "Invalid unix timestamp format.");
                return Task.CompletedTask;
            }

            var dateTime = DateTimeOffset.FromUnixTimeMilliseconds(unixTimestamp).UtcDateTime;
            bindingContext.Result = ModelBindingResult.Success(dateTime);
            return Task.CompletedTask;
        }
    }
}