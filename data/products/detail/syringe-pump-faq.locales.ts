// Authored FAQ bank; indices are selected by model in syringe-pump-detail-copy.ts.
export const syringePumpFaqLocales: Record<string, string[][]> = {
  "zh": [
    [
      "怎样选择注射器容量与工作行程？",
      "先明确最小和最大单次加液量、批次总液量及允许的补液时间，再选择兼容的注射器容量。容量不等于最小可靠加液量；小剂量表现应在实际液体、针头、管路和背压下验证。"
    ],
    [
      "多通道是否表示每个通道都能独立控制？",
      "HMD6 提供 1、2、3、4、6、8 个计量通道配置。通道数不能单独证明独立控制能力；请说明各路是否同时启停、目标液量是否相同，以及是否需要分别吸液、排液或清洗，再确认驱动与控制配置。"
    ],
    [
      "旋转阀通数是否等于独立计量通道数？",
      "不是。旋转阀通数描述液路选择配置，不表示每一路都有独立注射器。需按定制流路图确认公共端、液源、输出端及允许的切换路径，不能由阀通数直接推算可同时分配的液体数量。"
    ],
    [
      "电磁阀与注射器动作应怎样配合？",
      "先建立所需吸液或排液路径，再执行注射器运动，并按控制协议确认阀状态或切换时间。避免在通路关闭时推动注射器；实际时序还应包含预充、补液及清洗。"
    ],
    [
      "换瓶后前几次加液偏少，应怎样检查？",
      "先检查吸液管是否浸没、连接是否密封，并对注射器和管路预充排气。将预充液引向合适的废液路径，再测量实际输出量；持续出现气泡时检查吸液速度、连接漏气和液体状态。"
    ],
    [
      "怎样评估准确度与重复性？",
      "准确度反映输出量与目标量的偏差，重复性反映多次输出的离散程度，驱动分辨率不能代替两者。应在目标剂量、工作液体、速度和背压下重复测量；引用规格数值时需同时注明适用注射器与测试条件。"
    ],
    [
      "切换试剂后是否只需转动旋转阀？",
      "切换阀位不等于清除残留。应依据流路图确认共享注射器、阀公共流道、输出管和针头，制定兼容的冲洗顺序与用量，并通过空白液或适合目标分析物的方法评估携带污染。"
    ],
    [
      "定制选路配置需要提供哪些信息？",
      "请提供液源与目标容器数量、每步吸排液方向、单次液量、节拍、介质及清洗液、允许残留、接头和安装尺寸、通讯要求。3 通、5 通、9 通等只是配置示例，实际阀通数与连接方式根据流路需求确认。"
    ],
    [
      "各通道加液量不一致，怎样排查？",
      "先逐路核对注射器容量设置、预充状态与气泡，再检查密封、管长、针头阻力和阀状态。在相同目标液量与动作条件下测量各路输出，区分稳定偏差与偶发波动；多通道配置不能替代逐路验证。"
    ],
    [
      "是否可以持续不中断供液？",
      "单注射器需要重新吸液，完整周期包含排液、切阀与补液。下游若要求不中断供液，应另行评估交替供液或缓冲方案，并验证流量波动；较大注射器可减少某些任务的补液频次，但不能保证连续流量。"
    ]
  ],
  "en": [
    [
      "How should syringe capacity and working stroke be selected?",
      "Define the minimum and maximum dispense volumes, total batch volume and acceptable refill time before selecting a compatible syringe. Syringe capacity is not the minimum reliable dispense volume. Validate small-volume delivery with the actual liquid, needle, tubing and backpressure."
    ],
    [
      "Does a multichannel pump provide independent control of every channel?",
      "HMD6 offers 1, 2, 3, 4, 6 or 8 metering channels. Channel count alone does not establish independent control. Specify whether channels start together, dispense equal volumes or require separate aspiration, dispensing and washing, then confirm the drive and control configuration."
    ],
    [
      "Does the number of rotary-valve ways equal the number of independent metering channels?",
      "No. Valve ways describe fluid-routing configurations, not separate syringes. Use the customized fluid diagram to identify the common connection, liquid sources, outlets and permitted switching paths. Valve-way count does not establish how many liquids can be dispensed simultaneously."
    ],
    [
      "How should solenoid-valve switching and syringe motion be coordinated?",
      "Establish the required aspiration or delivery path before moving the syringe, and confirm valve status or switching time according to the control protocol. Avoid driving the syringe against a closed path. Include priming, refilling and washing in the operating sequence."
    ],
    [
      "What should be checked if the first dispenses after a bottle change are too small?",
      "Check that the inlet tube is submerged and connections are sealed, then prime the syringe and tubing to remove air. Route priming liquid to an appropriate waste path before measuring delivered volume. If bubbles persist, check aspiration speed, air leaks and liquid condition."
    ],
    [
      "How should accuracy and repeatability be evaluated?",
      "Accuracy describes deviation from the target volume; repeatability describes variation between repeated dispenses. Drive resolution does not replace either measure. Test repeatedly at the target dose, liquid, speed and backpressure, and state the applicable syringe and test conditions when quoting specifications."
    ],
    [
      "Is rotating the valve sufficient when changing reagents?",
      "Changing valve position does not remove residual liquid. Identify the shared syringe, common valve passages, outlet tubing and needle in the fluid diagram. Establish a compatible flushing sequence and volume, then assess carryover using blanks or a method suitable for the target analyte."
    ],
    [
      "What information is needed for a customized fluid-routing configuration?",
      "Provide the number of liquid sources and destinations, aspiration and delivery direction at each step, dose, cycle time, media and wash liquids, acceptable carryover, connections, installation dimensions and communication requirements. Options such as 3-, 5- and 9-way valves are examples; confirm the final valve and connections against the required fluid circuit."
    ],
    [
      "What should be checked when channels deliver different volumes?",
      "Check syringe-capacity settings, priming and bubbles in each channel, followed by seals, tubing lengths, needle resistance and valve status. Measure each output under the same volume and motion settings to distinguish consistent offsets from intermittent variation. Validate each channel individually."
    ],
    [
      "Can the pump supply an uninterrupted flow?",
      "A single syringe must refill, so a complete cycle includes dispensing, valve switching and aspiration. If uninterrupted delivery is required, evaluate an alternating-pump or buffer arrangement and verify flow fluctuations. A larger syringe may reduce refill frequency for some tasks but does not guarantee continuous flow."
    ]
  ],
  "es": [
    [
      "¿Cómo se eligen la capacidad de la jeringa y la carrera de trabajo?",
      "Defina los volúmenes mínimo y máximo por dispensación, el volumen del lote y el tiempo de recarga permitido. La capacidad de la jeringa no es el volumen mínimo dispensable con fiabilidad. Valide las dosis pequeñas con el líquido, la aguja, los tubos y la contrapresión reales."
    ],
    [
      "¿Una bomba multicanal permite controlar cada canal de forma independiente?",
      "HMD6 ofrece 1, 2, 3, 4, 6 u 8 canales de dosificación. Su número no demuestra que el control sea independiente. Indique si deben arrancar juntos, dispensar volúmenes iguales o aspirar, dispensar y lavar por separado; después confirme el accionamiento y el control."
    ],
    [
      "¿El número de vías de la válvula equivale a canales de dosificación independientes?",
      "No. Las vías describen el circuito de selección, no jeringas independientes. Confirme la conexión común, las fuentes, las salidas y las rutas permitidas mediante el esquema personalizado. El número de vías no determina cuántos líquidos pueden dispensarse simultáneamente."
    ],
    [
      "¿Cómo se coordinan la electroválvula y el movimiento de la jeringa?",
      "Establezca la ruta de aspiración o salida antes de mover la jeringa y confirme el estado o el tiempo de conmutación según el protocolo. Evite accionar la jeringa con la ruta cerrada. Incluya cebado, recarga y lavado en la secuencia."
    ],
    [
      "¿Qué revisar si las primeras dosis tras cambiar el frasco son insuficientes?",
      "Compruebe que el tubo de entrada está sumergido y las conexiones son estancas. Cebe la jeringa y los tubos para eliminar aire y dirija el líquido a una salida de residuos adecuada antes de medir. Si persisten burbujas, revise velocidad de aspiración, fugas de aire y estado del líquido."
    ],
    [
      "¿Cómo se evalúan la exactitud y la repetibilidad?",
      "La exactitud expresa la desviación respecto al volumen objetivo; la repetibilidad, la dispersión entre dispensaciones. La resolución del accionamiento no sustituye ninguna de ellas. Mida repetidamente con la dosis, el líquido, la velocidad y la contrapresión previstos, e indique la jeringa y las condiciones al citar especificaciones."
    ],
    [
      "¿Basta con girar la válvula al cambiar de reactivo?",
      "Cambiar de posición no elimina los residuos. Identifique la jeringa compartida, los conductos comunes de la válvula, los tubos de salida y la aguja. Defina una secuencia y un volumen de lavado compatibles y evalúe el arrastre con blancos o un método apropiado para el analito."
    ],
    [
      "¿Qué información se necesita para personalizar el circuito?",
      "Indique fuentes y destinos, dirección de aspiración y dispensación por paso, dosis, tiempo de ciclo, medios y líquidos de lavado, arrastre admisible, conexiones, dimensiones e interfaces. Las válvulas de 3, 5 y 9 vías son ejemplos; confirme la configuración final según el circuito requerido."
    ],
    [
      "¿Qué revisar si los canales dispensan volúmenes diferentes?",
      "Revise por canal la capacidad configurada, el cebado y las burbujas; después, estanqueidad, longitud de tubos, resistencia de agujas y estado de válvulas. Mida en condiciones iguales para distinguir desviaciones constantes de variaciones ocasionales. Valide cada canal."
    ],
    [
      "¿Puede suministrar un caudal sin interrupciones?",
      "Una sola jeringa debe recargarse; el ciclo incluye dispensación, conmutación y aspiración. Si se requiere suministro ininterrumpido, evalúe bombas alternadas o un depósito intermedio y verifique las fluctuaciones. Una jeringa mayor puede reducir recargas, pero no garantiza caudal continuo."
    ]
  ],
  "fr": [
    [
      "Comment choisir la capacité de la seringue et la course de travail ?",
      "Définissez les volumes minimal et maximal par distribution, le volume du lot et le temps de remplissage acceptable. La capacité de la seringue ne correspond pas au volume minimal distribuable de façon fiable. Validez les petites doses avec le liquide, l’aiguille, les tuyaux et la contre-pression réels."
    ],
    [
      "Une pompe multicanal permet-elle de commander chaque canal indépendamment ?",
      "HMD6 propose 1, 2, 3, 4, 6 ou 8 canaux de dosage. Leur nombre ne garantit pas une commande indépendante. Précisez si les canaux démarrent ensemble, distribuent le même volume ou nécessitent une aspiration, une distribution et un lavage séparés, puis confirmez l’entraînement et la commande."
    ],
    [
      "Le nombre de voies de la vanne correspond-il au nombre de canaux de dosage indépendants ?",
      "Non. Les voies décrivent la sélection des circuits, pas des seringues distinctes. Identifiez le raccord commun, les sources, les sorties et les chemins autorisés sur le schéma personnalisé. Le nombre de voies ne détermine pas combien de liquides peuvent être distribués simultanément."
    ],
    [
      "Comment coordonner l’électrovanne et le mouvement de la seringue ?",
      "Établissez le chemin d’aspiration ou de sortie avant de déplacer la seringue, puis confirmez l’état ou le temps de commutation selon le protocole. Évitez d’actionner la seringue lorsque le circuit est fermé. Intégrez amorçage, remplissage et lavage à la séquence."
    ],
    [
      "Que vérifier si les premières doses après un changement de flacon sont insuffisantes ?",
      "Vérifiez l’immersion du tuyau d’aspiration et l’étanchéité des raccords. Amorcez la seringue et les tuyaux pour éliminer l’air, vers une évacuation adaptée, avant de mesurer le volume distribué. Si des bulles persistent, vérifiez la vitesse d’aspiration, les entrées d’air et l’état du liquide."
    ],
    [
      "Comment évaluer l’exactitude et la répétabilité ?",
      "L’exactitude décrit l’écart au volume cible ; la répétabilité décrit la dispersion des distributions successives. La résolution de l’entraînement ne remplace aucune de ces mesures. Répétez les mesures à la dose, au liquide, à la vitesse et à la contre-pression prévus, et précisez la seringue et les conditions associées aux spécifications."
    ],
    [
      "Suffit-il de tourner la vanne lors d’un changement de réactif ?",
      "Changer de position ne supprime pas les résidus. Identifiez la seringue partagée, les passages communs de la vanne, les tuyaux de sortie et l’aiguille. Définissez une séquence et un volume de rinçage compatibles, puis évaluez la contamination résiduelle avec des blancs ou une méthode adaptée à l’analyte."
    ],
    [
      "Quelles informations fournir pour personnaliser le circuit ?",
      "Précisez les sources et destinations, le sens d’aspiration et de distribution à chaque étape, la dose, le temps de cycle, les liquides et produits de lavage, le résidu acceptable, les raccords, les dimensions et les interfaces. Les vannes à 3, 5 et 9 voies sont des exemples ; confirmez la configuration finale selon le circuit demandé."
    ],
    [
      "Que vérifier si les canaux distribuent des volumes différents ?",
      "Contrôlez la capacité configurée, l’amorçage et les bulles de chaque canal, puis l’étanchéité, les longueurs de tuyau, la résistance des aiguilles et l’état des vannes. Mesurez dans les mêmes conditions pour distinguer un écart constant d’une variation intermittente. Validez chaque canal."
    ],
    [
      "La pompe peut-elle assurer un débit sans interruption ?",
      "Une seringue unique doit se remplir ; le cycle comprend distribution, commutation et aspiration. Pour un débit ininterrompu, évaluez une alimentation alternée ou un dispositif tampon et vérifiez les fluctuations. Une seringue plus grande peut réduire les remplissages, sans garantir un débit continu."
    ]
  ],
  "ko": [
    [
      "시린지 용량과 작동 스트로크는 어떻게 선택하나요?",
      "최소·최대 1회 분주량, 배치 총량 및 허용 보충 시간을 먼저 정한 후 호환 시린지를 선택합니다. 시린지 용량은 신뢰할 수 있는 최소 분주량과 다릅니다. 소량 분주는 실제 액체, 니들, 튜브 및 배압 조건에서 검증해야 합니다."
    ],
    [
      "다중 채널이면 각 채널을 독립적으로 제어할 수 있나요?",
      "HMD6는 1, 2, 3, 4, 6, 8개 정량 채널 구성을 제공합니다. 채널 수만으로 독립 제어 여부를 판단할 수 없습니다. 동시 시작 여부, 채널별 분주량, 개별 흡입·토출·세척 필요성을 제시한 뒤 구동 및 제어 구성을 확인해야 합니다."
    ],
    [
      "로터리 밸브의 방향 수가 독립 정량 채널 수와 같나요?",
      "아닙니다. 밸브 방향 수는 유로 선택 구성을 나타내며 개별 시린지 수를 의미하지 않습니다. 맞춤 유로도에서 공통 연결부, 액체 공급원, 토출부와 전환 가능한 경로를 확인해야 합니다. 방향 수로 동시 분주 가능한 액체 수를 판단해서는 안 됩니다."
    ],
    [
      "솔레노이드 밸브와 시린지 동작은 어떻게 연동하나요?",
      "시린지를 움직이기 전에 흡입 또는 토출 경로를 확보하고 제어 프로토콜에 따라 밸브 상태나 전환 시간을 확인합니다. 닫힌 유로에 시린지를 구동하지 않도록 하며 프라이밍, 보충 및 세척을 동작 순서에 포함합니다."
    ],
    [
      "용기 교체 후 초기 분주량이 적으면 무엇을 확인하나요?",
      "흡입 튜브가 액체에 잠겨 있는지와 연결부 밀봉을 확인합니다. 시린지와 튜브를 프라이밍하여 공기를 제거하고 적절한 폐액 경로로 배출한 다음 실제 분주량을 측정합니다. 기포가 계속되면 흡입 속도, 공기 누설 및 액체 상태를 확인합니다."
    ],
    [
      "정확도와 반복성은 어떻게 평가하나요?",
      "정확도는 목표량과 실제 출력량의 편차이며 반복성은 반복 분주 사이의 산포입니다. 구동 분해능은 두 지표를 대신하지 않습니다. 목표 용량, 액체, 속도 및 배압에서 반복 측정하고 규격값을 인용할 때는 적용 시린지와 시험 조건을 함께 제시해야 합니다."
    ],
    [
      "시약을 바꿀 때 로터리 밸브만 돌리면 되나요?",
      "밸브 위치 변경만으로 잔류액이 제거되지는 않습니다. 공용 시린지, 밸브 공통 유로, 토출 튜브 및 니들을 확인하고 호환되는 세척 순서와 용량을 정해야 합니다. 블랭크 또는 분석 대상에 적합한 방법으로 이월 오염을 평가합니다."
    ],
    [
      "유로 맞춤 구성에는 어떤 정보가 필요한가요?",
      "액체 공급원과 목적지 수, 단계별 흡입·토출 방향, 1회 용량, 사이클 시간, 매질과 세척액, 허용 잔류량, 연결부, 설치 치수 및 통신 요구사항을 제공합니다. 3방향, 5방향, 9방향 밸브는 구성 예시이며 최종 구성은 실제 유로에 맞춰 확인합니다."
    ],
    [
      "채널별 분주량이 다르면 무엇을 점검하나요?",
      "채널마다 시린지 용량 설정, 프라이밍 및 기포를 확인한 뒤 밀봉, 튜브 길이, 니들 저항과 밸브 상태를 점검합니다. 동일 용량과 동작 조건에서 측정하여 일정한 편차와 간헐적 변동을 구분하고 각 채널을 개별 검증합니다."
    ],
    [
      "중단 없이 연속 공급할 수 있나요?",
      "단일 시린지는 재흡입이 필요하므로 전체 주기에 토출, 밸브 전환과 보충이 포함됩니다. 무중단 공급이 필요하면 교대 공급 또는 버퍼 구성을 별도로 평가하고 유량 변동을 검증해야 합니다. 큰 시린지는 일부 작업에서 보충 빈도를 줄일 수 있지만 연속 유량을 보장하지 않습니다."
    ]
  ],
  "ru": [
    [
      "Как выбрать объем шприца и рабочий ход?",
      "Сначала определите минимальную и максимальную дозу, объем партии и допустимое время заполнения. Объем шприца не равен минимальной надежно выдаваемой дозе. Проверяйте малые дозы с реальной жидкостью, иглой, трубками и противодавлением."
    ],
    [
      "Можно ли независимо управлять каждым каналом многоканального насоса?",
      "HMD6 предлагает 1, 2, 3, 4, 6 или 8 каналов дозирования. Их число не подтверждает независимое управление. Укажите, должны ли каналы запускаться одновременно, выдавать равные объемы или отдельно всасывать, подавать и промываться, затем согласуйте привод и управление."
    ],
    [
      "Равно ли число ходов поворотного клапана числу независимых каналов дозирования?",
      "Нет. Число ходов описывает выбор жидкостных путей, а не отдельных шприцев. По индивидуальной схеме подтвердите общий порт, источники, выходы и допустимые пути переключения. Число ходов не определяет количество одновременно дозируемых жидкостей."
    ],
    [
      "Как согласовать переключение электромагнитного клапана и движение шприца?",
      "До движения шприца установите нужный путь всасывания или подачи и подтвердите состояние либо время переключения по протоколу управления. Не приводите шприц в движение при закрытом пути. Включите предварительное заполнение, повторное заполнение и промывку в последовательность."
    ],
    [
      "Что проверить, если после замены емкости первые дозы меньше заданных?",
      "Проверьте погружение входной трубки и герметичность соединений. Заполните шприц и трубки для удаления воздуха, направляя жидкость в подходящий слив, затем измерьте подачу. При сохранении пузырьков проверьте скорость всасывания, подсос воздуха и состояние жидкости."
    ],
    [
      "Как оценить точность и повторяемость?",
      "Точность характеризует отклонение от заданного объема, повторяемость — разброс повторных доз. Разрешение привода не заменяет эти показатели. Проводите повторные измерения при заданных дозе, жидкости, скорости и противодавлении; при цитировании характеристик указывайте шприц и условия испытания."
    ],
    [
      "Достаточно ли повернуть клапан при смене реагента?",
      "Переключение не удаляет остатки жидкости. Определите общий шприц, общие каналы клапана, выходные трубки и иглу. Подберите совместимые последовательность и объем промывки, затем оцените перенос остатков с помощью холостых проб или метода для целевого аналита."
    ],
    [
      "Какие данные нужны для индивидуальной жидкостной схемы?",
      "Укажите источники и приемники, направление всасывания и подачи на каждом этапе, дозу, время цикла, среды и промывочные жидкости, допустимый перенос остатков, соединения, размеры и интерфейсы. Клапаны на 3, 5 и 9 ходов — примеры; окончательную конфигурацию согласуют по требуемой схеме."
    ],
    [
      "Что проверить, если каналы подают разные объемы?",
      "Проверьте настройку объема шприца, заполнение и пузырьки каждого канала, затем уплотнения, длину трубок, сопротивление игл и состояние клапанов. Измеряйте при одинаковых условиях, отделяя постоянное смещение от случайных колебаний. Проверяйте каждый канал отдельно."
    ],
    [
      "Возможна ли непрерывная подача без остановок?",
      "Один шприц требует повторного заполнения; цикл включает дозирование, переключение и всасывание. Для подачи без перерыва отдельно оцените чередующиеся насосы или буфер и проверьте колебания расхода. Большой шприц может уменьшить частоту заполнения, но не гарантирует непрерывный поток."
    ]
  ]
};
