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
    public class Delete
    {
        public class Command : IRequest
        {
            public string PublicId { get; set; }
        }

        public class Handler : CommandHandler<Command>
        {
            private readonly IUserAccessor userAccessor;
            private readonly IPhotoAccessor photoAccessor;

            public Handler(
                IUserAccessor userAccessor,
                IPhotoAccessor photoAccessor,
                DataContext context
            ) : base(context)
            {
                this.userAccessor = userAccessor;
                this.photoAccessor = photoAccessor;
            }

            public override async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.SingleOrDefaultAsync(
                    u => u.UserName == userAccessor.GetCurrentUsername()
                );

                var photo = user.Photos.FirstOrDefault(
                    p => p.Id == request.PublicId
                );
                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Photo="Photo not found"});

                if (photo.IsMain)
                    throw new RestException(HttpStatusCode.BadRequest, new {Photos="You cannot delete your main photo"});

                var result = photoAccessor.DeletePPhoto(photo.Id);
                if (result == null)
                    throw new Exception("Problem deleting your photo");

                user.Photos.Remove(photo);


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
