package com.example.docgenerator.service;



import jakarta.servlet.http.HttpServletResponse;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Component
public class GeneratePdf {

    public void generateDoc(List<Map<String, Object>> requests, HttpServletResponse response) {
        try (PDDocument document = new PDDocument()) {
            for (Map<String, Object> request : requests) {
                PDPage page = new PDPage();
                document.addPage(page);


                try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                    contentStream.setFont(PDType1Font.COURIER, 12);
                    contentStream.beginText();
                    contentStream.newLineAtOffset(50, 700);

                    // Writing text line by line
                    writeMultilineText(contentStream, "Description: " + request.getOrDefault("name", "N/A"));
                    writeMultilineText(contentStream, "EndPoint: " + request.getOrDefault("url", "N/A"));
                    writeMultilineText(contentStream, "Method Type: " + request.getOrDefault("method", "N/A"));
                    writeMultilineText(contentStream, "Payload: " + request.getOrDefault("payload", "N/A"));
                    writeMultilineText(contentStream, "Headers: " + formatHeaders(request.get("headers")));
                    writeMultilineText(contentStream, "Response: " + request.getOrDefault("response", "N/A"));

                    contentStream.endText();
                }
            }

            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=APIDocumentation.pdf");
            document.save(response.getOutputStream());
            response.getOutputStream().flush();

        }
        catch (IOException e) {
            throw new RuntimeException("Error generating PDF", e);
        }
    }


    private void writeMultilineText(PDPageContentStream contentStream, String text) throws IOException {
        int maxWidth = 80;
        String[] lines = text.split("\n");
        for (String line : lines) {
            while (line.length() > maxWidth) {
                contentStream.showText(line.substring(0, maxWidth));
                contentStream.newLineAtOffset(0, -20);
                line = line.substring(maxWidth);
            }
            contentStream.showText(line);
            contentStream.newLineAtOffset(0, -20);
        }
    }


    private String formatHeaders(Object headers) {
        if (headers instanceof Map<?, ?>) {
            StringBuilder formatted = new StringBuilder();
            for (Map.Entry<?, ?> entry : ((Map<?, ?>) headers).entrySet()) {
                formatted.append(entry.getKey()).append(": ").append(entry.getValue()).append("; ");
            }
            return formatted.toString();
        }
        return headers != null ? headers.toString() : "N/A";
    }

}