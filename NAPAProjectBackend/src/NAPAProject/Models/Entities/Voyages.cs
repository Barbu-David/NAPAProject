using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NAPAProject.Models
{
    public class Voyage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public DateOnly Date { get; set; }

        [Required]
        public string DeparturePort { get; set; }

        [ForeignKey(nameof(DeparturePort))]
        public Port Departure { get; set; }

        [Required]
        public string ArrivalPort { get; set; }

        [ForeignKey(nameof(ArrivalPort))]
        public Port Arrival { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
    }
}
