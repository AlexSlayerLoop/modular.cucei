/*
                                 Implementación
En este apartado se explica cómo trabajaron en la construcción del proyecto, las
tareas que se realizaron, las herramientas o lenguajes que eligieron y las
razones. Redactar mínimo 2 cuartillas sin contar imágenes, tablas, diagramas,
código y capturas de pantalla.
*/

== Tecnologías Utilizadas

- *Backend:* El backend se desarrolló utilizando Python con el framework FastAPI
  debido a su facilidad para construir sus modelos (tablas) por su integración
  con SQLModel y la gran integración con modelos de inteligencia artificial la
  rapidez de desarrollo y herramientas como swagger para la documentación
  automática de la API RESTful.

- *Base de Datos:* Se utilizó PostgreSQL como sistema de gestión de bases de
  datos relacionales por su robustez, escalabilidad y soporte para operaciones
  complejas.

- *OCR y Visión Artificial:* Para la extracción de texto de documentos se empleó
  con easyOCR, una biblioteca basado en PyTorch que soporta múltiples idiomas y
  es altamente configurable. Además, se consideró Paddleocr OCR como
  alternativa, pero era más compleja y el caso de uso no lo requería, ya que los
  documentos a procesar son muy específicos y el resultado depende más de la
  calidad de implementación.

- *Frontend:* El frontend se desarrolló utilizando React.js con React Router
  para la navegación entre páginas. Se eligió por su capacidad de crear apps
  complejas y facilidad para implementar single page applications (SPA), ya que
  requería un arquitectura (backend for frontend) que consumiera la API RESTful del
  backend por su integración con Inteligencia Artificial.

- *Autenticación y Seguridad:* Se implementó autenticación basada en tokens JWT
  para asegurar las rutas y proteger los datos sensibles. Además, se aplicaron
  prácticas de seguridad como el hashing de contraseñas y la validación de entradas
  para prevenir ataques comunes.

- *Organización* Se utilizo un sistema de control de versiones con Git y se
  alojó el código en un repositorios en Github para facilitar la colaboración
  por medio de _issues_ y un sistema tipo Kanban con _projects_ para mejorar la
  planeación y seguimiento de tareas.
