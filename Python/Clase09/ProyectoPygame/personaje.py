import pygame

pygame.init()

#Configuracion de pantalla
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()
running = True
dt = 0

#Posicion del jugador
player_pos = pygame.Vector2(screen.get_width() / 2, screen.get_height() / 2)

#Velocidad del jugador
player_speed = 5

#Bucle principal
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    #Detectar las teclas para precionar
    keys = pygame.key.get_pressed()

    #Movimiento del jugador
    if keys[pygame.K_LEFT]:   #Se presiona la tecla IZQUIERDA
        player_pos.x -= player_speed
    if keys[pygame.K_DOWN]:  #Se presiona la tecla hacia ABAJO
        player_pos.y += player_speed
    if keys[pygame.K_UP]:  #Se presiona la tecla hacia ARRIBA
        player_pos.y -= player_speed
    if keys[pygame.K_RIGHT]:  #Se presiona la tecla DERECHA
        player_pos.x += player_speed

    #Limpiar la pantalla
    screen.fill("green")

    #Dibujamos el jugador (circulo rojo)
    pygame.draw.circle(screen, (255, 0, 0), (int(player_pos.x), int(player_pos.y)), 10)

    #Actualizamos la pantalla
    pygame.display.flip()

    #Control de la velocidad del jugador estos son los frames por segundo
    clock.tick(60)

pygame.quit() #Cierre del programa