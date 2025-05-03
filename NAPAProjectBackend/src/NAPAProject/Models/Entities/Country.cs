using System.ComponentModel.DataAnnotations;

namespace NAPAProject.Models
{
    public class Country
    {

        [Key]
        public string Name { get; set; }

        [Required]
        public bool Visited { get; set; }
    }
}
