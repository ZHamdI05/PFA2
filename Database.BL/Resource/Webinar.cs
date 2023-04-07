using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.BL.Resource
{
    public class Webinar
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string PresenterName { get; set; }
        public string PresenterBio { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public string TimeZone { get; set; }
        public string Link { get; set; }
    }

}
