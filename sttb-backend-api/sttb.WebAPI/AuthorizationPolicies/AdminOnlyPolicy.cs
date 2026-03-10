using Microsoft.AspNetCore.Authorization;
using sttb.Commons.Constants;

namespace sttb.WebAPI.AuthorizationPolicies;

public static class AdminOnlyPolicy
{
    public const string Name = "AdminOnly";

    public static void Configure(AuthorizationPolicyBuilder policy)
    {
        policy.RequireRole(Roles.Admin);
    }
}
