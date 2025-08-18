import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse


def get_all_links(url):
    """
    Crawls a given URL and returns all unique internal links.
    """
    urls = set()
    domain_name = urlparse(url).netloc

    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, "html.parser")

        for a_tag in soup.findAll("a"):
            href = a_tag.attrs.get("href")
            if href == "" or href is None:
                continue

            # Join relative URLs with the base URL
            href = urljoin(url, href)
            parsed_href = urlparse(href)

            # Ensure the link is on the same domain
            if domain_name in parsed_href.netloc:
                urls.add(href)

    except Exception as e:
        print(f"Error crawling {url}: {e}")

    return urls


def generate_sitemap(base_url, output_file="sitemap.xml"):
    """
    Generates an XML sitemap for a given base URL.
    """
    all_site_links = set()
    to_crawl = {base_url}

    while to_crawl:
        url = to_crawl.pop()
        if url not in all_site_links:
            print(f"Crawling: {url}")
            all_site_links.add(url)
            new_links = get_all_links(url)
            to_crawl.update(new_links - all_site_links)

    # Start building the XML content
    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    for link in sorted(list(all_site_links)):
        xml_content += "  <url>\n"
        xml_content += f"    <loc>{link}</loc>\n"
        xml_content += "    <changefreq>monthly</changefreq>\n"
        xml_content += "    <priority>0.8</priority>\n"
        xml_content += "  </url>\n"

    xml_content += "</urlset>"

    # Write the content to the output file
    with open(output_file, "w") as f:
        f.write(xml_content)

    print(f"\nSitemap generated successfully! Saved as {output_file}")
    print(f"Found {len(all_site_links)} URLs.")


# --- Execute the script ---
if __name__ == "__main__":
    website_url = "https://databuddy.us"
    generate_sitemap(website_url)
