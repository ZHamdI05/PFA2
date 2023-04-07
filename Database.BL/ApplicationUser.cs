
namespace Database.BL
{
    public class ApplicationUser 
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public byte[]? ProfilePicture { get; set; }
        public DateTime ?BirthDay { get; set; }
        public byte[]? CvFileData { get; set; }
        public string ?Biography { get; set; }
        public Contact? Contact { get; set; } = new Contact();
    }
}
