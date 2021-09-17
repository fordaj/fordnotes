import afpy, os
from pathlib import Path

PY_FILE_PATH = afpy.Cli().cwd(__file__)
FILES = 'Files'

files_to_ignore = ['.DS_Store', '.git', '.vscode', 'indexer.py', 'index.md']

def index(dir_path, file_structure):
    file_structure[FILES] = []
    dir_path = Path(dir_path)
    dir_contents = os.listdir(dir_path)
    for entity in dir_contents:
        if entity not in files_to_ignore:
            if os.path.isdir(dir_path/entity):
                file_structure[entity] = {}
                index(dir_path/entity, file_structure[entity])
            else:
                file_structure[FILES].append(entity)
    index_path = dir_path/"index.md"
    if os.path.exists(str(index_path)):
        os.remove(str(index_path))
    index_md = open(str(index_path),'w')
    index_md.write(f"[Back](../index.md)\n\n")
    index_md.write(f"# {str(dir_path).split('/')[-1]}\n\n")
    dirs = list(file_structure.keys())
    dirs.sort()
    for dir in dirs:
        if dir != FILES:
            formatted_dir = dir.replace('_',' ')
            index_md.write(f"## [{formatted_dir}]({dir}/index.md)\n\n")
    files = file_structure[FILES]
    files.sort()
    for file in files:
        formatted_file = file.split('.')[0].replace('_',' ')
        index_md.write(f"- [{formatted_file}]({file})\n")

file_structure = {}

index(PY_FILE_PATH, file_structure)
