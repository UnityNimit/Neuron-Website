// Comprehensive Multilingual Translation Catalog for Neuron
// Languages: English (en), Deutsch (de), Español (es), Français (fr), 日本語 (ja), 简体中文 (zh)
// Strict invariant: Zero emojis across all translation strings.

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '简体中文' }
];

export const translations = {
  en: {
    nav: {
      docs: 'Documentation',
      versions: 'Versions',
      help: 'Help',
      github: 'GitHub',
      download: 'Download',
      searchPlaceholder: 'Search docs...',
      searchClear: 'Clear search',
      ctrlK: 'Ctrl K',
      theme: 'Theme',
      system: 'System',
      light: 'Light',
      dark: 'Dark'
    },
    hero: {
      spatialIde: 'THE SPATIAL IDE',
      downloadWindows: 'Download for Windows',
      scrollExplore: 'Scroll down to explore Neuron'
    },
    showcase: {
      hotspotTitle: 'Critical Hotspot Detection',
      hotspotDesc: 'Real-time architectural complexity identification',
      couplingTitle: 'Interactive Coupling',
      couplingDesc: 'Visual drag-and-drop structural cross-linking',
      inspectionTitle: 'Deep Code Inspection',
      inspectionDesc: 'High-precision AST symbol analysis',
      clusterTitle: 'Cluster Detection',
      clusterDesc: 'Automated Architectural Community Discovery',
      agentTitle: 'Integrate AI with your codebase',
      agentDesc: 'Local LLM orchestration grounded in concrete AST graphs',
      themeTitle: 'Customizable themes',
      themeDesc: 'Built-in visual profiles for spatial clarity'
    },
    home: {
      tryNow: 'Try Neuron now.'
    },
    versions: {
      title: 'Versions',
      desc: 'Release history and downloads for Neuron. All versions run locally on your workstation.',
      latestRelease: 'v1.0.0 Beta Release',
      releaseDate: 'September 2026',
      downloadWindows: 'Download for Windows'
    },
    help: {
      title: 'Help & Queries',
      desc: 'Find answers to common technical questions about the spatial engine, localhost runtime, or submit inquiries directly to the team.',
      faqTitle: 'Frequently Asked Questions',
      formTitle: 'Send an Inquiry',
      formDesc: 'Have a question, feedback, or a technical inquiry? Send a message directly to our team.',
      nameLabel: 'Name',
      namePlaceholder: 'Ada Lovelace',
      emailLabel: 'Email',
      emailPlaceholder: 'ada@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Your inquiry or feedback...',
      submitBtn: 'Send Message',
      successTitle: 'Message Dispatched',
      successDesc: 'Thank you for reaching out. We will review your inquiry shortly.',
      sendAnother: 'Send Another Message',
      faqs: [
        {
          q: 'How does the 2D spatial canvas differ from a conventional file tree?',
          a: 'Traditional file trees present code as static hierarchical folders on disk. Neuron parses your abstract syntax trees using Tree-Sitter and renders functions, classes, and modules as topological nodes connected by actual call conduits and modularity clusters.'
        },
        {
          q: 'Does Neuron upload code, embeddings, or AST graphs to remote servers?',
          a: 'Zero cloud ingestion. All parsing, graph relaxation, vector embeddings, and AST mutations run strictly on your local CPU and GPU. The local daemon communicates via local 127.0.0.1 IPC sockets.'
        },
        {
          q: 'Does Neuron vend or host AI models, or do I bring my own keys?',
          a: 'Neuron does not vend, host, or proxy AI models. You connect your own API keys or run completely offline using local runtimes like Ollama.'
        },
        {
          q: 'How does bidirectional synchronization maintain code correctness?',
          a: 'When you modify files on disk or in the editor, Tree-Sitter re-indexes AST nodes instantly. Conversely, when you link nodes or accept edits on the spatial canvas, LibCST transforms the code while preserving indentation, comments, and docstrings.'
        },
        {
          q: 'What are the system prerequisites for running the desktop installer?',
          a: 'Neuron runs on 64-bit Windows 10 and 11. It leverages hardware WebGPU acceleration for high-framerate graph physics. The standalone installer bundles all required dependencies.'
        },
        {
          q: 'How do I report bugs or submit feature proposals?',
          a: 'You can submit queries directly using the form below or open an issue on our official GitHub repository at https://github.com/UnityNimit/Neuron/issues.'
        }
      ]
    },
    footer: {
      brandDesc: 'The high-performance 2D spatial development environment and graph topological IDE. Built from the ground up for developers navigating massive codebases.',
      navigation: 'Navigation',
      legal: 'Legal',
      socials: 'Socials',
      copyrightYear: '© 2026 Neuron.',
      openSourceNote: 'A complete open-source project released under the MIT License. Developed for the global software engineering community.',
      selectLanguage: 'Select Language',
      legalGovernance: 'Neuron Open Source Governance',
      doneBtn: 'Done',
      tos: 'Terms of Service',
      aup: 'Acceptable Use Policy',
      privacy: 'Privacy Policy',
      data: 'Data Use',
      security: 'Security'
    },
    docs: {
      categoryGetStarted: 'Get Started',
      categoryConcepts: 'Core Concepts',
      categoryPhysics: 'Engine Physics',
      categoryML: 'AI & Machine Learning',
      categoryReference: 'API & Reference',
      backToTop: 'Back to top',
      searchPrompt: 'Search all technical documentation and APIs...',
      noResults: 'No documentation found matching'
    }
  },

  de: {
    nav: {
      docs: 'Dokumentation',
      versions: 'Versionen',
      help: 'Hilfe',
      github: 'GitHub',
      download: 'Herunterladen',
      searchPlaceholder: 'Dokumentation durchsuchen...',
      searchClear: 'Suche löschen',
      ctrlK: 'Strg K',
      theme: 'Design',
      system: 'System',
      light: 'Hell',
      dark: 'Dunkel'
    },
    hero: {
      spatialIde: 'DIE RÄUMLICHE IDE',
      downloadWindows: 'Für Windows herunterladen',
      scrollExplore: 'Nach unten scrollen, um Neuron zu erkunden'
    },
    showcase: {
      hotspotTitle: 'Kritische Hotspot-Erkennung',
      hotspotDesc: 'Echtzeit-Identifizierung architektonischer Komplexität',
      couplingTitle: 'Interaktive Kopplung',
      couplingDesc: 'Visuelle Drag-and-Drop-Strukturvernetzung',
      inspectionTitle: 'Tiefgehende Code-Inspektion',
      inspectionDesc: 'Hochpräzise AST-Symbolanalyse',
      clusterTitle: 'Cluster-Erkennung',
      clusterDesc: 'Automatisierte architektonische Community-Erkennung',
      agentTitle: 'Integrieren Sie KI in Ihre Codebasis',
      agentDesc: 'Lokale LLM-Orchestrierung fundiert in konkreten AST-Graphen',
      themeTitle: 'Anpassbare Themes',
      themeDesc: 'Integrierte visuelle Profile für räumliche Klarheit'
    },
    home: {
      tryNow: 'Neuron jetzt testen.'
    },
    versions: {
      title: 'Versionen',
      desc: 'Versionsverlauf und Downloads für Neuron. Alle Versionen laufen lokal auf Ihrer Workstation.',
      latestRelease: 'v1.0.0 Beta-Release',
      releaseDate: 'September 2026',
      downloadWindows: 'Für Windows herunterladen'
    },
    help: {
      title: 'Hilfe & Anfragen',
      desc: 'Finden Sie Antworten auf häufige technische Fragen zur Spatial Engine und Localhost-Laufzeit oder senden Sie Anfragen direkt an das Team.',
      faqTitle: 'Häufig gestellte Fragen',
      formTitle: 'Anfrage senden',
      formDesc: 'Haben Sie eine Frage, Feedback oder eine technische Anfrage? Senden Sie eine Nachricht direkt an unser Team.',
      nameLabel: 'Name',
      namePlaceholder: 'Ada Lovelace',
      emailLabel: 'E-Mail',
      emailPlaceholder: 'ada@beispiel.de',
      messageLabel: 'Nachricht',
      messagePlaceholder: 'Ihre Anfrage oder Feedback...',
      submitBtn: 'Nachricht senden',
      successTitle: 'Nachricht versendet',
      successDesc: 'Vielen Dank für Ihre Kontaktaufnahme. Wir werden Ihre Anfrage in Kürze prüfen.',
      sendAnother: 'Weitere Nachricht senden',
      faqs: [
        {
          q: 'Wie unterscheidet sich die 2D-Spatial-Canvas von einem gewöhnlichen Dateibaum?',
          a: 'Klassische Dateibäume stellen Code als flache Ordner dar. Neuron analysiert die Syntaxbäume mit Tree-Sitter und visualisiert Funktionen und Module als topologische Knoten mit echten Aufrufkanälen.'
        },
        {
          q: 'Werden Code, Einbettungen oder AST-Graphen an Remote-Server übertragen?',
          a: 'Keine Cloud-Übertragung. Sämtliche Analysen, Graph-Berechnungen und Vektoreinbettungen laufen ausschließlich auf Ihrer lokalen CPU und GPU über 127.0.0.1 IPC-Sockets.'
        },
        {
          q: 'Stellt Neuron KI-Modelle bereit oder nutze ich eigene Schlüssel?',
          a: 'Neuron betreibt keine eigenen KI-Modelle. Sie binden Ihre eigenen API-Schlüssel ein oder nutzen vollständig lokale Laufzeiten wie Ollama.'
        },
        {
          q: 'Wie gewährleistet die bidirektionale Synchronisation die Korrektheit des Codes?',
          a: 'Beim Bearbeiten physischer Dateien indiziert Tree-Sitter den AST sofort neu. Umgekehrt transformiert LibCST den Code direkt im Dateisystem unter Erhalt aller Formatierungen.'
        },
        {
          q: 'Welche Systemvoraussetzungen gelten für das Desktop-Installationsprogramm?',
          a: 'Neuron läuft unter 64-Bit Windows 10 und 11 mit Hardware-GPU-Beschleunigung. Das eigenständige Installationspaket enthält alle Laufzeitumgebungen.'
        },
        {
          q: 'Wie melde ich Fehler oder reiche Funktionsvorschläge ein?',
          a: 'Nutzen Sie das untenstehende Anfrageformular oder eröffnen Sie ein Issue auf unserem offiziellen GitHub-Repository.'
        }
      ]
    },
    footer: {
      brandDesc: 'Die hochperformante räumliche 2D-Entwicklungsumgebung und graph-topologische IDE. Entwickelt für die Navigation in riesigen Codebasen.',
      navigation: 'Navigation',
      legal: 'Rechtliches',
      socials: 'Soziales',
      copyrightYear: '© 2026 Neuron.',
      openSourceNote: 'Ein vollständiges Open-Source-Projekt unter der MIT-Lizenz. Entwickelt für die weltweite Software-Engineering-Gemeinschaft.',
      selectLanguage: 'Sprache auswählen',
      legalGovernance: 'Neuron Open-Source-Governance',
      doneBtn: 'Fertig',
      tos: 'Nutzungsbedingungen',
      aup: 'Richtlinie für zulässige Nutzung',
      privacy: 'Datenschutzrichtlinie',
      data: 'Datennutzung',
      security: 'Sicherheit'
    },
    docs: {
      categoryGetStarted: 'Erste Schritte',
      categoryConcepts: 'Kernkonzepte',
      categoryPhysics: 'Engine-Physik',
      categoryML: 'KI & Maschinelles Lernen',
      categoryReference: 'API & Referenz',
      backToTop: 'Zurück nach oben',
      searchPrompt: 'Technische Dokumentation und APIs durchsuchen...',
      noResults: 'Keine Dokumentation gefunden für'
    }
  },

  es: {
    nav: {
      docs: 'Documentación',
      versions: 'Versiones',
      help: 'Ayuda',
      github: 'GitHub',
      download: 'Descargar',
      searchPlaceholder: 'Buscar en docs...',
      searchClear: 'Limpiar búsqueda',
      ctrlK: 'Ctrl K',
      theme: 'Tema',
      system: 'Sistema',
      light: 'Claro',
      dark: 'Oscuro'
    },
    hero: {
      spatialIde: 'EL IDE ESPACIAL',
      downloadWindows: 'Descargar para Windows',
      scrollExplore: 'Desplázate hacia abajo para explorar Neuron'
    },
    showcase: {
      hotspotTitle: 'Detección Crítica de Puntos Calientes',
      hotspotDesc: 'Identificación de complejidad arquitectónica en tiempo real',
      couplingTitle: 'Acoplamiento Interactivo',
      couplingDesc: 'Vinculación estructural visual mediante arrastrar y soltar',
      inspectionTitle: 'Inspección Profunda de Código',
      inspectionDesc: 'Análisis de símbolos AST de alta precisión',
      clusterTitle: 'Detección de Clústeres',
      clusterDesc: 'Descubrimiento Automatizado de Comunidades Arquitectónicas',
      agentTitle: 'Integra IA con tu base de código',
      agentDesc: 'Orquestación local de LLM basada en grafos AST concretos',
      themeTitle: 'Temas personalizables',
      themeDesc: 'Perfiles visuales integrados para claridad espacial'
    },
    home: {
      tryNow: 'Prueba Neuron ahora.'
    },
    versions: {
      title: 'Versiones',
      desc: 'Historial de versiones y descargas de Neuron. Todas las versiones se ejecutan localmente en tu estación de trabajo.',
      latestRelease: 'v1.0.0 Versión Beta',
      releaseDate: 'Septiembre de 2026',
      downloadWindows: 'Descargar para Windows'
    },
    help: {
      title: 'Ayuda y Consultas',
      desc: 'Encuentra respuestas a preguntas técnicas comunes sobre el motor espacial, el entorno localhost o envía consultas directamente al equipo.',
      faqTitle: 'Preguntas Frecuentes',
      formTitle: 'Enviar una Consulta',
      formDesc: '¿Tienes una pregunta, comentario o consulta técnica? Envía un mensaje directamente a nuestro equipo.',
      nameLabel: 'Nombre',
      namePlaceholder: 'Ada Lovelace',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'ada@ejemplo.es',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Tu consulta o comentario...',
      submitBtn: 'Enviar Mensaje',
      successTitle: 'Mensaje Enviado',
      successDesc: 'Gracias por ponerte en contacto. Revisaremos tu consulta en breve.',
      sendAnother: 'Enviar Otro Mensaje',
      faqs: [
        {
          q: '¿En qué se diferencia el lienzo espacial 2D de un árbol de archivos convencional?',
          a: 'Los árboles tradicionales muestran carpetas estáticas. Neuron analiza los árboles de sintaxis abstracta mediante Tree-Sitter y representa funciones y clases como nodos topológicos interconectados.'
        },
        {
          q: '¿Neuron sube código, incrustaciones o grafos AST a servidores remotos?',
          a: 'Cero ingestión en la nube. Todo el análisis sintáctico y la relajación de grafos se ejecutan localmente en tu CPU y GPU a través de sockets IPC 127.0.0.1.'
        },
        {
          q: '¿Neuron aloja modelos de IA o proporciono mis propias claves?',
          a: 'Neuron no vende ni hospeda modelos. Puedes conectar tus propias claves de API o ejecutar modelos completamente fuera de línea con Ollama.'
        },
        {
          q: '¿Cómo mantiene la sincronización bidireccional la precisión del código?',
          a: 'Al modificar archivos, Tree-Sitter actualiza los nodos AST al instante. De forma inversa, al conectar nodos en el lienzo, LibCST aplica cambios conservando indentaciones y comentarios.'
        },
        {
          q: '¿Cuáles son los requisitos del sistema para ejecutar el instalador?',
          a: 'Neuron es compatible con Windows 10 y 11 de 64 bits con aceleración WebGPU. El instalador autónomo incluye todas las dependencias necesarias.'
        },
        {
          q: '¿Cómo puedo informar de errores o proponer nuevas funciones?',
          a: 'Puedes enviar tu consulta con el formulario inferior o crear una incidencia en nuestro repositorio oficial de GitHub.'
        }
      ]
    },
    footer: {
      brandDesc: 'El entorno de desarrollo espacial 2D de alto rendimiento y el IDE topológico de grafos. Creado desde cero para desarrolladores que navegan por bases de código masivas.',
      navigation: 'Navegación',
      legal: 'Legal',
      socials: 'Redes Sociales',
      copyrightYear: '© 2026 Neuron.',
      openSourceNote: 'Un proyecto completamente de código abierto publicado bajo la Licencia MIT. Desarrollado para la comunidad global de ingeniería de software.',
      selectLanguage: 'Seleccionar idioma',
      legalGovernance: 'Gobernanza de Código Abierto de Neuron',
      doneBtn: 'Listo',
      tos: 'Términos de Servicio',
      aup: 'Política de Uso Aceptable',
      privacy: 'Política de Privacidad',
      data: 'Uso de Datos',
      security: 'Seguridad'
    },
    docs: {
      categoryGetStarted: 'Primeros Pasos',
      categoryConcepts: 'Conceptos Clave',
      categoryPhysics: 'Física del Motor',
      categoryML: 'IA y Aprendizaje Automático',
      categoryReference: 'API y Referencia',
      backToTop: 'Volver arriba',
      searchPrompt: 'Buscar documentación técnica y APIs...',
      noResults: 'No se encontró documentación para'
    }
  },

  fr: {
    nav: {
      docs: 'Documentation',
      versions: 'Versions',
      help: 'Aide',
      github: 'GitHub',
      download: 'Télécharger',
      searchPlaceholder: 'Rechercher dans les docs...',
      searchClear: 'Effacer la recherche',
      ctrlK: 'Ctrl K',
      theme: 'Thème',
      system: 'Système',
      light: 'Clair',
      dark: 'Sombre'
    },
    hero: {
      spatialIde: "L'IDE SPATIAL",
      downloadWindows: 'Télécharger pour Windows',
      scrollExplore: 'Faites défiler pour explorer Neuron'
    },
    showcase: {
      hotspotTitle: 'Détection Critique des Points Chauds',
      hotspotDesc: 'Identification en temps réel de la complexité architecturale',
      couplingTitle: 'Couplage Interactif',
      couplingDesc: 'Liaison structurelle visuelle par glisser-déposer',
      inspectionTitle: 'Inspection Approfondie du Code',
      inspectionDesc: 'Analyse de symboles AST de haute précision',
      clusterTitle: 'Détection de Clusters',
      clusterDesc: 'Découverte Automatisée de Communautés Architecturales',
      agentTitle: "Intégrez l'IA à votre base de code",
      agentDesc: 'Orchestration locale de LLM ancrée dans des graphes AST concrets',
      themeTitle: 'Thèmes personnalisables',
      themeDesc: 'Profils visuels intégrés pour une clarté spatiale'
    },
    home: {
      tryNow: 'Essayez Neuron maintenant.'
    },
    versions: {
      title: 'Versions',
      desc: "Historique des versions et téléchargements pour Neuron. Toutes les versions s'exécutent localement sur votre poste de travail.",
      latestRelease: 'v1.0.0 Version Bêta',
      releaseDate: 'Septembre 2026',
      downloadWindows: 'Télécharger pour Windows'
    },
    help: {
      title: 'Aide & Questions',
      desc: "Trouvez des réponses aux questions techniques fréquentes sur le moteur spatial et l'exécution locale, ou envoyez vos questions à l'équipe.",
      faqTitle: 'Foire Aux Questions',
      formTitle: 'Envoyer une Demande',
      formDesc: 'Une question, un retour ou une demande technique ? Envoyez directement un message à notre équipe.',
      nameLabel: 'Nom',
      namePlaceholder: 'Ada Lovelace',
      emailLabel: 'E-mail',
      emailPlaceholder: 'ada@exemple.fr',
      messageLabel: 'Message',
      messagePlaceholder: 'Votre demande ou retour...',
      submitBtn: 'Envoyer le Message',
      successTitle: 'Message Envoyé',
      successDesc: 'Merci de nous avoir contactés. Nous examinerons votre demande rapidement.',
      sendAnother: 'Envoyer un Autre Message',
      faqs: [
        {
          q: "En quoi le canevas spatial 2D diffère-t-il d'une arborescence de fichiers classique ?",
          a: "Les arborescences classiques affichent des dossiers statiques. Neuron analyse vos arbres syntaxiques abstraits avec Tree-Sitter et modélise les fonctions et classes sous forme de nœuds topologiques interconnectés."
        },
        {
          q: "Neuron téléverse-t-il du code ou des graphes AST sur des serveurs distants ?",
          a: "Zéro transmission vers le cloud. Toutes les analyses syntaxiques et simulations physiques s'exécutent localement sur votre CPU et GPU via des sockets IPC 127.0.0.1."
        },
        {
          q: 'Neuron héberge-t-il des modèles IA ou dois-je fournir mes propres clés ?',
          a: 'Neuron ne vend ni ne relaie aucun modèle IA. Vous connectez vos propres clés API ou utilisez des moteurs locaux tels qu’Ollama.'
        },
        {
          q: 'Comment la synchronisation bidirectionnelle garantit-elle la conformité du code ?',
          a: 'Dès que vous modifiez un fichier, Tree-Sitter réindexe instantanément les nœuds AST. Inversement, lors d’actions sur le canevas, LibCST applique les modifications en préservant le formatage.'
        },
        {
          q: "Quelles sont les configurations requises pour l'application de bureau ?",
          a: "Neuron fonctionne sur Windows 10 et 11 (64 bits) avec accélération matérielle WebGPU. L'installateur autonome contient l'ensemble des dépendances."
        },
        {
          q: 'Comment signaler un bogue ou soumettre une suggestion ?',
          a: 'Remplissez le formulaire ci-dessous ou ouvrez un ticket sur notre dépôt officiel GitHub.'
        }
      ]
    },
    footer: {
      brandDesc: "L'environnement de développement spatial 2D haute performance et l'IDE topologique en graphes. Conçu pour les développeurs explorant des bases de code massives.",
      navigation: 'Navigation',
      legal: 'Mentions Légales',
      socials: 'Réseaux Sociaux',
      copyrightYear: '© 2026 Neuron.',
      openSourceNote: 'Un projet open source complet publié sous licence MIT. Développé pour la communauté mondiale du génie logiciel.',
      selectLanguage: 'Sélectionner la langue',
      legalGovernance: 'Gouvernance Open Source de Neuron',
      doneBtn: 'Terminé',
      tos: "Conditions d'Utilisation",
      aup: "Politique d'Utilisation Acceptable",
      privacy: 'Politique de Confidentialité',
      data: 'Utilisation des Données',
      security: 'Sécurité'
    },
    docs: {
      categoryGetStarted: 'Démarrage',
      categoryConcepts: 'Concepts Fondamentaux',
      categoryPhysics: 'Physique du Moteur',
      categoryML: 'IA et Machine Learning',
      categoryReference: 'API & Référence',
      backToTop: 'Haut de page',
      searchPrompt: 'Rechercher dans la documentation technique...',
      noResults: 'Aucun document trouvé pour'
    }
  },

  ja: {
    nav: {
      docs: 'ドキュメント',
      versions: 'バージョン',
      help: 'ヘルプ',
      github: 'GitHub',
      download: 'ダウンロード',
      searchPlaceholder: 'ドキュメントを検索...',
      searchClear: '検索をクリア',
      ctrlK: 'Ctrl K',
      theme: 'テーマ',
      system: 'システム',
      light: 'ライト',
      dark: 'ダーク'
    },
    hero: {
      spatialIde: '空間型統合開発環境',
      downloadWindows: 'Windows向けにダウンロード',
      scrollExplore: '下にスクロールしてNeuronを探索'
    },
    showcase: {
      hotspotTitle: 'クリティカルホットスポット検出',
      hotspotDesc: 'リアルタイムのアーキテクチャ複雑性特定',
      couplingTitle: 'インタラクティブな結合',
      couplingDesc: 'ビジュアルなドラッグ＆ドロップ構造リンク',
      inspectionTitle: 'ディープコードインスペクション',
      inspectionDesc: '高精度ASTシンボル解析',
      clusterTitle: 'クラスター検出',
      clusterDesc: '自動アーキテクチャコミュニティ検出',
      agentTitle: 'AIをコードベースに統合',
      agentDesc: '具体的なASTグラフに基づくローカルLLMオーケストレーション',
      themeTitle: 'カスタマイズ可能なテーマ',
      themeDesc: '空間の明瞭さのための内蔵ビジュアルプロファイル'
    },
    home: {
      tryNow: '今すぐNeuronをお試しください。'
    },
    versions: {
      title: 'バージョン履歴',
      desc: 'Neuronのリリース履歴とダウンロード。すべてのバージョンはお使いのワークステーションでローカルに実行されます。',
      latestRelease: 'v1.0.0 ベータリリース',
      releaseDate: '2026年9月',
      downloadWindows: 'Windows向けにダウンロード'
    },
    help: {
      title: 'ヘルプと質問',
      desc: '空間エンジンやローカルホストランタイムに関する一般的な技術的質問への回答を見つけるか、チームに直接お問い合わせください。',
      faqTitle: 'よくある質問',
      formTitle: 'お問い合わせを送信',
      formDesc: 'ご質問、フィードバック、または技術的なお問い合わせがありますか？チームに直接メッセージをお送りください。',
      nameLabel: 'お名前',
      namePlaceholder: 'エイダ・ラブレス',
      emailLabel: 'メールアドレス',
      emailPlaceholder: 'ada@example.jp',
      messageLabel: 'メッセージ',
      messagePlaceholder: 'お問い合わせ内容やフィードバック...',
      submitBtn: 'メッセージを送信',
      successTitle: 'メッセージが送信されました',
      successDesc: 'お問い合わせいただきありがとうございます。まもなく内容を確認いたします。',
      sendAnother: '別のメッセージを送信',
      faqs: [
        {
          q: '2D空間キャンバスは従来のファイルツリーとどのように異なりますか？',
          a: '従来のツリーは静的なフォルダを表示します。NeuronはTree-Sitterで抽象構文木を解析し、関数やモジュールを実際の呼び出し経路で結ばれたトポロジカルノードとして可視化します。'
        },
        {
          q: 'Neuronはコード、埋め込み、またはASTグラフを外部サーバーに送信しますか？',
          a: 'クラウドへの取り込みは一切ありません。構文解析、物理演算シミュレーション、ベクトル埋め込みはすべて127.0.0.1 IPCソケット経由でローカルCPU/GPU上で完結します。'
        },
        {
          q: 'NeuronはAIモデルを提供しますか？それとも自身のキーを使用しますか？',
          a: 'NeuronはAIモデルの販売やホスティングを行いません。ご自身のAPIキーを接続するか、Ollamaなどの完全ローカルランタイムをご利用いただけます。'
        },
        {
          q: '双方向同期はどのようにコードの正確性を維持しますか？',
          a: 'ファイルを変更するとTree-Sitterが即座にASTを再インデックスします。逆にキャンバス上でノードを接続すると、LibCSTがコメントやインデントを崩さず安全にコードを変換します。'
        },
        {
          q: 'デスクトップインストーラーを実行するための動作要件は何ですか？',
          a: 'NeuronはWebGPUハードウェアアクセラレーションを備えた64ビットWindows 10/11で動作します。スタンドアロンインストーラーに必要なすべてのランタイムが同梱されています。'
        },
        {
          q: 'バグ報告や機能提案はどのように行えますか？',
          a: '下部のお問い合わせフォームから直接送信するか、公式GitHubリポジトリでIssueを作成してください。'
        }
      ]
    },
    footer: {
      brandDesc: '大規模なコードベースをナビゲートする開発者のためにゼロから構築された、高性能2D空間開発環境およびグラフトポロジカルIDE。',
      navigation: 'ナビゲーション',
      legal: '法務情報',
      socials: 'ソーシャル',
      copyrightYear: '© 2026 Neuron.',
      openSourceNote: 'MITライセンスの下でリリースされた完全なオープンソースプロジェクト。世界中のソフトウェアエンジニアリングコミュニティのために開発されました。',
      selectLanguage: '言語を選択',
      legalGovernance: 'Neuron オープンソースガバナンス',
      doneBtn: '完了',
      tos: '利用規約',
      aup: '利用規定 (AUP)',
      privacy: 'プライバシーポリシー',
      data: 'データ利用方針',
      security: 'セキュリティ'
    },
    docs: {
      categoryGetStarted: 'はじめに',
      categoryConcepts: '基本コンセプト',
      categoryPhysics: '物理エンジン',
      categoryML: 'AIと機械学習',
      categoryReference: 'APIとリファレンス',
      backToTop: 'トップへ戻る',
      searchPrompt: 'ドキュメントとAPIを検索...',
      noResults: '該当するドキュメントが見つかりません'
    }
  },

  zh: {
    nav: {
      docs: '文档',
      versions: '版本',
      help: '帮助',
      github: 'GitHub',
      download: '下载',
      searchPlaceholder: '搜索文档...',
      searchClear: '清除搜索',
      ctrlK: 'Ctrl K',
      theme: '主题',
      system: '系统',
      light: '浅色',
      dark: '深色'
    },
    hero: {
      spatialIde: '空间集成开发环境',
      downloadWindows: '下载 Windows 版',
      scrollExplore: '向下滚动以探索 Neuron'
    },
    showcase: {
      hotspotTitle: '关键热点检测',
      hotspotDesc: '实时架构复杂度识别',
      couplingTitle: '交互式耦合',
      couplingDesc: '可视化拖拽结构交联',
      inspectionTitle: '深度代码检查',
      inspectionDesc: '高精度 AST 符号分析',
      clusterTitle: '聚类检测',
      clusterDesc: '自动化架构社区发现',
      agentTitle: '将AI集成到代码库中',
      agentDesc: '基于具体 AST 图的本地大模型编排',
      themeTitle: '可自定义主题',
      themeDesc: '内置空间清晰度视觉配置文件'
    },
    home: {
      tryNow: '立即体验 Neuron。'
    },
    versions: {
      title: '版本历史',
      desc: 'Neuron 的发布历史与下载。所有版本均在本地工作站独立运行。',
      latestRelease: 'v1.0.0 测试版发布',
      releaseDate: '2026年9月',
      downloadWindows: '下载 Windows 版'
    },
    help: {
      title: '帮助与咨询',
      desc: '查找有关空间引擎、本地运行时的常见技术问题解答，或直接向团队提交咨询。',
      faqTitle: '常见问题',
      formTitle: '发送咨询',
      formDesc: '有疑问、反馈或技术咨询？直接向我们的团队发送消息。',
      nameLabel: '姓名',
      namePlaceholder: 'Ada Lovelace',
      emailLabel: '电子邮箱',
      emailPlaceholder: 'ada@example.cn',
      messageLabel: '内容',
      messagePlaceholder: '您的咨询或反馈...',
      submitBtn: '发送消息',
      successTitle: '消息已发送',
      successDesc: '感谢您的联系。我们将尽快查看您的咨询。',
      sendAnother: '发送另一条消息',
      faqs: [
        {
          q: '2D 空间画布与传统文件树有何不同？',
          a: '传统文件树仅显示磁盘上的静态层级。Neuron 通过 Tree-Sitter 解析抽象语法树，将函数、类和模块呈现为具有真实调用管道的拓扑节点。'
        },
        {
          q: 'Neuron 会将代码、嵌入或 AST 图上传到远程服务器吗？',
          a: '零云端上传。所有的语法解析、物理力导向计算和向量嵌入均严格在本地 CPU/GPU 上运行，通过 127.0.0.1 IPC 套接字进行通信。'
        },
        {
          q: 'Neuron 提供 AI 模型还是需要自备密钥？',
          a: 'Neuron 不分销或代管任何 AI 模型。您可以连接自己的 API 密钥，或配合 Ollama 等完全本地的推理运行时使用。'
        },
        {
          q: '双向同步如何保持代码的正确性？',
          a: '当您在磁盘上修改文件时，Tree-Sitter 会立即重新索引 AST 节点。反之，当您在画布上连结节点时，LibCST 会在保留缩进和注释的前提下安全转换代码。'
        },
        {
          q: '运行桌面安装程序有哪些系统环境要求？',
          a: 'Neuron 运行在 64 位 Windows 10 和 11 上，借助 WebGPU 硬件加速实现高帧率图形计算。独立安装包内置了所有必需运行时。'
        },
        {
          q: '如何提交错误报告或功能建议？',
          a: '您可以使用下方的表格直接提交，或访问我们在 GitHub 上的官方仓库创建 Issue。'
        }
      ]
    },
    footer: {
      brandDesc: '专为梳理超大型代码库的开发者打造的高性能 2D 空间开发环境与图拓扑 IDE。',
      navigation: '导航',
      legal: '法律声明',
      socials: '社交媒体',
      copyrightYear: '© 2026 Neuron.',
      openSourceNote: '基于 MIT 许可证发布的完整开源项目。专为全球软件工程社区打造。',
      selectLanguage: '选择语言',
      legalGovernance: 'Neuron 开源治理',
      doneBtn: '完成',
      tos: '服务条款',
      aup: '可接受使用政策',
      privacy: '隐私政策',
      data: '数据使用说明',
      security: '安全合规'
    },
    docs: {
      categoryGetStarted: '快速入门',
      categoryConcepts: '核心理念',
      categoryPhysics: '引擎物理机制',
      categoryML: 'AI 与机器学习',
      categoryReference: 'API 与参考',
      backToTop: '返回顶部',
      searchPrompt: '搜索技术文档与 API...',
      noResults: '未找到相关文档：'
    }
  }
};
