# Repositório testes microserviço Node
Repositório criado para estudo de Funcionamento de microserviços com node

Está em funcionando em um banco de dados postgre na nuvem.

Para instalar os pacotes usar npm install.

O serviço que esta funcionando é o "restlogin" com as funções de GET e POST. Para iniciar o serviço basta executar o comando node .\restlogin.js

Para testar o GET:
curl --location --request GET 'localhost:3000/user'

Para testar o POST:
curl --location --request POST 'localhost:3000/user/add' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "nom": "Teste",
        "login": "login1",
        "senha": "Senha1234"
    }
]'

O serviço "restproduct" não está finalizado.