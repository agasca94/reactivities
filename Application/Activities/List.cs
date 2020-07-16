using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<ActivityDto>> { }

        public class Handler : QueryHandler<Query, List<ActivityDto>>
        {
            private readonly IMapper mapper;

            public Handler(IMapper mapper, DataContext context) : base(context) 
            {
                this.mapper = mapper;
            }

            public override async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await context.Activities
                    .Include(x => x.UserActivities)
                    .ThenInclude(x => x.AppUser)
                    .ToListAsync();

                return mapper.Map<List<Activity>, List<ActivityDto>>(activities);
            }
        }
    }
}
