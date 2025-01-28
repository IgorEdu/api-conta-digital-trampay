FROM node:20-alpine

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Copia o arquivo de pacotes primeiro (para melhorar o cache de build)
COPY --chown=node:node package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do projeto
COPY --chown=node:node . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
