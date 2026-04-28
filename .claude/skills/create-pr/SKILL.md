---
name: create-pr
description: Crea o actualiza Pull Requests en GitHub usando gh CLI. Analiza cambios, genera título (conventional commits) y descripción estructurada (Contexto, Resumen changelog, Guía de revisión, Verificación). Incluye detección automática de rama base y fallback a modo texto sin gh. Usa esta skill cuando el usuario quiera crear un PR, actualizar un PR existente, o preparar un pull request.
allowed-tools: Bash
argument-hint: [rama-destino]
---

# Create PR

Skill para crear Pull Requests en GitHub usando `gh`, analizando los cambios de la rama y generando un overview estructurado.

## Flujo de Trabajo

### Paso 0: Verificar herramientas

Comprobar que `gh` está instalado y autenticado:

```bash
command -v gh >/dev/null 2>&1 || GH_MISSING=true
if [ -z "$GH_MISSING" ]; then
  gh auth status >/dev/null 2>&1 || GH_AUTH_FAILED=true
fi
```

**Si `gh` no está disponible o no está autenticado**: informar al usuario:

> ⚠️ **`gh` no está disponible / no está autenticado.**
>
> **Sin `gh`**: puedo redactar el título y la descripción completa del PR, pero no crearlo automáticamente.
>
> **Para instalar**: `winget install --id GitHub.cli -e`
> **Para autenticar**: `gh auth login`

Preguntar al usuario si quiere continuar en **modo texto** (genera título + descripción para copiar) o prefiere instalar/autenticar `gh` primero.

Si continúa sin `gh`:
- En el Paso 8, en lugar de `gh pr create`, proporcionar la URL manual:
  `https://github.com/<usuario>/<repo>/compare/<rama-destino>...<rama-origen>`

### Paso 1: Verificar estado de la rama

1. Comprueba que no estás en una rama principal (master, main, develop):
   ```bash
   git branch --show-current
   ```
   Si estás en una rama principal, **no continúes**. Avisa al usuario.
2. Comprueba que no hay cambios sin commitear ni sin pushear:
   ```bash
   git status
   git log @{u}..HEAD --oneline 2>/dev/null
   ```
3. Si hay cambios pendientes, **no continúes**. Avisa al usuario de que debe commitear y pushear antes de crear el PR.
4. Si la rama no está pusheada al remoto, **no continúes**. Avisa al usuario de que debe hacer push primero.

### Paso 2: Determinar la rama destino

- Si el usuario especifica la rama destino como argumento (`$ARGUMENTS`), usa esa.
- Si no, detectar automáticamente la rama principal del repositorio:
  ```bash
  # Opción 1: via symbolic-ref
  DEFAULT_BRANCH=$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's|origin/||')
  # Opción 2: via API de GitHub
  if [ -z "$DEFAULT_BRANCH" ]; then
    DEFAULT_BRANCH=$(gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name' 2>/dev/null)
  fi
  # Fallback último
  if [ -z "$DEFAULT_BRANCH" ]; then
    DEFAULT_BRANCH="main"
  fi
  ```
- Si coexisten `main` y `master` como ramas remotas y la detección no resuelve cuál es la default, preguntar al usuario.

### Paso 3: Determinar el reviewer

Pregunta al usuario a quién asignar la revisión. Si no conoce los colaboradores del repo, listarlos:
```bash
gh api repos/:owner/:repo/collaborators --jq '.[].login'
```

### Paso 4: Analizar los cambios

Ejecuta estos comandos para entender qué se ha hecho en la rama:

```bash
# Commits de la rama respecto a la rama destino
git log --oneline <rama-destino>..HEAD

# Archivos modificados respecto a la rama destino
git diff --stat <rama-destino>..HEAD

# Detalle de los cambios
git diff <rama-destino>..HEAD

# Comprobar si ya existe un PR para esta rama
gh pr list --head $(git branch --show-current) --state open
```

Si ya existe un PR abierto → es un flujo de **actualización**, no de creación. Ejecutar también `gh pr view <N>` para obtener el título y la descripción actuales como referencia.

### Paso 4b: Comprobar conflictos (dry-run)

Antes de continuar, verificar si el merge contra la rama destino tendría conflictos:

```bash
MERGE_BASE=$(git merge-base <rama-destino> HEAD)
CONFLICTS=$(git merge-tree $MERGE_BASE <rama-destino> HEAD 2>&1 | grep -c '<<<<<<' || true)
```

Este comando NO modifica el working tree ni crea commits — es un dry-run puro.

- Si `CONFLICTS > 0`: avisar al usuario con el número de conflictos.
- Si `CONFLICTS = 0`: continuar sin mostrar nada.

### Paso 4c: Comprobar tamaño del PR

Revisar el número de líneas modificadas en el diff (`git diff --stat`). Si supera ~800 líneas:
- Avisar al usuario.
- Identificar puntos lógicos de división basados en la agrupación de cambios.
- Sugerir dividirlo antes de continuar.
- Si el usuario decide continuar de todas formas, proceder con el PR completo.

### Paso 5: Coverage check (informativo, nunca bloqueante)

Analiza el diff para detectar nuevas funciones/métodos/clases sin cobertura de tests. El objetivo es que el autor tome una decisión consciente, no impedir la creación del PR.

#### 5.1 Detectar nuevas definiciones en el diff

Parsear la salida del `git diff` buscando líneas añadidas (`+`) que definan símbolos invocables:
- JavaScript/TypeScript: `function `, `=> {`, métodos en clases, `export function/const`
- Python: `def `, `async def `, `class `

Ignorar: cambios en tests, comentarios, getters/setters triviales.

**Si el diff contiene cero definiciones nuevas**: saltar directamente al Paso 6 sin mostrar nada.

#### 5.2 Buscar cobertura en el repositorio

Para cada símbolo detectado, buscar referencias en:
- `tests/`, `test/`, `spec/`, `src/test/`
- Archivos con sufijo `_test`, `_spec`, `.test.`, `.spec.`

#### 5.3 Reportar al usuario

```
Coverage Check
──────────────
X nuevas definiciones detectadas — Y sin cobertura aparente

Sin cobertura detectada:
  - src/app/component.ts :: miMetodo

Opciones:
  [1] Continuar con el PR tal como está
  [2] Detener para escribir tests primero
  [3] Continuar y marcar en la sección Verificación del PR
```

**NUNCA ejecutar tests**, salvo que el usuario lo solicite explícitamente.

### Paso 6: Generar el overview del PR

Analiza los cambios y genera un overview adaptado al tipo de trabajo.

#### Secciones disponibles

```markdown
## Contexto
Breve explicación del objetivo de la rama y el problema que resuelve.
Relacionar con issue si existe: Closes #N / Relates to #N

## Resumen
Cambios agrupados por tipo (feat, fix, refactor, style, test, chore, docs).
Formato por ítem: - **tipo** Descripción (hash_commit)

## Archivos clave modificados
Lista de archivos relevantes con una línea por cada uno explicando qué cambió.

## Guía de revisión
**Revisar con detalle:**
Lista de ficheros/lógica que el reviewer debe examinar con cuidado.

**Mecánico / bajo riesgo:**
Cambios triviales que no necesitan revisión profunda.

## Verificación
- [ ] Tests pasan localmente
- [ ] No hay regresiones visuales
- [ ] El código sigue las convenciones del proyecto
```

**Reglas de composición:**
- Omitir secciones que no apliquen
- Ser específico: mencionar nombres de archivos, componentes, funciones concretas
- Respetar tildes y eñes (el overview se escribe en español)

### Paso 7: Generar el título del PR

Formato: `<type>(<scope>): <sujeto en español>`

#### Reglas

- **type**: `feat`, `fix`, `refactor`, `docs`, `test`, `ci`, `chore`, `perf`, `deps`
- **scope** (opcional): módulo, componente o área afectada. Omitir si es amplio.
- **sujeto**: en español, minúsculas, modo imperativo, sin punto final, máximo 72 caracteres en total.

#### Ejemplos

```
feat(views): añadir todas las vistas principales de la app
fix(routing): corregir navegación entre módulos
refactor(auth): extraer lógica de tokens a servicio dedicado
```

### Paso 8: Presentar al usuario para confirmación

```
📋 Pull Request a crear:

Rama: <rama-origen> → <rama-destino>
Reviewer: <reviewer>
Título: <título generado>

---
[overview generado]
---

¿Quieres crear el PR con esto? [sí / editar / cancelar]
```

- Si el usuario dice **sí**: crea el PR.
- Si el usuario dice **editar**: pregunta qué quiere cambiar y ajusta.
- Si el usuario dice **cancelar**: no hagas nada.

### Paso 9: Crear o actualizar el PR

#### PR nuevo

```bash
gh pr create \
  --base "<rama-destino>" \
  --head "<rama-actual>" \
  --title "<titulo>" \
  --reviewer "<reviewer>" \
  --body "$(cat <<'EOF'
<descripción completa>
EOF
)"
```

#### PR existente (actualización)

```bash
gh pr edit <N> \
  --title "<titulo>" \
  --body "$(cat <<'EOF'
<descripción completa — debe ser la descripción COMPLETA>
EOF
)"
```

Tras crear/actualizar, muestra la URL del PR al usuario.

## Reglas

1. **SIEMPRE** pedir confirmación antes de crear el PR
2. **NUNCA** crear el PR si hay cambios sin commitear o sin pushear
3. **NUNCA** crear el PR si estás en una rama principal (master, main, develop)
4. Adaptar las secciones al tipo de cambio — no forzar secciones vacías
5. Ser específico en la descripción — mencionar nombres de archivos y componentes concretos
6. Respetar tildes y eñes en los textos del overview
7. Si `gh` no está disponible, funcionar en **modo texto**: generar título + descripción para copiar manualmente

## Casos límite

- **Diff vacío**: avisar y detener — no crear un PR vacío.
- **PR en borrador**: si el usuario dice "draft", "WIP" o "borrador", añadir `--draft` a `gh pr create`.
- **`gh pr create` falla**: mostrar el error al usuario, NO reintentar automáticamente. Si es error de auth, sugerir `gh auth login`.
- **Múltiples PRs para la misma rama**: filtrar por estado (`open`). Si hay varios abiertos, preguntar al usuario cuál actualizar.
- **Sin datos de validación disponibles**: preguntar al usuario qué tests/comprobaciones ejecutó. Si confirma que no se ejecutaron, escribir: `⚠️ No se ejecutaron tests ni validaciones manuales para este cambio.`