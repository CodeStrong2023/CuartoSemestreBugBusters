import pygame

pygame.init() #Inicio del programa

#configutación de pantalla
screen = pygame.display.set_mode((800,600))
clock = pygame.time.Clock()
running = True
dt = 0

# Posición del jugador
player_pos = pygame.Vector2(screen.get_width() / 2, screen.get_height() / 2)

# Velocidad del jugador
player_speed = 5

#Bucle principal
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    #Detectar las teclas para presionar
    keys = pygame.key.get_pressed()
    #Movimieno del jugador
    if keys[pygame.K_LEFT]: #Se presiona la tecla izquierda
        player_pos.x -= player_speed
    if keys[pygame.K_RIGHT]: # Se presiona la tecla derecha
        player_pos.y += player_speed
    if keys[pygame.K_DOWN]:  # Se presiona la tecla hacia abajo
        player_pos.x -= player_speed
    if keys[pygame.K_UP]:  # Se presiona la tecla hacia arriba
        player_pos.y += player_speed

    # Limpiar la pantalla
    screen.fill("green")

    #Dibujar el jugador (en este caso es un circulo rojo)
    pygame.draw.circle(screen, (255, 0, 0), (int(player_pos.x), int(player_pos.y)), 10)

    #Actualizar pantalla
    pygame.display.flip()

    # Control de velocidad del jugador estas las frames por segundo
    clock.tick(60)

#Fin del bucle principal
pygame.quit() #Cierre del programa