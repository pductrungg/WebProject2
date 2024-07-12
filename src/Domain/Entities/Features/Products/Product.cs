﻿using HopTri.Domain.Enums;

namespace HopTri.Domain.Entities.Features.Products;
public class Product : BaseAuditableEntity<Guid>
{
    public string Name { get; set; }
    public string Code { get; set; }
    public string CommonCode { get; set; }
    public string VideoLink { get; set; }
    public Guid CategoryId { get; set; }
    public Guid UnitId { get; set; }
    public ProductType Type { get; set; }
    public int ShelfLife { get; set; }
    public ProductShelfLifeType ShelfLifeType { get; set; }
    public double? Weight { get; set; }
    public ProductWeightType? WeightType { get; set; }
    public double? Volume { get; set; }
    public ProductVolumeType? VolumeType { get; set; }
    public ProductCategory Category { get; set; }
    public ProductUnit ProductUnit { get; set; }
    public ICollection<ProductImage> ProductImages { get; set; }
    public ICollection<ProductSpecifications> Specifications { get; set; }
    public ProductStatus Status { get; set; }
}