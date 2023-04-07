using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.BL
{
    public class Contact
    {
        public int ContactID { get; set; }
        public int UserId { get; set; }
        public string ?FacebookUrl { get; set; }
        public string ?LinkedInUrl { get; set; }
        public string ?WhatsAppNumber { get; set; }
        public string ?PhoneNumber { get; set; }
        public string ?Email { get; set; }
        public string ?FaxNumber { get; set;}
        public string ?HomePhone { get; set; }


    }
}
