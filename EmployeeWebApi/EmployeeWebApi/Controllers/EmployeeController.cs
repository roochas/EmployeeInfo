using EmployeeWebApi.Data;
using EmployeeWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        public EmployeeController(EmployeeDbContext employeeDbContext)
        {
            _context = employeeDbContext;
        }

        [HttpGet("GetAllEmployees")]
        public IActionResult GetAllEmployees()
        {
            var employees = _context.employeeModels.AsQueryable();
            return Ok(new
            { 
                StatusCode = 200,
                EmployeeDetails = employees
            });
        }

        [HttpGet("GetEmployeeById/(id)")]
        public IActionResult GetEmployeeById(int id)
        {
            var employee = _context.employeeModels.Find(id);
            if(employee == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }
            else
            {
                return Ok(new
                {
                    StatusCode = 200,
                    EmployeeDetail = employee
                });
            }
        }

        [HttpPost("CreateEmployee")]
        public IActionResult CreateEmployee([FromBody] EmployeeModel employeeObj)
        {
            try
            {
                if (employeeObj == null)
                {
                    return BadRequest();
                }
                else
                {
                    _context.employeeModels.Add(employeeObj);
                    _context.SaveChanges();
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Employee Added Successfully"
                    });
                }
            }
            catch(Exception e)
            {
                throw;
            }
        }

        [HttpPut("UpdateEmployeeInfo")]
        public IActionResult UpdateEmployeeInfo([FromBody] EmployeeModel employeeObj)
        {
            if(employeeObj == null)
            {
                return BadRequest();
            }
            var employee = _context.employeeModels.AsNoTracking().FirstOrDefault(x => x.employeeId == employeeObj.employeeId);
            if(employee == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message= "User Not Found"
                });
            }
            else
            {
                _context.Entry(employeeObj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                { 
                    StatusCode = 200,
                    Message = "Employee Updated Successfully"
                });
            }
        }

        [HttpDelete("RemoveEmployee/{id}")]
        public IActionResult RemoveEmployee(int id)
        {
            var employee = _context.employeeModels.Find(id);
            if(employee == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }
            else
            {
                _context.Remove(employee);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Employee Deleted"
                });
            }
        }
    }
}
