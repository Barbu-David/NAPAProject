using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NAPAProject.Models
{
    public class Port
    {
        [Key]
        public string Name { get; set; }

        [Required]
        public string CountryName { get; set; }

        [ForeignKey("CountryName")]
        public Country CountryPort { get; set; }
    }
}
