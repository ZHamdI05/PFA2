using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ML;
namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatbotController : ControllerBase
    {

        private static MLContext mlContext = new MLContext();

        ITransformer loadedModel = mlContext.Model.Load("C:\\Users\\Asus\\Desktop\\fasttextmodel", out var modelSchema);

      
    }

}
