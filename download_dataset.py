import urllib.request

url = "https://raw.githubusercontent.com/soumyachak/Sucker-Rod-Pump-Dowhole-Dynagraph/master/pump_data.csv"
output_path = "pump_data.csv"

try:
    print(f"Downloading {url} to {output_path}...")
    urllib.request.urlretrieve(url, output_path)
    print("Download successful.")
except Exception as e:
    print(f"Failed to download: {e}")
