using System;

namespace Mt.Domain.Abstractions
{
    public interface ITimeTracked
    {
        public DateTime CreationDate { get; set; }
        public DateTime? ModificationDate { get; set; }
    }
}
