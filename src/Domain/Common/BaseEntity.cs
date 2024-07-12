using System.ComponentModel.DataAnnotations.Schema;

namespace HopTri.Domain.Common;

public abstract class BaseEntity : DomainEventEntity
{
    public int Id { get; set; }
}

public abstract class BaseEntity<TKey> : DomainEventEntity
{
    public virtual TKey Id { get; protected set; }

    protected BaseEntity()
    {
    }

    protected BaseEntity(TKey id)
    {
        Id = id;
    }
}
