Este sistema permite la gestión integral de candidaturas municipales,
facilitando el registro, seguimiento y administración de candidatos por partido
político. El sistema cuenta con diferentes niveles de acceso y funcionalidades
específicas según el rol del usuario.

== Acceso al Sistema

=== Inicio de Sesión

- Acceda a la página de inicio de sesión en `/login`
- Ingrese su correo electrónico y contraseña
- El sistema lo redirigirá automáticamente al Panel de Control tras una
  autenticación exitosa

=== Gestión de Contraseña

- Los usuarios pueden actualizar su contraseña desde su perfil
- Se requiere la contraseña actual para realizar cambios
- Las contraseñas deben cumplir con los requisitos de seguridad establecidos

== Panel de Control

=== Vista Principal

- Muestra información general del usuario
- Acceso rápido a las principales funcionalidades
- Visualización de municipio asignado
- Menú de navegación lateral para acceso a todas las funciones

=== Navegación

- Barra superior con información del usuario y opción de cierre de sesión
- Menú lateral para acceso a diferentes secciones
- Accesos directos a funciones frecuentes

== Gestión de Candidaturas

=== Visualización de Candidaturas

- Acceda a la lista de candidaturas desde `/candidacies`
- Filtrado por municipio
- Vista detallada de cada candidatura
- Información completa del candidato y su estado

=== Creación de Nueva Candidatura

1. Acceda a "Crear Nueva Candidatura" desde el menú
2. Complete el formulario con:
  - Información personal del candidato
  - Datos de la candidatura
  - Documentación requerida
3. Envíe el formulario para su procesamiento

=== Detalles de Candidatura

- Vista detallada de cada candidatura en `/candidacy/:id`
- Información completa del candidato
- Estado actual de la candidatura
- Historial de cambios

== Gestión de Usuarios

=== Perfil de Usuario

- Acceso a información personal en `/me`
- Actualización de datos personales
- Cambio de contraseña
- Visualización de roles y permisos

=== Funciones de Administrador

- Creación de nuevos usuarios
- Asignación de roles y permisos
- Gestión de accesos
- Monitoreo de actividades

== Funcionalidades OCR

=== Procesamiento de Documentos

- Soporte para archivos PDF e imágenes
- Carga de documentos vía:
  - Subida directa de archivos
  - URL de imagen
- Extracción automática de texto
- Verificación de calidad y confianza

=== Uso del OCR

1. Acceda a la sección OCR
2. Seleccione el método de entrada (archivo o URL)
3. Procese el documento
4. Revise los resultados extraídos

== Administración

=== Panel de Administración

- Acceso exclusivo para superusuarios
- Gestión completa de usuarios
- Monitoreo del sistema
- Configuraciones avanzadas

=== Gestión de Usuarios (Administrador)

- Creación de nuevos usuarios
- Asignación de roles
- Modificación de permisos
- Desactivación de cuentas

== Consideraciones de Seguridad

- Todas las rutas excepto el login requieren autenticación
- Los tokens de acceso tienen una duración limitada
- Las contraseñas deben cumplir con políticas de seguridad
- Los permisos son validados en cada operación
- Se mantiene un registro de actividades importantes

== Flujos de Trabajo Comunes

+ *Registro de Nueva Candidatura*
  - Acceder al sistema
  - Ir a "Crear Candidatura"
  - Completar información
  - Subir documentos
  - Confirmar registro

+ *Consulta de Candidaturas*
  - Acceder al sistema
  - Ir a "Candidaturas"
  - Filtrar por municipio
  - Seleccionar candidatura
  - Ver detalles

+ *Gestión de Usuario*
  - Acceder al perfil
  - Actualizar información
  - Cambiar contraseña
  - Verificar cambios
