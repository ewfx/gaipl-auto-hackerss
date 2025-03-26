export const incidents = [
  {
    id: 10,
    name: "ShopVerse Frontend - Timeout",
    appName: "ShopVerse Frontend",
    description: "Frontend application for ShopVerse. The application is experiencing a timeout issue, causing delays in user interactions and data fetching.",
    summary: "Handles user interactions and displays product information. The frontend is designed to be responsive and user-friendly, ensuring a seamless shopping experience across all devices. It integrates with various backend services to fetch and display data in real-time.\n\nCurrently, the frontend is experiencing a timeout issue, causing delays in user interactions and data fetching. This needs to be addressed to ensure a smooth user experience.",
    status: "open",
    dependencies: [
      { id: "11", name: "ShopVerse Gateway" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [],
    platform: {
      type: "Kubernetes",
      namespace: "frontend-ns",
      hosts: ["k8s-node-101", "k8s-node-102"]
    }
  },
  {
    id: 11,
    name: "ShopVerse Gateway - API is down",
    appName: "ShopVerse Gateway",
    description: "API gateway for ShopVerse. The gateway is currently down, causing disruptions in routing requests to backend services.",
    summary: "Routes requests to appropriate backend services. The gateway acts as a reverse proxy, handling incoming requests and routing them to the appropriate microservices. It also provides features such as load balancing, rate limiting, and authentication.\n\nThe gateway is currently down, causing disruptions in routing requests to backend services. This issue needs to be resolved to restore normal operations.",
    status: "closed",
    dependencies: [
      { id: "12", name: "Catalog Explorer" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "10", name: "ShopVerse Frontend" },
      { id: "14", name: "Account Nexus" },
      { id: "15", name: "CartOwl" },
      { id: "16", name: "Payments Prime" },
      { id: "17", name: "Fulfillment Hub" },
      { id: "19", name: "NotifyMe" }
    ],
    platform: {
      type: "Kubernetes",
      namespace: "gateway-ns",
      hosts: ["k8s-node-103", "k8s-node-104"]
    }
  },
  {
    id: 12,
    name: "Catalog Explorer - No logs found",
    appName: "Catalog Explorer",
    description: "Service for exploring product catalogs. No logs are being generated, making it difficult to troubleshoot issues.",
    summary: "Provides search and filtering capabilities for products. The service indexes product data from various sources and provides a unified search interface for users. It supports advanced search features such as faceted search, full-text search, and autocomplete.\n\nCurrently, no logs are being generated, making it difficult to troubleshoot issues. This needs to be addressed to ensure proper monitoring and debugging.",
    status: "inprogress",
    dependencies: [
      { id: "Elasticsearch", name: "Elasticsearch Cluster" },
      { id: "MongoDB", name: "MongoDB DB" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "11", name: "ShopVerse Gateway" },
      { id: "13", name: "SmartSuggest" }
    ],
    platform: {
      type: "Linux Servers",
      hostnames: ["linux-cat-01", "linux-cat-02"],
      os: "Ubuntu 20.04 LTS"
    }
  },
  {
    id: 13,
    name: "SmartSuggest - Not reachable",
    appName: "SmartSuggest",
    description: "Recommendation engine for ShopVerse. The service is currently not reachable, affecting the delivery of product recommendations.",
    summary: "Provides product recommendations based on user behavior. The service uses machine learning algorithms to analyze user behavior and generate personalized product recommendations. It integrates with the Catalog Explorer to fetch product data and with the ShopVerse Gateway to receive user events.\n\nThe service is currently not reachable, affecting the delivery of product recommendations. This issue needs to be resolved to restore normal functionality.",
    status: "open",
    dependencies: [
      { id: "12", name: "Catalog Explorer" },
      { id: "TensorFlow", name: "TensorFlow" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "11", name: "ShopVerse Gateway" }
    ],
    platform: {
      type: "PCF",
      namespace: "smart-pcf-ns",
      hosts: ["pcf-host-03", "pcf-host-04"]
    }
  },
  {
    id: 14,
    name: "Account Nexus - Timeout",
    appName: "Account Nexus",
    description: "User account management service. The service is experiencing a timeout issue, causing delays in user authentication and account management.",
    summary: "Handles user authentication and account details. The service provides APIs for user registration, login, password management, and profile updates. It integrates with third-party authentication providers such as Google and Facebook for social login.\n\nThe service is experiencing a timeout issue, causing delays in user authentication and account management. This needs to be addressed to ensure a smooth user experience.",
    status: "closed",
    dependencies: [
      { id: "Firebase Auth", name: "Firebase Auth" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "11", name: "ShopVerse Gateway" }
    ],
    platform: {
      type: "Windows Servers",
      hostnames: ["win-acc-01", "win-acc-02"],
      os: "Windows Server 2019"
    }
  },
  {
    id: 15,
    name: "CartOwl - API is down",
    appName: "CartOwl",
    description: "Shopping cart service. The API is currently down, affecting the shopping cart and checkout process.",
    summary: "Manages user shopping carts and checkout process. The service provides APIs for adding, updating, and removing items from the cart. It also handles the checkout process, including calculating totals, applying discounts, and processing payments.\n\nThe API is currently down, affecting the shopping cart and checkout process. This issue needs to be resolved to restore normal functionality.",
    status: "inprogress",
    dependencies: [
      { id: "Redis", name: "Redis Cache" },
      { id: "Kafka", name: "Kafka Queue" },
      { id: "11", name: "ShopVerse Gateway" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "11", name: "ShopVerse Gateway" }
    ],
    platform: {
      type: "Linux Servers",
      hostnames: ["linux-cart-01"],
      os: "CentOS 7"
    }
  },
  {
    id: 16,
    name: "Payments Prime - Not reachable",
    appName: "Payments Prime",
    description: "Payment processing service. The service is currently not reachable, affecting payment transactions and integrations.",
    summary: "Handles payment transactions and integrations with payment gateways. The service provides APIs for processing payments, managing payment methods, and handling refunds. It supports various payment methods, including credit cards, digital wallets, and bank transfers.\n\nThe service is currently not reachable, affecting payment transactions and integrations. This issue needs to be resolved to restore normal functionality.",
    status: "open",
    dependencies: [
      { id: "Stripe", name: "Stripe API" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "11", name: "ShopVerse Gateway" }
    ],
    platform: {
      type: "Windows Servers",
      hostnames: ["win-pay-01", "win-pay-02"],
      os: "Windows Server 2016"
    }
  },
  {
    id: 17,
    name: "Fulfillment Hub - No logs found",
    appName: "Fulfillment Hub",
    description: "Order fulfillment service. No logs are being generated, making it difficult to troubleshoot order processing and shipment issues.",
    summary: "Manages order processing and shipment. The service provides APIs for creating, updating, and tracking orders. It integrates with various shipping carriers to provide real-time tracking information and updates.\n\nNo logs are being generated, making it difficult to troubleshoot order processing and shipment issues. This needs to be addressed to ensure proper monitoring and debugging.",
    status: "closed",
    dependencies: [
      { id: "PostgreSQL", name: "PostgreSQL DB" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "11", name: "ShopVerse Gateway" }
    ],
    platform: {
      type: "PCF",
      namespace: "fulfill-pcf-ns",
      hosts: ["pcf-ful-01", "pcf-ful-02"]
    }
  },
  {
    id: 18,
    name: "Insight Dashboard - Timeout",
    appName: "Insight Dashboard",
    description: "Monitoring and analytics dashboard. The dashboard is experiencing a timeout issue, causing delays in displaying insights and metrics.",
    summary: "Provides insights and metrics for various services. The dashboard aggregates data from multiple sources and presents it in a unified interface. It includes features such as real-time monitoring, alerting, and reporting.\n\nThe dashboard is experiencing a timeout issue, causing delays in displaying insights and metrics. This needs to be addressed to ensure timely monitoring and reporting.",
    status: "inprogress",
    dependencies: [
      { id: "Grafana", name: "Grafana Dashboard" },
      { id: "Prometheus", name: "Prometheus Metrics" },
      { id: "Elasticsearch", name: "Elasticsearch Logging" },
      { id: "Kibana", name: "Kibana Visualization" }
    ],
    dependents: [],
    platform: {
      type: "Kubernetes",
      namespace: "dashboard-ns",
      hosts: ["k8s-dash-01", "k8s-dash-02"]
    }
  },
  {
    id: 19,
    name: "NotifyMe - API is down",
    appName: "NotifyMe",
    description: "Notification service. The API is currently down, affecting the delivery of notifications via SMS, email, and push notifications.",
    summary: "Sends notifications via SMS, email, and push notifications. The service provides APIs for sending notifications to users through various channels. It integrates with third-party services such as Twilio and Firebase Cloud Messaging to deliver notifications.\n\nThe API is currently down, affecting the delivery of notifications via SMS, email, and push notifications. This issue needs to be resolved to restore normal functionality.",
    status: "open",
    dependencies: [
      { id: "Twilio", name: "Twilio SMS" },
      { id: "FCM", name: "Firebase Cloud Messaging" },
      { id: "AWS Lambda", name: "AWS Lambda" },
      { id: "20", name: "CloudCore" }
    ],
    dependents: [
      { id: "11", name: "ShopVerse Gateway" }
    ],
    platform: {
      type: "Kubernetes",
      namespace: "notify-ns",
      hosts: ["k8s-notify-01"]
    }
  },
  {
    id: 20,
    name: "CloudCore - Not reachable",
    appName: "CloudCore",
    description: "Core cloud infrastructure service. The service is currently not reachable, affecting the management of cloud resources.",
    summary: "Provides core cloud services and infrastructure management. The service provides APIs for managing cloud resources such as virtual machines, containers, and storage. It integrates with various cloud providers such as AWS, Google Cloud, and Azure.\n\nThe service is currently not reachable, affecting the management of cloud resources. This issue needs to be resolved to restore normal functionality.",
    status: "closed",
    dependencies: [
      { id: "Docker", name: "Docker" },
      { id: "Kubernetes", name: "Kubernetes" },
      { id: "GCR", name: "Google Cloud Run" },
      { id: "AWS Lambda", name: "AWS Lambda" },
      { id: "Terraform", name: "Terraform" }
    ],
    dependents: [
      { id: "10", name: "ShopVerse Frontend" },
      { id: "11", name: "ShopVerse Gateway" },
      { id: "12", name: "Catalog Explorer" },
      { id: "13", name: "SmartSuggest" },
      { id: "14", name: "Account Nexus" },
      { id: "15", name: "CartOwl" },
      { id: "16", name: "Payments Prime" },
      { id: "17", name: "Fulfillment Hub" },
      { id: "19", name: "NotifyMe" }
    ],
    platform: {
      type: "Kubernetes",
      namespace: "cloudcore-ns",
      hosts: ["k8s-core-01", "k8s-core-02", "k8s-core-03"]
    }
  }
];