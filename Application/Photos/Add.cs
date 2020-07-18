using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Query : IRequest<Photo> { 
            public IFormFile File { get; set; }
        }
        
        public class Handler : QueryHandler<Query, Photo>
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

            public override async Task<Photo> Handle(Query request, CancellationToken cancellationToken)
            {
                var photoUploadResult = photoAccessor.AddPhoto(request.File);   
                var user = await context.Users.SingleOrDefaultAsync(
                    u => u.UserName == userAccessor.GetCurrentUsername()
                );

                var photo = new Photo
                {
                    Id = photoUploadResult.PublicId,
                    Url = photoUploadResult.Url                
                };

                if (!user.Photos.Any(p => p.IsMain))
                {
                    photo.IsMain = true;
                }

                user.Photos.Add(photo);

                var success = await context.SaveChangesAsync() > 0;

                if (success) return photo;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
