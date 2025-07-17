import csv
import os

class CSVReader:

    @staticmethod
    def read(csvPath: str) -> list[list[str]]:
        
        """Read CSV file and return as matrix (list of lists)"""
        if not os.path.exists(csvPath):
            raise FileNotFoundError(f"CSV file not found: {csvPath}")
        
        matrix = []
        with open(csvPath, mode='r', encoding='utf-8') as file:
            csv_reader = csv.reader(file)
            for row in csv_reader:
                matrix.append(row)
        
        return matrix

