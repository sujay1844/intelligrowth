import langchain
from langchain.text_splitter import RecursiveCharacterTextSplitter
import sys
print(sys.prefix)

class TextSplitter:
    def __init__(self, chunk_size, chunk_overlap, text):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.text = text

    def split_text(self):
        rec_text_splitter = RecursiveCharacterTextSplitter(chunk_size=self.chunk_size, chunk_overlap=self.chunk_overlap, length_function=len)
        chunks = rec_text_splitter.split_text(self.text)
        for i, _ in enumerate(chunks):
            print(chunks[i])
            print('-----------------------')

text = '''The process of transformation of things available in our environment involves an interactive relationship between nature,
technology and institutions. Human beings interact with nature through technology and create institutions to accelerate their
economic development. Do you think that resources are free gifts of nature as is assumed by many? They are not. Resources are a function of
human activities. Human beings themselves are essential components of resources. They transform material available in our
environment into resources and use them. These resources can be classified in the following ways –'''
chunk_size = 500
chunk_overlap = 0

text_splitter = TextSplitter(chunk_size, chunk_overlap, text)
text_splitter.split_text()

