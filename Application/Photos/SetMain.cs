using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest
        {
            public string Id;
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
                var user = await context.Users.SingleOrDefaultAsync(
                    u => u.UserName == userAccessor.GetCurrentUsername()
                );
                var photo = user.Photos.FirstOrDefault(
                    p => p.Id == request.Id
                );
                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Photos="Not found"});

                var currentMain = user.Photos.FirstOrDefault(
                    p => p.IsMain
                );

                if (currentMain != null)
                    currentMain.IsMain = false;
                
                photo.IsMain = true;

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
