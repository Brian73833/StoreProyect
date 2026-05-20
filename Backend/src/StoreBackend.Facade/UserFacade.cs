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

    public async Task<UserDto> LoginAsync(LoginUserDto loginDto)
    {
        var entity = await _userService.LoginAsync(loginDto);
        return UserMapper.ToDto(entity);
    }

    public async Task<UserDto> CreateAsync(CreateUserDto userDto)
    {
        var entity = await _userService.CreateAsync(userDto);
        await _context.SaveChangesAsync();
        return UserMapper.ToDto(entity);
    }

    public async Task<UserDto> UpdateAsync(Guid resourceId, UpdateUserDto userDto)
    {
        var entity = await _userService.UpdateAsync(resourceId, userDto);
        await _context.SaveChangesAsync();
        return UserMapper.ToDto(entity);
    }

    public async Task DeleteAsync(Guid resourceId, string password)
    {
        await _userService.DeleteAsync(resourceId, password);
        await _context.SaveChangesAsync();
    }
}