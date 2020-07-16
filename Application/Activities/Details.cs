using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<ActivityDto> 
        {
            public Guid Id { get; set; }
        };

        

        public class Handler : QueryHandler<Query, ActivityDto>
        {
            private readonly IMapper mapper;

            public Handler(IMapper mapper ,DataContext context) : base(context)
            {
                this.mapper = mapper;
            }

            public override async Task<ActivityDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities
                    .Include(x => x.UserActivities)
                    .ThenInclude(x => x.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new
                    {
                        activity = "Not found"
                    });

                var activityDto = mapper.Map<Activity, ActivityDto>(activity);
                
                return activityDto;
            }
        }
    }
}
