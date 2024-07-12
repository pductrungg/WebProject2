using System.ComponentModel.DataAnnotations;
using HopTri.Share.Common.Enums;

namespace HopTri.Share.Common.Models;
public class AppMessage
{
    [Required]
    [StringLength(10000)]
    public string Content { get; set; }

    public AppMessageType Type { get; set; }
}
