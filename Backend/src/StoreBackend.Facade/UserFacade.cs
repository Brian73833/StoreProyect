using StoreBackend.DomainService;
using StoreBackend.Dto;
using StoreBackend.Facade.Mappers;
using StoreBackend.Infrastructure;

namespace StoreBackend.Facade;

public class UserFacade : IUserFacade
{
    private readonly IUserService userService;
    private readonly AppDbContext context;

    public UserFacade(IUserService userService, AppDbContext context)
    {
        this.userService = userService;
        this.context = context;
    }

    public async Task<UserDto> LoginAsync(LoginUserDto loginDto)
    {
        var entity = await userService.LoginAsync(loginDto);
        return UserMapper.ToDto(entity);
    }

    public async Task<UserDto> CreateAsync(CreateUserDto userDto)
    {
        var entity = await userService.CreateAsync(userDto);
        await context.SaveChangesAsync();
        return UserMapper.ToDto(entity);
    }

    public async Task<UserDto> UpdateAsync(Guid resourceId, UpdateUserDto userDto)
    {
        var entity = await userService.UpdateAsync(resourceId, userDto);
        await context.SaveChangesAsync();
        return UserMapper.ToDto(entity);
    }

    public async Task DeleteAsync(Guid resourceId, string password)
    {
        await userService.DeleteAsync(resourceId, password);
        await context.SaveChangesAsync();
    }
}