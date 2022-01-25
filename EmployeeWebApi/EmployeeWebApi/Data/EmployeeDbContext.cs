using EmployeeWebApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeWebApi.Data
{
    public class EmployeeDbContext: DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext>options):base(options)
        {

        }

        public DbSet<EmployeeModel> employeeModels { get; set; }
        public DbSet<UserModel> userModels { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeModel>().ToTable("tblEmployee");
            modelBuilder.Entity<UserModel>().ToTable("tblUser");
        }
    }
}





//OnModelCreating helped us to mapped the entity to the table