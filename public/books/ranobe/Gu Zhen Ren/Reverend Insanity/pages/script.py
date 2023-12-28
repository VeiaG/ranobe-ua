file_name = "page3.html"

with open(file_name, "r", encoding="utf-8") as file:
    input_html = file.read()

output_html = "\n\n".join([f"<p>{line.strip()}</p>" for line in input_html.split('\n') if line.strip()])

with open(file_name, "w", encoding="utf-8") as file:
    file.write(output_html)
