using System;
using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private Cloudinary cloudinary;

        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var acc = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            cloudinary = new Cloudinary(acc);
        }

        public PhotoUploadResult AddPhoto(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (file.Length <= 0)
                throw new Exception("File is empty");
            
            using (var stream = file.OpenReadStream())
            {
                var uploadParameters = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation()
                        .Height(500)
                        .Width(500)
                        .Crop("fill")
                        .Gravity("face")
                };

                uploadResult = cloudinary.Upload(uploadParameters);
            }
            
            if (uploadResult.Error != null)
                throw new Exception(uploadResult.Error.Message);

            return new PhotoUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.AbsoluteUri
            };
        }

        public string DeletePPhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);

            var result = cloudinary.Destroy(deleteParams);

            return result.Result == "ok" ? result.Result : null;
        }
    }
}
