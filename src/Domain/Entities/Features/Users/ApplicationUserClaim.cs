using Microsoft.AspNetCore.Identity;

namespace HopTri.Domain.Entities.Features.Users;

public class ApplicationUserClaim : IdentityUserClaim<string>
{
    public virtual ApplicationUser User { get; set; } = null!;
}
