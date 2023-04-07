

namespace Database.BL
{
    public class Project
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string Description { get; set; }
        public string ?Status { get; set; }
        public DateTime ?CreatedOn { get; set; }
        public float ?Budget { get; set; }
        public string ?Region { get; set; }
        public string ? Industry { get; set; }
        public string ? Sector { get; set; }




    }
}
