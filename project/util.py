import os
import ssl

import nltk
from nltk.corpus import stopwords, wordnet
from nltk.parse.stanford import StanfordParser
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from nltk.tree import *

# Download necessary NLTK packages
nltk.download("wordnet")
nltk.download("averaged_perceptron_tagger")
nltk.download("punkt")
nltk.download("stopwords")

# Allow unverified HTTPS context (if needed)
ssl._create_default_https_context = ssl._create_unverified_context

BASE_DIR = os.getcwd()
print("BASE_DIR:", BASE_DIR)

# Set up environment for Stanford Parser (adjust paths as needed)
os.environ["CLASSPATH"] = os.path.join(BASE_DIR, "stanford-parser-full-2018-10-17")
os.environ["STANFORD_MODELS"] = os.path.join(
    BASE_DIR,
    "stanford-parser-full-2018-10-17/edu/stanford/nlp/models/lexparser/englishPCFG.ser.gz",
)
os.environ["JAVAHOME"] = "C:\\Program Files\\Java\\jdk-16.0.1\\bin\\java.exe"
print("CLASSPATH:", os.environ.get("CLASSPATH"))


# --- New: Create mapping from filenames.txt ---
def create_sigml_mapping(mapping_file):
    mapping = {}
    with open(mapping_file, "r", encoding="utf-8") as f:
        for line in f:
            file_name = line.strip()  # e.g. "you.sigml"
            if file_name.lower().endswith(".sigml"):
                # Use the filename (without extension) as the key (in lower case)
                key = os.path.splitext(file_name)[0].lower()
                mapping[key] = file_name
    return mapping


# Create data_dict mapping from your filenames file
data_dict = create_sigml_mapping("filenames.txt")
# Now, for example, data_dict["you"] will be "you.sigml"

lemmatizer = WordNetLemmatizer()


def pos_tagger(nltk_tag):
    if nltk_tag.startswith("J"):
        return wordnet.ADJ
    elif nltk_tag.startswith("V"):
        return wordnet.VERB
    elif nltk_tag.startswith("N"):
        return wordnet.NOUN
    elif nltk_tag.startswith("R"):
        return wordnet.ADV
    else:
        return None


def label_parse_subtrees(parent_tree):
    tree_traversal_flag = {}
    for sub_tree in parent_tree.subtrees():
        tree_traversal_flag[sub_tree.treeposition()] = 0
    return tree_traversal_flag


def handle_noun_clause(i, tree_traversal_flag, modified_parse_tree, sub_tree):
    if (
        tree_traversal_flag[sub_tree.treeposition()] == 0
        and tree_traversal_flag[sub_tree.parent().treeposition()] == 0
    ):
        tree_traversal_flag[sub_tree.treeposition()] = 1
        modified_parse_tree.insert(i, sub_tree)
        i += 1
    return i, modified_parse_tree


def handle_verb_prop_clause(i, tree_traversal_flag, modified_parse_tree, sub_tree):
    for child_sub_tree in sub_tree.subtrees():
        if child_sub_tree.label() == "NP" or child_sub_tree.label() == "PRP":
            if (
                tree_traversal_flag[child_sub_tree.treeposition()] == 0
                and tree_traversal_flag[child_sub_tree.parent().treeposition()] == 0
            ):
                tree_traversal_flag[child_sub_tree.treeposition()] = 1
                modified_parse_tree.insert(i, child_sub_tree)
                i += 1
    return i, modified_parse_tree


def getISL(sentence):
    filtered_sentence = remove_stop_words(sentence)
    tokens = convert_eng_to_isl(filtered_sentence)
    links = []
    default_file = "0.sigml"  # Ensure you have a default.sigml in static/signs/
    for token in tokens:
        token_lower = token.lower().strip()
        if token_lower in data_dict:
            links.append(data_dict[token_lower])
            print(f"Mapping found for '{token_lower}': {data_dict[token_lower]}")
        else:
            for letter in token_lower:
                if letter in data_dict:
                    links.append(data_dict[letter])
                    print(
                        f"Mapping found for '{letter}': {data_dict[letter]}"
                    )
                else:
                    links.append(default_file)
    return tokens, links


def modify_tree_structure(parent_tree):
    tree_traversal_flag = label_parse_subtrees(parent_tree)
    modified_parse_tree = Tree("ROOT", [])
    i = 0
    for sub_tree in parent_tree.subtrees():
        if sub_tree.label() == "NP":
            i, modified_parse_tree = handle_noun_clause(
                i, tree_traversal_flag, modified_parse_tree, sub_tree
            )
        if sub_tree.label() == "VP" or sub_tree.label() == "PRP":
            i, modified_parse_tree = handle_verb_prop_clause(
                i, tree_traversal_flag, modified_parse_tree, sub_tree
            )
    for sub_tree in parent_tree.subtrees():
        for child_sub_tree in sub_tree.subtrees():
            if len(child_sub_tree.leaves()) == 1:
                if (
                    tree_traversal_flag[child_sub_tree.treeposition()] == 0
                    and tree_traversal_flag[child_sub_tree.parent().treeposition()] == 0
                ):
                    tree_traversal_flag[child_sub_tree.treeposition()] = 1
                    modified_parse_tree.insert(i, child_sub_tree)
                    i += 1
    return modified_parse_tree


def remove_stop_words(sentence):
    sentence = sentence.lower()
    pos_tagged = nltk.pos_tag(nltk.word_tokenize(sentence))
    print("POS Tagged:", pos_tagged)
    remove_tags = ["TO", "POS", "MD", "FW", "CC", "JJR", "JJS", "UH", "RP", "SYM", "IN"]
    lemmatized_sentence = []
    for word, tag in pos_tagged:
        if word in ["a", "an", "the", "is"]:
            continue
        if tag in remove_tags:
            continue
        lemmatized_sentence.append(word)
    pos_tagged = nltk.pos_tag(nltk.word_tokenize(" ".join(lemmatized_sentence)))
    wordnet_tagged = list(map(lambda x: (x[0], pos_tagger(x[1])), pos_tagged))
    print("WordNet Tagged:", wordnet_tagged)
    lemmatized_sentence1 = []
    for word, tag in wordnet_tagged:
        if tag is None:
            lemmatized_sentence1.append(word)
        else:
            lemmatized_sentence1.append(lemmatizer.lemmatize(word, tag))
    return " ".join(lemmatized_sentence1)


def convert_eng_to_isl(input_string):
    tokens = input_string.split()
    if len(tokens) == 1:
        return tokens
    parser = StanfordParser()
    possible_parse_tree_list = [tree for tree in parser.parse(tokens)]
    parse_tree = possible_parse_tree_list[0]
    print(parse_tree.pretty_print())
    parent_tree = ParentedTree.convert(parse_tree)
    print(parent_tree.pretty_print())
    modified_parse_tree = modify_tree_structure(parent_tree)
    print(modified_parse_tree.pretty_print())
    return modified_parse_tree.leaves()


# def getISL(sentence):
#     filtered_sentence = remove_stop_words(sentence)
#     tokens = convert_eng_to_isl(filtered_sentence)
#     links = []
#     for token in tokens:
#         token_lower = token.lower()
#         if token_lower in data_dict:
#             # Directly use the corresponding sigml filename
#             links.append(data_dict[token_lower])
#         else:
#             # Optionally, handle tokens not found (e.g., skip or attempt splitting)
#             pass
#     return tokens, links

# For testing:
# if __name__ == '__main__':
#     para = "You hi how be"
#     print(getISL(para))
