import json
import csv
import os

class ArabicCSVsManager:
    def __init__(self) -> None:
        self.path = os.getcwd()
        self.arabicFolderPath = os.path.join("public", "arabic")

        self.wordsListsFileName = os.path.join(self.path, "WordsLists.csv")
        self.verbsConjugationFileName = os.path.join(self.path, "VerbsConjugation.csv")

        self.wordsListsPath = os.path.join(self.arabicFolderPath, "words")
        self.verbsConjugationPath = os.path.join(self.arabicFolderPath, "verbs", "all_verbs.json")

        self.emptyConjugation = {
            "i": "",
            "you_m": "",
            "you_f": "",
            "he": "",
            "she": "",
            "they": "",
            "we": ""
        }

    def verbsListCSVMaker(self):
        with open(self.verbsConjugationPath, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)

        with open(os.path.join(self.arabicFolderPath, self.verbsConjugationFileName), 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)

            for verb_data in data:
                present_conjugations = verb_data["conjugations"].get("present", self.emptyConjugation)
                past_conjugations = verb_data["conjugations"].get("past", self.emptyConjugation)
                future_conjugations = verb_data["conjugations"].get("future", self.emptyConjugation)

                writer.writerow([verb_data["english"], verb_data["arabic"]])
                writer.writerow(["Past", "Present", "Future", ""])

                pronouns = ['I', 'You (m)', 'You (f)', 'He', 'She', 'They', 'We']
                for past, present, future, pronoun in zip(past_conjugations.values(), present_conjugations.values(), future_conjugations.values(), pronouns):
                    writer.writerow([past, present, future, pronoun])

                writer.writerow([])
                writer.writerow([])

    def csvToJson(self, csv_path):
        data = []
        with open(csv_path, 'r', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                if len(row) == 0:
                    continue
                if row[0] == "Past":
                    continue
                if len(row) == 1:  # New verb entry
                    verb_data = {"english": row[0], "arabic": row[1], "conjugations": {"present": {}, "past": {}, "future": {}}}
                    data.append(verb_data)
                else:
                    verb_data["conjugations"]["past"]["i"] = row[0]
                    verb_data["conjugations"]["present"]["i"] = row[1]
                    verb_data["conjugations"]["future"]["i"] = row[2]
                    verb_data["conjugations"]["past"]["you_m"] = row[3]
                    verb_data["conjugations"]["present"]["you_m"] = row[4]
                    verb_data["conjugations"]["future"]["you_m"] = row[5]
                    verb_data["conjugations"]["past"]["you_f"] = row[6]
                    verb_data["conjugations"]["present"]["you_f"] = row[7]
                    verb_data["conjugations"]["future"]["you_f"] = row[8]
                    verb_data["conjugations"]["past"]["he"] = row[9]
                    verb_data["conjugations"]["present"]["he"] = row[10]
                    verb_data["conjugations"]["future"]["he"] = row[11]
                    verb_data["conjugations"]["past"]["she"] = row[12]
                    verb_data["conjugations"]["present"]["she"] = row[13]
                    verb_data["conjugations"]["future"]["she"] = row[14]
                    verb_data["conjugations"]["past"]["they"] = row[15]
                    verb_data["conjugations"]["present"]["they"] = row[16]
                    verb_data["conjugations"]["future"]["they"] = row[17]
                    verb_data["conjugations"]["past"]["we"] = row[18]
                    verb_data["conjugations"]["present"]["we"] = row[19]
                    verb_data["conjugations"]["future"]["we"] = row[20]

        return data

manager = ArabicCSVsManager()
json_data = manager.csvToJson("VerbsConjugation.csv")
print(json.dumps(json_data, indent=4, ensure_ascii=False))

# manager = ArabicCSVsManager()
# manager.verbsListCSVMaker()
