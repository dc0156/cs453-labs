import http from "node:http";

const HOST = process.env.HOST ?? "127.0.0.1";
const PORT = Number(process.env.PORT ?? 3000);

let requestCount = 0;

function sendJson(res, statusCode, body) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });
    res.end(JSON.stringify(body));
}

function readRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                resolve(body.length ? JSON.parse(body) : {});
            } catch {
                reject(new Error("Invalid JSON"));
            }
        });

        req.on("error", reject);
    });
}

export function resetState() {
    requestCount = 0;
}

export function handleCalculate(body) {
    const { operation, a, b } = body;

    if (!operation || a === undefined || b === undefined) {
        return {
            statusCode: 400,
            response: { error: "Missing required fields" }
        };
    }

    if (typeof a !== "number" || typeof b !== "number") {
        return {
            statusCode: 400,
            response: { error: "a and b must be numbers" }
        };
    }

    switch (operation) {
        case "add":
            return {
                statusCode: 200,
                response: { result: a + b }
            };

        case "subtract":
            return {
                statusCode: 200,
                response: { result: a - b }
            };

        case "multiply":
            return {
                statusCode: 200,
                response: { result: a * b }
            };

        case "divide":
            if (b === 0) {
                return {
                    statusCode: 400,
                    response: { error: "Division by zero" }
                };
            }

            return {
                statusCode: 200,
                response: { result: a / b }
            };

        default:
            return {
                statusCode: 400,
                response: { error: "Unsupported operation" }
            };
    }
}

export async function requestHandler(req, res) {
    requestCount++;

    const method = req.method;
    const url = new URL(req.url, `http://${req.headers.host}`);

    try {
        if (method === "GET" && url.pathname === "/health") {
            return sendJson(res, 200, { status: "ok" });
        }

        if (method === "GET" && url.pathname === "/requests") {
            return sendJson(res, 200, { count: requestCount });
        }

        if (method === "POST" && url.pathname === "/echo") {
            const body = await readRequestBody(req);
            return sendJson(res, 200, body);
        }

        if (method === "POST" && url.pathname === "/calculate") {
            const body = await readRequestBody(req);
            const result = handleCalculate(body);
            return sendJson(res, result.statusCode, result.response);
        }

        return sendJson(res, 404, { error: "Not found" });
    } catch (err) {
        if (err.message === "Invalid JSON") {
            return sendJson(res, 400, { error: "Invalid JSON" });
        }

        return sendJson(res, 500, { error: "Internal server error" });
    }
}

export function createServer() {
    return http.createServer(requestHandler);
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const server = createServer();

    server.listen(PORT, HOST, () => {
        console.log(`HTTP JSON server listening on http://${HOST}:${PORT}`);
    });
}