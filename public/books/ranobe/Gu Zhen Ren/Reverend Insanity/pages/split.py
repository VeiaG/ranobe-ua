input_file_name = "text.txt"
output_file_prefix = "output_text_chunk_"
chunk_size = 4500

with open(input_file_name, "r", encoding="utf-8") as input_file:
    content = input_file.read()

# Розділити текст на куски не більше 4500 символів
chunks = [content[i:i+chunk_size] for i in range(0, len(content), chunk_size)]

# Зберегти кожен кусок у окремий файл
for i, chunk in enumerate(chunks):
    output_file_name = f"{output_file_prefix}{i+1}.txt"
    with open(output_file_name, "w", encoding="utf-8") as output_file:
        output_file.write(chunk)
