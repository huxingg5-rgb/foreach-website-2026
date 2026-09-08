import type { PistonPumpArticleCopy, PistonPumpArticleLocale } from "./piston-pump-articles.types";

export const modbusProtocolArticles = {
  "en": {
    "slug": "modbus-protocol-fluid-control",
    "title": "Modbus Protocol: RTU, ASCII and TCP Basics",
    "summary": "Distinguish Modbus from RS-485, understand RTU, ASCII and TCP messages, serial addressing and request–response behavior, and commission fluid-control devices.",
    "seoTitle": "Modbus Protocol: RTU, ASCII and TCP Basics | FOREACH",
    "seoDescription": "Distinguish Modbus from RS-485, understand RTU, ASCII and TCP messages, serial addressing and request–response behavior, and commission fluid-control devices.",
    "date": "2026-09-06",
    "coverImage": "/images/resources/technical-articles/covers/pressure-flow-material-compatibility.webp",
    "coverAlt": "FOREACH precision fluid-system pump and connected tubing",
    "intro": [],
    "sections": [
      {
        "title": "What is Modbus?",
        "parts": [
          {
            "type": "paragraph",
            "text": "Modbus is an application-layer messaging protocol for exchanging data between controllers and devices. RS-485 and RS-232 are electrical interfaces; Modbus RTU, ASCII and TCP define corresponding message and transport formats. An RS-485 interface does not automatically imply Modbus support."
          },
          {
            "type": "paragraph",
            "text": "In fluid control it may read status or transmit control parameters. Support, function codes and registers must be confirmed in the communication manual of the exact controller. This article does not claim that every FOREACH product supports these interfaces."
          }
        ]
      },
      {
        "title": "How do RTU, ASCII and TCP differ?",
        "parts": [
          {
            "type": "paragraph",
            "text": "A connector alone cannot identify the mode. Serial devices must match transmission mode, baud rate and frame format; TCP requires compatible network and device-service settings."
          },
          {
            "type": "table",
            "headers": [
              "Mode",
              "Message structure",
              "Check"
            ],
            "rows": [
              [
                "Modbus RTU",
                "Address + Function code + Data + CRC",
                "Serial settings, device address and frame timing"
              ],
              [
                "Modbus ASCII",
                "ASCII encoding with LRC and defined start/end characters",
                "Serial settings, encoding and LRC"
              ],
              [
                "Modbus TCP",
                "MBAP header + Function code + Data; no additional RTU CRC",
                "IP address, port, transaction identifier and Unit Identifier"
              ]
            ]
          }
        ]
      },
      {
        "title": "Serial addresses and request–response",
        "parts": [
          {
            "type": "paragraph",
            "text": "Serial unicast device addresses are 1–247; 0 is broadcast and 248–255 are reserved. The controller normally initiates a unicast request and the addressed device responds. Broadcast write requests receive no response. An 8-bit address field does not make every value from 0 to 255 a valid individual address."
          },
          {
            "type": "paragraph",
            "text": "These rules concern serial links. Modbus TCP has a Unit Identifier in the MBAP header; its gateway routing meaning depends on the implementation. Do not apply serial addressing rules blindly to every TCP configuration."
          }
        ]
      },
      {
        "title": "Read function codes together with the register map",
        "parts": [
          {
            "type": "paragraph",
            "text": "The function code identifies the data type and read/write operation; the data field contains addresses, quantities or values. Two Modbus devices do not necessarily share register definitions."
          },
          {
            "type": "paragraph",
            "text": "Check whether manual register numbers and message starting addresses have an offset. Confirm width, signedness, scaling, units and word order for multi-register values. Speed, position and liquid-volume values are not interchangeable."
          },
          {
            "type": "table",
            "headers": [
              "Direction",
              "Normal serial unicast message"
            ],
            "rows": [
              [
                "Controller → Device",
                "Address | Function code | Data | CRC (RTU) / LRC (ASCII)"
              ],
              [
                "Device → Controller",
                "Address | Function code | Data | CRC (RTU) / LRC (ASCII)"
              ]
            ]
          },
          {
            "type": "table",
            "headers": [
              "Function code (hex)",
              "Operation"
            ],
            "rows": [
              [
                "01",
                "Read coils"
              ],
              [
                "02",
                "Read discrete inputs"
              ],
              [
                "03",
                "Read holding registers"
              ],
              [
                "04",
                "Read input registers"
              ],
              [
                "05",
                "Write single coil"
              ],
              [
                "06",
                "Write single register"
              ],
              [
                "0F",
                "Write multiple coils"
              ],
              [
                "10",
                "Write multiple registers"
              ]
            ]
          },
          {
            "type": "notice",
            "text": "The request–response table covers normal serial unicast exchanges. Broadcast has no reply; exception responses have a different function-code/data meaning. TCP uses the format described above. A device need not implement every listed function."
          },
          {
            "type": "links",
            "items": [
              {
                "label": "Stepper motor calculations and selection",
                "href": "/resources/technical-articles/stepper-motor-calculation-selection/"
              }
            ]
          }
        ]
      },
      {
        "title": "Commissioning a fluid-control device",
        "parts": [
          {
            "type": "paragraph",
            "text": "Confirm wiring and power first, then match the communication settings to the manual. Start by reading a known status and checking device address, function code and data meaning, before testing permitted parameter writes and motion commands."
          },
          {
            "type": "paragraph",
            "text": "Verify communication success, command acceptance, completed motion and delivered volume separately. A write acknowledgment does not prove that the pump has finished. After a timeout, query status before repeating a dispensing command to avoid duplicate dosing."
          },
          {
            "type": "paragraph",
            "text": "Record requests, replies, exception codes and timeout conditions. Use limits, homing, valve state and sequence timing to locate problems. Exact commands, addresses and counting units come from the device communication manual."
          },
          {
            "type": "links",
            "items": [
              {
                "label": "Piston-pump acceleration and deceleration",
                "href": "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/"
              },
              {
                "label": "Piston-pump backlash compensation",
                "href": "/resources/technical-articles/precision-piston-pump-backlash-compensation/"
              }
            ]
          }
        ]
      }
    ],
    "referencesTitle": "References",
    "references": [
      {
        "label": "Modbus Organization: Serial Line Specification V1.02",
        "href": "https://www.modbus.org/file/secure/modbusoverserial.pdf"
      },
      {
        "label": "Modbus Organization: TCP/IP Implementation Guide",
        "href": "https://www.modbus.org/file/secure/messagingimplementationguide.pdf"
      }
    ],
    "cta": {
      "title": "Plan communication and motion together",
      "description": "Share the controller model, communication manual, register map, wiring and required motion sequence. Confirm interface support and command units before integration.",
      "contactLabel": "Contact an engineer",
      "productsLabel": "View piston pumps"
    },
    "subject": {
      "about": [
        "Modbus",
        "Commissioning a fluid-control device"
      ],
      "mentions": [
        "Modbus RTU",
        "Modbus ASCII",
        "Modbus TCP",
        "RS-485"
      ]
    }
  },
  "es": {
    "slug": "modbus-protocol-fluid-control",
    "title": "Protocolo Modbus: fundamentos de RTU, ASCII y TCP",
    "summary": "Distinga Modbus de RS-485, conozca mensajes RTU, ASCII y TCP, direccionamiento serie y solicitud–respuesta, y prepare la integración de dispositivos de control de fluidos.",
    "seoTitle": "Protocolo Modbus: fundamentos de RTU, ASCII y TCP | FOREACH",
    "seoDescription": "Distinga Modbus de RS-485, conozca mensajes RTU, ASCII y TCP, direccionamiento serie y solicitud–respuesta, y prepare la integración de dispositivos de control de fluidos.",
    "date": "2026-09-06",
    "coverImage": "/images/resources/technical-articles/covers/pressure-flow-material-compatibility.webp",
    "coverAlt": "Bomba y tubos conectados de un sistema de fluidos de precisión FOREACH",
    "intro": [],
    "sections": [
      {
        "title": "¿Qué es Modbus?",
        "parts": [
          {
            "type": "paragraph",
            "text": "Modbus es un protocolo de mensajes de capa de aplicación para intercambiar datos entre controladores y dispositivos. RS-485 y RS-232 son interfaces eléctricas; Modbus RTU, ASCII y TCP definen formatos de mensajes y transporte. Tener RS-485 no implica automáticamente admitir Modbus."
          },
          {
            "type": "paragraph",
            "text": "En control de fluidos puede leer estados o transmitir parámetros. La compatibilidad, funciones y registros deben confirmarse en el manual de comunicación del controlador concreto. Este artículo no afirma que todos los productos FOREACH admitan estas interfaces."
          }
        ]
      },
      {
        "title": "¿Cómo se diferencian RTU, ASCII y TCP?",
        "parts": [
          {
            "type": "paragraph",
            "text": "El conector no identifica por sí solo el modo. En serie deben coincidir modo, velocidad en baudios y formato de trama; TCP necesita ajustes de red y servicio compatibles."
          },
          {
            "type": "table",
            "headers": [
              "Modo",
              "Estructura del mensaje",
              "Comprobar"
            ],
            "rows": [
              [
                "Modbus RTU",
                "Dirección + Código de función + Datos + CRC",
                "Configuración serie, dirección y temporización de tramas"
              ],
              [
                "Modbus ASCII",
                "Codificación ASCII con LRC y caracteres definidos de inicio y fin",
                "Configuración serie, codificación y LRC"
              ],
              [
                "Modbus TCP",
                "Cabecera MBAP + Código de función + Datos; sin CRC adicional de RTU",
                "IP, puerto, identificador de transacción y Unit Identifier"
              ]
            ]
          }
        ]
      },
      {
        "title": "Direcciones serie y solicitud–respuesta",
        "parts": [
          {
            "type": "paragraph",
            "text": "Las direcciones individuales serie son 1–247; 0 corresponde a difusión y 248–255 están reservadas. El controlador inicia normalmente una solicitud unicast y responde el dispositivo direccionado. Las escrituras de difusión no reciben respuesta. Un campo de 8 bits no convierte todos los valores 0–255 en direcciones individuales válidas."
          },
          {
            "type": "paragraph",
            "text": "Estas reglas se refieren a enlaces serie. Modbus TCP incluye Unit Identifier en MBAP; su función de encaminamiento por pasarela depende de la implementación. No aplique sin más las reglas serie a toda configuración TCP."
          }
        ]
      },
      {
        "title": "Consulte los códigos de función junto con el mapa de registros",
        "parts": [
          {
            "type": "paragraph",
            "text": "El código identifica el tipo de datos y la operación de lectura o escritura; el campo de datos contiene direcciones, cantidades o valores. Dos dispositivos Modbus no necesariamente comparten registros."
          },
          {
            "type": "paragraph",
            "text": "Compruebe posibles desplazamientos entre el número de registro del manual y la dirección inicial del mensaje. Confirme anchura, signo, escala, unidades y orden de palabras en valores de varios registros. Velocidad, posición y volumen de líquido no son intercambiables."
          },
          {
            "type": "table",
            "headers": [
              "Dirección",
              "Mensaje unicast serie normal"
            ],
            "rows": [
              [
                "Controlador → Dispositivo",
                "Dirección | Código de función | Datos | CRC (RTU) / LRC (ASCII)"
              ],
              [
                "Dispositivo → Controlador",
                "Dirección | Código de función | Datos | CRC (RTU) / LRC (ASCII)"
              ]
            ]
          },
          {
            "type": "table",
            "headers": [
              "Código de función (hex)",
              "Operación"
            ],
            "rows": [
              [
                "01",
                "Leer bobinas"
              ],
              [
                "02",
                "Leer entradas discretas"
              ],
              [
                "03",
                "Leer registros de retención"
              ],
              [
                "04",
                "Leer registros de entrada"
              ],
              [
                "05",
                "Escribir una bobina"
              ],
              [
                "06",
                "Escribir un registro"
              ],
              [
                "0F",
                "Escribir varias bobinas"
              ],
              [
                "10",
                "Escribir varios registros"
              ]
            ]
          },
          {
            "type": "notice",
            "text": "La tabla representa intercambios unicast serie normales. La difusión no tiene respuesta; las excepciones cambian el significado de función y datos. TCP usa el formato anterior. Un dispositivo no tiene que implementar todas las funciones enumeradas."
          },
          {
            "type": "links",
            "items": [
              {
                "label": "Cálculo y selección del motor paso a paso",
                "href": "/resources/technical-articles/stepper-motor-calculation-selection/"
              }
            ]
          }
        ]
      },
      {
        "title": "Puesta en marcha de un dispositivo de control de fluidos",
        "parts": [
          {
            "type": "paragraph",
            "text": "Confirme cableado y alimentación y ajuste la comunicación al manual. Empiece por un estado conocido, verificando dirección, función y datos de la respuesta, antes de probar escrituras permitidas y órdenes de movimiento."
          },
          {
            "type": "paragraph",
            "text": "Verifique por separado comunicación, aceptación de orden, movimiento terminado y volumen entregado. Un acuse de escritura no prueba que la bomba haya terminado. Tras un timeout, consulte el estado antes de repetir la dosificación para evitar duplicarla."
          },
          {
            "type": "paragraph",
            "text": "Registre solicitudes, respuestas, excepciones y condiciones de timeout. Use límites, referencia de origen, estado de válvulas y secuencia temporal para localizar problemas. Los comandos, direcciones y unidades exactos proceden del manual del dispositivo."
          },
          {
            "type": "links",
            "items": [
              {
                "label": "Aceleración y desaceleración de bombas de pistón",
                "href": "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/"
              },
              {
                "label": "Compensación de holgura en bombas de pistón",
                "href": "/resources/technical-articles/precision-piston-pump-backlash-compensation/"
              }
            ]
          }
        ]
      }
    ],
    "referencesTitle": "Referencias",
    "references": [
      {
        "label": "Modbus Organization: especificación serie V1.02",
        "href": "https://www.modbus.org/file/secure/modbusoverserial.pdf"
      },
      {
        "label": "Modbus Organization: guía de implementación TCP/IP",
        "href": "https://www.modbus.org/file/secure/messagingimplementationguide.pdf"
      }
    ],
    "cta": {
      "title": "Planifique comunicación y movimiento conjuntamente",
      "description": "Facilite modelo del controlador, manual, mapa de registros, cableado y secuencia requerida. Confirme interfaz y unidades de comando antes de integrar.",
      "contactLabel": "Contactar con un ingeniero",
      "productsLabel": "Ver bombas de pistón"
    },
    "subject": {
      "about": [
        "Modbus",
        "Puesta en marcha de un dispositivo de control de fluidos"
      ],
      "mentions": [
        "Modbus RTU",
        "Modbus ASCII",
        "Modbus TCP",
        "RS-485"
      ]
    }
  },
  "fr": {
    "slug": "modbus-protocol-fluid-control",
    "title": "Protocole Modbus : bases de RTU, ASCII et TCP",
    "summary": "Distinguer Modbus de RS-485, comprendre messages RTU, ASCII et TCP, adressage série et requête–réponse, puis intégrer des dispositifs de contrôle des fluides.",
    "seoTitle": "Protocole Modbus : bases de RTU, ASCII et TCP | FOREACH",
    "seoDescription": "Distinguer Modbus de RS-485, comprendre messages RTU, ASCII et TCP, adressage série et requête–réponse, puis intégrer des dispositifs de contrôle des fluides.",
    "date": "2026-09-06",
    "coverImage": "/images/resources/technical-articles/covers/pressure-flow-material-compatibility.webp",
    "coverAlt": "Pompe et tubes d’un système de fluides de précision FOREACH",
    "intro": [],
    "sections": [
      {
        "title": "Qu’est-ce que Modbus ?",
        "parts": [
          {
            "type": "paragraph",
            "text": "Modbus est un protocole de messages de couche application pour échanger des données entre contrôleurs et dispositifs. RS-485 et RS-232 sont des interfaces électriques ; Modbus RTU, ASCII et TCP définissent les formats de messages et transports associés. Une interface RS-485 n’implique pas automatiquement la prise en charge de Modbus."
          },
          {
            "type": "paragraph",
            "text": "En contrôle des fluides, il peut lire un état ou transmettre des paramètres. Prise en charge, fonctions et registres doivent être confirmés dans le manuel du contrôleur exact. Cet article ne prétend pas que tous les produits FOREACH disposent de ces interfaces."
          }
        ]
      },
      {
        "title": "Comment distinguer RTU, ASCII et TCP ?",
        "parts": [
          {
            "type": "paragraph",
            "text": "Le connecteur ne suffit pas à identifier le mode. En série, mode, débit en bauds et format de trame doivent correspondre ; TCP exige des réglages réseau et de service compatibles."
          },
          {
            "type": "table",
            "headers": [
              "Mode",
              "Structure du message",
              "À vérifier"
            ],
            "rows": [
              [
                "Modbus RTU",
                "Adresse + Code fonction + Données + CRC",
                "Paramètres série, adresse et temporisation des trames"
              ],
              [
                "Modbus ASCII",
                "Codage ASCII avec LRC et caractères de début/fin définis",
                "Paramètres série, codage et LRC"
              ],
              [
                "Modbus TCP",
                "En-tête MBAP + Code fonction + Données ; sans CRC RTU supplémentaire",
                "IP, port, identifiant de transaction et Unit Identifier"
              ]
            ]
          }
        ]
      },
      {
        "title": "Adresses série et requête–réponse",
        "parts": [
          {
            "type": "paragraph",
            "text": "Les adresses individuelles série vont de 1 à 247 ; 0 est la diffusion et 248–255 sont réservées. Le contrôleur initie normalement une requête unicast et le dispositif adressé répond. Les écritures diffusées ne reçoivent pas de réponse. Un champ de 8 bits ne rend pas toutes les valeurs 0–255 valides comme adresses individuelles."
          },
          {
            "type": "paragraph",
            "text": "Ces règles concernent les liaisons série. Modbus TCP comporte un Unit Identifier dans MBAP ; son rôle d’acheminement par passerelle dépend de l’implémentation. N’appliquez pas aveuglément l’adressage série à toute configuration TCP."
          }
        ]
      },
      {
        "title": "Lire les fonctions avec la table des registres",
        "parts": [
          {
            "type": "paragraph",
            "text": "Le code fonction indique le type de données et l’opération de lecture/écriture ; les données contiennent adresses, quantités ou valeurs. Deux dispositifs Modbus n’ont pas nécessairement les mêmes registres."
          },
          {
            "type": "paragraph",
            "text": "Vérifiez le décalage éventuel entre numéros du manuel et adresses de départ du message. Confirmez largeur, signe, échelle, unités et ordre des mots pour les valeurs multiregistres. Vitesse, position et volume liquide ne sont pas interchangeables."
          },
          {
            "type": "table",
            "headers": [
              "Sens",
              "Message unicast série normal"
            ],
            "rows": [
              [
                "Contrôleur → Dispositif",
                "Adresse | Code fonction | Données | CRC (RTU) / LRC (ASCII)"
              ],
              [
                "Dispositif → Contrôleur",
                "Adresse | Code fonction | Données | CRC (RTU) / LRC (ASCII)"
              ]
            ]
          },
          {
            "type": "table",
            "headers": [
              "Code fonction (hex)",
              "Opération"
            ],
            "rows": [
              [
                "01",
                "Lire les bobines"
              ],
              [
                "02",
                "Lire les entrées discrètes"
              ],
              [
                "03",
                "Lire les registres de maintien"
              ],
              [
                "04",
                "Lire les registres d’entrée"
              ],
              [
                "05",
                "Écrire une bobine"
              ],
              [
                "06",
                "Écrire un registre"
              ],
              [
                "0F",
                "Écrire plusieurs bobines"
              ],
              [
                "10",
                "Écrire plusieurs registres"
              ]
            ]
          },
          {
            "type": "notice",
            "text": "Le tableau couvre les échanges unicast série normaux. La diffusion n’a pas de réponse ; les exceptions modifient le sens du code fonction et des données. TCP utilise le format présenté plus haut. Un dispositif n’implémente pas nécessairement toutes ces fonctions."
          },
          {
            "type": "links",
            "items": [
              {
                "label": "Calcul et sélection d’un moteur pas à pas",
                "href": "/resources/technical-articles/stepper-motor-calculation-selection/"
              }
            ]
          }
        ]
      },
      {
        "title": "Mise en service d’un dispositif de contrôle des fluides",
        "parts": [
          {
            "type": "paragraph",
            "text": "Confirmez câblage et alimentation, puis réglez la communication selon le manuel. Lisez d’abord un état connu et vérifiez adresse, fonction et données avant de tester les écritures autorisées et les mouvements."
          },
          {
            "type": "paragraph",
            "text": "Vérifiez séparément communication, acceptation de commande, fin du mouvement et volume délivré. Un acquittement d’écriture ne prouve pas que la pompe a terminé. Après expiration du délai, interrogez l’état avant de répéter un dosage pour éviter de le doubler."
          },
          {
            "type": "paragraph",
            "text": "Enregistrez requêtes, réponses, exceptions et délais. Utilisez limites, référencement, état des vannes et chronologie pour localiser les problèmes. Commandes, adresses et unités exactes proviennent du manuel du dispositif."
          },
          {
            "type": "links",
            "items": [
              {
                "label": "Accélération et décélération d’une pompe à piston",
                "href": "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/"
              },
              {
                "label": "Compensation du jeu d’une pompe à piston",
                "href": "/resources/technical-articles/precision-piston-pump-backlash-compensation/"
              }
            ]
          }
        ]
      }
    ],
    "referencesTitle": "Références",
    "references": [
      {
        "label": "Modbus Organization : spécification série V1.02",
        "href": "https://www.modbus.org/file/secure/modbusoverserial.pdf"
      },
      {
        "label": "Modbus Organization : guide d’implémentation TCP/IP",
        "href": "https://www.modbus.org/file/secure/messagingimplementationguide.pdf"
      }
    ],
    "cta": {
      "title": "Planifier ensemble communication et mouvement",
      "description": "Fournissez modèle du contrôleur, manuel, table des registres, câblage et séquence requise. Confirmez interfaces et unités de commande avant intégration.",
      "contactLabel": "Contacter un ingénieur",
      "productsLabel": "Voir les pompes à piston"
    },
    "subject": {
      "about": [
        "Modbus",
        "Mise en service d’un dispositif de contrôle des fluides"
      ],
      "mentions": [
        "Modbus RTU",
        "Modbus ASCII",
        "Modbus TCP",
        "RS-485"
      ]
    }
  },
  "ko": {
    "slug": "modbus-protocol-fluid-control",
    "title": "Modbus 프로토콜: RTU, ASCII 및 TCP 통신의 기초",
    "summary": "Modbus와 RS-485의 차이, RTU·ASCII·TCP 메시지, 직렬 주소 지정 및 요청·응답 동작을 이해하고 유체 제어 장치를 시운전하는 방법을 살펴봅니다.",
    "seoTitle": "Modbus 프로토콜: RTU, ASCII 및 TCP 통신의 기초 | FOREACH",
    "seoDescription": "Modbus와 RS-485의 차이, RTU·ASCII·TCP 메시지, 직렬 주소 지정 및 요청·응답 동작을 이해하고 유체 제어 장치를 시운전하는 방법을 살펴봅니다.",
    "date": "2026-09-06",
    "coverImage": "/images/resources/technical-articles/covers/pressure-flow-material-compatibility.webp",
    "coverAlt": "FOREACH 정밀 유체 시스템용 펌프와 연결 튜브",
    "intro": [],
    "sections": [
      {
        "title": "Modbus란 무엇인가?",
        "parts": [
          {
            "type": "paragraph",
            "text": "Modbus는 제어기와 장치 사이에서 데이터를 교환하는 응용 계층 메시징 프로토콜입니다. RS-485와 RS-232는 전기적 인터페이스이며, Modbus RTU, ASCII 및 TCP는 각 메시지 형식과 전송 방식을 정의합니다. RS-485 인터페이스가 있다는 사실만으로 Modbus 지원을 의미하지는 않습니다."
          },
          {
            "type": "paragraph",
            "text": "유체 제어에서는 상태를 읽거나 제어 매개변수를 전달하는 데 사용할 수 있습니다. 지원 여부, 기능 코드 및 레지스터는 해당 제어기 모델의 통신 매뉴얼에서 확인해야 합니다. 이 글은 모든 FOREACH 제품이 이러한 인터페이스를 지원한다고 설명하는 것이 아닙니다."
          }
        ]
      },
      {
        "title": "RTU, ASCII 및 TCP는 어떻게 다른가?",
        "parts": [
          {
            "type": "paragraph",
            "text": "커넥터만 보고 통신 모드를 판별할 수는 없습니다. 직렬 장치는 전송 모드, 전송 속도 및 프레임 형식이 일치해야 합니다. TCP에서는 네트워크 설정과 장치 서비스 설정이 호환되어야 합니다."
          },
          {
            "type": "table",
            "headers": [
              "모드",
              "메시지 구조",
              "확인 항목"
            ],
            "rows": [
              [
                "Modbus RTU",
                "주소 + 기능 코드 + 데이터 + CRC",
                "직렬 통신 설정, 장치 주소 및 프레임 타이밍"
              ],
              [
                "Modbus ASCII",
                "LRC와 지정된 시작·종료 문자를 사용하는 ASCII 인코딩",
                "직렬 통신 설정, 인코딩 및 LRC"
              ],
              [
                "Modbus TCP",
                "MBAP 헤더 + 기능 코드 + 데이터; RTU용 CRC를 추가하지 않음",
                "IP 주소, 포트, 트랜잭션 식별자 및 Unit Identifier"
              ]
            ]
          }
        ]
      },
      {
        "title": "직렬 주소와 요청·응답",
        "parts": [
          {
            "type": "paragraph",
            "text": "직렬 유니캐스트 장치 주소는 1~247입니다. 0은 브로드캐스트이고 248~255는 예약되어 있습니다. 일반적으로 제어기가 유니캐스트 요청을 시작하면 지정된 장치가 응답합니다. 브로드캐스트 쓰기 요청에는 응답하지 않습니다. 주소 필드가 8비트라고 해서 0~255의 모든 값이 유효한 개별 장치 주소인 것은 아닙니다."
          },
          {
            "type": "paragraph",
            "text": "이 규칙은 직렬 링크에 적용됩니다. Modbus TCP에는 MBAP 헤더의 Unit Identifier가 있으며, 게이트웨이 라우팅에서의 의미는 구현에 따라 달라집니다. 직렬 주소 규칙을 모든 TCP 설정에 그대로 적용하지 마십시오."
          }
        ]
      },
      {
        "title": "기능 코드와 레지스터 맵을 함께 확인하기",
        "parts": [
          {
            "type": "paragraph",
            "text": "기능 코드는 데이터 유형과 읽기·쓰기 동작을 지정하며, 데이터 필드에는 주소, 수량 또는 값이 들어갑니다. Modbus를 사용하는 두 장치의 레지스터 정의가 반드시 같은 것은 아닙니다."
          },
          {
            "type": "paragraph",
            "text": "매뉴얼의 레지스터 번호와 메시지 시작 주소 사이에 오프셋이 있는지 확인하십시오. 여러 레지스터에 걸친 값은 데이터 폭, 부호 유무, 배율, 단위 및 워드 순서를 확인해야 합니다. 속도, 위치 및 액체 부피 값은 서로 바꾸어 사용할 수 없습니다."
          },
          {
            "type": "table",
            "headers": [
              "방향",
              "정상 직렬 유니캐스트 메시지"
            ],
            "rows": [
              [
                "제어기 → 장치",
                "주소 | 기능 코드 | 데이터 | CRC(RTU) / LRC(ASCII)"
              ],
              [
                "장치 → 제어기",
                "주소 | 기능 코드 | 데이터 | CRC(RTU) / LRC(ASCII)"
              ]
            ]
          },
          {
            "type": "table",
            "headers": [
              "기능 코드(16진수)",
              "동작"
            ],
            "rows": [
              [
                "01",
                "코일 읽기"
              ],
              [
                "02",
                "이산 입력 읽기"
              ],
              [
                "03",
                "홀딩 레지스터 읽기"
              ],
              [
                "04",
                "입력 레지스터 읽기"
              ],
              [
                "05",
                "단일 코일 쓰기"
              ],
              [
                "06",
                "단일 레지스터 쓰기"
              ],
              [
                "0F",
                "여러 코일 쓰기"
              ],
              [
                "10",
                "여러 레지스터 쓰기"
              ]
            ]
          },
          {
            "type": "notice",
            "text": "요청·응답 표는 정상적인 직렬 유니캐스트 교환을 설명합니다. 브로드캐스트에는 응답이 없으며, 예외 응답에서는 기능 코드와 데이터의 의미가 다릅니다. TCP는 앞에서 설명한 형식을 사용합니다. 장치가 표에 있는 모든 기능을 구현해야 하는 것은 아닙니다."
          },
          {
            "type": "links",
            "items": [
              {
                "label": "스테퍼 모터 계산과 선정",
                "href": "/resources/technical-articles/stepper-motor-calculation-selection/"
              }
            ]
          }
        ]
      },
      {
        "title": "유체 제어 장치 시운전",
        "parts": [
          {
            "type": "paragraph",
            "text": "배선과 전원을 먼저 확인하고 통신 설정을 매뉴얼과 일치시키십시오. 알려진 상태를 읽어 장치 주소, 기능 코드 및 데이터의 의미를 확인한 다음, 허용된 매개변수 쓰기와 동작 명령을 시험하십시오."
          },
          {
            "type": "paragraph",
            "text": "통신 성공, 명령 수락, 동작 완료 및 실제 토출 부피를 각각 검증하십시오. 쓰기 응답만으로 펌프의 동작 완료를 입증할 수는 없습니다. 시간 초과가 발생하면 분주 명령을 반복하기 전에 상태를 조회하여 중복 분주를 방지하십시오."
          },
          {
            "type": "paragraph",
            "text": "요청, 응답, 예외 코드 및 시간 초과 조건을 기록하십시오. 리미트, 원점 복귀, 밸브 상태 및 시퀀스 타이밍을 함께 확인하여 문제를 찾으십시오. 정확한 명령, 주소 및 카운트 단위는 장치 통신 매뉴얼을 따라야 합니다."
          },
          {
            "type": "links",
            "items": [
              {
                "label": "피스톤 펌프 가속 및 감속",
                "href": "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/"
              },
              {
                "label": "피스톤 펌프 백래시 보정",
                "href": "/resources/technical-articles/precision-piston-pump-backlash-compensation/"
              }
            ]
          }
        ]
      }
    ],
    "referencesTitle": "참고 자료",
    "references": [
      {
        "label": "Modbus Organization: 직렬 통신 규격 V1.02",
        "href": "https://www.modbus.org/file/secure/modbusoverserial.pdf"
      },
      {
        "label": "Modbus Organization: TCP/IP 구현 가이드",
        "href": "https://www.modbus.org/file/secure/messagingimplementationguide.pdf"
      }
    ],
    "cta": {
      "title": "통신과 동작을 함께 설계하십시오",
      "description": "제어기 모델, 통신 매뉴얼, 레지스터 맵, 배선 및 필요한 동작 순서를 공유해 주십시오. 통합 전에 인터페이스 지원 여부와 명령 단위를 확인하십시오.",
      "contactLabel": "엔지니어에게 문의",
      "productsLabel": "피스톤 펌프 보기"
    },
    "subject": {
      "about": [
        "Modbus",
        "유체 제어 장치 시운전"
      ],
      "mentions": [
        "Modbus RTU",
        "Modbus ASCII",
        "Modbus TCP",
        "RS-485"
      ]
    }
  },
  "ru": {
    "slug": "modbus-protocol-fluid-control",
    "title": "Протокол Modbus: основы RTU, ASCII и TCP",
    "summary": "Различия между Modbus и RS-485, сообщения RTU, ASCII и TCP, адресация в последовательных сетях, обмен запросами и ответами и наладка устройств управления жидкостными системами.",
    "seoTitle": "Протокол Modbus: основы RTU, ASCII и TCP | FOREACH",
    "seoDescription": "Различия между Modbus и RS-485, сообщения RTU, ASCII и TCP, адресация в последовательных сетях, обмен запросами и ответами и наладка устройств управления жидкостными системами.",
    "date": "2026-09-06",
    "coverImage": "/images/resources/technical-articles/covers/pressure-flow-material-compatibility.webp",
    "coverAlt": "Насос FOREACH для прецизионной жидкостной системы с подключёнными трубками",
    "intro": [],
    "sections": [
      {
        "title": "Что такое Modbus?",
        "parts": [
          {
            "type": "paragraph",
            "text": "Modbus — протокол обмена сообщениями прикладного уровня для передачи данных между контроллерами и устройствами. RS-485 и RS-232 — электрические интерфейсы, а Modbus RTU, ASCII и TCP определяют соответствующие форматы сообщений и способы передачи. Наличие интерфейса RS-485 само по себе не означает поддержку Modbus."
          },
          {
            "type": "paragraph",
            "text": "В жидкостных системах протокол может использоваться для чтения состояния и передачи параметров управления. Поддержку протокола, коды функций и регистры необходимо проверять в руководстве по связи для конкретной модели контроллера. Эта статья не утверждает, что все изделия FOREACH поддерживают перечисленные интерфейсы."
          }
        ]
      },
      {
        "title": "Чем отличаются RTU, ASCII и TCP?",
        "parts": [
          {
            "type": "paragraph",
            "text": "По одному разъёму нельзя определить режим связи. У последовательных устройств должны совпадать режим передачи, скорость и формат кадра; для TCP требуются совместимые настройки сети и службы устройства."
          },
          {
            "type": "table",
            "headers": [
              "Режим",
              "Структура сообщения",
              "Что проверить"
            ],
            "rows": [
              [
                "Modbus RTU",
                "Адрес + Код функции + Данные + CRC",
                "Параметры последовательной связи, адрес устройства и временные интервалы кадров"
              ],
              [
                "Modbus ASCII",
                "Кодирование ASCII с LRC и установленными символами начала и окончания",
                "Параметры последовательной связи, кодирование и LRC"
              ],
              [
                "Modbus TCP",
                "Заголовок MBAP + Код функции + Данные; дополнительный CRC режима RTU не используется",
                "IP-адрес, порт, идентификатор транзакции и Unit Identifier"
              ]
            ]
          }
        ]
      },
      {
        "title": "Последовательная адресация и обмен запросами и ответами",
        "parts": [
          {
            "type": "paragraph",
            "text": "Индивидуальные адреса устройств в последовательной сети находятся в диапазоне 1–247; 0 предназначен для широковещательных сообщений, а 248–255 зарезервированы. Обычно контроллер отправляет адресный запрос, и выбранное устройство отвечает. На широковещательные запросы записи ответ не передаётся. Наличие 8-битного поля адреса не делает каждое значение от 0 до 255 допустимым индивидуальным адресом."
          },
          {
            "type": "paragraph",
            "text": "Эти правила относятся к последовательным линиям. В Modbus TCP заголовок MBAP содержит Unit Identifier; его роль в маршрутизации через шлюз зависит от реализации. Не переносите правила последовательной адресации автоматически на любую конфигурацию TCP."
          }
        ]
      },
      {
        "title": "Проверяйте коды функций вместе с картой регистров",
        "parts": [
          {
            "type": "paragraph",
            "text": "Код функции определяет тип данных и операцию чтения или записи; поле данных содержит адреса, количество или значения. Два устройства Modbus не обязательно имеют одинаковые определения регистров."
          },
          {
            "type": "paragraph",
            "text": "Проверьте наличие смещения между номерами регистров в руководстве и начальными адресами в сообщениях. Для многорегистровых значений уточните разрядность, наличие знака, масштаб, единицы и порядок слов. Значения скорости, положения и объёма жидкости не взаимозаменяемы."
          },
          {
            "type": "table",
            "headers": [
              "Направление",
              "Обычное адресное сообщение в последовательной сети"
            ],
            "rows": [
              [
                "Контроллер → Устройство",
                "Адрес | Код функции | Данные | CRC (RTU) / LRC (ASCII)"
              ],
              [
                "Устройство → Контроллер",
                "Адрес | Код функции | Данные | CRC (RTU) / LRC (ASCII)"
              ]
            ]
          },
          {
            "type": "table",
            "headers": [
              "Код функции (шестнадцатеричный)",
              "Операция"
            ],
            "rows": [
              [
                "01",
                "Чтение дискретных выходов (coils)"
              ],
              [
                "02",
                "Чтение дискретных входов"
              ],
              [
                "03",
                "Чтение регистров хранения"
              ],
              [
                "04",
                "Чтение входных регистров"
              ],
              [
                "05",
                "Запись одного дискретного выхода"
              ],
              [
                "06",
                "Запись одного регистра"
              ],
              [
                "0F",
                "Запись нескольких дискретных выходов"
              ],
              [
                "10",
                "Запись нескольких регистров"
              ]
            ]
          },
          {
            "type": "notice",
            "text": "Таблица запросов и ответов описывает обычный адресный обмен в последовательной сети. На широковещательный запрос ответа нет; в ответе об исключении код функции и данные имеют другое значение. TCP использует формат, описанный выше. Устройство не обязано реализовывать все перечисленные функции."
          },
          {
            "type": "links",
            "items": [
              {
                "label": "Расчёт и выбор шагового двигателя",
                "href": "/resources/technical-articles/stepper-motor-calculation-selection/"
              }
            ]
          }
        ]
      },
      {
        "title": "Наладка устройства управления жидкостной системой",
        "parts": [
          {
            "type": "paragraph",
            "text": "Сначала проверьте подключение и питание, затем согласуйте настройки связи с руководством. Начните с чтения известного состояния и проверки адреса устройства, кода функции и смысла данных; после этого испытайте разрешённую запись параметров и команды движения."
          },
          {
            "type": "paragraph",
            "text": "Отдельно проверяйте успешную связь, принятие команды, завершение движения и фактически поданный объём. Подтверждение записи не доказывает, что насос завершил работу. После тайм-аута запросите состояние перед повторением команды дозирования, чтобы избежать повторной подачи дозы."
          },
          {
            "type": "paragraph",
            "text": "Регистрируйте запросы, ответы, коды исключений и условия тайм-аутов. Для поиска причин проверяйте концевые ограничения, поиск исходного положения, состояние клапанов и временную последовательность действий. Точные команды, адреса и единицы отсчёта задаются руководством по связи устройства."
          },
          {
            "type": "links",
            "items": [
              {
                "label": "Разгон и торможение поршневого насоса",
                "href": "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/"
              },
              {
                "label": "Компенсация люфта поршневого насоса",
                "href": "/resources/technical-articles/precision-piston-pump-backlash-compensation/"
              }
            ]
          }
        ]
      }
    ],
    "referencesTitle": "Источники",
    "references": [
      {
        "label": "Modbus Organization: спецификация последовательной связи V1.02",
        "href": "https://www.modbus.org/file/secure/modbusoverserial.pdf"
      },
      {
        "label": "Modbus Organization: руководство по реализации TCP/IP",
        "href": "https://www.modbus.org/file/secure/messagingimplementationguide.pdf"
      }
    ],
    "cta": {
      "title": "Проектируйте связь и движение совместно",
      "description": "Предоставьте модель контроллера, руководство по связи, карту регистров, схему подключения и требуемую последовательность движения. До интеграции подтвердите поддержку интерфейса и единицы команд.",
      "contactLabel": "Связаться с инженером",
      "productsLabel": "Посмотреть поршневые насосы"
    },
    "subject": {
      "about": [
        "Modbus",
        "Наладка устройства управления жидкостной системой"
      ],
      "mentions": [
        "Modbus RTU",
        "Modbus ASCII",
        "Modbus TCP",
        "RS-485"
      ]
    }
  }
} satisfies Record<PistonPumpArticleLocale, PistonPumpArticleCopy>;
