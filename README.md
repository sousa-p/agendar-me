# Agendar.me - Sistema de Gerenciamento de Agendamentos

O Agendar.me é um sistema versátil e adaptável para agendamentos, projetado para atender tanto as necessidades de clientes quanto de empresas. Com uma combinação poderosa de tecnologias e uma arquitetura bem definida, o sistema oferece uma experiência de agendamento eficiente e personalizada.

## Funcionalidades

### Para Clientes

- Visualização dos agendamentos: Os clientes têm acesso aos seus agendamentos passados e futuros, permitindo um acompanhamento detalhado de suas marcações.
- Dados do cliente: Os clientes podem visualizar e editar suas informações pessoais, garantindo que os detalhes estejam sempre atualizados.
- Agendamento flexível: Os clientes podem marcar e desmarcar agendamentos de acordo com sua disponibilidade, oferecendo conveniência e controle total sobre suas reservas.

### Para Empresas

- Gerenciamento de clientes: As empresas podem cadastrar novos clientes, fornecendo uma visão abrangente de sua base de clientes.
- Restrições de agendamento: As empresas têm a flexibilidade de definir restrições de horários e dias, permitindo um controle preciso sobre a disponibilidade para agendamentos.
- Integração com API do Whatsapp: As empresas e clientes, conseguem de maneira rápida pelo próprio App, mandar mensagens pré-definidas e conversar com seus clientes pelo Whatsapp.
- Dashboard intuitivo: Um painel de controle intuitivo oferece uma visão consolidada dos agendamentos, permitindo uma administração simplificada.

## Tecnologias Utilizadas

O Agendar.me foi desenvolvido utilizando as seguintes tecnologias:

- **Angular**: Um framework robusto que possibilita a construção de interfaces de usuário dinâmicas e interativas.
- **Ionic**: Uma plataforma que facilita o desenvolvimento de aplicativos móveis nativos e web com uma base de código única.
- **TypeScript**: Uma linguagem de programação que adiciona tipagem estática ao JavaScript, tornando o código mais legível e fácil de manter.
- **SCSS**: Uma linguagem de folhas de estilo que permite a criação de estilos personalizados para a interface do usuário.
- **MySQL**: Um sistema de gerenciamento de banco de dados relacional, utilizado para armazenar os dados de agendamentos, clientes e configurações.
- **PHP**: Uma linguagem de script do lado do servidor usada para criar os endpoints de comunicação entre o frontend e o banco de dados.

## Arquitetura

A comunicação com o FrontEnd e com o BackEnd (API) do sistema constuida em PHP segue uma arquitetura bem definida, dividida em três principais componentes:

- **Controller**: Responsável por lidar com as interações da interface do usuário e direcionar os dados aos serviços apropriados.
- **Service**: Encarregado de conter a lógica de negócios, incluindo operações como agendamento, cancelamento, cadastro de clientes e aplicação de restrições.
- **Model**: Define a estrutura dos dados utilizados na aplicação, como as informações do cliente, detalhes do agendamento e configurações da empresa.

Esta estrutura modular permite uma manutenção simplificada, escalabilidade eficiente e melhor organização do código.
