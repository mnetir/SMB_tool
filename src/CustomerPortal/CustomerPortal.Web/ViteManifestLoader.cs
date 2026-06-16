using System.Text.Json;
using System.Text.Json.Serialization;

namespace CustomerPortal.Web;

public class ViteManifestEntry
{
    [JsonPropertyName("file")]
    public string File { get; set; } = string.Empty;

    [JsonPropertyName("css")]
    public List<string>? Css { get; set; }

    [JsonPropertyName("isEntry")]
    public bool IsEntry { get; set; }
}

public static class ViteManifestLoader
{
    public static async Task<Dictionary<string, ViteManifestEntry>?> LoadAsync(IWebHostEnvironment env)
    {
        var path = Path.Combine(env.WebRootPath, "dist", ".vite", "manifest.json");
        if (!File.Exists(path))
            path = Path.Combine(env.WebRootPath, "dist", "manifest.json");
        if (!File.Exists(path))
            return null;

        var json = await File.ReadAllTextAsync(path);
        return JsonSerializer.Deserialize<Dictionary<string, ViteManifestEntry>>(json);
    }
}