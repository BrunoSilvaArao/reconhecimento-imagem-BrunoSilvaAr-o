import pygame
import sys
from settings import *
from player import Player

class Game:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        pygame.display.set_caption("Jogo Estilo Atan (atan2)")
        self.clock = pygame.time.Clock()
        self.player = Player()

    def run(self):
        while True:
            dt = self.clock.tick(FPS) / 1000.0 # Delta time em segundos
            self.events()
            self.update(dt)
            self.draw()

    def events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

    def update(self, dt):
        self.player.update(dt)

    def draw(self):
        self.screen.fill(BG_COLOR)
        self.player.draw(self.screen)
        pygame.display.flip()

if __name__ == "__main__":
    game = Game()
    game.run()
