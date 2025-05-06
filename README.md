# 🚗 WebCarros

Aplicação web inspirada no WebMotors, desenvolvida com **React** e **Firebase**, que permite cadastro de usuários, publicação de veículos, edição, remoção e visualização dos anúncios.

## 🔧 Tecnologias Utilizadas

- **React.js** – Interface responsiva e dinâmica
- **Firebase Authentication** – Cadastro e login de usuários
- **Firebase Firestore** – Armazenamento de dados (CRUD de veículos)
- **Firebase Storage** – Upload de imagens dos veículos
- **React Router Dom** – Navegação entre páginas
- **Tailwind CSS** _(ou outra, se aplicável)_ – Estilização do frontend

## ✨ Funcionalidades

- Cadastro e login de usuários
- Cadastro, edição, exclusão e listagem de veículos
- Upload de imagens para cada veículo
- Visualização dos anúncios públicos
- Interface intuitiva e responsiva

## 🖼️ Imagens do Projeto

### 🔐 Tela de Login

![Tela de Login](./assets/login.png)

### 🚘 Cadastro de Veículo

![Cadastro de Veículo](./assets/cadastro-veiculo.png)

### 📃 Lista de Veículos

![Lista de Veículos](./assets/lista-veiculos.png)

## 🚀 Como Executar o Projeto

```bash
# Clone o repositório
git clone https://github.com/AndreessaLopes/webcarros

# Acesse o diretório
cd webcarros

# Instale as dependências
npm install

# Inicie o projeto
npm run dev
```

💡 Certifique-se de criar um arquivo `.env` com suas credenciais do Firebase:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
...
```

## 📂 Estrutura de Pastas

```
src/
│
├── components/       # Componentes reutilizáveis (cards, inputs, etc)
├── pages/            # Páginas do sistema (Login, Home, Dashboard)
├── services/         # Configurações do Firebase
├── hooks/            # Hooks personalizados
└── App.jsx           # Roteamento principal
```

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar e modificar.
