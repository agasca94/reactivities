using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Unattend
    {
        public class Command : IRequest
        {
            public Guid ActivityId { get; set; }
        }
        public class Handler : CommandHandler<Command>
        {
            private readonly IUserAccessor userAccessor;

            public Handler(IUserAccessor userAccessor, DataContext context) : base(context)
            {
                this.userAccessor = userAccessor;
            }

            public override async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.ActivityId);
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new 
                    {
                        Activity="Activity not foun"
                    });
                
                var user = await context.Users.SingleOrDefaultAsync(
                    x => x.UserName == userAccessor.GetCurrentUsername()
                );

                var attendance = await context.UserActivities.SingleOrDefaultAsync(
                    x => x.AppUserId == user.Id && x.ActivityId == activity.Id
                );

                if (attendance == null)
                    return Unit.Value;

                if (attendance.IsHost)
                    throw new RestException(HttpStatusCode.BadRequest, new
                    {
                        Attendance = "You cannot remove yourself as host"
                    });

                context.UserActivities.Remove(attendance);
                    
                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Unit.Value;
                }

                throw new Exception("Problem saving changes");
            }
        }
    }
}
