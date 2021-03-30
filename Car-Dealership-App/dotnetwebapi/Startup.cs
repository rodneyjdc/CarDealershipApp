  
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetwebapi.Data;
using dotnetwebapi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace dotnetwebapi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<CarDealershipDbContext>(options => options.UseSqlite(Configuration.GetConnectionString("CarDealershipDatabase")));
            services.AddScoped<IUserService, UserService>();
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "dotnetwebapi", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                InitializeDb(app.ApplicationServices);
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "dotnetwebapi v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public static void InitializeDb(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<CarDealershipDbContext>();

            if (context.Database.GetPendingMigrations().Any()) {
                context.Database.Migrate();
            }
            if (!context.Users.Any()) {
                context.Users.Add(new User { FirstName = "Frodo", LastName = "Baggins", Email = "frodo@theShire.net", Username = "frodobag", Password = "password", Role = "user" });
                context.Users.Add(new User { FirstName = "Steve", LastName = "Bishop", Email = "steve.bishop@galvanize.com", Username = "stevebis", Password = "password", Role = "user" });
                context.SaveChanges();
            }
        }
    }
}
