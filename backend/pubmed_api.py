import requests

def fetch_pubmed_articles(query, max_results=10):
    """Fetches articles from PubMed API."""
    url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
    params = {
        "db": "pubmed",
        "term": query,
        "retmax": max_results,
        "retmode": "json"
    }
    response = requests.get(url, params=params)
    data = response.json()

    articles = []
    for article_id in data["esearchresult"]["idlist"]:
        article_url = f"https://pubmed.ncbi.nlm.nih.gov/{article_id}"
        articles.append({"id": article_id, "link": article_url})

    return articles

if __name__ == "__main__":
    query = "blockchain"
    articles = fetch_pubmed_articles(query)
    print(articles)
