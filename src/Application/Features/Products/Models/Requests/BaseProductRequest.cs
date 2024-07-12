using System.ComponentModel.DataAnnotations;
using HopTri.Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace HopTri.Application.Features.Products.Models.Requests;
public class BaseProductRequest
{
    [Required]
    public string Name { get; set; }
    
    [Required]
    public string Code { get; set; }
    
    public string CommonCode { get; set; }
    
    public string VideoLink { get; set; }
    
    [Required]
    public string CategoryId { get; set; }
    
    [Required]
    public string UnitId { get; set; }

    [Required]
    public ProductType Type { get; set; }

    [Required]
    public int ShelfLife { get; set; }
    
    [Required]
    public ProductShelfLifeType ShelfLifeType { get; set; }
    
    public double Weight { get; set; }
    
    public ProductWeightType WeightType { get; set; }
    
    public double Volume { get; set; }
    
    public ProductVolumeType VolumeType { get; set; }

    [Required]
    public IList<IFormFile> Images { get; set; }

    [Required]
    public IList<ProductSpecificationsRequest> Specifications { get; set; }
}

public class ProductSpecificationsRequest
{
    public string UnitId { get; set; }
    public decimal Quantity { get; set; }
}

public class CreateProductRequest : BaseProductRequest
{
}

public class UpdateProductRequest : BaseProductRequest
{
    public string Id { get; set; }
}

