<%@page import="com.gnostice.pdfone.PDFOne" %>
<%@page import="com.gnostice.pdfone.PdfDocument" %>
<%@page import="com.gnostice.pdfone.fonts.PdfFont" %>
<%@page import="java.awt.Color" %>
<%
// Activate your license
PDFOne.activate("your-pdfone-activation-key",
"your-pdfone-product-key");
try {
// Create a new PDF document
PdfDocument doc = new PdfDocument();

// Access the default font and modify it
PdfFont defaultFont = doc.getFont();
defaultFont.setStyle(PdfFont.STROKE_AND_FILL);
defaultFont.setSize(60);
defaultFont.setStrokeColor(Color.RED);
defaultFont.setStrokeWidth(2);
defaultFont.setColor(Color.YELLOW);

// Prepare the browser
response.setContentType("application/pdf");
response.setBufferSize(2000);

// Set PDF version to 1.4 for backward compatibility
doc.setVersion(PdfDocument.VERSION_1_4);

// Render text on the first page
doc.writeText("Hello, World!", 100, 100);

// Save the document to the browser
doc.save(response.getOutputStream());

// Close the document
doc.close();

// Close the browser output
response.flushBuffer();
} catch (Exception e) {
out.println("Sorry, an error occurred " + e.getMessage() );
}
%>