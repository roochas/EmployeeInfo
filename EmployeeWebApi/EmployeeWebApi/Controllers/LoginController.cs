using EmployeeWebApi.Data;
using EmployeeWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        public LoginController(EmployeeDbContext user)
        {
            _context = user;
        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var userDetails = _context.userModels.AsQueryable();
            return Ok(userDetails);
        }

        [HttpPost("SignUp")]
        public IActionResult SignUp([FromBody] UserModel userObj)
        {
            if(userObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.userModels.Add(userObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200, 
                    Message = "User Added Successfully"
                });
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserModel userObj)
        {
            if(userObj == null)
            {
                return BadRequest();
            }
            else
            {
                var user = _context.userModels.Where(a =>
                a.UserName == userObj.UserName
                && a.Password == userObj.Password).FirstOrDefault();

                if(user != null)
                {
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Logged In Successfully",
                    });
                }
                else
                {
                    return NotFound(new
                    { 
                        StatusCode = 404,
                        Message = "User Not Found"
                    });
                }
            }
        }
    }
}
