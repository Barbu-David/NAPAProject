using System.ComponentModel.DataAnnotations;

namespace NAPAProject.Models
{
    public class Ship
    {
        [Key]
        public string Name { get; set; }

        [Required]
        public int Speed { get; set; }
    }
}