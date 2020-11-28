using AutoMapper;
using Entities.DTO;
using Entities.Models;

namespace AccountOwnerServer
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Owner, OwnerDto>();
            CreateMap<Account, AccountDto>();
        }
    }
}
