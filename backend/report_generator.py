import json
from fpdf import FPDF

def generate_report(data, output_file="report.pdf"):
    """Generates a PDF report based on analyzed scientific data."""
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    for article in data:
        pdf.cell(200, 10, txt=article["title"], ln=True)
        pdf.cell(200, 10, txt=article["summary"], ln=True)
        pdf.cell(200, 10, txt="-" * 50, ln=True)

    pdf.output(output_file)

if __name__ == "__main__":
    with open("analyzed_data.json", "r") as f:
        data = json.load(f)

    generate_report(data)
    print("Report generated and saved to report.pdf")
