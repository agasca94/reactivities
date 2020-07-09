using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity> 
        {
            public Guid Id { get; set; }
        };

        

        public class Handler : QueryHandler<Query, Activity>
        {
            public Handler(DataContext context) : base(context) {}

            public override async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Id);

                return activity;
            }
        }
    }
}
