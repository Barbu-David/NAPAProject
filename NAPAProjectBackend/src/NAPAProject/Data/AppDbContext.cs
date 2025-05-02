// Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using NAPAProject.Models;

namespace NAPAProject.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // DbSets for each entity (table)
        public DbSet<Country> Countries { get; set; }
        public DbSet<Port>    Ports     { get; set; }
        public DbSet<Ship>    Ships     { get; set; }
        public DbSet<Voyage>  Voyages   { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Primary keys
            builder.Entity<Country>().HasKey(c => c.Name);
            builder.Entity<Port>().HasKey(p => p.Name);
            builder.Entity<Ship>().HasKey(s => s.Name);
            builder.Entity<Voyage>().HasKey(v => v.Id);

            // Port -> Country (many ports belong to one country)
            builder.Entity<Port>()
                   .HasOne<Country>(p => p.CountryPort)        // each Port has one Country
                   .WithMany()                        // Country does not need nav collection
                   .HasForeignKey(p => p.CountryName)     // FK property on Port
                   .OnDelete(DeleteBehavior.Cascade);

            // Voyage -> Departure Port (each voyage has one departure port)
            builder.Entity<Voyage>()
                   .HasOne<Port>(v => v.Departure)
                   .WithMany()                        // Port does not track departures
                   .HasForeignKey(v => v.DeparturePort)
                   .OnDelete(DeleteBehavior.Restrict);

            // Voyage -> Arrival Port (each voyage has one arrival port)
            builder.Entity<Voyage>()
                   .HasOne<Port>(v => v.Arrival)
                   .WithMany()                        // Port does not track arrivals
                   .HasForeignKey(v => v.ArrivalPort)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

