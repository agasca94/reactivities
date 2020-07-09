using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Core
{
    public abstract class QueryHandler<TRequest, TResponse> : IRequestHandler<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {            
        protected readonly DataContext context;
        public QueryHandler(DataContext context)
        {
            this.context = context;
        }

        public abstract Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);

    }
}
