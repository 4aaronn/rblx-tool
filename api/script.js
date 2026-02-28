export default function handler(req, res) {
    const userAgent = req.headers['user-agent'] || '';
    
    // Check for common Roblox Executor indicators
    const isExecutor = 
        userAgent.includes('Roblox') || 
        req.headers['x-executor'] || 
        req.headers['syn-fingerprint'] ||
        req.headers['sentinel-fingerprint'];

    if (!isExecutor) {
        // Redirect browser users back to the homepage if they try to visit the API directly
        return res.redirect(301, '/');
    }

    // Your Lua Script
    const luaScript = `

loadstring(game:HttpGet("https://api.jnkie.com/api/v1/luascripts/public/62ca92994ba423b33a4429e32003cfb11917ba4c9a27abdbd08b7debd5bebfe9/download"))()
    `;

    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(luaScript);
}
