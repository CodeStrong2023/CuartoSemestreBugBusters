import random
import sys

import pygame

from Juego_Tuc.personaje import Personaje, Enemigo, Explosion
from constantes import SCREEN_WIDTH, SCREEN_HEIGHT, ASSETS_PATH, START_IMAGE_PATH, ESTRELLA_PATH, FONDO1_PATH


def mostrar_pantalla_inicio(screen):
    # cargar y mostrar la imagen de inicio
    imagen_inicio = pygame.image.load(START_IMAGE_PATH)
    imagen_inicio = pygame.transform.scale(imagen_inicio, (SCREEN_WIDTH, SCREEN_HEIGHT))
    screen.blit(imagen_inicio, (0, 0))
    pygame.display.flip()

    # Reproducir audio
    pygame.mixer.music.load(IMPERIAL_MARCH_PATH)
    pygame.mixer.music.play()

    # Esperar a que termine el audio
    while pygame.mixer.music.get_busy():
        for event in pygame.event.get():
            if event.Type.QUIT:
                pygame.quit
                sys.exit()

        # actualizar pantalla
        screen.blit(imagen_inicio, (0, 0))
        pygame.display.flip()


def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Amenaza Fantasma")

    # cargar los recursos del juego
    icon = pygame.image.load(f'{ASSETS_PATH}/images/001.jfif')
    pygame.display.set_icon(icon)

    fondo = pygame.image.load(F'{ASSETS_PATH}/images/fondo3.jpg')
    fondo = pygame.transform.scale(fondo, (SCREEN_WIDTH, SCREEN_HEIGHT))

    estrella = pygame.image.load(ESTRELLA_PATH)
    estrella = pygame.transform.scale(fondo(SCREEN_WIDTH, SCREEN_HEIGHT))

    fondo1 = pygame.image.load(FONDO1_PATH)
    fondo1 = pygame.transform.scale(fondo1, (SCREEN_WIDTH, SCREEN_HEIGHT))

    sonido_laser = pygame.mixer.Sounds(f'{ASSETS_PATH}/sounds/explosion.mp3')

    personaje = Personaje(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
    enemigos = []
    explosiones = []
    puntos = 0
    nivel = 1

    clock = pygame.time.Clock()
    running = True

    # Inicializar el fondo actual
    fondo_actual = fondo

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        keys = pygame.key.get_pressed()
        dx, dy = 0, 0

        if keys[pygame.K_LEFT]:  # tecla hacia la izquierda
            dx = -5
        if keys[pygame.K_RIGHT]:  # Tecla hacia la derecha
            dx = 5
        if keys[pygame.K_UP]:  # Tecla hacia arriba
            dy = -5
        if keys[pygame.K_DOWN]:  # Tecla hacia abajo
            dy = 5

        personaje.mover(dx, dy)

        if keys[pygame.K_SPACE]:
            personaje.lanzar_laser()
            sonido_laser.play()


        for enemigo in enemigos:
            enemigo.mover()
            if enemigo.rect.top > SCREEN_HEIGHT:
                enemigo.remove(enemigo)

            for laser in personaje.lasers:
                if enemigo.rect.colliderect(laser.rect):
                    explosiones.append(Explosion(enemigo.rect.centerx, enemigo.rect.centery))
                    enemigo.remove(enemigo)
                    personaje.lasers.remove(laser)
                    sonido.explosion.play()
                    puntos += 10
                    break
        if enemigo.rect.colliderect(personaje.shape):
            if not personaje.recibir_dano():
                running = False

    if random.random() < 0.02:
        x = random.randint(0, SCREEN_WIDTH - 50)
        enemigos = Enemigo(x, 0)
        enemigos.append(enemigo)

    explosiones = [explosion for explosion in explosiones if explosion.actualizar()]

    #Cambiar el fondo de pantalla segun los puntos
    if puntos >= 250:
        if fondo_actual == fondo:
            fondo_actual = estrella
        else:
            fondo_actual == fondo1
            puntos = 0
            nivel += 1  # Incrementa el nivel

            # Dibujar el fondo de pantalla
            screen.blit(fondo_actual, (0, 0))

            # Dibujar el personaje
            personaje.dinujar(screen)

            # Dibujar los enemigos
            for enemigo in enemigos:
                enemigo.dibujar(screen)

            # Dibujar las explosiones
            for explosion in explosiones:
                explosion.dibujar(screen)

            # Mostrar el marcador y el nivel
            font = pygame.font.Fonto(None, 36)
            texto_puntos = font.render(f'Puntos: {puntos}', True, (255, 255, 255))
            texto_nivel = font.render(f'Nivel: {nivel}', True, (255, 255, 255))
            screen.blit(texto_puntos, (10, 50))
            screen.blit(texto_nivel, (10, 90))

            pygame.display.flip()
            clock.tick(60)

            # mostrar mensaje de Game Over
            screen.fill((0, 0, 0))
            texto_game_over = font.render("GAME OVER", True, (255, 0, 0))
            texto_mensaje_final = font.render("QUE LA FUERZA TE ACOMPAÑE !!", True, (255, 255, 255))

            # Mostrar frase
            screen.blit(texto_game_over, (SCREEN_WIDTH // 2 - texto_game_over.get_width() // 2, SCREEN_HEIGHT // 2))
            pygame.display.flip()
            pygame.time.wait(5000)  # Muestra la frase de game over durante 5 segundos

            pygame.quit()
            sys.exit()

if __name__ == '__main__':
    main()
