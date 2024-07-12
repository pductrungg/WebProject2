using HopTri.Share.Common.Models;

namespace HopTri.Application.Common.Interfaces;
public interface IIdentityService
{
    Task<string> GetUserNameAsync(string userId);

    Task<bool> IsInRoleAsync(string userId, string role);

    Task<bool> AuthorizeAsync(string userId, string policyName);

    Task<AppActionResultData<string>> CreateUserAsync(string userName, string password);

    Task<AppActionResultData<string>> DeleteUserAsync(string userId);
}
