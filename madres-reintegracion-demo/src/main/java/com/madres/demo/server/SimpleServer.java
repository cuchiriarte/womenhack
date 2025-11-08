import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Paths;

public class SimpleServer {
    private static final String WEB_DIR = "web/";

    public static void main(String[] args) {
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
            server.createContext("/", new RootHandler());
            server.createContext("/marketplace", new MarketplaceHandler());
            server.createContext("/school", new SchoolHandler());
            server.setExecutor(null);
            server.start();
            System.out.println("Server started on port 8080");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    static class RootHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            serveFile(exchange, "landing.html");
        }
    }

    static class MarketplaceHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            serveFile(exchange, "marketplace/index.html");
        }
    }

    static class SchoolHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            serveFile(exchange, "school/index.html");
        }
    }

    private static void serveFile(HttpExchange exchange, String filePath) throws IOException {
        byte[] response = Files.readAllBytes(Paths.get(WEB_DIR + filePath));
        exchange.sendResponseHeaders(200, response.length);
        OutputStream os = exchange.getResponseBody();
        os.write(response);
        os.close();
    }
}