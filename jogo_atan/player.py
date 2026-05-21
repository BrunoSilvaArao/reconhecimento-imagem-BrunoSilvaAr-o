import pygame
import math
from settings import *

class Player:
    def __init__(self):
        # Superficie original virada para a direita (0 graus)
        self.original_image = pygame.Surface((40, 40), pygame.SRCALPHA)
        pygame.draw.circle(self.original_image, (100, 200, 100), (20, 20), 20)
        # Um indicador de direcao (tipo um "nariz" ou arma)
        pygame.draw.rect(self.original_image, (255, 50, 50), (20, 15, 20, 10))
        
        self.image = self.original_image.copy()
        self.rect = self.image.get_rect(center=(WIDTH // 2, HEIGHT // 2))
        self.pos = pygame.math.Vector2(self.rect.center)
        self.speed = 300 # pixels por segundo
        self.angle = 0

    def update(self, dt):
        self.move(dt)
        self.rotate_to_mouse()

    def move(self, dt):
        keys = pygame.key.get_pressed()
        direction = pygame.math.Vector2()
        if keys[pygame.K_w]:
            direction.y = -1
        if keys[pygame.K_s]:
            direction.y = 1
        if keys[pygame.K_a]:
            direction.x = -1
        if keys[pygame.K_d]:
            direction.x = 1

        if direction.magnitude() > 0:
            direction = direction.normalize()
            self.pos += direction * self.speed * dt
            self.rect.center = round(self.pos.x), round(self.pos.y)

    def rotate_to_mouse(self):
        mouse_x, mouse_y = pygame.mouse.get_pos()
        dx = mouse_x - self.rect.centerx
        dy = mouse_y - self.rect.centery
        
        # O classico estilo 'atan' (atan2 em programacao)
        # math.atan2(dy, dx) retorna radianos, convertemos para graus
        self.angle = math.degrees(math.atan2(dy, dx))
        
        # Rotacao da imagem
        # No Pygame, graus positivos giram no sentido anti-horario
        self.image = pygame.transform.rotate(self.original_image, -self.angle)
        self.rect = self.image.get_rect(center=self.rect.center)

    def draw(self, surface):
        surface.blit(self.image, self.rect)
