# CashFlowNow
## MVP: https://www.figma.com/design/sGIcZZACpcUzPcqeNQPcn5/Untitled?node-id=0-1&t=QstMDcvxDJYubjsP-1
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
- Como usuario, quiero poder crear una cuenta en la aplicación con un correo electrónico y contraseña, para poder acceder de forma segura a mis datos financieros.
- Como usuario registrado, quiero iniciar sesión con mis credenciales, para acceder a mi cuenta y datos de ventas.
- Como administrador, quiero registrar una nueva venta indicando el número de referencia, unidades vendidas, método de pago, vueltas y medio en el que se entregaron, para llevar un control detallado de mis ventas.
- Como administrador, quiero visualizar un historial en tiempo real de las ventas y flujo de caja, para entender cómo se distribuyen los ingresos del negocio.
- Como administrador, quiero editar los registros de ventas existentes, para corregir posibles errores en los datos ingresados.
- Como administrador, quiero visualizar en cualquier momento las referencias disponibles en el inventario, para revisar qué productos están en stock.
- Como administrador, quiero añadir nuevas referencias al inventario con su descripción y precio, para gestionar adecuadamente mis productos.
- Como administrador, quiero que el inventario se actualice automáticamente cuando registro una venta, para tener control preciso de los productos disponibles.
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
- Información filtrada
- Falta de conectividad
