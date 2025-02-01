import requests
from bs4 import BeautifulSoup
import json

def parse_pubmed(query):
    """Parses PubMed for articles related to the given query."""
    url = f"https://pubmed.ncbi.nlm.nih.gov/?term={query}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    articles = []
    for entry in soup.find_all('div', class_='docsum-content'):
        title = entry.find('a', class_='docsum-title').text.strip()
        link = "https://pubmed.ncbi.nlm.nih.gov" + entry.find('a', class_='docsum-title')['href']
        articles.append({"title": title, "link": link})

    return articles

def parse_arxiv(query):
    """Parses arXiv for articles related to the given query."""
    url = f"http://export.arxiv.org/api/query?search_query=all:{query}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'xml')

    articles = []
    for entry in soup.find_all('entry'):
        title = entry.title.text.strip()
        link = entry.id.text.strip()
        articles.append({"title": title, "link": link})

    return articles

if __name__ == "__main__":
    query = "blockchain"
    pubmed_results = parse_pubmed(query)
    arxiv_results = parse_arxiv(query)

    with open("parsed_data.json", "w") as f:
        json.dump({"pubmed": pubmed_results, "arxiv": arxiv_results}, f, indent=4)

    print("Data parsed and saved to parsed_data.json")
