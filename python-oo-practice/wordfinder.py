"""Word Finder: finds random words from a dictionary."""
import random


class WordFinder:
    """Utility that can manipulate words given a .txt file"""

    def __init__(self, file):
        """Instance of the class that stores the words in file into a self array"""
        self.file = file
        self.words = []
        self.unpack_words()
        self.num_words = len(self.words)
        print(f"{self.num_words} words read")

    def unpack_words(self):
        """Helper function to unpack file.txt and return as an array"""
        file = open(self.file)
        for line in file:
            line = line.replace('\n', '')
            self.words.append(line)

    def random(self):
        "Returns a random word from the words array"
        index = random.randint(0, self.num_words - 1)
        return self.words[index]

    def print_words(self):
        """Print the contents of the words array"""
        for i in self.words:
            print(i)


class TheRandomWordFinder(WordFinder):
    """Subclass of the WordFinder the ignores comments and blank lines"""

    def __init__(self, file):
        """Initiate the subclass of the new WordFinder"""
        super().__init__(file)
        self.clean_up()
        print("Cleaning...")
        print(f"{self.num_words} words left after cleaning")

    def clean_up(self):
        """Remove words or lines that are comments/empty lines"""
        self.words = [word for word in self.words if word and not word.startswith(
            '#') and not len(word) == 0]
        self.num_words = len(self.words)


def main():
    wf = TheRandomWordFinder("words2.txt")
    wf.print_words()


if __name__ == "__main__":
    main()
