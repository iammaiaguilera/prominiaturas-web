# Guía de Gitflow para Principiantes

Gitflow es una metodología de trabajo que nos ayuda a mantener el código organizado, especialmente cuando trabajamos en nuevas características sin romper lo que ya funciona.

## Estructura Básica de Ramas (Branches)

Imagina tu proyecto como un árbol:

1.  **`main` (o master)**: Es el tronco principal. Aquí vive el código que está **listo y perfecto** (Producción). Nunca trabajamos directamente aquí.
2.  **`develop`**: Es una rama paralela donde integramos todo lo nuevo. Es como la version "beta". Aquí probamos que todo funcione junto.
3.  **`feature/...`**: Son ramas temporales para cada nueva tarea.

## Flujo de Trabajo (Paso a Paso)

### 1. Configuración Inicial (Solo se hace una vez)
Asegúrate de tener una rama `develop`:
```bash
git checkout -b develop main
# Esto crea y te cambia a la rama 'develop' basada en 'main'
```

### 2. Empezar una Nueva Tarea (Feature)
Cuando quieras hacer un cambio (ej. "arreglar el footer"), no toques `develop` directamente. Crea una rama hija:
```bash
git checkout -b feature/arreglar-footer develop
# Crea la rama 'feature/arreglar-footer' basada en 'develop'
```
*Ahora haces tus cambios, guardas y haces commit en esta rama.*

### 3. Guardar tus Cambios
```bash
git add .
git commit -m "Arreglado el color del footer"
```

### 4. Terminar la Tarea
Una vez terminaste y probaste tu cambio, lo llevas de vuelta a `develop`:
```bash
# 1. Vuelve a la rama develop
git checkout develop

# 2. Trae (fusiona) tus cambios de la feature
git merge feature/arreglar-footer

# 3. (Opcional) Borra la rama feature ya que no la necesitas
git branch -d feature/arreglar-footer
```

### 5. Publicar (Release)
Cuando `develop` tiene varias cosas nuevas y está listo para salir al público, lo llevamos a `main`:
```bash
git checkout main
git merge develop
```

## Resumen de Comandos Útiles

- `git branch`: Muestra en qué rama estás.
- `git checkout [nombre-rama]`: Cambia de rama.
- `git status`: Muestra qué archivos has modificado.
