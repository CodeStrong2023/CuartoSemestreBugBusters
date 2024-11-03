import pygame
import sys

from Juego_Tuc.Personaje import Personaje
from constantes import SCREEN_WIDTH, SCREEN_HEIGTH, ASSETS_PATH, IMPERIAL_MARCH_PATH, START_IMAGE_PATH, ESTRELLA_PATH, FONDO1_PATH

def mostrar_pantalla_inicio(screen):
    # cargar y mostrar la imagen de inicio
    imagen_inicio = pygame.image.load(START_IMAGE_PATH)
    imagen_inicio = pygame.transform.scale(imagen_inicio, (SCREEN_WIDTH, SCREEN_HEIGTH))
    screen.blit(imagen_inicio, (0,0))
    pygame.display.flip()

    # reproducir audio
    pygame.mixer.music.load(IMPERIAL_MARCH_PATH)
    pygame.mixer.music.play()

    # esperar a que termine el audio
    while pygame.mixer.music.get_busy():
        for event in pygame.event.get():
            if event.Type.QUIT:
                pygame.quit()
                sys.exit()

        # actualizar pantalla
        screen.blit(imagen_inicio, (0,0))
        pygame.display.flip()


def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGTH))
    pygame.display.set_caption('Amenaza Fantasma')

    # cargar los recursos del juego
    icon = pygame.image.load(f'{ASSETS_PATH}/images/fondo001.jfif')
    pygame.display.set_icon(icon)

    fondo = pygame.image.load(f'{ASSETS_PATH}/images(fond3.jpg')
    fondo = pygame.transform.scale(fondo, (SCREEN_WIDTH, SCREEN_HEIGTH))

    estrella = pygame.image.load(ESTRELLA_PATH)
    estrella = pygame.transform.scale(fondo1, (SCREEN_WIDTH, SCREEN_HEIGTH))

    fondo1 = pygame.image.load(FONDO1_PATH)
    fondo1 = pygame.transform.scale(fondo, (SCREEN_WIDTH, SCREEN_HEIGTH))

    sonido_laser = pygame.mixer.Sound(f'{ASSETS_PATH}/sounds/explosion.mp3')

    personaje = Personaje(SCREEN_WIDTH // 2, SCREEN_HEIGTH // 2)
    enemigos = []
    explosiones = []
    puntos = 0
    nivel = 1
    clock = pygame.time.Clock()
    running = True

    # inicializar el fondo actual con el fondo original
    fondo_actual = fondo

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
