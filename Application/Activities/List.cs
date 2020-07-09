using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> { }

        public class Handler : QueryHandler<Query, List<Activity>>
        {
            public Handler(DataContext context) : base(context) {}

            public override async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await context.Activities.ToListAsync();
                return activities;
            }
        }
    }
}
