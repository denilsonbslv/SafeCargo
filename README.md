# SafeCargo

## Descrição
SafeCargo é um sistema para gerir a entrada e saída de veículos, principalmente caminhões de mercadorias, em lojas e depósitos. O projeto utiliza .NET 8, SQL e React.js.

## Índice
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Instalação
### Pré-requisitos
- .NET 8 SDK
- MySQL
- Node.js (para o front-end em React.js)

### Configuração
1. Clone o repositório:
    ```sh
    git clone https://github.com/denilsonbslv/SafeCargo.git
    ```
2. Configure a conexão com o banco de dados em `appsettings.json`:
    ```json
    {
      "ConnectionStrings": {
        "DefaultConnection": "Server=127.0.0.1;Port=3306;Database=SafeCargoDB;User=root;Password=yourpassword;"
      }
    }
    ```
3. Restaure as dependências e crie o banco de dados:
    ```sh
    cd SafeCargo.Server
    dotnet restore
    dotnet ef database update
    ```

## Uso
### Exemplos de Uso
- **Login:** `POST /api/auth/login`
- **Registrar veículo:** `POST /api/vehicles`

### Documentação da API
A documentação completa da API está disponível no Swagger: `/swagger`

## Contribuição
### Guia para Contribuir
1. Faça um fork do repositório
2. Crie uma branch para sua feature:
    ```sh
    git checkout -b feature/nova-feature
    ```
3. Faça o commit das suas mudanças:
    ```sh
    git commit -m 'Adiciona nova feature'
    ```
4. Envie para o branch:
    ```sh
    git push origin feature/nova-feature
    ```
5. Abra um Pull Request

## Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato
Denilson Silva - [denilson.bslv@gmail.com](mailto:denilson.bslv@gmail.com)
