using Database.BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.ML;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Completions;
using OpenAI_API.Models;
using OpenAI_API.Moderation;
using WebAPI.models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class ChatbotController : ControllerBase
    {

    //private static MLContext mlContext = new MLContext();

    //ITransformer loadedModel = mlContext.Model.Load("C:\\Users\\Asus\\Desktop\\fasttextmodel", out var modelSchema);

    [HttpGet] // Get project by Id
    public async Task<IActionResult> GetAnswer(IValue valeur)
    {
      string question ;
      question = valeur.Value ;
      string ap = "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";
      OpenAIAPI api = new OpenAIAPI(ap);
      
      var result = await api.Chat.CreateChatCompletionAsync(new ChatRequest()
      {
        Model = Model.ChatGPTTurbo,
        Temperature = 0.1,
        MaxTokens = 50,
        Messages = new ChatMessage[] {
      new ChatMessage(ChatMessageRole.User, "Aider les jeunes entrepreneurs en Tunisie à lancer leurs projets et startup et leurs entreprises,repondre a cette question dans ce contexte: (ne repondre que à des questions dans ce contexte;pour d'autres questions qui sont hors sujet repondre par je ne sais pas repondre a cette question)"+question)
    }
      });
        var reply = result.ToString();
      IValue value = new IValue();
      value.Id=0;
      value.Value = reply;
      return Ok(value);
    }

  }

}
