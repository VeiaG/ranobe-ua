import os
import re

def split_text_into_chunks(text, chunk_size):
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
    chunks = []
    current_chunk = ""

    for sentence in sentences:
        if len(current_chunk) + len(sentence) <= chunk_size:
            current_chunk += sentence + " "
        else:
            chunks.append(current_chunk.strip())
            current_chunk = sentence + " "

    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks

def read_chunks_from_files(file_prefix):
    chunks = []
    i = 1

    while True:
        chunk_file_name = f"{file_prefix}{i}.txt"
        if os.path.exists(chunk_file_name):
            with open(chunk_file_name, "r", encoding="utf-8") as chunk_file:
                chunk_content = chunk_file.read()
                chunks.append(chunk_content)
            i += 1
        else:
            break

    return chunks

def process_page(input_file_name, chunk_size):
    output_file_prefix = f"output_page_chunk_"

    with open(input_file_name, "r", encoding="utf-8") as input_file:
        content = input_file.read()

    # Розділити текст на куски не більше 4500 символів, уникати обрізання в середині речення
    chunks = split_text_into_chunks(content, chunk_size)

    # Зберегти кожен кусок у окремий файл
    for i, chunk in enumerate(chunks):
        output_file_name = f"{output_file_prefix}{i+1}.txt"
        with open(output_file_name, "w", encoding="utf-8") as output_file:
            output_file.write(chunk)

    # Введення номеру сторінки для об'єднання кусків
    output_page_number = input("Введіть номер сторінки для об'єднання кусків (page.page): ")

    # Прочитати куски з файлів перед об'єднанням
    chunks = read_chunks_from_files(output_file_prefix)


    # Об'єднати куски та записати в обрану сторінку
    output_lines = [f"<p>{line.strip()}</p>" for line in "\n".join(chunks).split('\n') if line.strip()]
    output_content = "\n".join(output_lines)
    output_file_name = f"page{output_page_number}.page"
    with open(output_file_name, "w", encoding="utf-8") as output_file:
        output_file.write(output_content)

    # Видалити файли кусків
    for i in range(1, len(chunks) + 1):
        chunk_file_name = f"{output_file_prefix}{i}.txt"
        if os.path.exists(chunk_file_name):
            os.remove(chunk_file_name)

if __name__ == "__main__":
    input_file_name = "text.txt"
    chunk_size = 4500

    process_page(input_file_name, chunk_size)
