using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Core
{
    public abstract class CommandHandler<TRequest> : IRequestHandler<TRequest, Unit> where TRequest : IRequest<Unit>
    {            
        protected readonly DataContext context;
        public CommandHandler(DataContext context)
        {
            this.context = context;
        }

        public abstract Task<Unit> Handle(TRequest request, CancellationToken cancellationToken);

    }
}
