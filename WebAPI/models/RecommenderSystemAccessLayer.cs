
using Microsoft.AspNetCore.Mvc;
using Microsoft.Scripting.Hosting;
using Python.Included;
using Python.Runtime;
using System.IO;
using static IronPython.Modules.PythonThread;

namespace WebAPI.models
{
  public static class RecommenderSystemAccessLayer
  {
    public static async Task<string> ExecuteAsync()
    {
      Runtime.PythonDLL = @"C:\Users\Asus\AppData\Local\Programs\Python\Python311\python311.dll";
      string pathToVirtualEnv = @"C:\Users\Asus\AppData\Local\Programs\Python\Python311";
      Environment.SetEnvironmentVariable("PATH", pathToVirtualEnv, EnvironmentVariableTarget.Process);
      Environment.SetEnvironmentVariable("PYTHONHOME", pathToVirtualEnv, EnvironmentVariableTarget.Process);
      Environment.SetEnvironmentVariable("PYTHONPATH", $"{pathToVirtualEnv}\\Lib\\site-packages;{pathToVirtualEnv}\\Lib", EnvironmentVariableTarget.Process);
      PythonEngine.PythonHome = pathToVirtualEnv;
      PythonEngine.PythonPath = Environment.GetEnvironmentVariable("PYTHONPATH", EnvironmentVariableTarget.Process);
      //PythonEngine.BeginAllowThreads();
      PythonEngine.Initialize();

      string res = "";
      //string code = "y ='Hello, world!'";

      /*using (Py.GIL())
      {
        var scope = Py.CreateScope();
        scope.Set("x", 10);
        scope.Exec(code);
        dynamic result = scope.Get("y").As<string>(); 
        Console.WriteLine(result); // print the value of result to console
      }*/

      using (Py.GIL())
      {
        string filePath = @"models/model.py";

        // read the entire file as a string
        string code = File.ReadAllText(filePath);

        // execute the code in a new scope
        var scope = Py.CreateScope();
        scope.Set("KNN",1);
        scope.Exec(code);

        // access any variables or functions defined in the code
        dynamic result = scope.Get("result").As<string>();
        Console.WriteLine(result); // print the result to console
      }






      return res;
    } 

  }
}
