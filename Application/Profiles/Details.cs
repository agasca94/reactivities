using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Profile> 
        {
            public string Username { get; set; }
        }
        
        public class Handler : QueryHandler<Query, Profile>
        {
            public Handler(DataContext context) : base(context) {}

            public override async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users.SingleOrDefaultAsync(
                    x => x.UserName == request.Username
                );

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new {User = "User not found"});

                return new Profile
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                    Photos = user.Photos,
                    Bio = user.Bio
                };
            }
        }
    }
}
