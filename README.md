# 📱 TarefaPlus

Aplicativo mobile desenvolvido em **React Native (Expo Router)** para gerenciamento de tarefas pessoais.
O app permite criar, listar, editar e excluir tarefas, com integração ao **Firebase Firestore** para persistência em nuvem.

## 🚀 Funcionalidades

* ✅ Cadastro de tarefas com título e descrição
* ✅ Marcar tarefa como concluída
* ✅ Excluir tarefas
* ✅ Lista de tarefas em tempo real (Firestore)
* ✅ Tema claro/escuro com `ThemeContext`
* ✅ Suporte a múltiplos idiomas (i18n)
* ✅ Tela inicial com navegação para **Lista de Tarefas** e **Configurações**

## 🛠️ Tecnologias Utilizadas

* [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
* [Expo Router](https://expo.github.io/router/docs/) (navegação)
* [Firebase Firestore](https://firebase.google.com/docs/firestore) (armazenamento de dados)
* [React Query](https://tanstack.com/query) (requisições externas e cache)
* [i18next](https://www.i18next.com/) (internacionalização)
* [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)

## 📂 Estrutura de Pastas (resumida)

```
.
├── app/                # Telas principais (Home, Tasks, Settings, Alterar Seha, Cadastro)
├── src/
│   ├── api             # para a api externa
│   ├── components/     # Componentes reutilizáveis
│   ├── context/        # Contexto ThemeContext
│   ├── locales/        # jsons dos idiomas
│   ├── services/       # Firebase, i18n, useTasks.
```

## ▶️ Como rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seuusuario/tarefaplus.git
   cd tarefaplus
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Configure seu **Firebase** em `src/services/firebaseConfig.ts`.
4. Rode o app:

   ```bash
   npx expo start
   ```

---

⚡ Desenvolvido para estudos e prática de **React Native + Firebase**

# Desenvolvedores
-- Victor Hugo Carvalho Pereira RM:558550

-- Julianda de Andrade Sousa RM:558834



