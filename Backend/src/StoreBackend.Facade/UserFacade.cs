using StoreBackend.DomainService;
using StoreBackend.Dto;
using StoreBackend.Facade.Mappers;
using StoreBackend.Infrastructure;

namespace StoreBackend.Facade;

public class UserFacade : IUserFacade
{
    private readonly IUserService _userService;
    private readonly AppDbContext _context;

    public UserFacade(IUserService userService, AppDbContext context)
    {
        _userService = userService;
        _context = context;
    }

    public async Task<UserDto> CreateAsync(CreateUserDto userDto)
    {
        var createdUser = await _userService.CreateAsync(userDto);
        await _context.SaveChangesAsync();
        return UserMapper.ToDto(createdUser);
    }

    public async Task<UserDto> UpdateAsync(Guid userResourceId, UpdateUserDto userDto)
    {
        var updatedUser = await _userService.UpdateAsync(userResourceId, userDto);
        await _context.SaveChangesAsync();
        return UserMapper.ToDto(updatedUser);
    }

    public async Task DeleteAsync(Guid userResourceId, string password)
    {
        await _userService.DeleteAsync(userResourceId, password);
        await _context.SaveChangesAsync();
    }
}