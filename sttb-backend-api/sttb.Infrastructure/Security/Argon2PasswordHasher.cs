using Isopoh.Cryptography.Argon2;
using Microsoft.AspNetCore.Identity;
using sttb.Entities.Models;
using System.Security.Cryptography;

namespace sttb.Infrastructure.Security;

/// <summary>
/// Replaces the default ASP.NET Identity password hasher with Argon2id.
/// Mandatory per security-standard §2.1.
/// Minimum: 3 iterations, 64 MB memory, unique per-user salt, constant-time comparison.
/// </summary>
public class Argon2PasswordHasher : IPasswordHasher<User>
{
    private const int Iterations = 3;
    private const int MemoryKilobytes = 65536; // 64 MB
    private const int Parallelism = 1;
    private const int HashLength = 32;

    public string HashPassword(User user, string password)
    {
        // Must generate a unique salt for each password
        var salt = new byte[16];
        RandomNumberGenerator.Fill(salt);

        // Use Argon2Config for full control — stable API in Isopoh.Cryptography.Argon2 2.x
        var config = new Argon2Config
        {
            Type = Argon2Type.DataIndependentAddressing, // Argon2id
            TimeCost = Iterations,
            MemoryCost = MemoryKilobytes,
            Lanes = Parallelism,
            Threads = Parallelism,
            Salt = salt,
            HashLength = HashLength,
            Password = System.Text.Encoding.UTF8.GetBytes(password)
        };

        using var argon2 = new Argon2(config);
        using var hash = argon2.Hash();
        return config.EncodeString(hash.Buffer);
    }

    public PasswordVerificationResult VerifyHashedPassword(
        User user,
        string hashedPassword,
        string providedPassword)
    {
        var isValid = Argon2.Verify(hashedPassword, providedPassword);
        return isValid
            ? PasswordVerificationResult.Success
            : PasswordVerificationResult.Failed;
    }
}
