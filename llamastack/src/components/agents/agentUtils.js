export const agentTypes = [
  'Chatbot',
  'Task Automation',
  'Data Analysis',
  'Natural Language Processing',
  'Image Recognition',
  'Recommendation System',
  'Predictive Maintenance',
  'Anomaly Detection',
  'Sentiment Analysis',
  'Knowledge Graph',
];

export const getConfigExample = (agentType) => {
  const examples = {
    Chatbot: {
      name: "Customer Support Chatbot",
      type: "Chatbot",
      description: "An AI-powered chatbot for customer support",
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      temperature: 0.7,
      top_p: 0.9,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: ["\n", "Human:", "AI:"],
      prompt_template: "You are a helpful customer support agent. Respond to the following inquiry:\n\nHuman: {user_input}\n\nAI:",
      fallback_response: "I'm sorry, I didn't understand that. Could you please rephrase your question?",
      knowledge_base: "customer_support_faq.json",
      supported_languages: ["en", "es", "fr"],
      sentiment_analysis: true,
      entity_recognition: true,
      integration: {
        ticketing_system: "zendesk",
        crm: "salesforce"
      }
    },
    "Task Automation": {
      name: "Data Processing Workflow",
      type: "Task Automation",
      description: "Automated workflow for processing and analyzing sales data",
      trigger: {
        type: "schedule",
        cron: "0 1 * * *"
      },
      steps: [
        {
          name: "fetch_data",
          type: "api_call",
          url: "https://api.example.com/sales_data",
          method: "GET",
          headers: {
            "Authorization": "Bearer ${ENV.API_KEY}"
          }
        },
        {
          name: "process_data",
          type: "python_script",
          script: "process_sales_data.py",
          input: "${fetch_data.response}"
        },
        {
          name: "generate_report",
          type: "template",
          template: "sales_report.md",
          data: "${process_data.output}"
        },
        {
          name: "send_email",
          type: "email",
          to: ["manager@example.com"],
          subject: "Daily Sales Report",
          body: "${generate_report.output}",
          attachments: ["${process_data.output_csv}"]
        }
      ],
      error_handling: {
        retry_attempts: 3,
        retry_delay: 300,
        fallback_action: "notify_admin"
      }
    },
    "Data Analysis": {
      name: "Sales Trend Analyzer",
      type: "Data Analysis",
      description: "Analyzes sales data to identify trends and patterns",
      data_source: {
        type: "database",
        connection_string: "postgresql://${ENV.DB_USER}:${ENV.DB_PASS}@${ENV.DB_HOST}:5432/sales_db"
      },
      analysis_tasks: [
        {
          name: "time_series_analysis",
          method: "arima",
          parameters: {
            p: 1,
            d: 1,
            q: 1
          }
        },
        {
          name: "correlation_analysis",
          method: "pearson",
          variables: ["price", "quantity", "customer_age"]
        },
        {
          name: "clustering",
          method: "k_means",
          n_clusters: 5,
          features: ["total_spend", "frequency", "recency"]
        }
      ],
      visualizations: [
        {
          type: "line_chart",
          data: "${time_series_analysis.forecast}",
          title: "Sales Forecast"
        },
        {
          type: "heatmap",
          data: "${correlation_analysis.matrix}",
          title: "Variable Correlations"
        },
        {
          type: "scatter_plot",
          data: "${clustering.results}",
          title: "Customer Segments"
        }
      ],
      export_format: ["csv", "json", "pdf"],
      scheduling: {
        frequency: "weekly",
        day: "Monday",
        time: "09:00"
      }
    },
    "Natural Language Processing": {
      name: "Multi-lingual Sentiment Analyzer",
      type: "Natural Language Processing",
      description: "Analyzes sentiment in multiple languages",
      model: "bert-base-multilingual-uncased",
      supported_languages: ["en", "es", "fr", "de", "it"],
      tasks: [
        "sentiment_analysis",
        "entity_recognition",
        "language_detection"
      ],
      preprocessing: {
        lowercase: true,
        remove_punctuation: true,
        remove_stopwords: true
      },
      sentiment_classes: ["positive", "neutral", "negative"],
      entity_types: ["person", "organization", "location", "date"],
      confidence_threshold: 0.7,
      batch_size: 32,
      max_sequence_length: 128,
      api_endpoint: "/api/nlp/analyze",
      output_format: "json"
    },
    "Image Recognition": {
      name: "Product Image Classifier",
      type: "Image Recognition",
      description: "Classifies product images into categories",
      model: "efficientnet_b0",
      input_size: [224, 224],
      num_classes: 100,
      pretrained: true,
      data_augmentation: {
        horizontal_flip: true,
        vertical_flip: false,
        rotation_range: 20,
        zoom_range: 0.2
      },
      training: {
        epochs: 50,
        batch_size: 32,
        optimizer: "adam",
        learning_rate: 0.001,
        early_stopping: {
          patience: 5,
          monitor: "val_loss"
        }
      },
      inference: {
        confidence_threshold: 0.8,
        top_k: 3
      },
      api_endpoint: "/api/image/classify",
      supported_formats: ["jpg", "png", "webp"]
    },
    "Recommendation System": {
      name: "E-commerce Product Recommender",
      type: "Recommendation System",
      description: "Recommends products to users based on their browsing and purchase history",
      algorithm: "collaborative_filtering",
      model: "matrix_factorization",
      features: [
        "user_id",
        "product_id",
        "category",
        "price",
        "rating",
        "purchase_history",
        "view_history"
      ],
      hyperparameters: {
        num_factors: 100,
        learning_rate: 0.01,
        regularization: 0.01,
        num_iterations: 20
      },
      cold_start_strategy: "popularity_based",
      similarity_metric: "cosine",
      num_recommendations: 5,
      update_frequency: "daily",
      storage: {
        type: "redis",
        host: "${ENV.REDIS_HOST}",
        port: 6379
      },
      api_endpoint: "/api/recommend",
      monitoring: {
        metrics: ["ctr", "conversion_rate", "revenue_impact"]
      }
    },
    "Predictive Maintenance": {
      name: "Industrial Equipment Health Monitor",
      type: "Predictive Maintenance",
      description: "Predicts maintenance needs for industrial equipment",
      data_sources: [
        {
          type: "sensor",
          id: "temperature_sensor",
          frequency: "1m"
        },
        {
          type: "sensor",
          id: "vibration_sensor",
          frequency: "5s"
        },
        {
          type: "database",
          connection_string: "mysql://${ENV.DB_USER}:${ENV.DB_PASS}@${ENV.DB_HOST}:3306/maintenance_db"
        }
      ],
      model: {
        type: "random_forest",
        n_estimators: 100,
        max_depth: 10
      },
      features: [
        "temperature",
        "vibration",
        "pressure",
        "runtime_hours",
        "last_maintenance_date"
      ],
      target: "days_to_failure",
      threshold: {
        warning: 30,
        critical: 7
      },
      retraining: {
        frequency: "monthly",
        performance_metric: "mae"
      },
      notifications: {
        email: ["maintenance_team@example.com"],
        sms: ["+1234567890"]
      },
      api_endpoint: "/api/predict_maintenance",
      dashboard: {
        url: "/maintenance-dashboard",
        refresh_rate: "5m"
      }
    },
    "Anomaly Detection": {
      name: "Network Traffic Anomaly Detector",
      type: "Anomaly Detection",
      description: "Detects anomalies in network traffic patterns",
      data_source: {
        type: "stream",
        format: "netflow",
        endpoint: "kafka://network-traffic-topic"
      },
      algorithm: "isolation_forest",
      parameters: {
        contamination: 0.01,
        max_samples: 100
      },
      features: [
        "source_ip",
        "destination_ip",
        "source_port",
        "destination_port",
        "protocol",
        "bytes_transferred",
        "packets_transferred"
      ],
      preprocessing: {
        scaling: "standard",
        encoding: {
          categorical_columns: ["protocol"],
          method: "one_hot"
        }
      },
      time_window: "5m",
      update_frequency: "1h",
      alert_threshold: 0.95,
      actions: [
        {
          condition: "score > 0.98",
          action: "block_ip",
          target: "${source_ip}"
        },
        {
          condition: "score > 0.95",
          action: "send_alert",
          target: "security_team@example.com"
        }
      ],
      api_endpoint: "/api/anomaly_detection",
      visualization: {
        type: "real_time_dashboard",
        url: "/network-anomaly-dashboard"
      }
    },
    "Sentiment Analysis": {
      name: "Social Media Sentiment Analyzer",
      type: "Sentiment Analysis",
      description: "Analyzes sentiment of social media posts and comments",
      data_sources: [
        {
          platform: "twitter",
          api_key: "${ENV.TWITTER_API_KEY}",
          search_terms: ["#brandname", "@companyhandle"]
        },
        {
          platform: "facebook",
          access_token: "${ENV.FACEBOOK_ACCESS_TOKEN}",
          page_id: "123456789"
        }
      ],
      model: {
        type: "bert",
        variant: "bert-base-uncased",
        fine_tuned: true
      },
      preprocessing: {
        lowercase: true,
        remove_urls: true,
        remove_mentions: true,
        remove_hashtags: false
      },
      sentiment_classes: ["positive", "neutral", "negative"],
      aspect_based: true,
      aspects: ["product", "service", "price", "support"],
      language_detection: true,
      supported_languages: ["en", "es", "fr"],
      batch_size: 64,
      update_frequency: "15m",
      output: {
        format: "json",
        include_original_text: true,
        include_confidence_scores: true
      },
      storage: {
        type: "elasticsearch",
        index: "social_media_sentiment",
        host: "${ENV.ES_HOST}",
        port: 9200
      },
      api_endpoint: "/api/sentiment",
      visualization: {
        type: "dashboard",
        url: "/sentiment-dashboard",
        update_frequency: "5m"
      },
      alerts: {
        negative_threshold: 0.7,
        volume_increase_threshold: 200,
        notification_channel: "slack"
      }
    },
    "Knowledge Graph": {
      name: "Enterprise Knowledge Graph",
      type: "Knowledge Graph",
      description: "Builds and maintains a knowledge graph of enterprise data",
      data_sources: [
        {
          type: "database",
          connection_string: "postgresql://${ENV.DB_USER}:${ENV.DB_PASS}@${ENV.DB_HOST}:5432/enterprise_db"
        },
        {
          type: "api",
          endpoint: "https://api.example.com/employees",
          auth: {
            type: "bearer",
            token: "${ENV.API_TOKEN}"
          }
        },
        {
          type: "file",
          path: "/data/documents",
          format: "pdf"
        }
      ],
      entity_types: [
        "Person",
        "Department",
        "Project",
        "Skill",
        "Document",
        "Client"
      ],
      relationships: [
        {
          name: "WORKS_IN",
          source: "Person",
          target: "Department"
        },
        {
          name: "MANAGES",
          source: "Person",
          target: "Project"
        },
        {
          name: "HAS_SKILL",
          source: "Person",
          target: "Skill"
        },
        {
          name: "AUTHORED",
          source: "Person",
          target: "Document"
        },
        {
          name: "RELATED_TO",
          source: "Project",
          target: "Client"
        }
      ],
      extraction_methods: {
        text: "spacy_ner",
        structured: "direct_mapping"
      },
      storage: {
        type: "neo4j",
        uri: "bolt://${ENV.NEO4J_HOST}:7687",
        user: "${ENV.NEO4J_USER}",
        password: "${ENV.NEO4J_PASS}"
      },
      update_frequency: "daily",
      conflict_resolution: "latest_wins",
      api_endpoints: {
        query: "/api/knowledge_graph/query",
        update: "/api/knowledge_graph/update"
      },
      visualization: {
        type: "interactive_graph",
        url: "/knowledge-graph-explorer"
      },
      integration: {
        search_engine: {
          type: "elasticsearch",
          index: "enterprise_knowledge"
        },
        recommendation_engine: {
          type: "graph_based",
          algorithm: "pagerank"
        }
      },
      security: {
        access_control: "role_based",
        encryption: {
          at_rest: true,
          in_transit: true
        }
      }
    }
  };

  return examples[agentType] || {};
};