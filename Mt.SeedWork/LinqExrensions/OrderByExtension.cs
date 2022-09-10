using System;
using System.Linq;
using System.Linq.Expressions;

namespace Mt.SeedWork.LinqExrensions
{
    public static class Extensions
    {
        //source: https://stackoverflow.com/questions/39685787/how-to-make-a-dynamic-order-in-entity-framework
        public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, Expression<Func<T, object>> keySelector, bool? desc)
        {
            desc = desc ?? false;
            var selectorBody = keySelector.Body;
            // Strip the Convert expression
            if (selectorBody.NodeType == ExpressionType.Convert)
                selectorBody = ((UnaryExpression)selectorBody).Operand;
            // Create dynamic lambda expression
            var selector = Expression.Lambda(selectorBody, keySelector.Parameters);
            // Generate the corresponding Queryable method call
            var queryBody = Expression.Call(typeof(Queryable),
                desc.Value ? "OrderByDescending" : "OrderBy",
                new Type[] { typeof(T), selectorBody.Type },
                source.Expression, Expression.Quote(selector));
            return source.Provider.CreateQuery<T>(queryBody);
        }
    }
}
