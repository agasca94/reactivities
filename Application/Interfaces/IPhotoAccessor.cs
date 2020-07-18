using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        public PhotoUploadResult AddPhoto(IFormFile file);
        public string DeletePPhoto(string publicId);
    }
}
