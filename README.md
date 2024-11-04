# CashFlowNow
## Objetivo: 
Facilitar el acceso de administración a datos financieros de una empresa encargada de venta de productos coleccionables. Se busca poder acceder por medio de una aplicación móvil al balance general y la forma en que están distribuidos los ingresos del negocio, habilitando la capacidad de ingresar datos de una nueva venta (Numero de referencia/as, unidad/es vendidas, método de pago, vueltas y en que medio se dieron).
##Criterios de éxito:
-	Creación y utilización de credenciales de acceso.
-	Registro sin complicaciones de información de nuevas ventas, con un tiempo de respuesta de máximo 5 segundos.
-	Visualización en tiempo real del historial de ventas y flujo de caja.
-	Ajustar balance general de acuerdo con el flujo de caja, indicando el dinero correspondiente tanto al dinero que se debe como al dinero de ganancias.
-	Reflejar adecuadamente por cual de los medios de pago entro el dinero de la venta, y salió el dinero de vueltas (Efectivo, Nequí, Mercadopago)
-	Modulo de manejo de inventario, se debe actualizar de forma correcta cada que se finaliza una venta.
-	Añadir nuevas referencias y que estas puedan ser revisadas en cualquier momento.
-	Chatbot incorporado con la capacidad de responder a preguntas predefinidas referentes a terminología y conceptos financieros que puedan ser confusos.
-	Comunicación con API de cambio de divisas que permita visualizar en tiempo real el equivalente de una cantidad de dinero en otra moneda
## Historias de usuario:
## Requerimientos:
-	Registro de usuarios.
-	Inicio de sesión y acceso prohibido en caso de que no.
-	Registro de nuevas ventas.
-	Actualización de inventario.
-	Edición de registro de venta ante posibles equivocaciones.
-	Capacidad de añadir nuevas referencias al inventario.
-	Visualización del dinero y su distribución.
-	Ver información detallada de los movimientos realizados en el negocio incluyendo por donde entra y sale el dinero.
-	Complementar experiencia de usuario con cambio de divisas en que se ve el dinero.
-	Chatbot de ayuda al usuario con conceptos financieros.
## Restricciones:
-	La IA no debe estar en contacto directo con el usuario, solo por medio de un menú con preguntas predefinidas.
-	La aplicación debe poder funcionar incluso si hay fallos en la comunicación con el api de cambio de divisas, se dará el mensaje de error dado el caso.
## Riesgos:
