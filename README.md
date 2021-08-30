# aws-lambda-function
Função CRUD para o DynamoDB aws


API Gateway com lambda function e dynamodb Para utilizar as rotas, utilize https://cbrdqaqq92.execute-api.sa-east-1.amazonaws.com

CRIAR LEADS

POST /leads 
body: { 
  "name": "Nome Completo", 
  "phoneNumber": "547845632", 
  "email": 
  "email@qualquercoisa.com" 
}

retorno: {
  "Create lead f91292fd-0fb4-4ae5-a1af-6d8ff7ce095d"
}

Buscar todas as leads GET /leads
retorno: {
  "Items": [
    {
      "phoneNumber": "547845632",
      "dateBecameClient": "Mon Aug 30 2021 20:44:32 GMT+0000 (Coordinated Universal Time)",
      "dateBecameLead": "Mon Aug 30 2021 20:41:57 GMT+0000 (Coordinated Universal Time)",
      "category": "customer",
      "email": "tudocaspso@naosei.com.br",
      "id": "f91292fd-0fb4-4ae5-a1af-6d8ff7ce095d",
      "name": "Teste de UPDATE"
    }
  ]
}

Buscar leads por id GET /leads/{id}
retorno: {
  "Item": {
    "phoneNumber": "547845632",
    "dateBecameClient": "Mon Aug 30 2021 20:44:32 GMT+0000 (Coordinated Universal Time)",
    "dateBecameLead": "Mon Aug 30 2021 20:41:57 GMT+0000 (Coordinated Universal Time)",
    "category": "customer",
    "email": "tudocaspso@naosei.com.br",
    "id": "f91292fd-0fb4-4ae5-a1af-6d8ff7ce095d",
    "name": "Teste de UPDATE"
  }
}

Deletar lead por id DELETE /leads/{id}
retorno: {
  "Deleted item 5"
}

Alterar lead por id PUT /leads/{id}
retorno: {
  "Update item 9f3509a3-9b68-4878-beab-4426443f524b"
}
