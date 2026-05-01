using StoreBackend.Domain.Entities;
using StoreBackend.Infrastructure.Repositories;
using StoreBackend.Dto;
using StoreBackend.Exceptions;

namespace StoreBackend.DomainService;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User> LoginAsync(LoginUserDto loginDto)
    {
        var user = await _userRepository.GetByEmailAsync(loginDto.Email);
        
        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
        {
            throw new BadRequestResponseException("Invalid email or password");
        }

        return user;
    }

    public async Task<User> CreateAsync(CreateUserDto userDto)
    {
        if (await _userRepository.HasUserByEmailAsync(userDto.Email))
        {
            throw new BadRequestResponseException("Email is already taken");
        }

        var entity = new User
        {
            UserResourceId = Guid.NewGuid(),
            Name = userDto.Name,
            Email = userDto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
            IsAdmin = false
        };

        return await _userRepository.CreateAsync(entity);
    }

    public async Task<User> UpdateAsync(Guid resourceId, UpdateUserDto userDto)
    {
        var user = await _userRepository.GetByResourceIdAsync(resourceId);
        if (user == null)
        {
            throw new BadRequestResponseException("User not found");
        }

        // Check if email is being changed and if the new email is already taken
        if (user.Email != userDto.Email && await _userRepository.HasUserByEmailAsync(userDto.Email))
        {
            throw new BadRequestResponseException("Email is already taken");
        }

        user.Name = userDto.Name;
        user.Email = userDto.Email;

        // Handle password update if provided
        if (!string.IsNullOrEmpty(userDto.NewPassword))
        {
            if (string.IsNullOrEmpty(userDto.CurrentPassword))
            {
                throw new BadRequestResponseException("Current password is required to change password");
            }

            if (!BCrypt.Net.BCrypt.Verify(userDto.CurrentPassword, user.PasswordHash))
            {
                throw new BadRequestResponseException("Current password is incorrect");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.NewPassword);
        }

        return user;
    }

    public async Task DeleteAsync(Guid resourceId, string password)
    {
        var user = await _userRepository.GetByResourceIdAsync(resourceId);
        if (user == null)
        {
            throw new BadRequestResponseException("User not found");
        }

        if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        {
            throw new BadRequestResponseException("Incorrect password");
        }

        await _userRepository.DeleteAsync(user);
    }
}