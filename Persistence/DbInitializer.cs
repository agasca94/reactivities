using System.Linq;
using Domain;

namespace Persistence 
{
    public static class DbInitializer
    {
        public static void Initialize(DataContext context)
        {
            if (context.Values.Any())
            {
                return;
            }

            var values = new Value[]
            {
                new Value {Id = 1, Name = "Value 101"},
                new Value {Id = 2, Name = "Value 102"},
                new Value {Id = 3, Name = "Value 103"},
            };

            context.Values.AddRange(values);
            context.SaveChanges();
        }
    }
}
