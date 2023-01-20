using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;

namespace Mt.Api.CustomerBinders
{
    public class BinderProvider : IModelBinderProvider
    {
        private readonly IModelBinder _modelBinder;

        public BinderProvider(IModelBinder modelBinder)
        {
            _modelBinder = modelBinder;
        }

        public IModelBinder GetBinder(ModelBinderProviderContext context)
        {
            if (context.Metadata.ModelType == typeof(DateTime) || context.Metadata.ModelType == typeof(DateTime?))
            {
                return _modelBinder;
            }

            return null;
        }
    }
}
