using AutoMapper;
using HopTri.Application.Features.Products.Models.Dtos;
using HopTri.Domain.Entities.Features.Products;
using HopTri.Share.Common.Helpers;

namespace HopTri.Infrastructure.Models.Mappings;

public static class ModelMapper
{
    /// <summary>
    /// Mappings all dtos for system module
    /// </summary>
    /// <param name="config">config</param>
    public static void MappingDto(IMapperConfigurationExpression config)
    {
        config.DisableConstructorMapping();
        ConfigureProductsDtoMapping(config);
    }

    private static void ConfigureProductsDtoMapping(IMapperConfigurationExpression config)
    {
        config.CreateMap<ProductCategory, ProductCategoryDto>(MemberList.Destination)
              .ForMember(dest => dest.Id, opt => opt.MapFrom(src => AutoMapperHelper.GuidToStringConverter(src.Id)))
              .ForMember(dest => dest.ParentCategoryId, opt => opt.MapFrom(src => AutoMapperHelper.NullableGuidToStringConverter(src.ParentCategoryId)));

        config.CreateMap<ProductCategory, ProductCategoryInfoDto>(MemberList.Destination)
              .ForMember(dest => dest.Id, opt => opt.MapFrom(src => AutoMapperHelper.GuidToStringConverter(src.Id)));

        config.CreateMap<Product, ProductDto>(MemberList.Destination)
              .ForMember(dest => dest.Id, opt => opt.MapFrom(src => AutoMapperHelper.GuidToStringConverter(src.Id)))
              .ForMember(dest => dest.UnitId, opt => opt.MapFrom(src => AutoMapperHelper.GuidToStringConverter(src.Id)))
              .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => AutoMapperHelper.GuidToStringConverter(src.Id)));

        config.CreateMap<ProductUnit, ProductUnitDto>(MemberList.Destination)
              .ForMember(dest => dest.Id, opt => opt.MapFrom(src => AutoMapperHelper.GuidToStringConverter(src.Id)));

        config.CreateMap<ProductImage, ProductImageDto>(MemberList.Destination)
              .ForMember(dest => dest.Id, opt => opt.MapFrom(src => AutoMapperHelper.GuidToStringConverter(src.Id)));

        config.CreateMap<ProductSpecifications, ProductSpecificationsDto>(MemberList.Destination)
              .ForMember(dest => dest.Id, opt => opt.MapFrom(src => AutoMapperHelper.GuidToStringConverter(src.Id)))
              .ForMember(dest => dest.UnitId, opt => opt.MapFrom(src => AutoMapperHelper.GuidToStringConverter(src.Id)));
    }
}
