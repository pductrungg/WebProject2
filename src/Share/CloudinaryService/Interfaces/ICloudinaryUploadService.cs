using HopTri.Share.Common.Models;
using HopTri.Share.CloudinaryService.Reponses;
using HopTri.Share.CloudinaryService.Requests;

namespace HopTri.Share.CloudinaryService.Interfaces;
public interface ICloudinaryUploadService
{
    /// <summary>
    /// Upload file to Cloudinary Storage
    /// </summary>
    /// <param name="uploadData">data be uploaded</param>
    /// <returns></returns>
    Task<AppActionResultData<string>> UploadImageAsync(UploadDataRequest uploadData);


    /// <summary>
    /// Upload file to Cloudinary Storage
    /// </summary>
    /// <param name="uploadData">data be uploaded</param>
    /// <returns></returns>
    Task<AppActionResultData<string>> UploadThumbnailImageAsync(UploadDataThumbnailRequest uploadData);

    /// <summary>
    /// Upload file to Cloudinary Storage
    /// </summary>
    /// <param name="uploadData"></param>
    /// <returns></returns>
    Task<AppActionResultData<UploadFileResponse>> UploadFileAsync(UploadFileRequest uploadData);

    /// <summary>
    /// Upload file to Cloudinary Storage
    /// </summary>
    /// <param name="uploadData"></param>
    /// <returns></returns>
    Task<AppActionResultData<string>> DeleteFileAsync(string publicId);

    /// <summary>
    /// Upload image and thumbnail apply moderation asynchronously
    /// </summary>
    /// <param name="uploadData"></param>
    /// <returns></returns>
    Task<AppActionResultData<ImageAndThumbnailResponse>> UploadImageAndThumbnailApplyModerationAsync(UploadDataThumbnailRequest uploadData);
}
