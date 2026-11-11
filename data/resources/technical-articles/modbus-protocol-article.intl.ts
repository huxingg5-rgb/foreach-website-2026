import type {
  PistonPumpArticleCopy,
  PistonPumpArticleLocale,
} from "./piston-pump-articles.types";

export const modbusProtocolArticles = {
  en: {
    slug: "modbus-protocol-fluid-control",
    title: "Modbus Protocol: RTU, ASCII and TCP Basics",
    summary:
      "Understand Modbus RTU, ASCII and TCP, their differences from RS-485, serial addressing, function codes and register maps, and communication checks for fluid-control devices.",
    seoTitle: "Modbus Protocol: RTU, ASCII and TCP Basics | Foreach Technology",
    seoDescription:
      "Understand Modbus RTU, ASCII and TCP, their differences from RS-485, serial addressing, function codes and register maps, and communication checks for fluid-control devices.",
    date: "2026-09-06",
    coverImage:
      "/images/resources/technical-articles/covers/pressure-flow-material-compatibility.webp",
    coverAlt: "Foreach precision fluid-system pump with connected tubing",
    intro: [],
    sections: [
      {
        title: "What is Modbus, and how does it differ from RS-485?",
        parts: [
          {
            type: "paragraph",
            text: "Modbus is an application-layer messaging protocol used to exchange data between controllers and devices. RS-485 and RS-232 specify electrical interfaces. Modbus RTU and ASCII are serial transmission modes, while Modbus TCP carries Modbus messages over TCP/IP. An RS-485 interface alone does not establish that a device supports Modbus.",
          },
          {
            type: "paragraph",
            text: "In a fluid-control system, Modbus can be used to read device status or send control parameters. Check the communication manual for the exact controller model to confirm protocol support, supported functions and register definitions. Interface support must be confirmed for each Foreach product and configuration.",
          },
        ],
      },
      {
        title: "How do Modbus RTU, ASCII and TCP differ?",
        parts: [
          {
            type: "paragraph",
            text: "The connector does not identify the communication mode. For serial communication, both ends must use matching transmission modes, baud rates and character-frame settings. For TCP communication, check the network connection and the device’s service settings.",
          },
          {
            type: "table",
            headers: ["Mode", "Message structure", "Items to verify"],
            rows: [
              [
                "Modbus RTU",
                "Device address + Function code + Data + CRC",
                "Serial settings, device address and inter-frame timing",
              ],
              [
                "Modbus ASCII",
                "ASCII-encoded message with LRC and defined start/end characters",
                "Serial settings, encoding and LRC",
              ],
              [
                "Modbus TCP",
                "MBAP header + Function code + Data; no RTU CRC is appended",
                "IP address, port, Transaction Identifier and Unit Identifier",
              ],
            ],
          },
        ],
      },
      {
        title:
          "How do serial device addresses and request–response exchanges work?",
        parts: [
          {
            type: "paragraph",
            text: "On a Modbus serial line, individual server (slave) addresses are 1–247. Address 0 is reserved for broadcast, and 248–255 are reserved. The client (master) initiates a unicast request, and the addressed device returns a response. Broadcast write requests receive no response. An 8-bit address field therefore does not make every value from 0 to 255 a valid individual device address.",
          },
          {
            type: "paragraph",
            text: "These addressing rules apply to serial communication. Modbus TCP includes a Unit Identifier in the MBAP header. When a gateway forwards messages, the meaning of this field depends on the device implementation. Check the device manual rather than applying the serial address rules to every TCP connection.",
          },
        ],
      },
      {
        title:
          "How should Modbus function codes and register maps be read together?",
        parts: [
          {
            type: "paragraph",
            text: "The function code identifies the data category and the read or write operation. The data field carries the relevant addresses, quantities or values. Two devices that both support Modbus may still use different register maps.",
          },
          {
            type: "paragraph",
            text: "Before commissioning, check for an offset between the register numbers shown in the manual and the starting addresses encoded in messages. Also confirm data width, signed or unsigned representation, scaling factors, units and word order for values spanning multiple registers. A speed value, position value and liquid-volume value have different meanings and cannot be substituted for one another.",
          },
          {
            type: "figures",
            items: [
              {
                src: "/images/resources/technical-articles/modbus-protocol-fluid-control/modbus-request-response.en.svg",
                alt: "Modbus RTU and ASCII serial unicast request–response diagram, message fields and common hexadecimal function codes",
                caption:
                  "Normal serial unicast exchange and common Modbus function codes. RTU uses CRC; ASCII uses LRC. Broadcast requests receive no response. The table above gives the TCP format.",
                width: 1200,
                height: 1030,
              },
            ],
          },
          {
            type: "table",
            headers: ["Function code (hex)", "Operation"],
            rows: [
              ["01", "Read coils"],
              ["02", "Read discrete inputs"],
              ["03", "Read holding registers"],
              ["04", "Read input registers"],
              ["05", "Write single coil"],
              ["06", "Write single register"],
              ["0F", "Write multiple coils"],
              ["10", "Write multiple registers"],
            ],
          },
          {
            type: "notice",
            text: "The diagram shows a normal serial unicast exchange. Broadcast requests receive no response. Exception responses use an exception function code and an exception code; they are not shown here. For TCP, use the MBAP-based format above. The functions supported by a device depend on its communication manual.",
          },
          {
            type: "links",
            items: [
              {
                label: "Stepper motor calculations and selection",
                href: "/resources/technical-articles/stepper-motor-calculation-selection/",
              },
            ],
          },
        ],
      },
      {
        title: "How do you commission a fluid-control device using Modbus?",
        parts: [
          {
            type: "paragraph",
            text: "First verify wiring and power, then set the communication parameters according to the device manual. Begin by reading a known status value. Check the device address, function code and meaning of the returned data before testing permitted parameter writes and motion commands.",
          },
          {
            type: "paragraph",
            text: "Verify successful communication, command acceptance, completed motion and the required delivered volume separately. A write acknowledgment does not mean that the pump has finished moving. After a timeout, check device status before repeating a dispensing command to avoid delivering the dose twice.",
          },
          {
            type: "paragraph",
            text: "Log requests, responses, exception codes and timeout conditions. Check limit signals, homing, valve states and motion timing when locating a fault. Use the device communication manual to establish the exact commands, addresses and counting units.",
          },
          {
            type: "links",
            items: [
              {
                label: "Piston-pump acceleration and deceleration",
                href: "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/",
              },
              {
                label: "Piston-pump backlash compensation",
                href: "/resources/technical-articles/precision-piston-pump-backlash-compensation/",
              },
            ],
          },
        ],
      },
    ],
    referencesTitle: "References",
    references: [
      {
        label:
          "Modbus Organization: Serial Line Specification and Implementation Guide V1.02",
        href: "https://www.modbus.org/file/secure/modbusoverserial.pdf",
      },
      {
        label:
          "Modbus Organization: Messaging on TCP/IP Implementation Guide V1.0b",
        href: "https://www.modbus.org/file/secure/messagingimplementationguide.pdf",
      },
    ],
    cta: {
      title: "Confirm communication settings and motion requirements together",
      description:
        "Provide the controller model, communication manual, register map, wiring diagram and required motion sequence. Confirm the supported interface and command units before integrating the device.",
      contactLabel: "Contact an engineer",
      productsLabel: "View piston pumps",
    },
    subject: {
      about: ["Modbus communication", "Commissioning fluid-control devices"],
      mentions: ["Modbus RTU", "Modbus ASCII", "Modbus TCP", "RS-485"],
    },
  },
  es: {
    slug: "modbus-protocol-fluid-control",
    title: "Protocolo Modbus: fundamentos de RTU, ASCII y TCP",
    summary:
      "Comprenda Modbus RTU, ASCII y TCP, su diferencia respecto a RS-485, el direccionamiento serie, los códigos de función y la puesta en marcha de equipos de control de fluidos.",
    seoTitle:
      "Protocolo Modbus: fundamentos de RTU, ASCII y TCP | Foreach Technology",
    seoDescription:
      "Comprenda Modbus RTU, ASCII y TCP, su diferencia respecto a RS-485, el direccionamiento serie, los códigos de función y la puesta en marcha de equipos de control de fluidos.",
    date: "2026-09-06",
    coverImage:
      "/images/resources/technical-articles/covers/pressure-flow-material-compatibility.webp",
    coverAlt:
      "Bomba Foreach para sistemas de fluidos de precisión con tubos conectados",
    intro: [],
    sections: [
      {
        title: "¿Qué es Modbus y en qué se diferencia de RS-485?",
        parts: [
          {
            type: "paragraph",
            text: "Modbus es un protocolo de mensajería de la capa de aplicación que permite intercambiar datos entre controladores y dispositivos. RS-485 y RS-232 definen interfaces eléctricas. Modbus RTU y ASCII son modos de transmisión serie, mientras que Modbus TCP transporta mensajes Modbus sobre TCP/IP. Disponer de una interfaz RS-485 no significa, por sí solo, que el dispositivo admita Modbus.",
          },
          {
            type: "paragraph",
            text: "En un sistema de control de fluidos, Modbus puede utilizarse para consultar el estado de los equipos o enviar parámetros de control. El manual de comunicación del modelo concreto de controlador debe especificar la compatibilidad, las funciones disponibles y los registros. La interfaz debe confirmarse para cada producto Foreach y su configuración.",
          },
        ],
      },
      {
        title: "¿En qué se diferencian Modbus RTU, ASCII y TCP?",
        parts: [
          {
            type: "paragraph",
            text: "El conector no permite identificar el modo de comunicación. En una conexión serie deben coincidir el modo de transmisión, la velocidad en baudios y la configuración de la trama de caracteres. En TCP hay que comprobar la conexión de red y la configuración del servicio del dispositivo.",
          },
          {
            type: "table",
            headers: [
              "Modo",
              "Estructura del mensaje",
              "Aspectos que deben comprobarse",
            ],
            rows: [
              [
                "Modbus RTU",
                "Dirección del dispositivo + Código de función + Datos + CRC",
                "Parámetros serie, dirección del dispositivo e intervalo entre tramas",
              ],
              [
                "Modbus ASCII",
                "Mensaje codificado en ASCII con LRC y caracteres definidos de inicio y fin",
                "Parámetros serie, codificación y LRC",
              ],
              [
                "Modbus TCP",
                "Cabecera MBAP + Código de función + Datos; no se añade el CRC de RTU",
                "Dirección IP, puerto, identificador de transacción e identificador de unidad (Unit Identifier)",
              ],
            ],
          },
        ],
      },
      {
        title:
          "¿Cómo funcionan las direcciones serie y el intercambio de solicitudes y respuestas?",
        parts: [
          {
            type: "paragraph",
            text: "En una línea serie Modbus, las direcciones individuales de los servidores (esclavos) van de 1 a 247. La dirección 0 se reserva para difusión y las direcciones 248–255 están reservadas. El cliente (maestro) inicia una solicitud unicast y el dispositivo destinatario responde. Las solicitudes de escritura por difusión no reciben respuesta. Por tanto, un campo de dirección de 8 bits no convierte todos los valores de 0 a 255 en direcciones individuales válidas.",
          },
          {
            type: "paragraph",
            text: "Estas reglas de direccionamiento corresponden a la comunicación serie. Modbus TCP incorpora un identificador de unidad (Unit Identifier) en la cabecera MBAP. Si una pasarela reenvía los mensajes, la interpretación de este campo depende de la implementación del equipo. Consulte su manual antes de aplicar las reglas de direccionamiento serie a una conexión TCP.",
          },
        ],
      },
      {
        title:
          "¿Cómo interpretar los códigos de función Modbus junto con el mapa de registros?",
        parts: [
          {
            type: "paragraph",
            text: "El código de función identifica el tipo de datos y la operación de lectura o escritura. El campo de datos contiene las direcciones, cantidades o valores correspondientes. Aunque dos dispositivos admitan Modbus, sus mapas de registros pueden ser diferentes.",
          },
          {
            type: "paragraph",
            text: "Antes de la puesta en marcha, compruebe si existe un desfase entre los números de registro del manual y las direcciones iniciales codificadas en los mensajes. Confirme también el tamaño de los datos, la representación con o sin signo, los factores de escala, las unidades y el orden de las palabras en valores que ocupen varios registros. Los valores de velocidad, posición y volumen de líquido tienen significados distintos y no son intercambiables.",
          },
          {
            type: "figures",
            items: [
              {
                src: "/images/resources/technical-articles/modbus-protocol-fluid-control/modbus-request-response.es.svg",
                alt: "Diagrama de solicitud y respuesta unicast de Modbus RTU y ASCII con campos del mensaje y códigos de función hexadecimales habituales",
                caption:
                  "Intercambio serie unicast con respuesta normal y códigos de función Modbus habituales. RTU utiliza CRC y ASCII utiliza LRC. Las solicitudes por difusión no reciben respuesta. El formato TCP se indica en la tabla anterior.",
                width: 1200,
                height: 1030,
              },
            ],
          },
          {
            type: "table",
            headers: ["Código de función (hex)", "Operación"],
            rows: [
              ["01", "Leer bobinas"],
              ["02", "Leer entradas discretas"],
              ["03", "Leer registros de retención"],
              ["04", "Leer registros de entrada"],
              ["05", "Escribir una bobina"],
              ["06", "Escribir un registro"],
              ["0F", "Escribir varias bobinas"],
              ["10", "Escribir varios registros"],
            ],
          },
          {
            type: "notice",
            text: "La figura representa un intercambio serie unicast con respuesta normal. Las solicitudes por difusión no reciben respuesta. Las respuestas de excepción utilizan un código de función de excepción y un código de excepción; no se muestran en la figura. Para TCP se aplica el formato con cabecera MBAP indicado arriba. Las funciones disponibles se especifican en el manual del equipo.",
          },
          {
            type: "links",
            items: [
              {
                label: "Cálculo y selección del motor paso a paso",
                href: "/resources/technical-articles/stepper-motor-calculation-selection/",
              },
            ],
          },
        ],
      },
      {
        title:
          "¿Cómo poner en marcha un equipo de control de fluidos con Modbus?",
        parts: [
          {
            type: "paragraph",
            text: "Compruebe primero el cableado y la alimentación; después configure la comunicación según el manual del equipo. Empiece por leer un estado conocido. Verifique la dirección del dispositivo, el código de función y el significado de los datos recibidos antes de probar las escrituras de parámetros y las órdenes de movimiento permitidas.",
          },
          {
            type: "paragraph",
            text: "Verifique por separado la comunicación, la aceptación de la orden, la finalización del movimiento y el volumen realmente suministrado. Una confirmación de escritura no significa que la bomba haya terminado de moverse. Tras un tiempo de espera agotado, consulte el estado antes de repetir una orden de dosificación para evitar suministrar la dosis dos veces.",
          },
          {
            type: "paragraph",
            text: "Registre las solicitudes, las respuestas, los códigos de excepción y las condiciones en las que se agota el tiempo de espera. Para localizar un fallo, compruebe los finales de carrera, la búsqueda de origen, el estado de las válvulas y la secuencia temporal. El manual de comunicación del equipo determina los comandos, las direcciones y las unidades de conteo exactos.",
          },
          {
            type: "links",
            items: [
              {
                label: "Aceleración y desaceleración de bombas de pistón",
                href: "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/",
              },
              {
                label: "Compensación de holgura en bombas de pistón",
                href: "/resources/technical-articles/precision-piston-pump-backlash-compensation/",
              },
            ],
          },
        ],
      },
    ],
    referencesTitle: "Referencias",
    references: [
      {
        label:
          "Modbus Organization: especificación y guía de implementación de la línea serie V1.02",
        href: "https://www.modbus.org/file/secure/modbusoverserial.pdf",
      },
      {
        label:
          "Modbus Organization: guía de implementación de mensajería sobre TCP/IP V1.0b",
        href: "https://www.modbus.org/file/secure/messagingimplementationguide.pdf",
      },
    ],
    cta: {
      title:
        "Confirme conjuntamente la comunicación y los requisitos de movimiento",
      description:
        "Facilite el modelo del controlador, el manual de comunicación, el mapa de registros, el esquema de cableado y la secuencia de movimiento requerida. Antes de integrar el equipo, confirme la interfaz admitida y las unidades de las órdenes.",
      contactLabel: "Contactar con un ingeniero",
      productsLabel: "Ver bombas de pistón",
    },
    subject: {
      about: [
        "Comunicación Modbus",
        "Puesta en marcha de equipos de control de fluidos",
      ],
      mentions: ["Modbus RTU", "Modbus ASCII", "Modbus TCP", "RS-485"],
    },
  },
  fr: {
    slug: "modbus-protocol-fluid-control",
    title: "Protocole Modbus : bases de RTU, ASCII et TCP",
    summary:
      "Comprendre Modbus RTU, ASCII et TCP, leur différence avec RS-485, l’adressage série, les codes de fonction et la mise en service des équipements de contrôle des fluides.",
    seoTitle:
      "Protocole Modbus : bases de RTU, ASCII et TCP | Foreach Technology",
    seoDescription:
      "Comprendre Modbus RTU, ASCII et TCP, leur différence avec RS-485, l’adressage série, les codes de fonction et la mise en service des équipements de contrôle des fluides.",
    date: "2026-09-06",
    coverImage:
      "/images/resources/technical-articles/covers/pressure-flow-material-compatibility.webp",
    coverAlt:
      "Pompe Foreach pour systèmes fluidiques de précision avec tubulures raccordées",
    intro: [],
    sections: [
      {
        title: "Qu’est-ce que Modbus et quelle est la différence avec RS-485 ?",
        parts: [
          {
            type: "paragraph",
            text: "Modbus est un protocole de messagerie de la couche application qui permet l’échange de données entre des contrôleurs et des équipements. RS-485 et RS-232 définissent des interfaces électriques. Modbus RTU et ASCII sont des modes de transmission série, tandis que Modbus TCP transporte les messages Modbus sur TCP/IP. La présence d’une interface RS-485 ne suffit donc pas à établir qu’un équipement prend en charge Modbus.",
          },
          {
            type: "paragraph",
            text: "Dans un système de contrôle des fluides, Modbus peut servir à lire l’état d’un équipement ou à transmettre des paramètres de commande. Le manuel de communication du modèle exact de contrôleur précise la prise en charge du protocole, les fonctions disponibles et les registres. L’interface doit être confirmée pour chaque produit Foreach et chaque configuration.",
          },
        ],
      },
      {
        title: "Quelles sont les différences entre Modbus RTU, ASCII et TCP ?",
        parts: [
          {
            type: "paragraph",
            text: "Le connecteur ne permet pas, à lui seul, d’identifier le mode de communication. Sur une liaison série, le mode de transmission, le débit en bauds et le format des caractères doivent correspondre aux deux extrémités. En TCP, il faut vérifier la connexion réseau et les paramètres du service de l’équipement.",
          },
          {
            type: "table",
            headers: ["Mode", "Structure du message", "Points à vérifier"],
            rows: [
              [
                "Modbus RTU",
                "Adresse de l’équipement + Code de fonction + Données + CRC",
                "Paramètres série, adresse de l’équipement et intervalle entre trames",
              ],
              [
                "Modbus ASCII",
                "Message codé en ASCII avec LRC et caractères de début et de fin définis",
                "Paramètres série, codage et LRC",
              ],
              [
                "Modbus TCP",
                "En-tête MBAP + Code de fonction + Données ; aucun CRC RTU n’est ajouté",
                "Adresse IP, port, identifiant de transaction et identifiant d’unité (Unit Identifier)",
              ],
            ],
          },
        ],
      },
      {
        title:
          "Comment fonctionnent l’adressage série et les échanges requête-réponse ?",
        parts: [
          {
            type: "paragraph",
            text: "Sur une liaison série Modbus, les adresses individuelles des serveurs (esclaves) vont de 1 à 247. L’adresse 0 est réservée à la diffusion et les adresses 248–255 sont réservées. Le client (maître) émet une requête unicast et l’équipement adressé répond. Les requêtes d’écriture diffusées ne reçoivent aucune réponse. Un champ d’adresse de 8 bits ne rend donc pas toutes les valeurs de 0 à 255 utilisables comme adresses individuelles.",
          },
          {
            type: "paragraph",
            text: "Ces règles d’adressage concernent la communication série. Modbus TCP comporte un identifiant d’unité (Unit Identifier) dans l’en-tête MBAP. Lorsqu’une passerelle achemine les messages, l’interprétation de ce champ dépend de l’implémentation de l’équipement. Consultez son manuel avant d’appliquer les règles d’adressage série à une connexion TCP.",
          },
        ],
      },
      {
        title:
          "Comment interpréter les codes de fonction Modbus avec la table des registres ?",
        parts: [
          {
            type: "paragraph",
            text: "Le code de fonction indique la catégorie de données et l’opération de lecture ou d’écriture. Le champ de données contient les adresses, les quantités ou les valeurs correspondantes. Deux équipements prenant en charge Modbus peuvent néanmoins avoir des tables de registres différentes.",
          },
          {
            type: "paragraph",
            text: "Avant la mise en service, vérifiez s’il existe un décalage entre les numéros de registre du manuel et les adresses de départ codées dans les messages. Confirmez également la taille des données, la représentation signée ou non signée, les facteurs d’échelle, les unités et l’ordre des mots pour les valeurs réparties sur plusieurs registres. Une vitesse, une position et un volume de liquide correspondent à des grandeurs différentes et ne sont pas interchangeables.",
          },
          {
            type: "figures",
            items: [
              {
                src: "/images/resources/technical-articles/modbus-protocol-fluid-control/modbus-request-response.fr.svg",
                alt: "Schéma des requêtes et réponses unicast Modbus RTU et ASCII, avec champs des messages et codes de fonction hexadécimaux courants",
                caption:
                  "Échange série unicast avec réponse normale et codes de fonction Modbus courants. RTU utilise le CRC et ASCII le LRC. Les requêtes diffusées ne reçoivent aucune réponse. Le format TCP figure dans le tableau précédent.",
                width: 1200,
                height: 1030,
              },
            ],
          },
          {
            type: "table",
            headers: ["Code de fonction (hex)", "Opération"],
            rows: [
              ["01", "Lire les bobines"],
              ["02", "Lire les entrées discrètes"],
              ["03", "Lire les registres de maintien"],
              ["04", "Lire les registres d’entrée"],
              ["05", "Écrire une bobine"],
              ["06", "Écrire un registre"],
              ["0F", "Écrire plusieurs bobines"],
              ["10", "Écrire plusieurs registres"],
            ],
          },
          {
            type: "notice",
            text: "La figure représente un échange série unicast avec réponse normale. Les requêtes diffusées ne reçoivent aucune réponse. Les réponses d’exception utilisent un code de fonction d’exception et un code d’exception ; elles ne sont pas représentées ici. Pour TCP, utilisez le format avec en-tête MBAP indiqué ci-dessus. Les fonctions disponibles sont précisées dans le manuel de l’équipement.",
          },
          {
            type: "links",
            items: [
              {
                label: "Calcul et sélection d’un moteur pas à pas",
                href: "/resources/technical-articles/stepper-motor-calculation-selection/",
              },
            ],
          },
        ],
      },
      {
        title:
          "Comment mettre en service un équipement de contrôle des fluides avec Modbus ?",
        parts: [
          {
            type: "paragraph",
            text: "Vérifiez d’abord le câblage et l’alimentation, puis réglez les paramètres de communication selon le manuel de l’équipement. Commencez par lire un état connu. Contrôlez l’adresse de l’équipement, le code de fonction et la signification des données reçues avant d’essayer les écritures de paramètres et les commandes de mouvement autorisées.",
          },
          {
            type: "paragraph",
            text: "Validez séparément la communication, l’acceptation de la commande, la fin du mouvement et le volume effectivement délivré. Un acquittement d’écriture ne signifie pas que la pompe a terminé son mouvement. Après une expiration du délai d’attente, consultez l’état de l’équipement avant de répéter une commande de dosage afin d’éviter de délivrer deux fois la dose.",
          },
          {
            type: "paragraph",
            text: "Consignez les requêtes, les réponses, les codes d’exception et les circonstances des dépassements de délai. Pour rechercher un défaut, vérifiez les fins de course, la prise d’origine, l’état des vannes et la chronologie des mouvements. Le manuel de communication de l’équipement détermine les commandes, les adresses et les unités de comptage exactes.",
          },
          {
            type: "links",
            items: [
              {
                label: "Accélération et décélération d’une pompe à piston",
                href: "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/",
              },
              {
                label: "Compensation du jeu d’une pompe à piston",
                href: "/resources/technical-articles/precision-piston-pump-backlash-compensation/",
              },
            ],
          },
        ],
      },
    ],
    referencesTitle: "Références",
    references: [
      {
        label:
          "Modbus Organization : spécification et guide d’implémentation de la liaison série V1.02",
        href: "https://www.modbus.org/file/secure/modbusoverserial.pdf",
      },
      {
        label:
          "Modbus Organization : guide d’implémentation de la messagerie sur TCP/IP V1.0b",
        href: "https://www.modbus.org/file/secure/messagingimplementationguide.pdf",
      },
    ],
    cta: {
      title: "Valider ensemble la communication et les exigences de mouvement",
      description:
        "Transmettez le modèle du contrôleur, le manuel de communication, la table des registres, le schéma de câblage et la séquence de mouvement souhaitée. Avant l’intégration, confirmez l’interface prise en charge et les unités des commandes.",
      contactLabel: "Contacter un ingénieur",
      productsLabel: "Voir les pompes à piston",
    },
    subject: {
      about: [
        "Communication Modbus",
        "Mise en service des équipements de contrôle des fluides",
      ],
      mentions: ["Modbus RTU", "Modbus ASCII", "Modbus TCP", "RS-485"],
    },
  },
  ko: {
    slug: "modbus-protocol-fluid-control",
    title: "Modbus 프로토콜: RTU, ASCII 및 TCP 통신의 기초",
    summary:
      "Modbus RTU·ASCII·TCP와 RS-485의 차이, 직렬 주소 지정, 기능 코드와 레지스터 맵을 설명하고 유체 제어 장치의 통신 설정과 시운전 절차를 정리합니다.",
    seoTitle:
      "Modbus 프로토콜: RTU, ASCII 및 TCP 통신의 기초 | Foreach Technology",
    seoDescription:
      "Modbus RTU·ASCII·TCP와 RS-485의 차이, 직렬 주소 지정, 기능 코드와 레지스터 맵을 설명하고 유체 제어 장치의 통신 설정과 시운전 절차를 정리합니다.",
    date: "2026-09-06",
    coverImage:
      "/images/resources/technical-articles/covers/pressure-flow-material-compatibility.webp",
    coverAlt: "튜브가 연결된 Foreach 정밀 유체 시스템용 펌프",
    intro: [],
    sections: [
      {
        title: "Modbus란 무엇이며 RS-485와 어떻게 다른가?",
        parts: [
          {
            type: "paragraph",
            text: "Modbus는 제어기와 장치 사이의 데이터 교환에 사용하는 응용 계층 메시징 프로토콜입니다. RS-485와 RS-232는 전기적 인터페이스를 규정합니다. Modbus RTU와 ASCII는 직렬 전송 모드이며, Modbus TCP는 TCP/IP를 통해 Modbus 메시지를 전송합니다. 따라서 RS-485 인터페이스가 있다는 사실만으로 해당 장치가 Modbus를 지원한다고 판단할 수는 없습니다.",
          },
          {
            type: "paragraph",
            text: "유체 제어 시스템에서는 Modbus로 장치 상태를 읽거나 제어 매개변수를 전송할 수 있습니다. 프로토콜 지원 여부, 지원 기능과 레지스터 정의는 해당 제어기 모델의 통신 매뉴얼에서 확인해야 합니다. 인터페이스 지원 여부는 Foreach 제품과 구성별로 확인해야 합니다.",
          },
        ],
      },
      {
        title: "Modbus RTU, ASCII, TCP는 어떻게 다른가?",
        parts: [
          {
            type: "paragraph",
            text: "커넥터만 보고 통신 모드를 구분할 수는 없습니다. 직렬 통신에서는 양쪽의 전송 모드, 통신 속도와 문자 프레임 설정이 일치해야 합니다. TCP 통신에서는 네트워크 연결과 장치의 서비스 설정을 확인해야 합니다.",
          },
          {
            type: "table",
            headers: ["방식", "메시지 구조", "확인 항목"],
            rows: [
              [
                "Modbus RTU",
                "장치 주소 + 기능 코드 + 데이터 + CRC",
                "직렬 통신 설정, 장치 주소와 프레임 간 시간 간격",
              ],
              [
                "Modbus ASCII",
                "LRC와 지정된 시작·종료 문자를 포함하는 ASCII 인코딩 메시지",
                "직렬 통신 설정, 인코딩과 LRC",
              ],
              [
                "Modbus TCP",
                "MBAP 헤더 + 기능 코드 + 데이터; RTU의 CRC는 추가하지 않음",
                "IP 주소, 포트, 트랜잭션 식별자와 장치 식별자(Unit Identifier)",
              ],
            ],
          },
        ],
      },
      {
        title: "직렬 장치 주소와 요청·응답은 어떻게 동작하는가?",
        parts: [
          {
            type: "paragraph",
            text: "Modbus 직렬 통신에서 서버(슬레이브)의 개별 주소는 1~247입니다. 주소 0은 브로드캐스트용이며 248~255는 예약되어 있습니다. 클라이언트(마스터)가 유니캐스트 요청을 보내면 지정된 장치가 응답합니다. 브로드캐스트 쓰기 요청에는 응답을 반환하지 않습니다. 주소 필드가 8비트라고 해서 0~255의 모든 값을 개별 장치 주소로 사용할 수 있는 것은 아닙니다.",
          },
          {
            type: "paragraph",
            text: "이 주소 지정 규칙은 직렬 통신에 적용됩니다. Modbus TCP의 MBAP 헤더에는 장치 식별자(Unit Identifier)가 포함됩니다. 게이트웨이가 메시지를 전달할 때 이 필드의 의미는 장치 구현에 따라 달라집니다. 모든 TCP 연결에 직렬 주소 규칙을 그대로 적용하지 말고 해당 장치의 매뉴얼을 확인해야 합니다.",
          },
        ],
      },
      {
        title: "Modbus 기능 코드와 레지스터 맵은 어떻게 함께 확인해야 하는가?",
        parts: [
          {
            type: "paragraph",
            text: "기능 코드는 데이터 종류와 읽기 또는 쓰기 동작을 지정합니다. 데이터 필드에는 해당 주소, 개수 또는 값이 포함됩니다. 두 장치가 모두 Modbus를 지원하더라도 레지스터 맵이 같다는 뜻은 아닙니다.",
          },
          {
            type: "paragraph",
            text: "시운전 전에 매뉴얼의 레지스터 번호와 메시지에 기록되는 시작 주소 사이에 오프셋이 있는지 확인해야 합니다. 데이터 폭, 부호 유무, 스케일 계수, 단위와 여러 레지스터에 걸친 값의 워드 순서도 확인해야 합니다. 속도, 위치, 액체 부피는 서로 다른 물리량이므로 값을 서로 바꾸어 사용할 수 없습니다.",
          },
          {
            type: "figures",
            items: [
              {
                src: "/images/resources/technical-articles/modbus-protocol-fluid-control/modbus-request-response.ko.svg",
                alt: "Modbus RTU와 ASCII의 직렬 유니캐스트 요청·응답 흐름, 메시지 필드와 주요 16진수 기능 코드",
                caption:
                  "정상 응답을 반환하는 직렬 유니캐스트 통신과 주요 Modbus 기능 코드. RTU는 CRC, ASCII는 LRC를 사용합니다. 브로드캐스트 요청에는 응답하지 않습니다. TCP 형식은 위 표를 참고하십시오.",
                width: 1200,
                height: 1030,
              },
            ],
          },
          {
            type: "table",
            headers: ["기능 코드(16진수)", "동작"],
            rows: [
              ["01", "코일 읽기"],
              ["02", "이산 입력 읽기"],
              ["03", "홀딩 레지스터 읽기"],
              ["04", "입력 레지스터 읽기"],
              ["05", "단일 코일 쓰기"],
              ["06", "단일 레지스터 쓰기"],
              ["0F", "여러 코일 쓰기"],
              ["10", "여러 레지스터 쓰기"],
            ],
          },
          {
            type: "notice",
            text: "그림은 정상 응답을 반환하는 직렬 유니캐스트 통신을 나타냅니다. 브로드캐스트 요청에는 응답하지 않습니다. 예외 응답에는 예외 기능 코드와 예외 코드가 사용되며, 이 그림에는 표시하지 않았습니다. TCP는 위 표의 MBAP 헤더 기반 형식을 사용합니다. 장치에서 지원하는 기능은 해당 통신 매뉴얼을 확인해야 합니다.",
          },
          {
            type: "links",
            items: [
              {
                label: "스테퍼 모터 계산과 선정",
                href: "/resources/technical-articles/stepper-motor-calculation-selection/",
              },
            ],
          },
        ],
      },
      {
        title: "Modbus를 사용하는 유체 제어 장치는 어떻게 시운전하는가?",
        parts: [
          {
            type: "paragraph",
            text: "먼저 배선과 전원을 점검한 다음 장치 매뉴얼에 따라 통신 매개변수를 설정합니다. 이미 알고 있는 상태 값을 읽는 것부터 시작합니다. 응답의 장치 주소, 기능 코드와 데이터 의미를 확인한 뒤 허용된 매개변수 쓰기와 모션 명령을 시험합니다.",
          },
          {
            type: "paragraph",
            text: "통신 성공, 명령 수락, 동작 완료와 실제 토출량의 적합 여부를 각각 검증해야 합니다. 쓰기 응답을 받았다고 해서 펌프 동작이 완료된 것은 아닙니다. 타임아웃이 발생하면 토출 명령을 다시 보내기 전에 장치 상태를 확인하여 같은 양이 두 번 토출되지 않도록 해야 합니다.",
          },
          {
            type: "paragraph",
            text: "요청, 응답, 예외 코드와 타임아웃 발생 조건을 기록합니다. 문제 원인을 찾을 때는 리미트 신호, 원점 복귀, 밸브 상태와 동작 타이밍을 함께 점검합니다. 정확한 명령, 주소와 카운트 단위는 해당 장치의 통신 매뉴얼을 기준으로 확인합니다.",
          },
          {
            type: "links",
            items: [
              {
                label: "피스톤 펌프 가속 및 감속",
                href: "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/",
              },
              {
                label: "피스톤 펌프 백래시 보정",
                href: "/resources/technical-articles/precision-piston-pump-backlash-compensation/",
              },
            ],
          },
        ],
      },
    ],
    referencesTitle: "참고 자료",
    references: [
      {
        label: "Modbus Organization: 직렬 통신 규격 및 구현 가이드 V1.02",
        href: "https://www.modbus.org/file/secure/modbusoverserial.pdf",
      },
      {
        label: "Modbus Organization: TCP/IP 메시징 구현 가이드 V1.0b",
        href: "https://www.modbus.org/file/secure/messagingimplementationguide.pdf",
      },
    ],
    cta: {
      title: "통신 설정과 동작 요구사항을 함께 확인하십시오",
      description:
        "제어기 모델, 통신 매뉴얼, 레지스터 맵, 배선도와 필요한 동작 순서를 제공해 주십시오. 장치를 통합하기 전에 지원 인터페이스와 명령 단위를 확인해야 합니다.",
      contactLabel: "엔지니어에게 문의",
      productsLabel: "피스톤 펌프 보기",
    },
    subject: {
      about: ["Modbus 통신", "유체 제어 장치 시운전"],
      mentions: ["Modbus RTU", "Modbus ASCII", "Modbus TCP", "RS-485"],
    },
  },
  ru: {
    slug: "modbus-protocol-fluid-control",
    title: "Протокол Modbus: основы RTU, ASCII и TCP",
    summary:
      "Различия Modbus RTU, ASCII, TCP и RS-485, адресация в последовательной сети, коды функций, карта регистров и наладка связи с устройствами управления жидкостными системами.",
    seoTitle: "Протокол Modbus: основы RTU, ASCII и TCP | Foreach Technology",
    seoDescription:
      "Различия Modbus RTU, ASCII, TCP и RS-485, адресация в последовательной сети, коды функций, карта регистров и наладка связи с устройствами управления жидкостными системами.",
    date: "2026-09-06",
    coverImage:
      "/images/resources/technical-articles/covers/pressure-flow-material-compatibility.webp",
    coverAlt:
      "Насос Foreach для прецизионной жидкостной системы с подключёнными трубками",
    intro: [],
    sections: [
      {
        title: "Что такое Modbus и чем он отличается от RS-485?",
        parts: [
          {
            type: "paragraph",
            text: "Modbus — это протокол обмена сообщениями прикладного уровня, предназначенный для передачи данных между контроллерами и устройствами. RS-485 и RS-232 определяют электрические интерфейсы. Modbus RTU и ASCII представляют собой режимы последовательной передачи, а Modbus TCP передаёт сообщения Modbus по TCP/IP. Наличие интерфейса RS-485 само по себе не означает, что устройство поддерживает Modbus.",
          },
          {
            type: "paragraph",
            text: "В жидкостной системе Modbus может использоваться для чтения состояния устройств или передачи параметров управления. Поддержку протокола, доступные функции и назначение регистров следует проверять по руководству по связи для конкретной модели контроллера. Поддерживаемый интерфейс необходимо подтверждать для каждого изделия Foreach и его конфигурации.",
          },
        ],
      },
      {
        title: "Чем различаются Modbus RTU, ASCII и TCP?",
        parts: [
          {
            type: "paragraph",
            text: "По одному разъёму определить режим связи нельзя. В последовательной сети на обоих концах должны совпадать режим передачи, скорость в бодах и формат передаваемых символов. Для TCP необходимо проверить сетевое подключение и настройки службы на устройстве.",
          },
          {
            type: "table",
            headers: ["Режим", "Структура сообщения", "Что проверить"],
            rows: [
              [
                "Modbus RTU",
                "Адрес устройства + Код функции + Данные + CRC",
                "Настройки последовательной связи, адрес устройства и интервал между кадрами",
              ],
              [
                "Modbus ASCII",
                "Сообщение в кодировке ASCII с LRC и заданными символами начала и конца",
                "Настройки последовательной связи, кодировку и LRC",
              ],
              [
                "Modbus TCP",
                "Заголовок MBAP + Код функции + Данные; CRC режима RTU не добавляется",
                "IP-адрес, порт, идентификатор транзакции и идентификатор устройства (Unit Identifier)",
              ],
            ],
          },
        ],
      },
      {
        title:
          "Как работают адресация и обмен запросами и ответами в последовательной сети?",
        parts: [
          {
            type: "paragraph",
            text: "В последовательной сети Modbus индивидуальные адреса серверов (ведомых устройств) находятся в диапазоне 1–247. Адрес 0 выделен для широковещательных запросов, а адреса 248–255 зарезервированы. Клиент (ведущее устройство) отправляет адресный запрос, после чего указанное устройство возвращает ответ. На широковещательные запросы записи ответа нет. Поэтому 8-битное поле адреса не означает, что все значения от 0 до 255 допустимы как индивидуальные адреса устройств.",
          },
          {
            type: "paragraph",
            text: "Эти правила адресации относятся к последовательной связи. В заголовке MBAP протокола Modbus TCP есть идентификатор устройства (Unit Identifier). При передаче сообщений через шлюз назначение этого поля зависит от реализации устройства. Прежде чем применять правила последовательной адресации к TCP-соединению, проверьте руководство конкретного устройства.",
          },
        ],
      },
      {
        title: "Как читать коды функций Modbus вместе с картой регистров?",
        parts: [
          {
            type: "paragraph",
            text: "Код функции определяет категорию данных и операцию чтения или записи. Поле данных содержит соответствующие адреса, количество элементов или значения. Даже если оба устройства поддерживают Modbus, их карты регистров могут различаться.",
          },
          {
            type: "paragraph",
            text: "До наладки проверьте, есть ли смещение между номерами регистров в руководстве и начальными адресами, передаваемыми в сообщениях. Также уточните разрядность данных, знаковое или беззнаковое представление, коэффициенты масштабирования, единицы измерения и порядок слов для значений, занимающих несколько регистров. Скорость, положение и объём жидкости — разные величины; их значения нельзя подменять друг другом.",
          },
          {
            type: "figures",
            items: [
              {
                src: "/images/resources/technical-articles/modbus-protocol-fluid-control/modbus-request-response.ru.svg",
                alt: "Схема адресного обмена запросами и ответами Modbus RTU и ASCII, поля сообщений и распространённые шестнадцатеричные коды функций",
                caption:
                  "Обычный адресный обмен в последовательной сети с нормальным ответом и распространённые коды функций Modbus. RTU использует CRC, ASCII — LRC. На широковещательные запросы ответа нет. Формат TCP приведён в таблице выше.",
                width: 1200,
                height: 1030,
              },
            ],
          },
          {
            type: "table",
            headers: ["Код функции (hex)", "Операция"],
            rows: [
              ["01", "Чтение дискретных выходов"],
              ["02", "Чтение дискретных входов"],
              ["03", "Чтение регистров хранения"],
              ["04", "Чтение входных регистров"],
              ["05", "Запись одного дискретного выхода"],
              ["06", "Запись одного регистра"],
              ["0F", "Запись нескольких дискретных выходов"],
              ["10", "Запись нескольких регистров"],
            ],
          },
          {
            type: "notice",
            text: "На схеме показан обычный адресный обмен в последовательной сети с нормальным ответом. На широковещательные запросы ответа нет. Ответы об исключениях содержат код функции с признаком исключения и код исключения; на схеме они не показаны. Для TCP используется описанный выше формат с заголовком MBAP. Доступные функции указаны в руководстве по связи устройства.",
          },
          {
            type: "links",
            items: [
              {
                label: "Расчёт и выбор шагового двигателя",
                href: "/resources/technical-articles/stepper-motor-calculation-selection/",
              },
            ],
          },
        ],
      },
      {
        title:
          "Как наладить устройство управления жидкостной системой по Modbus?",
        parts: [
          {
            type: "paragraph",
            text: "Сначала проверьте подключение и питание, затем настройте параметры связи по руководству устройства. Начните с чтения известного значения состояния. Проверьте адрес устройства, код функции и смысл полученных данных, прежде чем испытывать разрешённую запись параметров и команды движения.",
          },
          {
            type: "paragraph",
            text: "Отдельно проверяйте успешный обмен данными, принятие команды, завершение движения и соответствие фактически поданного объёма заданию. Подтверждение записи не означает, что насос завершил движение. После тайм-аута сначала запросите состояние устройства и лишь затем решайте, нужно ли повторять команду дозирования, чтобы не подать дозу дважды.",
          },
          {
            type: "paragraph",
            text: "Регистрируйте запросы, ответы, коды исключений и условия возникновения тайм-аутов. При поиске неисправности проверяйте концевые сигналы, поиск исходного положения, состояние клапанов и временную последовательность движений. Точные команды, адреса и единицы отсчёта определяются руководством по связи устройства.",
          },
          {
            type: "links",
            items: [
              {
                label: "Разгон и торможение поршневого насоса",
                href: "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/",
              },
              {
                label: "Компенсация люфта поршневого насоса",
                href: "/resources/technical-articles/precision-piston-pump-backlash-compensation/",
              },
            ],
          },
        ],
      },
    ],
    referencesTitle: "Источники",
    references: [
      {
        label:
          "Modbus Organization: спецификация и руководство по реализации последовательной связи V1.02",
        href: "https://www.modbus.org/file/secure/modbusoverserial.pdf",
      },
      {
        label:
          "Modbus Organization: руководство по реализации обмена сообщениями по TCP/IP V1.0b",
        href: "https://www.modbus.org/file/secure/messagingimplementationguide.pdf",
      },
    ],
    cta: {
      title: "Согласуйте параметры связи и требования к движению",
      description:
        "Предоставьте модель контроллера, руководство по связи, карту регистров, схему подключения и требуемую последовательность движений. До интеграции подтвердите поддерживаемый интерфейс и единицы команд.",
      contactLabel: "Связаться с инженером",
      productsLabel: "Посмотреть поршневые насосы",
    },
    subject: {
      about: [
        "Связь по Modbus",
        "Наладка устройств управления жидкостными системами",
      ],
      mentions: ["Modbus RTU", "Modbus ASCII", "Modbus TCP", "RS-485"],
    },
  },
} satisfies Record<PistonPumpArticleLocale, PistonPumpArticleCopy>;
