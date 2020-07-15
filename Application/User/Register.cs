using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Query : IRequest<User>
        { 
            public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : QueryHandler<Query, User>
        {
            private readonly UserManager<AppUser> userManager;
            public IJwtGenerator jwtGenerator { get; }

            public Handler(
                UserManager<AppUser> userManager, 
                IJwtGenerator jwtGenerator,
                DataContext context=null
            ) : base(context) 
            {
                this.userManager = userManager;
                this.jwtGenerator = jwtGenerator;
            }


            public override async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                if (await context.Users.AnyAsync(x => x.Email == request.Email))
                    throw new RestException(HttpStatusCode.BadRequest, new {Email = "Email already exists"});
                    
                if (await context.Users.AnyAsync(x => x.UserName == request.Username))
                    throw new RestException(HttpStatusCode.BadRequest, new {Username = "Username already exists"});

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    UserName = request.Username,
                    Email = request.Email
                };

                var result = await userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token = jwtGenerator.CreateToken(user),
                        Username = user.UserName,
                        Image = null
                    };
                }

                throw new Exception("Problem saving changes");
            }
        }
    }
}
