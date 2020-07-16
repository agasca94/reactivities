using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IUserAccessor userAccessor;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly DataContext dbContext;

        public IsHostRequirementHandler(
            IUserAccessor userAccessor,
            IHttpContextAccessor httpContextAccessor, 
            DataContext context
        )
        {
            this.userAccessor = userAccessor;
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = context;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var username = userAccessor.GetCurrentUsername();
            var activityId = Guid.Parse(
                httpContextAccessor
                    .HttpContext
                    .Request
                    .RouteValues
                    .SingleOrDefault(x => x.Key == "id")
                    .Value
                    .ToString()
            );

            var activity = dbContext.Activities.Find(activityId);
            var host = activity?.UserActivities?.FirstOrDefault(x => x.IsHost);

            if (host?.AppUser?.UserName == username)
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
