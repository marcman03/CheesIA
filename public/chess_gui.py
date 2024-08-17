import tkinter as tk
import json
import time
import os
from PIL import Image, ImageTk

class App():
    def __init__(self, L_SQUARE):
        self.L_SQUARE = L_SQUARE
        self.images = {}
        self.board = tk.Tk()
        self.board.title("Chess GUI")
        self.board.geometry(f"{str(L_SQUARE * 8)}x{str(L_SQUARE * 8)}")
        self.board.resizable(0, 0)
        self.gui = tk.Canvas(self.board)
        self.gui.pack(fill="both", expand=True)
        self.loadImages()
        self.drawBoard()

    def __call__(self):
        self.board.after(500, self.updateBoard)  # Llama a updateBoard después de que la ventana se haya creado
        self.board.mainloop()

    def drawBoard(self):
        for i in range(8):
            for j in range(8):
                color = "#dfc07f" if (i + j) % 2 == 0 else "#7a4f37"
                self.gui.create_rectangle(i * self.L_SQUARE, j * self.L_SQUARE, 
                                          (i + 1) * self.L_SQUARE, (j + 1) * self.L_SQUARE, 
                                          fill=color)

    def loadImages(self):
        pieces = ["wr", "wn", "wb", "wq", "wk", "wp", 
                  "br", "bn", "bb", "bq", "bk", "bp"]
        for piece in pieces:
            image = Image.open(f"public/images/{piece}.png")
            image = image.resize((self.L_SQUARE, self.L_SQUARE), Image.Resampling.LANCZOS)
            self.images[piece] = ImageTk.PhotoImage(image)

    def updateBoard(self):
        if not self.gui.winfo_exists():
            return  # Verifica si el Canvas existe antes de continuar
        filepath = os.path.join("src", "players", "board_state.json")
        with open(filepath, "r") as file:
            board_state = json.load(file)
        
        position = board_state["position"].split(' ')[0]
        rows = position.split('/')
        self.gui.delete("pieces")

        for i, row in enumerate(rows):
            col = 0
            for char in row:
                if char.isdigit():
                    col += int(char)
                else:
                    color = 'w' if char.isupper() else 'b'
                    piece = char.lower()
                    self.gui.create_image(col * self.L_SQUARE, i * self.L_SQUARE, 
                                          image=self.images[color + piece], 
                                          anchor="nw", tags="pieces")
                    col += 1
        
        self.board.update()
        self.board.after(500, self.updateBoard)  # Programa la próxima actualización después de 500 ms

if __name__ == "__main__":
    guiBoard = App(70)
    guiBoard()
