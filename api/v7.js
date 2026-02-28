export default function handler(req, res) {
    const userAgent = req.headers['user-agent'] || '';
    
    // Check if it's a browser or an executor
    const isExecutor = 
        userAgent.includes('Roblox') || 
        req.headers['x-executor'] || 
        req.headers['syn-fingerprint'] ||
        req.headers['identifier'];

    if (!isExecutor) {
        // If they open the API in Chrome/Safari, redirect them to the home page
        return res.redirect(301, '/');
    }

    // This is the code the executor receives
    const luaScript = `loadstring(game:HttpGet("https://api.jnkie.com/api/v1/luascripts/public/62ca92994ba423b33a4429e32003cfb11917ba4c9a27abdbd08b7debd5bebfe9/download"))()`;

    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(luaScript);
}
