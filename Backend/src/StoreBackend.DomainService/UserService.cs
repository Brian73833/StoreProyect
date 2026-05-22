using StoreBackend.Domain.Entities;
using StoreBackend.Infrastructure.Repositories;
using StoreBackend.Dto;
using StoreBackend.Exceptions;

namespace StoreBackend.DomainService;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IRoleRepository _roleRepository;

    public UserService(IUserRepository userRepository, IRoleRepository roleRepository)
    {
        _userRepository = userRepository;
        _roleRepository = roleRepository;
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

        var customerRole = await _roleRepository.GetByNameAsync(RoleNames.Customer);
        if (customerRole == null)
        {
            throw new ResourceNotFoundException("Default role 'Customer' not found");
        }

        var userEntity = new User
        {
            UserResourceId = Guid.NewGuid(),
            Name = userDto.Name,
            Email = userDto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password)
        };

        userEntity.UserRoles.Add(new UserRole
        {
            User = userEntity,
            Role = customerRole
        });

        return await _userRepository.CreateAsync(userEntity);
    }

    public async Task<User> UpdateAsync(Guid userResourceId, UpdateUserDto userDto)
    {
        var user = await _userRepository.GetByResourceIdAsync(userResourceId);
        if (user == null)
        {
            throw new ResourceNotFoundException("User not found");
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

        return await _userRepository.UpdateAsync(user);
    }

    public async Task DeleteAsync(Guid userResourceId, string password)
    {
        var user = await _userRepository.GetByResourceIdAsync(userResourceId);
        if (user == null)
        {
            throw new ResourceNotFoundException("User not found");
        }

        if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        {
            throw new BadRequestResponseException("Incorrect password");
        }

        await _userRepository.DeleteAsync(user);
    }
}