import json
from transformers import pipeline

def analyze_data(file_path):
    """Analyzes scientific data using an AI summarization model."""
    with open(file_path, "r") as f:
        data = json.load(f)

    summarizer = pipeline("summarization")
    results = []

    for article in data.get("pubmed", []):
        summary = summarizer(article["title"], max_length=50, min_length=25, do_sample=False)
        results.append({"title": article["title"], "summary": summary[0]["summary_text"]})

    return results

if __name__ == "__main__":
    analyzed_data = analyze_data("parsed_data.json")
    with open("analyzed_data.json", "w") as f:
        json.dump(analyzed_data, f, indent=4)

    print("Data analyzed and saved to analyzed_data.json")
