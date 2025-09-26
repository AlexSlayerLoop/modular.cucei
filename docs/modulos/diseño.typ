/*
                                     Diseño
Incluir el modelado del sistema, haciendo uso de lo aprendido en ingeniería de software, incluyendo:
- Diagrama de clases o diagrama entidad relación (1 cuartilla mínimo).
- Requerimientos funcionales (1 cuartilla mínimo) y no funcionales (1 cuartilla mínimo).
- Diagramas de caso de uso (2 cuartillas mínimo).
- Diagrama de actividades o diagrama de estados (al menos para la tarea más relevante).
- Manual de usuario (2 cuartillas mínimo).
*/

A. Requerimientos principales.
Gestión de documentos

== R1 El sistema debe permitir cargar documentos oficiales en
formato PDF, JPG o PNG (ej. credenciales de elector, actas de
nacimiento, comprobantes de domicilio).
El sistema debe almacenar los documentos cargados en una
base de datos segura.

== R2 Extracción de información (OCR / Visión Artificial)
El sistema debe analizar documentos mediante OCR
para extraer datos como nombre, CURP, fecha de
nacimiento, dirección y otros campos relevantes.

El sistema debe identificar campos faltantes o
inconsistentes en la información extraída.

El sistema debe registrar metadatos (ej. calidad de la
imagen, porcentaje de confianza del OCR).

== R3 Llenado automático de formularios
El sistema debe poblar automáticamente los
formularios de registro de candidatura con la
información extraída de los documentos.

El sistema debe resaltar los campos con baja
confianza para revisión manual.

== R4 Validación y verificación humana
El sistema debe permitir a un usuario humano
verificar, corregir o confirmar la información extraída
antes de su envío definitivo.

El sistema debe registrar un historial de cambios
realizados por los verificadores.
== R5 Alertas y explicación (por qué/qué falta).

Las alertas comunes de los formularios para validar la
información
== R6 Gestión de registros de candidaturas

El sistema debe permitir guardar los registros de
candidaturas en una base de datos relacional.

El sistema debe permitir consultar, filtrar y exportar
los registros validados.

== R7 Control de acceso

El sistema debe permitir el acceso diferenciado según
roles (ej. administrador, verificador, supervisor).
B. Requerimientos no funcionales

== R1 Seguridad

Toda la información almacenada debe estar cifrada en
reposo y en tránsito (ej. AES256, TLS 1.3).

El sistema debe contar con autenticación segura (ej.
doble factor para administradores).

Se debe registrar un log de accesos y modificaciones
para auditoría.

== R2 Disponibilidad y confiabilidad
El sistema debe estar disponible al menos el 99.5%
del tiempo durante el proceso electoral.

El sistema debe tener mecanismos de respaldo
automático de la base de datos (diario o en intervalos
configurables).

== R3 Escalabilidad y rendimiento
El sistema debe poder procesar al menos X
documentos por minuto (definir según volumen
esperado).

Debe soportar N usuarios concurrentes (ej. 100
verificadores simultáneos).

== R4 Accesibilidad y usabilidad
El sistema debe estar optimizado para uso durante las
24 horas del día en periodos de elecciones.

== R5 Compatibilidad e interoperabilidad
El sistema debe poder exportar datos en formatos
estándar (CSV , JSON, PDF).


== Archivos requeridos
== Gobernador
+ acta de nacimiento
+ acuse declaración patrimonial
+ búsqueda de registro de deudores alimentarios
+ certificado de solicitud de licencia al cargo
+ escrito de aceptación y manifestación bajo protesta
+ escrito de la persona dirigente del partido politico
+ formato 3 de 3 contra la violencia
+ formulario de aceptación de registro
+ INE certificada
+ informe de capacidad económica

== Diputado MR
== Diputado RP
== Municipal
